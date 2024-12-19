import { type ActFn, ObjectId } from "deps";
import { article } from "../../../mod.ts";

export const updateArticleFn: ActFn = async (body) => {
	const {
		set: {
			articleId,
			...rest
		},
		get,
	} = body.details;

	return await article.findOneAndUpdate({
		filter: { _id: new ObjectId(articleId) },
		update: {
			$set: {
				...rest,
				updatedAt: new Date(),
			},
		},
		projection: get,
	});
};
