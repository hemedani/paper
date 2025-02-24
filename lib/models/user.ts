import { coreApp } from "@paper/back";
import {
	boolean,
	coerce,
	date,
	defaulted,
	enums,
	optional,
	pattern,
	refine,
	type RelationDataType,
	type RelationSortOrderType,
	string,
} from "deps";
import { createUpdateAt, isValidNationalNumber } from "../utils/mod.ts";

export const userLevelArray = ["Ghost", "Manager", "Editor"];
export const userLevelEnums = enums(userLevelArray);

export const mobilePattern = pattern(
	string(),
	/(\+98|0|98|0098)?([ ]|-|[()]){0,2}9[0-9]([ ]|-|[()]){0,2}(?:[0-9]([ ]|-|[()]){0,2}){8}/,
);

export const isValidNationalNumberStruct = refine(
	string(),
	"NationalNumber",
	(value: string) => {
		return isValidNationalNumber(value);
	},
);

export const userGenders = enums(["Male", "Female"]);
export const userPure = {
	first_name: string(),
	last_name: string(),
	father_name: string(),
	mobile: mobilePattern,
	gender: userGenders,
	birth_date: optional(coerce(date(), string(), (value) => new Date(value))),
	summery: optional(string()),

	// شماره شناسنامه
	personnel_number: string(),

	// شماره ملی
	national_number: isValidNationalNumberStruct,
	address: string(),

	level: userLevelEnums,
	isVerified: defaulted(boolean(), false),
	...createUpdateAt,
};

export const userRelations = {
	avatar: {
		schemaName: "file",
		type: "single" as RelationDataType,
		optional: true,
		relatedRelations: {},
	},
	nationalCard: {
		schemaName: "file",
		type: "single" as RelationDataType,
		optional: true,
		relatedRelations: {},
	},
	favArticles: {
		schemaName: "article",
		optional: true,
		type: "multiple" as RelationDataType,
		sort: {
			field: "_id",
			order: "desc" as RelationSortOrderType,
		},
		relatedRelations: {
			favByUsers: {
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

export const users = () =>
	coreApp.odm.newModel("user", userPure, userRelations, {
		createIndex: {
			indexSpec: { "national_number": 1 },
			options: { unique: true },
		},
	});
