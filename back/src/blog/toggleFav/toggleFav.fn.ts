import { type ActFn, ObjectId } from "deps";
import { blog, coreApp, user } from "../../../mod.ts";
import { type MyContext, throwError } from "@paper/lib";

export const toggleFavAFn: ActFn = async (body) => {
	const { user: { _id } }: MyContext = coreApp.contextFns
		.getContextModel() as MyContext;

	const {
		set: {
			blogId,
		},
		get,
	} = body.details;

	const foundedUser = await user.findOne({
		filters: { _id },
		projection: {
			favBlogs: {
				_id: 1,
			},
		},
	});

	if (foundedUser) {
		if (foundedUser.favBlogs && foundedUser.favBlogs.length > 0) {
			const foundedBlogInUser = foundedUser.favBlogs.find((
				article: any,
			) => article._id.equals(new ObjectId(blogId)));

			if (foundedBlogInUser) {
				await blog.findOneAndUpdate({
					filter: { _id: new ObjectId(blogId) },
					update: {
						$inc: { likes: -1 },
					},
					projection: { _id: 1, likes: 1 },
				});

				return await user.removeRelation({
					filters: { _id },
					relations: {
						favBlogs: {
							_ids: [new ObjectId(blogId)],
							relatedRelations: {
								favByUsers: true,
							},
						},
					},
					projection: get,
				});
			} else {
				await blog.findOneAndUpdate({
					filter: { _id: new ObjectId(blogId) },
					update: {
						$inc: { likes: 1 },
					},
					projection: { _id: 1, likes: 1 },
				});

				return await user.addRelation({
					filters: { _id },
					relations: {
						favBlogs: {
							_ids: [new ObjectId(blogId)],
							relatedRelations: {
								favByUsers: true,
							},
						},
					},
					projection: get,
				});
			}
		} else {
			await blog.findOneAndUpdate({
				filter: { _id: new ObjectId(blogId) },
				update: {
					$inc: { likes: 1 },
				},
				projection: { _id: 1, likes: 1 },
			});

			return await user.addRelation({
				filters: { _id },
				relations: {
					favBlogs: {
						_ids: [new ObjectId(blogId)],
						relatedRelations: {
							favByUsers: true,
						},
					},
				},
				projection: get,
			});
		}
	} else {
		throwError("can not find this user");
	}
};
