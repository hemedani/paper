import { grantAccess, setTokens, setUser } from "@paper/lib";
import { updateKeywordFn } from "./updateKeyword.fn.ts";
import { updateKeywordValidator } from "./updateKeyword.val.ts";
import { coreApp } from "../../../mod.ts";

export const updateKeywordSetup = () =>
	coreApp.acts.setAct({
		schema: "keyword",
		fn: updateKeywordFn,
		actName: "updateKeyword",
		preAct: [
			setTokens,
			setUser,
			grantAccess({
				levels: ["Manager"],
			}),
		],
		validator: updateKeywordValidator(),
	});
