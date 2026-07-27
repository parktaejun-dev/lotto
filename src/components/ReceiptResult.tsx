"use client";

import React, { useEffect } from "react";
import confetti from "canvas-confetti";
import { CoupangWidget } from "./CoupangWidget";
import { RealEstateWidget } from "./RealEstateWidget";
import { getBallColorClass } from "./NumberPicker";
import { ShoppingBag, X, Trophy, CheckCircle2, Check, Crown } from "lucide-react";

export interface SimulationResultData {
  count: number;
  total_spent: number;
  total_prize: number;
  net_loss: number;
  return_rate: number;
  payback_rate?: number;
  years_needed?: number;
  is_infinity_mode?: boolean;
  winning_numbers?: number[];
  bonus_number?: number;
  ranks: {
    "1st": number;
    "2nd": number;
    "3rd": number;
    "4th": number;
    "5th": number;
    fail: number;
  };
}

interface ReceiptResultProps {
  result: SimulationResultData;
  userNumbers: number[];
  onReset: () => void;
}

export const ReceiptResult: React.FC<ReceiptResultProps> = ({
  result,
  userNumbers,
  onReset,
}) => {
  useEffect(() => {
    if (result.ranks["1st"] > 0 || result.ranks["2nd"] > 0 || result.ranks["3rd"] > 0) {
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.5 },
      });
    }
  }, [result]);

  const winningBalls = result.winning_numbers || [5, 14, 21, 33, 40, 42];
  const bonusBall = result.bonus_number || 7;
  const winningSet = new Set(winningBalls);

  const totalWinningCount =
    result.ranks["1st"] +
    result.ranks["2nd"] +
    result.ranks["3rd"] +
    result.ranks["4th"] +
    result.ranks["5th"];

  const winRate = ((totalWinningCount / result.count) * 100).toFixed(1);

  const netReturnRate =
    result.total_spent > 0
      ? Math.round(((result.total_prize - result.total_spent) / result.total_spent) * 100)
      : 0;

  const isNetProfit = result.net_loss <= 0;

  const rankParts: string[] = [];
  if (result.ranks["1st"] > 0) rankParts.push(`1등 ${result.ranks["1st"]}회`);
  if (result.ranks["2nd"] > 0) rankParts.push(`2등 ${result.ranks["2nd"]}회`);
  if (result.ranks["3rd"] > 0) rankParts.push(`3등 ${result.ranks["3rd"]}회`);
  if (result.ranks["4th"] > 0) rankParts.push(`4등 ${result.ranks["4th"]}회`);
  if (result.ranks["5th"] > 0) rankParts.push(`5등 ${result.ranks["5th"]}회`);

  const summaryDetailText = rankParts.length > 0 ? rankParts.join(", ") : "당첨 내역 없음";

  return (
    <div className="fixed inset-0 z-40 bg-slate-950/95 backdrop-blur-md p-2 sm:p-4 flex items-center justify-center h-[100dvh] w-full overflow-hidden animate-fadeIn">
      <div className="w-full max-w-md h-full max-h-[670px] flex flex-col justify-between bg-slate-50 rounded-3xl shadow-2xl relative border border-slate-300 font-sans text-slate-900 p-4 sm:p-5 overflow-hidden">
        
        {/* Floating Close Button */}
        <button
          onClick={onReset}
          className="absolute top-3 right-3 z-50 bg-slate-800 text-slate-300 hover:text-white p-2 rounded-full shadow border border-slate-700 active:scale-95 transition"
          title="닫기"
        >
          <X className="w-4.5 h-4.5" />
        </button>

        {/* 1. Winning Numbers & User Selected Numbers */}
        <div className="shrink-0 space-y-2 mt-3 mb-1">
          
          {/* Infinity Mode Crown Banner if active */}
          {result.is_infinity_mode && (
            <div className="bg-gradient-to-r from-amber-500 via-rose-500 to-amber-500 text-white rounded-2xl p-2 shadow-md text-center border border-amber-300">
              <div className="flex items-center justify-center gap-1.5 font-black text-xs sm:text-sm text-amber-100 whitespace-nowrap">
                <Crown className="w-4 h-4 fill-current text-amber-200 shrink-0" />
                <span>👑 1등까지 총 {result.count.toLocaleString()}장 구매 ({result.years_needed?.toLocaleString()}년 소요)</span>
              </div>
            </div>
          )}

          {/* Representative Winning Numbers */}
          <div className="bg-amber-50 border-2 border-amber-400 py-2 px-3 rounded-2xl text-center font-mono shadow-sm">
            <div className="text-amber-900 text-xs sm:text-sm font-black font-sans flex items-center justify-center gap-1 mb-1">
              <Trophy className="w-4 h-4 text-amber-600" />
              <span>이번 회차 당첨 번호</span>
            </div>
            <div className="flex items-center justify-center gap-1.5 sm:gap-2">
              {winningBalls.map((num) => {
                const isMatched = userNumbers.includes(num);
                return (
                  <div key={num} className="relative flex items-center justify-center">
                    <span
                      className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center font-black text-sm sm:text-base shadow ${getBallColorClass(
                        num
                      )} ${isMatched ? "ring-2 ring-emerald-500 scale-105" : ""}`}
                    >
                      {num}
                    </span>
                    {isMatched && (
                      <span className="absolute -top-1 -right-1 bg-emerald-500 text-white rounded-full p-0.5 shadow">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </span>
                    )}
                  </div>
                );
              })}
              <span className="text-slate-500 font-black text-sm mx-0.5">+</span>
              <div className="relative flex items-center justify-center">
                <span className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-slate-900 text-amber-400 font-black text-sm sm:text-base border-2 border-amber-400 flex items-center justify-center shadow">
                  {bonusBall}
                </span>
                {userNumbers.includes(bonusBall) && (
                  <span className="absolute -top-1 -right-1 bg-emerald-500 text-white rounded-full p-0.5 shadow">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Selected Balls */}
          <div className="flex items-center justify-center gap-1.5 sm:gap-2 bg-slate-100 py-1.5 px-3 rounded-2xl border border-slate-300">
            <span className="text-xs sm:text-sm font-black text-slate-700 mr-1 font-sans">선택 번호:</span>
            {userNumbers.map((num) => {
              const isMatched = winningSet.has(num) || num === bonusBall;
              return (
                <div key={num} className="relative flex items-center justify-center">
                  <span
                    className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center font-black text-sm sm:text-base shadow ${getBallColorClass(
                      num
                    )} ${isMatched ? "ring-2 ring-emerald-500 scale-105" : ""}`}
                  >
                    {num}
                  </span>
                  {isMatched && (
                    <span className="absolute -top-1 -right-1 bg-emerald-500 text-white rounded-full p-0.5 shadow">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          {/* Core Financial Result Box */}
          <div className="bg-slate-100 border border-slate-300 rounded-2xl p-2 text-center font-mono shadow-sm">
            <div className="text-xs font-bold text-slate-700 font-sans uppercase">
              {isNetProfit ? "최종 순수익" : "최종 순손실"}
            </div>
            <div className={`text-2xl sm:text-3xl font-black tracking-tight my-0.5 ${isNetProfit ? "text-emerald-600" : "text-slate-900"}`}>
              {isNetProfit ? `+${Math.abs(result.net_loss).toLocaleString()}원` : `-${result.net_loss.toLocaleString()}원`}
            </div>
            <div className="flex justify-around text-xs text-slate-600 border-t border-slate-200 pt-1 mt-0.5 font-semibold">
              <span>총 당첨금: <strong className="text-emerald-700 text-sm font-black">+{result.total_prize.toLocaleString()}원</strong></span>
              <span>손익률: <strong className={`text-sm font-black ${isNetProfit ? "text-emerald-600" : "text-rose-600"}`}>{netReturnRate > 0 ? `+${netReturnRate}%` : `${netReturnRate}%`}</strong></span>
            </div>
          </div>
        </div>

        {/* 2. Winning Count Summary Banner */}
        <div className="shrink-0 bg-blue-900 text-white rounded-2xl p-2 border border-blue-700 shadow-sm text-center">
          <div className="flex items-center justify-center gap-1.5 font-black text-xs sm:text-sm text-amber-300">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>
              총 {result.count.toLocaleString()}장 중 {totalWinningCount.toLocaleString()}장 당첨 ({winRate}%)
            </span>
          </div>
          <p className="text-xs text-slate-300 font-semibold mt-0.5">
            세부 내역: <strong className="text-white">{summaryDetailText}</strong>
          </p>
        </div>

        {/* 3. Product Widget (Real Estate in Infinity Mode, Coupang in Regular Mode) */}
        <div className="shrink-0 my-1">
          {result.is_infinity_mode ? (
            <RealEstateWidget netLoss={result.net_loss} />
          ) : (
            <CoupangWidget netLoss={result.net_loss} />
          )}
        </div>

        {/* 4. Modal Footer with Legal Disclosure & Retry Button */}
        <div className="shrink-0 font-sans mt-1 space-y-1">
          <button
            onClick={onReset}
            className="w-full py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs sm:text-sm rounded-xl transition duration-150 shadow-md flex items-center justify-center gap-2 active:scale-95"
          >
            <ShoppingBag className="w-4 h-4 text-amber-400" />
            <span>새로운 번호로 다시 추첨하기</span>
          </button>
          
          {/* Modal Footer Mandatory Coupang Disclosure */}
          <div className="text-[9px] text-slate-400 text-center font-sans space-y-0.5">
            <p>본 서비스는 쿠팡 파트너스 활동의 일환으로, 이에 따른 일정액의 수수료를 제공받습니다.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
