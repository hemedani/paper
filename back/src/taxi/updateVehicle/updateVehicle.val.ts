import { integer, object, size, string } from "deps";
import { selectStruct } from "../../../mod.ts";
import {
	licensePlateStruct,
	systemModelEnums,
	taxiColorEnums,
	vehicleTypeEnums,
} from "@paper/lib";

export const updateVehicleValidator = () => {
	return object({
		set: object({
			vehicleType: vehicleTypeEnums,
			systemModel: systemModelEnums,
			color: taxiColorEnums,
			manufactureYears: size(integer(), 1350, 1404),
			license_plate: licensePlateStruct,
			vin: string(),
		}),
		get: selectStruct("taxi", 1),
	});
};
