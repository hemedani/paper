import { grantAccess, setTokens, setUser } from "@paper/lib";
import { removePublicationFn } from "./removePublication.fn.ts";
import { removePublicationValidator } from "./removePublication.val.ts";
import { coreApp } from "../../../mod.ts";

export const removePublicationSetup = () =>
	coreApp.acts.setAct({
		schema: "publication",
		actName: "removePublication",
		fn: removePublicationFn,
		preAct: [
			setTokens,
			setUser,
			grantAccess({
				levels: ["Manager"],
			}),
		],
		validator: removePublicationValidator(),
	});
