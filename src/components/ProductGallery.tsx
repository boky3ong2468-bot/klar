import React from 'react';
import { IMAGES } from '../data/productData';

export const ProductGallery: React.FC = () => {
  return (
    <div className="w-full flex flex-col items-center">
      {/* Background glow behind image */}
      <div className="relative w-full max-w-sm sm:max-w-md">
        <div className="absolute -inset-4 bg-gradient-to-tr from-sky-200 via-emerald-100 to-teal-200 rounded-3xl blur-2xl opacity-60 -z-10" />

        {/* Main product display card */}
        <div className="relative bg-white/90 backdrop-blur-md rounded-3xl border border-white/80 shadow-xl overflow-hidden p-5 sm:p-6">
          {/* Badge */}
          <div className="absolute top-4 left-4 z-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold shadow-sm bg-sky-100 text-sky-800 border border-sky-200">
              정품 500ml
            </span>
          </div>

          {/* Main Product Image */}
          <div className="relative w-full h-72 sm:h-80 flex items-center justify-center overflow-hidden rounded-2xl bg-slate-50/60">
            <img
              src={IMAGES.bottle}
              alt="클라 무향 욕실세정제 500ml (에코 센시티브 케어)"
              className="max-h-full max-w-full object-contain mix-blend-multiply scale-95 hover:scale-100 transition-transform duration-300"
            />
          </div>

          {/* Caption underneath main image */}
          <div className="mt-3.5 pt-3 border-t border-slate-100 flex items-center justify-center sm:justify-start gap-1.5 text-xs text-slate-600">
            <span className="text-slate-900 font-semibold">클라 무향 욕실세정제</span>
            <span className="text-slate-400">•</span>
            <span className="text-slate-500">에코 센시티브 케어 500ml</span>
          </div>
        </div>
      </div>
    </div>
  );
};
