import { addArticleSetup } from "./addArticle/mod.ts";
import { getArticlesSetup } from "./getArticles/mod.ts";
import { updateArticleSetup } from "./updateArticle/mod.ts";

export const articleSetup = () => {
	addArticleSetup();
	updateArticleSetup();
	getArticlesSetup();
};
