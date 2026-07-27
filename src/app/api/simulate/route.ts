import { NextResponse } from "next/server";
import { runLottoSimulation, runInfinityLottoSimulation } from "@/lib/lottoEngine";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { numbers, count = 100, is_infinity_mode = false } = body;

    if (!Array.isArray(numbers) || numbers.length !== 6) {
      return NextResponse.json({ detail: "Numbers must contain 6 integers" }, { status: 400 });
    }

    const simResult = is_infinity_mode
      ? runInfinityLottoSimulation(numbers)
      : runLottoSimulation(numbers, count);

    return NextResponse.json({
      simulation: simResult,
      global_stats: { total_spent: simResult.total_spent, total_draws: simResult.count },
    });
  } catch (error: any) {
    return NextResponse.json({ detail: error.message || "Simulation error" }, { status: 500 });
  }
}
