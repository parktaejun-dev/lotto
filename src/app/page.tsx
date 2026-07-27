"use client";

import React, { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { MyStatsBanner } from "@/components/MyStatsBanner";
import { NumberPicker } from "@/components/NumberPicker";
import { SpendCounter } from "@/components/SpendCounter";
import { ReceiptResult, SimulationResultData } from "@/components/ReceiptResult";

const MY_STATS_KEY = "lotto_my_personal_stats";

export default function Home() {
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);
  const [drawCount, setDrawCount] = useState<number>(100);
  const [isInfinityMode, setIsInfinityMode] = useState<boolean>(false);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [showSpendCounter, setShowSpendCounter] = useState<boolean>(false);
  const [simulationResult, setSimulationResult] = useState<SimulationResultData | null>(null);
  const [pendingApiResult, setPendingApiResult] = useState<SimulationResultData | null>(null);

  const [myStats, setMyStats] = useState<{ myTotalSpent: number; myNetLoss: number }>({
    myTotalSpent: 0,
    myNetLoss: 0,
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(MY_STATS_KEY);
      if (stored) {
        try {
          setMyStats(JSON.parse(stored));
        } catch (e) {
          console.error("Failed to parse my stats", e);
        }
      }
    }
  }, []);

  const handleSimulateClick = async () => {
    if (selectedNumbers.length !== 6) {
      alert("번호 6개를 선택하거나 자동 선택을 눌러주세요.");
      return;
    }

    setSimulationResult(null);
    setIsSimulating(true);

    try {
      const response = await fetch("/api/simulate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          numbers: selectedNumbers,
          count: drawCount,
          is_infinity_mode: isInfinityMode,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to execute simulation");
      }

      const data = await response.json();
      setPendingApiResult(data.simulation);

      setShowSpendCounter(true);
    } catch (error) {
      console.error("Simulation request error:", error);
      alert("시뮬레이션 연산 중 오류가 발생했습니다.");
      setIsSimulating(false);
    }
  };

  const handleAnimationFinish = () => {
    setShowSpendCounter(false);
    if (pendingApiResult) {
      setSimulationResult(pendingApiResult);

      setMyStats((prev) => {
        const updated = {
          myTotalSpent: prev.myTotalSpent + pendingApiResult.total_spent,
          myNetLoss: prev.myNetLoss + pendingApiResult.net_loss,
        };
        if (typeof window !== "undefined") {
          localStorage.setItem(MY_STATS_KEY, JSON.stringify(updated));
        }
        return updated;
      });

      setPendingApiResult(null);
    }
    setIsSimulating(false);
  };

  const handleResetResult = () => {
    setSimulationResult(null);
    setPendingApiResult(null);
    setIsSimulating(false);
    setShowSpendCounter(false);
  };

  const handleResetMyStats = () => {
    const emptyStats = { myTotalSpent: 0, myNetLoss: 0 };
    setMyStats(emptyStats);
    if (typeof window !== "undefined") {
      localStorage.setItem(MY_STATS_KEY, JSON.stringify(emptyStats));
    }
  };

  return (
    <main className="h-[100dvh] w-full bg-slate-950 text-slate-100 flex flex-col justify-between overflow-hidden selection:bg-blue-500 selection:text-white">
      {/* Top Section */}
      <div className="shrink-0">
        <Header />
        <MyStatsBanner
          myTotalSpent={myStats.myTotalSpent}
          myNetLoss={myStats.myNetLoss}
          onResetMyStats={handleResetMyStats}
        />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 max-w-lg w-full mx-auto p-3 sm:p-5 flex flex-col justify-center items-center overflow-y-auto space-y-2 my-auto">
        <div className="text-center shrink-0">
          <p className="text-xs text-slate-400 font-medium">
            원하는 번호와 모드를 선택하여 가상 추첨을 진행해 보세요
          </p>
        </div>

        {/* Number Picker Card */}
        <div className="w-full flex-1 max-h-[550px]">
          <NumberPicker
            selectedNumbers={selectedNumbers}
            onChange={setSelectedNumbers}
            drawCount={drawCount}
            onDrawCountChange={setDrawCount}
            isInfinityMode={isInfinityMode}
            onInfinityModeChange={setIsInfinityMode}
            onSimulate={handleSimulateClick}
            isSimulating={isSimulating}
          />
        </div>
      </div>

      {/* Footer with Mandatory Coupang Disclosure */}
      <footer className="w-full border-t border-slate-900 py-2 px-3 text-center text-[10px] text-slate-500 bg-slate-950 font-sans shrink-0 space-y-0.5">
        <p>© 2026 로또 6/45 가상 추첨 시뮬레이터</p>
        <p className="text-[9px] text-slate-600">
          본 서비스는 쿠팡 파트너스 활동의 일환으로, 이에 따른 일정액의 수수료를 제공받습니다.
        </p>
      </footer>

      {/* Spend Counter Overlay with Real-time Winning Popups */}
      {showSpendCounter && (
        <SpendCounter
          targetSpent={pendingApiResult ? pendingApiResult.total_spent : drawCount * 1000}
          durationMs={2800}
          resultData={pendingApiResult}
          onFinish={handleAnimationFinish}
        />
      )}

      {/* Full-Screen Receipt Result */}
      {simulationResult && (
        <ReceiptResult
          result={simulationResult}
          userNumbers={selectedNumbers}
          onReset={handleResetResult}
        />
      )}
    </main>
  );
}
