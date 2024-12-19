import { lesanApi } from "@/types/declarations/selectInp";

const baseUrl: string = "http://localhost:1382/lesan";

export const paperApi = (url?: string) =>
  lesanApi({
    URL: url ? url : baseUrl,
    baseHeaders: {
      connection: "keep-alive",
    },
  });
