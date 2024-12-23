import { number, object, optional, string } from "deps";
import { selectStruct } from "../../../mod.ts";

export const getPublicationsValidator = () => {
	return object({
		set: object({
			page: number(),
			limit: number(),
			title: optional(string()),
		}),
		get: selectStruct("publication", 2),
	});
};
