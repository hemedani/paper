import { addPublicationSetup } from "./addPublication/mod.ts";
import { getPublicationSetup } from "./getPublication/mod.ts";
import { getPublicationsSetup } from "./getPublications/mod.ts";
import { updatePublicationSetup } from "./updatePublication/mod.ts";
import { removePublicationSetup } from "./removePublication/mod.ts";
import { countPublicationsSetup } from "./countPublications/mod.ts";

export const publicationSetup = () => {
	addPublicationSetup();
	updatePublicationSetup();
	getPublicationSetup();
	getPublicationsSetup();
	removePublicationSetup();
	countPublicationsSetup();
};
