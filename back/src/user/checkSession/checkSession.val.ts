import {
	boolean,
	enums,
	object,
	objectIdValidation,
	optional,
	string,
} from "deps";
import { authErrorCodes, userLevelEnums } from "@paper/lib";

export const checkSessionValidator = () => {
	return object({
		set: object({}),
		get: object({
			valid: optional(boolean()),
			code: optional(enums([...authErrorCodes])),
			message: optional(string()),
			user: optional(object({
				_id: optional(objectIdValidation),
				level: optional(userLevelEnums),
			})),
			expiresAt: optional(string()),
		}),
	});
};
