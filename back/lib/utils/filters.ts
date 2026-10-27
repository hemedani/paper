import { articleTypeArray } from "../mod.ts";

export const filterarticleTypeArray = (str: string) => {
	switch (str) {
		case "مقاله":
			return articleTypeArray[0];
		case "کتاب":
			return articleTypeArray[1];
		default:
			return "notListed";
	}
};
