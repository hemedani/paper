import type { ActFn } from "deps";
import { blog } from "../../../mod.ts";

export const getsFn: ActFn = async (body) => {
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

	pipeline.push({ $sort: { _id: -1 } });
	pipeline.push({ $skip: (page - 1) * limit });
	pipeline.push({ $limit: limit });

	return await blog.aggregation({
		pipeline,
		projection: get,
	}).toArray();
};
