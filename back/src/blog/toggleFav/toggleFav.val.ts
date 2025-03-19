import { object, objectIdValidation } from "deps";
import { selectStruct } from "../../../mod.ts";

export const toggleFavValidator = () => {
	return object({
		set: object({
			blogId: objectIdValidation,
		}),
		get: selectStruct("user", 1),
	});
};
