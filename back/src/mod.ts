import { articleSetup } from "./article/mod.ts";
import { fileSetup } from "./file/mod.ts";
import { publicationSetup } from "./publication/mod.ts";
import { tagSetup } from "./tag/mod.ts";
import { keywordSetup } from "./keyword/mod.ts";
import { userSetup } from "./user/mod.ts";

export const functionsSetup = () => {
	userSetup();
	articleSetup();
	fileSetup();
	publicationSetup();
	tagSetup();
	keywordSetup();
};
