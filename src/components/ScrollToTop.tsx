import React, { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

export const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility, { passive: true });
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (!isVisible) return null;

  return (
    <button
      type="button"
      onClick={scrollToTop}
      className="fixed right-4 bottom-20 md:bottom-6 z-40 p-3 rounded-full bg-white text-slate-800 shadow-xl border border-slate-200/90 hover:bg-emerald-600 hover:text-white hover:border-emerald-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 group flex items-center justify-center cursor-pointer"
      aria-label="맨 위로 가기"
      title="맨 위로 가기"
    >
      <ArrowUp className="w-5 h-5 transition-transform group-hover:-translate-y-0.5" />
    </button>
  );
};
