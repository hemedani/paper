import { object, string } from "deps";
import { selectStruct } from "../../../mod.ts";

export const getPublicationValidator = () => {
	return object({
		set: object({
			_id: string(),
		}),
		get: selectStruct("publication", 2),
	});
};
