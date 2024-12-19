import { articleSetup } from "./article/mod.ts";
import { fileSetup } from "./file/mod.ts";
import { userSetup } from "./user/mod.ts";

export const functionsSetup = () => {
	userSetup();
	articleSetup();
	fileSetup();
};
