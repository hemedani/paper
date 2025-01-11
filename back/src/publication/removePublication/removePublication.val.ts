import { boolean, enums, object, objectIdValidation, optional } from "deps";

export const removePublicationValidator = () => {
	return object({
		set: object({
			_id: objectIdValidation,
			hardCascade: optional(boolean()),
		}),
		get: object({
			success: optional(enums([0, 1])),
		}),
	});
};
