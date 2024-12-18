import { ObjectId } from "deps";
import { coreApp, user } from "@paper/back";
import type { MyContext } from "../interfaces/context.ts";
import { throwError } from "./throwError.ts";

export const setUser = async () => {
	const { user: { _id } }: MyContext = coreApp.contextFns
		.getContextModel() as MyContext;

	const userPureProjection = coreApp.schemas.createProjection("user", "Pure");
	const taxiPureProjection = coreApp.schemas.createProjection("taxi", "Pure");

	const foundedUser = await user.findOne({
		filters: { _id: new ObjectId(_id) },
		projection: {
			...userPureProjection,
			taxi: {
				...taxiPureProjection,
			},
		},
	});

	!foundedUser && throwError("user not exist");

	coreApp.contextFns.setContext({ user: foundedUser });
};
