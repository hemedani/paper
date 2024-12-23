import { grantAccess, setTokens, setUser } from "@paper/lib";
import { updateTagFn } from "./updateTag.fn.ts";
import { updateTagValidator } from "./updateTag.val.ts";
import { coreApp } from "../../../mod.ts";

export const updateTagSetup = () =>
	coreApp.acts.setAct({
		schema: "tag",
		fn: updateTagFn,
		actName: "updateTag",
		preAct: [
			setTokens,
			setUser,
			grantAccess({
				levels: ["Manager"],
			}),
		],
		validator: updateTagValidator(),
	});
