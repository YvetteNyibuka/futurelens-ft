"use client";

import React, { useState } from "react";
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

type ProvincialTrendChartProps = {
  provinceData: Record<string, any>;
  selectedProvince?: string;
  indicator?: "childMortality" | "vaccination" | "stunting";
};

export const ProvincialTrendChart: React.FC<ProvincialTrendChartProps> = ({
  provinceData,
  selectedProvince,
  indicator = "childMortality",
}) => {
  const [hoverProvince, setHoverProvince] = useState<string | null>(null);

  // If no province data yet, return a loading state
  if (!provinceData || Object.keys(provinceData).length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-blue-700">Loading provincial trends data...</p>
      </div>
    );
  }

  const provinces = Object.keys(provinceData);

  // Prepare data for the chart
  const prepareChartData = () => {
    // Get all unique years across provinces
    const allYears = new Set<number>();

    provinces.forEach((province) => {
      provinceData[province].forEach((item: any) => {
        if (item.year) {
          allYears.add(item.year);
        }
      });
    });

    // Sort years chronologically
    const years = Array.from(allYears).sort((a, b) => a - b);

    // Create data points for each year
    return years.map((year) => {
      const dataPoint: any = { year };

      provinces.forEach((province) => {
        const yearData = provinceData[province].find(
          (item: any) => item.year === year
        );

        if (yearData) {
          if (indicator === "childMortality") {
            dataPoint[province] = yearData.childMortality;
          } else if (indicator === "vaccination") {
            dataPoint[province] = yearData.vaccination?.dpt3;
          } else if (indicator === "stunting") {
            dataPoint[province] = yearData.stunting;
          }
        }
      });

      return dataPoint;
    });
  };

  const chartData = prepareChartData();

  // Define colors for each province
  const provinceColors = {
    Kigali: "#0c2461",
    Eastern: "#1e56a0",
    Western: "#4a69bd",
    Northern: "#6a89cc",
    Southern: "#82ccdd",
  };

  // Get label for the selected indicator
  const getIndicatorLabel = () => {
    switch (indicator) {
      case "childMortality":
        return "Child Mortality (per 1,000)";
      case "vaccination":
        return "Vaccination Coverage (%)";
      case "stunting":
        return "Stunting (%)";
      default:
        return "Value";
    }
  };

  // Custom tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border border-gray-200 rounded-xl shadow-lg backdrop-blur-sm">
          <p className="font-semibold text-gray-900 mb-3 text-sm border-b border-gray-100 pb-2">
            Year: {label}
          </p>
          <div className="space-y-2 max-h-32 overflow-y-auto">
            {payload.map((entry: any, index: number) => (
              <div
                key={`item-${index}`}
                className="flex items-center justify-between space-x-3"
              >
                <div className="flex items-center space-x-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: entry.color }}
                  ></div>
                  <span className="text-sm text-gray-700 font-medium">
                    {entry.name}
                  </span>
                </div>
                <span
                  className="text-sm font-bold"
                  style={{ color: entry.color }}
                >
                  {entry.value !== undefined ? entry.value.toFixed(1) : "N/A"}
                  {indicator === "childMortality" ? " per 1,000" : "%"}
                </span>
              </div>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={chartData}
        margin={{ top: 30, right: 60, left: 60, bottom: 80 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" opacity={0.8} />
        <XAxis
          dataKey="year"
          tick={{ fontSize: 12, fill: "#64748b" }}
          axisLine={{ stroke: "#cbd5e1", strokeWidth: 1 }}
          tickLine={{ stroke: "#cbd5e1" }}
          label={{
            value: "Year",
            position: "insideBottom",
            offset: -15,
            style: {
              textAnchor: "middle",
              fill: "#475569",
              fontSize: "14px",
              fontWeight: "500",
            },
          }}
        />
        <YAxis
          tick={{ fontSize: 12, fill: "#64748b" }}
          axisLine={{ stroke: "#cbd5e1", strokeWidth: 1 }}
          tickLine={{ stroke: "#cbd5e1" }}
          label={{
            value: getIndicatorLabel(),
            angle: -90,
            position: "insideLeft",
            style: {
              textAnchor: "middle",
              fill: "#475569",
              fontSize: "14px",
              fontWeight: "500",
            },
          }}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend
          wrapperStyle={{
            paddingTop: "20px",
            fontSize: "13px",
          }}
          onMouseEnter={(e) => setHoverProvince(e.dataKey as string)}
          onMouseLeave={() => setHoverProvince(null)}
        />

        {provinces.map((province) => (
          <Line
            key={province}
            type="monotone"
            dataKey={province}
            stroke={
              provinceColors[province as keyof typeof provinceColors] ||
              "#8884d8"
            }
            strokeWidth={
              selectedProvince === province
                ? 4
                : hoverProvince === province
                ? 3
                : 2
            }
            dot={{
              fill:
                provinceColors[province as keyof typeof provinceColors] ||
                "#8884d8",
              strokeWidth: 2,
              r: selectedProvince === province ? 6 : 4,
              stroke: "#fff",
            }}
            activeDot={{
              r: 8,
              fill:
                provinceColors[province as keyof typeof provinceColors] ||
                "#8884d8",
              stroke: "#fff",
              strokeWidth: 3,
            }}
            opacity={
              selectedProvince
                ? selectedProvince === province
                  ? 1
                  : 0.3
                : hoverProvince
                ? hoverProvince === province
                  ? 1
                  : 0.5
                : 1
            }
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
};
