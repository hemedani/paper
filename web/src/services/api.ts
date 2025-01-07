import { lesanApi } from "@/types/declarations/selectInp";

const envLesanUrl = process.env.LESAN_URL as string;

export const paperApi = (lesanUrl?: string) =>
  lesanApi({
    URL: lesanUrl
      ? lesanUrl
      : envLesanUrl
        ? `${envLesanUrl}/lesan`
        : "http://localhost:1382/lesan",
    baseHeaders: {
      connection: "keep-alive",
    },
  });
