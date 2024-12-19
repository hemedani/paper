import { enums, object } from "deps";
import { isValidNationalNumberStruct } from "@paper/lib";

export const loginUserReqValidator = () => {
	return object({
		set: object({
			national_number: isValidNationalNumberStruct,
		}),
		get: object({
			mobile: enums([1]),
			national_number: enums([1]),
		}),
	});
};
