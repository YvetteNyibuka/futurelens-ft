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
const COLORS = ["#0c2461", "#1e3799", "#4a69bd", "#6a89cc", "#82ccdd", "#b8e994"];

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
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="ageGroup" />
        <YAxis 
          label={{ 
            value: "Population (%)", 
            angle: -90, 
            position: "insideLeft" 
          }} 
        />
        <Tooltip formatter={(value) => [`${value}%`, "Population"]} />
        <Legend />
        <Bar dataKey="population" name="Population %" fill="#0c2461" />
      </BarChart>
    </ResponsiveContainer>
  );
}

// Geographic Distribution Chart Component
export function GeographicDistributionChart() {
  const renderLabel = (entry: any) => {
    return `${entry.name} (${entry.percentage}%)`;
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={geographicDistributionData}
          cx="50%"
          cy="50%"
          labelLine={true}
          label={renderLabel}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {geographicDistributionData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip
          formatter={(value: number, name: string, props: any) => {
            return [
              `${value.toLocaleString()} people`,
              props.payload.name
            ];
          }}
        />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}
