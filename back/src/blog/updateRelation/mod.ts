import { grantAccess, setTokens, setUser } from "@paper/lib";
import { updateRelationFn } from "./updateRelation.fn.ts";
import { updateRelationValidator } from "./updateRelation.val.ts";
import { coreApp } from "../../../mod.ts";

export const updateRelationSetup = () =>
	coreApp.acts.setAct({
		schema: "blog",
		fn: updateRelationFn,
		actName: "updateRelation",
		preAct: [
			setTokens,
			setUser,
			grantAccess({
				levels: ["Manager", "Editor"],
			}),
		],
		validator: updateRelationValidator(),
	});
