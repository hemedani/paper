import {
	array,
	number,
	object,
	objectIdValidation,
	optional,
	string,
} from "deps";
import { selectStruct } from "../../../mod.ts";

export const getsValidator = () => {
	return object({
		set: object({
			page: number(),
			limit: number(),
			first_name: optional(string()),
			last_name: optional(string()),

			authorIds: optional(array(objectIdValidation)),
		}),
		get: selectStruct("author", 2),
	});
};
