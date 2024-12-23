import { object } from "deps";
import { selectStruct } from "../../../mod.ts";
import { pureTag } from "@paper/lib";

export const addTagValidator = () => {
	return object({
		set: object(pureTag),
		get: selectStruct("tag", 1),
	});
};
