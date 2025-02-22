import { object } from "deps";
import { selectStruct } from "../../../mod.ts";
import { pureKeyword } from "@paper/lib";

export const addKeywordValidator = () => {
	return object({
		set: object(pureKeyword),
		get: selectStruct("keyword", 1),
	});
};
