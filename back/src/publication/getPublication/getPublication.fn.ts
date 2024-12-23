import { type ActFn, ObjectId } from "deps";
import { publication } from "../../../mod.ts";

export const getPublicationFn: ActFn = async (body) => {
	const {
		set: {
			_id,
		},
		get,
	} = body.details;

	return await publication.aggregation({
		pipeline: [
			{ $match: { _id: new ObjectId(_id) } },
		],
		projection: get,
	}).toArray();
};
