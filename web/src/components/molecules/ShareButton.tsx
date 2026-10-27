"use client";

import Image from "next/image";
import { useState } from "react";

interface ShareButtonProps {
  url?: string;
  title?: string;
  className?: string;
}

export const ShareButton = ({ url, title, className = "" }: ShareButtonProps) => {
  const [showMenu, setShowMenu] = useState(false);

  const handleShare = async () => {
    const shareUrl = url || window.location.href;
    const shareTitle = title || document.title;

    // Check if Web Share API is available
    if (navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          url: shareUrl,
        });
      } catch (error) {
        // User cancelled or share failed
        console.log("Share cancelled or failed:", error);
      }
    } else {
      // Fallback: show share menu
      setShowMenu(!showMenu);
    }
  };

  const copyToClipboard = async () => {
    const shareUrl = url || window.location.href;
    try {
      await navigator.clipboard.writeText(shareUrl);
      alert("لینک کپی شد!");
      setShowMenu(false);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={handleShare}
        className={`flex h-12 items-center gap-2 rounded-full bg-[#F8F8F9] px-5 transition-colors hover:bg-[#F0F0F2] ${className}`}
      >
        <Image src="/images/blog/share-icon.svg" alt="اشتراک گذاری" width={22} height={22} />
        <span className="text-[14px] font-semibold text-black lg:text-[15px]">اشتراک گذاری</span>
      </button>

      {showMenu && (
        <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-10 min-w-[200px]">
          <button
            onClick={copyToClipboard}
            className="w-full text-right px-4 py-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            کپی لینک
          </button>
          <button
            onClick={() => {
              window.open(
                `https://twitter.com/intent/tweet?url=${encodeURIComponent(url || window.location.href)}&text=${encodeURIComponent(title || "")}`,
                "_blank",
              );
              setShowMenu(false);
            }}
            className="w-full text-right px-4 py-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            اشتراک در توییتر
          </button>
          <button
            onClick={() => {
              window.open(
                `https://telegram.me/share/url?url=${encodeURIComponent(url || window.location.href)}&text=${encodeURIComponent(title || "")}`,
                "_blank",
              );
              setShowMenu(false);
            }}
            className="w-full text-right px-4 py-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            اشتراک در تلگرام
          </button>
        </div>
      )}
    </div>
  );
};
