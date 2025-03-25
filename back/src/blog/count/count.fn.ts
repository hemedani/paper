import { type ActFn, type Document, ObjectId } from "deps";
import { blog } from "../../../mod.ts";

export const countFn: ActFn = async (body) => {
	const {
		set: {
			search,
			isInSwipper,
			categoryIds,
		},
		get,
	} = body.details;

	const filters: Document = {};

	search && (filters["$match"] = { $text: { $search: search } });
	categoryIds && categoryIds.length > 0 &&
		(filters["categories._id"] = {
			$in: categoryIds.map((_id: string) => new ObjectId(_id)),
		});
	isInSwipper && (filters["isInSwipper"] = isInSwipper);

	const foundedItemsLength = await blog.countDocument({
		filter: filters,
	});

	return { qty: foundedItemsLength };
};
