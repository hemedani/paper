import {
	enums,
	integer,
	object,
	type RelationDataType,
	size,
	string,
} from "deps";
import { coreApp } from "@paper/back";
import { createUpdateAt } from "../utils/mod.ts";

export const licensePlateStruct = object({
	double_digits: size(integer(), 10, 99),
	letter: size(string(), 1),
	three_digits: size(integer(), 100, 999),
	issue_place: size(integer(), 10, 99),
});

export const taxiColorArray = [
	"zardRoghani",
	"zardKhorshidi",
	"sabzFosfori",
	"noghrei",
	"zard",
	"sefid",
	"sabzMetalic",
	"noghreiMetalik",
	"sabz",
	"sefidRoghani",
	"sefidSadafi",
	"meshkiRoghani",
	"narenji",
	"khakestari",
	"ghermez",
	"others",
];
export const taxiColorEnums = enums(taxiColorArray);

export const taxiTypeArray = [
	"khati",
	"gardeshi",
	"forodgah",
	"rahAhan",
	"terminal",
	"vije",
	"telephoni",
];
export const taxiTypeEnums = enums(taxiTypeArray);

export const systemModelArray = [
	"samand",
	"peugeot",
	"peride",
	"naron",
	"hyundai",
	"delica",
	"saipa",
	"toyota",
	"ghazaal",
	"poroton",
	"pars khodro",
	"folox",
	"reno",
	"bereliance jin b",
	"istana",
	"jac",
	"peykan",
	"kia",
	"others",
];
export const systemModelEnums = enums(systemModelArray);

export const vehicleTypeArray = [
	"van",
	"savari",
];
export const vehicleTypeEnums = enums(vehicleTypeArray);

export const taxiPureFields = {
	taxiType: taxiTypeEnums,
	vehicleType: vehicleTypeEnums,
	systemModel: systemModelEnums,
	color: taxiColorEnums,
	manufactureYears: size(integer(), 1350, 1404),

	origin: string(),
	destination: string(),

	// پلاک خودرد
	license_plate: licensePlateStruct,

	vin: size(string(), 17),
	...createUpdateAt,
};

export const taxiRelations = {
	owner: {
		schemaName: "user",
		optional: false,
		type: "single" as RelationDataType,
		relatedRelations: {
			taxi: {
				type: "single" as RelationDataType,
			},
		},
	},
	carCard: {
		schemaName: "file",
		type: "single" as RelationDataType,
		optional: true,
		relatedRelations: {
			taxi: {
				type: "single" as RelationDataType,
			},
		},
	},
	taxiLicense: {
		schemaName: "file",
		type: "single" as RelationDataType,
		optional: true,
		relatedRelations: {},
	},
};

export const taxies = () =>
	coreApp.odm.newModel("taxi", taxiPureFields, taxiRelations);
