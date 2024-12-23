import { grantAccess, setTokens, setUser } from "@paper/lib";
import { countPublicationsFn } from "./countPublications.fn.ts";
import { countPublicationsValidator } from "./countPublications.val.ts";
import { coreApp } from "../../../mod.ts";

export const countPublicationsSetup = () =>
	coreApp.acts.setAct({
		schema: "publication",
		fn: countPublicationsFn,
		actName: "countPublications",
		preAct: [
			setTokens,
			setUser,
			grantAccess({
				levels: ["Manager"],
			}),
		],
		validator: countPublicationsValidator(),
	});
