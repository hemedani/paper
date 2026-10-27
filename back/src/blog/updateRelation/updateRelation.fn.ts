import { type ActFn, ObjectId, type TInsertRelations } from "deps";
import { blog } from "../../../mod.ts";
import { type blogRelations, throwError } from "@paper/lib";

export const updateRelationFn: ActFn = async (body) => {
	const {
		set: { _id, pic, categories },
		get,
	} = body.details;
	const relations: TInsertRelations<typeof blogRelations> = {};

	pic &&
		(relations.pic = {
			_ids: new ObjectId(pic as string),
			relatedRelations: {},
		});

	const foundedBlog = await blog.findOne({
		filters: { _id: new ObjectId(_id as string) },
		projection: {
			categories: {
				_id: 1,
			},
		},
	});

	const handleMultipleRelations = async (
		editRelations: string,
		objectIds: ObjectId[],
		relatedRel?: string,
	) => {
		const removedIDs = foundedBlog![editRelations].filter(
			(rel: any) => !objectIds.some((id2) => id2.equals(rel._id)),
		);

		const addedIDs = objectIds.filter(
			(id2) =>
				!foundedBlog![editRelations].some((foundedRel: any) =>
					foundedRel._id.equals(id2)
				),
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
			await blog.removeRelation({
				filters: { _id: new ObjectId(_id as string) },
				relations: removeRelations,
			});
		}

		if (addedIDs.length > 0) {
			await blog.addRelation({
				filters: { _id: new ObjectId(_id as string) },
				relations: addRelations,
				replace: true,
			});
		}
	};

	if (foundedBlog) {
		if (
			foundedBlog.categories &&
			foundedBlog.categories.length > 0 &&
			categories
		) {
			const catIds: ObjectId[] = categories.map(
				(id: string) => new ObjectId(id),
			);

			await handleMultipleRelations("categories", catIds, "blogs");
		} else if (categories) {
			relations.categories = {
				_ids: categories.map((id: string) => new ObjectId(id)),
				relatedRelations: { blogs: true },
			};
		}

		return await blog.addRelation({
			filters: { _id: new ObjectId(_id) },
			relations,
			projection: get,
			replace: true,
		});
	} else {
		throwError("can not find this blog post");
	}
};
