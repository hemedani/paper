import { coreApp } from "@paper/back";
import { throwAuthError } from "./throwError.ts";
import { verifyToken } from "./tokenKeys.ts";

export const verifyTokenFromHeaders = async () => {
	const { Headers } = coreApp.contextFns.getContextModel();
	const token = Headers.get("token");

	if (!token) {
		throwAuthError("AUTH_TOKEN_MISSING");
	}

	return await verifyToken(token);
};

export const setTokens = async () => {
	const tokenPayload = await verifyTokenFromHeaders();
	coreApp.contextFns.setContext({ user: tokenPayload });
};
