import type { ActFn } from "deps";
import {
	article,
	author,
	blog,
	category,
	keyword,
	publication,
	tag,
	user,
} from "../../../mod.ts";

export const dashboardStatisticFn: ActFn = async () => {
	const users = await user.countDocument({});
	const tags = await tag.countDocument({});
	const publications = await publication.countDocument({});
	const articles = await article.countDocument({});
	const blogs = await blog.countDocument({});
	const keywords = await keyword.countDocument({});
	const authors = await author.countDocument({});
	const categories = await category.countDocument({});

	return {
		users,
		tags,
		publications,
		articles,
		keywords,
		blogs,
		authors,
		categories,
	};
};
