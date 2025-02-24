import { array, object, objectIdValidation, optional } from "deps";
import { selectStruct } from "../../../mod.ts";

export const updateArticleRelationsValidator = () => {
	return object({
		set: object({
			_id: objectIdValidation,
			avatar: optional(objectIdValidation),
			doc: optional(objectIdValidation),
			publication: optional(objectIdValidation),
			tags: optional(array(objectIdValidation)),
			keywords: optional(array(objectIdValidation)),
			authors: optional(array(objectIdValidation)),
		}),
		get: selectStruct("article", 1),
	});
};
