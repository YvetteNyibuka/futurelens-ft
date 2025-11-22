/**
 * Health Trends API Route
 * GET /api/analytics/trends
 */

import { NextRequest, NextResponse } from "next/server";
import HealthAnalyticsService from "@/services/fullHealthAnalyticsService";

export async function GET(request: NextRequest) {
  try {
    await HealthAnalyticsService.initialize();

    const searchParams = request.nextUrl.searchParams;
    const indicator = searchParams.get("indicator") || "childMortality";
    const years = searchParams.get("years")
      ? parseInt(searchParams.get("years")!)
      : 28;

    const trendAnalysis = HealthAnalyticsService.getTrendAnalysis(
      indicator,
      years
    );

    return NextResponse.json({
      success: true,
      data: trendAnalysis,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Trends API Error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to get trend analysis",
        details: process.env.NODE_ENV === "development" ? error : undefined,
      },
      {
        status: 500,
      }
    );
  }
}
