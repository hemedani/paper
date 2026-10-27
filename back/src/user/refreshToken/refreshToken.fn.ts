import type { ActFn } from "deps";
import { createUserToken, type MyContext } from "@paper/lib";
import { coreApp } from "../../../mod.ts";

export const refreshTokenFn: ActFn = async () => {
	const { user }: MyContext = coreApp.contextFns
		.getContextModel() as MyContext;

	return await createUserToken({
		_id: user._id,
		national_number: user.national_number,
		mobile: user.mobile,
	});
};
