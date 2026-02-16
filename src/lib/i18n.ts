export type Locale = "en" | "ko";

export const DEFAULT_LOCALE: Locale = "en";

export const LOCALES: { value: Locale; label: string }[] = [
  { value: "en", label: "English" },
  { value: "ko", label: "한국어" },
];
