import React from 'react';
import { RELATED_PRODUCTS_DATA, RelatedProduct, CartItem } from '../data/productData';
import { ShoppingBag, Check, Star, Truck } from 'lucide-react';

interface RelatedProductsProps {
  onAddToCart?: (product: RelatedProduct) => void;
  cartItems?: CartItem[];
}

export const RelatedProducts: React.FC<RelatedProductsProps> = ({
  onAddToCart,
  cartItems = [],
}) => {
  return (
    <section className="py-12 px-4 max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-slate-200/80 pb-4">
        <div>
          <span className="text-xs font-bold text-sky-600 tracking-wider uppercase">
            Recommended Together
          </span>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
            함께 보면 좋은 상품
          </h2>
        </div>
        <p className="text-xs text-slate-500">
          클라(Klar) 독일 친환경 청소·세탁 라인업 (사진 속 추천 제품)
        </p>
      </div>

      {/* 3 Product Cards from Photos */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {RELATED_PRODUCTS_DATA.map((product) => {
          const cartMatch = cartItems.find((item) => item.id === product.id);
          const qtyInCart = cartMatch ? cartMatch.qty : 0;
          const isAdded = qtyInCart > 0;
          return (
            <div
              key={product.id}
              className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Product Photo */}
                <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-slate-50 mb-3.5 border border-slate-100 flex items-center justify-center p-2">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  {/* Badge */}
                  <div className="absolute top-2.5 left-2.5">
                    <span className="text-[10px] font-bold text-rose-700 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded-full shadow-xs">
                      {product.badge}
                    </span>
                  </div>
                </div>

                {/* Category & Rating */}
                <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
                  <span className="text-[11px] text-slate-400 font-medium">
                    {product.category}
                  </span>
                  {product.rating && (
                    <div className="flex items-center gap-1 text-[11px] font-semibold text-slate-700">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>{product.rating}</span>
                      <span className="text-slate-400 font-normal">
                        ({product.reviewCount})
                      </span>
                    </div>
                  )}
                </div>

                {/* Product Name */}
                <h4 className="font-bold text-slate-900 text-sm leading-snug mb-1.5 line-clamp-2">
                  {product.name}
                </h4>

                {/* Short description */}
                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-3">
                  {product.desc}
                </p>
              </div>

              {/* Price & Delivery Details */}
              <div className="pt-3 border-t border-slate-100 space-y-2">
                {/* Original price strikethrough */}
                <div className="flex items-baseline gap-2">
                  <span className="text-xs text-slate-400 line-through">
                    {product.originalPrice.toLocaleString()}원
                  </span>
                  {product.regularDiscountPrice && (
                    <span className="text-xs text-slate-500">
                      {product.discountRate}% {product.regularDiscountPrice.toLocaleString()}원
                    </span>
                  )}
                </div>

                {/* Sale Price & Discount */}
                <div className="flex items-baseline gap-1.5">
                  {product.discountRate && !product.regularDiscountPrice && (
                    <span className="text-base sm:text-lg font-extrabold text-rose-600">
                      {product.discountRate}%
                    </span>
                  )}
                  <span className="text-lg sm:text-xl font-black text-slate-900">
                    {product.price.toLocaleString()}원
                  </span>
                  {product.maxDiscountPrice && (
                    <span className="text-[11px] font-bold text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded">
                      최대할인가
                    </span>
                  )}
                </div>

                {/* Delivery & Cart Button Row */}
                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center gap-1 text-[11px] text-slate-500 font-medium">
                    <Truck className="w-3.5 h-3.5 text-slate-400" />
                    <span>{product.deliveryFee || '무료배송'}</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => onAddToCart && onAddToCart(product)}
                    className={`py-2 px-3 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                      isAdded
                        ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                        : 'bg-slate-900 hover:bg-emerald-600 text-white shadow-xs'
                    }`}
                    aria-label={`${product.name} 장바구니에 담기`}
                  >
                    {isAdded ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span>담김 ({qtyInCart})</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>장바구니 담기</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
