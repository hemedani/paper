import { type ActFn, ObjectId } from "deps";
import { coreApp, taxi as taxiModel, user } from "../../../mod.ts";
import type { MyContext } from "@paper/lib";

export const updateDocsFn: ActFn = async (body) => {
	const { user: { _id, taxi } }: MyContext = coreApp.contextFns
		.getContextModel() as MyContext;

	const {
		set: {
			nationalCardId,
			carCardId,
			taxiLicenseId,
		},
		get,
	} = body.details;

	const updatedDocs = await taxiModel.addRelation({
		filters: { _id: new ObjectId(taxi._id) },
		relations: {
			carCard: {
				_ids: new ObjectId(carCardId),
				relatedRelations: {
					taxi: true,
				},
			},
			taxiLicense: {
				_ids: new ObjectId(taxiLicenseId),
			},
		},
		projection: get.taxi,
		replace: true,
	});

	await user.addRelation({
		filters: { _id },
		relations: {
			nationalCard: {
				_ids: new ObjectId(nationalCardId),
			},
		},
		projection: get.user,
		replace: true,
	});

	const updatedUser = user.findOneAndUpdate({
		filter: { _id },
		update: {
			$set: {
				registration_step: "completed",
				updatedAt: new Date(),
			},
		},
		projection: get.user,
	});

	return {
		user: updatedUser,
		taxi: updatedDocs,
	};
};
