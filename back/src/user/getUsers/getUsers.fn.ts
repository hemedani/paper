import { ActFn, ObjectId } from "deps";
import { user } from "../../../mod.ts";

export const getUsersFn: ActFn = async (body) => {
	const {
		set: {
			provinceId,
			cityId,
			levels,
			educations,
			truckTypes,
			page,
			limit,
		},
		get,
	} = body.details;

	const pipeline = [];

	pipeline.push({ $sort: { _id: -1 } });
	pipeline.push({ $skip: (page - 1) * limit });
	pipeline.push({ $limit: limit });

	provinceId &&
		pipeline.push({ $match: { "province._id": new ObjectId(provinceId) } });
	cityId &&
		pipeline.push({ $match: { "city._id": new ObjectId(cityId) } });
	levels &&
		pipeline.push({ $match: { levels: levels } });
	educations &&
		pipeline.push({ $match: { educations: educations } });
	truckTypes &&
		pipeline.push({ $match: { truckTypes: truckTypes } });

	return await user.aggregation({
		pipeline,
		projection: get,
	}).toArray();
};
