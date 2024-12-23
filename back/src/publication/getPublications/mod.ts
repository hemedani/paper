import { setTokens, setUser } from "@paper/lib";
import { coreApp } from "../../../mod.ts";
import { getPublicationsFn } from "./getPublications.fn.ts";
import { getPublicationsValidator } from "./getPublications.val.ts";

export const getPublicationsSetup = () =>
	coreApp.acts.setAct({
		schema: "publication",
		fn: getPublicationsFn,
		actName: "getPublications",
		preAct: [
			setTokens,
			setUser,
		],
		validator: getPublicationsValidator(),
	});
