import { fileSetup } from "./file/mod.ts";
import { taxiSetup } from "./taxi/mod.ts";
import { userSetup } from "./user/mod.ts";

export const functionsSetup = () => {
	userSetup();
	taxiSetup();
	fileSetup();
};
