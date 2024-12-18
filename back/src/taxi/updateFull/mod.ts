import { setTokens, setUser } from "@paper/lib";
import { coreApp } from "../../../mod.ts";
import { updateFullFn } from "./updateFull.fn.ts";
import { updateFullValidator } from "./updateFull.val.ts";

export const updateFullSetup = () =>
	coreApp.acts.setAct({
		schema: "taxi",
		fn: updateFullFn,
		actName: "updateFull",
		preAct: [
			setTokens,
			setUser,
		],
		validator: updateFullValidator(),
		validationRunType: "create",
	});
