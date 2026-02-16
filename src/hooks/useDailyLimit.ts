"use client";

import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "tarot_last_used_date";
const DAILY_LIMIT = 1;

export function useDailyLimit() {
  const [canUseFree, setCanUseFree] = useState<boolean | null>(null);
  const [lastUsedDate, setLastUsedDate] = useState<string | null>(null);

  const getTodayString = () => new Date().toISOString().slice(0, 10);

  const checkLimit = useCallback(() => {
    if (typeof window === "undefined") return false;
    const stored = localStorage.getItem(STORAGE_KEY);
    const today = getTodayString();

    if (!stored) {
      setCanUseFree(true);
      setLastUsedDate(null);
      return true;
    }

    setLastUsedDate(stored);
    const canUse = stored !== today;
    setCanUseFree(canUse);
    return canUse;
  }, []);

  useEffect(() => {
    checkLimit();
  }, [checkLimit]);

  const useFreeReading = useCallback(() => {
    if (typeof window === "undefined") return false;
    const today = getTodayString();
    localStorage.setItem(STORAGE_KEY, today);
    setLastUsedDate(today);
    setCanUseFree(false);
    return true;
  }, []);

  const resetForTesting = useCallback(() => {
    if (typeof window === "undefined") return;
    localStorage.removeItem(STORAGE_KEY);
    setCanUseFree(true);
    setLastUsedDate(null);
  }, []);

  return {
    canUseFree: canUseFree ?? false,
    lastUsedDate,
    useFreeReading,
    checkLimit,
    resetForTesting,
  };
}
