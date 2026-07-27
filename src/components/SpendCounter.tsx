"use client";

import React, { useEffect, useState } from "react";
import { BarChart3, Trophy, Sparkles, Zap, Gift } from "lucide-react";
import { SimulationResultData } from "./ReceiptResult";

interface SpendCounterProps {
  targetSpent?: number;
  durationMs?: number;
  resultData: SimulationResultData | null;
  onFinish?: () => void;
}

interface WinningEvent {
  id: number;
  rankText: string;
  amountText: string;
  color: string;
  icon: React.ReactNode;
}

export const SpendCounter: React.FC<SpendCounterProps> = ({
  targetSpent = 10000000,
  durationMs = 2800,
  resultData,
  onFinish,
}) => {
  const [currentSpent, setCurrentSpent] = useState(0);
  const [currentPrize, setCurrentPrize] = useState(0);
  const [winningEvents, setWinningEvents] = useState<WinningEvent[]>([]);

  useEffect(() => {
    if (!resultData) return;

    const totalPrize = resultData.total_prize;
    const ranks = resultData.ranks;
    const startTime = performance.now();

    const eventsToSchedule: Array<{ progress: number; rankText: string; prize: number; color: string; icon: React.ReactNode }> = [];

    if (ranks["5th"] > 0) {
      const popCount = Math.min(ranks["5th"], 4);
      for (let i = 0; i < popCount; i++) {
        eventsToSchedule.push({
          progress: 0.12 + (i * 0.18),
          rankText: "5등 당첨",
          prize: 5000,
          color: "bg-emerald-600 text-white border-emerald-400",
          icon: <Gift className="w-4 h-4 text-amber-300" />,
        });
      }
    }

    if (ranks["4th"] > 0) {
      const popCount = Math.min(ranks["4th"], 3);
      for (let i = 0; i < popCount; i++) {
        eventsToSchedule.push({
          progress: 0.25 + (i * 0.25),
          rankText: "4등 당첨",
          prize: 50000,
          color: "bg-blue-600 text-white border-blue-400",
          icon: <Zap className="w-4 h-4 text-yellow-300" />,
        });
      }
    }

    if (ranks["3rd"] > 0) {
      eventsToSchedule.push({
        progress: 0.55,
        rankText: "🎉 3등 당첨",
        prize: 1500000,
        color: "bg-purple-600 text-white border-purple-400 font-bold",
        icon: <Sparkles className="w-4 h-4 text-amber-300" />,
      });
    }

    if (ranks["2nd"] > 0) {
      eventsToSchedule.push({
        progress: 0.75,
        rankText: "💥 2등 당첨",
        prize: 50000000,
        color: "bg-amber-500 text-slate-950 border-amber-200 font-bold",
        icon: <Trophy className="w-5 h-5 text-slate-950" />,
      });
    }

    if (ranks["1st"] > 0) {
      eventsToSchedule.push({
        progress: 0.88,
        rankText: "👑 1등 당첨!",
        prize: 2000000000,
        color: "bg-gradient-to-r from-amber-400 to-emerald-500 text-slate-950 border-white font-black",
        icon: <Trophy className="w-6 h-6 text-amber-900" />,
      });
    }

    eventsToSchedule.sort((a, b) => a.progress - b.progress);

    let triggeredIndex = 0;
    let eventIdCounter = 0;

    const updateCounter = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / durationMs, 1);
      
      const easeProgress = Math.pow(progress, 2);
      
      const rawSpent = easeProgress * targetSpent;
      const spentVal = Math.min(Math.floor(rawSpent / 1000) * 1000, targetSpent);
      
      const rawPrize = easeProgress * totalPrize;
      const prizeVal = Math.min(Math.floor(rawPrize / 1000) * 1000, totalPrize);
      
      setCurrentSpent(spentVal);
      setCurrentPrize(prizeVal);

      while (
        triggeredIndex < eventsToSchedule.length &&
        progress >= eventsToSchedule[triggeredIndex].progress
      ) {
        const ev = eventsToSchedule[triggeredIndex];
        triggeredIndex++;

        eventIdCounter++;
        const newEv: WinningEvent = {
          id: eventIdCounter,
          rankText: ev.rankText,
          amountText: `+${ev.prize.toLocaleString()}원`,
          color: ev.color,
          icon: ev.icon,
        };

        setWinningEvents((prev) => [...prev.slice(-3), newEv]);
      }

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        setCurrentSpent(targetSpent);
        setCurrentPrize(totalPrize);
        if (onFinish) {
          setTimeout(onFinish, 300);
        }
      }
    };

    const animFrame = requestAnimationFrame(updateCounter);
    return () => cancelAnimationFrame(animFrame);
  }, [resultData, targetSpent, durationMs, onFinish]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 backdrop-blur-md p-4 animate-fadeIn">
      <div className="max-w-sm w-full bg-slate-900 border border-slate-700 rounded-3xl p-6 shadow-2xl text-center relative overflow-hidden">
        <div className="relative z-10 flex flex-col items-center">
          <div className="w-12 h-12 rounded-full bg-blue-950/80 border border-blue-600/50 flex items-center justify-center mb-3 text-blue-400">
            <BarChart3 className="w-6 h-6 animate-pulse" />
          </div>

          <h3 className="text-slate-200 font-bold text-sm mb-1">
            로또 가상 추첨 연산 중...
          </h3>

          {/* Dual Counter */}
          <div className="w-full bg-slate-950/90 rounded-2xl p-3 border border-slate-800 my-2 space-y-2 font-mono">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-400 font-semibold font-sans">구매 금액</span>
              <span className="text-slate-200 font-bold text-base">
                {currentSpent.toLocaleString()}원
              </span>
            </div>
            <div className="flex justify-between items-center text-xs border-t border-slate-800/80 pt-1.5">
              <span className="text-emerald-400 font-semibold font-sans">당첨 회수금</span>
              <span className="text-emerald-400 font-bold text-base">
                +{currentPrize.toLocaleString()}원
              </span>
            </div>
          </div>

          {/* Real-time Popups Stream */}
          <div className="w-full min-h-[90px] flex flex-col items-center justify-center gap-1.5 my-2">
            {winningEvents.length === 0 ? (
              <span className="text-[11px] text-slate-500">
                추첨 데이터를 처리하고 있습니다...
              </span>
            ) : (
              winningEvents.map((ev) => (
                <div
                  key={ev.id}
                  className={`w-full py-1.5 px-3 rounded-xl border text-xs flex items-center justify-between shadow transition-all transform animate-fadeIn ${ev.color}`}
                >
                  <div className="flex items-center gap-1.5">
                    {ev.icon}
                    <span>{ev.rankText}</span>
                  </div>
                  <span className="font-mono text-sm font-bold">{ev.amountText}</span>
                </div>
              ))
            )}
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-slate-800 rounded-full h-2 mt-2 overflow-hidden border border-slate-700">
            <div
              className="bg-gradient-to-r from-blue-600 to-emerald-500 h-full transition-all ease-out"
              style={{ width: `${(currentSpent / targetSpent) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
