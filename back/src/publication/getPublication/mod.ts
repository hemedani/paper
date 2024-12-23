import { setTokens, setUser } from "@paper/lib";
import { coreApp } from "../../../mod.ts";
import { getPublicationFn } from "./getPublication.fn.ts";
import { getPublicationValidator } from "./getPublication.val.ts";

export const getPublicationSetup = () =>
	coreApp.acts.setAct({
		schema: "publication",
		fn: getPublicationFn,
		actName: "getPublication",
		preAct: [
			setTokens,
			setUser,
		],
		validator: getPublicationValidator(),
	});
