"use client";

import { Suspense, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import { usePremium } from "@/hooks/usePremium";

function SuccessContent() {
  const { t } = useLanguage();
  const { setPremium } = usePremium();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id"); // Stripe
  const orderId = searchParams.get("order_id"); // Lemon Squeezy

  useEffect(() => {
    if (sessionId || orderId) {
      setPremium();
      // e.g. analytics.track("payment_success", { session_id: sessionId, order_id: orderId });
    }
  }, [sessionId, orderId, setPremium]);

  return (
    <div className="min-h-screen starry-bg bg-slate-950 flex flex-col items-center justify-center px-4">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-amber-500/5 blur-[100px]" />
        <div className="absolute -bottom-40 -right-40 h-[32rem] w-[32rem] rounded-full bg-purple-500/5 blur-[100px]" />
      </div>

      <div className="relative z-10 w-full max-w-md rounded-2xl glass-strong border-white/10 p-8 text-center shadow-2xl">
        {/* Success icon */}
        <div className="mb-6 flex justify-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/20 ring-4 ring-emerald-500/30">
            <svg
              className="h-10 w-10 text-emerald-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>

        <h1 className="mb-3 text-2xl font-bold text-amber-100">
          {t.successTitle}
        </h1>
        <p className="mb-8 text-amber-200/80">
          {t.successDescription}
        </p>

        <Link
          href="/"
          className="inline-block w-full rounded-xl glass border-amber-500/30 bg-amber-500/20 px-6 py-4 font-semibold text-amber-100 transition hover:bg-amber-500/30 hover:shadow-[0_0_25px_rgba(251,191,36,0.2)]"
        >
          {t.successCta}
        </Link>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen starry-bg bg-slate-950 flex items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-amber-400 border-t-transparent" />
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
