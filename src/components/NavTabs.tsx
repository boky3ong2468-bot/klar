import React, { useEffect, useState } from 'react';
import { FileText, Star, HelpCircle } from 'lucide-react';

interface NavTabsProps {
  activeTab?: string;
  onTabClick?: (tabId: string) => void;
}

export const NavTabs: React.FC<NavTabsProps> = () => {
  const [activeTab, setActiveTab] = useState<string>('info');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      const infoEl = document.getElementById('product-info');
      const reviewsEl = document.getElementById('reviews-section');
      const inquiryEl = document.getElementById('inquiry-section');

      if (inquiryEl && scrollPos >= inquiryEl.offsetTop) {
        setActiveTab('inquiry');
      } else if (reviewsEl && scrollPos >= reviewsEl.offsetTop) {
        setActiveTab('reviews');
      } else if (infoEl && scrollPos >= infoEl.offsetTop) {
        setActiveTab('info');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string, tabKey: string) => {
    setActiveTab(tabKey);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -90; // header + tab offset
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const tabs = [
    {
      id: 'info',
      target: 'product-info',
      label: '상품 정보',
      icon: FileText,
      badge: null,
    },
    {
      id: 'reviews',
      target: 'reviews-section',
      label: '후기',
      icon: Star,
      badge: '4.9★',
    },
    {
      id: 'inquiry',
      target: 'inquiry-section',
      label: '배송·문의',
      icon: HelpCircle,
      badge: '정책',
    },
  ];

  return (
    <div className="sticky top-16 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm transition-all">
      <div className="max-w-4xl mx-auto px-4">
        <nav className="flex justify-around items-center" aria-label="상품 상세 메뉴">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => scrollToSection(tab.target, tab.id)}
                className={`flex-1 py-3.5 px-2 flex items-center justify-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-semibold transition-all relative border-b-2 ${
                  isActive
                    ? 'text-emerald-700 border-emerald-600 bg-emerald-50/30'
                    : 'text-slate-500 border-transparent hover:text-slate-900 hover:bg-slate-50/50'
                }`}
                aria-current={isActive ? 'page' : undefined}
              >
                <Icon
                  className={`w-4 h-4 ${
                    isActive ? 'text-emerald-600' : 'text-slate-400'
                  }`}
                />
                <span>{tab.label}</span>
                {tab.badge && (
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                      isActive
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
};
