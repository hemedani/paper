import type { ActFn } from "deps";
import { publication } from "../../../mod.ts";

export const getPublicationsFn: ActFn = async (body) => {
	const {
		set: {
			page,
			limit,
			title,
		},
		get,
	} = body.details;

	const pipeline = [];

	title &&
		pipeline.push({
			$match: { "title": { $regex: new RegExp(title, "i") } },
		});

	pipeline.push({ $sort: { _id: -1 } });
	pipeline.push({ $skip: (page - 1) * limit });
	pipeline.push({ $limit: limit });

	return await publication.aggregation({
		pipeline,
		projection: get,
	}).toArray();
};
