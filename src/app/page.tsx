"use client";

import { useState, useEffect } from "react";
import { TAROT_CARDS, type TarotCardBase } from "@/data/tarotCards";
import CardGrid from "@/components/CardGrid";
import InterpretationModal from "@/components/InterpretationModal";
import PaymentPopup from "@/components/PaymentPopup";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import ShareButton from "@/components/ShareButton";
import { useDailyLimit } from "@/hooks/useDailyLimit";
import { useLanguage } from "@/contexts/LanguageContext";
import { TRUSTED_SEEKERS_COUNT } from "@/lib/config";

function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

const SLOT_COUNT = 78;

export default function Home() {
  const { t, locale } = useLanguage();
  const [deck, setDeck] = useState<TarotCardBase[]>([]);
  const [slotCards, setSlotCards] = useState<(TarotCardBase | null)[]>(Array(SLOT_COUNT).fill(null));
  const [selectedCards, setSelectedCards] = useState<TarotCardBase[]>([]);
  const [nextDrawIndex, setNextDrawIndex] = useState(0);
  const [concern, setConcern] = useState("");
  const [interpretation, setInterpretation] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPaymentPopupOpen, setIsPaymentPopupOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [interpretationUnlocked, setInterpretationUnlocked] = useState(false);
  const [isPremiumInterpretation, setIsPremiumInterpretation] = useState(false);
  const { canUseFree, useFreeReading } = useDailyLimit();

  useEffect(() => {
    setDeck(shuffleArray(TAROT_CARDS));
  }, []);

  const handleSlotClick = (slotIndex: number) => {
    if (selectedCards.length >= 3) return;
    if (slotCards[slotIndex] !== null) return;

    const drawnCard = deck[nextDrawIndex];
    if (!drawnCard) return;

    setSlotCards((prev) => {
      const next = [...prev];
      next[slotIndex] = drawnCard;
      return next;
    });
    setSelectedCards((prev) => [...prev, drawnCard]);
    setNextDrawIndex((prev) => prev + 1);
  };

  const handleGetInterpretation = async () => {
    if (!canUseFree) {
      setIsPaymentPopupOpen(true);
      return;
    }

    if (selectedCards.length !== 3) return;

    setIsModalOpen(true);
    setInterpretation("");
    setInterpretationUnlocked(false);
    setIsPremiumInterpretation(false);
    setIsLoading(true);

    try {
      const res = await fetch("/api/interpret", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cards: selectedCards.map((c) => ({
            name: locale === "ko" ? c.nameKo : c.nameEn,
            nameEn: c.nameEn,
            meaning: locale === "ko" ? c.meaningKo : c.meaningEn,
          })),
          concern: concern.trim() || undefined,
          locale,
          premium: false,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Request failed");
      useFreeReading();
      setInterpretation(data.interpretation);
    } catch {
      setInterpretation(t.errorDefault);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setSelectedCards([]);
    setSlotCards(Array(SLOT_COUNT).fill(null));
    setNextDrawIndex(0);
    setConcern("");
    setInterpretation("");
    setInterpretationUnlocked(false);
    setIsModalOpen(false);
    setDeck(shuffleArray(TAROT_CARDS));
  };

  const handleRequestUnlock = () => {
    setIsPaymentPopupOpen(true);
  };

  return (
    <div className="min-h-screen starry-bg bg-slate-950">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-amber-500/5 blur-[100px]" />
        <div className="absolute -bottom-40 -right-40 h-[32rem] w-[32rem] rounded-full bg-purple-500/5 blur-[100px]" />
        <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/5 blur-[80px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-4 py-8">
        <div className="absolute right-4 top-4 flex items-center gap-2">
          <ShareButton />
          <LanguageSwitcher />
        </div>

        <header className="mb-8 rounded-2xl glass px-6 py-8 text-center">
          <h1 className="mb-2 font-serif text-4xl font-bold text-amber-100 drop-shadow-lg">
            {t.appTitle}
          </h1>
          <p className="mb-4 text-amber-200/80">{t.appSubtitle}</p>
          <p className="text-sm text-amber-400/70">
            {t.socialProof.replace("{count}", TRUSTED_SEEKERS_COUNT.toLocaleString())}
          </p>
        </header>

        <div className="mb-6 rounded-2xl glass px-6 py-4 text-center text-amber-200/90">
          {selectedCards.length < 3 ? (
            <p>
              {t.guideSelect3Before}
              <strong className="text-amber-300">{t.guideSelect3Number}</strong>
              {t.guideSelect3After}
            </p>
          ) : (
            <p>{t.guideSelected}</p>
          )}
        </div>

        <div className="mb-8 flex justify-center">
          <CardGrid
            slots={slotCards}
            onSlotClick={handleSlotClick}
            locale={locale}
            disabled={selectedCards.length >= 3}
          />
        </div>

        {selectedCards.length === 3 && (
          <div className="mx-auto max-w-2xl space-y-4">
            <textarea
              placeholder={t.concernPlaceholder}
              value={concern}
              onChange={(e) => setConcern(e.target.value)}
              className="w-full rounded-2xl glass px-4 py-3 text-amber-100 placeholder-amber-400/50 focus:border-amber-500/50 focus:outline-none focus:ring-2 focus:ring-amber-500/30"
              rows={3}
            />
            <div className="flex gap-4">
              <button
                onClick={handleGetInterpretation}
                className="flex-1 rounded-2xl glass border-amber-500/30 bg-amber-500/20 px-6 py-4 font-semibold text-amber-100 transition hover:bg-amber-500/30 hover:shadow-[0_0_30px_rgba(251,191,36,0.2)]"
              >
                {t.getInterpretation}
              </button>
              <button
                onClick={handleReset}
                className="rounded-2xl glass px-6 py-4 text-amber-200 transition hover:bg-white/5"
              >
                {t.drawAgain}
              </button>
            </div>
          </div>
        )}
      </div>

      <InterpretationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        cards={selectedCards}
        concern={concern}
        interpretation={interpretation}
        isLoading={isLoading}
        isUnlocked={interpretationUnlocked}
        isPremium={isPremiumInterpretation}
        onRequestUnlock={handleRequestUnlock}
      />

      <PaymentPopup
        isOpen={isPaymentPopupOpen}
        onClose={() => setIsPaymentPopupOpen(false)}
      />
    </div>
  );
}
