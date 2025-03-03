"use client";
import cytoscape, { Core } from "cytoscape";
import { useEffect, useRef } from "react";

interface Tags {
  _id: string;
  name: string;
}

interface GraphProps {
  tags: Tags[];
}

// function generateEdges(articles: Article[]) {
//   const edges: { source: string; target: string }[] = [];

//   for (let i = 0; i < articles.length; i++) {
//     for (let j = i + 1; j < articles.length; j++) {
//       const tags1 = articles[i].tags.map((tag) => tag.name);
//       const tags2 = articles[j].tags.map((tag) => tag.name);

//       const commonTags = tags1.filter((tag) => tags2.includes(tag));
//       if (commonTags.length > 0) {
//         edges.push({ source: articles[i]._id, target: articles[j]._id });
//       }
//     }
//   }

//   return edges;
// }

export const Graph: React.FC<GraphProps> = ({ tags }) => {
  const cyRef = useRef<Core | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!tags.length) return;

    // const edges = generateEdges(articles);

    const elements = {
      nodes: tags.map((tag) => ({
        data: { id: tag._id, label: tag.name.charAt(0) }, // نمایش اولین حرف عنوان
      })),
      edges: [],
      // edges: edges.map((edge) => ({
      //   data: { source: edge.source, target: edge.target },
      // })),
    };

    const cy = cytoscape({
      container: document.getElementById("cy"),
      elements,
      style: [
        {
          selector: "node",
          style: {
            "background-color": "#9db7b7",
            "border-color": "#8faaaa",
            label: "data(label)",
            color: "#fff",
            "text-valign": "center",
            "text-halign": "center",
          },
        },
        {
          selector: "edge",
          style: {
            "line-color": "#666",
            width: 2,
          },
        },
      ],
      layout: {
        name: "cose", // چیدمان بهتر برای نمایش گراف
        animate: true,
      },
    });

    cyRef.current = cy;

    cy.on("tap", "node", (event) => {
      const node = event.target;
      alert(`Clicked on node: ${node.id()}`);
    });

    return () => {
      cyRef.current?.destroy();
    };
  }, [tags]);

  return <div id="cy" style={{ height: "500px", width: "100%" }} />;
};
