import { grantAccess, setTokens, setUser } from "@paper/lib";
import { removeArticleFn } from "./removeArticle.fn.ts";
import { removeArticleValidator } from "./removeArticle.val.ts";
import { coreApp } from "../../../mod.ts";

export const removeArticleSetup = () =>
	coreApp.acts.setAct({
		schema: "article",
		actName: "removeArticle",
		fn: removeArticleFn,
		preAct: [
			setTokens,
			setUser,
			grantAccess({
				levels: ["Manager"],
			}),
		],
		validator: removeArticleValidator(),
	});
