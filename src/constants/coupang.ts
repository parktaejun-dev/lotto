export interface CoupangItem {
  minLoss: number;
  maxLoss: number;
  title: string;
  subtitle: string;
  priceText: string;
  imageUrl: string;
  linkUrl: string;
  badge: string;
}

export const COUPANG_ITEMS: CoupangItem[] = [
  // 1. ~ 15,000 KRW (~1만 원)
  {
    minLoss: 0,
    maxLoss: 15000,
    title: "스타벅스 아메리카노 & 디저트 세트",
    subtitle: "달콤한 디저트 세트로 마음을 달랠 수 있는 금액입니다.",
    priceText: "10,000원 상당",
    imageUrl: "/products/chicken.png",
    linkUrl: "https://www.coupang.com/np/search?q=%EC%8A%A4%ED%83%80%EB%B2%85%EC%8A%A4+%EA%B8%B0%ED%94%84%ED%8B%B0%EC%BD%98",
    badge: "로켓선물",
  },
  // 2. 15,000 ~ 25,000 KRW (~2만 원)
  {
    minLoss: 15000,
    maxLoss: 25000,
    title: "치킨 & 콜라 모바일 교환권 세트",
    subtitle: "오늘 밤 풍성한 치킨 한 마리를 야식으로 즐길 수 있는 금액입니다.",
    priceText: "20,000원 상당",
    imageUrl: "/products/chicken.png",
    linkUrl: "https://www.coupang.com/np/search?q=%EC%B9%98%ED%82%A8+%EA%B8%B0%ED%94%84%ED%8B%B0%EC%BD%98",
    badge: "로켓선물",
  },
  // 3. 25,000 ~ 35,000 KRW (~3만 원)
  {
    minLoss: 25000,
    maxLoss: 35000,
    title: "외식 외식상품권 3만 원권",
    subtitle: "맛있는 식사를 넉넉하게 즐길 수 있는 외식 상품권 금액입니다.",
    priceText: "30,000원 상당",
    imageUrl: "/products/chicken.png",
    linkUrl: "https://www.coupang.com/np/search?q=%EC%99%B8%EC%8B%9D+%EC%85%9B%ED%95%91+%EC%83%81%ED%92%88%EA%B6%8C",
    badge: "로켓선물",
  },
  // 4. 35,000 ~ 60,000 KRW (~5만 원)
  {
    minLoss: 35000,
    maxLoss: 60000,
    title: "스마트 피트니스 워치 밴드",
    subtitle: "내 운동과 건강 지수를 측정하는 가성비 스마트 밴드 금액입니다.",
    priceText: "50,000원 상당",
    imageUrl: "/products/smartwatch.png",
    linkUrl: "https://www.coupang.com/np/search?q=%EC%8A%A4%EB%A7%88%ED%8A%B8%EB%B1%B9%EB%93%9C",
    badge: "로켓배송",
  },
  // 5. 60,000 ~ 85,000 KRW (~7만 원)
  {
    minLoss: 60000,
    maxLoss: 85000,
    title: "고음질 포터블 블루투스 스피커",
    subtitle: "풍부한 음질로 음악을 감상하는 블루투스 스피커 금액입니다.",
    priceText: "70,000원 상당",
    imageUrl: "/products/earbuds.png",
    linkUrl: "https://www.coupang.com/np/search?q=%EB%B8%94%EB%A3%A8%ED%88%AC%EC%8A%A4+%EC%8A%A4%ED%94%BC%EC%BB%A4",
    badge: "로켓배송",
  },
  // 6. 85,000 ~ 125,000 KRW (~10만 원 - 10만 원 전용!)
  {
    minLoss: 85000,
    maxLoss: 125000,
    title: "프리미엄 헬스케어 스마트워치",
    subtitle: "심박수와 수면을 정밀 측정하는 고급 스마트워치 실물 금액입니다.",
    priceText: "100,000원 상당",
    imageUrl: "/products/smartwatch.png",
    linkUrl: "https://www.coupang.com/np/search?q=%EC%8A%A4%EB%A7%88%ED%8A%B8%EC%9B%8C%EC%B9%98",
    badge: "로켓배송",
  },
  // 7. 125,000 ~ 175,000 KRW (~15만 원)
  {
    minLoss: 125000,
    maxLoss: 175000,
    title: "무선 노이즈 캔슬링 이어폰",
    subtitle: "몰입감 높은 소음을 차단해 주는 고급 무선 이어폰 금액입니다.",
    priceText: "150,000원 상당",
    imageUrl: "/products/earbuds.png",
    linkUrl: "https://www.coupang.com/np/search?q=%EB%85%B8%EC%9D%B4%EC%A6%88%EC%BA%94%EC%8A%AC%EB%A7%81+%EB%AC%B4%EC%84%A0%EC%9D%B4%EC%96%B4%ED%F6",
    badge: "로켓배송",
  },
  // 8. 175,000 ~ 250,000 KRW (~20만 원)
  {
    minLoss: 175000,
    maxLoss: 250000,
    title: "프리미엄 무선 노이즈 캔슬링 헤드폰",
    subtitle: "최상급 음질을 자랑하는 프리미엄 무선 헤드폰 금액입니다.",
    priceText: "200,000원 상당",
    imageUrl: "/products/earbuds.png",
    linkUrl: "https://www.coupang.com/np/search?q=%EB%AC%B4%EC%84%A0+%ED%97%A4%EB%93%9C%ED%8F%B0",
    badge: "로켓배송",
  },
  // 9. 250,000 ~ 400,000 KRW (~30만 원)
  {
    minLoss: 250000,
    maxLoss: 400000,
    title: "닌텐도 스위치 OLED 비디오 콘솔",
    subtitle: "온 가족이 함께 즐기는 고화질 게이밍 콘솔 금액입니다.",
    priceText: "300,000원 상당",
    imageUrl: "/products/tablet.png",
    linkUrl: "https://www.coupang.com/np/search?q=%EB%8B%8C%ED%85%90%EB%8F%84+%EC%8A%A4%EC%9C%84%EC%B9%98+OLED",
    badge: "로켓배송",
  },
  // 10. 400,000 ~ 600,000 KRW (~50만 원)
  {
    minLoss: 400000,
    maxLoss: 600000,
    title: "1++ 등급 명품 한우 선물 세트",
    subtitle: "최상급 한우 구이용 세트로 입호강을 할 수 있는 금액입니다.",
    priceText: "500,000원 상당",
    imageUrl: "/products/hanwoo.png",
    linkUrl: "https://www.coupang.com/np/search?q=%ED%95%9C%EC%9A%B0+%EC%84%A0%EB%AC%BC%EC%84%B8%ED%8A%B8",
    badge: "로켓프레시",
  },
  // 11. 600,000 ~ 850,000 KRW (~70만 원)
  {
    minLoss: 600000,
    maxLoss: 850000,
    title: "프리미엄 로봇청소기 & 헤파 공기청정기",
    subtitle: "집안을 먼지 없이 관리해 주는 프리미엄 가전 금액입니다.",
    priceText: "700,000원 상당",
    imageUrl: "/products/tablet.png",
    linkUrl: "https://www.coupang.com/np/search?q=%EB%A1%9C%EB%B4%87%EC%B2%AD%EC%86%8C%EA%B8%B0",
    badge: "로켓배송",
  },
  // 12. 850,000 ~ 1,250,000 KRW (~100만 원)
  {
    minLoss: 850000,
    maxLoss: 1250000,
    title: "프리미엄 12.9인치 대화면 태블릿 PC",
    subtitle: "필기와 영상 감상에 탁월한 고급 스마트 태블릿 금액입니다.",
    priceText: "1,000,000원 상당",
    imageUrl: "/products/tablet.png",
    linkUrl: "https://www.coupang.com/np/search?q=%ED%83%9C%EB%B8%94%EB%A6%BF+PC",
    badge: "로켓배송",
  },
  // 13. 1,250,000 ~ 1,750,000 KRW (~150만 원)
  {
    minLoss: 1250000,
    maxLoss: 1750000,
    title: "최신 플래그십 스마트폰 256GB",
    subtitle: "최고급 카메라와 성능을 갖춘 최신 플래그십 스마트폰 금액입니다.",
    priceText: "1,500,000원 상당",
    imageUrl: "/products/macbook.png",
    linkUrl: "https://www.coupang.com/np/search?q=%EC%8A%A4%EB%A7%88%ED%8A%B8%ED%8F%B0+%ED%94%8C%EB%9E%98%EA%B7%B8%EC%8B%AD",
    badge: "로켓배송",
  },
  // 14. 1,750,000 ~ 2,500,000 KRW (~200만 원)
  {
    minLoss: 1750000,
    maxLoss: 2500000,
    title: "65인치 4K OLED 프리미엄 스마트 TV",
    subtitle: "영화관 같은 대화면과 압도적 화질의 프리미엄 TV 금액입니다.",
    priceText: "2,000,000원 상당",
    imageUrl: "/products/macbook.png",
    linkUrl: "https://www.coupang.com/np/search?q=65%EC%9D%B8%EC%B9%98+TV",
    badge: "로켓설치",
  },
  // 15. 2,500,000 ~ 3,500,000 KRW (~300만 원)
  {
    minLoss: 2500000,
    maxLoss: 3500000,
    title: "최고급 헬스케어 전신 안마의자",
    subtitle: "하루의 피로를 풀어주는 최상급 전신 안마의자 금액입니다.",
    priceText: "3,000,000원 상당",
    imageUrl: "/products/macbook.png",
    linkUrl: "https://www.coupang.com/np/search?q=%EC%95%88%EB%A7%88%EC%9D%98%EC%9E%90",
    badge: "로켓설치",
  },
  // 16. 3,500,000 KRW 이상 (400만 원 이상)
  {
    minLoss: 3500000,
    maxLoss: Infinity,
    title: "M3 Max 맥북 프로 16인치",
    subtitle: "최고 스펙을 갖춘 전문가용 초고성능 맥북 프로 금액입니다.",
    priceText: "4,500,000원 상당",
    imageUrl: "/products/macbook.png",
    linkUrl: "https://www.coupang.com/np/search?q=%EB%A7%A5%EB%B6%81%ED%94%84%EB%A1%9C+16",
    badge: "로켓배송",
  },
];

export function getCoupangItemByLoss(netLoss: number): CoupangItem {
  const loss = Math.max(0, netLoss);
  const matched = COUPANG_ITEMS.find((item) => loss >= item.minLoss && loss < item.maxLoss);
  const baseItem = matched || COUPANG_ITEMS[COUPANG_ITEMS.length - 1];

  return {
    ...baseItem,
    priceText: loss > 0 ? `${loss.toLocaleString()}원 상당` : "당첨 수익 달성",
  };
}
