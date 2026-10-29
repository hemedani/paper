// Persian text normalisation, tokenisation and stemming for keyword extraction.
// Everything here is deterministic and dependency-free so a run can be resumed
// and reproduce the same keyword sets.

export const ZWNJ = "\u200c";
const JOIN = "\u0001"; // sentinel for ZWNJ while normalising
const BREAK = "\u0002"; // sentinel for punctuation: a keyphrase cannot span it

/** Punctuation that ends a phrase; hyphens are left as plain spaces. */
const HARD_BREAK = new Set([".", ":", ";", "!", "?", "،", "؛", "«", "»", "(", ")", "[", "]", "{", "}", "…", "\"", "'", "/", "\\", "|", "–", "—", "•", "*", "="]);

const CHAR_MAP: Record<string, string> = {
	"\u064A": "\u06CC", // ي -> ی
	"\u0649": "\u06CC", // ى -> ی
	"\u0643": "\u06A9", // ك -> ک
	"\u0623": "\u0627", // أ -> ا
	"\u0625": "\u0627", // إ -> ا
	"\u0622": "\u0627", // آ -> ا
	"\u0629": "\u0647", // ة -> ه
	"\u06C0": "\u0647", // ۀ -> ه
	"\u0624": "\u0648", // ؤ -> و
	"\u0626": "\u06CC", // ئ -> ی
};
const DROP = /[\u064B-\u0655\u0670\u0640]/;

/**
 * Normalises the text and keeps ZWNJ as a sentinel. ZWNJ is a word *joiner*
 * ("اعیان‌سازی") but sometimes just separates a clitic ("یکی‌از"), so it is
 * resolved during tokenisation instead of being dropped here.
 *
 * Returns a per-character map back into the original string so keyword display
 * forms keep their real spelling ("درآمدی", not "درامدی").
 */
export function normalizeWithMap(text: string): { text: string; map: number[] } {
	let out = "";
	const map: number[] = [];

	for (let i = 0; i < text.length; i++) {
		const ch = text[i];
		if (DROP.test(ch)) continue;
		if (ch === ZWNJ) {
			out += JOIN;
			map.push(i);
			continue;
		}
		const mapped = CHAR_MAP[ch] ?? ch;
		let rep: string;
		if (/[\u06F0-\u06F9]/.test(mapped)) {
			rep = String(mapped.charCodeAt(0) - 0x06f0);
		} else if (/[\u0660-\u0669]/.test(mapped)) {
			rep = String(mapped.charCodeAt(0) - 0x0660);
		} else if (/[\p{L}\p{N}]/u.test(mapped)) {
			rep = mapped.toLowerCase();
		} else {
			rep = HARD_BREAK.has(ch) ? BREAK : " ";
		}
		// collapse runs of separators, keeping the strongest one
		if (rep === " ") {
			if (out.length === 0 || out.endsWith(" ") || out.endsWith(BREAK) || out.endsWith(JOIN)) continue;
		}
		if (rep === BREAK && (out.length === 0 || out.endsWith(BREAK))) continue;
		out += rep;
		map.push(i);
	}
	return { text: out.trim(), map };
}

/**
 * Normalised form used as the identity of a keyword (cache keys, matching).
 * ZWNJ is dropped here so "اعیان‌سازی" and "اعیانسازی" are the same keyword.
 */
export function normalize(text: string): string {
	return normalizeWithMap(text).text.split(JOIN).join("");
}

/** Function words and verb forms: never part of a keyword. */
const STOPWORDS = new Set(
	`
	و در به از که این آن با را برای تا هم نیز یا بر بی چون چرا اگر اما ولی بلکه پس سپس
	لذا بنابراین زیرا چه چی کی کجا چگونه هر همه هیچ بعضی برخی دیگر دیگران خود خودش
	خودشان ما شما آنها ایشان او من تو وی ضمن طی جهت طریق باب حسب وفق روی زیر نزد
	پیش بالا پایین داخل خارج علاوه همراه هنگام زمان بین میان بدون توسط درباره
	درباره‌ی راجع نسبت همچون همان همانند چنان چندان آنکه اینکه اگرچه هرچند
	بلکه نه بله آری خیر بلی همچنین چراگاه کدام کدامیک چند چندین بسیار کم کمتر بیشتر
	بیشترین کمترین اول دوم سوم چهارم پنجم آخر نهایت انتها ابتدا آغاز پایان
	است هست بود بودند باشد باشند شدن شده شوند شود شوم شوی شویم می‌شود می‌شوند
	می‌کند می‌کنند می‌کرد می‌کردند کرده کرد کردند کند کنند کنم کنی کنیم داشت
	دارد دارند داشتند داشته خواهند خواهد نمود نماید نمایند نمودند توان توانست
	توانند بتواند بتوانند باید نباید بایستی شاید نیست نیستند نبود نباشد
	دارای شامل عنوان مانند مثل مثال طور گونه نوعی انواع همین همین‌گونه بسیار
	بسیاری اندکی تنها فقط حتی دیگران بایست بتوان همین‌طور آن‌گونه این‌گونه
	شده‌است شدهاست نگرفته‌است گرفته‌است می‌باشد باشند نمی‌شود نمی‌توان
	دهد دهد دهیم دهند گیرند گیرد گرفته گیرنده یابد یابند یافت
	های ی هایی یکی ازجمله برمبنای حال نموده نمودن دهه قرن
	`.trim().split(/\s+/),
);

/**
 * Boilerplate research vocabulary: too generic to stand alone as a keyword, but
 * still allowed inside a compound ("تحلیل محتوا", "روش دلفی").
 */
const WEAK = new Set(
	`
	مقاله پژوهش مطالعه تحقیقات تحقیق بررسی نویسندگان نگارندگان نگارنده نویسنده
	هدف اهداف روش روش‌ها روشهای روششناسی داده داده‌ها دادهها نتایج یافته یافته‌ها
	نتیجه مقدمه نتیجه‌گیری بحث پیشنهاد پیشنهادها ارائه انجام استفاده توجه اشاره وجود
	عدم اهمیت نقش عوامل عامل تأثیر تاثیر رابطه تفاوت مقایسه شناخت درک تبیین
	حوزه زمینه جنبه بخش قسمت شکل صورت میزان تعداد سطح حدود وضعیت شرایط
	مسئله موضوع مسائل مباحث مطلب نکته موارد مورد نمونه جامعه آماری اطلاعات
	ممکن مختلف متعدد مناسب لازم ضروری اصلی کلی جزئی خاص عمومی
	`.trim().split(/\s+/),
);

/** Common verb endings; tokens like "نگرفته‌است" are never keywords. */
const VERB_SUFFIX = ["است", "هستند", "باشند", "شوند", "کنند", "یابند", "دارند"];
const INFINITIVE_SUFFIX = ["بودن", "شدن", "کردن", "نمودن", "داشتن", "گرفتن", "رفتن", "پرداختن"];
const VERB_WHITELIST = new Set(["راست", "درست", "خواست", "برخاست", "کاست", "پیوست", "گسست"]);

export function isStopword(token: string): boolean {
	return STOPWORDS.has(token);
}

export function isWeak(token: string): boolean {
	return WEAK.has(token);
}

function isVerbal(token: string): boolean {
	if (VERB_WHITELIST.has(token)) return false;
	if (token.length > 4 && token.endsWith("اند")) return true;
	if (INFINITIVE_SUFFIX.some((s) => token.endsWith(s))) return true;
	// infinitives: ساختن، پرداختن، رسیدن، نمودن
	if (token.length >= 5 && (token.endsWith("دن") || token.endsWith("تن"))) return true;
	// infinitives: ساختن، پرداختن، رسیدن، نمودن
	if (token.length >= 5 && (token.endsWith("دن") || token.endsWith("تن"))) return true;
	return VERB_SUFFIX.some((s) => token.length > s.length + 3 && token.endsWith(s));
}

/** Light plural suffix stripping, applied to the scoring key only. */
export function stem(token: string): string {
	if (token.length > 5 && token.endsWith("هایی")) return token.slice(0, -4);
	if (token.length > 5 && token.endsWith("های")) return token.slice(0, -3);
	if (token.length > 4 && token.endsWith("ها")) return token.slice(0, -2);
	return token;
}

export type Token = {
	surface: string;
	key: string;
	/** true when the token can carry meaning in a keyphrase */
	content: boolean;
	weak: boolean;
	/** the previous token was glued to this one with a ZWNJ */
	joinedWithPrev: boolean;
	/** punctuation separates this token from the previous one */
	boundaryBefore: boolean;
};

/**
 * Tokens keep their original position (stopwords included, flagged
 * `content: false`) so bigrams are only built from genuinely adjacent words.
 * Dropping stopwords first would fuse "درآمدی بر فهم" into "درامدی فهم".
 */
export function tokenize(text: string): Token[] {
	const { text: prepared, map } = normalizeWithMap(text);
	const out: Token[] = [];
	const re = /[^\s\u0001\u0002]+/g;
	let match: RegExpExecArray | null;
	let prevEnd = -1;

	while ((match = re.exec(prepared)) !== null) {
		const start = match.index;
		const gap = prevEnd >= 0 ? prepared.slice(prevEnd, start) : BREAK;
		const joinedWithPrev = gap.includes(JOIN) && !gap.includes(" ") && !gap.includes(BREAK);
		const boundaryBefore = gap.includes(BREAK);
		prevEnd = re.lastIndex;

		const normalized = match[0];
		if (/^\d+$/.test(normalized)) continue;
		if (/^[a-z]+$/.test(normalized)) continue; // latin fragments / noise

		// display form comes from the original text so "آ" and ZWNJ survive
		const surface = cleanDisplay(text.slice(map[start], map[start + normalized.length - 1] + 1));
		const stop = isStopword(normalized);
		const verbal = isVerbal(normalized);
		const key = stem(normalized.split(JOIN).join(""));
		const content = !stop && !verbal && surface.length >= 3 && key.length >= 3;
		out.push({
			surface,
			key,
			content,
			weak: isWeak(key) || isWeak(normalized),
			joinedWithPrev,
			boundaryBefore,
		});
	}
	return out;
}

function cleanDisplay(raw: string): string {
	return raw.replace(/[\u064B-\u0655\u0670\u0640]/g, "").replace(/\s+/g, " ").trim();
}

export type Candidate = {
	key: string;
	surface: string;
	weak: boolean;
	size: number;
};

/** Candidate keyphrases: unigrams, adjacent bigrams, adjacent trigrams. */
export function candidates(tokens: Token[]): Candidate[] {
	const out: Candidate[] = [];
	const glue = (a: Token, b: Token) => (b.joinedWithPrev ? ZWNJ : " ");

	for (let i = 0; i < tokens.length; i++) {
		const a = tokens[i];
		if (!a.content) continue;
		if (!a.weak) out.push({ key: a.key, surface: a.surface, weak: false, size: 1 });

		const b = tokens[i + 1];
		if (!b?.content || b.boundaryBefore) continue;
		out.push({
			key: `${a.key} ${b.key}`,
			surface: `${a.surface}${glue(a, b)}${b.surface}`,
			weak: a.weak && b.weak,
			size: 2,
		});

		const c = tokens[i + 2];
		if (!c?.content || c.boundaryBefore) continue;
		// trigrams are useful ("بافت تاریخی شهر") but easily become phrases, so
		// they are only considered when at least one word is specific.
		if (a.weak && b.weak && c.weak) continue;
		out.push({
			key: `${a.key} ${b.key} ${c.key}`,
			surface: `${a.surface}${glue(a, b)}${b.surface}${glue(b, c)}${c.surface}`,
			weak: false,
			size: 3,
		});
	}
	return out;
}
