import { number, object } from "deps";
import { selectStruct } from "../../../mod.ts";

export const getsValidator = () => {
	return object({
		set: object({
			page: number(),
			limit: number(),
		}),
		get: selectStruct("author", 2),
	});
};
