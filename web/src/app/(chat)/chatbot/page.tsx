"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { SiteHeader } from "@/components/organisms/SiteHeader";

type ChatMessage = {
  id: string;
  role: "user" | "bot";
  text: string;
};

const QUICK_ACTIONS = [
  { label: "سوالات متداول", href: "/faq", icon: "/images/chatbot/faq-icon.svg" },
  { label: "راهنمای ثبت‌نام", href: "/login", icon: "/images/chatbot/guide-icon.svg" },
  { label: "قوانین و مقررات", href: "/terms", icon: "/images/chatbot/rules-icon.svg" },
];

const CHAT_HISTORY = [
  { id: "1", title: "ساخت مقاله کارشناسی" },
  { id: "2", title: "برترین نویسندگان" },
  { id: "3", title: "همکاری های بین‌المللی" },
  { id: "4", title: "آموزش مقاله نویسی" },
  { id: "5", title: "مقالات طبق استانداردها" },
];

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: "m1",
    role: "user",
    text: "سلام، میتونی ساخت مقاله کارشناسی رو مرحله به مرحله بهم توضیح بدی و بگی از کجا باید شروع کنم و چیکار کنم؟!",
  },
  {
    id: "m2",
    role: "bot",
    text: "سلام ماهان جان، روزت بخیر\nآره حتما؛ فقط قبلش بهم بگو برای دانشگاه و پایان‌نامه می‌خوای یا برای یک چیز دیگه؟",
  },
  {
    id: "m3",
    role: "user",
    text: "آره برای پایان‌نامه دانشگاهم می‌خوام",
  },
  {
    id: "m4",
    role: "bot",
    text: "خب خیلیم عالی ماهان\nاول تمام مراحل رو با هم بررسی می‌کنیم و بعدش میریم برای شروع و قدم به قدم جلو می‌بریم:\n\n۱) انتخاب موضوع و تعیین محدوده\n۲) تعریف مسئله، هدف‌ها و فرضیات / سؤال تحقیق\n۳) انتخاب روش‌شناسی\n۴) نگارش فصل‌ها و ساختار نهایی",
  },
];

const SidebarPanel = ({
  activeId,
  onSelect,
  onNewChat,
  onClose,
}: {
  activeId: string;
  onSelect: (id: string) => void;
  onNewChat: () => void;
  onClose?: () => void;
}) => {
  const [query, setQuery] = useState("");
  const items = query.trim()
    ? CHAT_HISTORY.filter((item) => item.title.includes(query.trim()))
    : CHAT_HISTORY;

  return (
    <div className="flex h-full min-h-0 flex-col bg-white">
      <div className="shrink-0 px-4 pt-5">
        <button
          type="button"
          onClick={onNewChat}
          className="flex w-full items-center justify-between gap-2 rounded-[16px] bg-black px-5 py-[16px] text-white transition-colors hover:bg-[#1c1c1e]"
        >
          <span className="text-[15px] font-semibold leading-[1.76]">گفتگوی جدید</span>
          <Image
            src="/images/chatbot/new-chat-icon.svg"
            alt=""
            width={22}
            height={22}
            className="brightness-0 invert"
          />
        </button>

        <label className="mt-3 flex w-full items-center justify-between gap-2 rounded-[16px] border border-[#F0F0F2] bg-white px-4 py-[13px] transition-colors focus-within:border-[#08A6AE]">
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="جستجوی گفتگو"
            aria-label="جستجوی گفتگو"
            className="w-full bg-transparent text-[14px] font-medium leading-[1.76] text-black outline-none placeholder:text-[#9A9AA1]"
          />
          <Image src="/images/chatbot/search-icon.svg" alt="" width={20} height={20} />
        </label>
      </div>

      <div className="mt-8 flex min-h-0 flex-1 flex-col px-4">
        <h2 className="mb-3 shrink-0 text-[14px] font-medium leading-[1.76] text-[#9A9AA1]">
          تاریخچه گفتگو
        </h2>

        <div className="-mx-1 min-h-0 flex-1 space-y-1 overflow-y-auto px-1 pb-2">
          {items.length === 0 && (
            <p className="px-3 py-2 text-[13px] font-medium text-[#9A9AA1]">گفتگویی یافت نشد</p>
          )}

          {items.map((item) => {
            const active = item.id === activeId;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  onSelect(item.id);
                  onClose?.();
                }}
                aria-current={active ? "true" : undefined}
                className={[
                  "flex w-full items-center justify-between gap-2 rounded-[12px] px-3 py-[10px] text-right transition-colors",
                  active
                    ? "bg-[#EDFEFF] text-[#08A6AE]"
                    : "text-black hover:bg-[#F8F8F9]",
                ].join(" ")}
              >
                <span className="truncate text-[15px] font-medium leading-[1.76]">
                  {item.title}
                </span>
                <Image
                  src="/images/chatbot/folder-icon.svg"
                  alt=""
                  width={20}
                  height={20}
                  className={active ? "opacity-70" : "opacity-40"}
                />
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-auto shrink-0 border-t border-[#F0F0F2] px-4 py-4">
        <div className="flex items-center gap-3">
          <Image
            src="/images/chatbot/avatar-1.jpg"
            alt="ماهان هخامنش"
            width={48}
            height={48}
            className="h-12 w-12 shrink-0 rounded-full object-cover"
          />
          <div className="flex min-w-0 flex-col items-start">
            <span className="truncate text-[15px] font-bold leading-[1.76] text-black">
              ماهان هخامنش
            </span>
            <span className="truncate text-[11px] font-medium leading-[1.76] text-[#9A9AA1]">
              محدوده کاربری پایگاه دانش
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const ChatbotPage: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [draft, setDraft] = useState("");
  const [activeChat, setActiveChat] = useState("1");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Keep the newest message in view — the design opens on the latest turn.
  // The observer catches late layout shifts (web fonts, wrapped text) that a
  // one-shot scroll on mount would miss.
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const toBottom = () => {
      el.scrollTop = el.scrollHeight;
    };
    const nearBottom = () => el.scrollHeight - el.scrollTop - el.clientHeight < 160;

    toBottom();
    const timeout = window.setTimeout(toBottom, 250);

    // New content always re-pins; a viewport change only re-pins when the
    // reader was already at the latest turn.
    const contentObserver = new ResizeObserver(toBottom);
    if (el.firstElementChild) contentObserver.observe(el.firstElementChild);

    const boxObserver = new ResizeObserver(() => {
      if (nearBottom()) toBottom();
    });
    boxObserver.observe(el);

    return () => {
      window.clearTimeout(timeout);
      contentObserver.disconnect();
      boxObserver.disconnect();
    };
  }, [messages.length]);

  const handleSend = (event: React.FormEvent) => {
    event.preventDefault();
    const text = draft.trim();
    if (!text) return;

    setMessages((prev) => [...prev, { id: `m${prev.length + 1}-${Date.now()}`, role: "user", text }]);
    setDraft("");
  };

  const handleNewChat = () => {
    setMessages([]);
    setDraft("");
    setIsDrawerOpen(false);
    inputRef.current?.focus();
  };

  return (
    <div dir="rtl" className="flex h-full flex-col bg-[#F8F8F9] font-['Estedad-FD']">
      <SiteHeader
        bordered
        className="shrink-0"
        leading={
          <>
            <button
              type="button"
              onClick={() => setIsDrawerOpen(true)}
              aria-label="تاریخچه گفتگو"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[12px] border border-[#F0F0F2] text-black transition-colors hover:bg-[#F8F8F9] lg:hidden"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
                <rect x="3.5" y="4.5" width="17" height="15" rx="3" stroke="currentColor" strokeWidth="1.6" />
                <path d="M15 4.5v15" stroke="currentColor" strokeWidth="1.6" />
              </svg>
            </button>

            <button
              type="button"
              onClick={() => setIsSidebarOpen((open) => !open)}
              aria-label={isSidebarOpen ? "بستن تاریخچه گفتگو" : "باز کردن تاریخچه گفتگو"}
              aria-pressed={isSidebarOpen}
              className={[
                "hidden h-10 w-10 shrink-0 items-center justify-center rounded-[12px] border transition-colors lg:flex",
                isSidebarOpen
                  ? "border-[#F0F0F2] text-black hover:bg-[#F8F8F9]"
                  : "border-[#08A6AE] text-[#08A6AE] hover:bg-[#EDFEFF]",
              ].join(" ")}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
                <rect x="3.5" y="4.5" width="17" height="15" rx="3" stroke="currentColor" strokeWidth="1.6" />
                <path d="M15 4.5v15" stroke="currentColor" strokeWidth="1.6" />
              </svg>
            </button>
          </>
        }
      />

      {/* ── Body ──────────────────────────────────────────────────── */}
      <div className="flex min-h-0 flex-1">
        {isSidebarOpen && (
          <aside className="hidden w-[263px] shrink-0 border-l border-[#F0F0F2] lg:flex lg:flex-col">
            <SidebarPanel
              activeId={activeChat}
              onSelect={setActiveChat}
              onNewChat={handleNewChat}
            />
          </aside>
        )}

        <main className="flex min-h-0 min-w-0 flex-1 flex-col">
          {/* Messages */}
          <div
            ref={scrollRef}
            role="log"
            aria-live="polite"
            aria-label="گفتگو"
            className="min-h-0 flex-1 overflow-y-auto px-4 py-5 lg:px-8 lg:py-8"
          >
            <div
              className={[
                "mx-auto flex w-full max-w-[767px] flex-col gap-[18px]",
                messages.length === 0 ? "h-full justify-center" : "",
              ].join(" ")}
            >
              {messages.length === 0 && (
                <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
                  <Image
                    src="/images/chatbot/phone-icon.svg"
                    alt=""
                    width={56}
                    height={56}
                    className="h-14 w-14"
                  />
                  <h1 className="text-[22px] font-extrabold leading-[1.5] text-black lg:text-[30px]">
                    چطور می‌تونم کمکتون کنم؟
                  </h1>
                  <p className="max-w-[420px] text-[13px] font-medium leading-[1.9] text-[#9A9AA1] lg:text-[15px]">
                    سوال خود را درباره مقالات، نویسندگان یا نگارش مقاله بپرسید.
                  </p>
                </div>
              )}

              {messages.map((message) => {
                const isUser = message.role === "user";
                return (
                  <div
                    key={message.id}
                    className={`flex items-start gap-3 ${isUser ? "flex-row-reverse" : "flex-row"}`}
                  >
                    <Image
                      src={isUser ? "/images/chatbot/avatar-2.jpg" : "/images/chatbot/avatar-1.jpg"}
                      alt=""
                      width={36}
                      height={36}
                      className="mt-1 h-9 w-9 shrink-0 rounded-full object-cover"
                    />

                    <div
                      className={[
                        "max-w-[85%] whitespace-pre-line rounded-[20px] px-4 py-3 text-[14px] font-medium leading-[1.9] text-black lg:max-w-[600px] lg:px-6 lg:py-4 lg:text-[16px]",
                        isUser
                          ? "rounded-tl-none bg-[#EDFEFF]"
                          : "rounded-tr-none border border-[#F0F0F2] bg-white",
                      ].join(" ")}
                    >
                      {message.text}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Composer */}
          <div className="shrink-0 px-4 pb-4 lg:px-8 lg:pb-6">
            <div className="mx-auto w-full max-w-[767px]">
              <form
                onSubmit={handleSend}
                className="rounded-[20px] border border-[#F0F0F2] bg-white p-3 shadow-[0_18px_40px_-34px_rgba(0,0,0,0.35)] focus-within:border-[#08A6AE] lg:p-[16px]"
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={draft}
                  onChange={(event) => setDraft(event.target.value)}
                  placeholder="سوال یا پیشنهاد خود را در اینجا بنویسید..."
                  aria-label="متن پیام"
                  className="w-full bg-transparent text-right text-[14px] font-medium leading-[1.76] text-black outline-none placeholder:text-[#9A9AA1] lg:text-[16px]"
                />

                <div className="mt-2 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      aria-label="پیوست فایل"
                      className="flex h-9 w-9 items-center justify-center rounded-[10px] text-[#9A9AA1] transition-colors hover:bg-[#F8F8F9] hover:text-black"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
                        <path
                          d="M20 11.5l-7.4 7.4a4.6 4.6 0 01-6.5-6.5l7.4-7.4a3 3 0 014.3 4.3l-7.4 7.4a1.5 1.5 0 01-2.1-2.1l6.7-6.7"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                    <button
                      type="button"
                      aria-label="ورودی صوتی"
                      className="flex h-9 w-9 items-center justify-center rounded-[10px] text-[#9A9AA1] transition-colors hover:bg-[#F8F8F9] hover:text-black"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
                        <path
                          d="M12 4a2.5 2.5 0 012.5 2.5v5a2.5 2.5 0 01-5 0v-5A2.5 2.5 0 0112 4z"
                          stroke="currentColor"
                          strokeWidth="1.6"
                        />
                        <path
                          d="M6 11.5a6 6 0 0012 0M12 17.5V20"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                        />
                      </svg>
                    </button>
                  </div>

                  <button
                    type="submit"
                    disabled={!draft.trim()}
                    className="flex h-10 items-center gap-2 rounded-[12px] bg-[#08A6AE] px-4 text-[13px] font-semibold text-white transition-colors hover:bg-[#088f96] disabled:cursor-not-allowed disabled:opacity-40 lg:h-11 lg:px-5 lg:text-[14px]"
                  >
                    <span>ارسال</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                      <path
                        d="M20 12H4m0 0l6-6m-6 6l6 6"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              </form>

              <div className="mt-3 flex flex-wrap items-center justify-center gap-2 lg:mt-4 lg:gap-3">
                {QUICK_ACTIONS.map((action) => (
                  <Link
                    key={action.label}
                    href={action.href}
                    className="flex items-center gap-[6px] rounded-[14px] border border-[#F0F0F2] bg-white px-4 py-[9px] text-[12px] font-medium leading-[1.76] text-black transition-colors hover:border-[#08A6AE] lg:px-[22px] lg:py-[12px] lg:text-[15px]"
                  >
                    <span>{action.label}</span>
                    <Image src={action.icon} alt="" width={18} height={18} className="lg:h-5 lg:w-5" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* ── Mobile drawer ─────────────────────────────────────────── */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setIsDrawerOpen(false)}
            aria-hidden
          />
          <div className="absolute inset-y-0 right-0 flex w-[280px] max-w-[85vw] flex-col border-l border-[#F0F0F2] bg-white shadow-[0_0_60px_rgba(0,0,0,0.18)]">
            <div className="flex h-14 shrink-0 items-center justify-between border-b border-[#F0F0F2] px-4">
              <span className="text-[14px] font-bold leading-[1.76] text-black">گفتگوها</span>
              <button
                type="button"
                onClick={() => setIsDrawerOpen(false)}
                aria-label="بستن منو"
                className="flex h-9 w-9 items-center justify-center rounded-full text-[#9A9AA1] transition-colors hover:bg-[#F8F8F9] hover:text-black"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path
                    d="M6 6l12 12M18 6L6 18"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>

            <div className="min-h-0 flex-1">
              <SidebarPanel
                activeId={activeChat}
                onSelect={setActiveChat}
                onNewChat={handleNewChat}
                onClose={() => setIsDrawerOpen(false)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatbotPage;
