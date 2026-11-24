import React, { useState } from 'react';
import { CartItem } from '../data/productData';
import { X, Truck, CheckCircle2, ChevronRight, ShoppingBag, Trash2 } from 'lucide-react';

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQty: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onOrderSuccess: (details: { items: CartItem[]; total: number; name: string }) => void;
}

export const OrderModal: React.FC<OrderModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQty,
  onRemoveItem,
  onOrderSuccess,
}) => {
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [payMethod, setPayMethod] = useState<string>('card');
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [completedOrder, setCompletedOrder] = useState<{
    orderNumber: string;
    name: string;
    items: CartItem[];
    totalPrice: number;
  } | null>(null);

  if (!isOpen) return null;

  const totalQty = cartItems.reduce((sum, item) => sum + item.qty, 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);

  const handleOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cartItems.length === 0) return;

    const newErrors: { [key: string]: string } = {};

    if (!name.trim()) {
      newErrors.name = '받는 분 성함을 입력해 주세요.';
    }
    if (!phone.trim()) {
      newErrors.phone = '연락처를 입력해 주세요.';
    }
    if (!address.trim()) {
      newErrors.address = '배송지 주소를 입력해 주세요.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    const snapshotItems = cartItems.map((item) => ({ ...item }));
    const orderNo = `KLAR-2026-${Math.floor(100000 + Math.random() * 900000)}`;

    setCompletedOrder({
      orderNumber: orderNo,
      name: name.trim(),
      items: snapshotItems,
      totalPrice,
    });
    setStep('success');
    onOrderSuccess({ items: snapshotItems, total: totalPrice, name: name.trim() });
  };

  const resetAndClose = () => {
    setStep('form');
    setCompletedOrder(null);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-900/60 backdrop-blur-sm p-0 sm:p-4"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white w-full sm:max-w-md rounded-t-3xl sm:rounded-3xl shadow-2xl max-h-[92vh] flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200">
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="text-base sm:text-lg font-bold text-slate-900">
              {step === 'form' ? '장바구니 / 주문하기' : '주문 완료'}
            </h3>
          </div>
          <button
            type="button"
            onClick={resetAndClose}
            className="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="닫기"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5 flex-1 text-slate-800">
          {step === 'form' ? (
            cartItems.length === 0 ? (
              /* Empty Cart State */
              <div className="py-10 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-sky-50 border border-sky-100 text-sky-600 flex items-center justify-center mx-auto">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div className="space-y-1.5">
                  <h4 className="text-base font-bold text-slate-900">
                    장바구니가 비어 있습니다
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    클라 욕실세정제 또는 함께 보면 좋은 상품을
                    <br />
                    장바구니에 담아 확인해 보세요.
                  </p>
                </div>
                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-3 text-xs flex justify-between items-center text-slate-500">
                  <span>총 결제예정금액</span>
                  <span className="font-extrabold text-slate-900 text-sm">0원</span>
                </div>
                <button
                  type="button"
                  onClick={resetAndClose}
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 px-4 rounded-2xl text-sm transition-colors cursor-pointer"
                >
                  상품 보러가기
                </button>
              </div>
            ) : (
              <form onSubmit={handleOrderSubmit} className="space-y-5">
                {/* Cart Items List */}
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-900">
                      담긴 상품 ({cartItems.length}종 · 총 {totalQty}개)
                    </span>
                    <span className="text-[11px] text-slate-400">수량 변경 및 삭제 가능</span>
                  </div>

                  <div className="space-y-2.5 max-h-60 overflow-y-auto pr-0.5">
                    {cartItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center gap-3 bg-sky-50/70 border border-sky-100 rounded-2xl p-3"
                      >
                        <div className="w-14 h-14 rounded-xl bg-white p-1 flex items-center justify-center flex-shrink-0 border border-slate-100 overflow-hidden">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="max-h-full max-w-full object-contain mix-blend-multiply"
                          />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="text-xs sm:text-sm font-bold text-slate-900 line-clamp-1">
                            {item.name}
                          </div>
                          <div className="flex items-baseline gap-1.5 mt-0.5">
                            {item.originalPrice && item.originalPrice > item.price && (
                              <span className="text-[11px] text-slate-400 line-through">
                                {item.originalPrice.toLocaleString()}원
                              </span>
                            )}
                            <span className="text-xs font-extrabold text-emerald-700">
                              {item.price.toLocaleString()}원
                            </span>
                          </div>
                          <div className="text-[11px] text-slate-500 mt-0.5">
                            합계{' '}
                            <span className="font-bold text-slate-800">
                              {(item.price * item.qty).toLocaleString()}원
                            </span>
                          </div>
                        </div>

                        <div className="flex flex-col items-end gap-1.5 shrink-0">
                          <button
                            type="button"
                            onClick={() => onRemoveItem(item.id)}
                            className="text-slate-400 hover:text-rose-600 p-1 rounded-md transition-colors cursor-pointer"
                            aria-label={`${item.name} 삭제`}
                            title="상품 삭제"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                          <div className="flex items-center border border-slate-200 rounded-xl bg-white shadow-xs">
                            <button
                              type="button"
                              onClick={() => onUpdateQty(item.id, -1)}
                              className="w-7 h-7 flex items-center justify-center text-slate-600 hover:bg-slate-50 text-sm rounded-l-xl font-bold cursor-pointer"
                              aria-label="수량 감소"
                            >
                              −
                            </button>
                            <span className="w-6 text-center text-xs font-bold text-slate-900">
                              {item.qty}
                            </span>
                            <button
                              type="button"
                              onClick={() => onUpdateQty(item.id, 1)}
                              className="w-7 h-7 flex items-center justify-center text-slate-600 hover:bg-slate-50 text-sm rounded-r-xl font-bold cursor-pointer"
                              aria-label="수량 증가"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Delivery notice */}
                <div className="bg-emerald-50/80 border border-emerald-200/80 rounded-xl p-3 flex items-center gap-2.5 text-xs text-emerald-950">
                  <Truck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <div className="flex-1">
                    <span className="font-bold text-emerald-900">
                      오늘 주문 시 내일 도착 예정
                    </span>
                    <span className="text-emerald-700 text-[11px] block sm:inline sm:ml-1.5">
                      (전국 무료배송)
                    </span>
                  </div>
                </div>

                {/* Shipping info inputs */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                    배송지 정보
                  </h4>

                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">
                      받는 분 성함 *
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="홍길동"
                      className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                    {errors.name && (
                      <p className="text-[11px] text-rose-500 mt-1">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">
                      연락처 *
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="010-1234-5678"
                      className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                    {errors.phone && (
                      <p className="text-[11px] text-rose-500 mt-1">{errors.phone}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">
                      배송 주소 *
                    </label>
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="서울특별시 강남구 테헤란로 123"
                      className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                    {errors.address && (
                      <p className="text-[11px] text-rose-500 mt-1">{errors.address}</p>
                    )}
                  </div>
                </div>

                {/* Payment methods */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                    결제 수단 선택
                  </h4>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {[
                      { id: 'card', name: '신용/체크카드' },
                      { id: 'kakao', name: '카카오페이' },
                      { id: 'naver', name: '네이버페이' },
                      { id: 'bank', name: '무통장입금' },
                    ].map((method) => (
                      <button
                        key={method.id}
                        type="button"
                        onClick={() => setPayMethod(method.id)}
                        className={`py-2.5 px-3 rounded-xl border text-center font-medium transition-all cursor-pointer ${
                          payMethod === method.id
                            ? 'border-emerald-600 bg-emerald-50 text-emerald-800 font-bold shadow-xs'
                            : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        {method.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Summary table */}
                <div className="bg-slate-50 rounded-2xl p-4 text-xs space-y-2 border border-slate-100">
                  <div className="flex justify-between text-slate-600">
                    <span>상품금액 (총 {totalQty}개)</span>
                    <span>{totalPrice.toLocaleString()}원</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>배송비</span>
                    <span className="text-emerald-600 font-bold">무료배송</span>
                  </div>
                  <div className="border-t border-slate-200 pt-2 flex justify-between items-baseline font-bold text-sm text-slate-900">
                    <span>총 결제예정금액</span>
                    <span className="text-lg text-emerald-700">
                      {totalPrice.toLocaleString()}원
                    </span>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 px-4 rounded-2xl shadow-lg shadow-emerald-600/25 flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <span>{totalPrice.toLocaleString()}원 결제하기</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </form>
            )
          ) : (
            /* Order Success View */
            <div className="text-center py-6 space-y-5">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <div className="space-y-1">
                <h4 className="text-xl font-bold text-slate-900">
                  주문이 정상 접수되었습니다!
                </h4>
                <p className="text-xs text-slate-500">
                  결제 확인 후 빠르게 출고 준비를 진행하겠습니다.
                </p>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-left text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-500">주문 번호</span>
                  <span className="font-mono font-bold text-slate-800">
                    {completedOrder?.orderNumber}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">받는 분</span>
                  <span className="font-semibold text-slate-800">
                    {completedOrder?.name || '홍길동'}
                  </span>
                </div>
                <div className="border-t border-slate-200/80 pt-2 space-y-1">
                  <span className="text-slate-500 block mb-1">주문 상품</span>
                  {completedOrder?.items.map((item) => (
                    <div key={item.id} className="flex justify-between gap-2 text-slate-800">
                      <span className="truncate font-medium">
                        {item.name} × {item.qty}
                      </span>
                      <span className="font-semibold shrink-0">
                        {(item.price * item.qty).toLocaleString()}원
                      </span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-slate-200/80 pt-2 flex justify-between">
                  <span className="text-slate-500">결제 금액</span>
                  <span className="font-bold text-emerald-700">
                    {(completedOrder?.totalPrice || 0).toLocaleString()}원
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">도착 예정</span>
                  <span className="font-semibold text-sky-700">
                    내일 중 도착 예정
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={resetAndClose}
                className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3.5 px-4 rounded-2xl transition-colors cursor-pointer"
              >
                쇼핑 계속하기
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
