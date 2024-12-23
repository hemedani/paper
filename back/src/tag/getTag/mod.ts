import { setTokens, setUser } from "@paper/lib";
import { coreApp } from "../../../mod.ts";
import { getTagFn } from "./getTag.fn.ts";
import { getTagValidator } from "./getTag.val.ts";

export const getTagSetup = () =>
	coreApp.acts.setAct({
		schema: "tag",
		fn: getTagFn,
		actName: "getTag",
		preAct: [
			setTokens,
			setUser,
		],
		validator: getTagValidator(),
	});
