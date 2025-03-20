import GraphVisualization from "@/components/template/GraphVisualization";
import { Header } from "@/components/organisms/Header";
import { prepareArticleSearch } from "@/utils/prepareArtticleSearch";
import { GetArticleSetParams } from "@/utils/populateSetSearch";

export default async function GraphPage({
  searchParams,
}: {
  searchParams: Promise<GetArticleSetParams>;
}) {
  const actualSearchParams = await searchParams;
  const { defaultSearchArrayValues, articles } = await prepareArticleSearch(actualSearchParams)

  return (
    <>
      <Header
        defaultSearchArrayValues={defaultSearchArrayValues}
        pageAddress="graph"
      />
      <GraphVisualization articles={articles} />
    </>
  );
}
