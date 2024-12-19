import { object, objectIdValidation } from "deps";
import { selectStruct } from "../../../mod.ts";
import { articlePureFields } from "@paper/lib";

export const updateArticleValidator = () => {
	return object({
		set: object({
			articleId: objectIdValidation,
			...articlePureFields,
		}),
		get: selectStruct("article", 1),
	});
};
