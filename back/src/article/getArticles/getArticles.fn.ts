import type { ActFn } from "deps";
import { article } from "../../../mod.ts";

export const getArticlesFn: ActFn = async (body) => {
	const {
		set: {
			page,
			limit,
			search,

			//advanced search
			articleType,
			publicationYear,
			authorIds,
			authorFamily,
			title,
			abstract,
			ISBN,
			ISNN,
			DOI,
			issue,
			volume,

			//advanced relation search
			tags,
			publication,
		},
		get,
	} = body.details;

	const pipeline = [];

	search && pipeline.push({ $match: { $text: { $search: search } } });

	tags && tags.length > 0 &&
		pipeline.push({ $match: { "tags.name": { $in: tags } } });
	authorIds && authorIds.length > 0 &&
		pipeline.push({ $match: { "authors._id": { $in: authorIds } } });
	authorFamily &&
		pipeline.push({
			$match: {
				"authors.last_name": { $regex: new RegExp(authorFamily, "i") },
			},
		});

	articleType && pipeline.push({ $match: { articleType } });
	publicationYear && pipeline.push({ $match: { publicationYear } });
	ISBN && pipeline.push({ $match: { ISBN } });
	ISNN && pipeline.push({ $match: { ISNN } });
	DOI && pipeline.push({ $match: { DOI } });
	issue && pipeline.push({ $match: { issue: { $gte: issue } } });
	volume && pipeline.push({ $match: { volume: { $gte: volume } } });

	publication &&
		pipeline.push({
			$match: {
				"publication.title": {
					$regex: new RegExp(publication, "i"),
				},
			},
		});

	title &&
		pipeline.push({
			$match: {
				"title": {
					$regex: new RegExp(title, "i"),
				},
			},
		});

	abstract &&
		pipeline.push({
			$match: {
				"abstract": {
					$regex: new RegExp(abstract, "i"),
				},
			},
		});

	pipeline.push({ $sort: { _id: -1 } });
	pipeline.push({ $skip: (page - 1) * limit });
	pipeline.push({ $limit: limit });

	return await article.aggregation({ pipeline, projection: get }).toArray();
};
