import type { ActFn } from "deps";
import { tag } from "../../../mod.ts";

export const removeTagFn: ActFn = async (body) => {
	const {
		set: { _id },
		get,
	} = body.details;

	return await tag.deleteOne({
		filter: { _id: new Object(_id) },
		hardCascade: false,
	});
};
