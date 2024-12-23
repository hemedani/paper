import { grantAccess, setTokens, setUser } from "@paper/lib";
import { removeTagFn } from "./removeTag.fn.ts";
import { removeTagValidator } from "./removeTag.val.ts";
import { coreApp } from "../../../mod.ts";

export const removeTagSetup = () =>
	coreApp.acts.setAct({
		schema: "tag",
		actName: "removeTag",
		fn: removeTagFn,
		preAct: [
			setTokens,
			setUser,
			grantAccess({
				levels: ["Manager"],
			}),
		],
		validator: removeTagValidator(),
	});
