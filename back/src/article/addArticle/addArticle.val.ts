import { array, object, objectIdValidation, optional } from "deps";
import { selectStruct } from "../../../mod.ts";
import { articlePureFields } from "@paper/lib";

export const addArticleValidator = () => {
	return object({
		set: object({
			...articlePureFields,
			publication: objectIdValidation,
			avatart: optional(objectIdValidation),
			doc: optional(objectIdValidation),
			tags: array(objectIdValidation),
			keywords: array(objectIdValidation),
			authors: array(objectIdValidation),
		}),
		get: selectStruct("article", 1),
	});
};
