import type { ActFn } from "deps";
import { coreApp, publication } from "../../../mod.ts";
import type { MyContext } from "@paper/lib";

export const addPublicationFn: ActFn = async (body) => {
	const {
		set,
		get,
	} = body.details;
	const { user }: MyContext = coreApp.contextFns
		.getContextModel() as MyContext;

	return await publication.insertOne({
		doc: set,
		relations: {
			registrar: {
				_ids: user._id,
				relatedRelations: {
					registeredPublications: true,
				},
			},
		},
		projection: get,
	});
};
