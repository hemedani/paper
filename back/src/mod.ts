import { articleSetup } from "./article/mod.ts";
import { fileSetup } from "./file/mod.ts";
import { publicationSetup } from "./publication/mod.ts";
import { tagSetup } from "./tag/mod.ts";
import { keywordSetup } from "./keyword/mod.ts";
import { userSetup } from "./user/mod.ts";
import { blogSetup } from "./blog/mod.ts";
import { authorSetup } from "./author/mod.ts";
import { categorySetup } from "./category/mod.ts";

export const functionsSetup = () => {
	userSetup();
	articleSetup();
	blogSetup();
	fileSetup();
	publicationSetup();
	tagSetup();
	authorSetup();
	keywordSetup();
	categorySetup();
};
