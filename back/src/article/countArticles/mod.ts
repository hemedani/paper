import { countArticlesFn } from "./countArticles.fn.ts";
import { countArticlesValidator } from "./countArticles.val.ts";
import { coreApp } from "../../../mod.ts";

export const countArticlesSetup = () =>
	coreApp.acts.setAct({
		schema: "article",
		fn: countArticlesFn,
		actName: "countArticles",
		validator: countArticlesValidator(),
	});
