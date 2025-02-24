import {
	boolean,
	number,
	optional,
	type RelationDataType,
	type RelationSortOrderType,
	string,
} from "deps";
import { coreApp } from "@paper/back";
import { createUpdateAt } from "../utils/mod.ts";

export const blogPureFields = {
	title: string(),
	subtitle: string(),
	abstract: string(),
	content: string(),
	likes: optional(number()),
	isInSwipper: optional(boolean()),
	...createUpdateAt,
};

export const blogRelations = {
	author: {
		schemaName: "user",
		optional: false,
		type: "single" as RelationDataType,
		relatedRelations: {
			writtenBlogs: {
				type: "multiple" as RelationDataType,
				limit: 50,
				sort: {
					field: "_id",
					order: "desc" as RelationSortOrderType,
				},
			},
		},
	},
	pic: {
		schemaName: "file",
		type: "single" as RelationDataType,
		optional: false,
		relatedRelations: {},
	},
};

export const blogs = () =>
	coreApp.odm.newModel("blog", blogPureFields, blogRelations, {
		createIndex: {
			indexSpec: {
				title: "text",
				subtitle: "text",
				abstract: "text",
				content: "text",
			},
		},
	});
