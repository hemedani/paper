import { number, object, optional } from "deps";
import { selectStruct } from "../../../mod.ts";
import { objectIdValidation } from "https://deno.land/x/lesan@v0.1.1/mod.ts";
import { educations, truckTypes, userLevels } from "share/mod.ts";

export const getUsersValidator = () => {
	return object({
		set: object({
			provinceId: optional(objectIdValidation),
			cityId: optional(objectIdValidation),
			levels: optional(userLevels),
			educations: optional(educations),
			truckTypes: optional(truckTypes),
			page: number(),
			limit: number(),
		}),
		get: selectStruct("user", 2),
	});
};
