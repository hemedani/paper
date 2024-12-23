import { grantAccess, setTokens, setUser } from "@paper/lib";
import { coreApp } from "../../../mod.ts";
import { addArticleFn } from "./addArticle.fn.ts";
import { addArticleValidator } from "./addArticle.val.ts";

export const addArticleSetup = () =>
	coreApp.acts.setAct({
		schema: "article",
		actName: "addArticle",
		validationRunType: "create",
		preAct: [
			setTokens,
			setUser,
			grantAccess({
				levels: ["Manager"],
			}),
		],
		validator: addArticleValidator(),
		fn: addArticleFn,
	});
