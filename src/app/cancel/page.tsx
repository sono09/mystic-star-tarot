"use client";

import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

export default function CancelPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen starry-bg bg-slate-950 flex flex-col items-center justify-center px-4">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-amber-500/5 blur-[100px]" />
        <div className="absolute -bottom-40 -right-40 h-[32rem] w-[32rem] rounded-full bg-purple-500/5 blur-[100px]" />
      </div>

      <div className="relative z-10 w-full max-w-md rounded-2xl glass-strong border-white/10 p-8 text-center shadow-2xl">
        <div className="mb-6 flex justify-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-amber-500/20 ring-4 ring-amber-500/30">
            <svg
              className="h-10 w-10 text-amber-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
        </div>

        <h1 className="mb-3 text-2xl font-bold text-amber-100">
          {t.cancelTitle}
        </h1>
        <p className="mb-8 text-amber-200/80">
          {t.cancelDescription}
        </p>

        <Link
          href="/"
          className="inline-block w-full rounded-xl glass border-amber-500/30 bg-amber-500/20 px-6 py-4 font-semibold text-amber-100 transition hover:bg-amber-500/30 hover:shadow-[0_0_25px_rgba(251,191,36,0.2)]"
        >
          {t.cancelCta}
        </Link>
      </div>
    </div>
  );
}
