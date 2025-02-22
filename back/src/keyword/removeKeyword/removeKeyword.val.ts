import { boolean, enums, object, optional, string } from "deps";

export const removeKeywordValidator = () => {
	return object({
		set: object({
			_id: string(),
			hardCascade: optional(boolean()),
		}),
		get: object({
			success: optional(enums([0, 1])),
		}),
	});
};
