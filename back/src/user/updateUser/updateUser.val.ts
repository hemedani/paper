import { object } from "deps";
import { selectStruct } from "../../../mod.ts";
import { userPure } from "@paper/lib";

export const updateUserValidator = () => {
	const { level, mobile, national_number, isVerified, ...rest } = userPure;
	return object({
		set: object({
			...rest,
		}),
		get: selectStruct("user", 1),
	});
};
