"use client";

import React from "react";
import { Ticket, Infinity as InfinityIcon } from "lucide-react";

export const Header: React.FC = () => {
  return (
    <header className="w-full bg-slate-900/90 backdrop-blur-md border-b border-slate-800 shrink-0 px-3 py-2">
      <div className="max-w-md mx-auto flex items-center justify-between gap-2">
        {/* Title */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-amber-500 flex items-center justify-center shadow-md shrink-0">
            <Ticket className="w-4.5 h-4.5 text-white transform -rotate-12" />
          </div>
          <div>
            <h1 className="text-base font-extrabold tracking-tight text-white font-mono leading-none">
              로또 6/45
            </h1>
            <span className="text-[10px] text-blue-400 font-sans font-semibold">
              가상 추첨 시뮬레이터
            </span>
          </div>
        </div>

        {/* Credit Badge (Unlimited) */}
        <div className="flex items-center gap-1.5 bg-slate-800/90 border border-slate-700 px-2.5 py-1 rounded-lg">
          <span className="text-slate-400 text-xs font-medium">크레딧:</span>
          <div className="flex items-center gap-1 text-emerald-400 font-bold text-xs">
            <InfinityIcon className="w-4 h-4" />
            <span>무제한</span>
          </div>
        </div>
      </div>
    </header>
  );
};
