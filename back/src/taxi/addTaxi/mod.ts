import { grantAccess, setTokens, setUser } from "@paper/lib";
import { coreApp } from "../../../mod.ts";
import { addTaxiFn } from "./addTaxi.fn.ts";
import { addTaxiValidator } from "./addTaxi.val.ts";

export const addTaxiSetup = () =>
	coreApp.acts.setAct({
		schema: "taxi",
		actName: "addTaxi",
		validationRunType: "create",
		preAct: [
			setTokens,
			setUser,
			grantAccess({
				levels: ["Manager", "Driver"],
			}),
		],
		validator: addTaxiValidator(),
		fn: addTaxiFn,
	});
