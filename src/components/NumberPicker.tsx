"use client";

import React, { useState } from "react";
import { Sparkles, Dices, Play, Ticket, Crown, Zap, Edit3, Check, X } from "lucide-react";
import { AutoDrawAnimationModal } from "./AutoDrawAnimationModal";

interface NumberPickerProps {
  selectedNumbers: number[];
  onChange: (numbers: number[]) => void;
  drawCount: number;
  onDrawCountChange: (count: number) => void;
  isInfinityMode: boolean;
  onInfinityModeChange: (isInfinity: boolean) => void;
  onSimulate: () => void;
  isSimulating: boolean;
}

export function getBallColorClass(num: number): string {
  if (num <= 10) return "bg-amber-400 text-slate-950 font-bold border-amber-300";
  if (num <= 20) return "bg-blue-500 text-white font-bold border-blue-400";
  if (num <= 30) return "bg-rose-500 text-white font-bold border-rose-400";
  if (num <= 40) return "bg-slate-500 text-white font-bold border-slate-400";
  return "bg-emerald-500 text-white font-bold border-emerald-400";
}

export const DRAW_COUNT_OPTIONS = [
  { count: 10, label: "1만 원 (10장)" },
  { count: 100, label: "10만 원 (100장)" },
  { count: 1000, label: "100만 원 (1,000장)" },
  { count: 10000, label: "1천만 원 (10,000장)" },
];

export const NumberPicker: React.FC<NumberPickerProps> = ({
  selectedNumbers,
  onChange,
  drawCount,
  onDrawCountChange,
  isInfinityMode,
  onInfinityModeChange,
  onSimulate,
  isSimulating,
}) => {
  const [isAutoAnimating, setIsAutoAnimating] = useState(false);
  const [pendingAutoNumbers, setPendingAutoNumbers] = useState<number[]>([]);
  const [isGridModalOpen, setIsGridModalOpen] = useState(false);

  const handleToggleNumber = (num: number) => {
    if (selectedNumbers.includes(num)) {
      onChange(selectedNumbers.filter((n) => n !== num).sort((a, b) => a - b));
    } else {
      if (selectedNumbers.length < 6) {
        const updated = [...selectedNumbers, num].sort((a, b) => a - b);
        onChange(updated);
        // Automatically close modal when 6th number is picked
        if (updated.length === 6) {
          setTimeout(() => setIsGridModalOpen(false), 200);
        }
      }
    }
  };

  const handleStartAutoGenerate = () => {
    const numbers: number[] = [];
    while (numbers.length < 6) {
      const rand = Math.floor(Math.random() * 45) + 1;
      if (!numbers.includes(rand)) {
        numbers.push(rand);
      }
    }
    const sorted = numbers.sort((a, b) => a - b);
    setPendingAutoNumbers(sorted);
    setIsAutoAnimating(true);
  };

  const handleAutoAnimComplete = () => {
    setIsAutoAnimating(false);
    onChange(pendingAutoNumbers);
    setIsGridModalOpen(false);
  };

  const isReady = selectedNumbers.length === 6;
  const currentOption = DRAW_COUNT_OPTIONS.find((opt) => opt.count === drawCount) || DRAW_COUNT_OPTIONS[1];

  return (
    <div className="w-full h-full bg-slate-900/90 border border-slate-800 rounded-3xl p-4 sm:p-5 shadow-2xl backdrop-blur-md flex flex-col justify-between space-y-3 relative">
      
      {/* 1. TOP MODE SWITCHER TABS */}
      <div className="w-full bg-slate-950 p-1.5 rounded-2xl border-2 border-slate-800 grid grid-cols-2 gap-1.5 shadow-inner">
        <button
          onClick={() => onInfinityModeChange(false)}
          className={`py-2.5 px-3 rounded-xl font-black text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all duration-150 whitespace-nowrap ${
            !isInfinityMode
              ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg border border-blue-400 scale-[1.02]"
              : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/50"
          }`}
        >
          <Zap className={`w-4 h-4 shrink-0 ${!isInfinityMode ? "text-amber-300" : "text-slate-500"}`} />
          <span>⚡ 단판 추첨</span>
        </button>

        <button
          onClick={() => onInfinityModeChange(true)}
          className={`py-2.5 px-3 rounded-xl font-black text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all duration-150 whitespace-nowrap ${
            isInfinityMode
              ? "bg-gradient-to-r from-amber-500 via-rose-500 to-amber-500 text-white shadow-lg border border-amber-300 scale-[1.02]"
              : "text-amber-400/80 hover:text-amber-300 hover:bg-slate-900/50"
          }`}
        >
          <Crown className={`w-4 h-4 shrink-0 ${isInfinityMode ? "text-amber-200 fill-current" : "text-amber-400"}`} />
          <span>👑 1등 당첨까지</span>
        </button>
      </div>

      {/* Title & Action Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-400 animate-pulse" />
          <h2 className="text-base sm:text-lg font-black text-white font-mono tracking-tight">
            선택 번호 6자리
          </h2>
        </div>

        <button
          onClick={handleStartAutoGenerate}
          className="flex items-center gap-1.5 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-black text-xs sm:text-sm px-3.5 py-1.5 rounded-xl transition active:scale-95 shadow-md whitespace-nowrap"
        >
          <Dices className="w-4 h-4 text-slate-950" />
          <span>자동 선택</span>
        </button>
      </div>

      {/* 2. Selected Balls Slots (Click to edit) */}
      <div
        onClick={() => setIsGridModalOpen(true)}
        className="cursor-pointer group flex items-center justify-center gap-2 sm:gap-3 py-3 px-3 bg-slate-950/90 rounded-2xl border border-slate-800/90 hover:border-slate-700 transition shadow-inner relative"
        title="클릭하여 번호 수정하기"
      >
        {Array.from({ length: 6 }).map((_, idx) => {
          const num = selectedNumbers[idx];
          return (
            <div
              key={idx}
              className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-sm sm:text-base font-black border transition-all duration-150 ${
                num
                  ? `${getBallColorClass(num)} scale-105 shadow-lg`
                  : "bg-slate-900 border-dashed border-slate-700/80 text-slate-600"
              }`}
            >
              {num || ""}
            </div>
          );
        })}
      </div>

      {/* 3. DYNAMIC CONTENT AREA: Show 45 Grid or Compact Summary */}
      {!isReady ? (
        /* Incomplete state: Inline 45 Grid Matrix */
        <div className="grid grid-cols-9 gap-1.5 sm:gap-2 my-1">
          {Array.from({ length: 45 }).map((_, i) => {
            const num = i + 1;
            const isSelected = selectedNumbers.includes(num);
            const isDisabled = !isSelected && selectedNumbers.length >= 6;
            return (
              <button
                key={num}
                onClick={() => handleToggleNumber(num)}
                disabled={isDisabled}
                className={`h-8 sm:h-10 rounded-lg font-bold text-xs sm:text-sm transition-all duration-100 flex items-center justify-center border ${
                  isSelected
                    ? `${getBallColorClass(num)} ring-2 ring-white ring-offset-1 ring-offset-slate-950 scale-105 font-black`
                    : isDisabled
                    ? "bg-slate-900/30 text-slate-700 border-slate-800/40 cursor-not-allowed"
                    : "bg-slate-800/70 hover:bg-slate-700 text-slate-200 border-slate-700/80"
                }`}
              >
                {num}
              </button>
            );
          })}
        </div>
      ) : (
        /* Completed state: 45 Grid hidden, Compact Action Card shown */
        <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 text-center space-y-3 animate-fadeIn my-1">
          <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-emerald-400 font-black font-sans">
            <Check className="w-4 h-4 stroke-[3]" />
            <span>번호 6개 선택 완료</span>
          </div>

          <div className="flex items-center justify-center gap-2">
            <button
              onClick={() => setIsGridModalOpen(true)}
              className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-extrabold text-xs sm:text-sm px-4 py-2 rounded-xl border border-slate-700 transition active:scale-95 shadow"
            >
              <Edit3 className="w-4 h-4 text-blue-400" />
              <span>번호 수정하기</span>
            </button>

            <button
              onClick={handleStartAutoGenerate}
              className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-amber-300 font-extrabold text-xs sm:text-sm px-4 py-2 rounded-xl border border-slate-700 transition active:scale-95 shadow"
            >
              <Dices className="w-4 h-4 text-amber-400" />
              <span>다시 자동 선택</span>
            </button>
          </div>
        </div>
      )}

      {/* Draw Count Selection & Mode Sub-Info */}
      <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-2.5 sm:p-3 space-y-2">
        {!isInfinityMode ? (
          <>
            <div className="flex items-center justify-between text-xs font-bold text-slate-400 font-mono">
              <div className="flex items-center gap-1.5">
                <Ticket className="w-4 h-4 text-blue-400" />
                <span>구매 금액:</span>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {DRAW_COUNT_OPTIONS.map((opt) => (
                <button
                  key={opt.count}
                  onClick={() => onDrawCountChange(opt.count)}
                  className={`py-2 px-2.5 rounded-xl text-xs sm:text-sm font-extrabold font-mono transition ${
                    drawCount === opt.count
                      ? "bg-blue-600 text-white border border-blue-400 shadow-md scale-[1.02]"
                      : "bg-slate-800/90 text-slate-400 hover:text-white border border-slate-700"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </>
        ) : (
          <div className="bg-amber-950/60 border border-amber-500/50 rounded-xl p-2 text-center">
            <div className="text-xs font-black text-amber-400 flex items-center justify-center gap-1">
              <Crown className="w-3.5 h-3.5 fill-current text-amber-400" />
              <span>👑 1등(6개 일치) 당첨 시까지 연동 연산</span>
            </div>
          </div>
        )}
      </div>

      {/* Action Button */}
      <div>
        <button
          onClick={onSimulate}
          disabled={!isReady || isSimulating}
          className={`w-full py-3.5 px-5 rounded-2xl font-black text-base sm:text-lg flex items-center justify-center gap-2 transition-all duration-150 shadow-xl ${
            !isReady || isSimulating
              ? "bg-slate-800/80 text-slate-500 cursor-not-allowed border border-slate-700/80"
              : isInfinityMode
              ? "bg-gradient-to-r from-amber-500 via-rose-600 to-amber-500 hover:from-amber-400 hover:to-rose-500 text-white shadow-amber-950/80 active:scale-[0.98]"
              : "bg-gradient-to-r from-blue-600 via-indigo-600 to-amber-500 hover:from-blue-500 hover:to-amber-400 text-white shadow-blue-950/80 active:scale-[0.98]"
          }`}
        >
          <Play className="w-5 h-5 sm:w-6 sm:h-6 fill-current" />
          <span>
            {isSimulating
              ? "연산 진행 중..."
              : !isReady
              ? "번호 6개를 선택해주세요"
              : isInfinityMode
              ? "👑 1등 당첨 시까지 추첨"
              : `${currentOption.label} 추첨 실행`}
          </span>
        </button>
      </div>

      {/* 4. POPUP MODAL FOR 45 NUMBER MATRIX SELECTION */}
      {isGridModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
          <div className="max-w-md w-full bg-slate-900 border border-slate-700 rounded-3xl p-5 shadow-2xl space-y-4 relative">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-400" />
                <h3 className="text-base font-black text-white">번호 직접 선택 (6개)</h3>
              </div>
              <button
                onClick={() => setIsGridModalOpen(false)}
                className="bg-slate-800 hover:bg-slate-700 text-slate-300 p-1.5 rounded-full shadow transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Selected Balls Slots inside modal */}
            <div className="flex items-center justify-center gap-2 py-2 px-3 bg-slate-950 rounded-2xl border border-slate-800">
              {Array.from({ length: 6 }).map((_, idx) => {
                const num = selectedNumbers[idx];
                return (
                  <div
                    key={idx}
                    className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-black border transition-all ${
                      num
                        ? `${getBallColorClass(num)} scale-105 shadow`
                        : "bg-slate-900 border-dashed border-slate-700 text-slate-600"
                    }`}
                  >
                    {num || ""}
                  </div>
                );
              })}
            </div>

            {/* 1 ~ 45 Selection Matrix inside modal */}
            <div className="grid grid-cols-9 gap-1.5">
              {Array.from({ length: 45 }).map((_, i) => {
                const num = i + 1;
                const isSelected = selectedNumbers.includes(num);
                const isDisabled = !isSelected && selectedNumbers.length >= 6;
                return (
                  <button
                    key={num}
                    onClick={() => handleToggleNumber(num)}
                    disabled={isDisabled}
                    className={`h-9 rounded-lg font-bold text-xs transition-all duration-100 flex items-center justify-center border ${
                      isSelected
                        ? `${getBallColorClass(num)} ring-2 ring-white ring-offset-1 ring-offset-slate-950 scale-105 font-black`
                        : isDisabled
                        ? "bg-slate-900/30 text-slate-700 border-slate-800/40 cursor-not-allowed"
                        : "bg-slate-800/70 hover:bg-slate-700 text-slate-200 border-slate-700/80"
                    }`}
                  >
                    {num}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => setIsGridModalOpen(false)}
              disabled={!isReady}
              className={`w-full py-3 rounded-xl font-extrabold text-sm transition ${
                isReady
                  ? "bg-blue-600 hover:bg-blue-500 text-white shadow-lg"
                  : "bg-slate-800 text-slate-500 cursor-not-allowed"
              }`}
            >
              {isReady ? "선택 완료" : `번호 ${6 - selectedNumbers.length}개를 더 선택하세요`}
            </button>
          </div>
        </div>
      )}

      {/* 3D Auto-Select Lottery Ball Machine Animation Modal */}
      <AutoDrawAnimationModal
        isOpen={isAutoAnimating}
        generatedNumbers={pendingAutoNumbers}
        onComplete={handleAutoAnimComplete}
      />
    </div>
  );
};
