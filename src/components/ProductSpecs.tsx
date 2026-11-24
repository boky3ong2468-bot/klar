import React from 'react';
import { PRODUCT_SPECS } from '../data/productData';
import { Info, CheckCircle2, AlertCircle } from 'lucide-react';

export const ProductSpecs: React.FC = () => {
  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-sky-100 shadow-sm space-y-6">
      <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100">
        <Info className="w-5 h-5 text-emerald-600" />
        <h3 className="text-lg sm:text-xl font-bold text-slate-900">상품 정보 고시</h3>
        <span className="text-xs text-slate-400 font-normal ml-auto">전자상거래 등에서의 상품정보제공 고시</span>
      </div>

      {/* Specifications Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-sm">
        <table className="w-full text-left text-xs sm:text-sm border-collapse">
          <tbody>
            {PRODUCT_SPECS.map((spec, index) => {
              const isEven = index % 2 === 0;
              return (
                <tr
                  key={spec.label}
                  className={`border-b border-slate-100 transition-colors ${
                    isEven ? 'bg-slate-50/60' : 'bg-white'
                  } ${spec.highlight ? 'bg-emerald-50/40' : ''}`}
                >
                  <th
                    scope="row"
                    className="w-28 sm:w-36 py-3.5 px-3.5 sm:px-4 font-semibold text-slate-700 bg-slate-100/70 border-r border-slate-200/80 align-top"
                  >
                    {spec.label}
                  </th>
                  <td className="py-3.5 px-3.5 sm:px-4 text-slate-700 leading-relaxed">
                    {spec.highlight ? (
                      <div className="flex items-start gap-1.5 text-emerald-900 font-medium">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <span>{spec.value}</span>
                      </div>
                    ) : spec.isUnconfirmed ? (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-slate-200/70 text-slate-700 font-medium text-xs">
                        {spec.value}
                      </span>
                    ) : (
                      spec.value
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Notice box required by user prompt:
          "성분표 사진 칸은 만들지 말고, 상품 정보 표 아래에 '성분은 제품 라벨을 확인해 주세요'라는 안내 문구만 넣어줘." */}
      <div className="bg-sky-50/80 border border-sky-200 rounded-2xl p-4 sm:p-5 flex items-start gap-3 text-sky-900">
        <AlertCircle className="w-5 h-5 text-sky-600 flex-shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-bold text-sm sm:text-base text-sky-950">
            성분은 제품 라벨을 확인해 주세요
          </p>
          <p className="text-xs text-sky-700 leading-relaxed">
            클라(Klar) 에코 센시티브 무향 욕실세정제의 전체 상세 성분 및 안전확인대상 생활화학제품 표시사항은 제품 용기 후면 라벨을 통해 정확히 확인하실 수 있습니다.
          </p>
        </div>
      </div>
    </div>
  );
};
