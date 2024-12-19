import { type ActFn, ObjectId } from "deps";
import { coreApp, taxi as taxiModel } from "../../../mod.ts";
import type { MyContext } from "@paper/lib";

export const updateFullFn: ActFn = async (body) => {
	const { user: { taxi } }: MyContext = coreApp.contextFns
		.getContextModel() as MyContext;

	const {
		set: {
			...rest
		},
		get,
	} = body.details;

	const updatedTaxi = await taxiModel.findOneAndUpdate({
		filter: { _id: new ObjectId(taxi._id) },
		update: {
			$set: {
				...rest,
				updatedAt: new Date(),
			},
		},
		projection: get,
	});

	return updatedTaxi;
};
