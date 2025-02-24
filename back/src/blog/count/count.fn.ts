import type { ActFn, Document } from "deps";
import { blog } from "../../../mod.ts";

export const countFn: ActFn = async (body) => {
	const {
		set: {
			search,
		},
		get,
	} = body.details;

	const filters: Document = {};

	search && (filters["$match"] = { $text: { $search: search } });

	const foundedItemsLength = await blog.countDocument({
		filter: filters,
	});

	return { qty: foundedItemsLength };
};
