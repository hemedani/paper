"use client";

import Image from "next/image";

interface DownloadButtonProps {
  blogTitle: string;
  blogContent: string;
  className?: string;
}

export const DownloadButton = ({ blogTitle, blogContent, className = "" }: DownloadButtonProps) => {
  const handleDownload = () => {
    // Create a simple text document with the blog content
    const content = `${blogTitle}\n\n${blogContent}`;
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${blogTitle}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex items-center">
      <button
        onClick={handleDownload}
        className={`flex h-12 items-center gap-2 rounded-full px-4 transition-colors hover:bg-[#F8F8F9] ${className}`}
        title="دانلود مقاله"
      >
        <Image src="/images/blog/download-icon.svg" alt="دانلود" width={22} height={22} />
        <span className="text-[14px] font-semibold text-black lg:text-[15px]">دانلود و چاپ</span>
      </button>
    </div>
  );
};
