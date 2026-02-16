"use client";

/**
 * Light haptic feedback for touch interactions.
 * Works best in PWA / mobile browsers that support Vibration API.
 * No-op on unsupported environments.
 */
export function useHaptic() {
  const vibrate = (pattern: number | number[] = 10) => {
    if (typeof navigator !== "undefined" && navigator.vibrate) {
      navigator.vibrate(pattern);
    }
  };

  /** Short tap feedback - subtle single pulse */
  const tap = () => vibrate(10);

  /** Slightly stronger feedback for card selection */
  const select = () => vibrate([8, 4, 8]);

  return { tap, select };
}
