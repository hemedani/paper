import type { ActFn } from "deps";
import { author, coreApp } from "../../../mod.ts";
import type { MyContext } from "@paper/lib";

export const addFn: ActFn = async (body) => {
	const {
		set,
		get,
	} = body.details;
	const { user }: MyContext = coreApp.contextFns
		.getContextModel() as MyContext;

	return await author.insertOne({
		doc: set,
		relations: {
			registrar: {
				_ids: user._id,
			},
		},
		projection: get,
	});
};
