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
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow">
          <p className="text-sm font-medium text-gray-900 mb-1">{`Year: ${label}`}</p>
          {payload.map((entry: any, index: number) => (
            <p
              key={`item-${index}`}
              className="text-xs"
              style={{ color: entry.color }}
            >
              {`${entry.name}: ${
                entry.value !== undefined ? entry.value.toFixed(1) : "N/A"
              } ${indicator === "childMortality" ? "per 1,000" : "%"}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={chartData}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#eaeaea" />
        <XAxis dataKey="year" />
        <YAxis
          label={{
            value: getIndicatorLabel(),
            angle: -90,
            position: "insideLeft",
            style: { textAnchor: "middle" },
          }}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend
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
                ? 3
                : hoverProvince === province
                ? 2
                : 1.5
            }
            dot={{ r: selectedProvince === province ? 5 : 3 }}
            activeDot={{ r: 6 }}
            opacity={
              selectedProvince && selectedProvince !== province ? 0.3 : 1
            }
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
};
