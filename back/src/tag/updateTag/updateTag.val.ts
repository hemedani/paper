import { object, objectIdValidation, string } from "deps";
import { selectStruct } from "../../../mod.ts";

export const updateTagValidator = () => {
	return object({
		set: object({
			_id: objectIdValidation,
			name: string(),
		}),
		get: selectStruct("tag", 2),
	});
};
