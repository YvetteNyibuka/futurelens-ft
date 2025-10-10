"use client";

import React from "react";
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
  TooltipProps,
} from "recharts";
import {
  NameType,
  ValueType,
} from "recharts/types/component/DefaultTooltipContent";
import {
  Award,
  TrendingUp,
  Users,
  Heart,
  Target,
  ArrowUp,
  ArrowDown,
} from "lucide-react";

// Rwanda's health transformation data based on NISR surveys
const transformationData = [
  {
    year: 1992,
    childMortality: 151,
    vaccination: 45,
    skilledDelivery: 12,
    lifeExpectancy: 48,
    healthExpenditure: 3.8,
    events: [
      "Health sector reform initiated",
      "Community health program started",
    ],
  },
  {
    year: 2000,
    childMortality: 107,
    vaccination: 75,
    skilledDelivery: 26,
    lifeExpectancy: 54,
    healthExpenditure: 5.2,
    events: ["MDG commitments", "Health insurance (Mutuelles) launched"],
  },
  {
    year: 2005,
    childMortality: 103,
    vaccination: 84,
    skilledDelivery: 39,
    lifeExpectancy: 58,
    healthExpenditure: 6.8,
    events: [
      "Performance-based financing introduced",
      "Health sector strategic plan",
    ],
  },
  {
    year: 2010,
    childMortality: 76,
    vaccination: 97,
    skilledDelivery: 69,
    lifeExpectancy: 63,
    healthExpenditure: 8.1,
    events: [
      "Universal health coverage expansion",
      "Community health cooperatives",
    ],
  },
  {
    year: 2015,
    childMortality: 50,
    vaccination: 98,
    skilledDelivery: 81,
    lifeExpectancy: 66,
    healthExpenditure: 9.2,
    events: ["Health sector transformation", "Digital health initiatives"],
  },
  {
    year: 2020,
    childMortality: 32,
    vaccination: 97,
    skilledDelivery: 91,
    lifeExpectancy: 69,
    healthExpenditure: 10.5,
    events: [
      "COVID-19 response excellence",
      "Health system resilience demonstrated",
    ],
  },
];

// Provincial health equity data
const provincialEquity = [
  { province: "Kigali", improvement: 85, current: 94, gap: 6 },
  { province: "Eastern", improvement: 72, current: 88, gap: 12 },
  { province: "Northern", improvement: 68, current: 85, gap: 15 },
  { province: "Southern", improvement: 65, current: 83, gap: 17 },
  { province: "Western", improvement: 62, current: 82, gap: 18 },
];

// SDG progress data
const sdgProgress = [
  {
    indicator: "Child Mortality",
    current: 32,
    target: 25,
    progress: 88,
    trend: "On track",
  },
  {
    indicator: "Maternal Mortality",
    current: 248,
    target: 200,
    progress: 65,
    trend: "Accelerating",
  },
  {
    indicator: "Vaccination Coverage",
    current: 97,
    target: 95,
    progress: 100,
    trend: "Achieved",
  },
  {
    indicator: "Skilled Delivery",
    current: 91,
    target: 95,
    progress: 92,
    trend: "On track",
  },
  {
    indicator: "Stunting",
    current: 33,
    target: 15,
    progress: 45,
    trend: "Needs acceleration",
  },
];

export function HealthTransformationTimeline() {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-gray-900">
            Rwanda's Health Transformation Journey
          </h3>
          <p className="text-gray-600">
            28 years of evidence-based progress (1992-2020)
          </p>
        </div>
        <Award className="h-8 w-8 text-nsir-primary" />
      </div>

      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={transformationData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis yAxisId="left" orientation="left" />
          <YAxis yAxisId="right" orientation="right" />
          <Tooltip
            formatter={(value: number, name: string) => {
              const displayName =
                name === "childMortality"
                  ? "Child Mortality"
                  : name === "vaccination"
                  ? "Vaccination"
                  : name === "skilledDelivery"
                  ? "Skilled Delivery"
                  : name === "lifeExpectancy"
                  ? "Life Expectancy"
                  : name;

              const unit =
                name === "childMortality"
                  ? " per 1,000"
                  : name === "lifeExpectancy"
                  ? " years"
                  : "%";

              return [`${value}${unit}`, displayName];
            }}
          />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="childMortality"
            stroke="#EF4444"
            strokeWidth={3}
            dot={{ fill: "#EF4444", strokeWidth: 2, r: 6 }}
            name="Child Mortality (per 1,000)"
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="vaccination"
            stroke="#2159A9"
            strokeWidth={3}
            dot={{ fill: "#2159A9", strokeWidth: 2, r: 6 }}
            name="Vaccination Coverage (%)"
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="skilledDelivery"
            stroke="#33ABEE"
            strokeWidth={3}
            dot={{ fill: "#33ABEE", strokeWidth: 2, r: 6 }}
            name="Skilled Delivery (%)"
          />
        </LineChart>
      </ResponsiveContainer>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-1 bg-red-500"></div>
          <span>Child Mortality (79% reduction)</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-1 bg-nsir-primary"></div>
          <span>Vaccination Coverage (116% increase)</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-1 bg-nsir-secondary"></div>
          <span>Skilled Delivery (658% increase)</span>
        </div>
      </div>
    </div>
  );
}

export function ProvincialEquityDashboard() {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-gray-900">
            Health Equity Across Provinces
          </h3>
          <p className="text-gray-600">Reducing geographical disparities</p>
        </div>
        <TrendingUp className="h-8 w-8 text-green-600" />
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={provincialEquity}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="province" />
          <YAxis />
          <Tooltip />
          <Bar
            dataKey="current"
            fill="#2159A9"
            name="Current Performance (%)"
          />
          <Bar dataKey="gap" fill="#EF4444" name="Gap to National Target" />
        </BarChart>
      </ResponsiveContainer>

      <div className="mt-6 text-sm text-gray-600">
        <p>
          <strong>Key insight:</strong> Health gap between best (Kigali) and
          worst (Western) performing provinces reduced from 45% to 12% points
          over 28 years.
        </p>
      </div>
    </div>
  );
}

export function SDGProgressTracker() {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-gray-900">
            SDG Health Targets Progress
          </h3>
          <p className="text-gray-600">Rwanda's journey to 2030</p>
        </div>
        <Target className="h-8 w-8 text-nsir-primary" />
      </div>

      <div className="space-y-4">
        {sdgProgress.map((item, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-gray-900">
                {item.indicator}
              </span>
              <div className="flex items-center space-x-2">
                {item.trend === "Achieved" ? (
                  <span className="text-green-600 text-sm font-medium">
                    ✓ Achieved
                  </span>
                ) : item.trend === "On track" ? (
                  <>
                    <ArrowUp className="h-4 w-4 text-green-600" />
                    <span className="text-green-600 text-sm font-medium">
                      On track
                    </span>
                  </>
                ) : item.trend === "Accelerating" ? (
                  <>
                    <TrendingUp className="h-4 w-4 text-blue-600" />
                    <span className="text-blue-600 text-sm font-medium">
                      Accelerating
                    </span>
                  </>
                ) : (
                  <>
                    <ArrowDown className="h-4 w-4 text-orange-600" />
                    <span className="text-orange-600 text-sm font-medium">
                      Needs acceleration
                    </span>
                  </>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
              <span>
                Current: {item.current}
                {item.indicator.includes("Mortality")
                  ? " per 100k"
                  : item.indicator.includes("Child")
                  ? " per 1k"
                  : "%"}
              </span>
              <span>
                Target: {item.target}
                {item.indicator.includes("Mortality")
                  ? " per 100k"
                  : item.indicator.includes("Child")
                  ? " per 1k"
                  : "%"}
              </span>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full ${
                  item.progress >= 100
                    ? "bg-green-500"
                    : item.progress >= 80
                    ? "bg-blue-500"
                    : item.progress >= 60
                    ? "bg-yellow-500"
                    : "bg-orange-500"
                }`}
                style={{ width: `${Math.min(item.progress, 100)}%` }}
              ></div>
            </div>
            <div className="text-right text-xs text-gray-500 mt-1">
              {item.progress}% progress
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function HealthSystemStrengthening() {
  const strengthenData = [
    { year: 1992, facilities: 156, chws: 0, doctors: 0.2, coverage: 12 },
    { year: 2000, facilities: 298, chws: 1500, doctors: 0.5, coverage: 26 },
    { year: 2010, facilities: 489, chws: 15000, doctors: 1.2, coverage: 69 },
    { year: 2020, facilities: 1594, chws: 45000, doctors: 2.1, coverage: 91 },
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-gray-900">
            Health System Strengthening
          </h3>
          <p className="text-gray-600">
            Infrastructure and workforce development
          </p>
        </div>
        <Heart className="h-8 w-8 text-red-500" />
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={strengthenData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis />
          <Tooltip
            formatter={(value, name) => [
              value,
              name === "facilities"
                ? "Health Facilities"
                : name === "chws"
                ? "Community Health Workers"
                : name === "doctors"
                ? "Doctors per 1,000"
                : "Service Coverage %",
            ]}
          />
          <Area
            type="monotone"
            dataKey="facilities"
            stackId="1"
            stroke="#2159A9"
            fill="#2159A9"
            fillOpacity={0.8}
          />
        </AreaChart>
      </ResponsiveContainer>

      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
        <div className="bg-nsir-primary-50 rounded-lg p-3">
          <div className="text-2xl font-bold text-nsir-primary">1,594</div>
          <div className="text-sm text-gray-600">Health Facilities</div>
          <div className="text-xs text-green-600">↑922% increase</div>
        </div>
        <div className="bg-green-50 rounded-lg p-3">
          <div className="text-2xl font-bold text-green-600">45,000</div>
          <div className="text-sm text-gray-600">Community Health Workers</div>
          <div className="text-xs text-green-600">From 0 to nationwide</div>
        </div>
        <div className="bg-blue-50 rounded-lg p-3">
          <div className="text-2xl font-bold text-blue-600">2.1</div>
          <div className="text-sm text-gray-600">Doctors per 1,000</div>
          <div className="text-xs text-green-600">↑950% increase</div>
        </div>
        <div className="bg-purple-50 rounded-lg p-3">
          <div className="text-2xl font-bold text-purple-600">91%</div>
          <div className="text-sm text-gray-600">Service Coverage</div>
          <div className="text-xs text-green-600">↑658% increase</div>
        </div>
      </div>
    </div>
  );
}

export default function HealthImpactVisualization() {
  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Rwanda's Health Transformation: A Data-Driven Success Story
        </h2>
        <p className="text-xl text-gray-600 max-w-4xl mx-auto">
          From one of the world's poorest health systems to a model for Africa -
          evidence from NISR demographic and health surveys (1992-2020)
        </p>
      </div>

      <HealthTransformationTimeline />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ProvincialEquityDashboard />
        <SDGProgressTracker />
      </div>

      <HealthSystemStrengthening />

      <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg p-8 text-white text-center">
        <h3 className="text-2xl font-bold mb-4">
          Key Achievements Validated by NISR Data
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div className="bg-white/20 rounded-lg p-4">
            <div className="text-3xl font-bold">79%</div>
            <div className="text-green-100">Reduction in child mortality</div>
          </div>
          <div className="bg-white/20 rounded-lg p-4">
            <div className="text-3xl font-bold">97%</div>
            <div className="text-green-100">Vaccination coverage achieved</div>
          </div>
          <div className="bg-white/20 rounded-lg p-4">
            <div className="text-3xl font-bold">21</div>
            <div className="text-green-100">Years added to life expectancy</div>
          </div>
        </div>
      </div>
    </div>
  );
}
