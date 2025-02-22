import { type ActFn, ObjectId } from "deps";
import { keyword } from "../../../mod.ts";

export const updateKeywordFn: ActFn = async (body) => {
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

	return await keyword.findOneAndUpdate({
		filter: { _id: new ObjectId(_id) },
		update: {
			$set: updateObj,
		},
		projection: get,
	});
};
