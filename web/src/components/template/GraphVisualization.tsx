"use client";

import { useEffect, useRef, useState } from "react";
import { Network } from "vis-network/standalone";
import { DataSet } from "vis-data";
import Link from "next/link";
import Image from "next/image";
import { EdgeData, NodeData } from "@/app/(common)/graph/page";
import { articleSchema } from "@/types/declarations/selectInp";
import { DefaultSearchArrayValues } from "@/utils/prepareArtticleSearch";
import AdvancedSearchModal from "@/components/molecules/AdvancedSearchModal";

interface GraphPageProps {
  articles: articleSchema[];
  nodes: NodeData[];
  edges: EdgeData[];
  defaultSearchArrayValues: DefaultSearchArrayValues;
}

const GraphVisualization = ({ articles, nodes, edges, defaultSearchArrayValues }: GraphPageProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const networkRef = useRef<Network | null>(null);
  const [selectedNode, setSelectedNode] = useState<{
    id: string;
    label: string;
    count: number;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [stabilizationProgress, setStabilizationProgress] = useState(0);
  const [relatedArticles, setRelatedArticles] = useState<articleSchema[]>([]);
  const [showHelp, setShowHelp] = useState(false);
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;
    setLoading(true);

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
          color: { background: "#08A6AE", border: "#08A6AE" },
        },
        keyword: {
          color: { background: "#D2A634", border: "#D2A634" },
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
            setSelectedNode({
              id: nodeId,
              label: node.label,
              count: node.value,
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

  const getNodeTruncatedLabel = (label: string, maxLength = 80): string => {
    return label.length > maxLength ? label.substring(0, maxLength - 3) + "..." : label;
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
    <div className="bg-white" dir="rtl">
      {/* Hero Section */}
      <div className="max-w-[1392px] mx-auto px-4 sm:px-6 lg:px-8 pt-9 pb-9">
        <div className="text-center space-y-[17px]">
          <h1 className="text-[42px] font-extrabold leading-[1.31] text-black font-['Estedad']">
            مقالات مرتبط را در یک نمودار بصری کاوش کنید
          </h1>
          <p className="text-lg font-semibold leading-[1.76] text-[#9A9AA1] font-['Estedad-FD']">
            بانک جامع مقالات معماری و شهرسازی بر اساس جستجوی پیشرفته ای
          </p>
        </div>

        {/* Search Bar */}
        <div className="mt-11 flex justify-center items-center gap-[18px]">
          <button
            type="button"
            onClick={() => setShowAdvancedSearch(true)}
            aria-haspopup="dialog"
            className="flex h-[68px] items-center justify-center gap-2.5 rounded-[18px] bg-[#D2A634] px-9 text-base font-semibold leading-[1.76] text-white transition-colors hover:bg-[#B89020] font-['Estedad-FD']"
          >
            <Image
              src="/images/graph/advanced-search-icon.svg"
              alt=""
              width={24}
              height={24}
              className="w-6 h-6"
            />
            <span>جستجوی پیشرفته</span>
          </button>

          <div className="flex items-center gap-2 px-6 py-5 bg-white border border-[#F0F0F2] rounded-[18px] flex-1 max-w-[500px]">
            <Image
              src="/images/graph/search-icon.svg"
              alt=""
              width={24}
              height={24}
              className="w-6 h-6"
            />
            <input
              type="text"
              placeholder="جستجو بر اساس متن  ، عنوان و خلاصه مقالات"
              className="flex-1 outline-none text-base font-medium leading-[1.76] text-[#9A9AA1] placeholder:text-[#9A9AA1] font-['Estedad-FD']"
            />
          </div>
        </div>
      </div>

      {/* Graph Section with Gradient Background */}
      <div
        className="relative"
        style={{
          background:
            "linear-gradient(180deg, rgba(248, 248, 249, 0) 0%, rgba(248, 248, 249, 1) 50%, rgba(248, 248, 249, 0) 100%)",
        }}
      >
        <div className="max-w-[1392px] mx-auto px-4 sm:px-6 lg:px-8 py-0">
          <div className="bg-white border border-[#F0F0F2] rounded-[32px] p-0 overflow-hidden">
            {/* Graph Header */}
            <div className="flex items-start justify-between p-[42px_42px_0_443px]">
              <div className="flex-1 text-right space-y-2.5">
                <h2 className="text-[32px] font-extrabold leading-[1.76] text-black font-['Estedad']">
                  نمای کلی گراف
                </h2>
                <p className="text-lg font-medium leading-[1.56] text-[#9A9AA1] font-['Estedad-FD']">
                  این نمودار، روابط بین برچسب‌ها و کلیدواژه‌های مقالات را به صورت بصری نمایش می‌دهد.
                </p>
              </div>
              <button
                onClick={() => setShowHelp(!showHelp)}
                className="w-[82px] h-[82px] flex items-center justify-center bg-white border border-[#F0F0F2] rounded-full text-[36px] font-light text-black hover:bg-[#F8F8F9] transition-colors font-['Estedad-VF']"
                aria-label="راهنما"
              >
                ?
              </button>
            </div>

            {/* Graph Container */}
            <div className="relative px-[42px] pt-[42px] pb-0">
              <div className="relative w-full h-[571px] bg-white">
                {loading && (
                  <div className="absolute inset-0 bg-white bg-opacity-90 flex flex-col items-center justify-center z-10">
                    <div className="w-16 h-16 border-4 border-[#08A6AE] border-t-transparent rounded-full animate-spin"></div>
                    <p className="mt-4 text-[#08A6AE] font-semibold text-lg">
                      در حال بارگذاری گراف...
                    </p>
                    {stabilizationProgress > 0 && (
                      <div className="mt-4 w-64">
                        <div className="h-2 bg-[#F8F8F9] rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[#08A6AE] transition-all duration-300"
                            style={{ width: `${stabilizationProgress}%` }}
                          ></div>
                        </div>
                        <p className="text-sm text-[#08A6AE] mt-2 text-center font-['Estedad-FD']">
                          {stabilizationProgress}% تکمیل شد
                        </p>
                      </div>
                    )}
                  </div>
                )}
                <div ref={containerRef} className="w-full h-full" />
              </div>

              {/* Help Modal Overlay */}
              {showHelp && (
                <div className="absolute top-[136px] right-[67px] w-[364px] z-20">
                  <div className="relative">
                    {/* Blur background */}
                    <div
                      className="absolute inset-0 bg-[#D9D9D9] opacity-50 blur-[43px] rounded-[22px]"
                      style={{
                        transform: "translate(25px, 113px)",
                        width: "314px",
                        height: "143px",
                      }}
                    ></div>

                    {/* Content card */}
                    <div className="relative bg-white border border-[#F0F0F2] rounded-[22px] p-6 shadow-lg">
                      <button
                        onClick={() => setShowHelp(false)}
                        className="absolute top-4 left-4 text-[#9A9AA1] hover:text-black text-xl"
                        aria-label="بستن"
                      >
                        ✕
                      </button>
                      <div className="space-y-4 text-right">
                        <h3 className="text-lg font-semibold text-black leading-[1.56] font-['Estedad-VF']">
                          گراف برچسب‌ها و کلمات کلیدی مقالات
                        </h3>
                        <p className="text-sm font-normal leading-[1.71] text-[#9A9AA1] font-['Estedad-VF']">
                          این نمودار، روابط بین برچسب‌ها و کلیدواژه‌های مقالات را به صورت بصری نمایش
                          می‌دهد.
                          <br />
                          <br />
                          اندازه دایره‌ها نشان‌دهندۀ تعداد دفعات استفاده، و ضخامت خطوط نشان‌دهندۀ قدرت
                          ارتباط بین کلیدواژه‌ها است.
                        </p>
                        <div className="flex items-center gap-6 pt-2">
                          <div className="flex items-center gap-[7px] h-4">
                            <span className="text-sm font-normal leading-[2] text-[#08A6AE] font-['Estedad-VF']">
                              کلیدواژه‌ها
                            </span>
                            <div className="w-2 h-2 rounded-full bg-[#08A6AE]"></div>
                          </div>
                          <div className="flex items-center gap-[7px] h-4">
                            <span className="text-sm font-normal leading-[2] text-[#D2A634] font-['Estedad-VF']">
                              برچسب‌ها
                            </span>
                            <div className="w-2 h-2 rounded-full bg-[#D2A634]"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Selected Node Info - Positioned on left side */}
              {selectedNode && (
                <div className="absolute top-[42px] left-[42px] w-[400px] space-y-[26px]">
                  <div className="space-y-3.5">
                    <div className="flex items-center gap-[182px]">
                      <h3 className="text-lg font-bold leading-[1.56] text-black font-['Estedad']">
                        {selectedNode.label}
                      </h3>
                      <span className="inline-flex items-center justify-center px-[26px] py-4 h-10 bg-[#EDFEFF] rounded-[14px] text-base font-medium leading-[1.5] text-[#08A6AE] font-['Estedad']">
                        {selectedNode.count} مقاله
                      </span>
                    </div>

                    <div className="space-y-3.5">
                      <div className="space-y-2">
                        <p className="text-base font-semibold leading-[1.75] text-[#9A9AA1] font-['Estedad']">
                          درباره مقاله:
                        </p>
                        {relatedArticles.slice(0, 1).map((article) => (
                          <p
                            key={article._id}
                            className="text-base font-medium leading-[1.75] text-black font-['Estedad']"
                          >
                            {getNodeTruncatedLabel(article.title, 120)}
                          </p>
                        ))}
                      </div>
                      {relatedArticles.slice(0, 1).map((article) => (
                        <p
                          key={`author-${article._id}`}
                          className="text-base font-medium leading-[1.75] text-[#9A9AA1] font-['Estedad']"
                        >
                          {article.authors
                            ?.map((author) => `${author.first_name} ${author.last_name}`)
                            .join("، ")}
                        </p>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2.5">
                    <div className="flex flex-wrap items-center gap-1.5">
                      {relatedArticles.slice(0, 1).map((article) =>
                        article.tags?.slice(0, 3).map((tag) => (
                          <span
                            key={tag._id}
                            className="inline-flex items-center justify-center px-[26px] py-4 h-12 bg-[#F8F8F9] border border-[#F0F0F2] rounded-full text-sm font-medium leading-[1.71] text-black font-['Estedad']"
                          >
                            {tag.name}
                          </span>
                        )),
                      )}
                    </div>
                    <div className="flex flex-wrap items-center justify-end gap-1.5">
                      {relatedArticles.slice(0, 1).map((article) =>
                        article.keywords?.slice(0, 3).map((keyword) => (
                          <span
                            key={keyword._id}
                            className="inline-flex items-center justify-center px-[26px] py-4 h-12 bg-[#F8F8F9] border border-[#F0F0F2] rounded-full text-sm font-medium leading-[1.71] text-black font-['Estedad']"
                          >
                            {keyword.name}
                          </span>
                        )),
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Action Buttons */}
            <div className="flex items-center justify-between px-[42px] py-[42px_42px_72px]">
              <button className="flex items-center justify-center gap-2.5 px-[87px] py-5 h-[72px] bg-black text-white rounded-[18px] font-semibold text-base leading-[1.76] hover:bg-gray-800 transition-colors font-['Estedad-FD']">
                <Image
                  src="/images/graph/chatbot-icon.svg"
                  alt=""
                  width={24}
                  height={24}
                  className="w-6 h-6 brightness-0 invert"
                />
                <span>استفاده از چت‌بات</span>
              </button>

              <button
                onClick={resetView}
                className="flex items-center justify-center gap-2.5 px-[87px] py-5 h-[72px] bg-white border border-[#F0F0F2] rounded-[18px] text-black font-semibold text-base leading-[1.76] hover:bg-[#F8F8F9] transition-colors font-['Estedad-FD']"
              >
                <Image
                  src="/images/graph/reset-icon.svg"
                  alt=""
                  width={24}
                  height={24}
                  className="w-6 h-6"
                />
                <span>بازنشانی نمای گراف</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Related Articles Section */}
      <div className="max-w-[1392px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-[32px] font-extrabold leading-[1.76] text-black mb-8 text-right font-['Estedad-FD']">
          دیگر مقالات مرتبط
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-14">
          {(relatedArticles.length > 0 ? relatedArticles : articles).slice(0, 6).map((article) => (
            <Link key={article._id} href={`/article/${article._id}`} className="group">
              <div className="bg-white border border-[#F0F0F2] rounded-[20px] p-8 hover:border-[#9FDDE0] transition-all">
                <div className="space-y-4 mb-6">
                  <div className="mb-6 flex items-center justify-between gap-4">
                    <h3 className="line-clamp-1 text-lg font-bold leading-[1.56] text-black font-['Estedad']">
                      {getNodeTruncatedLabel(article.title, 60)}
                    </h3>
                    <span className="inline-flex items-center justify-center px-[26px] py-4 h-10 bg-[#EDFEFF] rounded-[14px] text-base font-medium leading-[1.5] text-[#08A6AE] font-['Estedad']">
                      {article.tags?.length ?? 0} برچسب
                    </span>
                  </div>

                  <div className="space-y-5 border-r border-[#F0F0F2] pr-6">
                    <div className="space-y-2">
                      <p className="line-clamp-2 text-base font-medium leading-[1.75] text-[#9A9AA1] text-right font-['Estedad']">
                        {getNodeTruncatedLabel(article.abstract || "", 140)}
                      </p>
                      <p className="text-sm font-medium leading-[1.75] text-[#9A9AA1] text-right font-['Estedad']">
                        {article.authors
                          ?.map((author) => `${author.first_name} ${author.last_name}`)
                          .join("، ")}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-1.5">
                      {article.tags?.slice(0, 3).map((tag) => (
                        <span
                          key={tag._id}
                          className="inline-flex items-center justify-center px-[26px] py-4 h-12 bg-[#F8F8F9] border border-[#F0F0F2] rounded-full text-sm font-medium leading-[1.71] text-black font-['Estedad']"
                        >
                          {tag.name}
                        </span>
                      ))}
                      {article.keywords?.slice(0, 2).map((keyword) => (
                        <span
                          key={keyword._id}
                          className="inline-flex items-center justify-center px-[26px] py-4 h-12 bg-[#F8F8F9] border border-[#F0F0F2] rounded-full text-sm font-medium leading-[1.71] text-black font-['Estedad']"
                        >
                          {keyword.name}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Pagination */}
        {(relatedArticles.length > 0 ? relatedArticles : articles).length > 6 && (
        <div className="flex items-center justify-center gap-8 h-14">
          <button className="flex items-center justify-center gap-2 px-9 py-6 h-14 bg-[#F8F8F9] rounded-full hover:bg-gray-200 transition-colors">
            <Image
              src="/images/graph/arrow-next.svg"
              alt=""
              width={4}
              height={7}
              className="w-1 h-[7px]"
            />
            <span className="text-base font-semibold leading-[1.76] text-black font-['Estedad-FD']">
              بعدی
            </span>
          </button>

          <div className="flex items-center gap-2 h-14">
            <button className="flex items-center justify-center px-9 py-6 w-14 h-14 border border-[#F0F0F2] rounded-full text-base font-semibold leading-[1.76] text-black hover:bg-[#F8F8F9] transition-colors font-['Estedad-FD']">
              163
            </button>
            <div className="flex items-center justify-center px-9 py-6 w-[67px] h-14 bg-[#F5F5F5] rounded-full">
              <span className="text-base font-medium leading-[1.76] text-[#9A9AA1] font-['Estedad-FD']">
                ...
              </span>
            </div>
            <button className="flex items-center justify-center px-9 py-6 w-14 h-14 border border-[#F0F0F2] rounded-full text-base font-semibold leading-[1.76] text-black hover:bg-[#F8F8F9] transition-colors font-['Estedad-FD']">
              2
            </button>
            <button className="flex items-center justify-center px-9 py-6 w-14 h-14 bg-[#D2A634] rounded-full text-base font-semibold leading-[1.76] text-white font-['Estedad-FD']">
              1
            </button>
          </div>

          <button className="flex items-center justify-center gap-2 px-9 py-6 h-14 border border-[#F0F0F2] rounded-full hover:bg-[#F8F8F9] transition-colors">
            <span className="text-base font-semibold leading-[1.76] text-[#9A9AA1] font-['Estedad-FD']">
              قبلی
            </span>
            <Image
              src="/images/graph/arrow-prev.svg"
              alt=""
              width={4}
              height={7}
              className="w-1 h-[7px]"
            />
          </button>
        </div>
        )}
      </div>

      <AdvancedSearchModal
        isOpen={showAdvancedSearch}
        onClose={() => setShowAdvancedSearch(false)}
        defaultSearchArrayValues={defaultSearchArrayValues}
        pageAddress="graph"
      />
    </div>
  );
};

export default GraphVisualization;
