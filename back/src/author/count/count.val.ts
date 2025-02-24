import { enums, object, optional } from "deps";

export const countValidator = () => {
	return object({
		set: object({}),
		get: object({ qty: optional(enums([0, 1])) }),
	});
};
