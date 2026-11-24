import React, { useState } from 'react';
import { POLICY_DATA } from '../data/productData';
import { Truck, RotateCcw, CreditCard, ChevronDown } from 'lucide-react';

export const PolicyAccordion: React.FC = () => {
  const [openTab, setOpenTab] = useState<string>('shipping');

  const toggleTab = (id: string) => {
    setOpenTab((prev) => (prev === id ? '' : id));
  };

  const getIcon = (id: string) => {
    switch (id) {
      case 'shipping':
        return <Truck className="w-5 h-5 text-emerald-600" />;
      case 'exchange':
        return <RotateCcw className="w-5 h-5 text-teal-600" />;
      case 'refund':
        return <CreditCard className="w-5 h-5 text-sky-600" />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-sky-100 shadow-sm space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
        <div>
          <h3 className="text-lg sm:text-xl font-bold text-slate-900">
            배송 • 교환 • 환불 안내
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            항목을 누르면 상세 정책 내용이 펼쳐집니다.
          </p>
        </div>
      </div>

      {/* Accordion List */}
      <div className="space-y-3">
        {POLICY_DATA.map((policy) => {
          const isOpen = openTab === policy.id;
          return (
            <div
              key={policy.id}
              className={`border rounded-2xl transition-all duration-200 overflow-hidden ${
                isOpen
                  ? 'border-emerald-300 bg-emerald-50/20 shadow-sm'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <button
                type="button"
                onClick={() => toggleTab(policy.id)}
                className="w-full p-4 sm:p-5 flex items-center justify-between text-left focus:outline-none"
                aria-expanded={isOpen}
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-slate-100 text-slate-700">
                    {getIcon(policy.id)}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm sm:text-base">
                      {policy.title}
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5 hidden sm:block">
                      {policy.summary}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-emerald-700 hidden sm:inline">
                    {isOpen ? '접기' : '펼치기'}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center transition-transform duration-200 ${
                      isOpen ? 'rotate-180 bg-emerald-100 text-emerald-700' : 'text-slate-400'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </div>
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-1 border-t border-slate-100/80 text-xs sm:text-sm text-slate-600 space-y-2 leading-relaxed bg-white/60">
                  <ul className="space-y-1.5 list-none pl-0">
                    {policy.content.map((line, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-emerald-500 font-bold mt-0.5">•</span>
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
