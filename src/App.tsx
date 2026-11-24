/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { IMAGES, RelatedProduct, FAQS_LIST, CartItem, MAIN_PRODUCT } from './data/productData';
import { TopBanner } from './components/TopBanner';
import { ProductGallery } from './components/ProductGallery';
import { NavTabs } from './components/NavTabs';
import { ProductSpecs } from './components/ProductSpecs';
import { ReviewsSection } from './components/ReviewsSection';
import { RelatedProducts } from './components/RelatedProducts';
import { PolicyAccordion } from './components/PolicyAccordion';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';
import { OrderModal } from './components/OrderModal';
import {
  Sparkles,
  ShieldCheck,
  Droplets,
  Heart,
  Truck,
  CheckCircle2,
  XCircle,
  ChevronDown,
  ShoppingBag,
} from 'lucide-react';

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isOrderOpen, setIsOrderOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.qty, 0);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  const upsertCartItem = (product: Omit<CartItem, 'qty'>, qtyToAdd: number = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, qty: Math.min(99, item.qty + qtyToAdd) }
            : item
        );
      }
      return [...prev, { ...product, qty: qtyToAdd }];
    });
  };

  const handleOpenCart = () => {
    setIsOrderOpen(true);
  };

  const handleBuyMainNow = () => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === MAIN_PRODUCT.id);
      if (existing) return prev;
      return [...prev, { ...MAIN_PRODUCT, qty: 1 }];
    });
    setIsOrderOpen(true);
  };

  const handleAddToCart = () => {
    upsertCartItem(MAIN_PRODUCT, 1);
    showToast(`장바구니에 '${MAIN_PRODUCT.name}'을(를) 담았습니다.`);
  };

  const handleAddRelatedProduct = (product: RelatedProduct) => {
    upsertCartItem(
      {
        id: product.id,
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice,
        image: product.image,
      },
      1
    );
    showToast(`장바구니에 '${product.name}'이(가) 추가되었습니다.`);
  };

  const handleUpdateCartQty = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;
        const nextQty = Math.max(1, Math.min(99, item.qty + delta));
        return { ...item, qty: nextQty };
      })
    );
  };

  const handleRemoveCartItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleOrderCompleted = (details: { items: CartItem[]; total: number; name: string }) => {
    setCartItems([]);
    showToast(`${details.name || '고객'}님의 주문(${details.total.toLocaleString()}원)이 완료되었습니다!`);
  };

  const toggleFaq = (index: number) => {
    setOpenFaq((prev) => (prev === index ? null : index));
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#f0fdf4] via-[#e0f2fe] to-white text-slate-800">
      {/* 1. Top Announcement Bar */}
      <TopBanner />

      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-sky-100 shadow-xs">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          {/* Brand Logo */}
          <a href="#" className="flex items-center gap-2 group">
            <img
              src={IMAGES.logo}
              alt="Klar EcoSensitive"
              className="h-10 sm:h-12 w-auto object-contain mix-blend-multiply group-hover:opacity-90 transition-opacity"
            />
          </a>

          {/* Nav Links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
            <a href="#features" className="hover:text-emerald-600 transition-colors">
              핵심특징
            </a>
            <a href="#comparison" className="hover:text-emerald-600 transition-colors">
              비교체크
            </a>
            <a href="#guide" className="hover:text-emerald-600 transition-colors">
              사용방법
            </a>
            <a href="#faq" className="hover:text-emerald-600 transition-colors">
              FAQ
            </a>
          </nav>

          {/* Action buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="hidden sm:inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-full">
              <Truck className="w-3 h-3" />
              무료배송
            </span>
            <button
              type="button"
              onClick={handleOpenCart}
              className="relative text-xs sm:text-sm font-semibold text-slate-700 border border-slate-200 rounded-xl px-3 py-2 hover:bg-slate-50 transition-colors flex items-center gap-1.5 cursor-pointer"
              aria-label="장바구니 열기"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>장바구니</span>
              <span className="font-bold text-emerald-600 ml-0.5">({totalCartCount})</span>
            </button>
            <button
              type="button"
              onClick={handleBuyMainNow}
              className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold px-3.5 sm:px-4 py-2 rounded-xl shadow-md shadow-emerald-600/20 transition-all cursor-pointer"
            >
              11,900원 구매
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <section className="pt-8 sm:pt-12 pb-10 px-4">
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Left: Text & Buy Box */}
            <div className="space-y-4 text-center md:text-left order-2 md:order-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-sky-100 text-sky-800 text-xs font-semibold rounded-full border border-sky-200">
                <span>🇩🇪 독일 프리미엄 브랜드</span>
                <span>•</span>
                <span>피부과 저자극 완료</span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
                숨쉬기 편안한 욕실,
                <br />
                <span className="text-emerald-600">클라 무향 욕실세정제</span>
              </h1>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                향 없이 깨끗하게. 물때와 석회가 낀 욕실을 닦아내기 쉽게 도와주는,
                피부과 저자극 테스트를 마친 센시티브 프리미엄 세정제입니다.
              </p>

              {/* Delivery notice requested by user prompt in purchase area */}
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-3 flex items-center gap-2.5 text-xs text-emerald-950 text-left">
                <Truck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <div className="flex-1">
                  <span className="font-bold text-emerald-900">
                    오늘 주문 시 내일 도착 예정
                  </span>
                  <span className="text-emerald-700 text-[11px] block sm:inline sm:ml-1.5 font-normal">
                    (전국 무료배송)
                  </span>
                </div>
              </div>

              {/* Price & Purchase CTA */}
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
                <div className="text-center sm:text-left">
                  <div className="flex items-center gap-2 justify-center sm:justify-start">
                    <span className="text-xs text-slate-400 line-through">14,000원</span>
                    <span className="text-xs font-bold text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded">
                      15% 할인
                    </span>
                  </div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                    11,900원{' '}
                    <span className="text-sm font-normal text-slate-500">(500ml)</span>
                  </div>
                </div>

                <div className="flex gap-2 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={handleAddToCart}
                    className="flex-1 sm:flex-none border border-slate-300 hover:border-slate-400 bg-white text-slate-800 font-bold px-4 py-3 rounded-2xl shadow-xs transition-colors cursor-pointer"
                  >
                    장바구니
                  </button>
                  <button
                    type="button"
                    onClick={handleBuyMainNow}
                    className="flex-1 sm:flex-none bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-3 rounded-2xl shadow-lg shadow-emerald-600/25 transition-all text-center cursor-pointer"
                  >
                    바로 구매하기
                  </button>
                </div>
              </div>
            </div>

            {/* Right: Product Gallery with 3 Thumbnails (Product, Before, After) */}
            <div className="order-1 md:order-2 flex justify-center">
              <ProductGallery />
            </div>
          </div>
        </section>

        {/* 3 Value Badges */}
        <section className="px-4 pb-12">
          <div className="max-w-4xl mx-auto grid grid-cols-3 gap-2 sm:gap-4 text-center">
            <div className="bg-white/80 border border-sky-100 rounded-2xl py-3.5 px-2 shadow-xs">
              <div className="text-emerald-600 flex justify-center mb-1">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div className="text-xs sm:text-sm font-bold text-slate-900">독일 브랜드</div>
              <div className="text-[10px] sm:text-xs text-slate-500">엄격한 에코 품질</div>
            </div>
            <div className="bg-white/80 border border-sky-100 rounded-2xl py-3.5 px-2 shadow-xs">
              <div className="text-emerald-600 flex justify-center mb-1">
                <Droplets className="w-6 h-6" />
              </div>
              <div className="text-xs sm:text-sm font-bold text-slate-900">100% 무향</div>
              <div className="text-[10px] sm:text-xs text-slate-500">인공 향료 무첨가</div>
            </div>
            <div className="bg-white/80 border border-sky-100 rounded-2xl py-3.5 px-2 shadow-xs">
              <div className="text-emerald-600 flex justify-center mb-1">
                <Heart className="w-6 h-6" />
              </div>
              <div className="text-xs sm:text-sm font-bold text-slate-900">피부과 테스트 완료</div>
              <div className="text-[10px] sm:text-xs text-slate-500">자극 걱정 없이 순하게</div>
            </div>
          </div>
        </section>

        {/* Before & After Faucet Section */}
        <section className="py-14 px-4 max-w-3xl mx-auto">
          <div className="text-center space-y-2 mb-8">
            <span className="text-xs font-bold text-sky-600 uppercase tracking-wider">
              Before & After
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              수전에 낀 물때, 이렇게 달라져요
            </h2>
            <p className="text-sm text-slate-500">
              하얗게 말라붙은 물때와 석회 자국을 닦아내기 쉽게 도와줍니다.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-6">
            <figure className="bg-white p-3 sm:p-4 rounded-3xl border border-sky-100 shadow-sm text-center">
              <div className="relative rounded-2xl overflow-hidden aspect-4/3 bg-slate-100">
                <img
                  src={IMAGES.faucetBefore}
                  alt="사용 전 수전"
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-2 left-2 bg-rose-600/90 text-white text-[11px] font-bold px-2 py-0.5 rounded-full shadow-xs">
                  BEFORE
                </span>
              </div>
              <figcaption className="mt-3 text-xs sm:text-sm text-slate-600 font-medium">
                뿌옇고 얼룩덜룩한 석회 물때
              </figcaption>
            </figure>

            <figure className="bg-white p-3 sm:p-4 rounded-3xl border border-sky-100 shadow-sm text-center">
              <div className="relative rounded-2xl overflow-hidden aspect-4/3 bg-slate-100">
                <img
                  src={IMAGES.faucetAfter}
                  alt="사용 후 수전"
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-2 left-2 bg-emerald-600/90 text-white text-[11px] font-bold px-2 py-0.5 rounded-full shadow-xs">
                  AFTER
                </span>
              </div>
              <figcaption className="mt-3 text-xs sm:text-sm text-slate-600 font-medium">
                분사 후 헹굼으로 되살아난 광택
              </figcaption>
            </figure>
          </div>
        </section>

        {/* Problem & Solution Comparison Section */}
        <section id="comparison" className="py-16 px-4 bg-white/70 border-y border-sky-100">
          <div className="max-w-3xl mx-auto">
            <div className="text-center space-y-2 mb-10">
              <span className="text-xs font-bold text-emerald-600 tracking-wider uppercase">
                Problem & Solution
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                기존 욕실 세제의 답답함, 클라가 풀었습니다
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Conventional */}
              <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 space-y-4">
                <div className="text-slate-500 font-bold text-sm flex items-center gap-2">
                  <XCircle className="w-5 h-5 text-rose-500" />
                  <span>기존 일반 세제</span>
                </div>
                <ul className="space-y-3 text-xs sm:text-sm text-slate-600">
                  <li className="flex items-start gap-2">
                    <span className="text-rose-500 font-bold">✕</span>
                    <span>문 닫고 청소하기 힘든 코를 찌르는 독한 락스 냄새</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-rose-500 font-bold">✕</span>
                    <span>청소 후 손이 건조하고 따가워 장갑 착용 필수</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-rose-500 font-bold">✕</span>
                    <span>물로 헹궈도 쉽게 지워지지 않는 거친 석회 얼룩</span>
                  </li>
                </ul>
              </div>

              {/* Klar Sensitive */}
              <div className="bg-emerald-50/60 border-2 border-emerald-500/70 rounded-3xl p-6 space-y-4 shadow-sm">
                <div className="text-emerald-800 font-bold text-sm flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span>클라 센시티브 무향</span>
                </div>
                <ul className="space-y-3 text-xs sm:text-sm text-slate-700">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span>향료 무첨가로 환기 걱정 없이 편안하게 숨쉬는 청소</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span>피부과 저자극 테스트 완료로 순하고 부담 없는 사용감</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span>석회와 물때를 부드럽게 불려 가볍게 헹구는 스마트 케어</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 3 Key Features */}
        <section id="features" className="py-16 px-4 max-w-4xl mx-auto">
          <div className="text-center space-y-2 mb-12">
            <span className="text-xs font-bold text-sky-600 tracking-wider uppercase">
              Key Features
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              순하지만 확실한 3가지 프리미엄 포인트
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-3xl border border-sky-100 shadow-sm space-y-3">
              <div className="w-12 h-12 bg-sky-100 text-sky-600 rounded-2xl flex items-center justify-center font-bold text-lg">
                01
              </div>
              <h3 className="text-lg font-bold text-slate-900">무향 (ohne Duft)</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                인공 향료와 자극적인 에센셜 오일을 첨가하지 않아 후각이 예민한 분도 안심하고 욕실 청소를 할 수 있습니다.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-sky-100 shadow-sm space-y-3">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center font-bold text-lg">
                02
              </div>
              <h3 className="text-lg font-bold text-slate-900">물때 • 석회 케어</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                수전과 세면대에 하얗게 굳은 칼슘과 물때 오염 부위를 부드럽게 불려주어 힘들이지 않고 헹궈낼 수 있습니다.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-sky-100 shadow-sm space-y-3">
              <div className="w-12 h-12 bg-teal-100 text-teal-600 rounded-2xl flex items-center justify-center font-bold text-lg">
                03
              </div>
              <h3 className="text-lg font-bold text-slate-900">피부과 테스트 완료</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                피부 저자극 테스트를 거쳐 자극 걱정을 덜어낸 에코 센시티브 포뮬러로 매일 청소해도 손과 피부가 편안합니다.
              </p>
            </div>
          </div>
        </section>

        {/* How To Use Guide */}
        <section id="guide" className="py-16 px-4 bg-sky-50/50 border-t border-sky-100">
          <div className="max-w-3xl mx-auto">
            <div className="text-center space-y-2 mb-10">
              <span className="text-xs font-bold text-sky-600 tracking-wider uppercase">
                How To Use
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                쉽고 빠른 스마트 에코 청소법
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="bg-white p-6 rounded-2xl border border-sky-100 shadow-xs space-y-2">
                <div className="text-emerald-600 font-extrabold text-sm">STEP 1</div>
                <h4 className="font-bold text-slate-900 text-base">칙칙 분사하기</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  물때가 낀 수전과 세면대에 20~30cm 거리를 두고 골고루 분사합니다.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-sky-100 shadow-xs space-y-2">
                <div className="text-emerald-600 font-extrabold text-sm">STEP 2</div>
                <h4 className="font-bold text-slate-900 text-base">2~5분 불리기</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  찌든 석회와 물때가 분해되도록 잠시 기다려 줍니다.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-sky-100 shadow-xs space-y-2">
                <div className="text-emerald-600 font-extrabold text-sm">STEP 3</div>
                <h4 className="font-bold text-slate-900 text-base">물로 헹구기</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  샤워기로 시원하게 헹궈내면 반짝이는 광택이 완성됩니다.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Sticky PDP Navigation Tabs: 상품 정보 / 후기 / 문의 탭 */}
        <NavTabs />

        {/* Tab 1 Section: 상품 정보 & 고시 표 */}
        <section id="product-info" className="py-12 px-4 max-w-4xl mx-auto space-y-8">
          <ProductSpecs />
        </section>

        {/* Recommended Together: 사진 속 추천 상품 3종 */}
        <RelatedProducts
          onAddToCart={handleAddRelatedProduct}
          cartItems={cartItems}
        />

        {/* Tab 2 Section: 고객 후기 (Reviews) */}
        <ReviewsSection />

        {/* Tab 3 Section: 배송·교환·환불 정책 아코디언 및 FAQ */}
        <section id="inquiry-section" className="py-12 px-4 max-w-4xl mx-auto space-y-12">
          {/* Policy Accordion */}
          <PolicyAccordion />

          {/* FAQ Accordion */}
          <div id="faq" className="max-w-2xl mx-auto space-y-6">
            <div className="text-center space-y-2">
              <span className="text-xs font-bold text-sky-600 tracking-wider uppercase">
                Frequently Asked
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                구매 전에 많이 물어보세요
              </h2>
            </div>

            <div className="space-y-3">
              {FAQS_LIST.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={idx}
                    className="bg-white border border-sky-100 rounded-2xl overflow-hidden shadow-xs transition-colors"
                  >
                    <button
                      type="button"
                      onClick={() => toggleFaq(idx)}
                      className="w-full p-4 sm:p-5 flex justify-between items-center text-left focus:outline-none"
                      aria-expanded={isOpen}
                    >
                      <span className="font-bold text-slate-900 text-sm sm:text-base pr-4">
                        {faq.q}
                      </span>
                      <ChevronDown
                        className={`w-5 h-5 text-slate-400 transition-transform duration-200 flex-shrink-0 ${
                          isOpen ? 'rotate-180 text-emerald-600' : ''
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Bottom Purchase Callout Box */}
        <section id="purchase" className="py-12 px-4 max-w-xl mx-auto text-center">
          <div className="bg-white p-8 rounded-3xl shadow-lg border border-sky-100 space-y-5">
            <div className="w-40 h-40 mx-auto flex items-center justify-center bg-slate-50 rounded-2xl p-2">
              <img
                src={IMAGES.bottle}
                alt="클라 무향 욕실세정제"
                className="max-h-full max-w-full object-contain mix-blend-multiply"
              />
            </div>

            <div className="space-y-1">
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                정품 500ml 스프레이
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                클라 무향 욕실세정제 500ml
              </h3>
              <p className="text-xs text-slate-500">
                인공 향료 무첨가 • 피부 저자극 • 물때 제거 전문
              </p>
            </div>

            {/* Delivery notice requested by user prompt */}
            <div className="bg-sky-50 border border-sky-200 rounded-xl p-3 flex items-center justify-center gap-2 text-xs text-sky-900">
              <Truck className="w-4 h-4 text-sky-600" />
              <span className="font-bold">오늘 주문 시 내일 도착 예정</span>
              <span className="text-sky-700 text-[11px]">(전국 무료배송)</span>
            </div>

            <div className="border-t border-slate-100 pt-4">
              <div className="flex items-center justify-center gap-2 mb-4">
                <span className="text-sm text-slate-400 line-through">14,000원</span>
                <span className="text-xs font-bold text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded">
                  15% 할인
                </span>
                <span className="text-3xl font-black text-slate-900">11,900원</span>
              </div>

              <div className="flex gap-2.5">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="flex-1 py-3.5 px-4 rounded-2xl border border-slate-300 hover:border-slate-400 bg-white text-slate-800 font-bold text-sm shadow-xs transition-colors cursor-pointer"
                >
                  장바구니 담기
                </button>
                <button
                  type="button"
                  onClick={handleBuyMainNow}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 px-4 rounded-2xl shadow-lg shadow-emerald-600/25 transition-all text-sm cursor-pointer"
                >
                  바로 구매하기
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Floating Scroll to Top Button */}
      <ScrollToTop />

      {/* Mobile Sticky Bottom Action Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-4 py-3 shadow-lg flex items-center justify-between gap-3 safe-bottom">
        <div>
          <span className="text-[10px] text-slate-400 line-through block">14,000원</span>
          <span className="text-base font-extrabold text-slate-900">11,900원</span>
        </div>
        <div className="flex items-center gap-2 flex-1 justify-end">
          <button
            type="button"
            onClick={handleAddToCart}
            className="border border-slate-300 active:bg-slate-100 text-slate-800 text-xs font-bold py-2.5 px-3 rounded-xl transition-colors cursor-pointer"
          >
            장바구니
          </button>
          <button
            type="button"
            onClick={handleBuyMainNow}
            className="bg-emerald-600 active:bg-emerald-700 text-white text-xs font-bold py-2.5 px-4 rounded-xl shadow-md shadow-emerald-600/25 transition-colors cursor-pointer"
          >
            바로구매
          </button>
        </div>
      </div>

      {/* Enhanced Footer */}
      <Footer />

      {/* Interactive Order Simulation Modal */}
      <OrderModal
        isOpen={isOrderOpen}
        onClose={() => setIsOrderOpen(false)}
        cartItems={cartItems}
        onUpdateQty={handleUpdateCartQty}
        onRemoveItem={handleRemoveCartItem}
        onOrderSuccess={handleOrderCompleted}
      />

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div
          className="fixed left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white text-xs sm:text-sm px-4 py-2.5 rounded-full shadow-2xl flex items-center gap-2 pointer-events-none transition-all duration-300 border border-slate-700"
          style={{ bottom: 'calc(4.5rem + env(safe-area-inset-bottom, 0px))' }}
          role="status"
        >
          <Sparkles className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
