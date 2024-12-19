"use server";

import { paperApi } from "@/services/api";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const loginAction = async ({
  national_number,
  code,
}: {
  national_number: string;
  code: string;
}) => {
//   const logReq = await paperApi().send({
//     service: "main",
//     model: "article",
//     act: "getArticles",
//     details: {
//       set: {
//         national_number,
//         code,
//       },
//       get: {
//         token: 1,
//         user: {
//           _id: 1,
//           first_name: 1,
//           last_name: 1,
//           mobile: 1,
//           national_number: 1,
//           personnel_number: 1,
//         },
//       },
//     },
//   });
//   if (logReq.success) {
//     (await cookies()).set("national_number",national_number);
//     (await cookies()).set("token",logReq.body.token);
//     (await cookies()).set("user",logReq.body.user)
//     redirect("/");
//   } else {
//     return logReq.body;
//   }
};
