import { grantAccess, setTokens, setUser } from "@paper/lib";
import { countKeywordsFn } from "./countKeywords.fn.ts";
import { countKeywordsValidator } from "./countKeywords.val.ts";
import { coreApp } from "../../../mod.ts";

export const countKeywordsSetup = () =>
	coreApp.acts.setAct({
		schema: "keyword",
		fn: countKeywordsFn,
		actName: "countKeywords",
		preAct: [
			setTokens,
			setUser,
			grantAccess({
				levels: ["Manager"],
			}),
		],
		validator: countKeywordsValidator(),
	});
