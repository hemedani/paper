import { type ActFn, ObjectId, type TInsertRelations } from "deps";
import { coreApp, taxi } from "../../../mod.ts";
import type { MyContext, taxiRelations } from "@paper/lib";

export const addTaxiFn: ActFn = async (body) => {
	const { user }: MyContext = coreApp.contextFns
		.getContextModel() as MyContext;

	const {
		set,
		get,
	} = body.details;

	const {
		carCard,
		taxiLicense,
		...rest
	} = set;

	const relations: TInsertRelations<typeof taxiRelations> = {
		owner: {
			_ids: user._id,
			relatedRelations: {
				taxi: true,
			},
		},
	};

	carCard && (relations.carCard = {
		_ids: new ObjectId(carCard),
		relatedRelations: {
			taxi: true,
		},
	});

	taxiLicense && (relations.taxiLicense = {
		_ids: new ObjectId(taxiLicense),
	});

	const addedTaxi = await taxi.insertOne({
		doc: {
			...rest,
		},
		relations,
		projection: get,
	});

	return addedTaxi;
};
