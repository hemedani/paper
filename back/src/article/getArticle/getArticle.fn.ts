import { type ActFn, ObjectId } from "deps";
import { article } from "../../../mod.ts";
import { throwError } from "../../../../lib/mod.ts";

export const getArticleFn: ActFn = async (body) => {
	const {
		set: {
			_id,
		},
		get,
	} = body.details;

	const foundedArticle = await article.aggregation({
		pipeline: [
			{ $match: { _id: new ObjectId(_id) } },
		],
		projection: get,
	}).toArray();

	if (foundedArticle.length > 0) {
		return foundedArticle[0];
	} else {
		throwError("can not find this article");
	}
};
