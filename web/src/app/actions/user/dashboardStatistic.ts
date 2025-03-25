"use server";
import { paperApi } from "@/services/api";
import { cookies } from "next/headers";

export const getCounts = async () => {
  const token = (await cookies()).get("token");
  const getCountDashboard = await paperApi().send(
    {
      service: "main",
      model: "user",
      act: "dashboardStatistic",
      details: {
        set: {},
        get: {
          articles: 1,
          publications: 1,
          tags: 1,
          users: 1,
          authors: 1,
          blogs: 1,
          keywords: 1,
          categories: 1,
        },
      },
    },
    { token: token?.value }
  );

  if (getCountDashboard.success) return getCountDashboard.body;
};
