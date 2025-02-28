import { type ActFn, ObjectId, type TInsertRelations } from "deps";
import { article, coreApp } from "../../../mod.ts";
import type { articleRelations, MyContext } from "@paper/lib";

export const addArticleFn: ActFn = async (body) => {
	const { user }: MyContext = coreApp.contextFns
		.getContextModel() as MyContext;

	const {
		set,
		get,
	} = body.details;

	const {
		publication,
		doc,
		avatar,
		tags,
		keywords,
		authors,
		...rest
	} = set;

	const relations: TInsertRelations<typeof articleRelations> = {
		registrar: {
			_ids: user._id,
			relatedRelations: {
				registerArticles: true,
			},
		},
		tags: {
			_ids: tags.map((id: string) => new ObjectId(id)),
			relatedRelations: {
				articles: true,
			},
		},
		authors: {
			_ids: authors.map((id: string) => new ObjectId(id)),
			relatedRelations: {
				articles: true,
			},
		},
		keywords: {
			_ids: keywords.map((id: string) => new ObjectId(id)),
			relatedRelations: {
				articles: true,
			},
		},
		publication: {
			_ids: new ObjectId(publication),
			relatedRelations: {
				articles: true,
			},
		},
	};

	doc && (relations.doc = { _ids: new ObjectId(doc) });
	avatar && (relations.avatar = { _ids: new ObjectId(avatar) });

	return await article.insertOne({
		doc: {
			...rest,
			createdAt: new Date(),
			updatedAt: new Date(),
		},
		relations,
		projection: get,
	});
};
