import type { ActFn } from "deps";
import { author } from "../../../mod.ts";

export const getsFn: ActFn = async (body) => {
	const {
		set: {
			page,
			limit,
		},
		get,
	} = body.details;

	const pipeline = [];

	pipeline.push({ $sort: { _id: -1 } });
	pipeline.push({ $skip: (page - 1) * limit });
	pipeline.push({ $limit: limit });

	return await author.aggregation({
		pipeline,
		projection: get,
	}).toArray();
};
