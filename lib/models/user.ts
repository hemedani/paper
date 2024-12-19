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
	string,
} from "deps";
import { createUpdateAt, isValidNationalNumber } from "../utils/mod.ts";

export const userLevelArray = ["Ghost", "Driver", "Manager"];
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
	nationalCard: {
		schemaName: "file",
		type: "single" as RelationDataType,
		optional: true,
		relatedRelations: {},
	},
};

export const users = () =>
	coreApp.odm.newModel("user", userPure, userRelations, {
		createIndex: {
			indexSpec: { "national_number": 1 },
			options: { unique: true },
		},
	});
