import { setTokens, setUser } from "@paper/lib";
import { coreApp } from "../../../mod.ts";
import { updateTaxiFn } from "./updateTaxi.fn.ts";
import { updateTaxiValidator } from "./updateTaxi.val.ts";

export const updateTaxiSetup = () =>
	coreApp.acts.setAct({
		schema: "taxi",
		fn: updateTaxiFn,
		actName: "updateTaxi",
		preAct: [
			setTokens,
			setUser,
		],
		validator: updateTaxiValidator(),
		validationRunType: "create",
	});
