import { type ActFn, ensureDir, ObjectId } from "deps";
import { coreApp, file, user as userModel } from "../../../mod.ts";
import type { MyContext } from "@paper/lib";

export const uploadImageFn: ActFn = async (body) => {
	const { user }: MyContext = coreApp.contextFns
		.getContextModel() as MyContext;

	const { formData, updatePlus, ...rest } = body.details.set;

	const image: File = formData.get("image") as File;

	const imageName = `${new ObjectId()}-${image.name}`;
	await ensureDir("./uploads/images");
	await Deno.writeFile(
		`./uploads/images/${imageName}`,
		image.stream(),
	);

	const insertedFile = await file.insertOne({
		doc: { name: imageName, type: image.type, size: image.size, ...rest },
		relations: {
			uploader: {
				_ids: new ObjectId(user._id),
				relatedRelations: {
					uploadedAssets: true,
				},
			},
		},
		projection: body.details.get,
	});

	if (insertedFile && updatePlus) {
		if (updatePlus === "nationalCard") {
			await userModel.addRelation({
				filters: { _id: user._id },
				relations: {
					nationalCard: {
						_ids: insertedFile._id,
					},
				},
				replace: true,
			});
		}
	}

	return insertedFile;
};
