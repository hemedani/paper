import { number, object, optional } from "deps";
import { selectStruct } from "../../../mod.ts";
import { userLevelEnums } from "@paper/lib";

export const getUsersValidator = () => {
	return object({
		set: object({
			levels: optional(userLevelEnums),
			page: number(),
			limit: number(),
		}),
		get: selectStruct("user", 2),
	});
};
