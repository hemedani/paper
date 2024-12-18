import { type ActFn, ObjectId, type TInsertRelations } from "deps";
import { user } from "../../../mod.ts";
import type { userRelations } from "@paper/lib";

export const addUserFn: ActFn = async (body) => {
	const {
		set,
		get,
	} = body.details;

	const {
		nationalCard,
		...rest
	} = set;

	const relations: TInsertRelations<typeof userRelations> = {};

	nationalCard && (relations.nationalCard = {
		_ids: new ObjectId(nationalCard),
	});

	const addedUser = await user.insertOne({
		doc: {
			...rest,
		},
		relations,
		projection: get,
	});

	return addedUser;
};
