import type { ActFn } from "deps";
import { publication } from "../../../mod.ts";

export const updatePublicationFn: ActFn = async (body) => {
	const {
		set: {
			_id,
			title,
		},
		get,
	} = body.details;

	const updateObj: Record<string, any> = {
		updatedAt: new Date(),
	};

	title && (updateObj.title = title);

	return await publication.findOneAndUpdate({
		filter: { _id: new Object(_id) },
		update: {
			$set: updateObj,
		},
		projection: get,
	});
};
