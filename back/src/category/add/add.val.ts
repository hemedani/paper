import { object } from "deps";
import { selectStruct } from "../../../mod.ts";
import { categoryPureFields } from "@paper/lib";

export const addValidator = () => {
	return object({
		set: object(categoryPureFields),
		get: selectStruct("category", 1),
	});
};
