import { coreApp } from "../../../mod.ts";
import { setTokens, setUser } from "@paper/lib";
import { uploadImageFn } from "./uploadImage.fn.ts";
import { uploadImageValidator } from "./uploadImage.val.ts";

export const uploadImageSetup = () =>
	coreApp.acts.setAct({
		schema: "file",
		actName: "uploadImage",
		validationRunType: "create",
		validator: uploadImageValidator(),
		preAct: [
			setTokens,
			setUser,
		],
		fn: uploadImageFn,
	});
