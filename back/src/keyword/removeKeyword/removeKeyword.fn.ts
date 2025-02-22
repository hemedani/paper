import { type ActFn, ObjectId } from "deps";
import { keyword } from "../../../mod.ts";

export const removeKeywordFn: ActFn = async (body) => {
	const {
		set: { _id, hardCascade },
		get,
	} = body.details;

	return await keyword.deleteOne({
		filter: { _id: new ObjectId(_id) },
		hardCascade: hardCascade || false,
	});
};
