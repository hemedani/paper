import type { ActFn, Document } from "deps";
import { publication } from "../../../mod.ts";

export const countPublicationsFn: ActFn = async (body) => {
	const {
		set: {
			title,
		},
		get,
	} = body.details;

	const filters: Document = {};
	title &&
		(filters["title"] = { $regex: new RegExp(title, "i") });

	const lengthOfProvinces = await publication.countDocument({
		filter: filters,
	});

	return { qty: lengthOfProvinces };
};
