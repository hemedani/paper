import { object, objectIdValidation } from "deps";
import { selectStruct } from "../../../mod.ts";
import { articlePureFields } from "@paper/lib";

export const updateArticleValidator = () => {
	const { createdAt, updatedAt, ...otherFields } = articlePureFields;
	return object({
		set: object({
			_id: objectIdValidation,
			...otherFields,
		}),
		get: selectStruct("article", 1),
	});
};
