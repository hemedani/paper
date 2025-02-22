import { grantAccess, setTokens, setUser } from "@paper/lib";
import { removeKeywordFn } from "./removeKeyword.fn.ts";
import { removeKeywordValidator } from "./removeKeyword.val.ts";
import { coreApp } from "../../../mod.ts";

export const removeKeywordSetup = () =>
	coreApp.acts.setAct({
		schema: "keyword",
		actName: "removeKeyword",
		fn: removeKeywordFn,
		preAct: [
			setTokens,
			setUser,
			grantAccess({
				levels: ["Manager"],
			}),
		],
		validator: removeKeywordValidator(),
	});
