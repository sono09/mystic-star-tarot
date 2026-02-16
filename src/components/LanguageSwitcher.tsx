"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { LOCALES } from "@/lib/i18n";

export default function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage();

  return (
    <div className="flex gap-2 rounded-xl glass px-3 py-2">
      {LOCALES.map(({ value, label }) => (
        <button
          key={value}
          type="button"
          onClick={() => setLocale(value)}
          className={`rounded-lg px-3 py-1.5 text-sm font-medium transition ${
            locale === value
              ? "bg-amber-500/30 text-amber-100"
              : "text-amber-200/70 hover:bg-white/5 hover:text-amber-100"
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
