import type { ActFn } from "deps";
import { article } from "../../../mod.ts";

export const getArticlesFn: ActFn = async (body) => {
	const {
		set: {
			page,
			limit,
			search,
		},
		get,
	} = body.details;

	const pipeline = [];

	search && pipeline.push({ $match: { $text: { $search: search } } });
	pipeline.push({ $limit: limit });
	pipeline.push({ $skip: (page - 1) * limit });
	pipeline.push({ $sort: { _id: -1 } });

	return await article.aggregation({ pipeline, projection: get }).toArray();
};
