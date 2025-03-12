import { type ActFn, ObjectId } from "deps";
import { tag } from "../../../mod.ts";

export const getTagsFn: ActFn = async (body) => {
	const {
		set: {
			page,
			limit,
			name,

			tagIds,
		},
		get,
	} = body.details;

	const pipeline = [];

	name &&
		pipeline.push({
			$match: { "name": { $regex: new RegExp(name, "i") } },
		});

	tagIds && tagIds.length > 0 &&
		pipeline.push({
			$match: {
				_id: {
					$in: tagIds.map((_id: string) => new ObjectId(_id)),
				},
			},
		});

	pipeline.push({ $sort: { _id: -1 } });
	pipeline.push({ $skip: (page - 1) * limit });
	pipeline.push({ $limit: limit });

	return await tag.aggregation({
		pipeline,
		projection: get,
	}).toArray();
};
