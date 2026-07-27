import React from "react";

export const CoupangLogoSvg: React.FC<{ className?: string }> = ({ className = "h-5 w-auto" }) => (
  <div className="bg-[#E4271A] text-white px-2 py-0.5 rounded font-black text-xs tracking-tighter font-mono shadow-sm shrink-0">
    COUPANG
  </div>
);

export const RocketDeliveryBadgeSvg: React.FC<{ className?: string }> = ({ className = "" }) => (
  <div className={`inline-flex items-center gap-1 bg-[#0073E6] text-white px-2 py-0.5 rounded-full font-sans text-xs font-bold tracking-tight shadow-sm shrink-0 ${className}`}>
    <span className="text-[10px]">🚀</span>
    <span>로켓배송</span>
  </div>
);
