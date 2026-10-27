import { jwt } from "deps";
import { throwAuthError } from "./throwError.ts";

// TOKEN_KEY is required outside development (ENV=development). To rotate keys
// without logging everyone out, keep the old key in TOKEN_KEY_PREVIOUS until
// its tokens expire. New tokens are valid for 30 days.
const DEV_FALLBACK_KEY = "simpleSecretKey";
const isDevelopment = Deno.env.get("ENV") === "development";
const currentSecret = Deno.env.get("TOKEN_KEY")?.trim() || "";
const previousSecret = Deno.env.get("TOKEN_KEY_PREVIOUS")?.trim() || "";

if (
	!isDevelopment &&
	(!currentSecret || currentSecret === DEV_FALLBACK_KEY)
) {
	throw new Error(
		"TOKEN_KEY must be set to a strong, non-default value before starting the server outside development.",
	);
}

if (!isDevelopment && previousSecret === DEV_FALLBACK_KEY) {
	throw new Error(
		"TOKEN_KEY_PREVIOUS must not use the development fallback key outside development.",
	);
}

const activeSecret = currentSecret || DEV_FALLBACK_KEY;
const encoder = new TextEncoder();

const importHmacKey = (secret: string) =>
	crypto.subtle.importKey(
		"raw",
		encoder.encode(secret),
		{ name: "HMAC", hash: "SHA-512" },
		true,
		["sign", "verify"],
	);

const buildKeyId = async (secret: string) => {
	const digest = await crypto.subtle.digest(
		"SHA-256",
		encoder.encode(secret),
	);
	return Array.from(new Uint8Array(digest))
		.slice(0, 8)
		.map((byte) => byte.toString(16).padStart(2, "0"))
		.join("");
};

type SigningKey = { kid: string; key: CryptoKey };

const currentSigningKey: SigningKey = {
	kid: await buildKeyId(activeSecret),
	key: await importHmacKey(activeSecret),
};

const verificationKeys: SigningKey[] = [currentSigningKey];

if (previousSecret && previousSecret !== activeSecret) {
	verificationKeys.push({
		kid: await buildKeyId(previousSecret),
		key: await importHmacKey(previousSecret),
	});
}

export const currentTokenKeyId = currentSigningKey.kid;
export const TOKEN_TTL_SECONDS = 60 * 60 * 24 * 30;

export type AuthTokenPayload = jwt.Payload & {
	_id?: unknown;
};

export type TokenUser = {
	_id: unknown;
	national_number?: unknown;
	mobile?: unknown;
};

export const createUserToken = async (user: TokenUser) => {
	const expiresAt = Date.now() + TOKEN_TTL_SECONDS * 1000;
	const token = await jwt.create(
		{
			alg: "HS512",
			typ: "JWT",
			kid: currentSigningKey.kid,
		},
		{
			_id: user._id,
			national_number: user.national_number,
			mobile: user.mobile,
			jti: crypto.randomUUID(),
			exp: jwt.getNumericDate(new Date(expiresAt)),
		},
		currentSigningKey.key,
	);

	return {
		token,
		expiresAt: new Date(expiresAt).toISOString(),
	};
};

export const verifyToken = async (
	token: string,
): Promise<AuthTokenPayload> => {
	let decodedHeader: unknown;

	try {
		[decodedHeader] = jwt.decode(token);
	} catch {
		throwAuthError("AUTH_TOKEN_INVALID");
	}

	if (!decodedHeader || typeof decodedHeader !== "object") {
		throwAuthError("AUTH_TOKEN_INVALID");
	}

	const header = decodedHeader as { kid?: unknown };
	const kid = typeof header.kid === "string" ? header.kid : undefined;
	const orderedKeys = kid
		? [
			...verificationKeys.filter((entry) => entry.kid === kid),
			...verificationKeys.filter((entry) => entry.kid !== kid),
		]
		: verificationKeys;

	for (const { key } of orderedKeys) {
		try {
			return await jwt.verify(token, key) as AuthTokenPayload;
		} catch (error) {
			if (error instanceof RangeError && /expired/i.test(error.message)) {
				throwAuthError("AUTH_TOKEN_EXPIRED");
			}
		}
	}

	return throwAuthError("AUTH_TOKEN_INVALID");
};
