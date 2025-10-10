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
      <LineChart data={combinedData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="year" />
        <YAxis yAxisId="left" orientation="left" />
        <YAxis yAxisId="right" orientation="right" domain={[0, 100]} />
        <Tooltip
          formatter={(value, name) => {
            if (name === "childMortality")
              return [`${value} per 1,000`, "Child Mortality"];
            return [`${value}%`, "Vaccination Coverage"];
          }}
        />
        <Line
          yAxisId="left"
          type="monotone"
          dataKey="childMortality"
          name="Child Mortality"
          stroke="#0c2461"
          activeDot={{ r: 8 }}
        />
        <Line
          yAxisId="right"
          type="monotone"
          dataKey="vaccination"
          name="Vaccination Coverage"
          stroke="#4a69bd"
          activeDot={{ r: 8 }}
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
      <BarChart data={chartData} layout="vertical">
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis type="number" />
        <YAxis dataKey="province" type="category" width={80} />
        <Tooltip
          formatter={(value, name) => {
            if (name === "childMortality")
              return [`${value} per 1,000`, "Child Mortality"];
            return [`${value}%`, "Vaccination Coverage"];
          }}
        />
        <Bar dataKey="childMortality" name="Child Mortality" fill="#0c2461" />
        <Bar dataKey="vaccination" name="Vaccination Coverage" fill="#4a69bd" />
      </BarChart>
    </ResponsiveContainer>
  );
}
