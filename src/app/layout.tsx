import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "로또의 쓴맛 - 현실 자각 시뮬레이터",
  description: "1만 번의 가상 로또 추첨을 통해 경험하는 차가운 확률과 현실의 영수증! 과연 당신은 1000만원을 탕진하고 얼마를 건질 수 있을까요?",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased selection:bg-rose-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
