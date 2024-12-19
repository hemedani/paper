import { addTaxiSetup } from "./addTaxi/mod.ts";
import { updateDocsSetup } from "./updateDocs/mod.ts";
import { updateFullSetup } from "./updateFull/mod.ts";
import { updateTaxiSetup } from "./updateTaxi/mod.ts";
import { updateVehicleSetup } from "./updateVehicle/mod.ts";

export const taxiSetup = () => {
	addTaxiSetup();
	updateVehicleSetup();
	updateTaxiSetup();
	updateDocsSetup();
	updateFullSetup();
};
