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

  export { translateArticleType };