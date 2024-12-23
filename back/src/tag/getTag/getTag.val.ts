import { object, string } from "deps";
import { selectStruct } from "../../../mod.ts";

export const getTagValidator = () => {
	return object({
		set: object({
			_id: string(),
		}),
		get: selectStruct("tag", 2),
	});
};
