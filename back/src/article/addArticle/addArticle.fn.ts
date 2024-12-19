import { type ActFn, ObjectId, type TInsertRelations } from "deps";
import { article, coreApp } from "../../../mod.ts";
import type { MyContext } from "@paper/lib";

export const addArticleFn: ActFn = async (body) => {
	const { user }: MyContext = coreApp.contextFns
		.getContextModel() as MyContext;

	const {
		set,
		get,
	} = body.details;

	const {
		publicationId,
		tagIds,
		...rest
	} = set;

	return await article.insertOne({
		doc: {
			...rest,
			createdAt: new Date(),
			updatedAt: new Date(),
		},
		relations: {
			registrar: {
				_ids: user._id,
				relatedRelations: {
					registerArticles: true,
				},
			},
			tags: {
				_ids: tagIds.map((id: string) => new ObjectId(id)),
				relatedRelations: {
					articles: true,
				},
			},
			publication: {
				_ids: new ObjectId(publicationId),
				relatedRelations: {
					articles: true,
				},
			},
		},
		projection: get,
	});
};
