import type { ActFn } from "deps";
import { blog } from "../../../mod.ts";

export const countFn: ActFn = async (body) => {
	const {
		set,
		get,
	} = body.details;

	const foundedItemsLength = await blog.countDocument({});

	return { qty: foundedItemsLength };
};
