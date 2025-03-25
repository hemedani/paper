import { array, object, objectIdValidation, optional } from "deps";
import { selectStruct } from "../../../mod.ts";

export const updateRelationValidator = () => {
	return object({
		set: object({
			_id: objectIdValidation,
			pic: optional(objectIdValidation),
			categories: optional(array(objectIdValidation)),
		}),
		get: selectStruct("blog", 1),
	});
};
