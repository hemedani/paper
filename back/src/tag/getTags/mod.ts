import { setTokens, setUser } from "@paper/lib";
import { coreApp } from "../../../mod.ts";
import { getTagsFn } from "./getTags.fn.ts";
import { getTagsValidator } from "./getTags.val.ts";

export const getTagsSetup = () =>
	coreApp.acts.setAct({
		schema: "tag",
		fn: getTagsFn,
		actName: "getTags",
		preAct: [
			setTokens,
			setUser,
		],
		validator: getTagsValidator(),
	});
