"use client";

import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function ShareButton() {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <button
      type="button"
      onClick={copyToClipboard}
      title={copied ? t.linkCopied : undefined}
      className="rounded-xl glass px-3 py-2 text-sm font-medium text-amber-200/90 transition hover:bg-white/5 hover:text-amber-100"
    >
      {copied ? t.copiedButton : t.shareButton}
    </button>
  );
}
