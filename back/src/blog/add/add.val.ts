import { object, objectIdValidation } from "deps";
import { selectStruct } from "../../../mod.ts";
import { blogPureFields } from "@paper/lib";

export const addValidator = () => {
	const { likes, ...rest } = blogPureFields;
	return object({
		set: object({
			...rest,
			pic: objectIdValidation,
		}),
		get: selectStruct("blog", 1),
	});
};
