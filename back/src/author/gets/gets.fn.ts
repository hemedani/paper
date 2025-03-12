import { type ActFn, ObjectId } from "deps";
import { author } from "../../../mod.ts";

export const getsFn: ActFn = async (body) => {
	const {
		set: {
			page,
			limit,
			first_name,
			last_name,

			authorIds,
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

	authorIds && authorIds.length > 0 &&
		pipeline.push({
			$match: {
				_id: {
					$in: authorIds.map((_id: string) => new ObjectId(_id)),
				},
			},
		});

	pipeline.push({ $sort: { _id: -1 } });
	pipeline.push({ $skip: (page - 1) * limit });
	pipeline.push({ $limit: limit });

	return await author.aggregation({
		pipeline,
		projection: get,
	}).toArray();
};
