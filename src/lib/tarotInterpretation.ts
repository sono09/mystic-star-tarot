import { TAROT_CARDS, type TarotCardBase } from "@/data/tarotCards";
import { TAROT_DATA, type TarotCardData } from "@/data/tarotData";

/**
 * tarotCards의 id로 tarotData에서 해당 카드 데이터를 찾습니다.
 * TAROT_CARDS와 TAROT_DATA는 동일한 순서로 정렬되어 있습니다.
 */
export function getCardData(card: TarotCardBase): TarotCardData | null {
  const index = TAROT_CARDS.findIndex((c) => c.id === card.id);
  if (index === -1) return null;
  return TAROT_DATA[index] ?? null;
}

/**
 * 선택된 3장의 카드로 무료 해석(간단 형식)을 생성합니다.
 * 각 카드의 keywords와 description을 포함합니다.
 */
export function getFreeInterpretation(cards: TarotCardBase[]): string {
  if (cards.length !== 3) return "";
  const labels = ["과거", "현재", "미래"];
  return cards
    .map((card, i) => {
      const data = getCardData(card);
      if (!data) return "";
      const keywordStr = data.keywords.join(" · ");
      return `【${labels[i]}】 ${data.name}\n키워드: ${keywordStr}\n\n${data.description}`;
    })
    .filter(Boolean)
    .join("\n\n---\n\n");
}

const POSITION_HEADERS = {
  en: { past: "Past", present: "Present", future: "Future", advice: "Advice" },
  ko: { past: "과거", present: "현재", future: "미래", advice: "조언" },
} as const;

const LUCKY_SECTION = {
  en: `---
Today's Lucky Guide
Lucky Color: Deep amber—carries warmth and abundance energy.
Lucky Place: A quiet corner near natural light.
Lucky Time: Early evening, when day transitions to night.
---`,
  ko: `---
오늘의 행운 정보
행운의 색상: 진한 호박색—따뜻함과 풍요의 에너지를 담고 있습니다.
행운의 장소: 자연광이 드는 조용한 코너.
행운의 시간: 낮이 밤으로 넘어가는 초저녁.
---`,
} as const;

const ADVICE_TEMPLATE = {
  en: "Reflect on how these three cards connect to your situation. Trust your intuition and take one small step toward what feels right.",
  ko: "뽑은 세 장의 카드가 당신의 상황과 어떻게 연결되는지 곱씹어 보세요. 직관을 믿고, 맞는 방향으로 한 걸음씩 나아가 보세요.",
} as const;

/**
 * 선택된 3장의 카드로 프리미엄 해석(Past/Present/Future/Advice/Lucky 형식)을 생성합니다.
 */
export function getPremiumInterpretation(
  cards: TarotCardBase[],
  locale: "en" | "ko" = "en"
): string {
  if (cards.length !== 3) return "";
  const headers = POSITION_HEADERS[locale];
  const cardDataList = cards.map(getCardData);

  const formatSection = (data: TarotCardData | null, header: string) => {
    if (!data) return `## ${header}\n(설명 없음)`;
    const keywordStr = data.keywords.join(" · ");
    return `## ${header} · ${data.name}
키워드: ${keywordStr}

${data.description}`;
  };

  return `${formatSection(cardDataList[0], headers.past)}

${formatSection(cardDataList[1], headers.present)}

${formatSection(cardDataList[2], headers.future)}

## ${headers.advice}
${ADVICE_TEMPLATE[locale]}

${LUCKY_SECTION[locale]}`;
}
