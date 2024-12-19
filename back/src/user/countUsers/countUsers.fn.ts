import { ActFn, Document, ObjectId } from "deps";
import { user } from "../../../mod.ts";

export const countUsersFn: ActFn = async (body) => {
	const {
		set: {
			provinceId,
			cityId,
			levels,
		},
		get,
	} = body.details;

	const filter: Document = {};
	provinceId &&
		(filter["province._id"] = new ObjectId(provinceId));
	cityId &&
		(filter["city._id"] = new ObjectId(cityId));
	levels &&
		(filter["levels"] = levels);

	const qty = await user.countDocument({
		filter,
	});

	return { qty };
};
