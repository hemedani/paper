import { grantAccess } from "utils/mod.ts";
import { coreApp } from "../../../mod.ts";
import { countUsersFn } from "./countUsers.fn.ts";
import { countUsersValidator } from "./countUsers.val.ts";
import { setTokens } from "utils/setToken.ts";
import { setUser } from "utils/setUser.ts";

export const countUsersSetup = () =>
	coreApp.acts.setAct({
		schema: "user",
		fn: countUsersFn,
		actName: "countUsers",
		preValidation: [
			setTokens,
			setUser,
			grantAccess({
				levels: ["Manager", "Examiner"],
				features: ["manageUsers"],
			}),
		],
		validator: countUsersValidator(),
	});

export * from "./countUsers.fn.ts";
export * from "./countUsers.val.ts";
