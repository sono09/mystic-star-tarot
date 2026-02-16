import type { Metadata } from "next";
import { Geist, Cormorant_Garamond } from "next/font/google";
import { LanguageProvider } from "@/contexts/LanguageContext";
import LocaleSync from "@/components/LocaleSync";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://your-domain.com";

export const metadata: Metadata = {
  title: "Tarot Reading | 78 Cards, Your Destiny",
  description:
    "Read your past, present, and future with AI-powered personalized tarot interpretations.",
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: "Tarot Reading | 78 Cards, Your Destiny",
    description:
      "Read your past, present, and future with AI-powered personalized tarot interpretations.",
    url: siteUrl,
    siteName: "Tarot Reading",
    type: "website",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Tarot Reading - 78 Cards, Your Destiny",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tarot Reading | 78 Cards, Your Destiny",
    description:
      "Read your past, present, and future with AI-powered personalized tarot interpretations.",
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${cormorant.variable} antialiased font-sans`}
      >
        <LanguageProvider>
        <LocaleSync />
        {children}
      </LanguageProvider>
      </body>
    </html>
  );
}
