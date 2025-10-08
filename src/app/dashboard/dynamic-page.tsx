"use client";

import { useQuery } from "@tanstack/react-query";
import {
  healthDataQueries,
  HealthDataService,
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
  subtitle,
  icon,
  trend,
  trendUp,
  color = "blue",
  isLoading = false,
  lastUpdated,
}: {
  title: string;
  value: string | number;
  subtitle: string;
  icon: React.ReactNode;
  trend?: string;
  trendUp?: boolean;
  color?: string;
  isLoading?: boolean;
  lastUpdated?: string;
}) {
  if (isLoading) return <LoadingCard />;

  const colorClasses = {
    blue: "text-nsir-primary bg-nsir-primary-50",
    green: "text-green-600 bg-green-50",
    orange: "text-orange-600 bg-orange-50",
    purple: "text-purple-600 bg-purple-50",
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          <p className="text-sm text-gray-500">{subtitle}</p>
          {trend && (
            <div
              className={`flex items-center mt-2 text-sm ${
                trendUp ? "text-green-600" : "text-red-600"
              }`}
            >
              <TrendingUp
                className={`h-4 w-4 mr-1 ${!trendUp && "rotate-180"}`}
              />
              {trend}
            </div>
          )}
          {lastUpdated && (
            <p className="text-xs text-gray-400 mt-1">Updated: {lastUpdated}</p>
          )}
        </div>
        <div
          className={`p-3 rounded-lg ${
            colorClasses[color as keyof typeof colorClasses]
          }`}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}

export default function DynamicDashboardPage() {
  const [lastRefresh, setLastRefresh] = useState(new Date());
  const [connectionStatus, setConnectionStatus] = useState<
    "checking" | "connected" | "offline"
  >("checking");

  // Fetch real data using React Query
  const {
    data: healthIndicators,
    isLoading: loadingIndicators,
    error: indicatorsError,
    refetch: refetchIndicators,
  } = useQuery(healthDataQueries.healthIndicators());

  const {
    data: dashboardStats,
    isLoading: loadingStats,
    error: statsError,
  } = useQuery(healthDataQueries.dashboardStats());

  const { data: realTimeUpdates, isLoading: loadingUpdates } = useQuery(
    healthDataQueries.realTimeUpdates()
  );

  const { data: trendAnalysis, isLoading: loadingTrends } = useQuery(
    healthDataQueries.trendAnalysis()
  );

  // Check backend connection
  useEffect(() => {
    const checkConnection = async () => {
      try {
        const isHealthy = await HealthDataService.healthCheck();
        setConnectionStatus(isHealthy ? "connected" : "offline");
      } catch {
        setConnectionStatus("offline");
      }
    };

    checkConnection();
    const interval = setInterval(checkConnection, 30000); // Check every 30 seconds

    return () => clearInterval(interval);
  }, []);

  // Manual refresh function
  const handleRefresh = () => {
    refetchIndicators();
    setLastRefresh(new Date());
  };

  // Calculate dynamic KPIs from real data
  const getChildMortalityRate = () => {
    if (!healthIndicators) return "Loading...";
    const childMortality = healthIndicators.find(
      (indicator) =>
        indicator.indicatorName.toLowerCase().includes("child mortality") ||
        indicator.indicatorName.toLowerCase().includes("infant mortality")
    );
    return childMortality ? `${childMortality.value}` : "32.1";
  };

  const getVaccinationCoverage = () => {
    if (!healthIndicators) return "Loading...";
    const vaccination = healthIndicators.find(
      (indicator) =>
        indicator.indicatorName.toLowerCase().includes("vaccination") ||
        indicator.indicatorName.toLowerCase().includes("immunization")
    );
    return vaccination ? `${vaccination.value}%` : "95.2%";
  };

  const getLifeExpectancy = () => {
    if (!dashboardStats?.lifeExpectancy) return "69.1";
    return dashboardStats.lifeExpectancy;
  };

  const getHealthFacilities = () => {
    if (!dashboardStats?.totalFacilities) return "1,594";
    return dashboardStats.totalFacilities.toLocaleString();
  };

  return (
    <div className="p-6 space-y-6 min-h-screen w-full">
      {/* Connection Status & Refresh Bar */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div
                className={`w-3 h-3 rounded-full ${
                  connectionStatus === "connected"
                    ? "bg-green-500 animate-pulse"
                    : connectionStatus === "offline"
                    ? "bg-red-500"
                    : "bg-yellow-500 animate-pulse"
                }`}
              ></div>
              <span className="text-sm font-medium">
                {connectionStatus === "connected"
                  ? "Connected to Backend"
                  : connectionStatus === "offline"
                  ? "Backend Offline (Demo Mode)"
                  : "Checking Connection..."}
              </span>
            </div>

            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Clock className="h-4 w-4" />
              <span>Last updated: {lastRefresh.toLocaleTimeString()}</span>
            </div>
          </div>

          <button
            onClick={handleRefresh}
            className="flex items-center space-x-2 px-3 py-1 bg-nsir-primary text-white rounded-md hover:bg-nsir-primary-700 transition-colors"
          >
            <RefreshCw className="h-4 w-4" />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* Real-Time Dashboard */}
      <RealTimeHealthDashboard />

      {/* Dashboard Overview with Real Data */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              Rwanda Health Analytics Dashboard
            </h2>
            <p className="text-gray-600">
              Real-time health indicators and 28-year transformation data
            </p>
          </div>
          <div className="flex items-center space-x-2 text-sm text-green-600">
            <Zap className="h-4 w-4" />
            <span>Live Data</span>
          </div>
        </div>

        {/* Dynamic Key Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <DynamicKPICard
            title="Child Mortality Rate"
            value={getChildMortalityRate()}
            subtitle="per 1,000 live births"
            icon={<Heart className="h-6 w-6" />}
            trend="-70% since 1992"
            trendUp={false} // Lower is better for mortality
            color="blue"
            isLoading={loadingIndicators}
            lastUpdated={healthIndicators?.[0]?.lastUpdated}
          />

          <DynamicKPICard
            title="Vaccination Coverage"
            value={getVaccinationCoverage()}
            subtitle="DPT3 immunization rate"
            icon={<CheckCircle className="h-6 w-6" />}
            trend="+120% improvement"
            trendUp={true}
            color="green"
            isLoading={loadingIndicators}
          />

          <DynamicKPICard
            title="Life Expectancy"
            value={`${getLifeExpectancy()} years`}
            subtitle="National average"
            icon={<Activity className="h-6 w-6" />}
            trend="+15 years since 1992"
            trendUp={true}
            color="purple"
            isLoading={loadingStats}
          />

          <DynamicKPICard
            title="Health Facilities"
            value={getHealthFacilities()}
            subtitle="Operational nationwide"
            icon={<MapPin className="h-6 w-6" />}
            trend="+300% expansion"
            trendUp={true}
            color="orange"
            isLoading={loadingStats}
          />
        </div>
      </div>

      {/* Interactive Charts Section */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <ChildMortalityChart />
        <VaccinationCoverageChart />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <ProvincialHealthChart />
        <HealthIndicatorsPieChart />
      </div>

      {/* Real-Time Updates Feed */}
      {realTimeUpdates && realTimeUpdates.length > 0 && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Real-Time Health Updates
          </h3>
          <div className="space-y-3">
            {realTimeUpdates.slice(0, 5).map((update: any, index: number) => (
              <div
                key={index}
                className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"
              >
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {update.title}
                  </p>
                  <p className="text-xs text-gray-600">{update.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Quick Actions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            href="/dashboard/analytics"
            className="flex flex-col items-center p-4 rounded-lg border border-gray-200 hover:border-nsir-primary-300 hover:bg-nsir-primary-50 transition-all group"
          >
            <div className="text-nsir-primary group-hover:text-nsir-primary-700 mb-2">
              <BarChart3 className="h-8 w-8" />
            </div>
            <span className="font-medium text-gray-900">Analytics</span>
            <span className="text-sm text-gray-600">Detailed insights</span>
          </Link>

          <Link
            href="/dashboard/provinces"
            className="flex flex-col items-center p-4 rounded-lg border border-gray-200 hover:border-nsir-primary-300 hover:bg-nsir-primary-50 transition-all group"
          >
            <div className="text-nsir-primary group-hover:text-nsir-primary-700 mb-2">
              <MapPin className="h-8 w-8" />
            </div>
            <span className="font-medium text-gray-900">Provinces</span>
            <span className="text-sm text-gray-600">Regional data</span>
          </Link>

          <Link
            href="/dashboard/demographics"
            className="flex flex-col items-center p-4 rounded-lg border border-gray-200 hover:border-nsir-primary-300 hover:bg-nsir-primary-50 transition-all group"
          >
            <div className="text-nsir-primary group-hover:text-nsir-primary-700 mb-2">
              <Users className="h-8 w-8" />
            </div>
            <span className="font-medium text-gray-900">Demographics</span>
            <span className="text-sm text-gray-600">Population data</span>
          </Link>

          <Link
            href="/dashboard/reports"
            className="flex flex-col items-center p-4 rounded-lg border border-gray-200 hover:border-nsir-primary-300 hover:bg-nsir-primary-50 transition-all group"
          >
            <div className="text-nsir-primary group-hover:text-nsir-primary-700 mb-2">
              <TrendingUp className="h-8 w-8" />
            </div>
            <span className="font-medium text-gray-900">Reports</span>
            <span className="text-sm text-gray-600">Download data</span>
          </Link>
        </div>
      </div>

      {/* Error Display */}
      {(indicatorsError || statsError) && (
        <ErrorCard message="Some data could not be loaded. Running in demo mode with sample data." />
      )}
    </div>
  );
}
