import { array, number, object, optional, string } from "deps";

const termValidator = () =>
	object({
		_id: optional(string()),
		name: optional(string()),
		articleCount: optional(number()),
	});

export const getLandingHighlightsValidator = () => {
	return object({
		set: object({
			limit: optional(number()),
		}),
		get: object({
			keywords: optional(array(termValidator())),
			tags: optional(array(termValidator())),
			stats: optional(
				object({
					keywords: optional(number()),
					tags: optional(number()),
					articles: optional(number()),
				}),
			),
		}),
	});
};
