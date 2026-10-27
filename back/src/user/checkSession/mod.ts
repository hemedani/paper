import { coreApp } from "../../../mod.ts";
import { checkSessionFn } from "./checkSession.fn.ts";
import { checkSessionValidator } from "./checkSession.val.ts";

export const checkSessionSetup = () =>
	coreApp.acts.setAct({
		schema: "user",
		fn: checkSessionFn,
		actName: "checkSession",
		validator: checkSessionValidator(),
	});
