"use client";

import { useEffect, useRef, useState } from "react";
import type { ComponentType } from "react";
import { HashtagIcon, KeyIcon, NewspaperIcon } from "../atoms/Icons";
import { formatFaNumber } from "@/utils/digits";

export type LandingStatsValues = {
  keywords?: number;
  tags?: number;
  articles?: number;
};

const easeOutCubic = (progress: number) => 1 - Math.pow(1 - progress, 3);

const CountUp = ({
  value,
  active,
  duration = 1600,
}: {
  value?: number;
  active: boolean;
  duration?: number;
}) => {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!active || value === undefined) return;

    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) {
      setDisplay(value);
      return;
    }

    let frame = 0;
    let startTime = 0;

    const tick = (now: number) => {
      if (!startTime) startTime = now;
      const progress = Math.min((now - startTime) / duration, 1);
      setDisplay(Math.round(value * easeOutCubic(progress)));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(frame);
  }, [active, value, duration]);

  if (value === undefined) {
    return <span className="text-white/60">—</span>;
  }

  return (
    <span className="relative inline-flex items-center justify-start tabular-nums">
      <span className="invisible">+{formatFaNumber(value)}</span>
      <span className="absolute inset-0 flex items-center justify-start">
        +{formatFaNumber(display)}
      </span>
    </span>
  );
};

export const LandingStats = ({ stats }: { stats?: LandingStatsValues }) => {
  const frameRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const node = frameRef.current;
    if (!node) return;

    if (typeof IntersectionObserver === "undefined") {
      setActive(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const items: {
    key: string;
    label: string;
    value?: number;
    Icon: ComponentType<{ className?: string }>;
  }[] = [
    {
      key: "keywords",
      label: "کلمات کلیدی",
      value: stats?.keywords,
      Icon: KeyIcon,
    },
    {
      key: "tags",
      label: "برچسب‌ها",
      value: stats?.tags,
      Icon: HashtagIcon,
    },
    {
      key: "articles",
      label: "مقالات منتشر شده",
      value: stats?.articles,
      Icon: NewspaperIcon,
    },
  ];

  if (items.every((item) => item.value === undefined)) return null;

  return (
    <div
      ref={frameRef}
      role="group"
      aria-label="آمار پایگاه دانش"
      className="flex w-full flex-col divide-y divide-white/20 overflow-hidden rounded-[22px] border border-white/30 bg-white/10 sm:w-auto sm:flex-row sm:divide-x sm:divide-y-0 sm:rounded-full"
    >
      {items.map((item) => (
        <div
          key={item.key}
          role="group"
          aria-label={`${item.label}: ${
            item.value === undefined ? "—" : `+${formatFaNumber(item.value)}`
          }`}
          className="flex items-center justify-center gap-2 px-5 py-3.5 sm:px-6"
        >
          <item.Icon className="h-4 w-4 shrink-0 text-white/70" />
          <span className="whitespace-nowrap text-[13px] font-semibold text-white/75 sm:text-[14px]">
            {item.label}
          </span>
          <span
            aria-hidden="true"
            className="text-[20px] font-extrabold leading-none tracking-[-0.02em] text-white sm:text-[24px]"
          >
            <CountUp value={item.value} active={active} />
          </span>
        </div>
      ))}
    </div>
  );
};
