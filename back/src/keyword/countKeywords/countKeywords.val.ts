import { enums, object, optional, string } from "deps";

export const countKeywordsValidator = () => {
	return object({
		set: object({
			name: optional(string()),
		}),
		get: object({ qty: optional(enums([0, 1])) }),
	});
};
