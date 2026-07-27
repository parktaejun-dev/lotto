import { NextResponse } from "next/server";
import { getRecommendedItemForLoss } from "@/lib/coupangApi";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const netLoss = parseInt(searchParams.get("net_loss") || "100000", 10);
  const recommendation = await getRecommendedItemForLoss(netLoss);
  return NextResponse.json(recommendation);
}
