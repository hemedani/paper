"use server";
import { FormSchemaType } from "@/components/organisms/FormCreateBlog";
import { paperApi } from "@/services/api";
import { cookies } from "next/headers";

export const createBlog = async ({
  abstract,
  content,
  isInSwipper,
  likes,
  pic,
  subtitle,
  title,
}: FormSchemaType) => {
  const token = (await cookies()).get("token");
  const addBlog = await paperApi().send(
    {
      service: "main",
      model: "blog",
      act: "add",
      details: {
        set: {
          abstract,
          content,
          isInSwipper,
          likes,
          pic,
          subtitle,
          title,
        },
        get: {
          _id: 1,
          abstract: 1,
          content: 1,
          title: 1,
        },
      },
    },
    { token: token?.value }
  );
  console.log(addBlog);

  if (addBlog.success) return addBlog.body;
};
