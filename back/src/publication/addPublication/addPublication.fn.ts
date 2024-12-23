import type { ActFn } from "deps";
import { publication } from "../../../mod.ts";

export const addPublicationFn: ActFn = async (body) => {
	const {
		set,
		get,
	} = body.details;

	return await publication.insertOne({
		doc: set,
		projection: get,
	});
};
