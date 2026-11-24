import React, { useState } from 'react';
import { Sparkles, X } from 'lucide-react';

interface TopBannerProps {
  onDismiss?: () => void;
}

export const TopBanner: React.FC<TopBannerProps> = ({ onDismiss }) => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  const handleClose = () => {
    setIsVisible(false);
    if (onDismiss) onDismiss();
  };

  return (
    <div className="relative bg-gradient-to-r from-emerald-600 via-teal-600 to-sky-600 text-white text-xs sm:text-sm font-medium py-2 px-4 shadow-sm transition-all duration-300">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        <div className="flex-1 flex items-center justify-center gap-2 text-center pr-6">
          <Sparkles className="w-3.5 h-3.5 text-yellow-300 animate-pulse flex-shrink-0" />
          <span className="font-semibold tracking-wide">신규 가입 시 무료배송</span>
          <span className="hidden sm:inline text-white/80 text-xs font-normal">
            (첫 구매 한정 특별 혜택)
          </span>
        </div>
        <button
          onClick={handleClose}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-white/80 hover:text-white rounded-md hover:bg-white/10 transition-colors focus:outline-none focus:ring-1 focus:ring-white"
          aria-label="공지 닫기"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
