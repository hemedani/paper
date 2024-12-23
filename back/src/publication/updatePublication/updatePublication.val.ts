import { object, string } from "deps";
import { selectStruct } from "../../../mod.ts";

export const updatePublicationValidator = () => {
	return object({
		set: object({
			_id: string(),
			title: (string()),
		}),
		get: selectStruct("publication", 2),
	});
};
