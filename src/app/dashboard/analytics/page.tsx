import {
  BarChart3,
  TrendingUp,
  Users,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import nsirDataService from "@/services/nsirDataService";
import {
  HealthTrendAnalysisChart,
  ProvincialComparisonChart,
} from "@/components/charts/NSIRCharts";

export default async function DashboardAnalyticsPage() {
  // Fetch real data from NISR Data Service
  const healthData = await nsirDataService.getProcessedHealthData();
  const realTimeInsights = await nsirDataService.getRealTimeInsights();

  // Calculate the child mortality reduction percentage
  const firstYear = healthData.trends.childMortalityTrend[0];
  const latestYear =
    healthData.trends.childMortalityTrend[
      healthData.trends.childMortalityTrend.length - 1
    ];
  const mortalityReduction = Math.round(
    ((firstYear.rate - latestYear.rate) / firstYear.rate) * 100
  );

  // Get vaccination improvement
  const firstVaccYear = healthData.trends.vaccinationTrend[0];
  const latestVaccYear =
    healthData.trends.vaccinationTrend[
      healthData.trends.vaccinationTrend.length - 1
    ];
  const vaccinationImprovement = Math.round(
    latestVaccYear.coverage - firstVaccYear.coverage
  );

  return (
    <div className="p-6 space-y-6 min-h-screen w-full">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Health Analytics
        </h1>
        <p className="text-gray-600">
          Detailed analysis of Rwanda's health indicators and trends{" "}
          {healthData.overview.yearRange}
        </p>
      </div>

      {/* Key Performance Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Child Mortality Rate
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {realTimeInsights.keyMetrics[0].value}
              </p>
              <p className="text-sm text-green-600 flex items-center">
                <ArrowDownRight className="h-4 w-4 mr-1" />
                {mortalityReduction}% since {firstYear.year}
              </p>
            </div>
            <Activity className="h-8 w-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Vaccination Coverage
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {realTimeInsights.keyMetrics[1].value}%
              </p>
              <p className="text-sm text-green-600 flex items-center">
                <ArrowUpRight className="h-4 w-4 mr-1" />+
                {vaccinationImprovement}% improvement
              </p>
            </div>
            <TrendingUp className="h-8 w-8 text-green-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Life Expectancy
              </p>
              <p className="text-2xl font-bold text-gray-900">69.1 years</p>
              <p className="text-sm text-green-600 flex items-center">
                <ArrowUpRight className="h-4 w-4 mr-1" />
                +25 years since 1992
              </p>
            </div>
            <Users className="h-8 w-8 text-purple-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Health Insurance
              </p>
              <p className="text-2xl font-bold text-gray-900">95.8%</p>
              <p className="text-sm text-green-600 flex items-center">
                <ArrowUpRight className="h-4 w-4 mr-1" />
                Universal coverage
              </p>
            </div>
            <BarChart3 className="h-8 w-8 text-orange-600" />
          </div>
        </div>
      </div>

      {/* Analytics Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Health Trend Analysis
          </h3>
          <div className="h-80">
            <HealthTrendAnalysisChart
              childMortalityData={healthData.trends.childMortalityTrend}
              vaccinationData={healthData.trends.vaccinationTrend}
            />
          </div>
          <div className="text-xs text-gray-500 mt-2 text-center">
            Source: NISR health surveys {healthData.overview.yearRange}
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Provincial Comparison
          </h3>
          <div className="h-80">
            <ProvincialComparisonChart
              provincialData={healthData.provincialComparison}
            />
          </div>
          <div className="text-xs text-gray-500 mt-2 text-center">
            Provincial health indicators based on{" "}
            {healthData.overview.totalSurveys} NISR surveys
          </div>
        </div>
      </div>
    </div>
  );
}
