"use client";

import { forwardRef } from "react";
import { getLocalizedCard, type TarotCardBase } from "@/data/tarotCards";
import type { Locale } from "@/lib/i18n";

interface ShareableResultViewProps {
  cards: TarotCardBase[];
  concern: string;
  interpretation: string;
  locale: Locale;
  appTitle: string;
  pastLabel: string;
  presentLabel: string;
  futureLabel: string;
  concernLabel: string;
  isPremium?: boolean;
  premiumBadge?: string;
}

/**
 * Shareable result view for SNS (1080×1350, Reddit/Instagram optimized)
 * Capture target for html2canvas
 */
const ShareableResultView = forwardRef<HTMLDivElement, ShareableResultViewProps>(
  (
    {
      cards,
      concern,
      interpretation,
      locale,
      appTitle,
      pastLabel,
      presentLabel,
      futureLabel,
      concernLabel,
      isPremium = false,
      premiumBadge = "",
    },
    ref
  ) => {
    const labels = [pastLabel, presentLabel, futureLabel];

    return (
      <div
        ref={ref}
        style={{
          width: 540,
          minHeight: 675,
          background: "linear-gradient(180deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)",
          borderRadius: 24,
          padding: 36,
          boxSizing: "border-box",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <h1
            style={{
              fontSize: 28,
              fontWeight: 700,
              color: "#fef3c7",
              margin: 0,
              textShadow: "0 0 20px rgba(251,191,36,0.3)",
            }}
          >
            ✨ {appTitle}
          </h1>
          <p style={{ fontSize: 13, color: "rgba(254,243,199,0.7)", marginTop: 6 }}>
            Past · Present · Future
          </p>
        </div>

        {/* Three cards */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: 16,
            marginBottom: 24,
          }}
        >
          {cards.map((card, i) => {
            const { name, meaning } = getLocalizedCard(card, locale);
            return (
              <div
                key={card.id}
                style={{
                  flex: 1,
                  background: "rgba(255,255,255,0.06)",
                  borderRadius: 16,
                  padding: 14,
                  border: "1px solid rgba(251,191,36,0.25)",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    fontSize: 10,
                    color: "#fbbf24",
                    marginBottom: 6,
                    fontWeight: 600,
                  }}
                >
                  {labels[i]}
                </div>
                {card.imagePath ? (
                  <img
                    src={card.imagePath}
                    alt={name}
                    style={{
                      width: "100%",
                      aspectRatio: "2/3",
                      objectFit: "cover",
                      borderRadius: 10,
                      marginBottom: 8,
                      border: "1px solid rgba(251,191,36,0.2)",
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: "100%",
                      aspectRatio: "2/3",
                      background: "linear-gradient(135deg, rgba(168,85,247,0.3), rgba(251,191,36,0.3))",
                      borderRadius: 10,
                      marginBottom: 8,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 24,
                    }}
                  >
                    🃏
                  </div>
                )}
                <div
                  style={{
                    fontSize: 12,
                    fontWeight: 600,
                    color: "#fef3c7",
                    marginBottom: 4,
                  }}
                >
                  {name}
                </div>
                <div
                  style={{
                    fontSize: 10,
                    color: "rgba(254,243,199,0.85)",
                    lineHeight: 1.4,
                    overflow: "hidden",
                    maxHeight: 28,
                  }}
                >
                  {meaning}
                </div>
              </div>
            );
          })}
        </div>

        {/* Concern */}
        {concern && (
          <div
            style={{
              background: "rgba(255,255,255,0.05)",
              borderRadius: 12,
              padding: 14,
              marginBottom: 20,
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <div style={{ fontSize: 10, color: "#fbbf24", marginBottom: 6 }}>
              {concernLabel}
            </div>
            <p style={{ fontSize: 13, color: "#fef3c7", margin: 0, lineHeight: 1.5 }}>
              {concern}
            </p>
          </div>
        )}

        {/* AI interpretation */}
        <div
          style={{
            background: isPremium
              ? "rgba(120,53,15,0.3)"
              : "rgba(255,255,255,0.05)",
            borderRadius: 16,
            padding: 20,
            border: isPremium
              ? "2px solid rgba(251,191,36,0.5)"
              : "1px solid rgba(255,255,255,0.1)",
          }}
        >
          {isPremium && premiumBadge && (
            <div
              style={{
                textAlign: "center",
                fontSize: 12,
                color: "#fbbf24",
                marginBottom: 12,
                fontWeight: 600,
              }}
            >
              {premiumBadge}
            </div>
          )}
          <p
            style={{
              fontSize: 14,
              color: "#fef3c7",
              lineHeight: 1.65,
              margin: 0,
              whiteSpace: "pre-wrap",
            }}
          >
            {interpretation}
          </p>
        </div>
      </div>
    );
  }
);

ShareableResultView.displayName = "ShareableResultView";

export default ShareableResultView;
