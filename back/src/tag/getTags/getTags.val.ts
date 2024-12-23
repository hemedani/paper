import { number, object, optional, string } from "deps";
import { selectStruct } from "../../../mod.ts";

export const getTagsValidator = () => {
	return object({
		set: object({
			page: number(),
			limit: number(),
			name: optional(string()),
		}),
		get: selectStruct("tag", 2),
	});
};
