import React, { useState } from 'react';
import { IMAGES } from '../data/productData';
import { Clock, Phone, Mail, MapPin, X } from 'lucide-react';

export const Footer: React.FC = () => {
  const [modalContent, setModalContent] = useState<{ title: string; content: string } | null>(null);

  const openTerms = (e: React.MouseEvent) => {
    e.preventDefault();
    setModalContent({
      title: '이용약관',
      content:
        '제1조 (목적)\n본 약관은 클라(Klar) 온라인 스토어에서 제공하는 상품 구매 및 관련 제반 서비스의 이용과 관련하여 회사와 이용자의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.\n\n제2조 (주문 및 배송)\n평일 오후 2시 이전 결제 완료 건은 당일 출고를 원칙으로 하며, 교환 및 반품은 상품 수령일로부터 7일 이내에 고객센터를 통해 접수하실 수 있습니다.\n\n제3조 (회원의 권리와 의무)\n이용자는 정확한 배송 정보를 입력하여야 하며, 타인의 정보를 도용하여서는 안 됩니다.',
    });
  };

  const openPrivacy = (e: React.MouseEvent) => {
    e.preventDefault();
    setModalContent({
      title: '개인정보처리방침',
      content:
        '1. 수집하는 개인정보 항목\n- 상품 주문 및 배송 안내를 위해 수령인 성명, 연락처, 배송지 주소를 확인합니다.\n\n2. 개인정보의 이용 목적\n- 주문 확인, 상품 배송, 고객 상담 및 불만 처리 등 원활한 서비스 제공을 위해 사용됩니다.\n\n3. 개인정보의 보호 및 관리\n- 이용자의 개인정보는 관련 법령에 따라 안전하게 보호되며, 이용 목적 달성 후 지체 없이 파기합니다.',
    });
  };

  return (
    <>
      <footer className="bg-slate-900 text-slate-400 pt-12 pb-24 md:pb-12 px-4 text-xs">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Top Row: Brand & Social SVG Icons */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="bg-white rounded-xl p-1.5 shadow-sm inline-block">
                <img
                  src={IMAGES.logo}
                  alt="Klar EcoSensitive Logo"
                  className="h-9 w-auto object-contain"
                />
              </div>
              <div>
                <span className="text-white font-bold text-sm block">클라 (Klar) 코리아</span>
                <span className="text-[11px] text-slate-500">독일 에코 센시티브 라이프스타일 케어</span>
              </div>
            </div>

            {/* Social Media SVG Icons */}
            <div className="flex items-center gap-3">
              <span className="text-slate-500 text-[11px] hidden sm:inline">공식 SNS 채널</span>

              {/* Instagram SVG */}
              <a
                href="#sns"
                onClick={(e) => e.preventDefault()}
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-emerald-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                aria-label="Instagram"
                title="인스타그램"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>

              {/* YouTube SVG */}
              <a
                href="#sns"
                onClick={(e) => e.preventDefault()}
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-rose-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                aria-label="YouTube"
                title="유튜브"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>

              {/* Naver Blog SVG */}
              <a
                href="#sns"
                onClick={(e) => e.preventDefault()}
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-emerald-500 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                aria-label="Naver Blog"
                title="네이버 블로그"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M16.273 12.845 7.376 0H0v24h7.726V11.156L16.624 24H24V0h-7.727v12.845z" />
                </svg>
              </a>

              {/* KakaoTalk SVG */}
              <a
                href="#sns"
                onClick={(e) => e.preventDefault()}
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-yellow-400 hover:text-slate-900 text-slate-300 flex items-center justify-center transition-colors"
                aria-label="KakaoTalk"
                title="카카오톡 채널"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 3c-5.523 0-10 3.582-10 8 0 2.868 1.9 5.385 4.792 6.787-.21.782-.764 2.833-.876 3.272-.138.54.198.533.418.388.172-.113 2.732-1.859 3.842-2.616.608.085 1.233.13 1.824.13 5.523 0 10-3.582 10-8s-4.477-8-10-8z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Middle Row: Operating Hours & Business Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-slate-400">
            {/* Customer Center Hours */}
            <div className="bg-slate-800/60 rounded-2xl p-4 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold text-sm">
                <Clock className="w-4 h-4 text-emerald-500" />
                <span>고객센터 운영안내</span>
              </div>
              <div className="text-xl font-extrabold text-emerald-400 flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>1588-0000</span>
              </div>
              <p className="text-xs text-slate-300">
                운영 시간: <b>평일 09:30 ~ 17:30</b>
              </p>
              <p className="text-[11px] text-slate-400">
                점심 시간: 12:30 ~ 13:30 (토•일•공휴일 휴무)
              </p>
              <p className="text-[11px] text-slate-500">
                1:1 문의 게시판 및 카카오톡 상담 채널은 24시간 접수 가능
              </p>
            </div>

            {/* Company Info */}
            <div className="space-y-1.5 text-[11px] text-slate-400 leading-relaxed">
              <div className="text-slate-200 font-semibold mb-1 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span>(주)클라 에코센시티브 코리아</span>
              </div>
              <p>대표자: 홍길동 | 사업자등록번호: 000-00-00000</p>
              <p>통신판매업신고: 제2026-서울강남-00000호 | 호스팅서비스: Google Cloud</p>
              <p>주소: 서울특별시 강남구 테헤란로 000 에코타워 12층</p>
              <div className="flex items-center gap-2 text-slate-400 pt-1">
                <Mail className="w-3 h-3 text-slate-500" />
                <span>이메일 문의: contact@klar-ecocare.kr</span>
              </div>
            </div>
          </div>

          {/* Links Row: Terms, Privacy */}
          <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px]">
            <div className="flex items-center gap-4 text-slate-400">
              <button
                type="button"
                onClick={openTerms}
                className="hover:text-white underline underline-offset-4 focus:outline-none cursor-pointer"
              >
                이용약관
              </button>
              <span>|</span>
              <button
                type="button"
                onClick={openPrivacy}
                className="hover:text-emerald-400 font-semibold underline underline-offset-4 focus:outline-none text-slate-300 cursor-pointer"
              >
                개인정보처리방침
              </button>
              <span>|</span>
              <span className="text-slate-500">에스크로 구매안전서비스</span>
            </div>

            <p className="text-slate-500 text-[10px]">
              © Klar Germany & Klar EcoCare. All Rights Reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Terms & Privacy Modal */}
      {modalContent && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 text-slate-800 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-bold text-base text-slate-900">{modalContent.title}</h3>
              <button
                onClick={() => setModalContent(null)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-lg cursor-pointer"
                aria-label="닫기"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="text-xs text-slate-600 leading-relaxed whitespace-pre-line max-h-72 overflow-y-auto pr-2">
              {modalContent.content}
            </div>
            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setModalContent(null)}
                className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold px-4 py-2 rounded-xl cursor-pointer"
              >
                확인
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
