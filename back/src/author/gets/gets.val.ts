import { number, object, string } from "deps";
import { selectStruct } from "../../../mod.ts";

export const getsValidator = () => {
	return object({
		set: object({
			first_name: string(),
			last_name: string(),
			page: number(),
			limit: number(),
		}),
		get: selectStruct("author", 2),
	});
};
