import type { ActFn } from "deps";
import { tag } from "../../../mod.ts";

export const addTagFn: ActFn = async (body) => {
	const {
		set,
		get,
	} = body.details;

	return await tag.insertOne({
		doc: set,
		projection: get,
	});
};
