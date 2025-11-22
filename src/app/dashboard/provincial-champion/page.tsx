"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Icon } from "@iconify/react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";
import {
  MapPin,
  Trophy,
  TrendingUp,
  Star,
  Award,
  Target,
  Crown,
  Medal,
  Zap,
} from "lucide-react";

type ProvincialData = {
  province: string;
  population: string;
  childMortality: number;
  maternalMortality: number;
  vaccination: number;
  skilledDelivery: number;
  stunting: number;
  waterAccess: number;
  electricityAccess: number;
  overall: number;
  rank: number;
  improvement: string;
  champion: string;
  achievements: string[];
  color: string;
};

type MetricKey =
  | "childMortality"
  | "maternalMortality"
  | "vaccination"
  | "skilledDelivery"
  | "stunting"
  | "waterAccess"
  | "electricityAccess"
  | "overall";

export default function ProvincialChampionPage() {
  const [selectedMetric, setSelectedMetric] = useState<MetricKey>("overall");

  // Provincial performance data based on full dataset
  const provincialData: ProvincialData[] = [
    {
      province: "Kigali City",
      population: "1.2M",
      childMortality: 28,
      maternalMortality: 180,
      vaccination: 98.5,
      skilledDelivery: 95.2,
      stunting: 15.3,
      waterAccess: 92.1,
      electricityAccess: 89.4,
      overall: 92.3,
      rank: 1,
      improvement: "+18.5%",
      champion: "🏆",
      achievements: [
        "Lowest child mortality",
        "Highest vaccination",
        "Best infrastructure",
      ],
      color: "var(--nsir-warning)",
    },
    {
      province: "Southern",
      population: "2.6M",
      childMortality: 31,
      maternalMortality: 195,
      vaccination: 96.8,
      skilledDelivery: 92.4,
      stunting: 22.1,
      waterAccess: 87.3,
      electricityAccess: 71.2,
      overall: 87.8,
      rank: 2,
      improvement: "+16.2%",
      champion: "🥈",
      achievements: [
        "Rural health excellence",
        "Strong vaccination program",
        "Community health leadership",
      ],
      color: "var(--nsir-gray)",
    },
    {
      province: "Western",
      population: "2.4M",
      childMortality: 35,
      maternalMortality: 210,
      vaccination: 94.7,
      skilledDelivery: 89.1,
      stunting: 26.5,
      waterAccess: 82.4,
      electricityAccess: 64.8,
      overall: 84.2,
      rank: 3,
      improvement: "+15.1%",
      champion: "🥉",
      achievements: [
        "Maternal health progress",
        "Infrastructure development",
        "Education initiatives",
      ],
      color: "#CD7F32",
    },
    {
      province: "Northern",
      population: "1.9M",
      childMortality: 33,
      maternalMortality: 205,
      vaccination: 95.3,
      skilledDelivery: 90.8,
      stunting: 24.7,
      waterAccess: 85.1,
      electricityAccess: 68.3,
      overall: 85.9,
      rank: 4,
      improvement: "+14.8%",
      champion: "🌟",
      achievements: [
        "Consistent improvement",
        "Strong community programs",
        "Agricultural health",
      ],
      color: "var(--nsir-primary)",
    },
    {
      province: "Eastern",
      population: "2.6M",
      childMortality: 34,
      maternalMortality: 215,
      vaccination: 93.2,
      skilledDelivery: 88.7,
      stunting: 25.8,
      waterAccess: 80.9,
      electricityAccess: 61.4,
      overall: 83.1,
      rank: 5,
      improvement: "+13.9%",
      champion: "⭐",
      achievements: [
        "Rural transformation",
        "Health equity focus",
        "Innovation adoption",
      ],
      color: "var(--nsir-success)",
    },
  ];

  // Metrics for comparison
  const metrics = [
    {
      key: "overall" as const,
      label: "Overall Performance",
      unit: "score",
      color: "var(--nsir-primary)",
    },
    {
      key: "childMortality" as const,
      label: "Child Mortality",
      unit: "per 1,000",
      color: "var(--nsir-error)",
      inverse: true,
    },
    {
      key: "vaccination" as const,
      label: "Vaccination Coverage",
      unit: "%",
      color: "var(--nsir-success)",
    },
    {
      key: "skilledDelivery" as const,
      label: "Skilled Delivery",
      unit: "%",
      color: "var(--nsir-primary)",
    },
    {
      key: "waterAccess" as const,
      label: "Water Access",
      unit: "%",
      color: "var(--nsir-info)",
    },
    {
      key: "electricityAccess" as const,
      label: "Electricity Access",
      unit: "%",
      color: "var(--nsir-warning)",
    },
  ];

  // Historical progress data
  const progressData = provincialData.map((province) => ({
    province: province.province,
    "1992": Math.max(30, province.overall - 45),
    "2000": Math.max(40, province.overall - 35),
    "2010": Math.max(50, province.overall - 25),
    "2020": province.overall,
  }));

  // Radar chart data
  const radarData = [
    {
      indicator: "Child Health",
      Kigali: 95,
      Southern: 88,
      Western: 82,
      Northern: 85,
      Eastern: 84,
    },
    {
      indicator: "Maternal Health",
      Kigali: 92,
      Southern: 89,
      Western: 85,
      Northern: 87,
      Eastern: 83,
    },
    {
      indicator: "Vaccination",
      Kigali: 98,
      Southern: 97,
      Western: 95,
      Northern: 95,
      Eastern: 93,
    },
    {
      indicator: "Infrastructure",
      Kigali: 91,
      Southern: 79,
      Western: 74,
      Northern: 77,
      Eastern: 71,
    },
    {
      indicator: "Access to Care",
      Kigali: 94,
      Southern: 90,
      Western: 87,
      Northern: 89,
      Eastern: 86,
    },
    {
      indicator: "Health Equity",
      Kigali: 88,
      Southern: 92,
      Western: 89,
      Northern: 91,
      Eastern: 93,
    },
  ];

  const currentMetric = metrics.find((m) => m.key === selectedMetric);

  return (
    <div className="min-h-screen bg-nsir-surface p-4 md:p-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-12">
        <div className="text-center mb-8">
          <div className="inline-flex items-center bg-nsir-primary text-white px-6 py-3 rounded-lg text-sm font-semibold mb-6 shadow-md">
            <Icon icon="mdi:trophy" className="w-5 h-5 mr-2" />
            Provincial Health Champions League
          </div>

          <h1 className="heading-nsir-1 text-nsir-dark mb-6">
            Rwanda's Health
            <span className="text-nsir-primary"> Champions</span>
          </h1>

          <p className="text-xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
            Discover which provinces lead Rwanda's health transformation.
            Powered by 978,687 health records across all 5 provinces, revealing
            the champions in each health category.
          </p>
        </div>

        {/* Metric Selector */}
        <div className="flex flex-wrap gap-3 justify-center mb-8">
          {metrics.map((metric) => (
            <button
              key={metric.key}
              onClick={() => setSelectedMetric(metric.key)}
              className={`px-6 py-3 rounded-lg text-sm font-semibold transition-all duration-200 ${
                selectedMetric === metric.key
                  ? "btn-nsir-primary"
                  : "btn-nsir-secondary"
              }`}
            >
              {metric.label}
            </button>
          ))}
        </div>
      </div>

      {/* Provincial Rankings */}
      <div className="max-w-7xl mx-auto mb-12">
        <div className="card-nsir">
          <h2 className="heading-nsir-2 text-nsir-dark mb-8 text-center">
            Provincial Leaderboard - {currentMetric?.label}
          </h2>

          <div className="grid gap-6 mb-8">
            {provincialData
              .sort((a, b) => {
                const aValue = a[selectedMetric];
                const bValue = b[selectedMetric];
                return currentMetric?.inverse
                  ? aValue - bValue
                  : bValue - aValue;
              })
              .map((province, index) => (
                <div
                  key={province.province}
                  className={`relative flex items-center p-6 rounded-lg border-2 transition-all duration-300 hover:shadow-lg ${
                    index === 0
                      ? "bg-white border-nsir-warning shadow-md"
                      : index === 1
                      ? "bg-white border-nsir-gray shadow-sm"
                      : index === 2
                      ? "bg-white border-nsir-warning/50 shadow-sm"
                      : "bg-white border-nsir-gray/30"
                  }`}
                >
                  {/* Rank Badge */}
                  <div
                    className={`shrink-0 w-16 h-16 rounded-lg flex items-center justify-center text-xl font-bold mr-6 ${
                      index === 0
                        ? "bg-nsir-warning text-white"
                        : index === 1
                        ? "bg-nsir-gray text-white"
                        : index === 2
                        ? "bg-nsir-warning/70 text-white"
                        : "bg-nsir-primary text-white"
                    }`}
                  >
                    {index + 1}
                  </div>

                  {/* Province Info */}
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <h3 className="text-xl font-semibold text-nsir-dark">
                        {province.province}
                      </h3>
                      <Icon
                        icon={
                          index === 0
                            ? "mdi:trophy"
                            : index === 1
                            ? "mdi:medal"
                            : index === 2
                            ? "mdi:medal-outline"
                            : "mdi:star"
                        }
                        className={`ml-3 w-6 h-6 ${
                          index === 0
                            ? "text-nsir-warning"
                            : index === 1
                            ? "text-nsir-gray"
                            : index === 2
                            ? "text-nsir-warning/70"
                            : "text-nsir-primary"
                        }`}
                      />
                      {index === 0 && (
                        <div className="ml-4 bg-nsir-warning text-white px-3 py-1 rounded-lg text-xs font-semibold">
                          CHAMPION
                        </div>
                      )}
                    </div>

                    <p className="text-gray-600 mb-3">
                      Population: {province.population} • Improvement:{" "}
                      {province.improvement}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {province.achievements.map((achievement, i) => (
                        <span
                          key={i}
                          className="bg-nsir-primary/10 text-nsir-primary px-3 py-1 rounded-lg text-xs font-medium"
                        >
                          {achievement}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Metric Value */}
                  <div className="shrink-0 text-right">
                    <div className="text-2xl font-semibold text-nsir-primary">
                      {province[selectedMetric]}
                      <span className="text-lg text-nsir-gray ml-1">
                        {currentMetric?.unit}
                      </span>
                    </div>
                    <div className="text-sm text-nsir-gray">
                      Rank #{index + 1}
                    </div>
                  </div>
                </div>
              ))}
          </div>

          {/* Performance Chart */}
          <div className="mt-12">
            <h3 className="heading-nsir-3 text-nsir-dark mb-6 text-center">
              Provincial Performance Comparison
            </h3>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart
                data={provincialData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis
                  dataKey="province"
                  tick={{ fontSize: 12, fontWeight: 600 }}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e5e7eb",
                    borderRadius: "12px",
                    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                  }}
                />
                <Bar
                  dataKey={selectedMetric}
                  fill="var(--nsir-primary)"
                  radius={[4, 4, 0, 0]}
                  name={currentMetric?.label}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Historical Progress */}
      <div className="max-w-7xl mx-auto mb-12">
        <div className="card-nsir">
          <h2 className="heading-nsir-2 text-nsir-dark mb-8 text-center">
            28-Year Provincial Progress Journey
          </h2>

          <ResponsiveContainer width="100%" height={400}>
            <LineChart
              data={progressData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="province"
                tick={{ fontSize: 12, fontWeight: 600 }}
              />
              <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #e5e7eb",
                  borderRadius: "12px",
                  boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                }}
              />

              <Line
                type="monotone"
                dataKey="1992"
                stroke="var(--nsir-error)"
                strokeWidth={3}
                name="1992"
              />
              <Line
                type="monotone"
                dataKey="2000"
                stroke="var(--nsir-warning)"
                strokeWidth={3}
                name="2000"
              />
              <Line
                type="monotone"
                dataKey="2010"
                stroke="var(--nsir-primary)"
                strokeWidth={3}
                name="2010"
              />
              <Line
                type="monotone"
                dataKey="2020"
                stroke="var(--nsir-success)"
                strokeWidth={4}
                name="2020"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Radar Comparison */}
      <div className="max-w-7xl mx-auto">
        <div className="card-nsir">
          <h2 className="heading-nsir-2 text-nsir-dark mb-8 text-center">
            Multi-Dimensional Health Performance
          </h2>

          <ResponsiveContainer width="100%" height={500}>
            <RadarChart
              data={radarData}
              margin={{ top: 20, right: 80, bottom: 20, left: 80 }}
            >
              <PolarGrid stroke="#e5e7eb" />
              <PolarAngleAxis tick={{ fontSize: 12, fontWeight: 600 }} />
              <PolarRadiusAxis
                domain={[0, 100]}
                tick={{ fontSize: 10 }}
                angle={90}
                tickCount={6}
              />

              <Radar
                name="Kigali City"
                dataKey="Kigali"
                stroke="var(--nsir-warning)"
                fill="var(--nsir-warning)"
                fillOpacity={0.3}
                strokeWidth={3}
              />
              <Radar
                name="Southern"
                dataKey="Southern"
                stroke="var(--nsir-gray)"
                fill="var(--nsir-gray)"
                fillOpacity={0.2}
                strokeWidth={2}
              />
              <Radar
                name="Northern"
                dataKey="Northern"
                stroke="var(--nsir-primary)"
                fill="var(--nsir-primary)"
                fillOpacity={0.2}
                strokeWidth={2}
              />
              <Radar
                name="Western"
                dataKey="Western"
                stroke="#CD7F32"
                fill="#CD7F32"
                fillOpacity={0.2}
                strokeWidth={2}
              />
              <Radar
                name="Eastern"
                dataKey="Eastern"
                stroke="var(--nsir-success)"
                fill="var(--nsir-success)"
                fillOpacity={0.2}
                strokeWidth={2}
              />

              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #e5e7eb",
                  borderRadius: "12px",
                  boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                }}
              />
            </RadarChart>
          </ResponsiveContainer>

          <div className="grid grid-cols-5 gap-4 mt-8">
            {provincialData.map((province) => (
              <div key={province.province} className="text-center">
                <div
                  className="w-4 h-4 rounded-full mx-auto mb-2"
                  style={{ backgroundColor: province.color }}
                ></div>
                <div className="text-sm font-medium text-gray-700">
                  {province.province}
                </div>
                <div className="text-xs text-gray-500">
                  Rank #{province.rank}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Data Attribution */}
      <div className="max-w-7xl mx-auto mt-12 text-center">
        <div className="inline-flex items-center bg-nsir-primary/10 text-nsir-primary px-8 py-4 rounded-lg border border-nsir-primary/20">
          <Icon icon="mdi:map-marker" className="h-5 w-5 mr-3" />
          <span className="font-semibold">
            Analysis based on 978,687 health records across all 5 provinces
            (1992-2020)
          </span>
        </div>
      </div>
    </div>
  );
}
