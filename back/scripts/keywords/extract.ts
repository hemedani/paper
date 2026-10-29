// Corpus-level TF-IDF keyphrase extraction for Persian article abstracts.
//
// Every article is scored independently, but document frequency is computed
// over the whole corpus, so field-specific compounds ("بافت تاریخی",
// "ساختار فضایی") outrank generic research vocabulary that appears everywhere.

import { candidates, tokenize } from "./persian.ts";
import { tokenizeEn } from "./english.ts";

export type Doc = { id: string; title: string; abstract: string };

export type Extracted = {
	id: string;
	title: string;
	keywords: string[];
	scores: number[];
};

type TermStat = { surface: string; tf: number; size: number; weak: boolean };

const DEFAULTS = { maxKeywords: 6, minKeywords: 3, cutoff: 0.18 };

/** Latin-script abstracts are a minority of the corpus but must not be skipped. */
export function isEnglish(text: string): boolean {
	const latin = (text.match(/[A-Za-z]/g) ?? []).length;
	const persian = (text.match(/[\u0600-\u06FF]/g) ?? []).length;
	return latin > persian;
}

function tokensFor(text: string) {
	return isEnglish(text) ? tokenizeEn(text) : tokenize(text);
}

export function extractAll(
	docs: Doc[],
	opts: { maxKeywords?: number } = {},
): Extracted[] {
	const maxKeywords = opts.maxKeywords ?? DEFAULTS.maxKeywords;

	// --- per-document term frequencies -------------------------------------
	const perDoc = new Map<string, Map<string, TermStat>>();
	const df = new Map<string, number>();
	const titleTerms = new Map<string, Set<string>>();

	for (const doc of docs) {
		const body = doc.abstract.trim().length >= 40 ? doc.abstract : doc.title;
		const stats = new Map<string, TermStat>();

		for (const c of candidates(tokensFor(body))) {
			const prev = stats.get(c.key);
			if (prev) {
				prev.tf += 1;
				if (prev.weak && !c.weak) prev.weak = false;
			} else {
				stats.set(c.key, { surface: c.surface, tf: 1, size: c.size, weak: c.weak });
			}
		}

		perDoc.set(doc.id, stats);
		for (const key of stats.keys()) df.set(key, (df.get(key) ?? 0) + 1);

		const titleStats = new Set<string>();
		for (const c of candidates(tokensFor(doc.title))) titleStats.add(c.key);
		titleTerms.set(doc.id, titleStats);
	}

	// --- scoring -----------------------------------------------------------
	const N = docs.length;
	const out: Extracted[] = [];

	for (const doc of docs) {
		const stats = perDoc.get(doc.id)!;
		const inTitle = titleTerms.get(doc.id)!;

		const scored: { key: string; surface: string; score: number }[] = [];
		for (const [key, s] of stats) {
			if (s.weak) continue;
			const docFreq = df.get(key) ?? 1;
			// single occurrences are usually typos or proper names; keep them only
			// when the phrase also appears in the title.
			if (docFreq < 2 && !inTitle.has(key)) continue;
			const idf = Math.log((N + 1) / (docFreq + 0.5));
			const tf = 1 + Math.log(s.tf);
			// long phrases are penalised unless the author put them in the title
			const lengthPenalty = s.size === 3 ? 0.85 : 1;
			const boost = inTitle.has(key) ? 2 : 1;
			scored.push({ key, surface: s.surface, score: tf * idf * boost * lengthPenalty });
		}

		scored.sort((a, b) => b.score - a.score);

		const picked: { key: string; surface: string; score: number }[] = [];
		const usedTokens = new Set<string>();
		const top = scored[0]?.score ?? 0;

		for (const cand of scored) {
			if (picked.length >= maxKeywords) break;
			if (top > 0 && cand.score < top * DEFAULTS.cutoff) break;
			const parts = cand.key.split(" ");
			if (parts.some((p) => usedTokens.has(p))) continue;
			picked.push(cand);
			for (const p of parts) usedTokens.add(p);
		}

		// very short abstracts can fall below the minimum; relax the overlap rule
		// once rather than shipping one or two keywords.
		if (picked.length < DEFAULTS.minKeywords) {
			for (const cand of scored) {
				if (picked.length >= DEFAULTS.minKeywords) break;
				if (picked.some((p) => p.key === cand.key)) continue;
				picked.push(cand);
			}
		}

		out.push({
			id: doc.id,
			title: doc.title,
			keywords: picked.map((p) => tidy(p.surface)),
			scores: picked.map((p) => Number(p.score.toFixed(2))),
		});
	}

	return out;
}

/** Collapse whitespace and strip stray joiners from a display keyword. */
function tidy(surface: string): string {
	return surface.replace(/\s+/g, " ").trim();
}
