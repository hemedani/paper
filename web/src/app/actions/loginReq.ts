"use server"

import { paperApi } from "@/services/api";
import { cookies } from "next/headers";

export const loginReqAction = async ({ national_number }: { national_number: string }) => {
  
  const logReq = await paperApi().send({
    service: "main",
    model: "user",
    act: "loginReq",
    details: {
      set: {
        national_number
      },
      get: {
        mobile: 1,
        national_number: 1
      }
    }
  })
  
  console.log(logReq);
  if (logReq.success) {
    (await cookies()).set("national_number",national_number);
    (await cookies()).set("registration_step", "verification_code");
  } else {
    return logReq.body
  }
}
