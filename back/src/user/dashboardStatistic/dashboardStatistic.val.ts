import { enums, object, optional } from "deps";

export const dashboardStatisticValidator = () => {
	return object({
		set: object({}),
		get: object({
			users: optional(enums([0, 1])),
			tags: optional(enums([0, 1])),
			publications: optional(enums([0, 1])),
			articles: optional(enums([0, 1])),
		}),
	});
};
