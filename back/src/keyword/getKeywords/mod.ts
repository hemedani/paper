import { coreApp } from "../../../mod.ts";
import { getKeywordsFn } from "./getKeywords.fn.ts";
import { getKeywordsValidator } from "./getKeywords.val.ts";

export const getKeywordsSetup = () =>
	coreApp.acts.setAct({
		schema: "keyword",
		fn: getKeywordsFn,
		actName: "getKeywords",
		validator: getKeywordsValidator(),
	});
