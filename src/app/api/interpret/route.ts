import { NextRequest, NextResponse } from "next/server";
import { TAROT_CARDS } from "@/data/tarotCards";
import { TAROT_DATA, type TarotCardData } from "@/data/tarotData";

interface CardInfo {
  name: string;
  nameEn: string;
  meaning: string;
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

function getDataForCard(cardInfo: CardInfo): TarotCardData | null {
  const index = TAROT_CARDS.findIndex(
    (c) => c.nameEn === cardInfo.nameEn || c.nameKo === cardInfo.name
  );
  if (index === -1) return null;
  return TAROT_DATA[index] ?? null;
}

export async function POST(request: NextRequest) {
  try {
    const { cards, locale = "en", premium = false } = (await request.json()) as {
      cards: CardInfo[];
      concern?: string;
      locale?: "en" | "ko";
      premium?: boolean;
    };

    if (!cards || cards.length !== 3) {
      return NextResponse.json(
        {
          error:
            locale === "ko" ? "3장의 카드를 선택해주세요." : "Please select 3 cards.",
        },
        { status: 400 }
      );
    }

    const headers = POSITION_HEADERS[locale === "ko" ? "ko" : "en"];
    const cardDataList = cards.map(getDataForCard);

    let interpretation: string;

    if (premium) {
      const formatSection = (data: TarotCardData | null, header: string) => {
        if (!data) return `## ${header}\n(설명 없음)`;
        const keywordStr = data.keywords.join(" · ");
        return `## ${header} · ${data.name}
키워드: ${keywordStr}

${data.description}`;
      };

      interpretation = `${formatSection(cardDataList[0], headers.past)}

${formatSection(cardDataList[1], headers.present)}

${formatSection(cardDataList[2], headers.future)}

## ${headers.advice}
${ADVICE_TEMPLATE[locale === "ko" ? "ko" : "en"]}

${LUCKY_SECTION[locale === "ko" ? "ko" : "en"]}`;
    } else {
      const labels = ["과거", "현재", "미래"];
      interpretation = cards
        .map((card, i) => {
          const data = getDataForCard(card);
          if (!data) return "";
          const keywordStr = data.keywords.join(" · ");
          return `【${labels[i]}】 ${data.name}\n키워드: ${keywordStr}\n\n${data.description}`;
        })
        .filter(Boolean)
        .join("\n\n---\n\n");
    }

    return NextResponse.json({
      interpretation:
        interpretation ||
        (locale === "ko" ? "해석을 생성할 수 없습니다. 다시 시도해주세요." : "Could not generate interpretation. Please try again."),
    });
  } catch (error) {
    console.error("Interpretation API error:", error);
    return NextResponse.json(
      { error: "Interpretation generation failed." },
      { status: 500 }
    );
  }
}
