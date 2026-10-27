import { ObjectId } from "deps";
import { coreApp, user } from "@paper/back";
import type { MyContext } from "../interfaces/context.ts";
import { throwAuthError } from "./throwError.ts";

export const setUser = async () => {
	const { user: { _id } }: MyContext = coreApp.contextFns
		.getContextModel() as MyContext;

	if (!ObjectId.isValid(_id)) {
		throwAuthError("AUTH_USER_ID_INVALID");
	}

	const userPureProjection = coreApp.schemas.createProjection("user", "Pure");

	const foundedUser = await user.findOne({
		filters: { _id: new ObjectId(_id) },
		projection: userPureProjection,
	});

	if (!foundedUser) {
		throwAuthError("AUTH_USER_NOT_FOUND");
	}

	coreApp.contextFns.setContext({ user: foundedUser });
};
