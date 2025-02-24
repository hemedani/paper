import { type RelationDataType, string } from "deps";
import { coreApp } from "@paper/back";
import { createUpdateAt } from "../utils/mod.ts";

export const pureAuthor = {
	first_name: string(),
	last_name: string(),
	...createUpdateAt,
};

export const authorRelations = {
	registrar: {
		schemaName: "user",
		optional: false,
		type: "single" as RelationDataType,
		relatedRelations: {},
	},
};

export const authors = () =>
	coreApp.odm.newModel("author", pureAuthor, authorRelations);
