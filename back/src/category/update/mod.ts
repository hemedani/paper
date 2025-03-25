import { grantAccess, setTokens, setUser } from "@paper/lib";
import { coreApp } from "../../../mod.ts";
import { updateFn } from "./update.fn.ts";
import { updateValidator } from "./update.val.ts";

export const updateSetup = () =>
	coreApp.acts.setAct({
		schema: "category",
		fn: updateFn,
		actName: "update",
		preAct: [
			setTokens,
			setUser,
			grantAccess({
				levels: ["Manager", "Editor"],
			}),
		],
		validator: updateValidator(),
	});
