import type { Locale } from "@/lib/i18n";

export type TranslationKeys = {
  // Header
  appTitle: string;
  appSubtitle: string;

  // Guide
  guideSelect3Before: string;
  guideSelect3Number: string;
  guideSelect3After: string;
  guideSelected: string;

  // Form
  concernPlaceholder: string;
  getInterpretation: string;
  drawAgain: string;

  // Interpretation Modal
  modalTitle: string;
  resultHeader: string;
  resultHeaderNoConcern: string;
  premiumBadge: string;
  past: string;
  present: string;
  future: string;
  yourConcern: string;
  loadingText: string;
  keywordCta: string;
  unlockButton: string;
  close: string;

  // Payment Popup
  paymentTitle: string;
  paymentDescription: string;
  paymentButton: string;
  paymentRedirecting: string;
  freeLimitReached: string;
  ctaText: string;
  maybeLater: string;

  // Success Page
  successTitle: string;
  successDescription: string;
  successCta: string;

  // Cancel Page
  cancelTitle: string;
  cancelDescription: string;
  cancelCta: string;

  // Social Proof
  socialProof: string;

  // Share
  shareButton: string;
  linkCopied: string;
  copiedButton: string;
  downloadResult: string;

  // Errors
  errorInterpretation: string;
  errorSelectCards: string;
  errorApiKey: string;
  errorInterpretFailed: string;
  errorDefault: string;
};

export const translations: Record<Locale, TranslationKeys> = {
  en: {
    appTitle: "Tarot Reading",
    appSubtitle: "Choose 3 cards from 78 · Past · Present · Future",

    guideSelect3Before: "Choose the ",
    guideSelect3Number: "3",
    guideSelect3After: " cards that call to you",
    guideSelected:
      "You've selected 3 cards. Add your concern below and get your interpretation.",

    concernPlaceholder: "Share your concern or question (optional)",
    getInterpretation: "Get Interpretation",
    drawAgain: "Draw Again",

    modalTitle: "Your Tarot Reading",
    resultHeader: "This is the tarot's answer to your concern: 「{concern}」",
    resultHeaderNoConcern: "This is the tarot's answer for you.",
    premiumBadge: "✨ Premium Reading",
    past: "Past",
    present: "Present",
    future: "Future",
    yourConcern: "Your concern",
    loadingText: "Loading interpretation...",
    keywordCta: "AI will weave your personal story from these keywords.",
    unlockButton: "Unlock Full AI Interpretation",
    close: "Close",

    paymentTitle: "Unlock Your Full Destiny",
    paymentDescription:
      "The stars have more to say. Get a deep-dive analysis of your past, present, and future.",
    paymentButton: "Premium Consultation ($4.99)",
    paymentRedirecting: "Redirecting to checkout...",
    freeLimitReached: "You've used your free daily reading.",
    ctaText: "Don't leave your future to chance.",
    maybeLater: "Maybe Later",

    successTitle: "Thank You! ✨",
    successDescription:
      "Your support means the world. Your full reading is now unlocked—head back to discover the insights waiting for you. May the cards guide you well.",
    successCta: "Back to Tarot Reading",
    cancelTitle: "Payment Cancelled",
    cancelDescription: "You left checkout before completing your purchase. No charges were made.",
    cancelCta: "Back to Tarot Reading",
    socialProof: "Trusted by {count}+ seekers",
    shareButton: "Share",
    linkCopied: "Link copied! Ready to post on Reddit.",
    copiedButton: "✓ Copied!",
    downloadResult: "Download Result",

    errorInterpretation: "Could not generate interpretation. Please try again.",
    errorSelectCards: "Please select 3 cards.",
    errorApiKey: "OpenAI API key is not configured.",
    errorInterpretFailed: "An error occurred while generating the interpretation.",
    errorDefault: "An error occurred. Please check your OpenAI API key.",
  },
  ko: {
    appTitle: "타로 상담실",
    appSubtitle: "78장의 카드 중 3장을 선택하세요 · 과거 · 현재 · 미래",

    guideSelect3Before: "마음이 끌리는 카드 ",
    guideSelect3Number: "3장",
    guideSelect3After: "을 골라주세요",
    guideSelected: "3장의 카드를 선택했습니다. 아래에 고민을 적고 해석을 받아보세요.",

    concernPlaceholder: "고민이나 질문을 자유롭게 적어주세요 (선택)",
    getInterpretation: "해석 받기",
    drawAgain: "다시 뽑기",

    modalTitle: "당신의 타로 해석",
    resultHeader: "당신의 고민 「{concern}」에 대한 타로의 대답입니다",
    resultHeaderNoConcern: "당신에 대한 타로의 대답입니다",
    premiumBadge: "✨ 프리미엄 해석",
    past: "과거",
    present: "현재",
    future: "미래",
    yourConcern: "당신의 고민",
    loadingText: "해석을 불러오는 중...",
    keywordCta: "위 키워드를 바탕으로 AI가 당신만의 이야기를 풀어냅니다.",
    unlockButton: "프리미엄 결제하고 전체 AI 해석 보기",
    close: "닫기",

    paymentTitle: "당신의 운명을 완전히 깨워보세요",
    paymentDescription:
      "카드가 더 깊은 이야기를 숨기고 있습니다. 과거, 현재, 미래에 대한 심층 분석을 확인하세요.",
    paymentButton: "Premium Consultation ($4.99)",
    paymentRedirecting: "결제 페이지로 이동 중...",
    freeLimitReached: "오늘의 무료 상담을 모두 사용하셨습니다.",
    ctaText: "당신의 미래를 우연에 맡기지 마세요.",
    maybeLater: "나중에 하기",

    successTitle: "결제가 완료되었습니다! ✨",
    successDescription:
      "후원해 주셔서 감사합니다. 전체 해석이 잠금 해제되었습니다. 앱으로 돌아가 맞춤 해석을 확인하세요.",
    successCta: "타로 상담으로 돌아가기",
    cancelTitle: "결제가 취소되었습니다",
    cancelDescription: "결제를 완료하지 않고 나가셨습니다. 요금은 청구되지 않았습니다.",
    cancelCta: "타로 상담으로 돌아가기",
    socialProof: "{count}명 이상이 이용 중",
    shareButton: "공유",
    linkCopied: "링크가 복사되었습니다! Reddit에 공유할 준비가 됐어요.",
    copiedButton: "✓ 복사됨!",
    downloadResult: "결과 이미지 저장",

    errorInterpretation: "해석을 생성할 수 없습니다. 다시 시도해주세요.",
    errorSelectCards: "3장의 카드를 선택해주세요.",
    errorApiKey: "OpenAI API 키가 설정되지 않았습니다.",
    errorInterpretFailed: "해석 생성 중 오류가 발생했습니다.",
    errorDefault: "오류가 발생했습니다. OpenAI API 키를 확인해주세요.",
  },
};
