import { object } from "deps";
import { selectStruct } from "../../../mod.ts";
import { purePublication } from "@paper/lib";

export const addPublicationValidator = () => {
	return object({
		set: object(purePublication),
		get: selectStruct("publication", 1),
	});
};
