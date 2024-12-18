import { integer, object, optional, size, string } from "deps";
import { selectStruct } from "../../../mod.ts";
import {
	licensePlateStruct,
	systemModelEnums,
	taxiColorEnums,
	taxiTypeEnums,
	vehicleTypeEnums,
} from "@paper/lib";

export const updateFullValidator = () => {
	return object({
		set: object({
			vehicleType: optional(vehicleTypeEnums),
			systemModel: optional(systemModelEnums),
			color: optional(taxiColorEnums),
			manufactureYears: optional(size(integer(), 1350, 1404)),
			license_plate: optional(licensePlateStruct),
			vin: optional(string()),

			taxiType: optional(taxiTypeEnums),
			origin: optional(string()),
			destination: optional(string()),
		}),
		get: selectStruct("taxi", 1),
	});
};
