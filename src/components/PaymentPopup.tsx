"use client";

import { useCallback } from "react";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { useLanguage } from "@/contexts/LanguageContext";
import { PAYPAL_CLIENT_ID } from "@/lib/config";

interface PaymentPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onPaymentComplete?: () => void;
}

function PayPalButtonWrapper({
  onApprove,
  onClose,
}: {
  onApprove: () => void;
  onClose: () => void;
}) {
  const { t } = useLanguage();
  const [{ isPending }] = usePayPalScriptReducer();

  const createOrder = useCallback(
    (data: any, actions: any) =>
      actions.order.create({
        intent: "CAPTURE",
        purchase_units: [
          {
            amount: {
              currency_code: "USD",
              value: "5.00",
            },
          },
        ],
      }),
    []
  );

  const handleApprove = useCallback(
    async (_data: unknown, _actions: unknown) => {
      onApprove();
      onClose();
    },
    [onApprove, onClose]
  );

  const handleError = useCallback((err: unknown) => {
    console.error("PayPal Error:", err);
  }, []);

  return (
    <div className="space-y-3">
      <div className="min-h-[45px] flex flex-col items-center justify-center rounded-xl border border-amber-500/20 bg-amber-500/5 p-4 [&>div]:w-full [&>div]:min-w-[200px]">
        {isPending ? (
          <div className="flex items-center gap-2 py-4 text-amber-400">
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-amber-400 border-t-transparent" />
            <span className="text-sm">Loading PayPal...</span>
          </div>
        ) : (
          <PayPalButtons
            style={{
              color: "gold",
              layout: "vertical",
              shape: "rect",
              label: "paypal",
            }}
            createOrder={createOrder}
            onApprove={handleApprove}
            onCancel={onClose}
            onError={handleError}
            disabled={isPending}
            forceReRender={[isPending]}
          />
        )}
      </div>
      <button
        onClick={onClose}
        className="w-full rounded-xl glass px-6 py-3 text-amber-200 transition hover:bg-white/5"
      >
        {t.maybeLater}
      </button>
    </div>
  );
}

export default function PaymentPopup({
  isOpen,
  onClose,
  onPaymentComplete,
}: PaymentPopupProps) {
  const { t } = useLanguage();

  const handleApprove = useCallback(() => {
    onPaymentComplete?.();
  }, [onPaymentComplete]);

  const clientId =
    PAYPAL_CLIENT_ID ||
    (typeof window !== "undefined"
      ? process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID ?? ""
      : "");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div
          className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
          onClick={onClose}
          aria-hidden
        />

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
                  d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12a2 2 0 002 2h10a2 2 0 002-2v-7"
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

          {clientId ? (
            <PayPalButtonWrapper onApprove={handleApprove} onClose={onClose} />
          ) : (
            <p className="text-center text-amber-400/80 text-sm">
              PayPal is not configured. Add NEXT_PUBLIC_PAYPAL_CLIENT_ID to .env
            </p>
          )}

          <p className="mt-4 text-center text-xs text-amber-400/60">
            {t.ctaText}
          </p>
        </div>
      </div>
  );
}
