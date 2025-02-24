import { number, object, optional, string } from "deps";
import { selectStruct } from "../../../mod.ts";

export const getsValidator = () => {
	return object({
		set: object({
			page: number(),
			limit: number(),
			search: optional(string()),
		}),
		get: selectStruct("blog", 2),
	});
};
