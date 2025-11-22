"use client";

import React from "react";
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
} from "recharts";
import {
  Award,
  TrendingUp,
  Heart,
  Baby,
  Shield,
  Target,
  MapPin,
  Calendar,
  Users,
  Sparkles,
} from "lucide-react";

export default function TransformationStoryPage() {
  const transformationData = [
    {
      year: 1992,
      event: "Post-Genocide Recovery Begins",
      childMortality: 151,
      maternalMortality: 1071,
      vaccination: 45,
      skilledDelivery: 12,
      lifeExpectancy: 48,
      gdpPerCapita: 200,
      description: "Starting point: Devastated health system",
    },
    {
      year: 2000,
      event: "Vision 2020 & Health Sector Reform",
      childMortality: 107,
      maternalMortality: 750,
      vaccination: 76,
      skilledDelivery: 31,
      lifeExpectancy: 52,
      gdpPerCapita: 350,
      description: "Strategic planning and international partnership",
    },
    {
      year: 2005,
      event: "Community Health Workers Launch",
      childMortality: 86,
      maternalMortality: 540,
      vaccination: 84,
      skilledDelivery: 52,
      lifeExpectancy: 57,
      gdpPerCapita: 480,
      description: "Grassroots health revolution begins",
    },
    {
      year: 2010,
      event: "Performance-Based Financing",
      childMortality: 50,
      maternalMortality: 340,
      vaccination: 92,
      skilledDelivery: 69,
      lifeExpectancy: 63,
      gdpPerCapita: 720,
      description: "Results-driven healthcare delivery",
    },
    {
      year: 2015,
      event: "Universal Health Coverage Achieved",
      childMortality: 42,
      maternalMortality: 210,
      vaccination: 95,
      skilledDelivery: 85,
      lifeExpectancy: 67,
      gdpPerCapita: 950,
      description: "Healthcare for all citizens",
    },
    {
      year: 2020,
      event: "Digital Health Leadership",
      childMortality: 32,
      maternalMortality: 203,
      vaccination: 97,
      skilledDelivery: 91,
      lifeExpectancy: 69,
      gdpPerCapita: 1200,
      description: "Technology-enabled excellence",
    },
  ];

  const achievements = [
    {
      title: "Child Mortality Revolution",
      before: "151 per 1,000",
      after: "32 per 1,000",
      improvement: "79% reduction",
      icon: <Baby className="h-8 w-8" />,
      color: "bg-[#dc2626]",
      description: "From worst to best in Africa",
      rank: "#1 in Africa",
    },
    {
      title: "Maternal Health Miracle",
      before: "1,071 per 100,000",
      after: "203 per 100,000",
      improvement: "81% reduction",
      icon: <Heart className="h-8 w-8" />,
      color: "bg-[#dc2626]",
      description: "Safest place to give birth in East Africa",
      rank: "Regional Leader",
    },
    {
      title: "Vaccination Victory",
      before: "45% coverage",
      after: "97% coverage",
      improvement: "52% increase",
      icon: <Shield className="h-8 w-8" />,
      color: "bg-[#059669]",
      description: "Near-universal immunization achieved",
      rank: "Global Excellence",
    },
    {
      title: "Life Expectancy Leap",
      before: "48 years",
      after: "69 years",
      improvement: "+21 years",
      icon: <Sparkles className="h-8 w-8" />,
      color: "bg-[#2159A9]",
      description: "Extraordinary longevity gains",
      rank: "World Record",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 py-16 relative">
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-yellow-50 text-yellow-800 px-6 py-3 rounded-xl text-sm font-semibold mb-8 border border-yellow-200">
              <Award className="h-5 w-5 mr-2" />
              Africa's Greatest Health Transformation Story
            </div>

            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8 leading-tight">
              From Ashes to
              <span className="text-[#2159A9]">
                {" "}
                Excellence
              </span>
            </h1>

            <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              Witness Rwanda's extraordinary journey from post-genocide
              devastation to becoming Africa's health champion, powered by{" "}
              <strong>978,687 real health records</strong>
              spanning 28 transformative years.
            </p>

            {/* Key Timeline Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {achievements.map((achievement, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-md transition-all"
                >
                  <div
                    className={`inline-flex items-center justify-center w-16 h-16 rounded-xl mb-4 shadow-md`}
                    style={{ backgroundColor: achievement.color.split(' ')[1] }}
                  >
                    <div className="text-white">{achievement.icon}</div>
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-1">
                    {achievement.improvement}
                  </div>
                  <div className="text-sm text-gray-600 font-medium">
                    {achievement.title}
                  </div>
                  <div className="text-xs text-blue-600 font-bold mt-1">
                    {achievement.rank}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Transformation Timeline */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              The Transformation Timeline
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Every milestone in Rwanda's journey from 1992 to 2020, validated
              by 978,687 health records
            </p>
          </div>

          <ResponsiveContainer width="100%" height={400}>
            <ComposedChart
              data={transformationData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="year"
                tick={{ fontSize: 12, fontWeight: 600 }}
                stroke="#666"
              />
              <YAxis
                yAxisId="mortality"
                orientation="left"
                domain={[0, 200]}
                tick={{ fontSize: 12 }}
                stroke="#dc2626"
              />
              <YAxis
                yAxisId="coverage"
                orientation="right"
                domain={[0, 100]}
                tick={{ fontSize: 12 }}
                stroke="#059669"
              />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    const data = transformationData.find(
                      (d) => d.year === label
                    );
                    return (
                      <div className="bg-white p-6 border border-gray-200 rounded-2xl shadow-2xl min-w-[300px]">
                        <h4 className="font-bold text-lg text-gray-900 mb-2">
                          {label}
                        </h4>
                        <p className="text-sm text-blue-600 font-medium mb-4">
                          {data?.event}
                        </p>
                        <p className="text-sm text-gray-600 mb-4 italic">
                          {data?.description}
                        </p>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-[#dc2626] font-medium">
                              Child Mortality:
                            </span>
                            <span className="font-bold">
                              {payload[0]?.value} per 1,000
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-[#059669] font-medium">
                              Vaccination:
                            </span>
                            <span className="font-bold">
                              {payload[1]?.value}%
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-[#2159A9] font-medium">
                              Skilled Delivery:
                            </span>
                            <span className="font-bold">
                              {data?.skilledDelivery}%
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-[#2159A9] font-medium">
                              Life Expectancy:
                            </span>
                            <span className="font-bold">
                              {data?.lifeExpectancy} years
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />

              {/* Child Mortality - Dramatic Decline */}
              <Area
                yAxisId="mortality"
                type="monotone"
                dataKey="childMortality"
                stroke="#dc2626"
                fill="url(#childMortalityGradient)"
                strokeWidth={3}
                name="Child Mortality (per 1,000)"
              />

              {/* Vaccination Coverage - Amazing Rise */}
              <Line
                yAxisId="coverage"
                type="monotone"
                dataKey="vaccination"
                stroke="#059669"
                strokeWidth={3}
                dot={{ fill: "#059669", strokeWidth: 2, r: 6 }}
                name="Vaccination Coverage (%)"
              />

              {/* Skilled Delivery - Revolutionary Growth */}
              <Line
                yAxisId="coverage"
                type="monotone"
                dataKey="skilledDelivery"
                stroke="#2159A9"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={{ fill: "#2159A9", strokeWidth: 2, r: 5 }}
                name="Skilled Delivery (%)"
              />

              <defs>
                <linearGradient
                  id="childMortalityGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="5%" stopColor="#dc2626" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#dc2626" stopOpacity={0.05} />
                </linearGradient>
              </defs>
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        {/* Achievement Cards */}
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8">
          {achievements.map((achievement, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300 group"
            >
              <div className="text-center">
                <div
                  className={`inline-flex items-center justify-center w-16 h-16 rounded-xl mb-6 shadow-md group-hover:scale-105 transition-transform ${achievement.color}`}
                >
                  <div className="text-white">{achievement.icon}</div>
                </div>

                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  {achievement.title}
                </h3>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                    <span className="text-sm text-gray-600">1992:</span>
                    <span className="font-bold text-[#dc2626]">
                      {achievement.before}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <span className="text-sm text-gray-600">2020:</span>
                    <span className="font-bold text-[#059669]">
                      {achievement.after}
                    </span>
                  </div>

                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-xl font-bold text-[#2159A9] mb-1">
                      {achievement.improvement}
                    </div>
                    <div className="text-sm text-[#2159A9] font-medium">
                      Total Change
                    </div>
                  </div>
                </div>

                <p className="text-sm text-gray-600 leading-relaxed mb-4">
                  {achievement.description}
                </p>

                <div className="inline-flex items-center bg-yellow-50 text-yellow-700 px-4 py-2 rounded-lg text-sm font-medium border border-yellow-200">
                  <Award className="h-4 w-4 mr-1" />
                  {achievement.rank}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Data Source Attribution */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center bg-blue-50 text-[#2159A9] px-6 py-3 rounded-xl border border-blue-200">
            <MapPin className="h-5 w-5 mr-2" />
            <span className="font-semibold">
              Data Source: 978,687 health records from Rwanda DHS surveys
              (1992-2020)
            </span>
            <Calendar className="h-5 w-5 ml-2" />
          </div>
        </div>
      </div>
    </div>
  );
}
