import { enums, instance, object, optional } from "deps";
import { coreApp } from "../../../mod.ts";
import { createUpdateAt } from "@paper/lib";

export const uploadImageValidator = () => {
	return object({
		set: object({
			formData: instance(FormData),
			updatePlus: optional(
				enums(["nationalCard", "carCard", "taxiLicense"]),
			),
			...createUpdateAt,
		}),
		get: coreApp.schemas.selectStruct("file", 1),
	});
};
