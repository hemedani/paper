import { grantAccess, setTokens, setUser } from "@paper/lib";
import { coreApp } from "../../../mod.ts";
import { addPublicationFn } from "./addPublication.fn.ts";
import { addPublicationValidator } from "./addPublication.val.ts";

export const addPublicationSetup = () =>
	coreApp.acts.setAct({
		schema: "publication",
		fn: addPublicationFn,
		actName: "addPublication",
		preAct: [
			setTokens,
			setUser,
			grantAccess({
				levels: ["Manager"],
			}),
		],
		validator: addPublicationValidator(),
		validationRunType: "create",
	});
