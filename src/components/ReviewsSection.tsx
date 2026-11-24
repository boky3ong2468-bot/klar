import React, { useState } from 'react';
import { REVIEWS_LIST } from '../data/productData';
import { Star, ThumbsUp, CheckCircle, ShieldCheck } from 'lucide-react';

export const ReviewsSection: React.FC = () => {
  const [helpfulCounts, setHelpfulCounts] = useState<{ [key: string]: number }>({
    'rev-1': 28,
    'rev-2': 19,
    'rev-3': 34,
  });
  const [userVoted, setUserVoted] = useState<{ [key: string]: boolean }>({});

  const handleHelpful = (id: string) => {
    const alreadyLiked = Boolean(userVoted[id]);
    setHelpfulCounts((prev) => ({
      ...prev,
      [id]: alreadyLiked ? Math.max(0, prev[id] - 1) : prev[id] + 1,
    }));
    setUserVoted((prev) => ({ ...prev, [id]: !alreadyLiked }));
  };

  return (
    <section id="reviews-section" className="py-12 px-4 max-w-4xl mx-auto space-y-8">
      {/* Title & Section Header */}
      <div className="text-center space-y-2">
        <span className="text-xs font-bold text-emerald-600 tracking-wider uppercase bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
          Customer Reviews
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
          실제 사용자들의 생생한 후기
        </h2>
        <p className="text-sm text-slate-500">
          자극 없는 무향과 물때 세정력에 만족하신 고객님들의 실제 평가를 만나보세요.
        </p>
      </div>

      {/* Rating Summary Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-sky-100 shadow-sm grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        {/* Left: Overall Score */}
        <div className="text-center md:border-r md:border-slate-100 md:pr-6 space-y-2">
          <div className="text-xs font-semibold text-slate-500">구매 고객 만족도</div>
          <div className="flex items-baseline justify-center gap-1.5">
            <span className="text-5xl font-black text-slate-900 tracking-tight">4.9</span>
            <span className="text-lg font-bold text-slate-400">/ 5.0</span>
          </div>
          {/* Star icons */}
          <div className="flex justify-center gap-1 text-amber-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-amber-400" />
            ))}
          </div>
          <div className="text-xs text-slate-400">총 1,284개 리뷰 기준</div>
        </div>

        {/* Center: Rating Distribution Summary Bar Chart */}
        <div className="space-y-2.5 md:px-2">
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="font-bold text-slate-800">별점 분포 요약</span>
            <span className="text-[11px] text-slate-400">총 1,284건 기준</span>
          </div>
          <div className="space-y-2 text-xs text-slate-600" role="list" aria-label="별점 분포 막대 그래프">
            {[
              { score: 5, label: '5점', pct: 92, count: 1181, colorClass: 'bg-emerald-500' },
              { score: 4, label: '4점', pct: 6, count: 77, colorClass: 'bg-emerald-400' },
              { score: 3, label: '3점', pct: 2, count: 26, colorClass: 'bg-sky-400' },
              { score: 2, label: '2점', pct: 0, count: 0, colorClass: 'bg-slate-300' },
              { score: 1, label: '1점', pct: 0, count: 0, colorClass: 'bg-slate-300' },
            ].map((bar) => (
              <div
                key={bar.label}
                role="listitem"
                className="flex items-center gap-2.5 group"
              >
                <div className="flex items-center gap-1 w-10 shrink-0 font-semibold text-slate-700">
                  <Star
                    className={`w-3.5 h-3.5 ${
                      bar.pct > 0 ? 'fill-amber-400 text-amber-400' : 'fill-slate-200 text-slate-300'
                    }`}
                  />
                  <span>{bar.label}</span>
                </div>
                <div
                  className="flex-1 h-2.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200/50"
                  aria-label={`${bar.label} ${bar.pct}% (${bar.count.toLocaleString()}건)`}
                >
                  <div
                    className={`h-full ${bar.colorClass} rounded-full transition-all duration-500`}
                    style={{ width: `${bar.pct}%` }}
                  />
                </div>
                <div className="w-16 shrink-0 text-right tabular-nums flex items-center justify-end gap-1">
                  <span className={`font-bold ${bar.pct > 0 ? 'text-slate-800' : 'text-slate-400'}`}>
                    {bar.pct}%
                  </span>
                  <span className="text-[10px] text-slate-400">
                    ({bar.count.toLocaleString()})
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Key Highlights */}
        <div className="bg-emerald-50/60 rounded-2xl p-4 border border-emerald-100/70 text-xs space-y-2 text-emerald-950">
          <div className="font-bold text-emerald-900 flex items-center gap-1.5 text-sm">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>고객 만족 포인트</span>
          </div>
          <p className="leading-relaxed">
            • <b>99%</b>가 인공 냄새 없는 <b>무향의 편안함</b>에 만족
          </p>
          <p className="leading-relaxed">
            • <b>97%</b>가 <b>피부 자극 없는 순한 사용감</b>을 칭찬
          </p>
          <p className="leading-relaxed">
            • <b>95%</b>가 <b>수전 물때 세정 효과</b>를 재구매 이유로 선택
          </p>
        </div>
      </div>

      {/* 3 Review Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
        {REVIEWS_LIST.map((rev) => (
          <div
            key={rev.id}
            className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow relative"
          >
            {/* Top row: badge & rating */}
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-[10px] font-bold text-sky-700 bg-sky-50 px-2 py-0.5 rounded-full border border-sky-200">
                  {rev.badgeText}
                </span>
                <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                  {rev.tag}
                </span>
              </div>

              {/* Stars & Date */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex text-amber-400">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <span className="text-[11px] text-slate-400">{rev.date}</span>
              </div>

              {/* Title & Content */}
              <h4 className="font-bold text-slate-900 text-sm mb-2 leading-snug">
                {rev.title}
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {rev.content}
              </p>
            </div>

            {/* Bottom row: Reviewer info & helpful button */}
            <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5 text-slate-500">
                <span className="font-semibold text-slate-700">{rev.author}</span>
                <span className="inline-flex items-center text-[10px] text-emerald-600 bg-emerald-50 px-1 rounded">
                  <CheckCircle className="w-3 h-3 mr-0.5 inline" /> 구매자
                </span>
              </div>

              <button
                type="button"
                onClick={() => handleHelpful(rev.id)}
                aria-pressed={Boolean(userVoted[rev.id])}
                className={`flex items-center gap-1.5 text-[11px] px-2.5 py-1 rounded-lg border transition-colors cursor-pointer ${
                  userVoted[rev.id]
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-300 font-semibold'
                    : 'text-slate-500 border-slate-200 hover:bg-slate-50'
                }`}
                aria-label={userVoted[rev.id] ? '좋아요 취소' : '좋아요'}
                title={userVoted[rev.id] ? '클릭하여 좋아요 취소' : '좋아요'}
              >
                <ThumbsUp
                  className={`w-3 h-3 transition-transform ${
                    userVoted[rev.id] ? 'fill-emerald-600 text-emerald-600 scale-110' : ''
                  }`}
                />
                <span>좋아요 {helpfulCounts[rev.id]}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
