import { type ActFn, ObjectId } from "deps";
import { article } from "../../../mod.ts";

export const getArticleFn: ActFn = async (body) => {
	const {
		set: {
			_id,
		},
		get,
	} = body.details;

	return await article.aggregation({
		pipeline: [
			{ $match: { _id: new ObjectId(_id) } },
		],
		projection: get,
	}).toArray();
};
