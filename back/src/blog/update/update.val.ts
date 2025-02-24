import { boolean, object, objectIdValidation, optional, string } from "deps";
import { selectStruct } from "../../../mod.ts";

export const updateValidator = () => {
	return object({
		set: object({
			_id: objectIdValidation,
			title: optional(string()),
			subtitle: optional(string()),
			abstract: optional(string()),
			content: optional(string()),
			isInSwipper: optional(boolean()),
		}),
		get: selectStruct("blog", 1),
	});
};
