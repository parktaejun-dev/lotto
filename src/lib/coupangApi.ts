import crypto from "crypto";

const DEFAULT_ACCESS_KEY = "6c629849-5e2c-47b2-b67a-1849845229d6";
const DEFAULT_SECRET_KEY = "cc05478e499ce2ef7a7981147a8ce75de6f59142";
const DEFAULT_SUB_ID = "lotto_app";

function getCoupangAuthHeader(method: string, path: string, queryString: string = ""): string {
  const accessKey = process.env.COUPANG_ACCESS_KEY || DEFAULT_ACCESS_KEY;
  const secretKey = process.env.COUPANG_SECRET_KEY || DEFAULT_SECRET_KEY;

  const now = new Date();
  const yy = now.getUTCFullYear().toString().slice(-2);
  const mm = String(now.getUTCMonth() + 1).padStart(2, "0");
  const dd = String(now.getUTCDate()).padStart(2, "0");
  const hh = String(now.getUTCHours()).padStart(2, "0");
  const min = String(now.getUTCMinutes()).padStart(2, "0");
  const ss = String(now.getUTCSeconds()).padStart(2, "0");
  const signedDate = `${yy}${mm}${dd}T${hh}${min}${ss}Z`;

  const message = signedDate + method + path + (queryString ? queryString : "");
  const signature = crypto.createHmac("sha256", secretKey).update(message).digest("hex");

  return `CEA algorithm=HmacSHA256, access-key=${accessKey}, signed-date=${signedDate}, signature=${signature}`;
}

export interface CoupangLiveProduct {
  title: string;
  subtitle: string;
  priceText: string;
  imageUrl: string;
  linkUrl: string;
  badge: string;
  isLiveApi: boolean;
}

/**
 * Searches live Coupang products by keyword and returns exact product detail page affiliate links
 */
export async function searchLiveCoupangProduct(keyword: string, targetPrice: number): Promise<CoupangLiveProduct | null> {
  const accessKey = process.env.COUPANG_ACCESS_KEY || DEFAULT_ACCESS_KEY;
  const secretKey = process.env.COUPANG_SECRET_KEY || DEFAULT_SECRET_KEY;
  const subId = process.env.COUPANG_SUB_ID || DEFAULT_SUB_ID;

  if (!accessKey || !secretKey) return null;

  const path = "/v2/providers/affiliate_open_api/apis/openapi/v1/products/search";
  const encodedKeyword = encodeURIComponent(keyword);
  const queryString = `keyword=${encodedKeyword}&limit=10&subId=${encodeURIComponent(subId)}`;
  const authHeader = getCoupangAuthHeader("GET", path, queryString);

  try {
    const res = await fetch(`https://api-gateway.coupang.com${path}?${queryString}`, {
      method: "GET",
      headers: {
        Authorization: authHeader,
        "Content-Type": "application/json;charset=UTF-8",
      },
      cache: "no-store",
    });

    if (res.ok) {
      const data = await res.json();
      if (data.rCode === "0" && data.data?.productData?.length > 0) {
        const products = data.data.productData;
        // Find product closest to targetPrice
        let bestProduct = products[0];
        let minDiff = Math.abs(bestProduct.productPrice - targetPrice);

        for (const prod of products) {
          const diff = Math.abs(prod.productPrice - targetPrice);
          if (diff < minDiff) {
            minDiff = diff;
            bestProduct = prod;
          }
        }

        return {
          title: bestProduct.productName,
          subtitle: `날린 금액(-${targetPrice.toLocaleString()}원)으로 구매 가능한 실제 쿠팡 상품입니다.`,
          priceText: `${bestProduct.productPrice.toLocaleString()}원`,
          imageUrl: bestProduct.productImage,
          linkUrl: bestProduct.productUrl, // Direct Product Detail Page Affiliate Link!
          badge: bestProduct.isRocket ? "로켓배송" : "쿠팡추천",
          isLiveApi: true,
        };
      }
    }
  } catch (err) {
    console.error("Coupang Live Product Search API error:", err);
  }

  return null;
}

/**
 * Converts standard Coupang URL into tracking affiliate link via Coupang Partners Open API
 */
export async function convertToDeeplink(targetUrl: string): Promise<string> {
  const accessKey = process.env.COUPANG_ACCESS_KEY || DEFAULT_ACCESS_KEY;
  const secretKey = process.env.COUPANG_SECRET_KEY || DEFAULT_SECRET_KEY;
  const subId = process.env.COUPANG_SUB_ID || DEFAULT_SUB_ID;

  if (!accessKey || !secretKey) return targetUrl;

  const path = "/v2/providers/affiliate_open_api/apis/openapi/v1/deeplink";
  const authHeader = getCoupangAuthHeader("POST", path);

  try {
    const res = await fetch(`https://api-gateway.coupang.com${path}`, {
      method: "POST",
      headers: {
        Authorization: authHeader,
        "Content-Type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify({
        coupangUrls: [targetUrl],
        subId: subId,
      }),
      cache: "no-store",
    });

    if (res.ok) {
      const data = await res.json();
      if (data.rCode === "0" && data.data && data.data[0]?.shortenUrl) {
        return data.data[0].shortenUrl;
      }
    }
  } catch (err) {
    console.error("Coupang Deeplink API error:", err);
  }

  return targetUrl;
}

export async function getRecommendedItemForLoss(netLoss: number): Promise<CoupangLiveProduct> {
  let searchKeyword = "무선이어폰";
  let fallbackTitle = "노이즈 캔슬링 무선 이어폰";
  let fallbackImg = "/products/earbuds.png";

  if (netLoss <= 15000) {
    searchKeyword = "스타벅스 기프티콘";
    fallbackTitle = "스타벅스 아메리카노 & 디저트 세트";
    fallbackImg = "/products/chicken.png";
  } else if (netLoss <= 25000) {
    searchKeyword = "치킨 기프티콘";
    fallbackTitle = "치킨 & 콜라 모바일 교환권 세트";
    fallbackImg = "/products/chicken.png";
  } else if (netLoss <= 35000) {
    searchKeyword = "외식상품권";
    fallbackTitle = "외식 상품권 3만 원권";
    fallbackImg = "/products/chicken.png";
  } else if (netLoss <= 60000) {
    searchKeyword = "스마트밴드";
    fallbackTitle = "스마트 피트니스 워치 밴드";
    fallbackImg = "/products/smartwatch.png";
  } else if (netLoss <= 85000) {
    searchKeyword = "블루투스 스피커";
    fallbackTitle = "고음질 포터블 블루투스 스피커";
    fallbackImg = "/products/earbuds.png";
  } else if (netLoss <= 125000) {
    searchKeyword = "스마트워치";
    fallbackTitle = "프리미엄 헬스케어 스마트워치";
    fallbackImg = "/products/smartwatch.png";
  } else if (netLoss <= 175000) {
    searchKeyword = "무선이어폰";
    fallbackTitle = "무선 노이즈 캔슬링 이어폰";
    fallbackImg = "/products/earbuds.png";
  } else if (netLoss <= 250000) {
    searchKeyword = "무선헤드폰";
    fallbackTitle = "프리미엄 무선 노이즈 캔슬링 헤드폰";
    fallbackImg = "/products/earbuds.png";
  } else if (netLoss <= 400000) {
    searchKeyword = "닌텐도 스위치";
    fallbackTitle = "닌텐도 스위치 OLED 비디오 콘솔";
    fallbackImg = "/products/tablet.png";
  } else if (netLoss <= 600000) {
    searchKeyword = "한우 선물세트";
    fallbackTitle = "1++ 등급 명품 한우 선물 세트";
    fallbackImg = "/products/hanwoo.png";
  } else if (netLoss <= 850000) {
    searchKeyword = "로봇청소기";
    fallbackTitle = "프리미엄 로봇청소기 & 헤파 공기청정기";
    fallbackImg = "/products/tablet.png";
  } else if (netLoss <= 1250000) {
    searchKeyword = "태블릿PC";
    fallbackTitle = "프리미엄 12.9인치 대화면 태블릿 PC";
    fallbackImg = "/products/tablet.png";
  } else if (netLoss <= 1750000) {
    searchKeyword = "자급제 스마트폰";
    fallbackTitle = "최신 플래그십 스마트폰 256GB";
    fallbackImg = "/products/macbook.png";
  } else if (netLoss <= 2500000) {
    searchKeyword = "65인치 TV";
    fallbackTitle = "65인치 4K OLED 프리미엄 스마트 TV";
    fallbackImg = "/products/macbook.png";
  } else if (netLoss <= 3500000) {
    searchKeyword = "안마의자";
    fallbackTitle = "최고급 헬스케어 전신 안마의자";
    fallbackImg = "/products/macbook.png";
  } else {
    searchKeyword = "맥북프로";
    fallbackTitle = "M3 Max 맥북 프로 16인치";
    fallbackImg = "/products/macbook.png";
  }

  // 1. Try Live Coupang Product Detail Page Search API
  const liveProduct = await searchLiveCoupangProduct(searchKeyword, netLoss);
  if (liveProduct) {
    return liveProduct;
  }

  // 2. Fallback
  const rawUrl = `https://www.coupang.com/np/search?q=${encodeURIComponent(searchKeyword)}`;
  const deeplink = await convertToDeeplink(rawUrl);

  return {
    title: fallbackTitle,
    subtitle: `날린 금액(-${netLoss.toLocaleString()}원)에 100% 매칭되는 상품입니다.`,
    priceText: netLoss > 0 ? `${netLoss.toLocaleString()}원 상당` : "당첨 수익 달성",
    imageUrl: fallbackImg,
    linkUrl: deeplink,
    badge: "로켓배송",
    isLiveApi: false,
  };
}
