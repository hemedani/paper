import { object, string } from "deps";
import { selectStruct } from "../../../mod.ts";
import { isValidNationalNumberStruct, mobilePattern } from "@paper/lib";

export const tempUserValidator = () => {
	return object({
		set: object({
			first_name: string(),
			last_name: string(),
			father_name: string(),
			mobile: mobilePattern,
			national_number: isValidNationalNumberStruct,
		}),
		get: selectStruct("user", 1),
	});
};
