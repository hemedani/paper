import { object, objectIdValidation, optional } from "deps";
import { selectStruct } from "../../../mod.ts";
import { taxiPureFields } from "@paper/lib";

export const addTaxiValidator = () => {
	return object({
		set: object({
			...taxiPureFields,
			carCard: optional(objectIdValidation),
			taxiLicense: optional(objectIdValidation),
		}),
		get: selectStruct("taxi", 1),
	});
};
