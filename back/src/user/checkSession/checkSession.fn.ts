import { type ActFn, ObjectId } from "deps";
import { AuthError, throwAuthError, verifyTokenFromHeaders } from "@paper/lib";
import { user } from "../../../mod.ts";

const sessionError = (error: AuthError) => ({
	valid: false,
	code: error.code,
	message: error.authMessage,
});

export const checkSessionFn: ActFn = async () => {
	try {
		const payload = await verifyTokenFromHeaders();
		const tokenUserId = payload._id;

		if (
			typeof tokenUserId !== "string" ||
			!ObjectId.isValid(tokenUserId)
		) {
			throwAuthError("AUTH_USER_ID_INVALID");
		}

		const foundedUser = await user.findOne({
			filters: { _id: new ObjectId(tokenUserId) },
			projection: { _id: 1, level: 1 },
		});

		if (!foundedUser) {
			throwAuthError("AUTH_USER_NOT_FOUND");
		}

		return {
			valid: true,
			user: {
				_id: foundedUser._id,
				level: foundedUser.level,
			},
			expiresAt: typeof payload.exp === "number"
				? new Date(payload.exp * 1000).toISOString()
				: undefined,
		};
	} catch (error) {
		if (error instanceof AuthError) {
			return sessionError(error);
		}
		throw error;
	}
};
