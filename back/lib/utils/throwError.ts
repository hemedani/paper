export const throwError = (msg?: string) => {
	throw new Error(msg);
};

export const authErrorCodes = [
	"AUTH_TOKEN_MISSING",
	"AUTH_TOKEN_INVALID",
	"AUTH_TOKEN_EXPIRED",
	"AUTH_USER_ID_INVALID",
	"AUTH_USER_NOT_FOUND",
] as const;

export type AuthErrorCode = typeof authErrorCodes[number];

const authErrorMessages: Record<AuthErrorCode, string> = {
	AUTH_TOKEN_MISSING: "The authentication token is missing.",
	AUTH_TOKEN_INVALID: "The authentication token is invalid.",
	AUTH_TOKEN_EXPIRED: "The authentication token has expired.",
	AUTH_USER_ID_INVALID:
		"The authentication token contains an invalid user id.",
	AUTH_USER_NOT_FOUND: "The authenticated user no longer exists.",
};

export class AuthError extends Error {
	readonly code: AuthErrorCode;
	readonly authMessage: string;
	readonly status = 401;

	constructor(code: AuthErrorCode, message?: string) {
		const resolvedMessage = message || authErrorMessages[code];
		super(resolvedMessage);
		this.name = "AuthError";
		this.code = code;
		this.authMessage = resolvedMessage;
		// Lesan only serializes `error.message`. Keep the structured payload
		// there so the HTTP layer can expose `body.code` without leaking
		// stack traces or framework internals.
		Object.defineProperty(this, "message", {
			value: { code, message: resolvedMessage },
			enumerable: true,
			configurable: true,
			writable: true,
		});
	}
}

export function throwAuthError(
	code: AuthErrorCode,
	message?: string,
): never {
	throw new AuthError(code, message);
}
