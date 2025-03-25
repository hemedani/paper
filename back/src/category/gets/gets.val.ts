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
			name: optional(string()),

			categoryIds: optional(array(objectIdValidation)),
		}),
		get: selectStruct("category", 2),
	});
};
