import { type ActFn, ObjectId } from "deps";
import { blog } from "../../../mod.ts";

export const removeFn: ActFn = async (body) => {
	const {
		set: { _id, hardCascade },
		get,
	} = body.details;

	return await blog.deleteOne({
		filter: { _id: new ObjectId(_id) },
		hardCascade: hardCascade || false,
	});
};
