import { grantAccess, setTokens, setUser } from "@paper/lib";
import { coreApp } from "../../../mod.ts";
import { addTagFn } from "./addTag.fn.ts";
import { addTagValidator } from "./addTag.val.ts";

export const addTagSetup = () =>
	coreApp.acts.setAct({
		schema: "tag",
		fn: addTagFn,
		actName: "addTag",
		preAct: [
			setTokens,
			setUser,
			grantAccess({
				levels: ["Manager"],
			}),
		],
		validator: addTagValidator(),
		validationRunType: "create",
	});
