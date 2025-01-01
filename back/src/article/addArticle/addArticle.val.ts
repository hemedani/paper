import { array, object, objectIdValidation } from "deps";
import { selectStruct } from "../../../mod.ts";
import { articlePureFields } from "@paper/lib";

export const addArticleValidator = () => {
	return object({
		set: object({
			...articlePureFields,
			publicationId: objectIdValidation,
			tagIds: array(objectIdValidation),
		}),
		get: selectStruct("article", 1),
	});
};
