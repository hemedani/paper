import { coreApp } from "../../../mod.ts";
import { getLandingHighlightsFn } from "./getLandingHighlights.fn.ts";
import { getLandingHighlightsValidator } from "./getLandingHighlights.val.ts";

export const getLandingHighlightsSetup = () =>
	coreApp.acts.setAct({
		schema: "article",
		actName: "getLandingHighlights",
		validator: getLandingHighlightsValidator(),
		fn: getLandingHighlightsFn,
	});
