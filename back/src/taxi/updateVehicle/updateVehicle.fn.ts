import { type ActFn, ObjectId } from "deps";
import { coreApp, taxi as taxiModel, user } from "../../../mod.ts";
import type { MyContext } from "@paper/lib";

export const updateVehicleFn: ActFn = async (body) => {
	const { user: { _id, taxi } }: MyContext = coreApp.contextFns
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

	await user.findOneAndUpdate({
		filter: { _id },
		update: {
			$set: {
				registration_step: "taxiInformation",
				updatedAt: new Date(),
			},
		},
		projection: {},
	});

	return updatedTaxi;
};
