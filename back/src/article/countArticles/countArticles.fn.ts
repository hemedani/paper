import { type ActFn, type Document, ObjectId } from "deps";
import { article } from "../../../mod.ts";

export const countArticlesFn: ActFn = async (body) => {
	const {
		set: {
			search,

			//advanced search
			articleType,
			publicationYear,
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
			authorIds,
			authorFamily,
		},
		get,
	} = body.details;

	const filters: Document = {};

	search && (filters["$text"] = { $search: search });
	tags && tags.length > 0 && (filters["tags.name"] = { $in: tags });
	title && (filters["title"] = { $regex: new RegExp(title, "i") });
	abstract && (filters["abstract"] = { $regex: new RegExp(abstract, "i") });
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

	authorIds && authorIds.length > 0 &&
		(filters["authors._id"] = {
			$in: authorIds.map((_id: string) => new ObjectId(_id)),
		});
	authorFamily &&
		(filters["authors.last_name"] = {
			$regex: new RegExp(authorFamily, "i"),
		});

	const foundedItemsLength = await article.countDocument({
		filter: filters,
	});

	return { qty: foundedItemsLength };
};
