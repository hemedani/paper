import {
	array,
	number,
	object,
	objectIdValidation,
	optional,
	string,
} from "deps";
import { selectStruct } from "../../../mod.ts";

export const getTagsValidator = () => {
	return object({
		set: object({
			page: number(),
			limit: number(),
			name: optional(string()),

			tagIds: optional(array(objectIdValidation)),
		}),
		get: selectStruct("tag", 2),
	});
};
