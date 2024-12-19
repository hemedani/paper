import { enums, object, optional, size, string } from "deps";
import { selectStruct } from "../../../mod.ts";
import { isValidNationalNumberStruct } from "@paper/lib";

export const loginUserValidator = () => {
	return object({
		set: object({
			national_number: isValidNationalNumberStruct,
			code: size(string(), 5),
		}),
		get: optional(object({
			token: optional(enums([0, 1])),
			user: selectStruct("user", 1),
		})),
	});
};
