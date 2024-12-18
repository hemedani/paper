import { enums, object, objectIdValidation, optional } from "deps";
import { userLevels } from "share/mod.ts";

export const countUsersValidator = () => {
	return object({
		set: object({
			provinceId: optional(objectIdValidation),
			cityId: optional(objectIdValidation),
			levels: optional(userLevels),
		}),
		get: object({
			qty: enums([0, 1]),
		}),
	});
};
