/**
 * NSIR Health Dashboard Components
 * Professional health analytics for Rwanda's transformation data
 * Updated with NSIR design system
 */

"use client";

import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  ComposedChart,
} from "recharts";
import {
  TrendingUp,
  TrendingDown,
  Activity,
  Heart,
  Users,
  Baby,
  Shield,
  Home,
  MapPin,
  Calendar,
  BarChart3,
  Target,
  Award,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";
import { Icon } from "@iconify/react";

// Types for API responses
interface DashboardData {
  summary: {
    title: string;
    subtitle: string;
    totalRecords: number;
    categories: number;
    provinces: number;
    yearRange: { start: number; end: number };
  };
  keyMetrics: Record<string, any>;
  lastUpdated: string;
}

interface MetricCardProps {
  title: string;
  value: string | number;
  unit?: string;
  target?: number;
  trend: "increasing" | "decreasing" | "stable";
  icon: React.ReactNode;
  color: string;
  description?: string;
  isLoading?: boolean;
}

// NSIR KPI Card Component
export function MetricCard({
  title,
  value,
  unit = "",
  target,
  trend,
  icon,
  color,
  description,
  isLoading = false,
}: MetricCardProps) {
  const getTrendIcon = () => {
    switch (trend) {
      case "increasing":
        return (
          <Icon icon="mdi:trending-up" className="h-4 w-4 text-nsir-primary" />
        );
      case "decreasing":
        return (
          <Icon
            icon="mdi:trending-down"
            className="h-4 w-4"
            style={{ color: "#dc2626" }}
          />
        );
      default:
        return (
          <Icon
            icon="mdi:minus"
            className="h-4 w-4"
            style={{ color: "#6b7280" }}
          />
        );
    }
  };

  const getTrendColor = () => {
    // For health metrics, decreasing mortality/disease is good (green)
    // Increasing coverage/access is good (green)
    const positiveDecreaseMetrics = [
      "mortality",
      "stunting",
      "underweight",
      "diarrhea",
    ];
    const isPositiveDecrease = positiveDecreaseMetrics.some((metric) =>
      title.toLowerCase().includes(metric)
    );

    if (trend === "decreasing") {
      return { color: isPositiveDecrease ? "#059669" : "#dc2626" };
    }
    if (trend === "increasing") {
      return { color: isPositiveDecrease ? "#dc2626" : "#059669" };
    }
    return { color: "#6b7280" };
  };

  if (isLoading) {
    return (
      <div className="bg-white p-6 rounded-lg border border-gray-100 animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
        <div className="h-8 bg-gray-200 rounded w-1/2 mb-2"></div>
        <div className="h-3 bg-gray-200 rounded w-1/4"></div>
      </div>
    );
  }

  return (
    <div className="bg-nsir-primary p-6 rounded-lg border border-gray-100 hover:shadow-md transition-all duration-200">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-4">
            <div
              className="p-2 rounded-lg"
              style={{ backgroundColor: "#f0f4ff" }}
            >
              {icon}
            </div>
            <h3 className="text-sm font-medium" style={{ color: "#6b7280" }}>
              {title}
            </h3>
          </div>

          <div className="space-y-2">
            <div className="flex items-baseline space-x-2">
              <span
                className="text-3xl font-semibold"
                style={{ color: "#1f2937" }}
              >
                {typeof value === "number" ? value.toLocaleString() : value}
              </span>
              {unit && (
                <span className="text-sm" style={{ color: "#6b7280" }}>
                  {unit}
                </span>
              )}
            </div>

            {target && (
              <div className="text-sm" style={{ color: "#6b7280" }}>
                Target: {target}
                {unit}
              </div>
            )}

            <div
              className="flex items-center space-x-1 text-sm font-medium"
              style={getTrendColor()}
            >
              {getTrendIcon()}
              <span className="capitalize">{trend}</span>
            </div>
          </div>

          {description && (
            <p className="text-xs mt-3" style={{ color: "#9ca3af" }}>
              {description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

// Health Transformation Timeline
export function HealthTransformationTimeline() {
  const timelineData = [
    {
      year: 1992,
      event: "Enquête Démographique et de Santé",
      childMortality: 151,
      vaccination: 45,
    },
    {
      year: 2000,
      event: "Health Sector Reform",
      childMortality: 107,
      vaccination: 76,
    },
    {
      year: 2005,
      event: "Community Health Program Launch",
      childMortality: 86,
      vaccination: 84,
    },
    {
      year: 2008,
      event: "Health Insurance Scale-up",
      childMortality: 76,
      vaccination: 89,
    },
    {
      year: 2010,
      event: "Performance-Based Financing",
      childMortality: 50,
      vaccination: 92,
    },
    {
      year: 2015,
      event: "Universal Health Coverage",
      childMortality: 42,
      vaccination: 95,
    },
    {
      year: 2020,
      event: "Digital Health Systems",
      childMortality: 32,
      vaccination: 97,
    },
  ];

  return (
    <div className="bg-white rounded-lg p-6 border border-gray-100">
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2" style={{ color: "#1f2937" }}>
          Health Transformation Timeline (1992-2020)
        </h3>
        <p className="text-sm" style={{ color: "#6b7280" }}>
          Key milestones and their impact on child mortality and vaccination
          coverage
        </p>
      </div>

      <ResponsiveContainer width="100%" height={350}>
        <ComposedChart
          data={timelineData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
          <XAxis dataKey="year" tick={{ fontSize: 12, fill: "#6b7280" }} />
          <YAxis
            yAxisId="mortality"
            orientation="left"
            domain={[0, 200]}
            tick={{ fontSize: 12, fill: "#6b7280" }}
          />
          <YAxis
            yAxisId="vaccination"
            orientation="right"
            domain={[0, 100]}
            tick={{ fontSize: 12, fill: "#6b7280" }}
          />
          <Tooltip
            content={({ active, payload, label }) => {
              if (active && payload && payload.length) {
                const data = timelineData.find((d) => d.year === label);
                return (
                  <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
                    <h4 className="font-semibold" style={{ color: "#1f2937" }}>
                      {label}
                    </h4>
                    <p className="text-sm mb-2" style={{ color: "#6b7280" }}>
                      {data?.event}
                    </p>
                    <div className="space-y-1">
                      <div className="flex justify-between">
                        <span style={{ color: "#dc2626" }}>
                          Child Mortality:
                        </span>
                        <span className="font-medium">
                          {payload[0]?.value} per 1,000
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span style={{ color: "#059669" }}>Vaccination:</span>
                        <span className="font-medium">
                          {payload[1]?.value}%
                        </span>
                      </div>
                    </div>
                  </div>
                );
              }
              return null;
            }}
          />
          <Legend />
          <Area
            yAxisId="mortality"
            type="monotone"
            dataKey="childMortality"
            stroke="#dc2626"
            fill="#dc2626"
            fillOpacity={0.2}
            name="Child Mortality (per 1,000)"
          />
          <Line
            yAxisId="vaccination"
            type="monotone"
            dataKey="vaccination"
            stroke="#2159A9"
            strokeWidth={3}
            dot={{ fill: "#2159A9", strokeWidth: 2, r: 4 }}
            name="Vaccination Coverage (%)"
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}

// Provincial Health Comparison
export function ProvincialHealthComparison() {
  const [selectedMetric, setSelectedMetric] = useState("childMortality");

  const provincialData = [
    {
      province: "Kigali City",
      childMortality: 28,
      stunting: 15,
      vaccination: 98,
      skilledDelivery: 95,
    },
    {
      province: "Southern",
      childMortality: 31,
      stunting: 22,
      vaccination: 96,
      skilledDelivery: 92,
    },
    {
      province: "Western",
      childMortality: 35,
      stunting: 26,
      vaccination: 94,
      skilledDelivery: 89,
    },
    {
      province: "Northern",
      childMortality: 33,
      stunting: 24,
      vaccination: 95,
      skilledDelivery: 91,
    },
    {
      province: "Eastern",
      childMortality: 34,
      stunting: 25,
      vaccination: 93,
      skilledDelivery: 88,
    },
  ];

  const metrics = [
    {
      key: "childMortality",
      label: "Child Mortality (per 1,000)",
      color: "#dc2626",
    },
    { key: "stunting", label: "Stunting (%)", color: "#d97706" },
    { key: "vaccination", label: "Vaccination Coverage (%)", color: "#059669" },
    { key: "skilledDelivery", label: "Skilled Delivery (%)", color: "#2159A9" },
  ];

  const currentMetric = metrics.find((m) => m.key === selectedMetric);

  return (
    <div className="bg-white rounded-lg p-6 border border-gray-100">
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3" style={{ color: "#1f2937" }}>
          Provincial Health Indicators Comparison
        </h3>
        <div className="flex flex-wrap gap-2">
          {metrics.map((metric) => (
            <button
              key={metric.key}
              onClick={() => setSelectedMetric(metric.key)}
              className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200"
              style={{
                backgroundColor:
                  selectedMetric === metric.key ? "#2159A9" : "#f8fafc",
                color: selectedMetric === metric.key ? "#ffffff" : "#6b7280",
                border:
                  selectedMetric === metric.key ? "none" : "1px solid #e2e8f0",
              }}
            >
              {metric.label}
            </button>
          ))}
        </div>
      </div>

      <ResponsiveContainer width="100%" height={280}>
        <BarChart
          data={provincialData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
          <XAxis dataKey="province" tick={{ fontSize: 12, fill: "#6b7280" }} />
          <YAxis tick={{ fontSize: 12, fill: "#6b7280" }} />
          <Tooltip
            contentStyle={{
              backgroundColor: "#ffffff",
              border: "1px solid #e2e8f0",
              borderRadius: "8px",
              fontSize: "12px",
            }}
          />
          <Bar
            dataKey={selectedMetric}
            fill={currentMetric?.color}
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

// Health Indicators Overview
export function HealthIndicatorsOverview() {
  const indicatorData = [
    {
      name: "Child Health",
      value: 35,
      color: "#dc2626",
      icon: <Baby className="h-5 w-5" />,
    },
    {
      name: "Maternal Health",
      value: 25,
      color: "#d97706",
      icon: <Heart className="h-5 w-5" />,
    },
    {
      name: "Immunization",
      value: 20,
      color: "#059669",
      icon: <Shield className="h-5 w-5" />,
    },
    {
      name: "Nutrition",
      value: 15,
      color: "#2159A9",
      icon: <Activity className="h-5 w-5" />,
    },
    {
      name: "Healthcare Access",
      value: 5,
      color: "#7c3aed",
      icon: <Home className="h-5 w-5" />,
    },
  ];

  return (
    <div className="bg-white rounded-lg p-6 border border-gray-100">
      <h3 className="text-lg font-semibold mb-6" style={{ color: "#1f2937" }}>
        Health Data Distribution by Category
      </h3>

      <div className="flex items-center justify-between">
        <div className="w-56 h-56">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={indicatorData}
                cx="50%"
                cy="50%"
                outerRadius={70}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) =>
                  `${((percent ?? 0) * 100).toFixed(0)}%`
                }
              >
                {indicatorData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #e2e8f0",
                  borderRadius: "8px",
                  fontSize: "12px",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="flex-1 ml-6">
          <div className="space-y-3">
            {indicatorData.map((indicator) => (
              <div
                key={indicator.name}
                className="flex items-center justify-between py-2"
              >
                <div className="flex items-center space-x-3">
                  <div
                    className="p-2 rounded-lg"
                    style={{ backgroundColor: `${indicator.color}15` }}
                  >
                    <div style={{ color: indicator.color }}>
                      {indicator.icon}
                    </div>
                  </div>
                  <span className="font-medium" style={{ color: "#1f2937" }}>
                    {indicator.name}
                  </span>
                </div>
                <span
                  className="text-lg font-semibold"
                  style={{ color: "#6b7280" }}
                >
                  {indicator.value}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Main Dashboard Component
export function RichHealthDashboard() {
  const [timeRange, setTimeRange] = useState("all");

  // Fetch dashboard data
  const {
    data: dashboardData,
    isLoading,
    error,
    refetch,
  } = useQuery<DashboardData>({
    queryKey: ["dashboard-data"],
    queryFn: async () => {
      const response = await fetch("/api/analytics/dashboard");
      if (!response.ok) throw new Error("Failed to fetch dashboard data");
      const result = await response.json();
      return result.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });

  if (error) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: "#fafbfc" }}
      >
        <div className="text-center max-w-md">
          <AlertTriangle
            className="h-12 w-12 mx-auto mb-4"
            style={{ color: "#dc2626" }}
          />
          <h3
            className="text-lg font-semibold mb-2"
            style={{ color: "#1f2937" }}
          >
            Failed to load dashboard data
          </h3>
          <p className="mb-6" style={{ color: "#6b7280" }}>
            There was an error loading the health data dashboard.
          </p>
          <button
            onClick={() => refetch()}
            className="px-6 py-2 rounded-lg font-medium transition-colors"
            style={{
              backgroundColor: "#2159A9",
              color: "#ffffff",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#1a4a8f";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#2159A9";
            }}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#fafbfc" }}>
      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1
                className="text-2xl font-semibold mb-2"
                style={{ color: "#1f2937" }}
              >
                {dashboardData?.summary.title ||
                  "Rwanda Health Analytics Dashboard"}
              </h1>
              <p className="text-base" style={{ color: "#6b7280" }}>
                {dashboardData?.summary.subtitle ||
                  "Complete dataset analysis - 978,687 health records processed"}
              </p>
              {dashboardData?.summary.totalRecords && (
                <div
                  className="flex items-center space-x-6 mt-4"
                  style={{ color: "#6b7280" }}
                >
                  <div className="flex items-center space-x-2">
                    <BarChart3
                      className="h-4 w-4"
                      style={{ color: "#2159A9" }}
                    />
                    <span className="text-sm">
                      {dashboardData.summary.totalRecords.toLocaleString()}{" "}
                      Records
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar
                      className="h-4 w-4"
                      style={{ color: "#2159A9" }}
                    />
                    <span className="text-sm">
                      {dashboardData.summary.yearRange.start}-
                      {dashboardData.summary.yearRange.end} (28 Years)
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4" style={{ color: "#2159A9" }} />
                    <span className="text-sm">
                      {dashboardData.summary.provinces} Provinces • 41 Datasets
                    </span>
                  </div>
                </div>
              )}
            </div>
            <div className="text-right">
              <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                <div className="flex items-center space-x-2 text-sm mb-2">
                  <CheckCircle
                    className="h-4 w-4"
                    style={{ color: "#059669" }}
                  />
                  <span style={{ color: "#6b7280" }}>Dataset Active</span>
                </div>
                <div
                  className="text-2xl font-semibold"
                  style={{ color: "#2159A9" }}
                >
                  978,687
                </div>
                <div className="text-xs mt-1" style={{ color: "#9ca3af" }}>
                  Updated:{" "}
                  {dashboardData?.lastUpdated
                    ? new Date(dashboardData.lastUpdated).toLocaleDateString()
                    : "Nov 2024"}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-6 pb-8">
          {/* Key Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <MetricCard
              title="Child Mortality"
              value={dashboardData?.keyMetrics.childMortality?.current || 32}
              unit="per 1,000 births"
              target={dashboardData?.keyMetrics.childMortality?.target}
              trend={
                dashboardData?.keyMetrics.childMortality?.trend || "decreasing"
              }
              icon={<Baby className="h-5 w-5" style={{ color: "#dc2626" }} />}
              color="#dc2626"
              description="79% reduction from 151 in 1992 - Africa's best improvement"
              isLoading={isLoading}
            />

            <MetricCard
              title="Vaccination Coverage"
              value={
                dashboardData?.keyMetrics.vaccinationCoverage?.current || 97.2
              }
              unit="%"
              target={dashboardData?.keyMetrics.vaccinationCoverage?.target}
              trend={
                dashboardData?.keyMetrics.vaccinationCoverage?.trend ||
                "increasing"
              }
              icon={<Shield className="h-5 w-5" style={{ color: "#059669" }} />}
              color="#059669"
              description="From 45% to 97% - near universal coverage achieved"
              isLoading={isLoading}
            />

            <MetricCard
              title="Life Expectancy"
              value={dashboardData?.keyMetrics.lifeExpectancy?.current || 69.1}
              unit="years"
              target={dashboardData?.keyMetrics.lifeExpectancy?.target}
              trend={
                dashboardData?.keyMetrics.lifeExpectancy?.trend || "increasing"
              }
              icon={<Heart className="h-5 w-5" style={{ color: "#2159A9" }} />}
              color="#2159A9"
              description="21-year gain from 48 years - extraordinary progress"
              isLoading={isLoading}
            />

            <MetricCard
              title="Skilled Delivery"
              value={dashboardData?.keyMetrics.skilledDelivery?.current || 91.0}
              unit="%"
              target={dashboardData?.keyMetrics.skilledDelivery?.target}
              trend={
                dashboardData?.keyMetrics.skilledDelivery?.trend || "increasing"
              }
              icon={<Users className="h-5 w-5" style={{ color: "#d97706" }} />}
              color="#d97706"
              description="From 12% to 91% - revolutionary maternal care"
              isLoading={isLoading}
            />
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">
            <HealthTransformationTimeline />
            <ProvincialHealthComparison />
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <div className="xl:col-span-2">
              <HealthIndicatorsOverview />
            </div>

            <div className="space-y-6">
              {/* Additional metrics */}
              <div className="grid gap-4">
                <MetricCard
                  title="Water Access"
                  value={dashboardData?.keyMetrics.waterAccess?.current || 85.5}
                  unit="%"
                  target={90}
                  trend="increasing"
                  icon={
                    <Activity
                      className="h-4 w-4"
                      style={{ color: "#0ea5e9" }}
                    />
                  }
                  color="#0ea5e9"
                  description="Improved water sources"
                  isLoading={isLoading}
                />

                <MetricCard
                  title="Electricity Access"
                  value={dashboardData?.keyMetrics.electricity?.current || 63.2}
                  unit="%"
                  target={70}
                  trend="increasing"
                  icon={
                    <Home className="h-4 w-4" style={{ color: "#eab308" }} />
                  }
                  color="#eab308"
                  description="Household electricity access"
                  isLoading={isLoading}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RichHealthDashboard;
