import type { ActFn } from "deps";
import { blog } from "../../../mod.ts";

export const getsFn: ActFn = async (body) => {
	const {
		set: {
			page,
			limit,
			search,
			isInSwipper,
			sortByLikes,
		},
		get,
	} = body.details;

	const pipeline = [];

	search && pipeline.push({ $match: { $text: { $search: search } } });
	isInSwipper && pipeline.push({ $match: { isInSwipper } });

	const sort = sortByLikes ? { likes: -1 } : { _id: -1 };

	pipeline.push({ $sort: sort });
	pipeline.push({ $skip: (page - 1) * limit });
	pipeline.push({ $limit: limit });

	return await blog.aggregation({
		pipeline,
		projection: get,
	}).toArray();
};
