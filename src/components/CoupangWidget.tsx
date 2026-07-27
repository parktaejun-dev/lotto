"use client";

import React, { useEffect, useState } from "react";
import { getCoupangItemByLoss, CoupangItem } from "@/constants/coupang";
import { CoupangLogoSvg, RocketDeliveryBadgeSvg } from "./CoupangLogos";
import { ExternalLink, Flame, Star, PartyPopper } from "lucide-react";

interface CoupangWidgetProps {
  netLoss: number;
}

export const CoupangWidget: React.FC<CoupangWidgetProps> = ({ netLoss }) => {
  const isNetProfit = netLoss <= 0;
  const targetLoss = isNetProfit ? 4500000 : netLoss;

  const localDefault = getCoupangItemByLoss(targetLoss);
  const [item, setItem] = useState<CoupangItem>(localDefault);

  useEffect(() => {
    let isMounted = true;
    const fetchCoupangRecommendation = async () => {
      try {
        const res = await fetch(`/api/coupang/recommend?net_loss=${targetLoss}`);
        if (res.ok) {
          const data = await res.json();
          if (isMounted && data) {
            setItem({
              minLoss: 0,
              maxLoss: Infinity,
              title: data.title,
              subtitle: data.subtitle,
              priceText: data.priceText,
              imageUrl: data.imageUrl || localDefault.imageUrl,
              linkUrl: data.linkUrl || localDefault.linkUrl,
              badge: "로켓배송",
            });
          }
        }
      } catch (e) {
        console.warn("Using fallback local config:", e);
      }
    };

    fetchCoupangRecommendation();
  }, [targetLoss]);

  return (
    <div className="w-full bg-white text-slate-900 rounded-2xl p-3 sm:p-4 border-2 border-rose-500/80 shadow-xl font-sans">
      {/* Catchy Header & Official Coupang Image Logo & Rocket Delivery */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-2 mb-2">
        <div className="flex items-center gap-1.5">
          {isNetProfit ? (
            <PartyPopper className="w-4 h-4 text-emerald-600 animate-bounce shrink-0" />
          ) : (
            <Flame className="w-4 h-4 text-rose-600 animate-bounce shrink-0" />
          )}
          <h3 className={`text-xs sm:text-sm font-black tracking-tight ${isNetProfit ? "text-emerald-700" : "text-rose-600"}`}>
            {isNetProfit ? "🎉 당첨 축하! 수익금으로 이거 지르기!" : "🔥 이 돈이었으면 지금 당장 이거 샀다!"}
          </h3>
        </div>

        <div className="flex items-center gap-2">
          {/* Official Coupang SVG Image Logo */}
          <CoupangLogoSvg className="h-5.5 w-auto" />
          {/* Official Coupang Rocket Delivery SVG Badge */}
          <RocketDeliveryBadgeSvg />
        </div>
      </div>

      {/* Coupang Official Product Card Body */}
      <a
        href={item.linkUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-3 p-1 rounded-xl hover:bg-slate-50 transition"
      >
        {/* 100% Title-Matched High-Res Image Asset */}
        <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden shrink-0 bg-white border border-slate-200 flex items-center justify-center p-1 shadow-sm">
          <img
            src={item.imageUrl}
            alt={item.title}
            className="w-full h-full object-contain group-hover:scale-105 transition duration-200"
          />
        </div>

        {/* Product Details & Natural Button */}
        <div className="flex-1 min-w-0 flex flex-col justify-between">
          <h4 className="text-xs sm:text-sm font-bold text-slate-800 line-clamp-2 leading-snug group-hover:text-blue-600 transition">
            {item.title}
          </h4>

          {/* Ratings & Free Shipping Tag */}
          <div className="flex items-center gap-1 my-1 text-xs text-amber-500 font-bold">
            <div className="flex items-center">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-3 h-3 fill-current text-amber-400" />
              ))}
            </div>
            <span className="text-slate-500 font-normal text-xs">(4.8)</span>
            <span className="text-[#0073E6] font-bold ml-1 text-xs">무료배송</span>
          </div>

          {/* Price Tag & Natural Button */}
          <div className="flex items-center justify-between">
            <div className="text-base sm:text-lg font-black text-[#E4271A] font-mono">
              {item.priceText}
            </div>
            <span className="text-xs bg-amber-400 hover:bg-amber-300 text-slate-950 px-2.5 py-1 rounded-lg font-black flex items-center gap-1 transition shadow-sm">
              상품 상세 정보 보기 <ExternalLink className="w-3 h-3" />
            </span>
          </div>
        </div>
      </a>
    </div>
  );
};
