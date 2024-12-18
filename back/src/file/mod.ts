import { getFilesSetup } from "./getFiles/mod.ts";
import { uploadImageSetup } from "./uploadImage/mod.ts";

export const fileSetup = () => {
  getFilesSetup(), uploadImageSetup();
};
