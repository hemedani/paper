"use server";
import { paperApi } from "@/services/api";
import { ReqType } from "@/types/declarations/selectInp";
import { cookies } from "next/headers";

export const getMe = async (get?: ReqType["main"]["user"]["getMe"]["get"]) => {
  const token = (await cookies()).get("token");
  get = get || {
    _id: 1,
    first_name: 1,
    last_name: 1,
    gender: 1,
    mobile: 1,
    national_number: 1,
    personnel_number: 1,
    level: 1,
    favArticles: {
      _id: 1,
      title: 1,
      articleType: 1,
      abstract: 1,
    },
  };

  return await paperApi().send({
    service: "main",
    model: "user",
    act: "getMe",
    details: {
      set: {},
      get,
    },
  }, { token: token?.value });
};
