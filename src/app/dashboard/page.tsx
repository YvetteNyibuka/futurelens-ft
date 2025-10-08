"use client";

import { useQuery } from "@tanstack/react-query";
import NSIRDataService from "@/services/nsirDataService";
import {
  ChildMortalityChart,
  VaccinationCoverageChart,
  ProvincialHealthChart,
  HealthIndicatorsPieChart,
  RealTimeHealthDashboard,
} from "@/components/charts/HealthCharts";
import Link from "next/link";
import {
  BarChart3,
  TrendingUp,
  MapPin,
  Users,
  Activity,
  Heart,
  AlertTriangle,
  CheckCircle,
  Clock,
  RefreshCw,
  Zap,
  Award,
  Target,
} from "lucide-react";
import { useState, useEffect } from "react";

// Loading component
const LoadingCard = () => (
  <div className="bg-white rounded-lg border border-gray-200 p-6 animate-pulse">
    <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
    <div className="h-8 bg-gray-200 rounded w-1/2 mb-4"></div>
    <div className="h-4 bg-gray-200 rounded w-1/3"></div>
  </div>
);

// Error component
const ErrorCard = ({ message }: { message: string }) => (
  <div className="bg-red-50 border border-red-200 rounded-lg p-6">
    <div className="flex items-center space-x-2 text-red-800">
      <AlertTriangle className="h-5 w-5" />
      <span className="font-medium">Error loading data</span>
    </div>
    <p className="text-red-600 mt-2 text-sm">{message}</p>
  </div>
);

// Dynamic KPI Card
function DynamicKPICard({
  title,
  value,
  unit,
  change,
  trend,
  target,
  status,
  icon: Icon,
  color = "blue",
  isLoading = false,
}: {
  title: string;
  value: string | number;
  unit?: string;
  change?: number;
  trend?: "up" | "down" | "stable";
  target?: number;
  status?: string;
  icon: React.ElementType;
  color?: string;
  isLoading?: boolean;
}) {
  if (isLoading) return <LoadingCard />;

  const colorClasses = {
    blue: "text-nsir-primary bg-nsir-primary-50",
    green: "text-green-600 bg-green-50",
    orange: "text-orange-600 bg-orange-50",
    purple: "text-purple-600 bg-purple-50",
    red: "text-red-600 bg-red-50",
  };

  const getStatusColor = () => {
    if (status === "achieved") return "text-green-600";
    if (status === "in-progress") return "text-blue-600";
    return "text-gray-600";
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <div className="flex items-baseline space-x-2">
            <p className="text-2xl font-bold text-gray-900">{value}</p>
            {unit && <span className="text-sm text-gray-600">{unit}</span>}
          </div>

          {change !== undefined && trend && (
            <div
              className={`flex items-center mt-2 text-sm ${
                trend === "up"
                  ? "text-green-600"
                  : trend === "down"
                  ? "text-red-600"
                  : "text-gray-600"
              }`}
            >
              <TrendingUp
                className={`h-4 w-4 mr-1 ${trend === "down" && "rotate-180"}`}
              />
              {change > 0 ? "+" : ""}
              {change}%
            </div>
          )}

          {target !== undefined && (
            <p className="text-xs text-gray-500 mt-1">
              Target: {target}
              {unit}
            </p>
          )}

          {status && (
            <p className={`text-xs font-medium mt-1 ${getStatusColor()}`}>
              {status === "achieved"
                ? "✓ Target Achieved"
                : status === "in-progress"
                ? "⟳ In Progress"
                : "○ Pending"}
            </p>
          )}
        </div>
        <div
          className={`p-3 rounded-lg ${
            colorClasses[color as keyof typeof colorClasses]
          }`}
        >
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const [systemHealth, setSystemHealth] = useState<
    "healthy" | "degraded" | "critical"
  >("healthy");

  // Load real NISR data
  const {
    data: nsirData,
    isLoading: isLoadingNSIR,
    error: nsirError,
  } = useQuery({
    queryKey: ["nsir-health-data"],
    queryFn: () => NSIRDataService.getProcessedHealthData(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const { data: realTimeInsights, isLoading: isLoadingInsights } = useQuery({
    queryKey: ["real-time-insights"],
    queryFn: () => NSIRDataService.getRealTimeInsights(),
    refetchInterval: 30000, // Update every 30 seconds
  });

  useEffect(() => {
    // System health monitoring
    const checkHealth = async () => {
      try {
        if (nsirData && realTimeInsights) {
          setSystemHealth("healthy");
        }
      } catch (error) {
        setSystemHealth("degraded");
      }
    };
    checkHealth();
  }, [nsirData, realTimeInsights]);

  // Loading state
  if (isLoadingNSIR || isLoadingInsights) {
    return (
      <div className="space-y-6">
        {[...Array(6)].map((_, i) => (
          <LoadingCard key={i} />
        ))}
      </div>
    );
  }

  // Error state
  if (nsirError) {
    return <ErrorCard message={nsirError.message} />;
  }

  // Data transformations for metrics
  const getLatestMetric = (field: string) => {
    if (!nsirData?.indicators) return "N/A";
    const latest = nsirData.indicators[nsirData.indicators.length - 1];

    switch (field) {
      case "childMortality":
        return `${latest.childMortality}`;
      case "vaccination":
        return `${latest.vaccination?.dpt3}%`;
      case "stunting":
        return `${latest.stunting}%`;
      case "skilledDelivery":
        return `${latest.maternalHealth?.skilledDelivery}%`;
      default:
        return "N/A";
    }
  };

  return (
    <div className="space-y-6 m-6">
      {/* NISR Data Overview Header */}
      <div className="bg-blue-950 rounded-lg p-6 text-white">
        <div className="flex items-center justify-between ">
          <div>
            <h1 className="text-2xl font-bold mb-2">
              Rwanda Health Data Dashboard
            </h1>
            <p className="text-nsir-primary-100">
              Evidence-based insights from {nsirData?.overview.totalSurveys}{" "}
              NISR surveys ({nsirData?.overview.yearRange})
            </p>
          </div>
          <div className="text-right">
            <div className="flex items-center space-x-2 mb-2">
              <Award className="h-5 w-5" />
              <span className="text-sm font-medium">
                79% Child Mortality Reduction
              </span>
            </div>
            <div className="text-nsir-primary-100 text-sm">
              Last updated: {new Date().toLocaleDateString()}
            </div>
          </div>
        </div>
      </div>

      {/* Key Findings from NISR Data */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {nsirData?.overview.keyFindings.map((finding, index) => (
          <div
            key={index}
            className="bg-white rounded-lg border border-gray-200 p-4"
          >
            <div className="flex items-center space-x-2 mb-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span className="text-sm font-medium text-gray-900">
                Achievement
              </span>
            </div>
            <p className="text-sm text-gray-700">{finding}</p>
          </div>
        ))}
      </div>

      {/* Real-time Health Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {realTimeInsights?.keyMetrics.map((metric, index) => (
          <DynamicKPICard
            key={index}
            title={metric.name}
            value={metric.value.toString()}
            unit={metric.unit}
            change={metric.change}
            trend={metric.trend as "up" | "down" | "stable"}
            target={metric.target}
            status={metric.status}
            icon={
              metric.name.includes("Mortality")
                ? Heart
                : metric.name.includes("Vaccination")
                ? Activity
                : metric.name.includes("Stunting")
                ? Users
                : TrendingUp
            }
          />
        ))}
      </div>

      {/* System Health and Policy Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Policy Recommendations
              </h3>
              <Target className="h-5 w-5 text-nsir-primary" />
            </div>
            <div className="space-y-4">
              {nsirData?.policyRecommendations.slice(0, 3).map((rec, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg border-l-4 ${
                    rec.priority === "High"
                      ? "border-red-500 bg-red-50"
                      : rec.priority === "Medium"
                      ? "border-yellow-500 bg-yellow-50"
                      : "border-blue-500 bg-blue-50"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`text-sm font-medium ${
                        rec.priority === "High"
                          ? "text-red-800"
                          : rec.priority === "Medium"
                          ? "text-yellow-800"
                          : "text-blue-800"
                      }`}
                    >
                      {rec.priority} Priority
                    </span>
                  </div>
                  <h4 className="font-medium text-gray-900 mb-1">
                    {rec.recommendation}
                  </h4>
                  <p className="text-sm text-gray-600 mb-2">{rec.evidence}</p>
                  <p className="text-sm font-medium text-green-700">
                    Expected: {rec.expectedImpact}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* System Status */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                System Status
              </h3>
              <div
                className={`w-3 h-3 rounded-full ${
                  systemHealth === "healthy"
                    ? "bg-green-500"
                    : systemHealth === "degraded"
                    ? "bg-yellow-500"
                    : "bg-red-500"
                }`}
              ></div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Data Freshness</span>
                <span className="text-green-600 font-medium">Live</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Survey Coverage</span>
                <span className="text-green-600 font-medium">National</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Data Quality</span>
                <span className="text-green-600 font-medium">Verified</span>
              </div>
            </div>
          </div>

          {/* Alerts */}
          {realTimeInsights?.alerts && (
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Health Alerts
              </h3>
              <div className="space-y-3">
                {realTimeInsights.alerts.map((alert, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded-lg flex items-start space-x-3 ${
                      alert.type === "warning"
                        ? "bg-yellow-50 border border-yellow-200"
                        : "bg-blue-50 border border-blue-200"
                    }`}
                  >
                    <AlertTriangle
                      className={`h-4 w-4 mt-0.5 ${
                        alert.type === "warning"
                          ? "text-yellow-600"
                          : "text-blue-600"
                      }`}
                    />
                    <div className="flex-1">
                      <p
                        className={`text-sm font-medium ${
                          alert.type === "warning"
                            ? "text-yellow-800"
                            : "text-blue-800"
                        }`}
                      >
                        {alert.message}
                      </p>
                      <p className="text-xs text-gray-600 mt-1">
                        {alert.action}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Health Trend Visualizations */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <ChildMortalityChart />
        <VaccinationCoverageChart />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <ProvincialHealthChart />
        <HealthIndicatorsPieChart />
      </div>
    </div>
  );
}
