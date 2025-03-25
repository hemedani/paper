import {
	array,
	boolean,
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
			search: optional(string()),
			isInSwipper: optional(boolean()),
			sortByLikes: optional(boolean()),
			categoryIds: optional(array(objectIdValidation)),
		}),
		get: selectStruct("blog", 2),
	});
};
