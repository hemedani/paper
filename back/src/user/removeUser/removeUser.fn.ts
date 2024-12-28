import { type ActFn, ObjectId } from "deps";
import { user } from "../../../mod.ts";

export const removeUserFn: ActFn = async (body) => {
	const {
		set: { _id },
		get,
	} = body.details;

	return await user.deleteOne({
		filter: { _id: new ObjectId(_id) },
		hardCascade: false,
	});
};
