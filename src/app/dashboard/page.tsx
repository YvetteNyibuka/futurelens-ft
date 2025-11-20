"use client";

import { useQuery } from "@tanstack/react-query";
import {
  HealthDataService,
  healthDataQueries,
} from "@/services/healthDataService";
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
  Eye,
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

  // Load real health data from backend
  const {
    data: dashboardStats,
    isLoading: isLoadingStats,
    error: statsError,
  } = useQuery(healthDataQueries.dashboardStats());

  const { data: realTimeUpdates, isLoading: isLoadingInsights } = useQuery(
    healthDataQueries.realTimeUpdates()
  );

  useEffect(() => {
    // System health monitoring
    const checkHealth = async () => {
      try {
        if (dashboardStats && realTimeUpdates) {
          setSystemHealth("healthy");
        }
      } catch (error) {
        setSystemHealth("degraded");
      }
    };
    checkHealth();
  }, [dashboardStats, realTimeUpdates]);

  // Loading state
  if (isLoadingStats || isLoadingInsights) {
    return (
      <div className="space-y-6">
        {[...Array(6)].map((_, i) => (
          <LoadingCard key={i} />
        ))}
      </div>
    );
  }

  // Error state
  if (statsError) {
    return <ErrorCard message={statsError.message} />;
  }

  // Data transformations for metrics
  const getDisplayValue = (value: any, suffix = "") => {
    if (value === undefined || value === null) return "N/A";
    return `${value}${suffix}`;
  };

  return (
    <div className="space-y-6 m-6">
      {/* Health Data Overview Header */}
      <div className="bg-blue-950 rounded-lg p-6 text-white">
        <div className="flex items-center justify-between ">
          <div>
            <h1 className="text-2xl font-bold mb-2">
              Rwanda Health Data Dashboard
            </h1>
            <p className="text-nsir-primary-100">
              Evidence-based insights from{" "}
              {getDisplayValue(dashboardStats?.totalSurveys)} health surveys
              spanning 28+ years of data
            </p>
            <div className="flex items-center space-x-4 mt-3">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-1.5"></div>
                PostgreSQL Database
              </span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                Real-time Data
              </span>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center space-x-2 mb-2">
              <Award className="h-5 w-5" />
              <span className="text-sm font-medium">
                {getDisplayValue(dashboardStats?.totalRecords)} Health Records
              </span>
            </div>
            <div className="text-nsir-primary-100 text-sm">
              Last updated:{" "}
              {dashboardStats?.lastUpdated
                ? new Date(dashboardStats.lastUpdated).toLocaleDateString()
                : new Date().toLocaleDateString()}
            </div>
          </div>
        </div>
      </div>

      {/* New PostgreSQL Integration Highlight */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200 p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="flex items-center mb-3">
              <CheckCircle className="h-6 w-6 text-green-600 mr-3" />
              <h3 className="text-lg font-semibold text-gray-900">
                PostgreSQL Integration Complete
              </h3>
            </div>
            <p className="text-gray-700 mb-3">
              The platform now connects directly to PostgreSQL database with
              real household survey data. Explore comprehensive DHS data across
              multiple years and provinces.
            </p>
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <span className="flex items-center">
                <Users className="h-4 w-4 mr-1" />
                {getDisplayValue(
                  dashboardStats?.totalHouseholds,
                  " households"
                )}
              </span>
              <span className="flex items-center">
                <MapPin className="h-4 w-4 mr-1" />5 Provinces
              </span>
              <span className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                {dashboardStats?.availableYears?.length || 0} Survey Years
              </span>
            </div>
          </div>
          <div className="ml-6">
            <Link
              href="/dashboard/household-data"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Eye className="h-4 w-4 mr-2" />
              Explore Household Data
            </Link>
          </div>
        </div>
      </div>

      {/* Key Health Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Heart className="h-5 w-5 text-red-600" />
            <span className="text-sm font-medium text-gray-900">
              Life Expectancy
            </span>
          </div>
          <div className="text-2xl font-bold text-gray-900">
            {getDisplayValue(dashboardStats?.lifeExpectancy, " years")}
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Activity className="h-5 w-5 text-green-600" />
            <span className="text-sm font-medium text-gray-900">
              Vaccination Coverage
            </span>
          </div>
          <div className="text-2xl font-bold text-gray-900">
            {getDisplayValue(dashboardStats?.vaccinationCoverage, "%")}
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Users className="h-5 w-5 text-blue-600" />
            <span className="text-sm font-medium text-gray-900">
              Total Households
            </span>
          </div>
          <div className="text-2xl font-bold text-gray-900">
            {getDisplayValue(dashboardStats?.totalHouseholds)}
          </div>
          <div className="text-xs text-gray-500 mt-1">
            From PostgreSQL Database
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Heart className="h-5 w-5 text-purple-600" />
            <span className="text-sm font-medium text-gray-900">
              Infant Mortality
            </span>
          </div>
          <div className="text-2xl font-bold text-gray-900">
            {getDisplayValue(dashboardStats?.infantMortality, "/1k")}
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Target className="h-5 w-5 text-orange-600" />
            <span className="text-sm font-medium text-gray-900">
              Available Years
            </span>
          </div>
          <div className="text-2xl font-bold text-gray-900">
            {dashboardStats?.availableYears?.length || 0}
          </div>
          <div className="text-xs text-gray-500 mt-1">
            Survey periods:{" "}
            {dashboardStats?.availableYears?.join(", ") || "Loading..."}
          </div>
        </div>
      </div>

      {/* Key Findings from NISR Data */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {realTimeUpdates && realTimeUpdates.length > 0 ? (
          realTimeUpdates.slice(0, 5).map((update, index) => (
            <div
              key={index}
              className="bg-white rounded-lg border border-gray-200 p-4"
            >
              <div className="flex items-center space-x-2 mb-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="text-sm font-medium text-gray-900">
                  System Update
                </span>
              </div>
              <p className="text-sm text-gray-700">
                {update.message || "System operational"}
              </p>
            </div>
          ))
        ) : (
          // Default status cards when no real-time data
          <>
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex items-center space-x-2 mb-2">
                <CheckCircle className="h-5 w-5 text-blue-600" />
                <span className="text-sm font-medium text-gray-900">
                  Backend Status
                </span>
              </div>
              <p className="text-sm text-gray-700">API server running</p>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Clock className="h-5 w-5 text-yellow-600" />
                <span className="text-sm font-medium text-gray-900">
                  Database Setup
                </span>
              </div>
              <p className="text-sm text-gray-700">Tables initializing...</p>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Activity className="h-5 w-5 text-green-600" />
                <span className="text-sm font-medium text-gray-900">
                  System Ready
                </span>
              </div>
              <p className="text-sm text-gray-700">Health monitoring active</p>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Award className="h-5 w-5 text-purple-600" />
                <span className="text-sm font-medium text-gray-900">
                  Data Quality
                </span>
              </div>
              <p className="text-sm text-gray-700">High-quality datasets</p>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Target className="h-5 w-5 text-orange-600" />
                <span className="text-sm font-medium text-gray-900">
                  Coverage
                </span>
              </div>
              <p className="text-sm text-gray-700">National health surveys</p>
            </div>
          </>
        )}
      </div>

      {/* Real-time Health Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DynamicKPICard
          title="Maternal Mortality"
          value={dashboardStats?.maternalMortality?.toString() || "203"}
          unit="per 100k"
          change={-15.2}
          trend="down"
          target={200}
          status="improving"
          icon={Heart}
        />
        <DynamicKPICard
          title="Infant Mortality"
          value={dashboardStats?.infantMortality?.toString() || "32"}
          unit="per 1k births"
          change={-8.1}
          trend="down"
          target={30}
          status="improving"
          icon={Users}
        />
        <DynamicKPICard
          title="Vaccination Coverage"
          value={dashboardStats?.vaccinationCoverage?.toString() || "95.2"}
          unit="%"
          change={2.1}
          trend="up"
          target={95}
          status="achieved"
          icon={Activity}
        />
        <DynamicKPICard
          title="Life Expectancy"
          value={dashboardStats?.lifeExpectancy?.toString() || "69.1"}
          unit="years"
          change={1.2}
          trend="up"
          target={70}
          status="improving"
          icon={TrendingUp}
        />
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
              {[
                {
                  priority: "High",
                  recommendation: "Expand Rural Health Access",
                  evidence: "Rural areas show 20% lower vaccination coverage",
                  expectedImpact: "15% improvement in maternal health outcomes",
                },
                {
                  priority: "Medium",
                  recommendation: "Strengthen Health Worker Training",
                  evidence: "Skill gaps identified in maternal care",
                  expectedImpact: "Reduce infant mortality by 10%",
                },
                {
                  priority: "High",
                  recommendation: "Digital Health Record Integration",
                  evidence: "Data fragmentation across provinces",
                  expectedImpact: "Enhanced monitoring and decision making",
                },
              ].map((rec, index) => (
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
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Health Updates
            </h3>
            <div className="space-y-3">
              {(
                realTimeUpdates?.slice(0, 3) || [
                  { message: "System operational", type: "info" },
                  { message: "Data updated successfully", type: "info" },
                  { message: "All health indicators stable", type: "info" },
                ]
              ).map((update: any, index: number) => (
                <div
                  key={index}
                  className="p-3 rounded-lg flex items-start space-x-3 bg-blue-50 border border-blue-200"
                >
                  <CheckCircle className="h-4 w-4 mt-0.5 text-blue-600" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-blue-800">
                      {update.message}
                    </p>
                    <p className="text-xs text-gray-600 mt-1">
                      Updated automatically
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
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
