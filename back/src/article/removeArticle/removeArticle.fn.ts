import { type ActFn, ObjectId } from "deps";
import { article } from "../../../mod.ts";

export const removeArticleFn: ActFn = async (body) => {
	const {
		set: { _id, hardCascade },
		get,
	} = body.details;

	return await article.deleteOne({
		filter: { _id: new ObjectId(_id) },
		hardCascade: hardCascade || false,
	});
};
