import { type ActFn, ObjectId } from "deps";
import { keyword } from "../../../mod.ts";

export const getKeywordFn: ActFn = async (body) => {
	const {
		set: {
			_id,
		},
		get,
	} = body.details;

	return await keyword.aggregation({
		pipeline: [
			{ $match: { _id: new ObjectId(_id) } },
		],
		projection: get,
	}).toArray();
};
