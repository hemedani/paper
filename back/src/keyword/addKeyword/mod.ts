import { grantAccess, setTokens, setUser } from "@paper/lib";
import { coreApp } from "../../../mod.ts";
import { addKeywordFn } from "./addKeyword.fn.ts";
import { addKeywordValidator } from "./addKeyword.val.ts";

export const addKeywordSetup = () =>
	coreApp.acts.setAct({
		schema: "keyword",
		fn: addKeywordFn,
		actName: "addKeyword",
		preAct: [
			setTokens,
			setUser,
			grantAccess({
				levels: ["Manager"],
			}),
		],
		validator: addKeywordValidator(),
		validationRunType: "create",
	});
