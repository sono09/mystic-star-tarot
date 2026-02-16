"use client";

import { useRef, useCallback } from "react";
import html2canvas from "html2canvas";
import { getLocalizedCard, type TarotCardBase } from "@/data/tarotCards";
import { getCardData } from "@/lib/tarotInterpretation";
import { useLanguage } from "@/contexts/LanguageContext";
import PremiumReportView from "./PremiumReportView";
import ShareableResultView from "./ShareableResultView";

interface InterpretationModalProps {
  isOpen: boolean;
  onClose: () => void;
  cards: TarotCardBase[];
  concern: string;
  interpretation: string;
  isLoading?: boolean;
  isUnlocked: boolean;
  isPremium?: boolean;
  onRequestUnlock: () => void;
}

export default function InterpretationModal({
  isOpen,
  onClose,
  cards,
  concern,
  interpretation,
  isLoading = false,
  isUnlocked,
  isPremium = false,
  onRequestUnlock,
}: InterpretationModalProps) {
  const { t, locale } = useLanguage();
  const shareableRef = useRef<HTMLDivElement>(null);

  const handleDownload = useCallback(async () => {
    const el = shareableRef.current;
    if (!el) return;

    try {
      const canvas = await html2canvas(el, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#0f172a",
        logging: false,
      });
      const link = document.createElement("a");
      link.download = `tarot-reading-${Date.now()}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch {
      // Fallback: try without useCORS for same-origin images
      try {
        const canvas = await html2canvas(el, {
          scale: 2,
          backgroundColor: "#0f172a",
          logging: false,
        });
        const link = document.createElement("a");
        link.download = `tarot-reading-${Date.now()}.png`;
        link.href = canvas.toDataURL("image/png");
        link.click();
      } catch {
        /* ignore */
      }
    }
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
        onClick={onClose}
        aria-hidden
      />

      <div
        className={`relative z-10 max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl glass-strong p-8 shadow-2xl ${
          isPremium
            ? "border-2 border-amber-400/60 shadow-[0_0_40px_rgba(251,191,36,0.15),0_0_0_1px_rgba(251,191,36,0.2)]"
            : "border-white/10 shadow-black/30"
        }`}
      >
        <h3 className="mb-6 text-center text-xl font-bold text-amber-100">
          ✨ {t.modalTitle}
        </h3>

        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:justify-center sm:gap-6">
          {cards.map((card, i) => {
            const { name } = getLocalizedCard(card, locale);
            const cardData = getCardData(card);
            const keywords = cardData?.keywords?.join(" · ") ?? "";
            return (
              <div
                key={card.id}
                className="rounded-xl glass border-white/10 p-4 text-center"
              >
                <div className="mb-1 text-xs text-amber-400">
                  {i === 0 ? t.past : i === 1 ? t.present : t.future}
                </div>
                <div className="mb-2 font-semibold text-amber-100">{name}</div>
                {keywords && (
                  <div className="text-sm text-amber-200/90">{keywords}</div>
                )}
              </div>
            );
          })}
        </div>

        {concern && (
          <div className="mb-4 rounded-xl glass p-4">
            <div className="mb-1 text-xs text-amber-400">{t.yourConcern}</div>
            <p className="text-amber-100">{concern}</p>
          </div>
        )}

        {/* Loading */}
        {isLoading && (
          <div className="rounded-xl glass p-6">
            <div className="flex flex-col items-center justify-center gap-4 py-8">
              <div className="flex gap-2">
                <div className="h-3 w-3 animate-bounce rounded-full bg-amber-400 [animation-delay:-0.3s]" />
                <div className="h-3 w-3 animate-bounce rounded-full bg-amber-400 [animation-delay:-0.15s]" />
                <div className="h-3 w-3 animate-bounce rounded-full bg-amber-400" />
              </div>
              <p className="text-sm text-amber-300/80">{t.loadingText}</p>
            </div>
          </div>
        )}

        {/* Pre-payment: keywords only + unlock CTA */}
        {!isLoading && !isUnlocked && (
          <div className="rounded-xl glass p-6">
            <p className="mb-4 text-center text-amber-200/80">
              {t.keywordCta}
            </p>
            <button
              type="button"
              onClick={onRequestUnlock}
              className="w-full rounded-xl glass border-amber-500/30 bg-amber-500/20 px-6 py-4 font-semibold text-amber-100 transition hover:bg-amber-500/30 hover:shadow-[0_0_25px_rgba(251,191,36,0.2)]"
            >
              {t.unlockButton}
            </button>
          </div>
        )}

        {/* Post-payment: full AI interpretation */}
        {!isLoading && isUnlocked && interpretation && (
          <div
            className={`rounded-xl p-6 ${
              isPremium
                ? "border-2 border-amber-400/60 bg-amber-950/30 shadow-[0_0_40px_rgba(251,191,36,0.2)]"
                : "glass"
            }`}
          >
            <p className="mb-5 text-center text-base font-medium text-amber-200/95">
              {concern.trim()
                ? t.resultHeader.replace("{concern}", concern.trim())
                : t.resultHeaderNoConcern}
            </p>
            {isPremium && (
              <div className="mb-4 flex items-center justify-center gap-2 text-amber-400">
                <span className="text-sm font-medium">{t.premiumBadge}</span>
              </div>
            )}
            {isPremium ? (
              <PremiumReportView content={interpretation} />
            ) : (
              <p className="whitespace-pre-wrap leading-relaxed text-amber-100">
                {interpretation}
              </p>
            )}
          </div>
        )}

        {/* Download Result button */}
        {!isLoading && interpretation && cards.length === 3 && (
          <button
            type="button"
            onClick={handleDownload}
            className="mt-4 w-full rounded-xl border border-amber-500/40 bg-amber-500/15 px-6 py-3 font-semibold text-amber-100 transition hover:bg-amber-500/25 hover:shadow-[0_0_25px_rgba(251,191,36,0.15)]"
          >
            📥 {t.downloadResult}
          </button>
        )}

        {/* Shareable capture area (offscreen render for html2canvas) */}
        {cards.length === 3 && interpretation && (
          <div
            style={{
              position: "fixed",
              left: -9999,
              top: 0,
              zIndex: -1,
              pointerEvents: "none",
            }}
          >
            <ShareableResultView
              ref={shareableRef}
              cards={cards}
              concern={concern}
              interpretation={interpretation}
              locale={locale}
              appTitle={t.appTitle}
              pastLabel={t.past}
              presentLabel={t.present}
              futureLabel={t.future}
              concernLabel={t.yourConcern}
              resultHeaderText={
                concern.trim()
                  ? t.resultHeader.replace("{concern}", concern.trim())
                  : t.resultHeaderNoConcern
              }
              isPremium={isPremium}
              premiumBadge={t.premiumBadge}
            />
          </div>
        )}

        <button
          onClick={onClose}
          className="mt-6 w-full rounded-xl glass px-6 py-3 text-amber-200 transition hover:bg-white/5"
        >
          {t.close}
        </button>
      </div>
    </div>
  );
}
