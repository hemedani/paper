import {
	array,
	boolean,
	enums,
	object,
	objectIdValidation,
	optional,
	string,
} from "deps";

export const countValidator = () => {
	return object({
		set: object({
			search: optional(string()),
			isInSwipper: optional(boolean()),
			categoryIds: optional(array(objectIdValidation)),
		}),
		get: object({ qty: optional(enums([0, 1])) }),
	});
};
