import toast from "react-hot-toast";

const translateArticleType = (articleType: string): string => {
  switch (articleType) {
    case "journalArticle":
      return "مقاله ژورنالی";
    case "book":
      return "کتاب";
    default:
      return "نامشخص";
  }
};

const CalculateDivision = (countPage: number, limit: number = 21): string => {
  const countPageData = countPage / limit;
  return countPageData.toFixed(0);
};

const ToastNotify = (type: "success" | "error", message:string) => {
  if(type === "success"){
    toast.success(message);
  }else {
    toast.error("خطا")
  }
};

const ArrayToSelectOptions = <T>(
  data: T[],
  valueKey: keyof T,
  labelKey: keyof T,
  secondaryLabelKey?: keyof T
) => {
  return data.map((item) => ({
    value: item[valueKey],
    label: `${item[labelKey]} ${secondaryLabelKey ? item[secondaryLabelKey] : ""}`,
  }));
};


export { translateArticleType, CalculateDivision, ToastNotify,ArrayToSelectOptions };
