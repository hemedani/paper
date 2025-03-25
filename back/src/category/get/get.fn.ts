import { type ActFn, ObjectId } from "deps";
import { category } from "../../../mod.ts";

export const getFn: ActFn = async (body) => {
	const { set, get } = body.details;

	return await category.findOne({
		filters: { _id: new ObjectId(set._id) },
		projection: get,
	});
};
