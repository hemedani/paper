import { object, optional, string } from "deps";
import { selectStruct } from "../../../mod.ts";
import { taxiTypeEnums } from "@paper/lib";

export const updateTaxiValidator = () => {
	return object({
		set: object({
			taxiType: taxiTypeEnums,
			origin: optional(string()),
			destination: optional(string()),
		}),
		get: selectStruct("taxi", 1),
	});
};
