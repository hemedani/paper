import { setTokens, setUser } from "@paper/lib";
import { coreApp } from "../../../mod.ts";
import { refreshTokenFn } from "./refreshToken.fn.ts";
import { refreshTokenValidator } from "./refreshToken.val.ts";

export const refreshTokenSetup = () =>
	coreApp.acts.setAct({
		schema: "user",
		fn: refreshTokenFn,
		actName: "refreshToken",
		preAct: [setTokens, setUser],
		validator: refreshTokenValidator(),
	});
