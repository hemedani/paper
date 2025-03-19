"use server";
import { paperApi } from "@/services/api";
import { cookies } from "next/headers";

export const getBlog = async (_id: string) => {
  const token = (await cookies()).get("token");
  return await paperApi().send(
    {
      service: "main",
      model: "blog",
      act: "get",
      details: {
        set: {
          _id,
        },
        get: {
          content: 1,
          abstract: 1,
          _id: 1,
          isInSwipper: 1,
          likes: 1,
          pic: { _id: 1, name: 1, type: 1 },
          subtitle: 1,
          title: 1,
          author: {
            _id: 1,
            first_name: 1,
            last_name: 1,
          },
          favByUsers: { _id: 1 },
          createdAt: 1,
          updatedAt: 1,
        },
      },
    },
    { token }
  );
};
