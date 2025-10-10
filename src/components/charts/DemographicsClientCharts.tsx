"use client";

import React from "react";
import {
  AgeDistributionChart,
  GeographicDistributionChart,
} from "@/components/charts/DemographicCharts";
import { BarChart3, PieChart } from "lucide-react";

// Client-side chart component wrappers
export function DemographicsAgeChart() {
  return (
    <div className="h-64">
      <AgeDistributionChart />
    </div>
  );
}

export function DemographicsGeographicChart() {
  return (
    <div className="h-64">
      <GeographicDistributionChart />
    </div>
  );
}

// Fallback placeholder for charts when loading
export function ChartPlaceholder({
  icon,
  text,
}: {
  icon: React.ReactNode;
  text: string;
}) {
  return (
    <div className="h-64 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg flex items-center justify-center">
      <div className="text-center">
        {icon}
        <p className="text-blue-700 font-medium">{text}</p>
      </div>
    </div>
  );
}
