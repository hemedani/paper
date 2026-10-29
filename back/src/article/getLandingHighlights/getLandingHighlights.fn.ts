import { type ActFn } from "deps";
import { article, keyword, tag } from "../../../mod.ts";

const DEFAULT_LIMIT = 8;
const MAX_LIMIT = 20;

const buildPopularPipeline = (field: "keywords" | "tags", limit: number) => [
	{ $match: { [`${field}.0`]: { $exists: true } } },
	{ $unwind: `$${field}` },
	{
		$group: {
			_id: `$${field}._id`,
			name: { $first: `$${field}.name` },
			articleCount: { $sum: 1 },
		},
	},
	{ $match: { _id: { $ne: null }, name: { $nin: [null, ""] } } },
	{ $sort: { articleCount: -1, name: 1 } },
	{ $limit: limit },
];

export const getLandingHighlightsFn: ActFn = async (body) => {
	const { set: { limit } } = body.details;

	const safeLimit = Math.min(
		MAX_LIMIT,
		Math.max(1, Number(limit) || DEFAULT_LIMIT),
	);

	const [keywords, tags, keywordCount, tagCount, articleCount] = await Promise
		.all([
			article.aggregation({
				pipeline: buildPopularPipeline("keywords", safeLimit),
			}).toArray(),
			article.aggregation({
				pipeline: buildPopularPipeline("tags", safeLimit),
			}).toArray(),
			keyword.countDocument({ filter: {} }),
			tag.countDocument({ filter: {} }),
			article.countDocument({ filter: {} }),
		]);

	return {
		keywords,
		tags,
		stats: {
			keywords: keywordCount,
			tags: tagCount,
			articles: articleCount,
		},
	};
};
