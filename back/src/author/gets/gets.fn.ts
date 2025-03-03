import type { ActFn } from "deps";
import { author } from "../../../mod.ts";

export const getsFn: ActFn = async (body) => {
	const {
		set: {
			first_name,
			last_name,
			page,
			limit,
		},
		get,
	} = body.details;

	const pipeline = [];

	first_name &&
		pipeline.push({
			$match: { "first_name": { $regex: new RegExp(first_name, "i") } },
		});

	last_name &&
		pipeline.push({
			$match: { "last_name": { $regex: new RegExp(last_name, "i") } },
		});

	pipeline.push({ $sort: { _id: -1 } });
	pipeline.push({ $skip: (page - 1) * limit });
	pipeline.push({ $limit: limit });

	return await author.aggregation({
		pipeline,
		projection: get,
	}).toArray();
};
