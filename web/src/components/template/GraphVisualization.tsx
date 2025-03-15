"use client";

import { useEffect, useRef, useState } from "react";
import { Network } from "vis-network/standalone";
import { DataSet } from "vis-data";

interface Tag {
  _id: string;
  name: string;
}

interface Keyword {
  _id: string;
  name: string;
}

interface Article {
  _id: string;
  articleType: "journalArticle" | "book";
  title: string;
  abstract: string;
  publication: { _id: string; title: string };
  authors: { _id: string; first_name: string; last_name: string }[];
  tags?: Tag[];
  keywords?: Keyword[];
}

interface GraphPageProps {
  articles: Article[];
}

// Define proper interface for nodes and edges
interface NodeData {
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

interface EdgeData {
  id: string;
  from: string;
  to: string;
  color: { color: string; highlight: string };
  width: number;
  value?: number;
  title?: string;
}

const GraphVisualization = ({ articles }: GraphPageProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const networkRef = useRef<Network | null>(null);
  const [selectedNode, setSelectedNode] = useState<{
    id: string;
    label: string;
    count: number;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [networkReady, setNetworkReady] = useState(false);

  // Track related articles for selected node
  const [relatedArticles, setRelatedArticles] = useState<Article[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;
    setLoading(true);

    // Step 1: Collect all unique tags and keywords
    const nodeMap = new Map<
      string,
      { id: string; label: string; count: number; type: "tag" | "keyword" }
    >();
    const edgesMap = new Map<
      string,
      { id: string; from: string; to: string; weight: number }
    >();

    articles.forEach((article) => {
      // Process tags
      (article.tags || []).forEach((tag) => {
        if (nodeMap.has(tag._id)) {
          const existing = nodeMap.get(tag._id)!;
          nodeMap.set(tag._id, { ...existing, count: existing.count + 1 });
        } else {
          nodeMap.set(tag._id, {
            id: tag._id,
            label: tag.name,
            count: 1,
            type: "tag",
          });
        }
      });

      // Process keywords
      (article.keywords || []).forEach((keyword) => {
        if (nodeMap.has(keyword._id)) {
          const existing = nodeMap.get(keyword._id)!;
          nodeMap.set(keyword._id, { ...existing, count: existing.count + 1 });
        } else {
          nodeMap.set(keyword._id, {
            id: keyword._id,
            label: keyword.name,
            count: 1,
            type: "keyword",
          });
        }
      });

      // Create edges between all pairs of tags/keywords in the same article
      const items = [...(article.tags || []), ...(article.keywords || [])];
      const itemIds = items.map((item) => item._id);

      for (let i = 0; i < itemIds.length; i++) {
        for (let j = i + 1; j < itemIds.length; j++) {
          const edgeId =
            itemIds[i] < itemIds[j]
              ? `${itemIds[i]}-${itemIds[j]}`
              : `${itemIds[j]}-${itemIds[i]}`;

          if (edgesMap.has(edgeId)) {
            const existing = edgesMap.get(edgeId)!;
            edgesMap.set(edgeId, { ...existing, weight: existing.weight + 1 });
          } else {
            edgesMap.set(edgeId, {
              id: edgeId,
              from: itemIds[i],
              to: itemIds[j],
              weight: 1,
            });
          }
        }
      }
    });

    // Step 2: Prepare nodes and edges for vis-network
    const nodes = new DataSet<NodeData>(
      Array.from(nodeMap.values()).map((node) => {
        // Scale node size based on count (frequency)
        const size = Math.max(20, Math.min(80, node.count * 12));
        const value = node.count;

        // Color scheme based on type and frequency
        let color;
        if (node.type === "tag") {
          color =
            node.count > 5
              ? "#4338CA" // Indigo-700
              : node.count > 3
                ? "#6366F1" // Indigo-500
                : "#A5B4FC"; // Indigo-300
        } else {
          color =
            node.count > 5
              ? "#9D174D" // Pink-800
              : node.count > 3
                ? "#DB2777" // Pink-600
                : "#F9A8D4"; // Pink-300
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
      })
    );

    const edges = new DataSet<EdgeData>(
      Array.from(edgesMap.values()).map((edge) => {
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
      })
    );

    // Step 3: Configure the network
    const options = {
      nodes: {
        shape: "circle",
        scaling: {
          min: 20,
          max: 80,
          label: {
            enabled: true,
            min: 14,
            max: 24,
          },
        },
        shadow: {
          enabled: true,
          color: "rgba(0,0,0,0.2)",
          size: 10,
          x: 2,
          y: 2,
        },
      },
      edges: {
        smooth: {
          enabled: true,
          type: "dynamic",
          forceDirection: "none",
          roundness: 0.5,
        },
        selectionWidth: 3,
        shadow: {
          enabled: true,
          color: "rgba(0,0,0,0.2)",
          size: 5,
          x: 2,
          y: 2,
        },
      },
      physics: {
        forceAtlas2Based: {
          gravitationalConstant: -70,
          centralGravity: 0.01,
          springLength: 150,
          springConstant: 0.05,
          avoidOverlap: 0.5,
        },
        maxVelocity: 30,
        solver: "forceAtlas2Based",
        timestep: 0.35,
        stabilization: {
          enabled: true,
          iterations: 1000,
          updateInterval: 25,
          onlyDynamicEdges: false,
          fit: true,
        },
      },
      interaction: {
        hover: true,
        hoverConnectedEdges: true,
        multiselect: false,
        tooltipDelay: 200,
        zoomView: true,
        navigationButtons: true,
        keyboard: true,
        hideEdgesOnDrag: true,
      },
      groups: {
        tag: {
          color: { background: "#4338CA", border: "#312E81" },
          shadow: { enabled: true },
        },
        keyword: {
          color: { background: "#DB2777", border: "#831843" },
          shadow: { enabled: true },
        },
      },
      layout: {
        improvedLayout: true,
        randomSeed: 42,
      },
    };

    // Step 4: Initialize the network
    networkRef.current = new Network(
      containerRef.current,
      { nodes, edges },
      options
    );

    // Set up event listeners
    networkRef.current.on("stabilizationProgress", function(params) {
      const progress = Math.round((params.iterations / params.total) * 100);
      // You could update a progress bar here
    });

    networkRef.current.on("stabilizationIterationsDone", function() {
      setLoading(false);
      setNetworkReady(true);
    });

    networkRef.current.on("selectNode", function(params) {
      if (params.nodes.length > 0) {
        const nodeId = params.nodes[0];
        const node = nodeMap.get(nodeId);
        if (node) {
          setSelectedNode(node);

          // Find related articles
          const relatedArticles = articles.filter((article) => {
            const tagIds = (article.tags || []).map((tag) => tag._id);
            const keywordIds = (article.keywords || []).map(
              (keyword) => keyword._id
            );
            return tagIds.includes(nodeId) || keywordIds.includes(nodeId);
          });

          setRelatedArticles(relatedArticles);
        }
      }
    });

    networkRef.current.on("deselectNode", function() {
      setSelectedNode(null);
      setRelatedArticles([]);
    });

    // Cleanup on unmount
    return () => {
      networkRef.current?.destroy();
      networkRef.current = null;
    };
  }, [articles]);

  const getNodeTruncatedLabel = (label: string): string => {
    return label.length > 30 ? label.substring(0, 27) + "..." : label;
  };

  const resetView = () => {
    networkRef.current?.fit({
      animation: {
        duration: 1000,
        easingFunction: "easeInOutQuad",
      },
    });
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-16 px-4 sm:px-6 lg:px-8"
      dir="rtl"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 bg-opacity-90 backdrop-blur">
          <div className="mb-6">
            <h1 className="text-3xl md:text-4xl font-bold text-indigo-900 mb-4">
              گراف برچسب‌ها و کلمات کلیدی مقالات
            </h1>
            <p className="text-gray-600 text-lg">
              این نمودار، روابط بین برچسب‌ها و کلیدواژه‌های مقالات را به صورت
              بصری نمایش می‌دهد.
              <br />
              <span className="text-sm text-gray-500 mt-2 block">
                اندازه دایره‌ها نشان‌دهندۀ تعداد دفعات استفاده، و ضخامت خطوط
                نشان‌دهندۀ قدرت ارتباط بین کلیدواژه‌ها است.
              </span>
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <span className="inline-block w-4 h-4 rounded-full bg-indigo-600"></span>
                <span className="text-sm text-gray-700">برچسب‌ها</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-block w-4 h-4 rounded-full bg-pink-600"></span>
                <span className="text-sm text-gray-700">کلیدواژه‌ها</span>
              </div>
            </div>
            <button
              onClick={resetView}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition"
            >
              بازنشانی نمای گراف
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Graph Container */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="relative w-full h-[700px]">
                {loading && (
                  <div className="absolute inset-0 bg-white bg-opacity-80 flex flex-col items-center justify-center z-10">
                    <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                    <p className="mt-4 text-indigo-800 font-medium">
                      در حال بارگذاری گراف...
                    </p>
                  </div>
                )}
                <div ref={containerRef} className="w-full h-full" />
              </div>
            </div>
          </div>

          {/* Info Panel */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
              {selectedNode ? (
                <>
                  <div className="border-b border-gray-200 pb-4 mb-6">
                    <div className="flex items-start justify-between">
                      <h2 className="text-2xl font-bold text-gray-900">
                        {selectedNode.label}
                      </h2>
                      <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm">
                        {selectedNode.count} مقاله
                      </span>
                    </div>
                  </div>

                  <h3 className="text-lg font-medium text-gray-800 mb-4">
                    مقالات مرتبط:
                  </h3>
                  <ul className="space-y-4">
                    {relatedArticles.map((article) => (
                      <li
                        key={article._id}
                        className="border-r-4 border-indigo-500 pr-4 py-2 hover:bg-indigo-50 transition duration-200"
                      >
                        <h4 className="font-medium text-gray-900">
                          {getNodeTruncatedLabel(article.title)}
                        </h4>
                        <p className="text-sm text-gray-500 mt-1">
                          {article.authors
                            .map(
                              (author) =>
                                `${author.first_name} ${author.last_name}`
                            )
                            .join("، ")}
                        </p>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {article.tags?.map((tag) => (
                            <span
                              key={tag._id}
                              className="px-2 py-1 bg-indigo-100 text-indigo-800 rounded-full text-xs"
                            >
                              {tag.name}
                            </span>
                          ))}
                          {article.keywords?.map((keyword) => (
                            <span
                              key={keyword._id}
                              className="px-2 py-1 bg-pink-100 text-pink-800 rounded-full text-xs"
                            >
                              {keyword.name}
                            </span>
                          ))}
                        </div>
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <div className="text-center py-12">
                  <svg
                    className="w-16 h-16 text-indigo-300 mx-auto"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <h3 className="mt-4 text-lg font-medium text-gray-900">
                    انتخاب گره برای مشاهده اطلاعات
                  </h3>
                  <p className="mt-2 text-gray-500">
                    روی یکی از برچسب‌ها یا کلیدواژه‌ها کلیک کنید تا اطلاعات
                    مرتبط با آن نمایش داده شود.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Usage Guide */}
        <div className="mt-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl shadow-lg p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">راهنمای استفاده از گراف</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-4">
              <h3 className="font-bold text-xl mb-2">جستجو و کاوش</h3>
              <p className="text-indigo-100">
                با کلیک روی هر گره، مقالات مرتبط با آن برچسب یا کلیدواژه نمایش
                داده می‌شود.
              </p>
            </div>
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-4">
              <h3 className="font-bold text-xl mb-2">بزرگنمایی</h3>
              <p className="text-indigo-100">
                با چرخاندن اسکرول موس می‌توانید نمودار را بزرگنمایی یا
                کوچک‌نمایی کنید.
              </p>
            </div>
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-4">
              <h3 className="font-bold text-xl mb-2">جابجایی</h3>
              <p className="text-indigo-100">
                با کلیک و کشیدن در فضای خالی، می‌توانید نمودار را جابجا کنید.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GraphVisualization;
