import { object, objectIdValidation, string } from "deps";
import { selectStruct } from "../../../mod.ts";

export const updatePublicationValidator = () => {
	return object({
		set: object({
			_id: objectIdValidation,
			title: string(),
		}),
		get: selectStruct("publication", 2),
	});
};
