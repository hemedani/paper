import { enums, object, optional, string } from "deps";

export const countValidator = () => {
	return object({
		set: object({
			search: optional(string()),
		}),
		get: object({ qty: optional(enums([0, 1])) }),
	});
};
