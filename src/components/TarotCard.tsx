"use client";

import { useState, useEffect } from "react";
import type { Locale } from "@/lib/i18n";
import { getLocalizedCard, type TarotCardBase } from "@/data/tarotCards";
import { useHaptic } from "@/hooks/useHaptic";

interface TarotCardProps {
  card: TarotCardBase | null;
  locale: Locale;
  isFlipped: boolean;
  isSelected: boolean;
  onClick: () => void;
  disabled?: boolean;
}

export default function TarotCard({ card, locale, isFlipped, isSelected, onClick, disabled }: TarotCardProps) {
  const { name, meaning } = card ? getLocalizedCard(card, locale) : { name: "", meaning: "" };
  const [imgError, setImgError] = useState(false);
  const { select } = useHaptic();
  useEffect(() => {
    setImgError(false);
  }, [card?.id]);
  const showImage = card?.imagePath && !imgError;

  const handleClick = () => {
    if (!disabled) {
      select();
      onClick();
    }
  };

  return (
    <div
      className={`relative h-32 w-24 cursor-pointer perspective-1000 sm:h-36 sm:w-28 md:h-40 md:w-28 ${disabled ? "pointer-events-none opacity-60" : ""}`}
      onClick={handleClick}
    >
      {/* Card glow effect */}
      <div
        className={`pointer-events-none absolute -inset-2 rounded-2xl opacity-60 blur-xl transition-opacity duration-500 ${
          isSelected ? "opacity-80" : "opacity-40"
        }`}
        style={{
          background: "radial-gradient(circle, rgba(251,191,36,0.15) 0%, rgba(139,92,246,0.1) 50%, transparent 70%)",
          boxShadow: isSelected
            ? "0 0 40px rgba(251,191,36,0.25), 0 0 60px rgba(139,92,246,0.15)"
            : "0 0 25px rgba(251,191,36,0.1), 0 0 40px rgba(139,92,246,0.08)",
        }}
      />

      <div
        className={`relative h-full w-full transform-style-3d transition-transform duration-700 ${
          isFlipped ? "rotate-y-180" : ""
        }`}
        style={{
          transformStyle: "preserve-3d",
          transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* Card back */}
        <div
          className="absolute inset-0 backface-hidden rounded-xl border border-white/20 bg-white/5 shadow-xl backdrop-blur-md"
          style={{
            backfaceVisibility: "hidden",
            boxShadow: "0 0 20px rgba(251,191,36,0.15), inset 0 1px 0 rgba(255,255,255,0.1)",
          }}
        >
          <div className="flex h-full w-full flex-col items-center justify-center p-2">
            <div className="mb-2 h-16 w-16 rounded-full border border-amber-500/40 bg-amber-500/10 backdrop-blur-sm" />
            <div className="h-2 w-12 rounded bg-amber-500/30" />
            <div className="mt-1 text-[10px] font-medium text-amber-200/70">TAROT</div>
          </div>
        </div>

        {/* Card front - image or fallback */}
        <div
          className="absolute inset-0 rounded-xl border border-amber-500/20 overflow-hidden backdrop-blur-sm"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            background: "linear-gradient(135deg, rgba(255,251,235,0.95) 0%, rgba(254,243,199,0.9) 50%, rgba(245,245,244,0.95) 100%)",
            boxShadow: "0 0 25px rgba(251,191,36,0.2), inset 0 1px 0 rgba(255,255,255,0.8)",
          }}
        >
          <div className="flex h-full w-full flex-col items-center justify-between p-2">
            <div className="text-center">
              <div className="text-xs font-bold text-amber-900">{name}</div>
            </div>
            {showImage ? (
              <img
                src={card!.imagePath}
                alt={name}
                className="h-20 w-14 object-cover rounded-lg border border-amber-500/30 shadow-md"
                onError={() => setImgError(true)}
              />
            ) : (
              <div className="h-20 w-14 rounded-lg bg-gradient-to-br from-purple-400/30 to-amber-400/30 flex items-center justify-center">
                <span className="text-[8px] text-amber-900/60">🃏</span>
              </div>
            )}
            <div className="max-h-12 overflow-hidden text-[9px] leading-tight text-amber-900/80 line-clamp-3">
              {meaning}
            </div>
          </div>
        </div>
      </div>

      {/* Selection ring */}
      {isSelected && (
        <div
          className="pointer-events-none absolute -inset-1 rounded-2xl border border-amber-400/80 animate-pulse"
          style={{
            boxShadow: "0 0 20px rgba(251,191,36,0.5), 0 0 40px rgba(251,191,36,0.25)",
          }}
        />
      )}
    </div>
  );
}
