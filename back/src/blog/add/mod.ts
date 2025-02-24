import { grantAccess, setTokens, setUser } from "@paper/lib";
import { coreApp } from "../../../mod.ts";
import { addFn } from "./add.fn.ts";
import { addValidator } from "./add.val.ts";

export const addSetup = () =>
	coreApp.acts.setAct({
		schema: "blog",
		fn: addFn,
		actName: "add",
		preAct: [
			setTokens,
			setUser,
			grantAccess({
				levels: ["Manager", "Editor"],
			}),
		],
		validator: addValidator(),
		validationRunType: "create",
	});
