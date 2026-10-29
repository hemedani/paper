"use client";

import { useEffect, useRef, useState } from "react";
import { Network } from "vis-network/standalone";
import { DataSet } from "vis-data";
import Link from "next/link";
import Image from "next/image";
import { EdgeData, NodeData } from "@/app/(common)/graph/page";
import { articleSchema } from "@/types/declarations/selectInp";
import { DefaultSearchArrayValues } from "@/utils/prepareArtticleSearch";
import { Hero } from "@/components/organisms/Hero";
import {
  ChevronLeftIcon,
  DocumentTextIcon,
  HashtagIcon,
  KeyIcon,
  UsersIcon,
} from "@/components/atoms/Icons";
import { formatFaNumber } from "@/utils/digits";

interface GraphPageProps {
  articles: articleSchema[];
  nodes: NodeData[];
  edges: EdgeData[];
  defaultSearchArrayValues: DefaultSearchArrayValues;
}

const ArticlePreview = ({ article }: { article: articleSchema }) => {
  const authors = (article.authors ?? [])
    .map((author) => `${author.first_name ?? ""} ${author.last_name ?? ""}`.trim())
    .filter(Boolean)
    .join("، ");
  const tags = (article.tags ?? []).slice(0, 2);
  const keywords = (article.keywords ?? []).slice(0, 2);

  return (
    <Link
      href={`/article/${article._id ?? ""}`}
      className="group flex h-full flex-col rounded-[24px] border border-[#F0F0F2] bg-white p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#9FDDE0] hover:shadow-[0_20px_40px_-28px_rgba(8,166,174,0.5)]"
    >
      <div className="flex items-center justify-between gap-3">
        <span className="inline-flex items-center gap-1 rounded-full bg-[#FDF6E3] px-2.5 py-1 text-[11px] font-bold text-[#A9821C]">
          <HashtagIcon className="h-3.5 w-3.5" />
          {formatFaNumber(article.tags?.length ?? 0)} برچسب
        </span>
        {article.publicationYear != null && (
          <span className="text-[11px] font-medium text-[#9A9AA1]">
            {formatFaNumber(article.publicationYear)}
          </span>
        )}
      </div>

      <h3 className="mt-3 line-clamp-2 text-[16px] font-bold leading-[1.7] text-black transition-colors group-hover:text-[#08A6AE]">
        {article.title}
      </h3>

      <p className="mt-2 line-clamp-3 text-[13px] font-medium leading-[1.85] text-[#9A9AA1]">
        {article.abstract}
      </p>

      {authors && (
        <div className="mt-3 flex items-center gap-1.5 text-[12px] font-medium text-[#9A9AA1]">
          <UsersIcon className="h-4 w-4 shrink-0" />
          <span className="truncate">{authors}</span>
        </div>
      )}

      {(tags.length > 0 || keywords.length > 0) && (
        <div className="mt-auto flex flex-wrap gap-1.5 pt-4">
          {tags.map((tag) => (
            <span
              key={tag._id}
              className="inline-flex max-w-full items-center gap-1 rounded-full border border-[#F0E2B8] bg-[#FDF8EA] px-2.5 py-1 text-[10.5px] font-semibold text-[#A9821C]"
            >
              <HashtagIcon className="h-3 w-3 shrink-0" />
              <span className="truncate">{tag.name}</span>
            </span>
          ))}
          {keywords.map((keyword) => (
            <span
              key={keyword._id}
              className="inline-flex max-w-full items-center gap-1 rounded-full border border-[#CFEFF1] bg-[#EDFEFF] px-2.5 py-1 text-[10.5px] font-semibold text-[#07939B]"
            >
              <KeyIcon className="h-3 w-3 shrink-0" />
              <span className="truncate">{keyword.name}</span>
            </span>
          ))}
        </div>
      )}
    </Link>
  );
};

const GraphVisualization = ({ articles, nodes, edges, defaultSearchArrayValues }: GraphPageProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const networkRef = useRef<Network | null>(null);
  const [selectedNode, setSelectedNode] = useState<{
    id: string;
    label: string;
    count: number;
    group?: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [stabilizationProgress, setStabilizationProgress] = useState(0);
  const [relatedArticles, setRelatedArticles] = useState<articleSchema[]>([]);
  const [showHelp, setShowHelp] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;
    setLoading(true);

    if (nodes.length === 0) {
      setLoading(false);
      setStabilizationProgress(0);
      return;
    }

    const nodesDataSet = new DataSet<NodeData>(nodes);
    const edgesDataSet = new DataSet<EdgeData>(edges);

    // Configure the network
    const options = {
      nodes: {
        shape: "circle",
        scaling: {
          min: 20,
          max: 80,
          label: {
            enabled: true,
            min: 12,
            max: 18,
          },
        },
        shadow: {
          enabled: true,
          color: "rgba(0,0,0,0.1)",
          size: 8,
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
        selectionWidth: 2,
        shadow: {
          enabled: false,
        },
      },
      physics: {
        solver: "barnesHut",
        barnesHut: {
          gravitationalConstant: -2000,
          centralGravity: 0.3,
          springLength: 95,
          springConstant: 0.04,
          damping: 0.09,
          avoidOverlap: 0.1,
        },
        maxVelocity: 30,
        timestep: 0.35,
        stabilization: {
          enabled: true,
          iterations: 500,
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
        navigationButtons: false,
        keyboard: true,
        hideEdgesOnDrag: true,
      },
      groups: {
        tag: {
          color: { background: "#D2A634", border: "#D2A634" },
        },
        keyword: {
          color: { background: "#08A6AE", border: "#08A6AE" },
        },
      },
      layout: {
        improvedLayout: true,
        randomSeed: 42,
      },
    };

    // Initialize the network
    if (containerRef.current) {
      networkRef.current = new Network(
        containerRef.current,
        { nodes: nodesDataSet, edges: edgesDataSet },
        options,
      );

      // Set up event listeners
      networkRef.current.on("stabilizationProgress", function (params) {
        const progress = Math.round((params.iterations / params.total) * 100);
        setStabilizationProgress(progress);
      });

      networkRef.current.on("stabilizationIterationsDone", function () {
        setLoading(false);
        setStabilizationProgress(0);
        // Disable physics after stabilization for better performance
        networkRef.current?.setOptions({ physics: { enabled: false } });
      });

      networkRef.current.on("selectNode", function (params) {
        if (params.nodes.length > 0) {
          const nodeId = params.nodes[0];
          const node = nodes.find((n) => n.id === nodeId);
          if (node) {
            setShowHelp(false);
            setSelectedNode({
              id: nodeId,
              label: node.label,
              count: node.value,
              group: node.group,
            });

            // Find related articles
            const relatedArticles = articles.filter((article) => {
              const tagIds = (article.tags || []).map((tag) => tag._id);
              const keywordIds = (article.keywords || []).map((keyword) => keyword._id);
              return tagIds.includes(nodeId) || keywordIds.includes(nodeId);
            });

            setRelatedArticles(relatedArticles);
          }
        }
      });

      networkRef.current.on("deselectNode", function () {
        setSelectedNode(null);
        setRelatedArticles([]);
      });
    }

    // Cleanup on unmount
    return () => {
      networkRef.current?.destroy();
      networkRef.current = null;
    };
  }, [articles, nodes, edges]);

  const resetView = () => {
    networkRef.current?.fit({
      animation: {
        duration: 1000,
        easingFunction: "easeInOutQuad",
      },
    });
  };

  const clearSelection = () => {
    networkRef.current?.unselectAll();
    setSelectedNode(null);
    setRelatedArticles([]);
  };

  const isTagNode = selectedNode?.group === "tag";
  const featuredArticle = relatedArticles[0];
  const featuredAuthors = featuredArticle?.authors
    ?.map((author) => `${author.first_name ?? ""} ${author.last_name ?? ""}`.trim())
    .filter(Boolean)
    .join("، ");
  const featuredTags = featuredArticle?.tags?.slice(0, 4) ?? [];
  const featuredKeywords = featuredArticle?.keywords?.slice(0, 4) ?? [];
  const articleList = selectedNode ? relatedArticles : articles;
  const visibleArticles = articleList.slice(0, 6);

  return (
    <div className="bg-white" dir="rtl">
      <Hero
        compact
        pageAddress="/graph"
        defaultSearchArrayValues={defaultSearchArrayValues}
      />

      <section className="mx-auto w-full max-w-[1392px] px-4 pt-8 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-[28px] border border-[#F0F0F2] bg-white shadow-[0_30px_60px_-45px_rgba(8,166,174,0.35)]">
          {/* Toolbar */}
          <div className="flex flex-col gap-3 border-b border-[#F0F0F2] px-4 py-3.5 sm:flex-row sm:items-center sm:justify-between sm:px-5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex h-8 items-center gap-1.5 rounded-full bg-[#EDFEFF] px-3 text-[11.5px] font-semibold text-[#08A6AE]">
                <span className="h-2 w-2 rounded-full bg-[#08A6AE]" />
                کلیدواژه
              </span>
              <span className="inline-flex h-8 items-center gap-1.5 rounded-full bg-[#FDF6E3] px-3 text-[11.5px] font-semibold text-[#A9821C]">
                <span className="h-2 w-2 rounded-full bg-[#D2A634]" />
                برچسب
              </span>
              <span className="hidden text-[11.5px] font-medium text-[#9A9AA1] md:inline">
                برای دیدن جزئیات روی هر گره کلیک کنید
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowHelp(!showHelp)}
                aria-label="راهنما"
                aria-expanded={showHelp}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#F0F0F2] text-[15px] font-bold text-[#5C5C63] transition-colors hover:bg-[#F8F8F9]"
              >
                ?
              </button>
              <button
                type="button"
                onClick={resetView}
                className="inline-flex h-10 items-center gap-1.5 rounded-full border border-[#F0F0F2] px-3 text-[12px] font-semibold text-[#5C5C63] transition-colors hover:bg-[#F8F8F9]"
              >
                <Image
                  src="/images/graph/reset-icon.svg"
                  alt=""
                  width={18}
                  height={18}
                  className="h-[18px] w-[18px]"
                />
                <span className="hidden sm:inline">بازنشانی</span>
              </button>
              <Link
                href="/chatbot"
                className="inline-flex h-10 items-center gap-1.5 rounded-full bg-black px-4 text-[12px] font-semibold text-white transition-colors hover:bg-[#1c1c1c]"
              >
                <Image
                  src="/images/graph/chatbot-icon.svg"
                  alt=""
                  width={18}
                  height={18}
                  className="h-[18px] w-[18px] brightness-0 invert"
                />
                <span>چت‌بات</span>
              </Link>
            </div>
          </div>

          {/* Graph Container */}
          <div className="relative">
            <div
              className="relative h-[420px] w-full bg-[#FBFDFD] sm:h-[520px] lg:h-[600px]"
              style={{
                backgroundImage: "radial-gradient(#E7F1F2 1px, transparent 1px)",
                backgroundSize: "22px 22px",
              }}
            >
                {loading && (
                  <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-[#FBFDFD]/90 backdrop-blur-sm">
                    <div className="h-12 w-12 animate-spin rounded-full border-[3px] border-[#08A6AE] border-t-transparent" />
                    <p className="mt-4 text-[14px] font-semibold text-[#08A6AE]">
                      در حال بارگذاری گراف...
                    </p>
                    {stabilizationProgress > 0 && (
                      <div className="mt-4 w-56">
                        <div className="h-1.5 overflow-hidden rounded-full bg-[#E7F1F2]">
                          <div
                            className="h-full bg-[#08A6AE] transition-all duration-300"
                            style={{ width: `${stabilizationProgress}%` }}
                          />
                        </div>
                        <p className="mt-2 text-center text-[12px] font-medium text-[#08A6AE]">
                          {formatFaNumber(stabilizationProgress)}٪ تکمیل شد
                        </p>
                      </div>
                    )}
                  </div>
                )}
                {!loading && nodes.length === 0 && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-6 text-center">
                    <DocumentTextIcon className="h-8 w-8 text-[#C9C9CF]" />
                    <p className="text-[13px] font-medium text-[#9A9AA1]">
                      موضوعی برای نمایش پیدا نشد. جستجو یا فیلترها را تغییر دهید.
                    </p>
                  </div>
                )}
                <div ref={containerRef} className="w-full h-full" />
              </div>

              {/* Help Popover */}
              {showHelp && (
                <div className="absolute right-4 top-4 z-20 w-[340px] max-w-[calc(100%-2rem)] sm:right-6 sm:top-6">
                  <div className="rounded-[20px] border border-[#E4F1F2] bg-white p-5 shadow-[0_24px_50px_-24px_rgba(15,23,42,0.35)]">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="text-[15px] font-bold text-black">
                          راهنمای نمودار
                        </h3>
                        <p className="mt-1.5 text-[12.5px] font-normal leading-[1.9] text-[#6B6B73]">
                          اندازه دایره‌ها نشان‌دهنده تعداد مقالات مرتبط و ضخامت خطوط
                          نشان‌دهنده قدرت ارتباط است. برای دیدن جزئیات، روی هر گره
                          کلیک کنید.
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setShowHelp(false)}
                        aria-label="بستن"
                        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-base leading-none text-[#9A9AA1] transition-colors hover:bg-[#F5F5F7] hover:text-black"
                      >
                        ✕
                      </button>
                    </div>

                    <div className="mt-4 flex items-center gap-4 border-t border-[#F0F0F2] pt-3">
                      <span className="flex items-center gap-1.5 text-[12px] font-semibold text-[#08A6AE]">
                        <span className="h-2 w-2 rounded-full bg-[#08A6AE]" />
                        کلیدواژه
                      </span>
                      <span className="flex items-center gap-1.5 text-[12px] font-semibold text-[#D2A634]">
                        <span className="h-2 w-2 rounded-full bg-[#D2A634]" />
                        برچسب
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Selected Node Info - Positioned on left side */}
              {selectedNode && (
                <aside
                  aria-label={`اطلاعات ${selectedNode.label}`}
                  className="absolute left-4 top-4 z-30 w-[400px] max-w-[calc(100%-2rem)] sm:left-5 sm:top-5"
                >
                  <div className="overflow-hidden rounded-[24px] border border-[#E4F1F2] bg-white/95 shadow-[0_24px_60px_-24px_rgba(8,166,174,0.35),0_16px_40px_-20px_rgba(15,23,42,0.28)] backdrop-blur-xl">
                    <div
                      className={[
                        "h-1 w-full bg-gradient-to-l",
                        isTagNode
                          ? "from-[#D2A634] via-[#E8C568] to-[#F7E7B4]"
                          : "from-[#08A6AE] via-[#3DB4BA] to-[#A9E7EA]",
                      ].join(" ")}
                    />

                    <div className="max-h-[360px] overflow-y-auto p-5 sm:max-h-[460px] lg:max-h-[520px]">
                      <div className="flex items-start gap-3">
                        <span
                          className={[
                            "flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px] border",
                            isTagNode
                              ? "border-[#F3E4B8] bg-[#FDF6E3] text-[#B48A1E]"
                              : "border-[#CFF3F5] bg-[#EDFEFF] text-[#08A6AE]",
                          ].join(" ")}
                        >
                          {isTagNode ? (
                            <HashtagIcon className="h-5 w-5" />
                          ) : (
                            <KeyIcon className="h-5 w-5" />
                          )}
                        </span>

                        <div className="min-w-0 flex-1">
                          <p className="text-[11px] font-bold leading-[1.7] text-[#9A9AA1]">
                            {isTagNode ? "برچسب" : "کلیدواژه"}
                          </p>
                          <h3 className="mt-0.5 line-clamp-2 text-[17px] font-extrabold leading-[1.55] text-black">
                            {selectedNode.label}
                          </h3>
                        </div>

                        <button
                          type="button"
                          onClick={clearSelection}
                          aria-label="بستن"
                          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-lg leading-none text-[#9A9AA1] transition-colors hover:bg-[#F5F5F7] hover:text-black"
                        >
                          ✕
                        </button>
                      </div>

                      <div className="mt-3 flex items-center gap-2">
                        <span
                          className={[
                            "inline-flex items-center justify-center rounded-full px-3 py-1 text-[12px] font-bold",
                            isTagNode
                              ? "bg-[#FDF6E3] text-[#A9821C]"
                              : "bg-[#EDFEFF] text-[#08A6AE]",
                          ].join(" ")}
                        >
                          {formatFaNumber(selectedNode.count)} مقاله
                        </span>
                        <span className="text-[11px] font-medium text-[#9A9AA1]">
                          در این پایگاه
                        </span>
                      </div>

                      <div className="my-4 h-px w-full bg-[#F0F0F2]" />

                      {featuredArticle ? (
                        <div>
                          <p className="mb-2 text-[11px] font-bold text-[#9A9AA1]">
                            درباره مقاله
                          </p>
                          <Link
                            href={`/article/${featuredArticle._id ?? ""}`}
                            className="group block"
                          >
                            <h4 className="line-clamp-2 text-[15px] font-bold leading-[1.7] text-black transition-colors group-hover:text-[#08A6AE]">
                              {featuredArticle.title}
                            </h4>
                          </Link>

                          {featuredAuthors && (
                            <div className="mt-2 flex items-center gap-1.5 text-[12px] font-medium text-[#9A9AA1]">
                              <UsersIcon className="h-4 w-4 shrink-0" />
                              <span className="truncate">{featuredAuthors}</span>
                            </div>
                          )}

                          {featuredArticle.abstract && (
                            <p className="mt-2 line-clamp-2 text-[12.5px] font-normal leading-[1.9] text-[#6B6B73]">
                              {featuredArticle.abstract}
                            </p>
                          )}

                          <Link
                            href={`/article/${featuredArticle._id ?? ""}`}
                            className="mt-3 inline-flex items-center gap-1 text-[12px] font-bold text-[#08A6AE] transition-all hover:gap-1.5"
                          >
                            مشاهده مقاله
                            <ChevronLeftIcon className="h-4 w-4" />
                          </Link>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center gap-2 rounded-[16px] border border-dashed border-[#E5E5E8] bg-[#FAFAFB] px-4 py-5 text-center">
                          <DocumentTextIcon className="h-6 w-6 text-[#C9C9CF]" />
                          <p className="text-[12px] font-medium text-[#9A9AA1]">
                            مقاله‌ای برای این مورد یافت نشد.
                          </p>
                        </div>
                      )}

                      {(featuredTags.length > 0 || featuredKeywords.length > 0) && (
                        <div className="mt-4 border-t border-[#F5F5F7] pt-4">
                          <p className="mb-2 text-[11px] font-bold text-[#9A9AA1]">
                            موضوعات مرتبط
                          </p>
                          <div className="flex flex-wrap gap-1.5">
                            {featuredTags.map((tag) => (
                              <span
                                key={tag._id}
                                className={[
                                  "inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[11px] font-semibold",
                                  "border-[#F0E2B8] bg-[#FDF8EA] text-[#A9821C]",
                                  selectedNode.id === tag._id
                                    ? "ring-2 ring-[#D2A634]/30 ring-offset-1 ring-offset-white"
                                    : "",
                                ]
                                  .filter(Boolean)
                                  .join(" ")}
                              >
                                <HashtagIcon className="h-3.5 w-3.5 shrink-0" />
                                {tag.name}
                              </span>
                            ))}

                            {featuredKeywords.map((keyword) => (
                              <span
                                key={keyword._id}
                                className={[
                                  "inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[11px] font-semibold",
                                  "border-[#CFEFF1] bg-[#EDFEFF] text-[#07939B]",
                                  selectedNode.id === keyword._id
                                    ? "ring-2 ring-[#08A6AE]/30 ring-offset-1 ring-offset-white"
                                    : "",
                                  ]
                                  .filter(Boolean)
                                  .join(" ")}
                              >
                                <KeyIcon className="h-3.5 w-3.5 shrink-0" />
                                {keyword.name}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </aside>
              )}
            </div>
        </div>
      </section>

      {/* Related Articles Section */}
      <section className="mx-auto w-full max-w-[1392px] px-4 py-14 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-[26px] font-extrabold leading-[1.6] text-black sm:text-[30px]">
              مقالات مرتبط
            </h2>
            <p className="mt-1 text-[13px] font-medium leading-[1.8] text-[#9A9AA1] sm:text-[14px]">
              {selectedNode
                ? `مقالات مرتبط با «${selectedNode.label}»`
                : "پیشنهادهایی برای ادامه کاوش"}
            </p>
          </div>
          <span className="rounded-full bg-[#F8F8F9] px-3 py-1.5 text-[12px] font-semibold text-[#9A9AA1]">
            {articleList.length > visibleArticles.length
              ? `${formatFaNumber(visibleArticles.length)} از ${formatFaNumber(articleList.length)} مقاله`
              : `${formatFaNumber(articleList.length)} مقاله`}
          </span>
        </div>

        {visibleArticles.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {visibleArticles.map((article) => (
              <ArticlePreview key={article._id} article={article} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3 rounded-[24px] border border-dashed border-[#E5E5E8] bg-[#FAFAFB] px-6 py-12 text-center">
            <DocumentTextIcon className="h-8 w-8 text-[#C9C9CF]" />
            <p className="text-[13px] font-medium text-[#9A9AA1]">
              مقاله‌ای برای نمایش پیدا نشد. جستجو یا فیلترها را تغییر دهید.
            </p>
          </div>
        )}
      </section>
    </div>
  );
};

export default GraphVisualization;
