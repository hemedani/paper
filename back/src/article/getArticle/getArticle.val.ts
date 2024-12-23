import { object, objectIdValidation } from "deps";
import { selectStruct } from "../../../mod.ts";

export const getArticleValidator = () => {
	return object({
		set: object({
			_id: objectIdValidation,
		}),
		get: selectStruct("article", 2),
	});
};
