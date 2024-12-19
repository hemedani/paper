import { setTokens, setUser } from "@paper/lib";
import { coreApp } from "../../../mod.ts";
import { updateArticleFn } from "./updateArticle.fn.ts";
import { updateArticleValidator } from "./updateArticle.val.ts";

export const updateArticleSetup = () =>
	coreApp.acts.setAct({
		schema: "article",
		fn: updateArticleFn,
		actName: "updateArticle",
		preAct: [
			setTokens,
			setUser,
		],
		validator: updateArticleValidator(),
	});
