import { enums, object, objectIdValidation, optional } from "deps";

export const removeUserValidator = () => {
	return object({
		set: object({
			_id: objectIdValidation,
		}),
		get: object({
			success: optional(enums([0, 1])),
		}),
	});
};
