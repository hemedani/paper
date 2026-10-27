import { type RelationDataType, string } from "deps";
import { coreApp } from "@paper/back";
import { createUpdateAt } from "../utils/mod.ts";

export const categoryPureFields = {
	name: string(),
	...createUpdateAt,
};

export const categoryRelations = {
	registrar: {
		schemaName: "user",
		optional: false,
		type: "single" as RelationDataType,
		relatedRelations: {},
	},
};

export const categories = () =>
	coreApp.odm.newModel("category", categoryPureFields, categoryRelations);
