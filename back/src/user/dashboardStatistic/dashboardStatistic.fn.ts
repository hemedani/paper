import type { ActFn } from "deps";
import { article, publication, tag, user } from "../../../mod.ts";

export const dashboardStatisticFn: ActFn = async () => {
	const users = await user.countDocument({});
	const tags = await tag.countDocument({});
	const publications = await publication.countDocument({});
	const articles = await article.countDocument({});

	return { users, tags, publications, articles };
};
