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

export { translateArticleType, CalculateDivision };
