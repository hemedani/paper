import type { ActFn } from "deps";
import { coreApp, tag } from "../../../mod.ts";
import type { MyContext } from "@paper/lib";

export const addTagFn: ActFn = async (body) => {
	const {
		set,
		get,
	} = body.details;
	const { user }: MyContext = coreApp.contextFns
		.getContextModel() as MyContext;

	return await tag.insertOne({
		doc: set,
		relations: {
			registrar: {
				_ids: user._id,
			},
		},
		projection: get,
	});
};
