"use client";

import React, { useState } from "react";
import { Loader2, Tv, X, CheckCircle2 } from "lucide-react";

interface CreditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRechargeComplete: () => void;
}

export const CreditModal: React.FC<CreditModalProps> = ({
  isOpen,
  onClose,
  onRechargeComplete,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleWatchAd = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        onRechargeComplete();
      }, 800);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4 animate-fadeIn">
      <div className="max-w-sm w-full bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl relative text-center">
        {/* Close Button */}
        <button
          onClick={onClose}
          disabled={isLoading}
          className="absolute top-4 right-4 text-slate-400 hover:text-white transition disabled:opacity-50"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-14 h-14 rounded-2xl bg-amber-500/20 border border-amber-500/30 text-amber-400 flex items-center justify-center mx-auto mb-4">
          <Tv className="w-7 h-7" />
        </div>

        <h3 className="text-xl font-bold text-white mb-2">
          크레딧이 모두 소진되었습니다!
        </h3>
        <p className="text-xs text-slate-400 mb-6 leading-relaxed">
          15초 가상 광고를 시청하시면 즉시 <strong className="text-amber-400 font-mono">5 크레딧</strong>이 무료로 충전됩니다.
        </p>

        {isSuccess ? (
          <div className="flex items-center justify-center gap-2 py-3 text-emerald-400 font-bold text-sm bg-emerald-950/50 border border-emerald-800/50 rounded-xl animate-bounce">
            <CheckCircle2 className="w-5 h-5" />
            <span>5 크레딧 충전 완료!</span>
          </div>
        ) : (
          <button
            onClick={handleWatchAd}
            disabled={isLoading}
            className={`w-full py-3.5 px-4 rounded-xl font-extrabold text-sm flex items-center justify-center gap-2 transition duration-200 shadow-lg ${
              isLoading
                ? "bg-slate-800 text-slate-400 border border-slate-700 cursor-not-allowed"
                : "bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 shadow-amber-950/50 active:scale-95"
            }`}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-amber-400" />
                <span>광고 시청 중... (2초 대기)</span>
              </>
            ) : (
              <>
                <Tv className="w-4 h-4" />
                <span>광고 보고 크레딧 충전하기</span>
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
};
