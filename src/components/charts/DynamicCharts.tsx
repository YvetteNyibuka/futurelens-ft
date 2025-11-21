"use client";

import dynamic from "next/dynamic";
import { BarChart3, PieChart } from "lucide-react";
import React from "react";

// Placeholder component for loading state
function ChartPlaceholder({
  icon,
  text,
}: {
  icon: React.ReactNode;
  text: string;
}) {
  return (
    <div className="h-64 bg-linear-to-br from-blue-50 to-indigo-100 rounded-lg flex items-center justify-center">
      <div className="text-center">
        {icon}
        <p className="text-blue-700 font-medium">{text}</p>
      </div>
    </div>
  );
}

// Dynamic imports for client components
export const DynamicAgeDistributionChart = dynamic(
  () =>
    import("@/components/charts/DemographicCharts").then(
      (mod) => mod.AgeDistributionChart
    ),
  {
    ssr: false,
    loading: () => (
      <ChartPlaceholder
        icon={<BarChart3 className="h-12 w-12 text-blue-600" />}
        text="Loading Age Distribution Chart..."
      />
    ),
  }
);

export const DynamicGeographicDistributionChart = dynamic(
  () =>
    import("@/components/charts/DemographicCharts").then(
      (mod) => mod.GeographicDistributionChart
    ),
  {
    ssr: false,
    loading: () => (
      <ChartPlaceholder
        icon={<PieChart className="h-12 w-12 text-blue-600" />}
        text="Loading Geographic Distribution Chart..."
      />
    ),
  }
);
