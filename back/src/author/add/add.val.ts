import { object } from "deps";
import { selectStruct } from "../../../mod.ts";
import { pureAuthor } from "@paper/lib";

export const addValidator = () => {
	return object({
		set: object({
			...pureAuthor,
		}),
		get: selectStruct("author", 1),
	});
};
