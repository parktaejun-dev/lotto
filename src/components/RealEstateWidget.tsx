"use client";

import React from "react";
import { Building2, Home, Flame, PartyPopper, Landmark } from "lucide-react";

interface RealEstateWidgetProps {
  netLoss: number;
}

export const RealEstateWidget: React.FC<RealEstateWidgetProps> = ({ netLoss }) => {
  const isNetProfit = netLoss <= 0;
  const absAmount = Math.abs(netLoss);
  const ukAmount = (absAmount / 100000000).toFixed(1);

  // Dynamic Asset matching based on EXACT net loss amount
  let itemData = {
    title: "서울 신축 자가 아파트",
    subtitle: `손실액(-${ukAmount}억 원) 환산 시 서울 아파트 매수가 가능한 금액입니다.`,
    priceText: isNetProfit ? "당첨 수익 달성" : `${ukAmount}억 원`,
    imageUrl: "/products/apartment.png",
    badge: "서울 자가 아파트",
    icon: <Home className="w-4 h-4 text-blue-500" />,
  };

  if (absAmount >= 6500000000 || isNetProfit) {
    // 65억 이상: 성수동 건물주
    itemData = {
      title: "성수동 연무장길 꼬마빌딩",
      subtitle: isNetProfit
        ? "1등 당첨 순수익으로 성수동 건물주 계약이 가능한 자금입니다."
        : `손실액(-${ukAmount}억 원) 환산 시 성수동 꼬마빌딩 매수가 가능한 금액입니다.`,
      priceText: isNetProfit ? "당첨 수익 달성" : `${ukAmount}억 원`,
      imageUrl: "/products/building.png",
      badge: "성수동 건물주",
      icon: <Building2 className="w-4 h-4 text-amber-500" />,
    };
  } else if (absAmount >= 3500000000) {
    // 35억 ~ 65억: 반포 한강뷰 아파트
    itemData = {
      title: "반포 래미안 원베일리 한강뷰",
      subtitle: `손실액(-${ukAmount}억 원) 환산 시 반포 한강뷰 아파트 매수가 가능한 금액입니다.`,
      priceText: `${ukAmount}억 원`,
      imageUrl: "/products/apartment.png",
      badge: "반포 한강뷰 자가",
      icon: <Home className="w-4 h-4 text-blue-500" />,
    };
  } else if (absAmount >= 1500000000) {
    // 15억 ~ 35억: 용산/마포 한강변 아파트
    itemData = {
      title: "용산 한강변 신축 아파트 (34평)",
      subtitle: `손실액(-${ukAmount}억 원) 환산 시 용산 한강변 아파트 매수가 가능한 금액입니다.`,
      priceText: `${ukAmount}억 원`,
      imageUrl: "/products/apartment.png",
      badge: "용산 한강변 자가",
      icon: <Landmark className="w-4 h-4 text-emerald-500" />,
    };
  } else {
    // 15억 미만: 서울 도심 신축 아파트
    itemData = {
      title: "서울 도심 신축 자가 아파트",
      subtitle: `손실액(-${ukAmount}억 원) 환산 시 서울 신축 아파트 매수가 가능한 금액입니다.`,
      priceText: `${ukAmount}억 원`,
      imageUrl: "/products/apartment.png",
      badge: "서울 자가 아파트",
      icon: <Home className="w-4 h-4 text-blue-500" />,
    };
  }

  return (
    <div className="w-full bg-slate-900 text-white rounded-2xl p-3 border-2 border-amber-500/80 shadow-xl font-sans">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-2">
        <div className="flex items-center gap-1.5">
          {isNetProfit ? (
            <PartyPopper className="w-4 h-4 text-emerald-400 shrink-0" />
          ) : (
            <Flame className="w-4 h-4 text-amber-400 shrink-0" />
          )}
          <h3 className={`text-xs font-black tracking-tight ${isNetProfit ? "text-emerald-400" : "text-amber-400"}`}>
            {isNetProfit ? "🎉 당첨금 환산 자산" : "🏛️ 이 금액이면 구매할 수 있는 자산"}
          </h3>
        </div>

        <div className="flex items-center gap-1 bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2 py-0.5 rounded-full text-[10px] font-extrabold whitespace-nowrap">
          {itemData.icon}
          <span>{itemData.badge}</span>
        </div>
      </div>

      {/* Real Estate Product Card Body */}
      <div className="flex items-center gap-3 p-2 rounded-xl bg-slate-950/70 border border-slate-800">
        {/* Real Estate Image */}
        <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden shrink-0 bg-slate-900 border border-slate-700 flex items-center justify-center shadow">
          <img
            src={itemData.imageUrl}
            alt={itemData.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Product Details */}
        <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
          <div>
            <h4 className="text-xs sm:text-sm font-black text-amber-200 truncate leading-snug">
              {itemData.title}
            </h4>
            <p className="text-[11px] text-slate-400 line-clamp-2 mt-0.5 leading-tight font-medium">
              {itemData.subtitle}
            </p>
          </div>

          <div className="mt-1">
            <div className="text-sm sm:text-base font-black text-amber-400 font-mono tracking-tight whitespace-nowrap">
              {itemData.priceText}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
