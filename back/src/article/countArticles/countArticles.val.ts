import {
	array,
	enums,
	number,
	object,
	objectIdValidation,
	optional,
	size,
	string,
} from "deps";
import { articleTypeEnums } from "@paper/lib";

export const countArticlesValidator = () => {
	return object({
		set: object({
			search: optional(string()),

			//advanced search
			articleType: optional(articleTypeEnums),
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
			tagIds: optional(array(objectIdValidation)),

			keywords: optional(array(string())),
			keywordIds: optional(array(objectIdValidation)),

			authorFamily: optional(string()),
			authorIds: optional(array(objectIdValidation)),

			publication: optional(string()),
		}),
		get: object({ qty: optional(enums([0, 1])) }),
	});
};
