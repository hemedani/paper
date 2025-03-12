import { type ActFn, ObjectId } from "deps";
import { keyword } from "../../../mod.ts";

export const getKeywordsFn: ActFn = async (body) => {
	const {
		set: {
			page,
			limit,
			name,

			keywordIds,
		},
		get,
	} = body.details;

	const pipeline = [];

	name &&
		pipeline.push({
			$match: { "name": { $regex: new RegExp(name, "i") } },
		});

	keywordIds && keywordIds.length > 0 &&
		pipeline.push({
			$match: {
				_id: {
					$in: keywordIds.map((_id: string) => new ObjectId(_id)),
				},
			},
		});

	pipeline.push({ $sort: { _id: -1 } });
	pipeline.push({ $skip: (page - 1) * limit });
	pipeline.push({ $limit: limit });

	return await keyword.aggregation({
		pipeline,
		projection: get,
	}).toArray();
};
