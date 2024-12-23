import { grantAccess, setTokens, setUser } from "@paper/lib";
import { updatePublicationFn } from "./updatePublication.fn.ts";
import { updatePublicationValidator } from "./updatePublication.val.ts";
import { coreApp } from "../../../mod.ts";

export const updatePublicationSetup = () =>
	coreApp.acts.setAct({
		schema: "publication",
		fn: updatePublicationFn,
		actName: "updatePublication",
		preAct: [
			setTokens,
			setUser,
			grantAccess({
				levels: ["Manager"],
			}),
		],
		validator: updatePublicationValidator(),
	});
