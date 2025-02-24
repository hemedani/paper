import {
	enums,
	number,
	type RelationDataType,
	type RelationSortOrderType,
	size,
	string,
} from "deps";
import { coreApp } from "@paper/back";
import { createUpdateAt } from "../utils/mod.ts";

export const articleTypeArray = [
	"journalArticle",
	"book",
];
export const articleTypeEnums = enums(articleTypeArray);

export const articlePureFields = {
	key: string(),

	articleType: articleTypeEnums,
	publicationYear: size(number(), 1250, 1500),

	title: string(),
	abstract: string(),

	ISBN: string(),
	ISNN: string(),
	DOI: string(),
	URL: string(),

	// ISSUE page ro be sorate yek baze adadi string gozasshtan bayad number bashe ehtemalan
	page: string(),

	issue: number(),
	volume: number(),

	...createUpdateAt,
};

export const articleRelations = {
	registrar: {
		schemaName: "user",
		optional: false,
		type: "single" as RelationDataType,
		relatedRelations: {
			registerArticles: {
				type: "multiple" as RelationDataType,
				limit: 50,
				sort: {
					field: "_id",
					order: "desc" as RelationSortOrderType,
				},
			},
		},
	},
	avatar: {
		schemaName: "file",
		type: "single" as RelationDataType,
		optional: true,
		relatedRelations: {},
	},
	doc: {
		schemaName: "file",
		type: "single" as RelationDataType,
		optional: true,
		relatedRelations: {},
	},
	publication: {
		schemaName: "publication",
		optional: true,
		type: "single" as RelationDataType,
		relatedRelations: {
			articles: {
				type: "multiple" as RelationDataType,
				limit: 50,
				sort: {
					field: "_id",
					order: "desc" as RelationSortOrderType,
				},
			},
		},
	},
	authors: {
		schemaName: "author",
		optional: true,
		type: "multiple" as RelationDataType,
		sort: {
			field: "_id",
			order: "desc" as RelationSortOrderType,
		},
		relatedRelations: {
			articles: {
				type: "multiple" as RelationDataType,
				limit: 50,
				sort: {
					field: "_id",
					order: "desc" as RelationSortOrderType,
				},
			},
		},
	},
	tags: {
		schemaName: "tag",
		optional: true,
		type: "multiple" as RelationDataType,
		sort: {
			field: "_id",
			order: "desc" as RelationSortOrderType,
		},
		relatedRelations: {
			articles: {
				type: "multiple" as RelationDataType,
				limit: 50,
				sort: {
					field: "_id",
					order: "desc" as RelationSortOrderType,
				},
			},
		},
	},
	keywords: {
		schemaName: "keyword",
		optional: true,
		type: "multiple" as RelationDataType,
		sort: {
			field: "_id",
			order: "desc" as RelationSortOrderType,
		},
		relatedRelations: {
			articles: {
				type: "multiple" as RelationDataType,
				limit: 50,
				sort: {
					field: "_id",
					order: "desc" as RelationSortOrderType,
				},
			},
		},
	},
};

export const articles = () =>
	coreApp.odm.newModel("article", articlePureFields, articleRelations, {
		createIndex: {
			indexSpec: {
				title: "text",
				abstract: "text",
			},
		},
	});
