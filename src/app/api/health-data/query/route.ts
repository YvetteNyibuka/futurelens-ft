/**
 * Health Data Query API Route
 * GET /api/health-data/query
 */

import { NextRequest, NextResponse } from "next/server";
import HealthAnalyticsService from "@/services/fullHealthAnalyticsService";

export async function GET(request: NextRequest) {
  try {
    // Initialize the analytics service
    await HealthAnalyticsService.initialize();

    const searchParams = request.nextUrl.searchParams;

    // Parse query parameters
    const query = {
      category: searchParams.get("category") || undefined,
      year: searchParams.get("year")
        ? parseInt(searchParams.get("year")!)
        : undefined,
      province: searchParams.get("province") || undefined,
      indicator: searchParams.get("indicator") || undefined,
      limit: searchParams.get("limit")
        ? parseInt(searchParams.get("limit")!)
        : 100,
      offset: searchParams.get("offset")
        ? parseInt(searchParams.get("offset")!)
        : 0,
      aggregation:
        (searchParams.get("aggregation") as
          | "sum"
          | "avg"
          | "count"
          | "min"
          | "max") || undefined,
      groupBy:
        (searchParams.get("groupBy") as "year" | "province" | "category") ||
        undefined,
    };

    // Query the data
    const result = HealthAnalyticsService.queryData(query);

    return NextResponse.json({
      success: true,
      query: query,
      result: result,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Query API Error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to query health data",
        details: process.env.NODE_ENV === "development" ? error : undefined,
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await HealthAnalyticsService.initialize();

    const body = await request.json();
    const { filters, aggregation, groupBy } = body;

    const query = {
      ...filters,
      aggregation,
      groupBy,
    };

    const result = HealthAnalyticsService.queryData(query);

    return NextResponse.json({
      success: true,
      query: query,
      result: result,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Query POST API Error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to process query",
        details: process.env.NODE_ENV === "development" ? error : undefined,
      },
      {
        status: 500,
      }
    );
  }
}
