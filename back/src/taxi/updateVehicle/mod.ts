import { setTokens, setUser } from "@paper/lib";
import { coreApp } from "../../../mod.ts";
import { updateVehicleFn } from "./updateVehicle.fn.ts";
import { updateVehicleValidator } from "./updateVehicle.val.ts";

export const updateVehicleSetup = () =>
	coreApp.acts.setAct({
		schema: "taxi",
		fn: updateVehicleFn,
		actName: "updateVehicle",
		preAct: [
			setTokens,
			setUser,
		],
		validator: updateVehicleValidator(),
		validationRunType: "create",
	});
