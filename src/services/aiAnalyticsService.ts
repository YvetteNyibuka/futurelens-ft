/**
 * AI Analytics Service
 * Connects to Rwanda Health AI Backend
 */

export interface AIInsightRequest {
  metric: string;
  value: number;
  historical_data: number[];
  context?: string;
}

export interface AIInsight {
  metric: string;
  current_value: number;
  ai_insight: {
    summary: string;
    trend_analysis: string;
    key_factors: string[];
    recommendations: string[];
  };
  confidence_score: number;
  generated_at: string;
}

export interface PredictionRequest {
  target_year: number;
  metrics: string[];
  scenario: string;
}

export interface Prediction {
  predicted_value: number;
  confidence_interval: [number, number];
  methodology: string;
  factors_considered: string[];
}

class AIAnalyticsService {
  private baseURL = "http://localhost:8000";
  private isOnline = false;

  // Check if AI backend is available
  async checkStatus(): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseURL}/health`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      this.isOnline = response.ok;
      return this.isOnline;
    } catch (error) {
      console.warn("AI Backend offline, using fallback data");
      this.isOnline = false;
      return false;
    }
  }

  // Generate AI insights for health metrics
  async generateInsights(
    metric: string,
    value: number,
    historicalData: number[]
  ): Promise<AIInsight | null> {
    try {
      if (!(await this.checkStatus())) {
        return this.getFallbackInsight(metric, value);
      }

      const response = await fetch(`${this.baseURL}/api/ai/insights`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          metric,
          value,
          historical_data: historicalData,
        }),
      });

      if (!response.ok) throw new Error("AI service unavailable");
      return await response.json();
    } catch (error) {
      console.error("AI insight generation failed:", error);
      return this.getFallbackInsight(metric, value);
    }
  }

  // Get predictions for future health outcomes
  async getPredictions(
    targetYear: number,
    metrics: string[],
    scenario: string = "current_trend"
  ): Promise<{ [key: string]: Prediction } | null> {
    try {
      if (!(await this.checkStatus())) {
        return this.getFallbackPredictions(targetYear, metrics);
      }

      const response = await fetch(`${this.baseURL}/api/predictions/forecast`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          target_year: targetYear,
          metrics,
          scenario,
        }),
      });

      if (!response.ok) throw new Error("Prediction service unavailable");
      const data = await response.json();
      return data.predictions;
    } catch (error) {
      console.error("AI prediction failed:", error);
      return this.getFallbackPredictions(targetYear, metrics);
    }
  }

  // Get AI-enhanced dashboard data
  async getEnhancedDashboardData(): Promise<any> {
    try {
      if (!(await this.checkStatus())) {
        return this.getFallbackDashboardData();
      }

      const response = await fetch(`${this.baseURL}/api/dashboard/summary`);
      if (!response.ok) throw new Error("Dashboard service unavailable");
      return await response.json();
    } catch (error) {
      console.error("AI dashboard data failed:", error);
      return this.getFallbackDashboardData();
    }
  }

  // Get executive summary
  async getExecutiveSummary(): Promise<any> {
    try {
      if (!(await this.checkStatus())) {
        return this.getFallbackExecutiveSummary();
      }

      const response = await fetch(`${this.baseURL}/api/ai/executive-summary`);
      if (!response.ok) throw new Error("Executive summary unavailable");
      return await response.json();
    } catch (error) {
      console.error("Executive summary failed:", error);
      return this.getFallbackExecutiveSummary();
    }
  }

  // Fallback methods when AI is offline
  private getFallbackInsight(metric: string, value: number): AIInsight {
    return {
      metric,
      current_value: value,
      ai_insight: {
        summary: `Current ${metric} value: ${value}`,
        trend_analysis: "AI analysis temporarily unavailable",
        key_factors: ["Multiple factors contribute to this indicator"],
        recommendations: [
          "Continue monitoring and evidence-based interventions",
        ],
      },
      confidence_score: 0.5,
      generated_at: new Date().toISOString(),
    };
  }

  private getFallbackPredictions(targetYear: number, metrics: string[]) {
    const predictions: { [key: string]: Prediction } = {};
    metrics.forEach((metric) => {
      predictions[metric] = {
        predicted_value: 0,
        confidence_interval: [0, 0],
        methodology: "Offline prediction",
        factors_considered: ["Historical trends"],
      };
    });
    return predictions;
  }

  private getFallbackDashboardData() {
    return {
      ai_status: "offline",
      message: "AI features temporarily unavailable",
    };
  }

  private getFallbackExecutiveSummary() {
    return {
      title: "Rwanda Health Analytics",
      overview: "AI-powered insights temporarily unavailable",
      ai_status: "offline",
    };
  }

  // Get AI status for UI display
  getStatus(): boolean {
    return this.isOnline;
  }
}

export const aiAnalyticsService = new AIAnalyticsService();
