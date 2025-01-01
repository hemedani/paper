import { type ActFn, ObjectId } from "deps";
import { publication } from "../../../mod.ts";

export const removePublicationFn: ActFn = async (body) => {
	const {
		set: { _id },
		get,
	} = body.details;

	return await publication.deleteOne({
		filter: { _id: new ObjectId(_id) },
		hardCascade: false,
	});
};
