import { addArticleSetup } from "./addArticle/mod.ts";
import { countArticlesSetup } from "./countArticles/mod.ts";
import { getArticleSetup } from "./getArticle/mod.ts";
import { getArticlesSetup } from "./getArticles/mod.ts";
import { updateArticleSetup } from "./updateArticle/mod.ts";

export const articleSetup = () => {
	addArticleSetup();
	getArticleSetup();
	getArticlesSetup();
	updateArticleSetup();
	countArticlesSetup();
};
