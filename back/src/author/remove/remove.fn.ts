import { type ActFn, ObjectId } from "deps";
import { author } from "../../../mod.ts";

export const removeFn: ActFn = async (body) => {
	const {
		set: { _id, hardCascade },
		get,
	} = body.details;

	return await author.deleteOne({
		filter: { _id: new ObjectId(_id) },
		hardCascade: hardCascade || false,
	});
};
