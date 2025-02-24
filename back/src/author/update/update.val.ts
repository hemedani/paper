import { object, objectIdValidation, optional, string } from "deps";
import { selectStruct } from "../../../mod.ts";

export const updateValidator = () => {
	return object({
		set: object({
			_id: objectIdValidation,
			first_name: optional(string()),
			last_name: optional(string()),
		}),
		get: selectStruct("author", 1),
	});
};
