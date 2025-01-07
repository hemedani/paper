import type { ActFn, Document } from "deps";
import { article } from "../../../mod.ts";

export const countArticlesFn: ActFn = async (body) => {
	const {
		set: {
			search,

			//advanced search
			articleType,
			publicationYear,
			authors,
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

	const filters: Document = {};

	search && (filters["$text"] = { $search: search });
	tags && (filters["tags.name"] = { $in: [tags] });
	title && (filters["title"] = { $regex: new RegExp(title, "i") });
	abstract && (filters["abstract"] = { $regex: new RegExp(abstract, "i") });
	authors && (filters["authors"] = { $regex: new RegExp(authors, "i") });
	articleType && (filters["articleType"] = articleType);
	publicationYear && (filters["publicationYear"] = publicationYear);
	ISBN && (filters["ISBN"] = ISBN);
	ISNN && (filters["ISNN"] = ISNN);
	DOI && (filters["DOI"] = DOI);
	issue && (filters["issue"] = { $gte: issue });
	volume && (filters["volume"] = { $gte: volume });
	publication &&
		(filters["publication.title"] = {
			$regex: new RegExp(publication, "i"),
		});

	const foundedItemsLength = await article.countDocument({
		filter: filters,
	});

	return { qty: foundedItemsLength };
};
