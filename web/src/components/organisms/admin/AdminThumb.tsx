"use client";

import Image from "next/image";
import { useState } from "react";

const FALLBACK = "/images/default-article.jpg";

/**
 * Small square thumbnail used in admin list cards.
 *
 * Uploaded files are served by the Lesan backend, so a post whose file has been
 * removed would otherwise render a broken-image glyph. `unoptimized` keeps the
 * src untouched, which lets the error handler swap in a local placeholder.
 */
export const AdminThumb = ({
  src,
  alt,
  size = 84,
  className = "",
}: {
  src?: string;
  alt: string;
  size?: number;
  className?: string;
}) => {
  const [current, setCurrent] = useState(src || FALLBACK);

  return (
    <div
      className={`relative shrink-0 overflow-hidden rounded-[14px] bg-[#F8F8F9] ${className}`}
      style={{ width: size, height: size }}
    >
      <Image
        src={current}
        alt={alt}
        fill
        unoptimized
        sizes={`${size}px`}
        className="object-cover"
        onError={() => setCurrent(FALLBACK)}
      />
    </div>
  );
};

export default AdminThumb;
