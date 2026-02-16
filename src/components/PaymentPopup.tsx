"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { PAYMENT_LINK } from "@/lib/config";

interface PaymentPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onPaymentComplete?: () => void;
}

export default function PaymentPopup({ isOpen, onClose }: PaymentPopupProps) {
  const { t } = useLanguage();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
        onClick={onClose}
        aria-hidden
      />

      {/* Modal - Glassmorphism */}
      <div className="relative z-10 mx-4 w-full max-w-md rounded-2xl glass-strong border-white/10 p-8 shadow-2xl shadow-black/30">
        <div className="mb-6 flex justify-center">
          <div className="rounded-full glass border-amber-500/30 p-4">
            <svg
              className="h-12 w-12 text-amber-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
              />
            </svg>
          </div>
        </div>

        <p className="mb-2 text-center text-sm text-amber-400/90">
          {t.freeLimitReached}
        </p>
        <h3 className="mb-3 text-center text-xl font-bold text-amber-100">
          {t.paymentTitle}
        </h3>
        <p className="mb-6 text-center text-amber-200/80">
          {t.paymentDescription}
        </p>

        <div className="space-y-3">
          <a
            href={PAYMENT_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full rounded-xl glass border-amber-500/30 bg-amber-500/20 px-6 py-4 text-center font-semibold text-amber-100 transition hover:bg-amber-500/30 hover:shadow-[0_0_25px_rgba(251,191,36,0.2)]"
          >
            {t.paymentButton}
          </a>
          <button
            onClick={onClose}
            className="w-full rounded-xl glass px-6 py-3 text-amber-200 transition hover:bg-white/5"
          >
            {t.maybeLater}
          </button>
        </div>

        <p className="mt-4 text-center text-xs text-amber-400/60">
          {t.ctaText}
        </p>
      </div>
    </div>
  );
}
