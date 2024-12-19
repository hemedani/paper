import { object, objectIdValidation } from "deps";
import { selectStruct } from "../../../mod.ts";

export const updateDocsValidator = () => {
	return object({
		set: object({
			nationalCardId: objectIdValidation,
			carCardId: objectIdValidation,
			taxiLicenseId: objectIdValidation,
		}),
		get: object({
			taxi: selectStruct("taxi", 1),
			user: selectStruct("user", 1),
		}),
	});
};
