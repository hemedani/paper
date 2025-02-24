import { object, objectIdValidation } from "deps";
import { selectStruct } from "../../../mod.ts";
import { blogPureFields } from "@paper/lib";

export const addValidator = () => {
	return object({
		set: object({
			...blogPureFields,
			pic: objectIdValidation,
		}),
		get: selectStruct("blog", 1),
	});
};
