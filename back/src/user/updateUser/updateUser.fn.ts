import { type ActFn, ObjectId } from "deps";
import { user } from "../../../mod.ts";

export const updateUserFn: ActFn = async (body) => {
	const {
		set: {
			createdAt,
			_id,
			...rest
		},
		get,
	} = body.details;

	return await user.findOneAndUpdate({
		filter: { _id: new ObjectId(_id) },
		update: {
			$set: rest,
		},
		projection: get,
	});
};
