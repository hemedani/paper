import { type ActFn, ObjectId } from "deps";
import { blog } from "../../../mod.ts";
import { throwError } from "@paper/lib";

export const getFn: ActFn = async (body) => {
	const {
		set: {
			_id,
		},
		get,
	} = body.details;

	const foundedBlog = await blog.aggregation({
		pipeline: [
			{ $match: { _id: new ObjectId(_id) } },
		],
		projection: get,
	}).toArray();

	if (foundedBlog.length > 0) {
		return foundedBlog[0];
	} else {
		throwError("can not found this blog");
	}
};
