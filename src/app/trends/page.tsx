"use client";

import { useQuery } from "@tanstack/react-query";
import { healthDataQueries } from "@/services/healthDataService";
import { Activity, ArrowUp, ArrowDown, Minus } from "lucide-react";

export default function TrendsPage() {
  // Fetch trend analysis data
  const { data: trendData, isLoading } = useQuery(
    healthDataQueries.trendAnalysis()
  );

  const { data: childMortalityTrends } = useQuery(
    healthDataQueries.childMortalityTrends()
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <main className="container mx-auto px-4 py-8">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-200 rounded w-1/3"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-48 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Rwanda Health Trends Analysis
          </h1>
          <p className="text-gray-600">
            Interactive visualization of Rwanda's health indicators over
            multiple survey periods
          </p>
        </div>

        {/* Real Trends Data */}
        {trendData && trendData.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
            {trendData.map((trend: any, index: number) => (
              <div key={index} className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {trend.indicator}
                  </h3>
                  <Activity className="h-6 w-6 text-blue-600" />
                </div>

                {trend.dataPoints && trend.dataPoints.length > 0 && (
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Latest Value:</span>
                      <span className="font-medium">
                        {trend.dataPoints[trend.dataPoints.length - 1].value}{" "}
                        {trend.dataPoints[0].unit || ""}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Trend:</span>
                      <span
                        className={`font-medium flex items-center ${
                          trend.trend === "improving"
                            ? "text-green-600"
                            : trend.trend === "declining"
                            ? "text-red-600"
                            : "text-yellow-600"
                        }`}
                      >
                        {trend.trend === "improving" ? (
                          <ArrowUp className="h-4 w-4 mr-1" />
                        ) : trend.trend === "declining" ? (
                          <ArrowDown className="h-4 w-4 mr-1" />
                        ) : (
                          <Minus className="h-4 w-4 mr-1" />
                        )}
                        {trend.trend}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Period:</span>
                      <span className="font-medium">
                        {trend.dataPoints[0].year}-
                        {trend.dataPoints[trend.dataPoints.length - 1].year}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Child Mortality Special Section */}
        {childMortalityTrends && childMortalityTrends.length > 0 && (
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Child Mortality Trends (Key Achievement)
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {childMortalityTrends.map((data: any, index: number) => (
                <div key={index} className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {data.rate}
                  </div>
                  <div className="text-sm text-gray-600">{data.year}</div>
                  <div className="text-xs text-gray-500">per 1,000 births</div>
                </div>
              ))}
            </div>

            {childMortalityTrends.length >= 2 && (
              <div className="mt-4 p-4 bg-green-50 rounded-lg">
                <div className="flex items-center text-green-800">
                  <ArrowDown className="h-5 w-5 mr-2" />
                  <span className="font-medium">
                    {Math.round(
                      ((childMortalityTrends[0].rate -
                        childMortalityTrends[childMortalityTrends.length - 1]
                          .rate) /
                        childMortalityTrends[0].rate) *
                        100
                    )}
                    % reduction over{" "}
                    {childMortalityTrends[childMortalityTrends.length - 1]
                      .year - childMortalityTrends[0].year}{" "}
                    years
                  </span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Default Trends if no data */}
        {(!trendData || trendData.length === 0) && (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Maternal Health
                </h3>
                <Activity className="h-6 w-6 text-pink-600" />
              </div>
              <div className="space-y-2">
                <div className="text-sm text-gray-600">
                  Significant improvements in maternal mortality rates
                </div>
                <div className="flex items-center text-green-600">
                  <ArrowDown className="h-4 w-4 mr-1" />
                  <span className="text-sm font-medium">
                    65% reduction since 1992
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Child Health
                </h3>
                <Activity className="h-6 w-6 text-blue-600" />
              </div>
              <div className="space-y-2">
                <div className="text-sm text-gray-600">
                  Dramatic reduction in child mortality
                </div>
                <div className="flex items-center text-green-600">
                  <ArrowDown className="h-4 w-4 mr-1" />
                  <span className="text-sm font-medium">
                    79% reduction since 1992
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Vaccination
                </h3>
                <Activity className="h-6 w-6 text-green-600" />
              </div>
              <div className="space-y-2">
                <div className="text-sm text-gray-600">
                  High vaccination coverage achieved
                </div>
                <div className="flex items-center text-green-600">
                  <ArrowUp className="h-4 w-4 mr-1" />
                  <span className="text-sm font-medium">
                    95%+ coverage maintained
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Insights Section */}
        <div className="bg-blue-600 rounded-lg p-8 text-white">
          <h2 className="text-2xl font-bold mb-6">Key Health Insights</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <h3 className="font-semibold mb-2">Rwanda's Success Story</h3>
              <p className="text-blue-100 text-sm">
                Rwanda has achieved remarkable progress in health outcomes, with
                significant improvements across all key indicators over the past
                28 years.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <h3 className="font-semibold mb-2">Data-Driven Policy</h3>
              <p className="text-blue-100 text-sm">
                Comprehensive health surveys have enabled evidence-based policy
                making, leading to targeted interventions and improved outcomes.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <h3 className="font-semibold mb-2">Future Outlook</h3>
              <p className="text-blue-100 text-sm">
                Continued monitoring and analysis will support Rwanda's journey
                toward achieving universal health coverage and SDG targets.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
