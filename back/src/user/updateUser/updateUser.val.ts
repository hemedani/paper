import { object, objectIdValidation } from "deps";
import { selectStruct } from "../../../mod.ts";
import { userPure } from "@paper/lib";

export const updateUserValidator = () => {
	const { mobile, national_number, isVerified, ...rest } = userPure;
	return object({
		set: object({
			_id: objectIdValidation,
			...rest,
		}),
		get: selectStruct("user", 1),
	});
};
