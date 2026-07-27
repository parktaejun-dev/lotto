"use client";

import React from "react";
import { Wallet, TrendingDown, RotateCcw } from "lucide-react";

interface MyStatsBannerProps {
  myTotalSpent: number;
  myNetLoss: number;
  onResetMyStats?: () => void;
}

export const MyStatsBanner: React.FC<MyStatsBannerProps> = ({
  myTotalSpent,
  myNetLoss,
  onResetMyStats,
}) => {
  return (
    <div className="w-full bg-slate-900/90 border-b border-slate-800 py-1.5 px-3 text-center shrink-0">
      <div className="max-w-md mx-auto flex items-center justify-between gap-2 text-xs font-mono">
        {/* My Total Purchased */}
        <div className="flex items-center gap-1">
          <Wallet className="w-3.5 h-3.5 text-blue-400 shrink-0" />
          <span className="text-[11px] text-slate-400 font-sans font-medium">구매 총액:</span>
          <span className="font-extrabold text-blue-400 text-xs">
            {myTotalSpent.toLocaleString()}원
          </span>
        </div>

        {/* My Cumulative Net Loss */}
        <div className="flex items-center gap-1">
          <TrendingDown className="w-3.5 h-3.5 text-rose-400 shrink-0" />
          <span className="text-[11px] text-slate-400 font-sans font-medium">누적 손실:</span>
          <span className={`font-extrabold text-xs ${myNetLoss >= 0 ? "text-rose-400" : "text-emerald-400"}`}>
            {myNetLoss >= 0 ? `-${myNetLoss.toLocaleString()}원` : `+${Math.abs(myNetLoss).toLocaleString()}원`}
          </span>
        </div>

        {/* Reset Stats Button */}
        {onResetMyStats && (
          <button
            onClick={onResetMyStats}
            className="text-[10px] text-slate-500 hover:text-slate-300 flex items-center gap-0.5 bg-slate-800 border border-slate-700/60 px-1.5 py-0.5 rounded"
            title="나의 통계 초기화"
          >
            <RotateCcw className="w-2.5 h-2.5" />
            <span>초기화</span>
          </button>
        )}
      </div>
    </div>
  );
};
