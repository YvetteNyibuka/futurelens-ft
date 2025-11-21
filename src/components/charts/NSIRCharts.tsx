"use client";

import React from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

// Health Trend Analysis Chart Component
export function HealthTrendAnalysisChart({
  childMortalityData,
  vaccinationData,
}: {
  childMortalityData: Array<{
    year: number;
    rate: number;
    improvement: number;
  }>;
  vaccinationData: Array<{ year: number; coverage: number }>;
}) {
  // Combine data for the chart
  const combinedData = childMortalityData.map((item) => {
    const vacItem = vaccinationData.find((v) => v.year === item.year);
    return {
      year: item.year.toString(),
      childMortality: item.rate,
      vaccination: vacItem ? vacItem.coverage : undefined,
    };
  });

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={combinedData}
        margin={{ top: 20, right: 60, left: 60, bottom: 60 }}
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
          yAxisId="left"
          orientation="left"
          tick={{ fontSize: 12, fill: "#64748b" }}
          axisLine={{ stroke: "#0c2461", strokeWidth: 2 }}
          tickLine={{ stroke: "#0c2461" }}
          label={{
            value: "Child Mortality (per 1,000)",
            angle: -90,
            position: "insideLeft",
            style: {
              textAnchor: "middle",
              fill: "#0c2461",
              fontSize: "12px",
              fontWeight: "600",
            },
          }}
        />
        <YAxis
          yAxisId="right"
          orientation="right"
          domain={[0, 100]}
          tick={{ fontSize: 12, fill: "#64748b" }}
          axisLine={{ stroke: "#4a69bd", strokeWidth: 2 }}
          tickLine={{ stroke: "#4a69bd" }}
          label={{
            value: "Vaccination Coverage (%)",
            angle: 90,
            position: "insideRight",
            style: {
              textAnchor: "middle",
              fill: "#4a69bd",
              fontSize: "12px",
              fontWeight: "600",
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
          formatter={(value, name) => {
            if (name === "childMortality")
              return [`${value} per 1,000`, "Child Mortality Rate"];
            return [`${value}%`, "Vaccination Coverage"];
          }}
        />
        <Legend
          wrapperStyle={{
            paddingTop: "20px",
            fontSize: "14px",
          }}
        />
        <Line
          yAxisId="left"
          type="monotone"
          dataKey="childMortality"
          name="Child Mortality Rate"
          stroke="#0c2461"
          strokeWidth={4}
          dot={{ fill: "#0c2461", strokeWidth: 2, r: 6, stroke: "#fff" }}
          activeDot={{ r: 8, fill: "#0c2461", stroke: "#fff", strokeWidth: 3 }}
        />
        <Line
          yAxisId="right"
          type="monotone"
          dataKey="vaccination"
          name="Vaccination Coverage"
          stroke="#4a69bd"
          strokeWidth={4}
          dot={{ fill: "#4a69bd", strokeWidth: 2, r: 6, stroke: "#fff" }}
          activeDot={{ r: 8, fill: "#4a69bd", stroke: "#fff", strokeWidth: 3 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

// Provincial Comparison Chart Component
export function ProvincialComparisonChart({
  provincialData,
}: {
  provincialData: Record<string, any[]>;
}) {
  // Process data for the chart
  const provinces = Object.keys(provincialData);
  const chartData = provinces.map((province) => {
    const provinceData = provincialData[province];
    const latestData =
      provinceData.length > 0 ? provinceData[provinceData.length - 1] : null;

    // Only proceed if we have valid data
    if (!latestData) return { province, childMortality: 0, vaccination: 0 };

    return {
      province,
      childMortality: latestData.childMortality || 0,
      vaccination: latestData.vaccination?.dpt3 || 0,
    };
  });

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={chartData}
        layout="vertical"
        margin={{ top: 20, right: 30, left: 80, bottom: 20 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" opacity={0.8} />
        <XAxis
          type="number"
          tick={{ fontSize: 12, fill: "#64748b" }}
          axisLine={{ stroke: "#cbd5e1", strokeWidth: 1 }}
          tickLine={{ stroke: "#cbd5e1" }}
          label={{
            value: "Value (Rate per 1,000 / Coverage %)",
            position: "insideBottom",
            offset: -5,
            style: {
              textAnchor: "middle",
              fill: "#475569",
              fontSize: "12px",
              fontWeight: "500",
            },
          }}
        />
        <YAxis
          dataKey="province"
          type="category"
          width={80}
          tick={{ fontSize: 12, fill: "#64748b" }}
          axisLine={{ stroke: "#cbd5e1", strokeWidth: 1 }}
          tickLine={{ stroke: "#cbd5e1" }}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "white",
            border: "1px solid #e2e8f0",
            borderRadius: "12px",
            boxShadow: "0 8px 25px -5px rgba(0, 0, 0, 0.1)",
            padding: "12px",
          }}
          formatter={(value, name) => {
            if (name === "childMortality")
              return [`${value} per 1,000`, "Child Mortality Rate"];
            return [`${value}%`, "Vaccination Coverage"];
          }}
        />
        <Legend
          wrapperStyle={{
            paddingTop: "15px",
            fontSize: "14px",
          }}
        />
        <Bar
          dataKey="childMortality"
          name="Child Mortality Rate"
          fill="#0c2461"
          radius={[0, 4, 4, 0]}
        />
        <Bar
          dataKey="vaccination"
          name="Vaccination Coverage"
          fill="#4a69bd"
          radius={[0, 4, 4, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
