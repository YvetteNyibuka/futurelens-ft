import axios from "axios";

// Backend API configuration
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// Types for API responses
export interface HealthIndicator {
  _id: string;
  indicatorName: string;
  category: string;
  value: number;
  unit: string;
  location: {
    level: string;
    province?: string;
    district?: string;
  };
  timeframe: {
    year: number;
    quarter?: number;
    month?: number;
  };
  source: string;
  trend: "improving" | "declining" | "stable" | "unknown";
  dataQuality: "high" | "medium" | "low";
  lastUpdated: string;
}

export interface VaccinationData {
  _id: string;
  vaccineName: string;
  location: {
    province?: string;
    district?: string;
  };
  coverage: {
    coverageRate: number;
    totalVaccinated: number;
  };
  reportingPeriod: {
    year: number;
  };
}

export interface DemographicsData {
  _id: string;
  location: {
    level: string;
    province?: string;
  };
  population: {
    total: number;
    male: number;
    female: number;
  };
  healthMetrics: {
    lifeExpectancy: {
      overall: number;
      male: number;
      female: number;
    };
    infantMortalityRate: number;
    under5MortalityRate: number;
    maternalMortalityRate: number;
  };
  dataYear: number;
}

export interface TrendAnalysis {
  indicator: string;
  startValue: number;
  endValue: number;
  changePercent: number;
  trend: string;
  timespan: string;
}

export interface ProgressReport {
  title: string;
  summary: string;
  keyAchievements: string[];
  trends: TrendAnalysis[];
  recommendations: string[];
}

// API Service Class
export class HealthDataService {
  // Fetch all health indicators
  static async getHealthIndicators(filters?: {
    category?: string;
    province?: string;
    year?: number;
    limit?: number;
  }): Promise<HealthIndicator[]> {
    try {
      const response = await apiClient.get("/health-indicators", {
        params: filters,
      });
      return response.data.data || response.data || [];
    } catch (error) {
      console.error("Failed to fetch health indicators:", error);
      return [];
    }
  }

  // Fetch vaccination data
  static async getVaccinationData(filters?: {
    province?: string;
    year?: number;
  }): Promise<VaccinationData[]> {
    try {
      const response = await apiClient.get("/vaccination", { params: filters });
      return response.data.data || response.data || [];
    } catch (error) {
      console.error("Failed to fetch vaccination data:", error);
      return [];
    }
  }

  // Fetch demographics data
  static async getDemographicsData(filters?: {
    province?: string;
    year?: number;
  }): Promise<DemographicsData[]> {
    try {
      const response = await apiClient.get("/demographics", {
        params: filters,
      });
      return response.data.data || response.data || [];
    } catch (error) {
      console.error("Failed to fetch demographics data:", error);
      return [];
    }
  }

  // Fetch trend analysis
  static async getTrendAnalysis(): Promise<TrendAnalysis[]> {
    try {
      const response = await apiClient.get("/analytics/trends");
      return response.data.trends || [];
    } catch (error) {
      console.error("Failed to fetch trend analysis:", error);
      return [];
    }
  }

  // Fetch progress report
  static async getProgressReport(): Promise<ProgressReport | null> {
    try {
      const response = await apiClient.get("/analytics/progress");
      return response.data || null;
    } catch (error) {
      console.error("Failed to fetch progress report:", error);
      return null;
    }
  }

  // Fetch dashboard statistics
  static async getDashboardStats(): Promise<any> {
    try {
      const response = await apiClient.get("/analytics/dashboard-stats");
      return response.data || {};
    } catch (error) {
      console.error("Failed to fetch dashboard stats:", error);
      return {};
    }
  }

  // Fetch provincial health data
  static async getProvincialHealth(): Promise<any[]> {
    try {
      const response = await apiClient.get("/analytics/provincial-health");
      return response.data.data || [];
    } catch (error) {
      console.error("Failed to fetch provincial health data:", error);
      return [];
    }
  }

  // Get real-time health updates
  static async getRealTimeUpdates(): Promise<any[]> {
    try {
      const response = await apiClient.get("/analytics/real-time");
      return response.data.updates || [];
    } catch (error) {
      console.error("Failed to fetch real-time updates:", error);
      return [];
    }
  }

  // Fetch child mortality trends
  static async getChildMortalityTrends(): Promise<any[]> {
    try {
      const response = await apiClient.get("/analytics/child-mortality-trends");
      return response.data.trends || [];
    } catch (error) {
      console.error("Failed to fetch child mortality trends:", error);
      // Fallback data for demo
      return [
        { year: 1992, rate: 151 },
        { year: 2000, rate: 120 },
        { year: 2010, rate: 55 },
        { year: 2020, rate: 32.1 },
      ];
    }
  }

  // Upload data file
  static async uploadDataFile(file: File): Promise<any> {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await apiClient.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data;
    } catch (error) {
      console.error("Failed to upload file:", error);
      throw error;
    }
  }

  // Health check
  static async healthCheck(): Promise<boolean> {
    try {
      const response = await apiClient.get("/health");
      return response.status === 200;
    } catch (error) {
      return false;
    }
  }
}

// React Query hooks for data fetching
export const healthDataQueries = {
  healthIndicators: (filters?: any) => ({
    queryKey: ["healthIndicators", filters],
    queryFn: () => HealthDataService.getHealthIndicators(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchInterval: 10 * 60 * 1000, // 10 minutes
  }),

  vaccinationData: (filters?: any) => ({
    queryKey: ["vaccinationData", filters],
    queryFn: () => HealthDataService.getVaccinationData(filters),
    staleTime: 5 * 60 * 1000,
  }),

  demographicsData: (filters?: any) => ({
    queryKey: ["demographicsData", filters],
    queryFn: () => HealthDataService.getDemographicsData(filters),
    staleTime: 5 * 60 * 1000,
  }),

  trendAnalysis: () => ({
    queryKey: ["trendAnalysis"],
    queryFn: () => HealthDataService.getTrendAnalysis(),
    staleTime: 10 * 60 * 1000,
  }),

  progressReport: () => ({
    queryKey: ["progressReport"],
    queryFn: () => HealthDataService.getProgressReport(),
    staleTime: 10 * 60 * 1000,
  }),

  dashboardStats: () => ({
    queryKey: ["dashboardStats"],
    queryFn: () => HealthDataService.getDashboardStats(),
    staleTime: 2 * 60 * 1000, // 2 minutes for dashboard
    refetchInterval: 5 * 60 * 1000, // 5 minutes
  }),

  provincialHealth: () => ({
    queryKey: ["provincialHealth"],
    queryFn: () => HealthDataService.getProvincialHealth(),
    staleTime: 5 * 60 * 1000,
  }),

  realTimeUpdates: () => ({
    queryKey: ["realTimeUpdates"],
    queryFn: () => HealthDataService.getRealTimeUpdates(),
    staleTime: 30 * 1000, // 30 seconds
    refetchInterval: 60 * 1000, // 1 minute
  }),

  childMortalityTrends: () => ({
    queryKey: ["childMortalityTrends"],
    queryFn: () => HealthDataService.getChildMortalityTrends(),
    staleTime: 10 * 60 * 1000,
  }),
};

export default HealthDataService;
