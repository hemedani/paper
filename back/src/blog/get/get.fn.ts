import { type ActFn, ObjectId } from "deps";
import { blog } from "../../../mod.ts";

export const getFn: ActFn = async (body) => {
	const {
		set: {
			_id,
		},
		get,
	} = body.details;

	return await blog.aggregation({
		pipeline: [
			{ $match: { _id: new ObjectId(_id) } },
		],
		projection: get,
	}).toArray();
};
