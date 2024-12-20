import { coreApp } from "../../../mod.ts";
import { getArticlesFn } from "./getArticles.fn.ts";
import { getArticlesValidator } from "./getArticles.val.ts";

export const getArticlesSetup = () =>
	coreApp.acts.setAct({
		schema: "article",
		actName: "getArticles",
		validator: getArticlesValidator(),
		fn: getArticlesFn,
	});
