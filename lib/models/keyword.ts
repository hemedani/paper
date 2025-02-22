import { type RelationDataType, string } from "deps";
import { coreApp } from "@paper/back";
import { createUpdateAt } from "../utils/mod.ts";

export const pureKeyword = {
	name: string(),
	...createUpdateAt,
};

export const keywordRelations = {
	registrar: {
		schemaName: "user",
		optional: false,
		type: "single" as RelationDataType,
		relatedRelations: {},
	},
};

export const keywords = () =>
	coreApp.odm.newModel("keyword", pureKeyword, keywordRelations);
