import { addTagSetup } from "./addTag/mod.ts";
import { getTagSetup } from "./getTag/mod.ts";
import { getTagsSetup } from "./getTags/mod.ts";
import { updateTagSetup } from "./updateTag/mod.ts";
import { removeTagSetup } from "./removeTag/mod.ts";
import { countTagsSetup } from "./countTags/mod.ts";

export const tagSetup = () => {
	addTagSetup();
	updateTagSetup();
	getTagSetup();
	getTagsSetup();
	removeTagSetup();
	countTagsSetup();
};
