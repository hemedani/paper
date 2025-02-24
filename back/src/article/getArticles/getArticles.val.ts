import { array, number, object, optional, size, string } from "deps";
import { selectStruct } from "../../../mod.ts";
import { articleTypeEnums } from "@paper/lib";

export const getArticlesValidator = () => {
	return object({
		set: object({
			page: number(),
			limit: number(),
			search: optional(string()),

			//advanced search
			articleType: optional(articleTypeEnums),
			authorFamily: optional(string()),
			title: optional(string()),
			abstract: optional(string()),
			ISBN: optional(string()),
			ISNN: optional(string()),
			DOI: optional(string()),
			pageCount: optional(string()),

			issue: optional(number()),
			volume: optional(number()),
			publicationYear: optional(size(number(), 1250, 1500)),

			//advanced relation search
			tags: optional(array(string())),
			authorIds: optional(array(string())),
			publication: optional(string()),
		}),
		get: selectStruct("article", 2),
	});
};
