import { type ActFn, ObjectId } from "deps";
import { author } from "../../../mod.ts";

export const updateFn: ActFn = async (body) => {
	const {
		set: {
			_id,
			first_name,
			last_name,
		},
		get,
	} = body.details;

	const updateObj: Record<string, any> = {
		updatedAt: new Date(),
	};

	first_name && (updateObj.first_name = first_name);
	last_name && (updateObj.last_name = last_name);

	return await author.findOneAndUpdate({
		filter: { _id: new ObjectId(_id) },
		update: {
			$set: updateObj,
		},
		projection: get,
	});
};
