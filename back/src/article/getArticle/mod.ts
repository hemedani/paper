import { coreApp } from "../../../mod.ts";
import { getArticleFn } from "./getArticle.fn.ts";
import { getArticleValidator } from "./getArticle.val.ts";

export const getArticleSetup = () =>
	coreApp.acts.setAct({
		schema: "article",
		fn: getArticleFn,
		actName: "getArticle",
		validator: getArticleValidator(),
	});
