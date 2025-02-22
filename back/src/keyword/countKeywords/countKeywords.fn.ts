import type { ActFn, Document } from "deps";
import { keyword } from "../../../mod.ts";

export const countKeywordsFn: ActFn = async (body) => {
	const {
		set: {
			name,
		},
		get,
	} = body.details;

	const filters: Document = {};
	name &&
		(filters["name"] = { $regex: new RegExp(name, "i") });

	const foundedItemsLength = await keyword.countDocument({
		filter: filters,
	});

	return { qty: foundedItemsLength };
};
