import { enums, object, optional } from "deps";
import { userLevelEnums } from "@paper/lib";

export const countUsersValidator = () => {
	return object({
		set: object({
			levels: optional(userLevelEnums),
		}),
		get: object({
			qty: enums([0, 1]),
		}),
	});
};
