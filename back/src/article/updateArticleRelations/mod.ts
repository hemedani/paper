import { grantAccess, setTokens, setUser } from "@paper/lib";
import { coreApp } from "../../../mod.ts";
import { updateArticleRelationsFn } from "./updateArticleRelations.fn.ts";
import { updateArticleRelationsValidator } from "./updateArticleRelations.val.ts";
import { checkGhostUser } from "../../user/addUser/mod.ts";

export const updateArticleRelationsSetup = () =>
	coreApp.acts.setAct({
		schema: "article",
		fn: updateArticleRelationsFn,
		actName: "updateArticleRelations",
		preAct: [
			setTokens,
			setUser,
			grantAccess({
				levels: ["Ghost", "Manager"],
			}),
			checkGhostUser,
		],
		validator: updateArticleRelationsValidator(),
		validationRunType: "create",
	});
