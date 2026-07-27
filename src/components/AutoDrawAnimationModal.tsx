"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { getBallColorClass } from "./NumberPicker";
import { Sparkles } from "lucide-react";

interface AutoDrawAnimationModalProps {
  isOpen: boolean;
  generatedNumbers: number[];
  onComplete: () => void;
}

export const AutoDrawAnimationModal: React.FC<AutoDrawAnimationModalProps> = ({
  isOpen,
  generatedNumbers,
  onComplete,
}) => {
  const [visibleBalls, setVisibleBalls] = useState<number[]>([]);

  useEffect(() => {
    if (!isOpen || generatedNumbers.length !== 6) {
      setVisibleBalls([]);
      return;
    }

    // Sequentially reveal 6 balls 1-by-1 with pop animation
    setVisibleBalls([]);
    const timers: NodeJS.Timeout[] = [];

    generatedNumbers.forEach((num, index) => {
      const timer = setTimeout(() => {
        setVisibleBalls((prev) => [...prev, num]);
      }, (index + 1) * 200);
      timers.push(timer);
    });

    const finalTimer = setTimeout(() => {
      onComplete();
    }, 6 * 200 + 400);
    timers.push(finalTimer);

    return () => {
      timers.forEach(clearTimeout);
    };
  }, [isOpen, generatedNumbers, onComplete]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 backdrop-blur-md p-4 animate-fadeIn">
      <div className="max-w-sm w-full bg-slate-900 border-2 border-amber-500/80 rounded-3xl p-6 shadow-[0_0_50px_rgba(245,158,11,0.4)] text-center relative overflow-hidden flex flex-col items-center">
        
        {/* Glowing aura */}
        <div className="absolute inset-0 bg-gradient-to-t from-amber-950/40 via-transparent to-transparent pointer-events-none" />

        {/* 3D Lottery Machine Graphic */}
        <div className="relative w-36 h-36 rounded-2xl overflow-hidden mb-3 border border-amber-500/50 shadow-xl bg-slate-950 animate-pulse">
          <Image
            src="/lotto_machine.png"
            alt="3D Lottery Machine"
            fill
            className="object-cover"
          />
        </div>

        <div className="flex items-center gap-1.5 text-xs font-extrabold text-amber-400 mb-2">
          <Sparkles className="w-4 h-4 animate-spin" />
          <span>3D 로또 추첨기 자동 회전 중...</span>
        </div>

        {/* Balls Slot Container */}
        <div className="flex items-center justify-center gap-2 my-3 p-3 bg-slate-950 rounded-2xl border border-slate-800 w-full min-h-[56px]">
          {Array.from({ length: 6 }).map((_, idx) => {
            const num = visibleBalls[idx];
            return (
              <div
                key={idx}
                className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-sm font-black border transition-all duration-200 ${
                  num
                    ? `${getBallColorClass(num)} scale-110 shadow-lg animate-bounce`
                    : "bg-slate-900 border-dashed border-slate-700 text-slate-700"
                }`}
              >
                {num || ""}
              </div>
            );
          })}
        </div>

        <p className="text-[11px] text-slate-400 mt-1 font-mono">
          행운의 번호 6자리가 하나씩 추출되고 있습니다!
        </p>
      </div>
    </div>
  );
};
