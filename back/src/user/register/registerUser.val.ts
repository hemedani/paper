import { object } from "deps";
import { selectStruct } from "../../../mod.ts";
import { isValidNationalNumberStruct, mobilePattern } from "@paper/lib";

export const registerUserValidator = () => {
	return object({
		set: object({
			mobile: mobilePattern,
			national_number: isValidNationalNumberStruct,
		}),
		get: selectStruct("user", 1),
	});
};
