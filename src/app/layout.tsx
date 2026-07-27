import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

const siteUrl = "https://lotto-kr.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "로또 시뮬레이터 - 동행복권 로또 6/45 가상 추첨 시뮬레이션",
  description:
    "동행복권 로또 6/45 실제 확률(1/8,145,060) 기반 가상 추첨 시뮬레이터. 내가 선택한 6개 번호로 1등이 나올 때까지 수익률과 현실 자산(아파트, 건물)을 직관적으로 확인하세요.",
  keywords: [
    "로또 시뮬레이터",
    "로또 가상 추첨",
    "로또 6/45",
    "로또 당첨 확률",
    "동행복권 시뮬레이터",
    "로또 1등 확률",
    "로또 번호 추첨기",
    "로또 탕진 시뮬레이터",
    "로또 현실 점검",
  ],
  authors: [{ name: "Lotto Simulator" }],
  creator: "Lotto Simulator",
  publisher: "Lotto Simulator",
  formatDetection: {
    telephone: false,
  },
  alternates: {
    canonical: siteUrl,
  },
  verification: {
    google: [
      "USStsTyAt5ScMpIEvB-C25hCWuhVOULMMT4PUbR67gw",
      "qAXuabgXBDC3wheim4gp5N-RGgNTsj2N3Fv2MrMQtAc",
    ],
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: siteUrl,
    title: "로또 시뮬레이터 - 동행복권 로또 6/45 가상 추첨 시뮬레이션",
    description:
      "실제 로또 6/45 확률(814만분의 1) 기반 가상 추첨기! 내가 뽑은 번호로 1등 나올 때까지 추첨하고 현실 자산을 확인해 보세요.",
    siteName: "로또 시뮬레이터",
  },
  twitter: {
    card: "summary_large_image",
    title: "로또 시뮬레이터 - 동행복권 로또 6/45 가상 추첨",
    description: "실제 로또 6/45 확률 기반 가상 추첨 시뮬레이터. 1등 당첨 시까지 현실 수익률 점검!",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "로또 6/45 가상 추첨 시뮬레이터",
    url: siteUrl,
    applicationCategory: "EntertainmentApplication",
    operatingSystem: "All",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "KRW",
    },
    description:
      "동행복권 로또 6/45 실제 확률(1/8,145,060) 기반 가상 추첨 시뮬레이터. 1등 당첨 시까지의 수익률과 현실 자산 비교 기능 제공.",
  };

  return (
    <html lang="ko">
      <head>
        {/* Google Analytics (gtag.js) GA4 */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-BPKWB5781W"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-BPKWB5781W');
          `}
        </Script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased selection:bg-rose-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
