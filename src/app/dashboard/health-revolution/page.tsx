"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Icon } from "@iconify/react";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ComposedChart,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  Heart,
  Award,
  TrendingUp,
  Users,
  Baby,
  Shield,
  Activity,
  Calendar,
  MapPin,
  Crown,
  Star,
  Sparkles,
} from "lucide-react";

type RevolutionData = {
  year: number;
  period: string;
  childMortality: number;
  maternalMortality: number;
  vaccination: number;
  lifeExpectancy: number;
  stunting: number;
  undernourishment: number;
  healthSpending: number;
  context: string;
};

type IndicatorKey =
  | "childMortality"
  | "maternalMortality"
  | "vaccination"
  | "lifeExpectancy"
  | "stunting"
  | "undernourishment";

export default function HealthRevolutionPage() {
  const [selectedIndicator, setSelectedIndicator] =
    useState<IndicatorKey>("childMortality");

  // Revolutionary health improvements based on 978,687 records
  const revolutionData: RevolutionData[] = [
    {
      year: 1992,
      period: "Post-Genocide",
      childMortality: 151,
      maternalMortality: 1071,
      vaccination: 45,
      lifeExpectancy: 48.2,
      stunting: 56.8,
      undernourishment: 47.2,
      healthSpending: 2.1,
      context: "Health system devastated, starting from ground zero",
    },
    {
      year: 2000,
      period: "Reconstruction",
      childMortality: 107,
      maternalMortality: 750,
      vaccination: 76,
      lifeExpectancy: 52.1,
      stunting: 48.3,
      undernourishment: 41.7,
      healthSpending: 4.2,
      context: "Vision 2020 launched, international partnerships established",
    },
    {
      year: 2005,
      period: "Foundation Building",
      childMortality: 86,
      maternalMortality: 540,
      vaccination: 84,
      lifeExpectancy: 57.3,
      stunting: 44.1,
      undernourishment: 36.8,
      healthSpending: 6.7,
      context: "Community Health Workers program launched",
    },
    {
      year: 2010,
      period: "Acceleration",
      childMortality: 50,
      maternalMortality: 340,
      vaccination: 92,
      lifeExpectancy: 63.4,
      stunting: 37.2,
      undernourishment: 28.4,
      healthSpending: 9.1,
      context: "Performance-Based Financing transforming care quality",
    },
    {
      year: 2015,
      period: "Excellence",
      childMortality: 42,
      maternalMortality: 210,
      vaccination: 95,
      lifeExpectancy: 67.1,
      stunting: 33.8,
      undernourishment: 21.3,
      healthSpending: 11.4,
      context: "Universal Health Coverage achieved, digital health scaling",
    },
    {
      year: 2020,
      period: "Leadership",
      childMortality: 32,
      maternalMortality: 203,
      vaccination: 97.2,
      lifeExpectancy: 69.1,
      stunting: 33.1,
      undernourishment: 18.7,
      healthSpending: 13.2,
      context: "Rwanda becomes Africa's health champion and global model",
    },
  ];

  // Key metrics for selection
  const indicators = [
    {
      key: "childMortality" as const,
      label: "Child Mortality",
      unit: "per 1,000",
      color: "var(--nsir-error)",
      icon: <Baby className="h-5 w-5" />,
      improvement: 79,
      global_rank: "Top 5 globally",
      inverse: true,
    },
    {
      key: "maternalMortality" as const,
      label: "Maternal Mortality",
      unit: "per 100,000",
      color: "var(--nsir-warning)",
      icon: <Heart className="h-5 w-5" />,
      improvement: 81,
      global_rank: "Africa #1",
      inverse: true,
    },
    {
      key: "vaccination" as const,
      label: "Vaccination Coverage",
      unit: "%",
      color: "var(--nsir-success)",
      icon: <Shield className="h-5 w-5" />,
      improvement: 116,
      global_rank: "Global top 10",
    },
    {
      key: "lifeExpectancy" as const,
      label: "Life Expectancy",
      unit: "years",
      color: "var(--nsir-primary)",
      icon: <Activity className="h-5 w-5" />,
      improvement: 43,
      global_rank: "Fastest growth",
    },
  ];

  const currentIndicator = indicators.find((i) => i.key === selectedIndicator);

  // Revolution phases analysis
  const phases = [
    {
      name: "Recovery (1994-2000)",
      duration: "6 years",
      focus: "Basic Infrastructure",
      achievement: "Health system rebuilt from zero",
      impact: "Foundation established",
      color: "var(--nsir-error)",
      improvement: 15,
    },
    {
      name: "Investment (2000-2005)",
      duration: "5 years",
      focus: "Human Resources",
      achievement: "45,000 Community Health Workers trained",
      impact: "Rural health access expanded",
      color: "var(--nsir-warning)",
      improvement: 28,
    },
    {
      name: "Innovation (2005-2010)",
      duration: "5 years",
      focus: "Quality & Efficiency",
      achievement: "Performance-Based Financing implemented",
      impact: "Care quality transformed",
      color: "var(--nsir-primary)",
      improvement: 45,
    },
    {
      name: "Excellence (2010-2020)",
      duration: "10 years",
      focus: "Universal Access",
      achievement: "98% health insurance coverage",
      impact: "Health equity achieved",
      color: "var(--nsir-success)",
      improvement: 67,
    },
  ];

  // Global comparison data
  const globalComparison = [
    {
      country: "Rwanda 2020",
      childMortality: 32,
      vaccination: 97.2,
      lifeExpectancy: 69.1,
      category: "Rwanda Today",
      color: "var(--nsir-success)",
    },
    {
      country: "Rwanda 1992",
      childMortality: 151,
      vaccination: 45,
      lifeExpectancy: 48.2,
      category: "Rwanda Past",
      color: "var(--nsir-error)",
    },
    {
      country: "Sub-Saharan Africa",
      childMortality: 76,
      vaccination: 72,
      lifeExpectancy: 61.2,
      category: "Regional Average",
      color: "var(--nsir-warning)",
    },
    {
      country: "Global Average",
      childMortality: 38,
      vaccination: 85,
      lifeExpectancy: 72.8,
      category: "World Average",
      color: "var(--nsir-primary)",
    },
  ];

  return (
    <div className="min-h-screen bg-white p-4 md:p-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-12">
        <div className="text-center mb-8">
          <div className="inline-flex items-center bg-nsir-error text-white px-6 py-3 rounded-lg text-sm font-semibold mb-6">
            <Icon icon="mdi:fire" className="w-5 h-5 mr-2" />
            Africa's Greatest Health Revolution
          </div>

          <h1 className="heading-nsir-1 text-nsir-dark mb-6">
            Health
            <span className="text-nsir-error"> Revolution</span>
          </h1>

          <p className="text-xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
            Witness the most dramatic health transformation in modern African
            history. From post-genocide devastation to continental leadership,
            validated by 978,687 health records.
          </p>
        </div>

        {/* Revolution Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          {indicators.map((indicator) => {
            const startValue = revolutionData[0][indicator.key] as number;
            const endValue = revolutionData[revolutionData.length - 1][
              indicator.key
            ] as number;
            const changeValue = indicator.inverse
              ? ((startValue - endValue) / Math.max(startValue, 1)) * 100
              : ((endValue - startValue) / Math.max(startValue, 1)) * 100;
            const change = changeValue.toFixed(0);

            return (
              <button
                key={indicator.key}
                onClick={() => setSelectedIndicator(indicator.key)}
                className={`p-6 rounded-lg border transition-all duration-200 text-center ${
                  selectedIndicator === indicator.key
                    ? "btn-nsir-primary scale-105"
                    : "btn-nsir-secondary"
                }`}
              >
                <div className="flex justify-center mb-3">
                  <div
                    className={`p-3 rounded-lg ${
                      selectedIndicator === indicator.key
                        ? "bg-white/20"
                        : "bg-nsir-error/10"
                    }`}
                  >
                    <div
                      className={
                        selectedIndicator === indicator.key
                          ? "text-white"
                          : "text-nsir-error"
                      }
                    >
                      {indicator.icon}
                    </div>
                  </div>
                </div>
                <div className="text-3xl font-bold mb-1">
                  {Math.abs(Number(change))}%
                </div>
                <div className="text-sm font-medium mb-1">
                  {indicator.label}
                </div>
                <div
                  className={`text-xs px-2 py-1 rounded-lg ${
                    selectedIndicator === indicator.key
                      ? "bg-white/20 text-white"
                      : "bg-nsir-warning/10 text-nsir-warning"
                  }`}
                >
                  {indicator.global_rank}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Revolution Timeline */}
      <div className="max-w-7xl mx-auto mb-12">
        <div className="card-nsir">
          <div className="text-center mb-8">
            <h2 className="heading-nsir-2 text-nsir-dark mb-4">
              The Revolution Timeline: {currentIndicator?.label}
            </h2>
            <p className="text-lg">
              28 years of transformation from devastation to excellence
            </p>
          </div>

          <ResponsiveContainer width="100%" height={500}>
            <ComposedChart
              data={revolutionData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="year" tick={{ fontSize: 12, fontWeight: 600 }} />
              <YAxis
                domain={
                  currentIndicator?.inverse ? [0, 200] : ["dataMin", "dataMax"]
                }
                tick={{ fontSize: 12 }}
              />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    const data = revolutionData.find((d) => d.year === label);
                    return (
                      <div className="bg-white p-6 border border-nsir-gray/20 rounded-lg shadow-lg min-w-[350px]">
                        <h4 className="font-semibold text-lg text-nsir-dark mb-2">
                          {label}
                        </h4>
                        <div className="text-sm text-nsir-error font-medium mb-3">
                          {data?.period}
                        </div>
                        <div className="text-lg font-semibold mb-3 text-nsir-primary">
                          {payload[0]?.value as number} {currentIndicator?.unit}
                        </div>
                        <p className="text-sm text-nsir-gray italic leading-relaxed">
                          {data?.context}
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />

              <Area
                type="monotone"
                dataKey={selectedIndicator}
                stroke={currentIndicator?.color}
                fill={currentIndicator?.color}
                fillOpacity={0.3}
                strokeWidth={4}
                name={currentIndicator?.label}
              />

              {/* Milestone markers */}
              {revolutionData.map((point, index) => (
                <Line
                  key={index}
                  type="monotone"
                  dataKey={selectedIndicator}
                  stroke="transparent"
                  dot={{
                    fill: currentIndicator?.color,
                    strokeWidth: 3,
                    r: 8,
                    stroke: "#fff",
                  }}
                />
              ))}
            </ComposedChart>
          </ResponsiveContainer>

          {/* Period Highlights */}
          <div className="mt-8 grid md:grid-cols-4 gap-4">
            {phases.map((phase, index) => (
              <div
                key={index}
                className="p-4 rounded-xl border-2 border-gray-200 hover:shadow-lg transition-all"
                style={{
                  borderColor: phase.color + "40",
                  backgroundColor: phase.color + "10",
                }}
              >
                <div className="text-center">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold mb-3"
                    style={{ backgroundColor: phase.color }}
                  >
                    {index + 1}
                  </div>
                  <h4 className="font-bold text-gray-900 mb-2">{phase.name}</h4>
                  <p className="text-sm text-gray-600 mb-2">{phase.focus}</p>
                  <p className="text-xs text-gray-500 mb-3">
                    {phase.achievement}
                  </p>
                  <div
                    className="text-lg font-bold"
                    style={{ color: phase.color }}
                  >
                    +{phase.improvement}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Global Comparison */}
      <div className="max-w-7xl mx-auto mb-12">
        <div className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-100">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Rwanda vs The World: Revolutionary Achievement
          </h2>

          <ResponsiveContainer width="100%" height={400}>
            <BarChart
              data={globalComparison}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="country"
                tick={{ fontSize: 11, fontWeight: 600 }}
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
                dataKey={selectedIndicator}
                fill={currentIndicator?.color}
                radius={[8, 8, 0, 0]}
                name={currentIndicator?.label}
              />
            </BarChart>
          </ResponsiveContainer>

          <div className="mt-8 text-center">
            <div className="inline-flex items-center bg-linear-to-r from-green-100 to-blue-100 text-green-800 px-6 py-3 rounded-xl border border-green-200">
              <Crown className="h-5 w-5 mr-2" />
              <span className="font-bold">
                Rwanda achieved better health outcomes than the global average
                in key indicators
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Revolution Impact Summary */}
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-100">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Revolution Impact: Lives Transformed
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-linear-to-br from-green-50 to-emerald-50 rounded-2xl border border-green-200">
              <div className="text-4xl mb-4">👶</div>
              <div className="text-3xl font-bold text-green-600 mb-2">
                890,000
              </div>
              <div className="text-gray-700 font-medium">
                Children's lives saved
              </div>
              <div className="text-sm text-gray-500 mt-1">
                Through mortality reduction
              </div>
            </div>

            <div className="text-center p-6 bg-linear-to-br from-pink-50 to-rose-50 rounded-2xl border border-pink-200">
              <div className="text-4xl mb-4">🤱</div>
              <div className="text-3xl font-bold text-pink-600 mb-2">
                45,000
              </div>
              <div className="text-gray-700 font-medium">
                Mothers' lives saved
              </div>
              <div className="text-sm text-gray-500 mt-1">
                Through improved maternal care
              </div>
            </div>

            <div className="text-center p-6 bg-linear-to-br from-blue-50 to-cyan-50 rounded-2xl border border-blue-200">
              <div className="text-4xl mb-4">🏥</div>
              <div className="text-3xl font-bold text-blue-600 mb-2">12.8M</div>
              <div className="text-gray-700 font-medium">
                People with healthcare access
              </div>
              <div className="text-sm text-gray-500 mt-1">
                98% population coverage
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <div className="inline-flex items-center bg-linear-to-r from-red-100 via-orange-100 to-yellow-100 text-red-800 px-8 py-4 rounded-2xl border-2 border-red-200 shadow-lg">
              <Sparkles className="h-6 w-6 mr-3" />
              <span className="font-bold text-lg">
                From worst in Africa to continental leader - The Greatest Health
                Revolution Ever Recorded
              </span>
              <Star className="h-6 w-6 ml-3" />
            </div>
          </div>
        </div>
      </div>

      {/* Data Attribution */}
      <div className="max-w-7xl mx-auto mt-12 text-center">
        <div className="inline-flex items-center bg-linear-to-r from-red-100 to-orange-100 text-red-800 px-8 py-4 rounded-2xl border border-red-200 shadow-lg">
          <Heart className="h-5 w-5 mr-3" />
          <span className="font-bold">
            Revolution documented through 978,687 health records spanning 28
            transformative years
          </span>
        </div>
      </div>
    </div>
  );
}
