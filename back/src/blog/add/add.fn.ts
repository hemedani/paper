import { type ActFn, ObjectId, type TInsertRelations } from "deps";
import { blog, coreApp } from "../../../mod.ts";
import type { blogRelations, MyContext } from "@paper/lib";

export const addFn: ActFn = async (body) => {
	const {
		set,
		get,
	} = body.details;
	const { user }: MyContext = coreApp.contextFns
		.getContextModel() as MyContext;

	const { pic, categories, ...rest } = set;

	const relations: TInsertRelations<typeof blogRelations> = {
		categories: {
			_ids: categories.map((id: string) => new ObjectId(id)),
			relatedRelations: {
				blogs: true,
			},
		},
		author: {
			_ids: user._id,
			relatedRelations: {
				writtenBlogs: true,
			},
		},
		pic: {
			_ids: new ObjectId(pic as string),
		},
	};

	return await blog.insertOne({
		doc: rest,
		relations,
		projection: get,
	});
};
