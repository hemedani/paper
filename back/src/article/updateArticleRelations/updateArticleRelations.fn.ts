import { type ActFn, ObjectId, type TInsertRelations } from "deps";
import { type articleRelations, throwError } from "@paper/lib";
import { article } from "../../../mod.ts";

export const updateArticleRelationsFn: ActFn = async (body) => {
	const {
		set: {
			_id,
			avatar,
			doc,
			publication,
			tags,
			keywords,
		},
		get,
	} = body.details;

	const relations: TInsertRelations<typeof articleRelations> = {};

	avatar && (relations.avatar = {
		_ids: new ObjectId(avatar),
		relatedRelations: {},
	});

	doc && (relations.doc = {
		_ids: new ObjectId(doc),
		relatedRelations: {},
	});

	publication && (relations.publication = {
		_ids: new ObjectId(publication),
		relatedRelations: {
			articles: true,
		},
	});

	const foundedArticle = await article.findOne({
		filters: { _id: new ObjectId(_id) },
		projection: {
			tags: {
				_id: 1,
			},
			keywords: {
				_id: 1,
			},
		},
	});

	const handleMultipleRelations = async (
		editRelations: string,
		objectIds: ObjectId[],
		relatedRel?: string,
	) => {
		const removedIDs = foundedArticle![editRelations].filter((
			foundedArRel: any,
		) => objectIds.some((id2) => id2.equals(foundedArRel._id)));
		const addedIDs = objectIds.filter((id2) =>
			foundedArticle![editRelations].some((foundedRel: any) =>
				foundedRel._id.equals(id2)
			)
		);

		const removeRelations: any = {
			[editRelations]: {
				_ids: removedIDs.map((rm: any) => rm._id),
			},
		};
		relatedRel &&
			(removeRelations[editRelations].relatedRelations = {
				[relatedRel]: true,
			});

		const addRelations: any = {
			[editRelations]: {
				_ids: addedIDs,
			},
		};
		relatedRel &&
			(addRelations[editRelations].relatedRelations = {
				[relatedRel]: true,
			});

		if (removedIDs.length > 0) {
			await article.removeRelation({
				filters: { _id: new ObjectId(_id) },
				relations: removeRelations,
			});
		}

		if (addedIDs.length > 0) {
			await article.addRelation({
				filters: { _id: new ObjectId(_id) },
				relations: addRelations,
				replace: true,
			});
		}
	};

	if (foundedArticle) {
		if (foundedArticle.tags && foundedArticle.tags.length > 0 && tags) {
			const tagIds: ObjectId[] = tags.map((
				id: string,
			) => new ObjectId(id));
			await handleMultipleRelations("tags", tagIds, "articles");
		} else if (tags) {
			relations.tags = {
				_ids: tags.map((id: string) => new ObjectId(id)),
				relatedRelations: { articles: true },
			};
		}
		if (
			foundedArticle.keywords && foundedArticle.keywords.length > 0 &&
			keywords
		) {
			const keywordIds: ObjectId[] = keywords.map((id: string) =>
				new ObjectId(id)
			);
			await handleMultipleRelations("keywords", keywordIds, "articles");
		} else if (keywords) {
			relations.keywords = {
				_ids: keywords.map((id: string) => new ObjectId(id)),
				relatedRelations: { articles: true },
			};
		}

		return await article.addRelation({
			filters: { _id: new ObjectId(_id) },
			relations,
			projection: get,
			replace: true,
		});
	} else {
		throwError("can not find this exam");
	}
};
