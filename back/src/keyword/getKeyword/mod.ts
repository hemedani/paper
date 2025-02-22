import { setTokens, setUser } from "@paper/lib";
import { coreApp } from "../../../mod.ts";
import { getKeywordFn } from "./getKeyword.fn.ts";
import { getKeywordValidator } from "./getKeyword.val.ts";

export const getKeywordSetup = () =>
	coreApp.acts.setAct({
		schema: "keyword",
		fn: getKeywordFn,
		actName: "getKeyword",
		preAct: [
			setTokens,
			setUser,
		],
		validator: getKeywordValidator(),
	});
