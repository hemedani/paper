import { object, objectIdValidation, string } from "deps";
import { selectStruct } from "../../../mod.ts";

export const updateKeywordValidator = () => {
	return object({
		set: object({
			_id: objectIdValidation,
			name: string(),
		}),
		get: selectStruct("keyword", 2),
	});
};
