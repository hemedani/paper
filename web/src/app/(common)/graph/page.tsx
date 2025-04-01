import GraphVisualization from "@/components/template/GraphVisualization";
import { Header } from "@/components/organisms/Header";
import { prepareArticleSearch } from "@/utils/prepareArtticleSearch";
import { GetArticleSetParams } from "@/utils/populateSetSearch";
import { articleSchema } from "@/types/declarations/selectInp";

export interface NodeData {
  id: string;
  label: string;
  size: number;
  value: number;
  title?: string;
  color: {
    background: string;
    border: string;
    highlight: { background: string; border: string };
  };
  font: { face: string; size: number; color: string };
  group?: string;
}

export interface EdgeData {
  id: string;
  from: string;
  to: string;
  color: { color: string; highlight: string };
  width: number;
  value?: number;
  title?: string;
}

export default async function GraphPage({
  searchParams,
}: {
  searchParams: Promise<GetArticleSetParams>;
}) {
  const actualSearchParams = await searchParams;
  const { defaultSearchArrayValues, articles } = await prepareArticleSearch(
    { ...actualSearchParams, limit: actualSearchParams.limit || 50 }
  );

  // Process graph data
  const nodeMap = new Map<
    string,
    { id: string; label: string; count: number; type: "tag" | "keyword" }
  >();
  const edgesMap = new Map<
    string,
    { id: string; from: string; to: string; weight: number }
  >();

  if (articles.success) {
    articles.body.forEach((article: articleSchema) => {
      // Process tags
      (article.tags || []).forEach((tag) => {
        if (nodeMap.has(tag._id!)) {
          const existing = nodeMap.get(tag._id!)!;
          nodeMap.set(tag._id!, { ...existing, count: existing.count + 1 });
        } else {
          nodeMap.set(tag._id!, {
            id: tag._id!,
            label: tag.name,
            count: 1,
            type: "tag",
          });
        }
      });

      // Process keywords
      (article.keywords || []).forEach(
        (keyword) => {
          if (nodeMap.has(keyword._id!)) {
            const existing = nodeMap.get(keyword._id!)!;
            nodeMap.set(keyword._id!, {
              ...existing,
              count: existing.count + 1,
            });
          } else {
            nodeMap.set(keyword._id!, {
              id: keyword._id!,
              label: keyword.name,
              count: 1,
              type: "keyword",
            });
          }
        }
      );

      // Create edges between all pairs of tags/keywords in the same article
      const items = [...(article.tags || []), ...(article.keywords || [])];
      const itemIds = items.map((item) => item._id);

      for (let i = 0; i < itemIds.length; i++) {
        for (let j = i + 1; j < itemIds.length; j++) {
          const edgeId =
            itemIds[i]! < itemIds![j]!
              ? `${itemIds[i]}-${itemIds[j]}`
              : `${itemIds[j]}-${itemIds[i]}`;

          if (edgesMap.has(edgeId)) {
            const existing = edgesMap.get(edgeId)!;
            edgesMap.set(edgeId, { ...existing, weight: existing.weight + 1 });
          } else {
            edgesMap.set(edgeId, {
              id: edgeId,
              from: itemIds[i]!,
              to: itemIds[j]!,
              weight: 1,
            });
          }
        }
      }
    });
  }

  // Prepare nodes and edges for vis-network
  const nodes: NodeData[] = Array.from(nodeMap.values()).map((node) => {
    const size = Math.max(20, Math.min(80, node.count * 12));
    const value = node.count;

    let color;
    if (node.type === "tag") {
      color =
        node.count > 5 ? "#4338CA" : node.count > 3 ? "#6366F1" : "#A5B4FC";
    } else {
      color =
        node.count > 5 ? "#9D174D" : node.count > 3 ? "#DB2777" : "#F9A8D4";
    }

    return {
      id: node.id,
      label: node.label,
      size,
      value,
      title: `${node.label} (${node.count} مقاله)`,
      color: {
        background: color,
        border: node.type === "tag" ? "#312E81" : "#831843",
        highlight: {
          background: node.type === "tag" ? "#6366F1" : "#EC4899",
          border: node.type === "tag" ? "#312E81" : "#831843",
        },
      },
      font: {
        face: "Vazirmatn, system-ui",
        size: Math.max(16, Math.min(22, 14 + node.count)),
        color: "#FFFFFF",
      },
      group: node.type,
    };
  });

  const edges: EdgeData[] = Array.from(edgesMap.values()).map((edge) => {
    const width = Math.max(1, Math.min(10, edge.weight * 2));
    return {
      id: edge.id,
      from: edge.from,
      to: edge.to,
      value: edge.weight,
      width,
      title: `${edge.weight} ارتباط مشترک`,
      color: {
        color: "#CBD5E1",
        highlight: "#F472B6",
      },
    };
  });

  return (
    <>
      <Header
        defaultSearchArrayValues={defaultSearchArrayValues}
        pageAddress="graph"
      />
      <GraphVisualization
        articles={articles.success ? articles.body : []}
        nodes={nodes}
        edges={edges}
      />
    </>
  );
}
