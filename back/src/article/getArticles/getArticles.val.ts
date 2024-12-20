import { number, object, optional, string } from "deps";
import { selectStruct } from "../../../mod.ts";

export const getArticlesValidator = () => {
	return object({
		set: object({
			page: number(),
			limit: number(),
			search: optional(string()),
		}),
		get: selectStruct("article", 2),
	});
};
