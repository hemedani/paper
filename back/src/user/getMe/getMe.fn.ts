import { type ActFn, ObjectId } from "deps";
import { coreApp, user } from "../../../mod.ts";
import { type MyContext, throwAuthError } from "@paper/lib";

export const getMeFn: ActFn = async (body) => {
	const context: MyContext = coreApp.contextFns
		.getContextModel() as MyContext;
	const _id = context.user._id;

	const { get } = body.details;

	if (!ObjectId.isValid(_id)) {
		throwAuthError("AUTH_USER_ID_INVALID");
	}

	const foundedUser = await user.aggregation({
		pipeline: [
			{ $match: { _id: new ObjectId(_id) } },
		],
		projection: get,
	}).toArray();
	if (foundedUser.length < 1) {
		throwAuthError("AUTH_USER_NOT_FOUND");
	}
	return foundedUser[0];
};
