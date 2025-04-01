import { type ActFn, ObjectId } from "deps";
import { article } from "../../../mod.ts";

export const updateArticleFn: ActFn = async (body) => {
	const {
		set: {
			_id,
			...rest
		},
		get,
	} = body.details;

	return await article.findOneAndUpdate({
		filter: { _id: new ObjectId(_id as string) },
		update: {
			$set: {
				...rest,
				updatedAt: new Date(),
			},
		},
		projection: get,
	});
};
