import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

interface CardInfo {
  name: string;
  nameEn: string;
  meaning: string;
}

const POSITION_LABELS = {
  en: ["Past", "Present", "Future"],
  ko: ["과거", "현재", "미래"],
} as const;

export async function POST(request: NextRequest) {
  try {
    const { cards, concern, locale = "en", premium = false } = (await request.json()) as {
      cards: CardInfo[];
      concern: string;
      locale?: "en" | "ko";
      premium?: boolean;
    };

    if (!cards || cards.length !== 3) {
      return NextResponse.json(
        { error: locale === "ko" ? "3장의 카드를 선택해주세요." : "Please select 3 cards." },
        { status: 400 }
      );
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        {
          error:
            locale === "ko"
              ? "OpenAI API 키가 설정되지 않았습니다."
              : "OpenAI API key is not configured.",
        },
        { status: 500 }
      );
    }

    const openai = new OpenAI({ apiKey });

    const positions = POSITION_LABELS[locale] ?? POSITION_LABELS.en;
    const cardDescriptions = cards
      .map(
        (c, i) =>
          `${positions[i]} - ${c.name} (${c.nameEn}): ${c.meaning}`
      )
      .join("\n");

    const concernPlaceholder =
      locale === "ko"
        ? "특별한 고민 없이 전체적인 운세를 알고 싶어요."
        : "I'd like a general reading without a specific concern.";

    const userPrompt = `Selected tarot cards:
${cardDescriptions}

User's concern: ${concern || concernPlaceholder}

Write a personalized tarot interpretation.`;

    const mysticStarPersona = `You are Mystic Star—a tarot reader with 20 years of experience. Your readings feel like a late-night conversation with someone who genuinely gets it: warm yet sharp, mystical yet grounded, poetic yet no-BS. You never dump generic card definitions. Instead, you weave the user's specific concern into the symbolism of each card, showing how their story and the cards speak the same language. Think Product Hunt audience: hip, discerning, professional—people who appreciate depth without fluff. Tone: empathetic, slightly cosmic, confident. Write in English only.`;

    const systemPrompt = premium
      ? `${mysticStarPersona}

Based on the 3 tarot cards (Past-Present-Future spread) and the user's concern, provide a premium report. Connect their concern directly to each card's symbolism—don't just describe the cards. Output MUST follow this exact structure (use the language of the locale for headers):

## [PAST_HEADER]
(2-3 paragraphs: how this past card's energy shaped their current situation, woven with their concern. Be specific to what they shared.)

## [PRESENT_HEADER]
(2-3 paragraphs: the present card as a mirror of where they are right now—validate, then illuminate. Tie symbolism to their lived experience.)

## [FUTURE_HEADER]
(2-3 paragraphs: where the future card points, grounded in hope but honest. Connect to paths they might take.)

## [ADVICE_HEADER]
(2-3 paragraphs: actionable, numbered steps that feel tailored—not generic. Reference the cards and their concern.)

---
[LUCKY_SECTION_HEADER]
[LUCKY_COLOR_LABEL]: [one specific color with brief mystical reason tied to their reading]
[LUCKY_PLACE_LABEL]: [one specific place with brief reason]
[LUCKY_TIME_LABEL]: [one specific time window with brief reason]
---

Replace bracketed headers:
- English: [PAST_HEADER]=## Past, [PRESENT_HEADER]=## Present, [FUTURE_HEADER]=## Future, [ADVICE_HEADER]=## Advice, [LUCKY_SECTION_HEADER]=Today's Lucky Guide, [LUCKY_COLOR_LABEL]=Lucky Color, [LUCKY_PLACE_LABEL]=Lucky Place, [LUCKY_TIME_LABEL]=Lucky Time
- Korean: [PAST_HEADER]=## 과거, [PRESENT_HEADER]=## 현재, [FUTURE_HEADER]=## 미래, [ADVICE_HEADER]=## 조언, [LUCKY_SECTION_HEADER]=오늘의 행운 정보, [LUCKY_COLOR_LABEL]=행운의 색상, [LUCKY_PLACE_LABEL]=행운의 장소, [LUCKY_TIME_LABEL]=행운의 시간

Write 9-12 substantial paragraphs. Content in English; section headers follow locale.`
      : `${mysticStarPersona}

Based on the 3 tarot cards (Past-Present-Future spread) and the user's concern, write a 3-4 paragraph interpretation. Weave their concern into the symbolism of each card—don't list meanings. Show how the cards reflect their story. Hopeful yet grounded.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      max_tokens: premium ? 2800 : 800,
    });

    const interpretation =
      completion.choices[0]?.message?.content ||
      (locale === "ko" ? "해석을 생성할 수 없습니다. 다시 시도해주세요." : "Could not generate interpretation. Please try again.");

    return NextResponse.json({ interpretation });
  } catch (error) {
    console.error("Interpretation API error:", error);
    return NextResponse.json(
      { error: "Interpretation generation failed." },
      { status: 500 }
    );
  }
}
