import { grantAccess } from "utils/mod.ts";
import { coreApp } from "../../../mod.ts";
import { getUsersFn } from "./getUsers.fn.ts";
import { getUsersValidator } from "./getUsers.val.ts";
import { setTokens } from "utils/setToken.ts";
import { setUser } from "utils/setUser.ts";

export const getUsersSetup = () =>
	coreApp.acts.setAct({
		schema: "user",
		fn: getUsersFn,
		actName: "getUsers",
		preValidation: [
			setTokens,
			setUser,
			grantAccess({
				levels: ["Manager", "Examiner"],
				features: ["manageUsers"],
			}),
		],
		validator: getUsersValidator(),
	});

export * from "./getUsers.fn.ts";
export * from "./getUsers.val.ts";
