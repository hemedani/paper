import { addKeywordSetup } from "./addKeyword/mod.ts";
import { getKeywordSetup } from "./getKeyword/mod.ts";
import { getKeywordsSetup } from "./getKeywords/mod.ts";
import { updateKeywordSetup } from "./updateKeyword/mod.ts";
import { removeKeywordSetup } from "./removeKeyword/mod.ts";
import { countKeywordsSetup } from "./countKeywords/mod.ts";

export const keywordSetup = () => {
	addKeywordSetup();
	updateKeywordSetup();
	getKeywordSetup();
	getKeywordsSetup();
	removeKeywordSetup();
	countKeywordsSetup();
};
