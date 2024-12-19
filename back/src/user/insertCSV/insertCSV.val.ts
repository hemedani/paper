import { enums, object } from "deps";

export const insertCSVValidator = () => {
	return object({
		set: object({}),
		get: object({
			ok: (enums([0, 1])),
		}),
	});
};
