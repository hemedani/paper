import { type ActFn, ObjectId } from "deps";
import { category } from "../../../mod.ts";

export const getsFn: ActFn = async (body) => {
	const {
		set: {
			page,
			limit,
			name,

			categoryIds,
		},
		get,
	} = body.details;

	const pipeline = [];

	name &&
		pipeline.push({
			$match: { "name": { $regex: new RegExp(name, "i") } },
		});

	categoryIds && categoryIds.length > 0 &&
		pipeline.push({
			$match: {
				_id: {
					$in: categoryIds.map((_id: string) =>
						new ObjectId(_id as string)
					),
				},
			},
		});

	pipeline.push({ $sort: { _id: -1 } });
	pipeline.push({ $skip: (page - 1) * limit });
	pipeline.push({ $limit: limit });

	return await category.aggregation({
		pipeline,
		projection: get,
	}).toArray();
};
