import { type RelationDataType, string } from "deps";
import { coreApp } from "@paper/back";
import { createUpdateAt } from "../utils/mod.ts";

export const pureTag = {
	name: string(),
	...createUpdateAt,
};

export const tagRelations = {
	registrar: {
		schemaName: "user",
		optional: false,
		type: "single" as RelationDataType,
		relatedRelations: {},
	},
};

export const tags = () => coreApp.odm.newModel("tag", pureTag, tagRelations);
