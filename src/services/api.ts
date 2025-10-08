import api from "@/lib/api";
import type {
  ApiResponse,
  HealthIndicator,
  Demographics,
  Vaccination,
  TrendAnalysis,
  HealthScore,
  GeographicalInsights,
  EarlyWarningAlert,
  Comprehensive28YearAnalysis,
} from "@/types/health";

// Health Indicators API
export const healthIndicatorsApi = {
  getAll: () => api.get<ApiResponse<HealthIndicator[]>>("/health-indicators"),

  getById: (id: string) =>
    api.get<ApiResponse<HealthIndicator>>(`/health-indicators/${id}`),

  getDashboardSummary: () =>
    api.get<ApiResponse<any>>("/health-indicators/dashboard"),

  getTrends: (params?: { indicator?: string; years?: number }) =>
    api.get<ApiResponse<TrendAnalysis>>("/health-indicators/trends", {
      params,
    }),

  getComparison: (params: { indicators: string[]; years?: number }) =>
    api.get<ApiResponse<any>>("/health-indicators/comparison", { params }),

  getByCategory: (category: string) =>
    api.get<ApiResponse<HealthIndicator[]>>(
      `/health-indicators/category?category=${category}`
    ),
};

// Analytics API
export const analyticsApi = {
  getDashboard: () => api.get<ApiResponse<any>>("/analytics/dashboard"),

  getHealthTrends: (params: { indicatorName: string; years?: number }) =>
    api.get<ApiResponse<TrendAnalysis>>("/analytics/health-trends", { params }),

  getHealthScore: (params?: { province?: string; district?: string }) =>
    api.get<ApiResponse<HealthScore>>("/analytics/health-score", { params }),

  getGeographicalInsights: () =>
    api.get<ApiResponse<GeographicalInsights>>(
      "/analytics/geographical-insights"
    ),

  getEarlyWarnings: () =>
    api.get<ApiResponse<EarlyWarningAlert>>("/analytics/early-warnings"),

  getFacilityCoverage: (params?: { province?: string; district?: string }) =>
    api.get<ApiResponse<any>>("/analytics/facility-coverage", { params }),

  getOutbreakRisk: (params?: { province?: string; district?: string }) =>
    api.get<ApiResponse<any>>("/analytics/outbreak-risk", { params }),

  getDataQuality: () => api.get<ApiResponse<any>>("/analytics/data-quality"),
};

// Progress/28-Year Analysis API
export const progressApi = {
  getRwandaReport: () => api.get<ApiResponse<any>>("/progress/rwanda-report"),

  getProvinceProgress: (province: string) =>
    api.get<ApiResponse<any>>(`/progress/province/${province}`),

  getIndicatorComparison: (indicator: string) =>
    api.get<ApiResponse<any>>(`/progress/indicator/${indicator}`),

  getTopAchievements: () => api.get<ApiResponse<any>>("/progress/achievements"),

  getAreasOfConcern: () => api.get<ApiResponse<any>>("/progress/concerns"),

  getMDGProgress: () => api.get<ApiResponse<any>>("/progress/mdg-progress"),

  getCategoryProgress: (category: string) =>
    api.get<ApiResponse<any>>(`/progress/category/${category}`),
};

// Data Import API
export const dataImportApi = {
  getStatus: () => api.get<ApiResponse<any>>("/data-import/status"),

  importDHS: () => api.post<ApiResponse<any>>("/data-import/dhs"),

  importDHS2020: () => api.post<ApiResponse<any>>("/data-import/dhs-2020"),

  importHousehold: () => api.post<ApiResponse<any>>("/data-import/household"),

  importChildHealth: () =>
    api.post<ApiResponse<any>>("/data-import/child-health"),

  importMaternalHealth: () =>
    api.post<ApiResponse<any>>("/data-import/maternal-health"),
};

// Comprehensive 28-Year Analysis (Custom endpoint)
export const comprehensive28YearApi = {
  getFullAnalysis: async (): Promise<Partial<Comprehensive28YearAnalysis>> => {
    // This would be a custom endpoint that returns the comprehensive analysis
    // For now, we'll use the existing endpoints to build it
    const [transformationStory, trends, geographical] = await Promise.all([
      progressApi.getRwandaReport(),
      analyticsApi.getHealthTrends({ indicatorName: "Maternal Mortality" }),
      analyticsApi.getGeographicalInsights(),
    ]);

    // Combine the data into the comprehensive format
    // This is a simplified version - you might want to create a dedicated backend endpoint
    return {
      transformationStory: transformationStory.data?.data || {
        title: "Rwanda Health Transformation",
        period: "1992-2020",
        executiveSummary: [],
        keyFindings: {
          transformationalAchievements: [],
          healthOutcomeImprovements: [],
          systemStrengtheningWins: [],
        },
        developmentStory: {},
        policyImpacts: [],
        provinceSpotlights: [],
        recommendations: [],
      },
      trendAnalysis: {
        vaccination: [],
        maternalHealth: [],
      },
      phaseAnalysis: { phases: [] },
      benchmarkComparison: { regional: [], global: [] },
      metadata: {
        analysisDate: new Date().toISOString(),
        dataYearsSpanned: 28,
        totalIndicatorsAnalyzed: 0,
        dataSources: ["NISR DHS"],
      },
    };
  },
};

// Utility functions for common API patterns
export const apiUtils = {
  // Handle province-specific queries
  getProvinceData: (province: string) =>
    Promise.all([
      analyticsApi.getHealthScore({ province }),
      progressApi.getProvinceProgress(province),
      healthIndicatorsApi.getAll(), // Filter client-side by province
    ]),

  // Get dashboard data
  getDashboardData: () =>
    Promise.all([
      analyticsApi.getDashboard(),
      analyticsApi.getGeographicalInsights(),
      analyticsApi.getEarlyWarnings(),
      healthIndicatorsApi.getDashboardSummary(),
    ]),

  // Get trend comparison data
  getTrendComparison: (indicators: string[], years?: number) =>
    Promise.all(
      indicators.map((indicator) =>
        analyticsApi.getHealthTrends({ indicatorName: indicator, years })
      )
    ),
};
