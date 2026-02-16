# 타로 상담실 🃏

Next.js와 Tailwind CSS로 만든 신비로운 타로 상담 웹앱입니다.

## 기능

- **78장의 타로 카드**: 메이저 아르카나 22장 + 마이너 아르카나 56장
- **3장 선택**: 과거-현재-미래 스프레드
- **카드 뒤집기 애니메이션**: 선택 시 3D 플립 효과
- **카드 기반 해석**: tarotData.ts의 카드별 해석(description)을 활용한 과거·현재·미래 해석
- **일일 1회 무료**: 로컬 스토리지 기반 제한
- **결제 유도 팝업**: 무료 횟수 초과 시 프리미엄 안내
- **결제 성공 페이지** (`/success`): Stripe/Lemon Squeezy 결제 완료 후 리다이렉트
- **햅틱 피드백**: 모바일·PWA에서 카드 터치 시 진동 (Vibration API)
- **사회적 증거**: "Trusted by 1,000+ seekers" (환경 변수로 숫자 변경 가능)

## 결제 연동 (Stripe / Lemon Squeezy)

결제 후 리다이렉트 URL을 `https://your-domain.com/success` 로 설정하세요.  
쿼리 파라미터 `session_id`(Stripe) 또는 `order_id`(Lemon Squeezy)가 있으면 성공으로 처리됩니다.

## 시작하기

### 1. 의존성 설치

```bash
npm install
```

### 2. 환경 변수 설정

`.env.local` 파일을 만들고 필요한 환경 변수를 설정하세요:

**결제 (PayPal):**

- `NEXT_PUBLIC_PAYPAL_CLIENT_ID`: PayPal Sandbox/Production 클라이언트 ID

**프로덕트 헌트 / SNS 공유용 (선택):**

- `NEXT_PUBLIC_SITE_URL`: 배포 URL (예: `https://tarot-app.vercel.app`). Open Graph/Twitter 메타 태그의 절대 URL에 사용됩니다.
- `NEXT_PUBLIC_TRUSTED_SEEKERS`: 사회적 증거 숫자 (기본값: 1000)
- `public/og.png`: 1200×630px 이미지를 넣으면 링크 미리보기 썸네일로 사용됩니다.

### 3. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어보세요.

## 기술 스택

- **Next.js 16** - App Router
- **Tailwind CSS 4** - 스타일링
- **tarotData** - 카드별 해석 데이터 기반
- **TypeScript**

## 프로젝트 구조

```
src/
├── app/
│   ├── api/             # API 라우트 (필요 시)
│   ├── success/         # 결제 성공 페이지
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── TarotCard.tsx      # 카드 컴포넌트 (플립 애니메이션)
│   ├── CardGrid.tsx       # 78장 카드 그리드
│   ├── InterpretationModal.tsx
│   └── PaymentPopup.tsx
├── data/
│   ├── tarotCards.ts      # 78장 카드 메타데이터
│   └── tarotData.ts       # 78장 카드별 해석(description)
└── hooks/
    ├── useDailyLimit.ts   # 일일 무료 제한 훅
    └── useHaptic.ts       # 햅틱 피드백 (Vibration API)
```
