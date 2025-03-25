import { type ActFn, ObjectId } from "deps";
import { blog } from "../../../mod.ts";

export const updateFn: ActFn = async (body) => {
	const {
		set: {
			_id,
			title,
			subtitle,
			abstract,
			content,
			isInSwipper,
		},
		get,
	} = body.details;

	const updateObj: Record<string, any> = {
		updatedAt: new Date(),
	};

	title && (updateObj.title = title);
	subtitle && (updateObj.subtitle = subtitle);
	abstract && (updateObj.abstract = abstract);
	content && (updateObj.content = content);
	isInSwipper !== undefined &&
		(updateObj.isInSwipper = JSON.parse(isInSwipper));

	return await blog.findOneAndUpdate({
		filter: { _id: new ObjectId(_id) },
		update: {
			$set: updateObj,
		},
		projection: get,
	});
};
