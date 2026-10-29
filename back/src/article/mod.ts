import { addArticleSetup } from "./addArticle/mod.ts";
import { countArticlesSetup } from "./countArticles/mod.ts";
import { getArticleSetup } from "./getArticle/mod.ts";
import { getArticlesSetup } from "./getArticles/mod.ts";
import { getLandingHighlightsSetup } from "./getLandingHighlights/mod.ts";
import { removeArticleSetup } from "./removeArticle/mod.ts";
import { updateArticleSetup } from "./updateArticle/mod.ts";
import { updateArticleRelationsSetup } from "./updateArticleRelations/mod.ts";

export const articleSetup = () => {
	addArticleSetup();
	getArticleSetup();
	getArticlesSetup();
	getLandingHighlightsSetup();
	updateArticleSetup();
	countArticlesSetup();
	removeArticleSetup();
	updateArticleRelationsSetup();
};
