import { coreApp } from "../../../mod.ts";
import { grantAccess, setTokens, setUser } from "@paper/lib";
import { insertCSVFn } from "./insertCSV.fn.ts";
import { insertCSVValidator } from "./insertCSV.val.ts";

export const insertCSVSetup = () =>
	coreApp.acts.setAct({
		schema: "user",
		fn: insertCSVFn,
		preAct: [
			setTokens,
			setUser,
			grantAccess({
				levels: ["Ghost"],
			}),
		],
		actName: "insertCSV",
		validator: insertCSVValidator(),
	});
