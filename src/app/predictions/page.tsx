"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  TrendingUp,
  TrendingDown,
  Minus,
  Brain,
  Target,
  AlertTriangle,
  Lightbulb,
  Calendar,
} from "lucide-react";

interface PredictionData {
  indicator: string;
  label: string;
  unit: string;
  province: string;
  historical: Array<{ year: number; value: number }>;
  predictions: Array<{ year: number; value: number; confidence: number }>;
  trend: "improving" | "declining" | "stable";
  insights: {
    summary: string;
    keyMetrics: {
      currentValue: number;
      projectedValue: number;
      changePercent: number;
      timeToTarget: number | null;
    };
    recommendations: string[];
    riskFactors: string[];
  };
  confidence: number;
  generatedAt: string;
}

export default function PredictionsPage() {
  const [selectedIndicator, setSelectedIndicator] = useState(
    "vaccination_coverage"
  );
  const [selectedProvince, setSelectedProvince] = useState("National");
  const [predictionYears, setPredictionYears] = useState(5);

  const {
    data: predictions,
    isLoading,
    error,
  } = useQuery<PredictionData>({
    queryKey: [
      "predictions",
      selectedIndicator,
      selectedProvince,
      predictionYears,
    ],
    queryFn: async () => {
      const response = await fetch(
        `http://localhost:5000/api/v1/predictions?indicator=${selectedIndicator}&province=${selectedProvince}&years=${predictionYears}`
      );
      if (!response.ok) throw new Error("Failed to fetch predictions");
      return response.json();
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const indicators = [
    { value: "vaccination_coverage", label: "Vaccination Coverage" },
    { value: "child_mortality", label: "Child Mortality Rate" },
    { value: "maternal_mortality", label: "Maternal Mortality" },
    { value: "malnutrition_rate", label: "Child Malnutrition Rate" },
  ];

  const provinces = [
    "National",
    "Kigali",
    "Eastern",
    "Northern",
    "Western",
    "Southern",
  ];

  // Prepare chart data
  const chartData = predictions
    ? [
        ...predictions.historical.map((point) => ({
          ...point,
          type: "historical",
          confidence: 1.0,
        })),
        ...predictions.predictions.map((point) => ({
          ...point,
          type: "prediction",
        })),
      ]
    : [];

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "improving":
        return <TrendingUp className="h-5 w-5 text-green-600" />;
      case "declining":
        return <TrendingDown className="h-5 w-5 text-red-600" />;
      default:
        return <Minus className="h-5 w-5 text-yellow-600" />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case "improving":
        return "text-green-600 bg-green-50 border-green-200";
      case "declining":
        return "text-red-600 bg-red-50 border-red-200";
      default:
        return "text-yellow-600 bg-yellow-50 border-yellow-200";
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Brain className="h-12 w-12 text-blue-600 mx-auto mb-4 animate-pulse" />
          <p className="text-gray-600">AI is analyzing health trends...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="h-12 w-12 text-red-600 mx-auto mb-4" />
          <p className="text-red-600">Failed to load predictions</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Brain className="h-8 w-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">
              🤖 AI Health Predictions
            </h1>
          </div>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Advanced machine learning models analyze historical health data to
            predict future trends, identify risks, and recommend evidence-based
            interventions for improved health outcomes.
          </p>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Health Indicator
              </label>
              <select
                value={selectedIndicator}
                onChange={(e) => setSelectedIndicator(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {indicators.map((indicator) => (
                  <option key={indicator.value} value={indicator.value}>
                    {indicator.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Province
              </label>
              <select
                value={selectedProvince}
                onChange={(e) => setSelectedProvince(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {provinces.map((province) => (
                  <option key={province} value={province}>
                    {province}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Prediction Years
              </label>
              <select
                value={predictionYears}
                onChange={(e) => setPredictionYears(parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value={3}>3 Years</option>
                <option value={5}>5 Years</option>
                <option value={7}>7 Years</option>
                <option value={10}>10 Years</option>
              </select>
            </div>

            <div className="flex items-end">
              <div className="text-sm text-gray-600">
                <Calendar className="h-4 w-4 inline mr-1" />
                Last updated:{" "}
                {predictions
                  ? new Date(predictions.generatedAt).toLocaleTimeString()
                  : "Unknown"}
              </div>
            </div>
          </div>
        </div>

        {predictions && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Trend Chart */}
            <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  {predictions.label} Trends & Predictions
                </h2>
                <div
                  className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getTrendColor(
                    predictions.trend
                  )}`}
                >
                  {getTrendIcon(predictions.trend)}
                  <span className="ml-1 capitalize">{predictions.trend}</span>
                </div>
              </div>

              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis />
                    <Tooltip
                      formatter={(value, name, props) => [
                        `${value} ${predictions.unit}${
                          props.payload.type === "prediction"
                            ? ` (${Math.round(
                                props.payload.confidence * 100
                              )}% confidence)`
                            : ""
                        }`,
                        props.payload.type === "prediction"
                          ? "Predicted"
                          : "Historical",
                      ]}
                    />
                    <Legend />
                    <Line
                      dataKey="value"
                      stroke="#3B82F6"
                      strokeWidth={2}
                      dot={{ fill: "#3B82F6", strokeWidth: 2, r: 4 }}
                      connectNulls={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="mt-4 text-xs text-gray-600">
                <span className="inline-block w-3 h-3 bg-blue-600 rounded-full mr-2"></span>
                Solid line: Historical data | Predictions start from{" "}
                {new Date().getFullYear() + 1}
              </div>
            </div>

            {/* Key Metrics */}
            <div className="space-y-6">
              {/* Summary Card */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center mb-4">
                  <Target className="h-5 w-5 text-blue-600 mr-2" />
                  <h3 className="text-lg font-semibold text-gray-900">
                    Key Metrics
                  </h3>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-gray-600">Current Value</div>
                    <div className="text-2xl font-bold text-gray-900">
                      {predictions.insights.keyMetrics.currentValue}{" "}
                      {predictions.unit}
                    </div>
                  </div>

                  <div>
                    <div className="text-sm text-gray-600">
                      Projected Value ({predictionYears} years)
                    </div>
                    <div className="text-2xl font-bold text-blue-600">
                      {predictions.insights.keyMetrics.projectedValue}{" "}
                      {predictions.unit}
                    </div>
                  </div>

                  <div>
                    <div className="text-sm text-gray-600">Expected Change</div>
                    <div
                      className={`text-lg font-semibold ${
                        predictions.insights.keyMetrics.changePercent > 0
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {predictions.insights.keyMetrics.changePercent > 0
                        ? "+"
                        : ""}
                      {predictions.insights.keyMetrics.changePercent}%
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <div className="text-sm text-gray-700 font-medium mb-2">
                      AI Confidence
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${predictions.confidence * 100}%` }}
                      ></div>
                    </div>
                    <div className="text-sm text-gray-600 mt-1">
                      {Math.round(predictions.confidence * 100)}%
                    </div>
                  </div>
                </div>
              </div>

              {/* AI Insights */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center mb-4">
                  <Brain className="h-5 w-5 text-purple-600 mr-2" />
                  <h3 className="text-lg font-semibold text-gray-900">
                    AI Insights
                  </h3>
                </div>

                <p className="text-gray-700 mb-4">
                  {predictions.insights.summary}
                </p>
              </div>
            </div>
          </div>
        )}

        {predictions && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            {/* Recommendations */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <Lightbulb className="h-5 w-5 text-yellow-600 mr-2" />
                <h3 className="text-lg font-semibold text-gray-900">
                  AI Recommendations
                </h3>
              </div>

              <div className="space-y-3">
                {predictions.insights.recommendations.map(
                  (recommendation, index) => (
                    <div key={index} className="flex items-start">
                      <div className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">
                        {index + 1}
                      </div>
                      <div className="ml-3 text-gray-700">{recommendation}</div>
                    </div>
                  )
                )}
              </div>
            </div>

            {/* Risk Factors */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <AlertTriangle className="h-5 w-5 text-orange-600 mr-2" />
                <h3 className="text-lg font-semibold text-gray-900">
                  Risk Factors
                </h3>
              </div>

              <div className="space-y-3">
                {predictions.insights.riskFactors.map((risk, index) => (
                  <div key={index} className="flex items-start">
                    <div className="flex-shrink-0 w-2 h-2 bg-orange-400 rounded-full mt-2"></div>
                    <div className="ml-3 text-gray-700">{risk}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
