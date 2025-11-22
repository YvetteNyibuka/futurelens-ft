"use client";

import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";

// Blue color palette
const COLORS = [
  "#0c2461",
  "#1e3799",
  "#4a69bd",
  "#6a89cc",
  "#82ccdd",
  "#b8e994",
];

// Rwanda age distribution data (realistic estimates)
const ageDistributionData = [
  { ageGroup: "0-4", population: 14.2 },
  { ageGroup: "5-14", population: 25.7 },
  { ageGroup: "15-24", population: 20.3 },
  { ageGroup: "25-34", population: 16.8 },
  { ageGroup: "35-44", population: 11.2 },
  { ageGroup: "45-54", population: 6.4 },
  { ageGroup: "55-64", population: 3.5 },
  { ageGroup: "65+", population: 1.9 },
];

// Rwanda geographic distribution data
const geographicDistributionData = [
  { name: "Kigali", value: 1140000, percentage: 9.0 },
  { name: "Eastern", value: 2600000, percentage: 20.6 },
  { name: "Northern", value: 1870000, percentage: 14.9 },
  { name: "Southern", value: 2780000, percentage: 22.1 },
  { name: "Western", value: 2210000, percentage: 17.4 },
  { name: "Other", value: 2000000, percentage: 16.0 },
];

// Age Distribution Chart Component
export function AgeDistributionChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={ageDistributionData}
        margin={{
          top: 30,
          right: 30,
          left: 40,
          bottom: 60,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" opacity={0.8} />
        <XAxis
          dataKey="ageGroup"
          tick={{ fontSize: 12, fill: "#64748b" }}
          axisLine={{ stroke: "#cbd5e1", strokeWidth: 1 }}
          tickLine={{ stroke: "#cbd5e1" }}
          label={{
            value: "Age Groups",
            position: "insideBottom",
            offset: -10,
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
            value: "Population Distribution (%)",
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
        <Tooltip
          contentStyle={{
            backgroundColor: "white",
            border: "1px solid #e2e8f0",
            borderRadius: "12px",
            boxShadow: "0 8px 25px -5px rgba(0, 0, 0, 0.1)",
            padding: "12px",
          }}
          formatter={(value) => [`${value}%`, "Population Share"]}
        />
        <Legend
          wrapperStyle={{
            paddingTop: "20px",
            fontSize: "14px",
          }}
        />
        <Bar
          dataKey="population"
          name="Population Share"
          fill="#0c2461"
          radius={[4, 4, 0, 0]}
          stroke="#1e40af"
          strokeWidth={1}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}

// Geographic Distribution Chart Component
export function GeographicDistributionChart() {
  const renderLabel = (entry: any) => {
    return `${entry.name}\n${entry.percentage}%`;
  };

  const renderTooltip = (props: any) => {
    if (props.active && props.payload && props.payload[0]) {
      const data = props.payload[0].payload;
      return (
        <div className="bg-white p-4 border border-gray-200 rounded-xl shadow-lg">
          <p className="font-semibold text-gray-900 mb-2">
            {data.name} Province
          </p>
          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Population:</span>
              <span className="font-bold text-blue-600">
                {data.value.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Share:</span>
              <span className="font-bold text-green-600">
                {data.percentage}%
              </span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart margin={{ top: 20, right: 30, bottom: 20, left: 30 }}>
        <Pie
          data={geographicDistributionData}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderLabel}
          outerRadius={100}
          innerRadius={30}
          fill="#8884d8"
          dataKey="value"
          strokeWidth={2}
          stroke="#ffffff"
        >
          {geographicDistributionData.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={COLORS[index % COLORS.length]}
              stroke="#ffffff"
              strokeWidth={2}
            />
          ))}
        </Pie>
        <Tooltip content={renderTooltip} />
        <Legend
          verticalAlign="bottom"
          height={36}
          wrapperStyle={{
            paddingTop: "20px",
            fontSize: "14px",
          }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
