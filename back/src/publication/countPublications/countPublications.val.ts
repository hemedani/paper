import { enums, object, optional, string } from "deps";

export const countPublicationsValidator = () => {
	return object({
		set: object({
			title: optional(string()),
		}),
		get: object({ qty: optional(enums([0, 1])) }),
	});
};
