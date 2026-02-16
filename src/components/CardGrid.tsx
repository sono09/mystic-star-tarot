"use client";

import type { Locale } from "@/lib/i18n";
import type { TarotCardBase } from "@/data/tarotCards";
import TarotCard from "./TarotCard";

interface CardGridProps {
  slots: (TarotCardBase | null)[];
  onSlotClick: (slotIndex: number) => void;
  locale: Locale;
  disabled?: boolean;
}

export default function CardGrid({
  slots,
  onSlotClick,
  locale,
  disabled = false,
}: CardGridProps) {
  return (
    <div className="grid grid-cols-6 gap-2 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-[repeat(13,minmax(0,1fr))]">
      {slots.map((card, index) => (
        <TarotCard
          key={index}
          card={card}
          locale={locale}
          isFlipped={!!card}
          isSelected={!!card}
          onClick={() => onSlotClick(index)}
          disabled={disabled}
        />
      ))}
    </div>
  );
}
