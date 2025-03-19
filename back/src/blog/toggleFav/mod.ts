import { setTokens, setUser } from "@paper/lib";
import { coreApp } from "../../../mod.ts";
import { toggleFavAFn } from "./toggleFav.fn.ts";
import { toggleFavValidator } from "./toggleFav.val.ts";

export const toggleFavSetup = () =>
	coreApp.acts.setAct({
		schema: "blog",
		fn: toggleFavAFn,
		actName: "toggleFav",
		preAct: [
			setTokens,
			setUser,
		],
		validator: toggleFavValidator(),
	});
