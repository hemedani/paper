import { enums, object, optional, string } from "deps";

export const refreshTokenValidator = () => {
	return object({
		set: object({}),
		get: object({
			token: optional(enums([0, 1])),
			expiresAt: optional(string()),
		}),
	});
};
