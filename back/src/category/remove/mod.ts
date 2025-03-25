import { grantAccess, setTokens, setUser } from "@paper/lib";
import { coreApp } from "../../../mod.ts";
import { removeFn } from "./remove.fn.ts";
import { removeValidator } from "./remove.val.ts";

export const removeSetup = () =>
  coreApp.acts.setAct({
    schema: "category",
    fn: removeFn,
    actName: "remove",
    preAct: [
      setTokens,
      setUser,
      grantAccess({
        levels: ["Manager"],
      }),
    ],
    validator: removeValidator(),
  });
