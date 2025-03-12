import {
	array,
	number,
	object,
	objectIdValidation,
	optional,
	string,
} from "deps";
import { selectStruct } from "../../../mod.ts";

export const getKeywordsValidator = () => {
	return object({
		set: object({
			page: number(),
			limit: number(),
			name: optional(string()),

			keywordIds: optional(array(objectIdValidation)),
		}),
		get: selectStruct("keyword", 2),
	});
};
