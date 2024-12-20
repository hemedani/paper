import type { ActFn, Document, ObjectId, TInsertRelations, WithId } from "deps";
import { article, coreApp, publication, tag } from "../../../mod.ts";
import { parse } from "jsr:@std/csv";
import type { articleRelations, MyContext } from "@paper/lib";

const removeDuplicates = (inputArray: ObjectId[]) => {
	const ids: string[] = [];
	return inputArray.reduce<ObjectId[]>((sum, element) => {
		if (!ids.includes(element.toString())) {
			sum.push(element);
			ids.push(element.toString());
		}
		return sum;
	}, []);
};

export const insertCSVFn: ActFn = async (body) => {
	const { user }: MyContext = coreApp.contextFns
		.getContextModel() as MyContext;

	const {
		// deno-lint-ignore no-empty-pattern
		set: {},
	} = body.details;

	const readCSV = await Deno.readTextFile("./db.csv");
	const result = parse(readCSV, {
		skipFirstRow: true,
		strip: true,
	}) as any[];

	for await (const item of result) {
		const itemPublication = (item as any)["Publication Title"];
		let foundedPublication: WithId<Document> | null = null;
		if (itemPublication) {
			foundedPublication = await publication.findOne({
				filters: { title: itemPublication },
				projection: { _id: 1 },
			});

			if (foundedPublication === null) {
				foundedPublication = await publication.insertOne({
					doc: {
						title: itemPublication,
						createdAt: new Date(),
						updatedAt: new Date(),
					},
					relations: {
						registrar: {
							_ids: user._id,
							relatedRelations: {
								registeredPublications: true,
							},
						},
					},
				});
			}
		}

		const tagList: ObjectId[] = [];
		const tags = (item as any)["Manual Tags"];
		if (tags) {
			const replacedTags = (tags as string).replace(/؛/g, ";").replace(
				/،/g,
				";",
			);
			const splitedTag = replacedTags.split(";").map((tag) => tag.trim())
				.filter((item) => ((item !== "-") && (item !== "ندارد")));

			for await (const tagItem of splitedTag) {
				const foundedTag = await tag.findOne({
					filters: { name: tagItem },
					projection: { _id: 1 },
				});

				if (foundedTag === null) {
					const insertedTag = await tag.insertOne({
						doc: {
							name: tagItem,
							createdAt: new Date(),
							updatedAt: new Date(),
						},
						relations: {
							registrar: {
								_ids: user._id,
							},
						},
					});
					if (insertedTag) {
						tagList.push(insertedTag._id);
					}
				} else {
					tagList.push(foundedTag._id);
				}
			}
		}

		const relations: TInsertRelations<typeof articleRelations> = {
			registrar: {
				_ids: user._id,
				relatedRelations: {
					registerArticles: true,
				},
			},
		};
		tagList.length > 0 && (relations.tags = {
			_ids: removeDuplicates(tagList),
			relatedRelations: {
				articles: true,
			},
		});
		foundedPublication && (relations.publication = {
			_ids: foundedPublication._id,
			relatedRelations: {
				articles: true,
			},
		});

		let authors: string[] | null = null;
		if (item["Author"]) {
			authors = (item["Author"] as string).split(";").map((tag) =>
				tag.trim()
			);
		}
		const doc: Record<string, any> = {
			createdAt: new Date(),
			updatedAt: new Date(),
		};
		item["Key"] && (doc["key"] = item["Key"]);
		item["Item Type"] && (doc["articleType"] = item["Item Type"]);
		item["Publication Year"] &&
			(doc["publicationYear"] = item["Publication Year"]);
		authors && (doc["authors"] = authors);
		item["Title"] && (doc["title"] = item["Title"]);
		item["Abstract Note"] && (doc["abstract"] = item["Abstract Note"]);
		item["ISBN"] && (doc["ISBN"] = item["ISBN"]);
		item["ISNN"] && (doc["ISNN"] = item["ISNN"]);
		item["DOI"] && (doc["DOI"] = item["DOI"]);
		item["Url"] && (doc["URL"] = item["Url"]);
		item["Pages"] && (doc["page"] = item["Pages"]);
		item["Date"] && (doc["date"] = item["Date"]);
		item["Issue"] && (doc["issue"] = item["Issue"]);
		item["Volume"] && (doc["volume"] = item["Volume"]);

		await article.insertOne({
			doc,
			relations,
		});
	}

	return ({ ok: "ok" });
};
