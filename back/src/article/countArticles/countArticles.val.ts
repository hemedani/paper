import { array, enums, number, object, optional, size, string } from "deps";
import { articleTypeEnums } from "@paper/lib";

export const countArticlesValidator = () => {
	return object({
		set: object({
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
		get: object({ qty: optional(enums([0, 1])) }),
	});
};
