import type { ActFn } from "deps";
import { createUserToken, throwError } from "@paper/lib";
import { myRedis, user } from "../../../mod.ts";

type LoginUser = { _id: unknown; mobile?: unknown };

export const loginUserFn: ActFn = async (body) => {
	const {
		set: {
			national_number,
			code,
		},
		get,
	} = body.details;

	const createToken = async <T extends LoginUser>(foundedUser: T) => {
		const { token } = await createUserToken({
			_id: foundedUser._id,
			national_number,
			mobile: foundedUser.mobile,
		});

		return {
			token,
			user: foundedUser,
		};
	};

	const checkCode = async <T extends LoginUser>(foundedUser: T) => {
		const redisCode = await myRedis.get(national_number);

		return code.toString() === redisCode
			? await createToken(foundedUser)
			: throwError("کد وارد شده صحیح نیست");
	};

	const foundedUser = await user.findOne({
		filters: { national_number },
		projection: get.user,
	});
	return foundedUser
		? await checkCode(foundedUser)
		: throwError(" چنین کاربری پیدا نشد");
};
