"use client";

import React from "react";
import { BarChart3 } from "lucide-react";

interface GlobalStatsBannerProps {
  totalSpent: number;
  totalSimulations: number;
}

export const GlobalStatsBanner: React.FC<GlobalStatsBannerProps> = ({
  totalSpent,
}) => {
  return (
    <div className="w-full bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border-b border-slate-800 py-1.5 px-3 text-center shrink-0">
      <div className="max-w-md mx-auto flex items-center justify-center gap-2 text-xs">
        <BarChart3 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
        <span className="text-[11px] text-slate-400 font-medium">글로벌 누적 가상 구매액:</span>
        <span className="font-extrabold text-blue-400 font-mono text-xs">
          {(totalSpent || 0).toLocaleString()}원
        </span>
      </div>
    </div>
  );
};
