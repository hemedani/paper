import { enums, object } from "deps";
import { isValidNationalNumberStruct, mobilePattern } from "@paper/lib";

export const changeMobileValidator = () => {
	return object({
		set: object({
			national_number: isValidNationalNumberStruct,
			mobile: mobilePattern,
		}),
		get: object({
			mobile: enums([1]),
			national_number: enums([1]),
		}),
	});
};
