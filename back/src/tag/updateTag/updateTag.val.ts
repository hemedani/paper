import { object, string } from "deps";
import { selectStruct } from "../../../mod.ts";

export const updateTagValidator = () => {
	return object({
		set: object({
			_id: string(),
			name: (string()),
		}),
		get: selectStruct("tag", 2),
	});
};
