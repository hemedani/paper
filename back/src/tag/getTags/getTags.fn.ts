import type { ActFn } from "deps";
import { tag } from "../../../mod.ts";

export const getTagsFn: ActFn = async (body) => {
	const {
		set: {
			page,
			limit,
			name,
		},
		get,
	} = body.details;

	const pipeline = [];

	name &&
		pipeline.push({
			$match: { "name": { $regex: new RegExp(name, "i") } },
		});

	pipeline.push({ $limit: limit });
	pipeline.push({ $skip: (page - 1) * limit });
	pipeline.push({ $sort: { _id: -1 } });

	return await tag.aggregation({
		pipeline,
		projection: get,
	}).toArray();
};
