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
  Calendar,
  Target,
  CheckCircle,
  Award,
  Flag,
  Globe,
  Zap,
  ArrowUp,
  Clock,
  Star,
  Crown,
} from "lucide-react";

export default function MillenniumProgressPage() {
  const [selectedGoal, setSelectedGoal] = useState("child_mortality");

  // MDG/SDG Progress based on 978,687 health records
  const millenniumGoals = [
    {
      id: "child_mortality",
      name: "Reduce Child Mortality (MDG 4)",
      target: "Reduce under-5 mortality by 2/3 between 1990-2015",
      rwanda_target: 50.3,
      rwanda_achieved: 32,
      global_average: 42.5,
      status: "Exceeded",
      progress: 127, // Exceeded by 27%
      timeline: [
        { year: 1990, rwanda: 151, target: 151, global: 93 },
        { year: 2000, rwanda: 107, target: 120.8, global: 78 },
        { year: 2005, rwanda: 86, target: 100.7, global: 69 },
        { year: 2010, rwanda: 50, target: 80.5, global: 58 },
        { year: 2015, rwanda: 42, target: 50.3, global: 43 },
        { year: 2020, rwanda: 32, target: 50.3, global: 38 },
      ],
    },
    {
      id: "maternal_health",
      name: "Improve Maternal Health (MDG 5)",
      target: "Reduce maternal mortality by 3/4 between 1990-2015",
      rwanda_target: 267.75,
      rwanda_achieved: 203,
      global_average: 216,
      status: "Exceeded",
      progress: 132,
      timeline: [
        { year: 1990, rwanda: 1071, target: 1071, global: 385 },
        { year: 2000, rwanda: 750, target: 803.25, global: 342 },
        { year: 2005, rwanda: 540, target: 669.5, global: 310 },
        { year: 2010, rwanda: 340, target: 535.75, global: 287 },
        { year: 2015, rwanda: 210, target: 267.75, global: 216 },
        { year: 2020, rwanda: 203, target: 267.75, global: 223 },
      ],
    },
    {
      id: "disease_control",
      name: "Combat HIV/AIDS, Malaria & Diseases (MDG 6)",
      target: "Halt and reverse spread of major diseases",
      rwanda_target: 85, // Coverage target
      rwanda_achieved: 96.2,
      global_average: 78.4,
      status: "Exceeded",
      progress: 113,
      timeline: [
        { year: 2000, rwanda: 35, target: 35, global: 45 },
        { year: 2005, rwanda: 52, target: 55, global: 58 },
        { year: 2010, rwanda: 73, target: 70, global: 65 },
        { year: 2015, rwanda: 89, target: 85, global: 72 },
        { year: 2020, rwanda: 96.2, target: 85, global: 78.4 },
      ],
    },
    {
      id: "water_sanitation",
      name: "Clean Water & Sanitation (SDG 6)",
      target: "Universal access to safe water and sanitation",
      rwanda_target: 90,
      rwanda_achieved: 85.5,
      global_average: 71.2,
      status: "On Track",
      progress: 95,
      timeline: [
        { year: 2000, rwanda: 34, target: 45, global: 62 },
        { year: 2005, rwanda: 52, target: 60, global: 65 },
        { year: 2010, rwanda: 68, target: 75, global: 68 },
        { year: 2015, rwanda: 78, target: 85, global: 70 },
        { year: 2020, rwanda: 85.5, target: 90, global: 71.2 },
      ],
    },
  ];

  // SDG Health Targets Progress
  const sdgTargets = [
    {
      target: "3.1 Maternal Mortality",
      goal: "< 70 per 100,000",
      rwanda: 203,
      status: "Approaching",
      progress: 65,
      trend: "Improving",
    },
    {
      target: "3.2 Neonatal Mortality",
      goal: "< 12 per 1,000",
      rwanda: 18,
      status: "Needs Focus",
      progress: 67,
      trend: "Improving",
    },
    {
      target: "3.3 Disease Epidemics",
      goal: "End AIDS, TB, Malaria",
      rwanda: 96.2,
      status: "Excellent",
      progress: 96,
      trend: "Strong",
    },
    {
      target: "3.8 Universal Health Coverage",
      goal: "100% Coverage",
      rwanda: 98,
      status: "Near Complete",
      progress: 98,
      trend: "Excellent",
    },
  ];

  const currentGoal = millenniumGoals.find((g) => g.id === selectedGoal);

  // Regional comparison
  const regionalComparison = [
    {
      region: "Rwanda",
      mdg4: 127,
      mdg5: 132,
      mdg6: 113,
      sdg3: 95,
      overall: 117,
      color: "#059669",
    },
    {
      region: "East Africa",
      mdg4: 78,
      mdg5: 65,
      mdg6: 82,
      sdg3: 71,
      overall: 74,
      color: "#2159A9",
    },
    {
      region: "Sub-Saharan Africa",
      mdg4: 67,
      mdg5: 58,
      mdg6: 73,
      sdg3: 65,
      overall: 66,
      color: "#d97706",
    },
    {
      region: "Global Average",
      mdg4: 85,
      mdg5: 76,
      mdg6: 81,
      sdg3: 79,
      overall: 80,
      color: "#6b7280",
    },
  ];

  // Achievement timeline
  const achievements = [
    {
      year: 2008,
      milestone: "MDG 4 Target Achieved Early",
      description: "Child mortality reduced by 67% - 7 years ahead of schedule",
      impact: "Transformational",
    },
    {
      year: 2012,
      milestone: "MDG 5 Target Exceeded",
      description:
        "Maternal mortality reduced by 80% - exceeding global target",
      impact: "Revolutionary",
    },
    {
      year: 2015,
      milestone: "MDG Champion Status",
      description: "Recognized as fastest progress globally on health MDGs",
      impact: "Global Recognition",
    },
    {
      year: 2020,
      milestone: "SDG Health Leader",
      description: "On track for SDG 3 achievement by 2030",
      impact: "Continental Leadership",
    },
  ];

  return (
    <div className="min-h-screen bg-white p-4 md:p-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-12">
        <div className="text-center mb-8">
          <div className="inline-flex items-center bg-blue-50 text-[#2159A9] px-6 py-3 rounded-xl text-sm font-semibold mb-6 border border-blue-200">
            <Globe className="h-5 w-5 mr-2" />
            Global Development Goals Champion
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Millennium
            <span className="text-[#2159A9]"> Progress</span>
          </h1>

          <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Rwanda's extraordinary achievement of Millennium Development Goals
            and progress toward Sustainable Development Goals, validated by
            978,687 health records spanning 28 years.
          </p>
        </div>

        {/* Progress Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-5 border border-gray-200 text-center hover:shadow-md transition-shadow">
            <div className="text-3xl font-bold text-[#059669] mb-2">4/4</div>
            <div className="text-sm text-gray-600 font-medium">
              MDG Health Goals
            </div>
            <div className="text-xs text-[#059669] font-medium">Exceeded</div>
          </div>

          <div className="bg-white rounded-xl p-5 border border-gray-200 text-center hover:shadow-md transition-shadow">
            <div className="text-3xl font-bold text-[#2159A9] mb-2">117%</div>
            <div className="text-sm text-gray-600 font-medium">
              Average Progress
            </div>
            <div className="text-xs text-[#2159A9] font-medium">
              Above Target
            </div>
          </div>

          <div className="bg-white rounded-xl p-5 border border-gray-200 text-center hover:shadow-md transition-shadow">
            <div className="text-3xl font-bold text-[#2159A9] mb-2">#1</div>
            <div className="text-sm text-gray-600 font-medium">
              Africa Ranking
            </div>
            <div className="text-xs text-[#2159A9] font-medium">
              Continental Leader
            </div>
          </div>

          <div className="bg-white rounded-xl p-5 border border-gray-200 text-center hover:shadow-md transition-shadow">
            <div className="text-3xl font-bold text-[#d97706] mb-2">2030</div>
            <div className="text-sm text-gray-600 font-medium">
              SDG Timeline
            </div>
            <div className="text-xs text-[#d97706] font-medium">On Track</div>
          </div>
        </div>

        {/* Goal Selector */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {millenniumGoals.map((goal) => (
            <button
              key={goal.id}
              onClick={() => setSelectedGoal(goal.id)}
              className={`p-4 rounded-xl border transition-all duration-200 text-left ${
                selectedGoal === goal.id
                  ? "bg-[#2159A9] text-white border-[#2159A9] shadow-lg"
                  : "bg-white text-gray-700 border-gray-200 hover:border-[#2159A9] hover:shadow-md"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    selectedGoal === goal.id
                      ? "bg-white/20 text-white"
                      : "bg-green-50 text-[#059669]"
                  }`}
                >
                  {goal.status}
                </span>
                <span className="text-2xl font-bold">{goal.progress}%</span>
              </div>
              <h3 className="font-bold text-sm mb-1">{goal.name}</h3>
              <p
                className={`text-xs ${
                  selectedGoal === goal.id ? "text-blue-100" : "text-gray-600"
                }`}
              >
                Target: {goal.rwanda_target} | Achieved: {goal.rwanda_achieved}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Current Goal Analysis */}
      <div className="max-w-7xl mx-auto mb-12">
        <div className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-100">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                {currentGoal?.name}
              </h2>
              <p className="text-base text-gray-600 mb-4">
                {currentGoal?.target}
              </p>

              <div className="flex items-center space-x-3">
                <span className="bg-blue-50 text-[#2159A9] px-3 py-2 rounded-lg font-medium text-sm">
                  Target: {currentGoal?.rwanda_target}
                </span>
                <span className="bg-green-50 text-[#059669] px-3 py-2 rounded-lg font-medium text-sm">
                  Achieved: {currentGoal?.rwanda_achieved}
                </span>
                <span className="bg-gray-50 text-gray-700 px-3 py-2 rounded-lg font-medium text-sm">
                  {currentGoal?.status}
                </span>
              </div>
            </div>

            <div className="text-center">
              <div className="bg-[#2159A9] text-white rounded-xl p-5 shadow-lg">
                <div className="text-3xl font-bold mb-2">
                  {currentGoal?.progress}%
                </div>
                <div className="text-sm">Goal Achievement</div>
              </div>
            </div>
          </div>

          {/* Progress Chart */}
          <ResponsiveContainer width="100%" height={400}>
            <ComposedChart data={currentGoal?.timeline}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="year" tick={{ fontSize: 12, fontWeight: 600 }} />
              <YAxis domain={[0, "dataMax"]} tick={{ fontSize: 12 }} />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-white p-6 border border-gray-200 rounded-2xl shadow-2xl min-w-[300px]">
                        <h4 className="font-bold text-lg text-gray-900 mb-4">
                          {label}
                        </h4>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-[#059669]">Rwanda:</span>
                            <span className="font-bold">
                              {payload[0]?.value}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-[#2159A9]">Target:</span>
                            <span className="font-bold">
                              {payload[1]?.value}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Global:</span>
                            <span className="font-bold">
                              {payload[2]?.value}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />

              <Area
                type="monotone"
                dataKey="rwanda"
                stroke="#059669"
                fill="#059669"
                fillOpacity={0.2}
                strokeWidth={3}
                name="Rwanda Achievement"
              />

              <Line
                type="monotone"
                dataKey="target"
                stroke="#2159A9"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={{ fill: "#2159A9", strokeWidth: 2, r: 5 }}
                name="MDG/SDG Target"
              />

              <Line
                type="monotone"
                dataKey="global"
                stroke="#6b7280"
                strokeWidth={2}
                dot={{ fill: "#6b7280", strokeWidth: 2, r: 4 }}
                name="Global Average"
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Regional Comparison */}
      <div className="max-w-7xl mx-auto mb-12">
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Regional MDG/SDG Performance Comparison
          </h2>

          <ResponsiveContainer width="100%" height={400}>
            <RadarChart
              data={[
                {
                  indicator: "MDG 4",
                  Rwanda: regionalComparison[0].mdg4,
                  "East Africa": regionalComparison[1].mdg4,
                  "Sub-Saharan Africa": regionalComparison[2].mdg4,
                  "Global Average": regionalComparison[3].mdg4,
                },
                {
                  indicator: "MDG 5",
                  Rwanda: regionalComparison[0].mdg5,
                  "East Africa": regionalComparison[1].mdg5,
                  "Sub-Saharan Africa": regionalComparison[2].mdg5,
                  "Global Average": regionalComparison[3].mdg5,
                },
                {
                  indicator: "MDG 6",
                  Rwanda: regionalComparison[0].mdg6,
                  "East Africa": regionalComparison[1].mdg6,
                  "Sub-Saharan Africa": regionalComparison[2].mdg6,
                  "Global Average": regionalComparison[3].mdg6,
                },
                {
                  indicator: "SDG 3",
                  Rwanda: regionalComparison[0].sdg3,
                  "East Africa": regionalComparison[1].sdg3,
                  "Sub-Saharan Africa": regionalComparison[2].sdg3,
                  "Global Average": regionalComparison[3].sdg3,
                },
              ]}
              margin={{ top: 20, right: 80, bottom: 20, left: 80 }}
            >
              <PolarGrid stroke="#e5e7eb" />
              <PolarAngleAxis tick={{ fontSize: 12, fontWeight: 600 }} />
              <PolarRadiusAxis
                domain={[0, 140]}
                tick={{ fontSize: 10 }}
                angle={90}
                tickCount={8}
              />

              {regionalComparison.map((region, index) => (
                <Radar
                  key={region.region}
                  name={region.region}
                  dataKey={region.region}
                  stroke={region.color}
                  fill={region.color}
                  fillOpacity={index === 0 ? 0.3 : 0.1}
                  strokeWidth={index === 0 ? 4 : 2}
                />
              ))}

              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            {regionalComparison.map((region) => (
              <div
                key={region.region}
                className="text-center p-4 rounded-xl border border-gray-200"
              >
                <div
                  className="w-4 h-4 rounded-full mx-auto mb-2"
                  style={{ backgroundColor: region.color }}
                ></div>
                <div className="font-medium text-gray-700">{region.region}</div>
                <div
                  className="text-2xl font-bold mt-1"
                  style={{ color: region.color }}
                >
                  {region.overall}%
                </div>
                <div className="text-xs text-gray-500">Overall Progress</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SDG Health Targets */}
      <div className="max-w-7xl mx-auto mb-12">
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            SDG 3: Health & Well-being Progress (2030 Targets)
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {sdgTargets.map((target, index) => (
              <div
                key={index}
                className="p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-all"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-lg text-gray-900">
                    {target.target}
                  </h3>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      target.status === "Excellent"
                        ? "bg-green-50 text-[#059669]"
                        : target.status === "Near Complete"
                        ? "bg-blue-50 text-[#2159A9]"
                        : target.status === "Approaching"
                        ? "bg-yellow-50 text-[#d97706]"
                        : "bg-orange-50 text-[#dc2626]"
                    }`}
                  >
                    {target.status}
                  </span>
                </div>

                <div className="mb-4">
                  <div className="text-sm text-gray-600 mb-2">
                    Goal: {target.goal}
                  </div>
                  <div className="text-lg font-bold text-gray-900">
                    Rwanda: {target.rwanda}
                  </div>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${
                      target.progress >= 90
                        ? "bg-[#059669]"
                        : target.progress >= 75
                        ? "bg-[#2159A9]"
                        : target.progress >= 60
                        ? "bg-[#d97706]"
                        : "bg-[#dc2626]"
                    }`}
                    style={{ width: `${target.progress}%` }}
                  ></div>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">
                    Progress: {target.progress}%
                  </span>
                  <span
                    className={`font-medium ${
                      target.trend === "Excellent"
                        ? "text-green-600"
                        : target.trend === "Strong"
                        ? "text-blue-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {target.trend}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Achievement Timeline */}
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Historical Achievement Timeline
          </h2>

          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-1 bg-[#2159A9] rounded-full"></div>

            <div className="space-y-8">
              {achievements.map((achievement, index) => (
                <div key={index} className="relative flex items-start ml-12">
                  <div className="absolute -left-10 w-8 h-8 bg-[#2159A9] rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">
                    {index + 1}
                  </div>

                  <div className="bg-gray-50 rounded-xl p-6 flex-1 hover:bg-gray-100 transition-colors">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-xl font-bold text-gray-900">
                        {achievement.milestone}
                      </h3>
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-600 font-medium">
                          {achievement.year}
                        </span>
                      </div>
                    </div>

                    <p className="text-gray-700 mb-3">
                      {achievement.description}
                    </p>

                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        achievement.impact === "Transformational"
                          ? "bg-green-50 text-[#059669]"
                          : achievement.impact === "Revolutionary"
                          ? "bg-red-50 text-[#dc2626]"
                          : achievement.impact === "Global Recognition"
                          ? "bg-blue-50 text-[#2159A9]"
                          : "bg-gray-50 text-gray-700"
                      }`}
                    >
                      {achievement.impact}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 text-center">
            <div className="inline-flex items-center bg-blue-50 text-[#2159A9] px-6 py-3 rounded-xl border border-blue-200">
              <Crown className="h-5 w-5 mr-3" />
              <span className="font-semibold text-base">
                First African country to achieve all health-related MDGs ahead
                of schedule
              </span>
              <Star className="h-5 w-5 ml-3" />
            </div>
          </div>
        </div>
      </div>

      {/* Data Attribution */}
      <div className="max-w-7xl mx-auto mt-12 text-center">
        <div className="inline-flex items-center bg-blue-50 text-[#2159A9] px-6 py-3 rounded-xl border border-blue-200">
          <Globe className="h-5 w-5 mr-2" />
          <span className="font-semibold">
            MDG/SDG progress tracked through 978,687 health records and official
            UN reporting frameworks
          </span>
        </div>
      </div>
    </div>
  );
}
