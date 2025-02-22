import type { ActFn } from "deps";
import { coreApp, keyword } from "../../../mod.ts";
import type { MyContext } from "@paper/lib";

export const addKeywordFn: ActFn = async (body) => {
	const {
		set,
		get,
	} = body.details;
	const { user }: MyContext = coreApp.contextFns
		.getContextModel() as MyContext;

	return await keyword.insertOne({
		doc: set,
		relations: {
			registrar: {
				_ids: user._id,
			},
		},
		projection: get,
	});
};
