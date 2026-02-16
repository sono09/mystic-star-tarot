"use client";

import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "tarot_premium";

export function usePremium() {
  const [isPremium, setIsPremiumState] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    setIsPremiumState(localStorage.getItem(STORAGE_KEY) === "true");
  }, []);

  const setPremium = useCallback(() => {
    if (typeof window === "undefined") return;
    localStorage.setItem(STORAGE_KEY, "true");
    setIsPremiumState(true);
  }, []);

  return { isPremium, setPremium };
}
