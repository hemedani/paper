// English side of the keyword extractor. ~140 articles in this corpus have
// Latin-script abstracts; they go through the same scoring in extract.ts, they
// just need their own tokeniser and stop lists.

import type { Token } from "./persian.ts";

const STOPWORDS = new Set(
	`
	a an the and or but if then than that this these those of in on at to for from by
	with without into onto over under between among during after before while as
	such via per within across against about above below around because both each
	other another any all some most more less few many much no not nor only own same
	so too very can could may might must shall should will would do does did done
	doing have has had having be been being is are was were it its their there here
	they them we us our you your he she his her who whom whose which what when where
	why how one two three also however therefore thus moreover furthermore although
	though while whereas rather instead both either neither i e eg ie etc
	toward towards upon unlike along behind beyond despite throughout whether
	just even still yet already often always never sometimes
	`.trim().split(/\s+/),
);

/** Generic research vocabulary: allowed only inside a compound. */
const WEAK = new Set(
	`
	study paper article research method methods methodology result results finding
	findings approach approaches analysis analyze analysed analyzed data aim aims
	purpose objective objectives present presents presented propose proposed
	provide provides provided examine examines examined investigate investigates
	investigated discuss discusses discussed show shows showed shown suggest suggests
	suggested argue argues argued focus focuses focused based use uses used using
	main general different various specific new important role effect effects
	impact impacts case cases example examples aspect aspects issue issues context
	framework level levels number type types part parts area areas field fields
	work works working concept concepts model models process processes
	`.trim().split(/\s+/),
);

function stem(word: string): string {
	let w = word;
	if (w.length > 4 && w.endsWith("ies")) w = `${w.slice(0, -3)}y`;
	else if (w.length > 4 && w.endsWith("ing")) w = w.slice(0, -3);
	else if (w.length > 4 && w.endsWith("ed")) w = w.slice(0, -2);
	else if (w.length > 3 && w.endsWith("s") && !w.endsWith("ss")) w = w.slice(0, -1);
	return w;
}

export function tokenizeEn(text: string): Token[] {
	const out: Token[] = [];
	const cleaned = text
		.toLowerCase()
		.replace(/[^a-z\s'-]/g, " ")
		.replace(/['-]/g, "")
		.replace(/\s+/g, " ")
		.trim();

	for (const surface of cleaned.split(" ")) {
		if (!surface) continue;
		const key = stem(surface);
		if (key.length < 3) continue;
		const stop = STOPWORDS.has(surface) || STOPWORDS.has(key);
		const content = !stop;
		out.push({
			surface,
			key,
			content,
			weak: WEAK.has(surface) || WEAK.has(key),
			joinedWithPrev: false,
			boundaryBefore: false,
		});
	}
	return out;
}
