import {
	type RelationDataType,
	type RelationSortOrderType,
	string,
} from "deps";
import { coreApp } from "@paper/back";
import { createUpdateAt } from "../utils/mod.ts";

export const purePublication = {
	title: string(),
	...createUpdateAt,
};

export const publicationRelations = {
	registrar: {
		schemaName: "user",
		optional: false,
		type: "single" as RelationDataType,
		relatedRelations: {
			registeredPublications: {
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

export const publications = () =>
	coreApp.odm.newModel("publication", purePublication, publicationRelations);
