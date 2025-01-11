import { type ActFn, ObjectId } from "deps";
import { tag } from "../../../mod.ts";

export const updateTagFn: ActFn = async (body) => {
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

	return await tag.findOneAndUpdate({
		filter: { _id: new ObjectId(_id) },
		update: {
			$set: updateObj,
		},
		projection: get,
	});
};
