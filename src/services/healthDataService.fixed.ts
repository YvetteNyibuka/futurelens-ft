// Frontend Health Data Service - Simple Fixed Version
// This file provides the corrected functions for the health data service

// Generic method to fetch data by type and year - FIXED VERSION
export async function getHealthDataByType(
  dataType: string,
  year: number | string,
  options?: {
    page?: number;
    limit?: number;
    province?: string;
  }
): Promise<any> {
  try {
    const API_BASE_URL =
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";
    const { page = 1, limit = 100, province } = options || {};
    const offset = (page - 1) * limit;
    const yearStr = year.toString();

    // Directly use the dataType and year format that backend expects
    // The backend route /:dataType/:year will handle the mapping internally
    const url = `${API_BASE_URL}/health-data/${dataType}/${yearStr}`;

    const params = new URLSearchParams({
      limit: limit.toString(),
      offset: offset.toString(),
    });

    if (province) {
      params.append("province", province);
    }

    console.log(`🚀 Fetching data from: ${url}?${params.toString()}`);

    const response = await fetch(`${url}?${params.toString()}`);

    if (!response.ok) {
      const errorData = await response.json();
      console.error("❌ API Error:", errorData);
      throw new Error(
        `HTTP ${response.status}: ${errorData.error || "Unknown error"}`
      );
    }

    const result = await response.json();

    if (!result.success) {
      throw new Error(result.error || "Failed to fetch data");
    }

    const backendData = result.data;
    return {
      data: backendData.records,
      pagination: {
        page,
        limit,
        total: backendData.pagination.total,
        pages: Math.ceil(backendData.pagination.total / limit),
        hasNext: backendData.pagination.has_more,
        hasPrev: page > 1,
      },
      metadata: backendData.metadata,
    };
  } catch (error: any) {
    console.error(`❌ Failed to fetch ${dataType} data:`, error);
    throw error;
  }
}

// Get available data types and years - FIXED VERSION
export async function getAvailableDataTypes(): Promise<{
  types: string[];
  years: string[];
  combinations: {
    type: string;
    year: string;
    fullType: string;
    count: number;
  }[];
}> {
  try {
    const API_BASE_URL =
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

    console.log(
      "🚀 Fetching available data types from:",
      `${API_BASE_URL}/health-data/available`
    );

    const response = await fetch(`${API_BASE_URL}/health-data/available`);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const result = await response.json();

    if (!result.success) {
      throw new Error(result.error || "Failed to fetch available data");
    }

    const availableYears = result.data.available_years || [];
    const availableTypes = result.data.data_types || [];

    // Create combinations from the available types (extract base type)
    const combinations: {
      type: string;
      year: string;
      fullType: string;
      count: number;
    }[] = availableTypes.map((fullType: string) => {
      // Parse fullType like "household_2000" to extract "household" and "2000"
      const parts = fullType.split("_");
      const year = parts[parts.length - 1];
      const type = parts.slice(0, -1).join("_");

      return {
        type,
        year,
        fullType,
        count: 0, // We don't have count info from this endpoint
      };
    });

    // Extract unique base types
    const uniqueTypes: string[] = [...new Set(combinations.map((c) => c.type))];

    return {
      types: uniqueTypes,
      years: availableYears,
      combinations,
    };
  } catch (error: any) {
    console.error("❌ Failed to fetch available data types:", error);
    // Return fallback data
    return {
      types: ["household", "person", "child", "women", "men"],
      years: ["1992", "2000", "2005", "2008", "2010", "2014-2015", "2019-2020"],
      combinations: [],
    };
  }
}
