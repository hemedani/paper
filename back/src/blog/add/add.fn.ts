import { type ActFn, ObjectId } from "deps";
import { blog, coreApp } from "../../../mod.ts";
import type { MyContext } from "@paper/lib";

export const addFn: ActFn = async (body) => {
	const {
		set,
		get,
	} = body.details;
	const { user }: MyContext = coreApp.contextFns
		.getContextModel() as MyContext;

	const { pic, ...rest } = set;

	return await blog.insertOne({
		doc: rest,
		relations: {
			author: {
				_ids: user._id,
				relatedRelations: {
					writtenBlogs: true,
				},
			},
			pic: {
				_ids: new ObjectId(pic as string),
			},
		},
		projection: get,
	});
};
