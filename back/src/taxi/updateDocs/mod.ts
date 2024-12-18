import { setTokens, setUser } from "@paper/lib";
import { coreApp } from "../../../mod.ts";
import { updateDocsFn } from "./updateDocs.fn.ts";
import { updateDocsValidator } from "./updateDocs.val.ts";

export const updateDocsSetup = () =>
	coreApp.acts.setAct({
		schema: "taxi",
		fn: updateDocsFn,
		actName: "updateDocs",
		preAct: [
			setTokens,
			setUser,
		],
		validator: updateDocsValidator(),
		validationRunType: "create",
	});
