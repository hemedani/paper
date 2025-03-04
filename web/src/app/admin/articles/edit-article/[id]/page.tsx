import { getArticleAction } from "@/app/actions/article/getArticle";
import { EditArticleRelationForm } from "@/components/organisms/EditArticleRelation";
import { cookies } from "next/headers";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const articleId = (await params).id;

  const getArticle = await getArticleAction({
    set: { _id: articleId as string },
    get: {
      publication: { _id: 1, title: 1 },
      tags: { _id: 1, name: 1 },
      keywords: { _id: 1, name: 1 },
      authors: { _id: 1, first_name: 1, last_name: 1 },
      avatar: { _id: 1, name: 1, type: 1 },
      doc: { _id: 1, name: 1, type: 1 },
    },
  });
  const token = (await cookies()).get("token");

  return (
    <EditArticleRelationForm
      defaultValues={getArticle}
      token={token?.value as string}
    />
  );
};

export default page;
