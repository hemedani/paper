// Keyword backfill for the paper database.
//
//   deno run -A scripts/keywords/run.ts --preview 12     # inspect, no writes
//   deno run -A scripts/keywords/run.ts --apply          # create + link keywords
//   deno run -A scripts/keywords/run.ts --apply --limit 50
//
// Writes go through the Lesan acts `keyword.addKeyword` and
// `article.updateArticleRelations`, never straight to MongoDB.
//
// Progress is checkpointed per article in state/processed.jsonl, so an
// interrupted run continues where it stopped. KEYWORD_PROGRESS.md is the
// human-readable report and is rewritten every CHECKPOINT_EVERY articles.

import { extractAll, type Extracted } from "./extract.ts";
import { normalize } from "./persian.ts";

const STATE_DIR = new URL("./state/", import.meta.url).pathname;
const PROCESSED_FILE = `${STATE_DIR}processed.jsonl`;
const REPORT_FILE = new URL("./KEYWORD_PROGRESS.md", import.meta.url).pathname;
const CACHE_FILE = `${STATE_DIR}/keywords.json`;

const LESAN_URL = Deno.env.get("LESAN_URL") ?? "http://localhost:1382";
const NATIONAL_NUMBER = Deno.env.get("NATIONAL_NUMBER") ?? "3875523474";
const OTP_CODE = Deno.env.get("OTP_CODE") ?? "11111";
const CONCURRENCY = Number(Deno.env.get("KEYWORD_CONCURRENCY") ?? "8");
const CHECKPOINT_EVERY = 25;

type Args = {
	apply: boolean;
	preview: number;
	limit: number;
	force: boolean;
	maxKeywords: number;
};

function parseArgs(argv: string[]): Args {
	const args: Args = { apply: false, preview: 0, limit: 0, force: false, maxKeywords: 6 };
	for (let i = 0; i < argv.length; i++) {
		const a = argv[i];
		if (a === "--apply") args.apply = true;
		else if (a === "--force") args.force = true;
		else if (a === "--preview") args.preview = Number(argv[++i] ?? 10);
		else if (a === "--limit") args.limit = Number(argv[++i] ?? 0);
		else if (a === "--max-keywords") args.maxKeywords = Number(argv[++i] ?? 6);
	}
	return args;
}

// ---------------------------------------------------------------- data load

type Article = { id: string; title: string; abstract: string };

async function loadArticles(): Promise<Article[]> {
	const tmp = `${STATE_DIR}/articles.export.jsonl`;
	await Deno.mkdir(STATE_DIR, { recursive: true });
	const cmd = new Deno.Command("mongoexport", {
		args: [
			"--db=paper",
			"--collection=article",
			"--fields=_id,title,abstract",
			"--jsonFormat=canonical",
			`--out=${tmp}`,
			"--quiet",
		],
	});
	const { success, stderr } = await cmd.output();
	if (!success) throw new Error(`mongoexport failed: ${new TextDecoder().decode(stderr)}`);

	const raw = await Deno.readTextFile(tmp);
	const out: Article[] = [];
	for (const line of raw.split("\n")) {
		if (!line.trim()) continue;
		const doc = JSON.parse(line);
		out.push({
			id: typeof doc._id === "object" ? doc._id.$oid : String(doc._id),
			title: doc.title ?? "",
			abstract: doc.abstract ?? "",
		});
	}
	return out;
}

/** Existing keyword documents: normalized name -> { id, name }. */
async function loadKeywordCache(): Promise<Map<string, { id: string; name: string }>> {
	const cache = new Map<string, { id: string; name: string }>();
	try {
		const raw = await Deno.readTextFile(CACHE_FILE);
		for (const [k, v] of Object.entries(JSON.parse(raw)) as [string, { id: string; name: string }][]) {
			cache.set(k, v);
		}
	} catch { /* first run */ }

	// refresh from the database so keywords created by an interrupted run are
	// reused instead of duplicated.
	const tmp = `${STATE_DIR}/keywords.export.jsonl`;
	const cmd = new Deno.Command("mongoexport", {
		args: [
			"--db=paper",
			"--collection=keyword",
			"--fields=_id,name",
			"--jsonFormat=canonical",
			`--out=${tmp}`,
			"--quiet",
		],
	});
	const { success } = await cmd.output();
	if (success) {
		const raw = await Deno.readTextFile(tmp);
		for (const line of raw.split("\n")) {
			if (!line.trim()) continue;
			const doc = JSON.parse(line);
			const name = String(doc.name ?? "").trim();
			if (!name) continue;
			const id = typeof doc._id === "object" ? doc._id.$oid : String(doc._id);
			cache.set(normalize(name), { id, name });
		}
	}
	return cache;
}

async function saveKeywordCache(cache: Map<string, { id: string; name: string }>) {
	const obj: Record<string, { id: string; name: string }> = {};
	for (const [k, v] of cache) obj[k] = v;
	await Deno.writeTextFile(CACHE_FILE, JSON.stringify(obj, null, 0));
}

// ---------------------------------------------------------------- lesan api

async function login(): Promise<string> {
	const envToken = Deno.env.get("TOKEN");
	if (envToken) return envToken;

	const call = async (act: string, details: unknown) => {
		const res = await fetch(`${LESAN_URL}/lesan`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ service: "main", model: "user", act, details }),
		});
		const json = await res.json();
		if (!json.success) throw new Error(`login ${act} failed: ${JSON.stringify(json.body)}`);
		return json.body;
	};

	await call("loginReq", {
		set: { national_number: NATIONAL_NUMBER },
		get: { mobile: 1, national_number: 1 },
	});
	const { token } = await call("login", {
		set: { national_number: NATIONAL_NUMBER, code: OTP_CODE },
		get: { token: 1, user: { _id: 1 } },
	});
	return token as string;
}

async function act<T = unknown>(
	token: string,
	model: string,
	actName: string,
	details: unknown,
): Promise<T> {
	const res = await fetch(`${LESAN_URL}/lesan`, {
		method: "POST",
		headers: { "Content-Type": "application/json", token },
		body: JSON.stringify({ service: "main", model, act: actName, details }),
	});
	const json = await res.json();
	if (!json.success) {
		throw new Error(`${model}.${actName}: ${JSON.stringify(json.body).slice(0, 300)}`);
	}
	return json.body as T;
}

async function pool<T, R>(items: T[], size: number, fn: (item: T, i: number) => Promise<R>) {
	const results: R[] = new Array(items.length);
	let cursor = 0;
	const workers = Array.from({ length: Math.min(size, items.length) }, async () => {
		while (true) {
			const i = cursor++;
			if (i >= items.length) return;
			results[i] = await fn(items[i], i);
		}
	});
	await Promise.all(workers);
	return results;
}

// ------------------------------------------------------------------- report

type RunState = {
	startedAt: string;
	updatedAt: string;
	total: number;
	processed: number;
	failed: { id: string; title: string; error: string }[];
	createdKeywords: number;
	lastBatch: { title: string; keywords: string[] }[];
};

async function readProcessed(): Promise<Map<string, Extracted>> {
	const map = new Map<string, Extracted>();
	try {
		const raw = await Deno.readTextFile(PROCESSED_FILE);
		for (const line of raw.split("\n")) {
			if (!line.trim()) continue;
			try {
				const row = JSON.parse(line) as Extracted;
				map.set(row.id, row);
			} catch { /* ignore a torn last line */ }
		}
	} catch { /* first run */ }
	return map;
}

function writeReport(state: RunState) {
	const remaining = state.total - state.processed;
	const pct = state.total ? ((state.processed / state.total) * 100).toFixed(1) : "0.0";
	const status = remaining <= 0 ? "✅ complete" : "⏳ in progress (or interrupted)";
	const lines = [
		"# Keyword backfill report",
		"",
		`**Status:** ${status}`,
		`**Started:** ${state.startedAt}`,
		`**Updated:** ${state.updatedAt}`,
		"",
		"## Progress",
		"",
		"| metric | value |",
		"| --- | --- |",
		`| articles in database | ${state.total} |`,
		`| articles processed | ${state.processed} |`,
		`| remaining | ${remaining} |`,
		`| completion | ${pct}% |`,
		`| keyword documents created | ${state.createdKeywords} |`,
		"",
		"## Resume",
		"",
		"```bash",
		"cd back",
		"deno run -A scripts/keywords/run.ts --apply",
		"```",
		"",
		"Processed article ids live in `scripts/keywords/state/processed.jsonl` (one",
		"line per finished article). The script skips any id already listed there, so",
		"re-running after an interruption continues from the last checkpoint.",
		"",
		"## Last batch",
		"",
	];
	if (state.lastBatch.length === 0) lines.push("_nothing yet_");
	for (const row of state.lastBatch) {
		lines.push(`- **${row.title.slice(0, 90)}** — ${row.keywords.join("، ")}`);
	}
	if (state.failed.length > 0) {
		lines.push("", `## Failures (${state.failed.length})`, "");
		for (const f of state.failed.slice(-50)) {
			lines.push(`- \`${f.id}\` ${f.title.slice(0, 70)} — ${f.error}`);
		}
	}
	lines.push("");
	Deno.writeTextFileSync(REPORT_FILE, lines.join("\n"));
}

// --------------------------------------------------------------------- main

async function main() {
	const args = parseArgs(Deno.args);
	await Deno.mkdir(STATE_DIR, { recursive: true });

	const articles = await loadArticles();
	console.log(`loaded ${articles.length} articles`);

	const extracted = extractAll(articles, { maxKeywords: args.maxKeywords });

	if (args.preview > 0 && !args.apply) {
		for (const row of extracted.slice(0, args.preview)) {
			console.log(`\n— ${row.title}`);
			console.log(`  ${row.keywords.map((k, i) => `${k} (${row.scores[i]})`).join(" | ")}`);
		}
		const sizes = extracted.map((e) => e.keywords.length);
		console.log(`\nkeyword count per article: min ${Math.min(...sizes)}, max ${Math.max(...sizes)}`);
		const uniq = new Set(extracted.flatMap((e) => e.keywords.map(normalize)));
		console.log(`distinct keywords: ${uniq.size}`);
		return;
	}

	if (!args.apply) {
		console.log("nothing to do — pass --preview N or --apply");
		return;
	}

	const processed = args.force ? new Map<string, Extracted>() : await readProcessed();
	if (args.force) await Deno.writeTextFile(PROCESSED_FILE, "");

	let todo = extracted.filter((e) => !processed.has(e.id));
	if (args.limit > 0) todo = todo.slice(0, args.limit);
	console.log(`already processed: ${processed.size}, this run: ${todo.length}`);

	const token = await login();
	const cache = await loadKeywordCache();
	const createdBefore = cache.size;

	const state: RunState = {
		startedAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
		total: extracted.length,
		processed: processed.size,
		failed: [],
		createdKeywords: cache.size,
		lastBatch: [],
	};
	writeReport(state);

	let done = 0;
	const append = (row: Extracted) =>
		Deno.writeTextFileSync(PROCESSED_FILE, JSON.stringify(row) + "\n", { append: true });

	for (const row of todo) {
		try {
			// 1. resolve or create every keyword of this article
			const ids: string[] = [];
			const seen = new Set<string>();
			for (const name of row.keywords) {
				const key = normalize(name);
				// two spellings of the same term (with/without ZWNJ) must not be
				// linked twice — Lesan rejects duplicate ids in one relation
				if (seen.has(key)) continue;
				seen.add(key);

				const hit = cache.get(key);
				if (hit) {
					ids.push(hit.id);
					continue;
				}
				const created = await act<{ _id: string; name: string }>(
					token,
					"keyword",
					"addKeyword",
					{ set: { name }, get: { _id: 1, name: 1 } },
				);
				cache.set(key, { id: created._id, name: created.name ?? name });
				ids.push(created._id);
			}

			// 2. link them to the article
			await act(token, "article", "updateArticleRelations", {
				set: { _id: row.id, keywords: ids },
				get: { _id: 1 },
			});

			append(row);
			state.processed++;
			state.createdKeywords = cache.size;
			state.lastBatch.push({ title: row.title, keywords: row.keywords });
			if (state.lastBatch.length > 15) state.lastBatch.shift();
			done++;
		} catch (error) {
			const message = error instanceof Error ? error.message : String(error);
			state.failed.push({ id: row.id, title: row.title, error: message });
			console.error(`✗ ${row.id} ${row.title.slice(0, 60)} — ${message}`);
		}

		if (done % CHECKPOINT_EVERY === 0) {
			state.updatedAt = new Date().toISOString();
			writeReport(state);
			await saveKeywordCache(cache);
			console.log(`… ${state.processed}/${state.total} articles, ${cache.size} keywords`);
		}
	}

	state.updatedAt = new Date().toISOString();
	writeReport(state);
	await saveKeywordCache(cache);

	console.log(
		`\ndone: ${done} articles this run, ${state.failed.length} failures, ` +
			`${cache.size - createdBefore} new keywords, ${cache.size} total keywords`,
	);
	if (state.failed.length > 0) {
		console.log("failures are listed in KEYWORD_PROGRESS.md; re-run to retry them");
	}
}

if (import.meta.main) await main();
