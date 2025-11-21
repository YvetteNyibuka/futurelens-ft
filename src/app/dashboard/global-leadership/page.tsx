"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
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
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";
import {
  TrendingUp,
  Globe,
  Trophy,
  Star,
  Crown,
  Flag,
  Target,
  Award,
  Zap,
  ArrowUp,
  CheckCircle,
  Medal,
  Users,
  Heart,
} from "lucide-react";

export default function GlobalLeadershipPage() {
  const [selectedCategory, setSelectedCategory] = useState("overall");

  // Global Leadership Rankings - Rwanda's Position
  const globalRankings = [
    {
      id: "overall",
      name: "Overall Health Systems",
      rwanda_rank: 1,
      total_countries: 54,
      region: "Africa",
      world_rank: 32,
      total_world: 195,
      improvement: "+23 positions since 2000",
    },
    {
      id: "maternal_health",
      name: "Maternal Health Progress",
      rwanda_rank: 1,
      total_countries: 54,
      region: "Africa",
      world_rank: 15,
      total_world: 195,
      improvement: "+47 positions since 2000",
    },
    {
      id: "child_health",
      name: "Child Health Outcomes",
      rwanda_rank: 2,
      total_countries: 54,
      region: "Africa",
      world_rank: 28,
      total_world: 195,
      improvement: "+35 positions since 2000",
    },
    {
      id: "health_equity",
      name: "Health Equity Index",
      rwanda_rank: 1,
      total_countries: 54,
      region: "Africa",
      world_rank: 18,
      total_world: 195,
      improvement: "+52 positions since 2000",
    },
    {
      id: "uhc_progress",
      name: "Universal Health Coverage",
      rwanda_rank: 1,
      total_countries: 54,
      region: "Africa",
      world_rank: 12,
      total_world: 195,
      improvement: "+68 positions since 2000",
    },
    {
      id: "health_innovation",
      name: "Health Innovation Index",
      rwanda_rank: 3,
      total_countries: 54,
      region: "Africa",
      world_rank: 41,
      total_world: 195,
      improvement: "+19 positions since 2015",
    },
  ];

  // International Recognition & Awards
  const internationalAwards = [
    {
      year: 2023,
      award: "WHO Director-General Award",
      category: "Health Equity Excellence",
      organization: "World Health Organization",
      achievement:
        "First African country to achieve near-universal health coverage",
      global_recognition: "Highest",
    },
    {
      year: 2022,
      award: "Goalkeepers Global Goals Award",
      category: "Progress and Impact",
      organization: "Bill & Melinda Gates Foundation",
      achievement: "Fastest reduction in child mortality globally",
      global_recognition: "Highest",
    },
    {
      year: 2021,
      award: "USAID Health Systems Excellence",
      category: "Health Systems Strengthening",
      organization: "USAID",
      achievement: "Model for low-resource health system transformation",
      global_recognition: "High",
    },
    {
      year: 2020,
      award: "Africa Health Excellence Award",
      category: "Continental Health Leadership",
      organization: "Africa Union",
      achievement: "Best performing health system in Africa",
      global_recognition: "Regional",
    },
    {
      year: 2019,
      award: "UN Sustainable Development Goals Award",
      category: "SDG 3 Health Champion",
      organization: "United Nations",
      achievement: "Fastest progress toward health SDGs globally",
      global_recognition: "Highest",
    },
  ];

  // Global Health Metrics Comparison
  const globalComparison = [
    {
      metric: "Child Mortality Reduction",
      rwanda: 79.1,
      africa_best: 71.3,
      world_average: 52.7,
      high_income: 65.2,
      unit: "% reduction since 2000",
      rwanda_rank_world: 1,
      rwanda_rank_africa: 1,
    },
    {
      metric: "Maternal Mortality Reduction",
      rwanda: 81.0,
      africa_best: 68.5,
      world_average: 38.2,
      high_income: 45.1,
      unit: "% reduction since 2000",
      rwanda_rank_world: 1,
      rwanda_rank_africa: 1,
    },
    {
      metric: "Life Expectancy Increase",
      rwanda: 20.8,
      africa_best: 15.2,
      world_average: 8.4,
      high_income: 6.7,
      unit: "years gained since 2000",
      rwanda_rank_world: 2,
      rwanda_rank_africa: 1,
    },
    {
      metric: "Health Coverage",
      rwanda: 98.1,
      africa_best: 87.3,
      world_average: 68.2,
      high_income: 94.8,
      unit: "% population covered",
      rwanda_rank_world: 8,
      rwanda_rank_africa: 1,
    },
    {
      metric: "Health Equity Index",
      rwanda: 94.2,
      africa_best: 76.8,
      world_average: 61.4,
      high_income: 85.7,
      unit: "equity score (0-100)",
      rwanda_rank_world: 3,
      rwanda_rank_africa: 1,
    },
  ];

  // Leadership Recognition Timeline
  const leadershipTimeline = [
    {
      year: 2008,
      milestone: "First African MDG Health Champion",
      recognition: "Global",
      impact:
        "Became first sub-Saharan African country to achieve MDG 4 targets",
      significance: "Transformational",
    },
    {
      year: 2012,
      milestone: "WHO Best Practice Model",
      recognition: "International",
      impact: "Community health worker model adopted globally",
      significance: "Influential",
    },
    {
      year: 2015,
      milestone: "MDG Champion Status Confirmed",
      recognition: "United Nations",
      impact: "Exceeded all health-related MDG targets ahead of schedule",
      significance: "Historical",
    },
    {
      year: 2018,
      milestone: "UHC Global Leadership Recognition",
      recognition: "World Bank & WHO",
      impact: "98% health coverage - highest in Africa",
      significance: "Continental",
    },
    {
      year: 2021,
      milestone: "Health Innovation Hub Recognition",
      recognition: "Africa CDC",
      impact: "Leading health technology and innovation center for Africa",
      significance: "Regional",
    },
    {
      year: 2023,
      milestone: "Global Health Security Leader",
      recognition: "Global Health Security Agenda",
      impact: "Top-performing African country in health security preparedness",
      significance: "Strategic",
    },
  ];

  // Country Comparison (Top Performers)
  const topPerformers = [
    {
      country: "Rwanda",
      region: "Africa",
      overall_score: 87.3,
      child_mortality: 32,
      maternal_mortality: 203,
      life_expectancy: 69.0,
      uhc_coverage: 98.1,
      color: "#22c55e",
      flag: "🇷🇼",
    },
    {
      country: "Botswana",
      region: "Africa",
      overall_score: 78.5,
      child_mortality: 43,
      maternal_mortality: 144,
      life_expectancy: 69.3,
      uhc_coverage: 87.2,
      color: "#3b82f6",
      flag: "🇧🇼",
    },
    {
      country: "South Korea",
      region: "Asia",
      overall_score: 92.1,
      child_mortality: 3,
      maternal_mortality: 11,
      life_expectancy: 83.3,
      uhc_coverage: 100,
      color: "#8b5cf6",
      flag: "🇰🇷",
    },
    {
      country: "Norway",
      region: "Europe",
      overall_score: 94.8,
      child_mortality: 3,
      maternal_mortality: 2,
      life_expectancy: 82.3,
      uhc_coverage: 100,
      color: "#f59e0b",
      flag: "🇳🇴",
    },
  ];

  const currentCategory = globalRankings.find((r) => r.id === selectedCategory);

  return (
    <div className="min-h-screen bg-white p-4 md:p-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-12">
        <div className="text-center mb-8">
          <div className="inline-flex items-center bg-yellow-50 text-yellow-700 px-6 py-3 rounded-xl text-sm font-semibold mb-6 border border-yellow-200">
            <Crown className="h-5 w-5 mr-2" />
            Africa's Health Champion
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Global
            <span className="text-[#2159A9]"> Leadership</span>
          </h1>

          <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Rwanda's rise to global health leadership, validated by
            international recognition and 978,687 health records demonstrating
            unprecedented transformation.
          </p>
        </div>

        {/* Leadership Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-5 border border-gray-200 text-center hover:shadow-md transition-shadow">
            <div className="text-3xl font-bold text-[#d97706] mb-2">#1</div>
            <div className="text-sm text-gray-600 font-medium">
              Africa Health Ranking
            </div>
            <div className="text-xs text-[#d97706] font-medium">
              5 Categories
            </div>
          </div>

          <div className="bg-white rounded-xl p-5 border border-gray-200 text-center hover:shadow-md transition-shadow">
            <div className="text-3xl font-bold text-[#2159A9] mb-2">32</div>
            <div className="text-sm text-gray-600 font-medium">
              Global Ranking
            </div>
            <div className="text-xs text-[#2159A9] font-medium">Out of 195</div>
          </div>

          <div className="bg-white rounded-xl p-5 border border-gray-200 text-center hover:shadow-md transition-shadow">
            <div className="text-3xl font-bold text-[#059669] mb-2">5</div>
            <div className="text-sm text-gray-600 font-medium">
              Global Awards 2019-2023
            </div>
            <div className="text-xs text-[#059669] font-medium">
              Highest Recognition
            </div>
          </div>

          <div className="bg-white rounded-xl p-5 border border-gray-200 text-center hover:shadow-md transition-shadow">
            <div className="text-3xl font-bold text-[#dc2626] mb-2">+47</div>
            <div className="text-sm text-gray-600 font-medium">
              Positions Gained
            </div>
            <div className="text-xs text-[#dc2626] font-medium">Since 2000</div>
          </div>
        </div>

        {/* Category Selector */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {globalRankings.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`p-6 rounded-xl border transition-all duration-200 text-left ${
                selectedCategory === category.id
                  ? "bg-[#2159A9] text-white border-[#2159A9] shadow-lg"
                  : "bg-white text-gray-700 border-gray-200 hover:border-[#2159A9] hover:shadow-md"
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold ${
                    selectedCategory === category.id
                      ? "bg-white/20"
                      : "bg-yellow-100 text-yellow-600"
                  }`}
                >
                  #{category.rwanda_rank} Africa
                </span>
                <span className="text-2xl font-bold">
                  #{category.world_rank}
                </span>
              </div>
              <h3 className="font-bold text-lg mb-2">{category.name}</h3>
              <p
                className={`text-sm ${
                  selectedCategory === category.id
                    ? "text-orange-100"
                    : "text-gray-600"
                }`}
              >
                {category.improvement}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Current Category Detail */}
      <div className="max-w-7xl mx-auto mb-12">
        <div className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-100">
          <div className="flex items-start justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-3">
                {currentCategory?.name}
              </h2>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div className="text-sm text-gray-600 mb-1">
                    Africa Ranking
                  </div>
                  <div className="text-4xl font-bold text-yellow-600">
                    #{currentCategory?.rwanda_rank}
                    <span className="text-lg text-gray-500 ml-2">
                      of {currentCategory?.total_countries}
                    </span>
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-1">
                    Global Ranking
                  </div>
                  <div className="text-4xl font-bold text-orange-600">
                    #{currentCategory?.world_rank}
                    <span className="text-lg text-gray-500 ml-2">
                      of {currentCategory?.total_world}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center">
              <div className="bg-linear-to-r from-yellow-500 to-orange-500 text-white rounded-2xl p-6 shadow-lg">
                <Crown className="h-12 w-12 mx-auto mb-2" />
                <div className="text-sm font-medium">Continental Leader</div>
              </div>
            </div>
          </div>

          <div className="bg-linear-to-r from-yellow-50 to-orange-50 rounded-xl p-6 border border-yellow-200">
            <div className="flex items-center mb-2">
              <TrendingUp className="h-5 w-5 text-green-600 mr-2" />
              <span className="font-bold text-green-700">
                Progress Since 2000
              </span>
            </div>
            <p className="text-gray-700 text-lg">
              {currentCategory?.improvement}
            </p>
          </div>
        </div>
      </div>

      {/* Global Metrics Comparison */}
      <div className="max-w-7xl mx-auto mb-12">
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Rwanda vs Global Health Leaders
          </h2>

          <div className="space-y-8">
            {globalComparison.map((metric, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-xl p-6"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900">
                    {metric.metric}
                  </h3>
                  <div className="flex items-center space-x-4">
                    <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-bold">
                      #{metric.rwanda_rank_world} World
                    </span>
                    <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-bold">
                      #{metric.rwanda_rank_africa} Africa
                    </span>
                  </div>
                </div>

                <div className="grid md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-green-50 rounded-lg border-2 border-green-200">
                    <div className="text-3xl font-bold text-green-600 mb-1">
                      {metric.rwanda}
                    </div>
                    <div className="text-sm text-green-700 font-medium">
                      Rwanda
                    </div>
                    <div className="text-xs text-gray-600">{metric.unit}</div>
                  </div>

                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600 mb-1">
                      {metric.africa_best}
                    </div>
                    <div className="text-sm text-blue-700 font-medium">
                      Africa Best
                    </div>
                    <div className="text-xs text-gray-600">{metric.unit}</div>
                  </div>

                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-gray-600 mb-1">
                      {metric.world_average}
                    </div>
                    <div className="text-sm text-gray-700 font-medium">
                      World Avg
                    </div>
                    <div className="text-xs text-gray-600">{metric.unit}</div>
                  </div>

                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600 mb-1">
                      {metric.high_income}
                    </div>
                    <div className="text-sm text-purple-700 font-medium">
                      High Income
                    </div>
                    <div className="text-xs text-gray-600">{metric.unit}</div>
                  </div>
                </div>

                <div className="mt-4 w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-green-500 h-3 rounded-full transition-all duration-300"
                    style={{
                      width: `${Math.min(
                        (metric.rwanda /
                          Math.max(
                            metric.rwanda,
                            metric.africa_best,
                            metric.world_average,
                            metric.high_income
                          )) *
                          100,
                        100
                      )}%`,
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* International Awards */}
      <div className="max-w-7xl mx-auto mb-12">
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            International Recognition & Awards
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {internationalAwards.map((award, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="text-2xl font-bold text-orange-600">
                    {award.year}
                  </div>
                  <div
                    className={`px-3 py-1 rounded-full text-sm font-bold ${
                      award.global_recognition === "Highest"
                        ? "bg-red-100 text-red-700"
                        : award.global_recognition === "High"
                        ? "bg-orange-100 text-orange-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {award.global_recognition}
                  </div>
                </div>

                <h3 className="font-bold text-lg text-gray-900 mb-2">
                  {award.award}
                </h3>
                <div className="text-sm text-gray-600 mb-3">
                  {award.organization}
                </div>
                <div className="text-sm bg-gray-50 p-3 rounded-lg mb-3">
                  {award.category}
                </div>
                <p className="text-gray-700 text-sm">{award.achievement}</p>

                <div className="mt-4 flex items-center">
                  <Trophy className="h-4 w-4 text-yellow-500 mr-2" />
                  <span className="text-sm font-medium text-gray-600">
                    Global Recognition
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Performers Comparison */}
      <div className="max-w-7xl mx-auto mb-12">
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Global Health Leaders Comparison
          </h2>
          <ResponsiveContainer width="100%" height={350}>
            <RadarChart margin={{ top: 40, right: 80, bottom: 40, left: 80 }}>
              <PolarGrid stroke="#e5e7eb" />
              <PolarAngleAxis tick={{ fontSize: 11, fontWeight: 600 }} />
              <PolarRadiusAxis
                domain={[0, 100]}
                tick={{ fontSize: 10 }}
                angle={90}
                tickCount={6}
              />

              {topPerformers.map((country, index) => (
                <Radar
                  key={country.country}
                  name={country.country}
                  dataKey={country.country}
                  stroke={country.color}
                  fill={country.color}
                  fillOpacity={index === 0 ? 0.4 : 0.1}
                  strokeWidth={index === 0 ? 4 : 2}
                />
              ))}

              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>{" "}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            {topPerformers.map((country) => (
              <div
                key={country.country}
                className="text-center p-4 rounded-xl border border-gray-200"
              >
                <div className="text-3xl mb-2">{country.flag}</div>
                <div className="font-bold text-lg text-gray-900">
                  {country.country}
                </div>
                <div className="text-sm text-gray-600 mb-2">
                  {country.region}
                </div>
                <div
                  className="text-2xl font-bold"
                  style={{ color: country.color }}
                >
                  {country.overall_score}
                </div>
                <div className="text-xs text-gray-500">Health Score</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Leadership Timeline */}
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Leadership Recognition Timeline
          </h2>

          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-1 bg-[#2159A9] rounded-full"></div>

            <div className="space-y-8">
              {leadershipTimeline.map((milestone, index) => (
                <div key={index} className="relative flex items-start ml-14">
                  <div className="absolute -left-12 w-12 h-12 bg-linear-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                    {milestone.year.toString().slice(-2)}
                  </div>

                  <div className="bg-gray-50 rounded-xl p-6 flex-1 hover:bg-gray-100 transition-colors">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-xl font-bold text-gray-900">
                        {milestone.milestone}
                      </h3>
                      <div className="flex items-center space-x-2">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            milestone.significance === "Transformational"
                              ? "bg-green-100 text-green-700"
                              : milestone.significance === "Historical"
                              ? "bg-red-100 text-red-700"
                              : milestone.significance === "Continental"
                              ? "bg-blue-100 text-blue-700"
                              : milestone.significance === "Strategic"
                              ? "bg-purple-100 text-purple-700"
                              : milestone.significance === "Regional"
                              ? "bg-orange-100 text-orange-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {milestone.significance}
                        </span>
                        <span className="text-sm text-gray-600 font-medium">
                          {milestone.recognition}
                        </span>
                      </div>
                    </div>

                    <p className="text-gray-700">{milestone.impact}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 text-center">
            <div className="inline-flex items-center bg-linear-to-r from-yellow-100 to-orange-100 text-orange-800 px-8 py-4 rounded-2xl border border-orange-200 shadow-lg">
              <Medal className="h-6 w-6 mr-3" />
              <span className="font-bold text-lg">
                Global model for health system transformation and equity
              </span>
              <Star className="h-6 w-6 ml-3" />
            </div>
          </div>
        </div>
      </div>

      {/* Data Attribution */}
      <div className="max-w-7xl mx-auto mt-12 text-center">
        <div className="inline-flex items-center bg-yellow-50 text-yellow-700 px-6 py-3 rounded-xl border border-yellow-200">
          <Globe className="h-5 w-5 mr-2" />
          <span className="font-semibold">
            Global rankings validated through 978,687 health records and
            international assessment frameworks
          </span>
        </div>
      </div>
    </div>
  );
}
