/**
 * Product Data for Klar EcoSensitive Bathroom Cleaner Landing Page
 * All images reused from the original page assets (no external images generated)
 */

export interface GalleryImage {
  id: string;
  title: string;
  subtitle: string;
  src: string;
  badge: string;
}

export interface ReviewItem {
  id: string;
  author: string;
  rating: number;
  date: string;
  tag: string;
  title: string;
  content: string;
  verifiedBuyer: boolean;
  badgeText: string;
}

export interface RelatedProduct {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice: number;
  discountRate?: number;
  regularDiscountPrice?: number;
  maxDiscountPrice?: number;
  deliveryFee?: string;
  rating?: number;
  reviewCount?: number;
  desc: string;
  image: string;
  badge: string;
}

export interface PolicySection {
  id: string;
  title: string;
  summary: string;
  content: string[];
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  qty: number;
}

export const IMAGES = {
  logo: '/assets/images/klar_logo.jpg',
  bottle: '/assets/images/klar_bottle.jpg',
  faucetBefore: '/assets/images/faucet_before.jpg',
  faucetAfter: '/assets/images/faucet_after.jpg',
};

export const MAIN_PRODUCT: Omit<CartItem, 'qty'> = {
  id: 'klar-bathroom-cleaner-500',
  name: '클라 무향 욕실세정제 500ml',
  price: 11900,
  originalPrice: 14000,
  image: IMAGES.bottle,
};

export const PRODUCT_GALLERY: GalleryImage[] = [
  {
    id: 'bottle',
    title: '제품 사진',
    subtitle: '클라 무향 욕실세정제 500ml (에코 센시티브 케어)',
    src: IMAGES.bottle,
    badge: '정품 500ml',
  },
  {
    id: 'before',
    title: '사용 전 사진',
    subtitle: '수전에 하얗게 말라붙은 석회와 얼룩덜룩한 물때',
    src: IMAGES.faucetBefore,
    badge: 'BEFORE',
  },
  {
    id: 'after',
    title: '사용 후 사진',
    subtitle: '클라 분사 후 헹굼으로 광택이 되살아난 깨끗한 수전',
    src: IMAGES.faucetAfter,
    badge: 'AFTER',
  },
];

export const PRODUCT_SPECS = [
  { label: '제품명', value: '클라 무향 욕실세정제 (Klar EcoSensitive Badreiniger)' },
  { label: '용량', value: '500ml' },
  {
    label: '사용 방법',
    value:
      '세정이 필요한 수전, 세면대, 타일, 거울 등에 20~30cm 거리를 두고 분사한 뒤 2~5분간 불린 후 물로 깨끗이 헹구어 냅니다. 오염이 굳은 부위는 스펀지나 부드러운 수세미로 가볍게 문지른 후 헹궈주세요.',
  },
  {
    label: '주의사항',
    value:
      '어린이의 손이 닿지 않는 곳에 보관하십시오. 눈에 들어갔을 경우 즉시 흐르는 물로 충분히 씻어내고 전문의와 상담하십시오. 산성에 약한 대리석, 천연석, 에나멜 소재에는 사용 전 눈에 띄지 않는 곳에 국소 테스트 후 사용하십시오. 밀폐된 좁은 공간에서 장시간 사용 시 적절히 환기하십시오.',
  },
  {
    label: '보관 방법',
    value: '직사광선 및 고온 다습한 환경을 피하여 서늘한 실온(1~30℃)에 세워서 보관하십시오.',
  },
  {
    label: '확인된 사항',
    value: '무향 (ohne Duft, 인공 향료 무첨가) • 피부과 저자극 테스트 완료 (Dermatologically tested)',
    highlight: true,
  },
  {
    label: '제조국',
    value: '제품 라벨 참고',
    isUnconfirmed: true,
  },
  {
    label: '전성분',
    value: '제품 라벨 참고',
    isUnconfirmed: true,
  },
];

export const REVIEWS_LIST: ReviewItem[] = [
  {
    id: 'rev-1',
    author: '김*민',
    rating: 5,
    date: '2026.03.28',
    tag: '무향 / 환기 편의성',
    title: '냄새 전혀 없어서 창문 없는 화장실 청소에 최고예요',
    content:
      '아파트 욕실에 창문이 없어서 락스나 강한 세제 쓰면 기침 나고 두통 때문에 힘들었는데, 이건 진짜 냄새가 1도 없어서 문 닫고 청소해도 숨쉬기 편해요. 락스 특유의 찌르는 냄새 질색하시는 분들 강력 추천합니다.',
    verifiedBuyer: true,
    badgeText: '베스트 후기',
  },
  {
    id: 'rev-2',
    author: '이*영',
    rating: 5,
    date: '2026.03.24',
    tag: '피부 자극 없음',
    title: '맨손으로 청소해도 손이 안 따갑고 가려움 없어요',
    content:
      '고무장갑 끼는 거 답답해서 맨손으로 슥슥 수전 닦는 버릇이 있는데, 피부과 테스트 완료라 그런지 손 가렵거나 당김 없이 순하네요. 자극에 예민한 피부인데 안심하고 씁니다.',
    verifiedBuyer: true,
    badgeText: '베스트 후기',
  },
  {
    id: 'rev-3',
    author: '박*준',
    rating: 5,
    date: '2026.03.19',
    tag: '물때 청소 세정력',
    title: '세면대 수전 하얀 물때가 분사하고 3분 뒤 샤워기로 씻으니 반짝반짝',
    content:
      '욕실 수전이랑 세면대 수전 쪽에 하얗게 낀 석회 물때가 물로만 씻으면 절대 안 지워졌는데, 분사해두고 3분 뒤에 샤워기로 쏴주니까 반짝반짝 광이 나네요! 물때 세정력 대만족입니다.',
    verifiedBuyer: true,
    badgeText: '베스트 후기',
  },
];

export const RELATED_PRODUCTS_DATA: RelatedProduct[] = [
  {
    id: 'wc-cleaner',
    name: '클라 변기 클리너 750ml, 친환경 독일 청소용 세제',
    category: '친환경 독일 청소 세제',
    originalPrice: 16500,
    discountRate: 21,
    price: 13000,
    deliveryFee: '3,000원',
    rating: 4.88,
    reviewCount: 334,
    image: '/assets/images/related_wc.jpg',
    badge: '21% 할인',
    desc: '곡선형 노즐로 변기 테두리 안쪽 물때와 요석까지 빈틈없이 밀착 케어',
  },
  {
    id: 'kitchen-cleaner',
    name: '클라 무향 주방 클리너 500ml, 친환경 독일 청소 세제',
    category: '친환경 독일 청소 세제',
    originalPrice: 15500,
    discountRate: 16,
    price: 12900,
    deliveryFee: '3,000원',
    rating: 4.78,
    reviewCount: 592,
    image: '/assets/images/related_kitchen.jpg',
    badge: '16% 할인',
    desc: '인덕션, 냄비 바닥, 싱크대 찌든 기름때를 표면 손상 없이 깨끗하게 세정',
  },
  {
    id: 'laundry-detergent',
    name: '천연성분 무향 독일세제, 클라 소프넛 액상 세탁세제 1.5L',
    category: '천연성분 무향 독일 세탁세제',
    originalPrice: 31000,
    discountRate: 22,
    regularDiscountPrice: 24000,
    maxDiscountPrice: 21600,
    price: 21600,
    deliveryFee: '무료배송',
    rating: 4.83,
    reviewCount: 193,
    image: '/assets/images/related_laundry.jpg',
    badge: '최대할인 21,600원',
    desc: '천연 사포닌 성분의 소프넛 추출물 함유, 민감 피부와 아기 옷도 안심하는 고농축 비건 세제',
  },
];

export const POLICY_DATA: PolicySection[] = [
  {
    id: 'shipping',
    title: '배송 안내',
    summary: '전국 전 지역 무료배송 • 평일 14:00 이전 주문 시 당일 발송',
    content: [
      '배송 방법: 일반 택배 (CJ대한통운 / 우체국택배)',
      '배송비: 전 상품 무료배송 (제주 및 도서산간 지역 추가 운임 없음)',
      '출고 마감: 평일 오후 2시 이전 결제 완료 건은 당일 출고되며, 출고 후 통상 1~2영업일 이내 수령하실 수 있습니다.',
    ],
  },
  {
    id: 'exchange',
    title: '교환 및 반품 안내',
    summary: '상품 수령 후 7일 이내 접수 가능 • 단순 변심 반품 안내',
    content: [
      '신청 기간: 상품을 수령하신 날로부터 7일 이내에 교환 및 반품 접수가 가능합니다.',
      '왕복 배송비: 단순 변심으로 인한 반품의 경우 왕복 배송비 6,000원이 부과됩니다. (상품 불량 또는 오배송의 경우 판매자 전액 부담)',
      '교환/반품 불가 사유: 제품 밀봉 씰이 훼손되거나 사용 흔적이 있는 경우, 고객의 부주의로 파손된 경우 교환/반품이 불가합니다.',
    ],
  },
  {
    id: 'refund',
    title: '환불 및 AS 정책',
    summary: '반품 검수 완료 후 1~3영업일 내 결제 수단별 환불 처리',
    content: [
      '환불 절차: 반송 상품 입고 및 검수 완료 후 1~3영업일 이내에 최초 결제하신 수단으로 승인 취소 또는 계좌 환불이 진행됩니다.',
      '카드 결제 취소: 카드사 사정에 따라 승인 취소 반영까지 3~5영업일이 소요될 수 있습니다.',
      '고객센터 문의: 제품 파손 및 불량 접수는 고객센터(1588-0000) 또는 1:1 온라인 문의를 통해 접수해 주시기 바랍니다.',
    ],
  },
];

export const FAQS_LIST = [
  {
    q: '대리석이나 천연석에도 쓸 수 있나요?',
    a: '천연 대리석이나 산성에 민감한 재질은 표면이 뿌옇게 흐려질 수 있으므로 사용을 권장하지 않습니다. 수전, 세면대(도기), 욕조, 일반 타일에 사용해 주세요.',
  },
  {
    q: '정말 냄새가 전혀 안 나나요?',
    a: '클라는 인공 향료 및 자극적인 에센셜 오일을 첨가하지 않은 순수 무향 포뮬러입니다. 락스처럼 찌르는 냄새가 없어 창문 없는 욕실에서도 편안하게 사용하실 수 있습니다.',
  },
  {
    q: '분사 후 얼마나 방치해야 하나요?',
    a: '가벼운 물때는 분사 후 2~3분, 오래 묵은 석회질 물때는 5분 정도 불린 후 물로 헹구어 주시면 가장 효과적입니다.',
  },
  {
    q: '실리콘에 생긴 검은 곰팡이도 지워지나요?',
    a: '본 제품은 수전과 세면대에 생기는 칼슘·석회·물때 세정에 특화된 약산성 에코 세정제입니다. 깊게 박힌 실리콘 곰팡이는 곰팡이 전용 젤 사용을 권장합니다.',
  },
];
