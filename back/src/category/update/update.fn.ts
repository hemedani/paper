import { type ActFn, ObjectId } from "deps";
import { category } from "../../../mod.ts";

export const updateFn: ActFn = async (body) => {
	const {
		set: {
			_id,
			name,
		},
		get,
	} = body.details;

	const updateObj: Record<string, any> = {
		updatedAt: new Date(),
		name,
	};

	return await category.findOneAndUpdate({
		filter: { _id: new ObjectId(_id) },
		update: {
			$set: updateObj,
		},
		projection: get,
	});
};
