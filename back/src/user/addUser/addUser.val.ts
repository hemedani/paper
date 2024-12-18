import { object } from "deps";
import { selectStruct } from "../../../mod.ts";
import { userPure } from "@paper/lib";

export const addUserValidator = () => {
	return object({
		set: object({ ...userPure }),
		get: selectStruct("user", 1),
	});
};
