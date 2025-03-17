import { object, objectIdValidation, optional } from "deps";
import { selectStruct } from "../../../mod.ts";
import { userPure } from "@paper/lib";

export const addUserValidator = () => {
	const { isVerified, ...rest } = userPure;
	return object({
		set: object({
			...rest,
			avatar: optional(objectIdValidation),
			nationalCard: optional(objectIdValidation),
		}),
		get: selectStruct("user", 1),
	});
};
