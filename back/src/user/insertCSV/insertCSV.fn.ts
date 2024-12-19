import type { ActFn } from "deps";
import { taxi, user } from "../../../mod.ts";
import { filterSystemModelFA2EN, filterTaxiColorFA2EN } from "@paper/lib";
import { parse } from "jsr:@std/csv";

type CSVItems = {
	owner: string;
	national_id: string;
	father_name: string;
	phone: string;
	sex: string;
	plate: string;
	car_id: string;
	engine_number: string;
	VIN: string;
	year_of_production: string;
	color: string;
	system: string;
	first_plate_number: string;
	letter: string;
	secuond_plate_number: string;
	country: string;
	third_plate_number: string;
};

export const insertCSVFn: ActFn = async (body) => {
	const {
		// deno-lint-ignore no-empty-pattern
		set: {},
	} = body.details;

	const readCSV = await Deno.readTextFile("./csv/data.csv");
	const result = parse(readCSV, {
		skipFirstRow: true,
		strip: true,
	}) as CSVItems[];

	const uniqueResult = [
		...new Map(result.map((item) => [item["national_id"], item])).values(),
	];

	for await (const item of uniqueResult) {
		if (item.national_id !== "1111111111") {
			const first_name = item.owner.slice(0, item.owner.lastIndexOf(" "));
			const last_name = item.owner.slice(item.owner.lastIndexOf(" "));
			const gender = item.sex === "مرد" ? "Male" : "Female";
			const insertedUser = await user.insertOne({
				doc: {
					first_name,
					last_name,
					father_name: item.father_name,
					mobile: item.phone,
					gender,
					national_number: item.national_id,
					level: "Driver",
					registration_step: "personalInformation",
					isVerified: false,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			});

			await taxi.insertOne({
				doc: {
					systemModel: filterSystemModelFA2EN(item.system),
					color: filterTaxiColorFA2EN(item.color),
					manufactureYears: Number(item.year_of_production),

					// پلاک خودرد
					license_plate: {
						double_digits: Number(item.first_plate_number),
						letter: item.letter,
						three_digits: Number(item.secuond_plate_number),
						issue_place: Number(item.third_plate_number),
					},

					vin: item.VIN,

					createdAt: new Date(),
					updatedAt: new Date(),
				},
				relations: {
					owner: {
						_ids: insertedUser?._id,
						relatedRelations: {
							taxi: true,
						},
					},
				},
			});
		}
	}
	return ({ ok: "ok" });
};
