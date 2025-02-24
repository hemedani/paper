import { grantAccess, setTokens, setUser } from "@paper/lib";
import { removeFn } from "./remove.fn.ts";
import { removeValidator } from "./remove.val.ts";
import { coreApp } from "../../../mod.ts";

export const removeSetup = () =>
	coreApp.acts.setAct({
		schema: "blog",
		actName: "remove",
		fn: removeFn,
		preAct: [
			setTokens,
			setUser,
			grantAccess({
				levels: ["Manager", "Editor"],
			}),
		],
		validator: removeValidator(),
	});
