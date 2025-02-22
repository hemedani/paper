import { object, string } from "deps";
import { selectStruct } from "../../../mod.ts";

export const getKeywordValidator = () => {
	return object({
		set: object({
			_id: string(),
		}),
		get: selectStruct("keyword", 2),
	});
};
