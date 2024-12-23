import { grantAccess, setTokens, setUser } from "@paper/lib";
import { countTagsFn } from "./countTags.fn.ts";
import { countTagsValidator } from "./countTags.val.ts";
import { coreApp } from "../../../mod.ts";

export const countTagsSetup = () =>
	coreApp.acts.setAct({
		schema: "tag",
		fn: countTagsFn,
		actName: "countTags",
		preAct: [
			setTokens,
			setUser,
			grantAccess({
				levels: ["Manager"],
			}),
		],
		validator: countTagsValidator(),
	});
