"use client";

import React from "react";
import Link from "next/link";
import HealthDataTableComponent from "../../../components/data/HealthDataTableComponent";
import { useQuery } from "@tanstack/react-query";
import {
  HealthDataService,
  healthDataQueries,
} from "../../../services/healthDataService";
import {
  Database,
  Calendar,
  MapPin,
  BarChart3,
  TrendingUp,
  Info,
  Filter,
  Book,
} from "lucide-react";

export default function HouseholdDataPage() {
  const { data: availableData, isLoading: isLoadingAvailable } = useQuery({
    queryKey: ["availableDataTypes"],
    queryFn: async () => {
      try {
        // Use the health data service to get available data
        const result = await HealthDataService.getAvailableDataTypes();

        // Process years to handle both single years and ranges
        const processedYears = result.years
          .map((year: any) => {
            const yearStr = year.toString();
            if (yearStr.includes("-")) {
              // Extract the first year from ranges like "2014-2015"
              return parseInt(yearStr.split("-")[0]);
            }
            return parseInt(yearStr);
          })
          .filter((year: any) => !isNaN(year));

        return {
          types: result.types,
          years: [...new Set(processedYears)].sort((a, b) => a - b),
        };
      } catch (error) {
        console.error("Failed to fetch available data:", error);
        // Return empty arrays if backend fails
        return {
          types: [],
          years: [],
        };
      }
    },
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
  });

  const { data: analytics, isLoading: isLoadingAnalytics } = useQuery(
    healthDataQueries.healthDataAnalytics()
  );

  const availableTypes: string[] = (availableData?.types as string[]) || [];
  const availableYears: number[] = (availableData?.years as number[]) || [];

  return (
    <div className="space-y-6 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="bg-linear-to-r from-blue-900 to-blue-800 rounded-xl p-6 sm:p-8 text-white shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2 flex items-center">
              <Database className="mr-3 h-6 w-6" />
              Rwanda Health Survey Data Explorer
            </h1>
            <p className="text-blue-100 text-sm mb-2">
              Explore comprehensive health survey data from Rwanda's Demographic
              and Health Surveys (DHS) with advanced filtering by data type and
              year
            </p>
            <div className="flex items-center space-x-4 text-sm text-blue-200">
              <div className="flex items-center bg-blue-800/50 rounded-lg px-3 py-2">
                <Calendar className="mr-2 h-4 w-4" />
                <span className="font-medium">
                  {isLoadingAvailable
                    ? "Loading..."
                    : `${availableYears?.length || 0} Survey Years`}
                </span>
              </div>
              <div className="flex items-center bg-blue-800/50 rounded-lg px-3 py-2">
                <Database className="mr-2 h-4 w-4" />
                <span className="font-medium">
                  {isLoadingAvailable
                    ? "Loading..."
                    : `${availableTypes?.length || 0} Data Types`}
                </span>
              </div>
              <div className="flex items-center bg-blue-800/50 rounded-lg px-3 py-2">
                <BarChart3 className="mr-2 h-4 w-4" />
                <span className="font-medium">Real-time Analytics</span>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-auto">
            <div className="bg-blue-800/70 rounded-xl p-4 sm:p-6 backdrop-blur-sm border border-blue-700/50 shadow-lg">
              <p className="text-sm font-semibold text-blue-200 mb-1">
                Data Source
              </p>
              <p className="text-xl sm:text-2xl font-bold text-white">
                DHS Program
              </p>
              <p className="text-xs text-blue-200 mt-1">
                Rwanda Demographic & Health Surveys
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Available Data Types */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8 shadow-lg">
        <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-6 flex items-center">
          <Filter className="mr-3 h-6 w-6 text-blue-600" />
          Available Data Types & Years
        </h3>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          <div>
            <h4 className="font-semibold text-gray-800 mb-4 text-lg">
              Data Types
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-2 gap-3">
              {availableTypes.map((type: string) => (
                <div
                  key={type}
                  className="bg-linear-to-br from-blue-50 to-blue-100 rounded-xl p-4 text-center hover:shadow-md transition-all duration-200 hover:scale-105 border border-blue-200"
                >
                  <span className="text-sm font-bold text-blue-900 capitalize">
                    {type.replace("_", " ")}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-medium text-gray-800 mb-3">Survey Years</h4>
            <div className="grid grid-cols-3 gap-2">
              {availableYears.map((year: number) => (
                <div
                  key={year}
                  className="bg-green-50 rounded-lg p-3 text-center"
                >
                  <span className="text-sm font-medium text-green-900">
                    {year}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Key Features Info */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center mb-3">
            <Filter className="h-5 w-5 text-blue-600 mr-2" />
            <h3 className="font-semibold text-gray-900">Advanced Filtering</h3>
          </div>
          <p className="text-sm text-gray-600 mb-2">
            Filter data by type, year, province, and search across all fields
            for precise data analysis.
          </p>
          <ul className="text-xs text-gray-500">
            <li>• Multiple data types supported</li>
            <li>• Year-based filtering</li>
            <li>• Real-time search functionality</li>
          </ul>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center mb-3">
            <MapPin className="h-5 w-5 text-green-600 mr-2" />
            <h3 className="font-semibold text-gray-900">Geographic Coverage</h3>
          </div>
          <p className="text-sm text-gray-600 mb-2">
            Comprehensive coverage across all provinces and regions in Rwanda
            with optional province filtering.
          </p>
          <ul className="text-xs text-gray-500">
            <li>• All 5 provinces</li>
            <li>• Urban and rural areas</li>
            <li>• Cluster-level data</li>
          </ul>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center mb-3">
            <TrendingUp className="h-5 w-5 text-purple-600 mr-2" />
            <h3 className="font-semibold text-gray-900">Rich Data Variables</h3>
          </div>
          <p className="text-sm text-gray-600 mb-2">
            Detailed variables across different survey modules including
            household, person, child, and health data.
          </p>
          <ul className="text-xs text-gray-500">
            <li>• Individual & household data</li>
            <li>• Health & nutrition indicators</li>
            <li>• Demographic characteristics</li>
          </ul>
        </div>
      </div>

      {/* Analytics Overview */}
      {analytics && !isLoadingAnalytics && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <BarChart3 className="mr-2 h-5 w-5 text-blue-600" />
            Data Analytics Overview
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Yearly Trends */}
            {analytics.yearlyTrends && analytics.yearlyTrends.length > 0 && (
              <div>
                <h4 className="font-medium text-gray-800 mb-3">
                  Yearly Trends
                </h4>
                <div className="space-y-2">
                  {analytics.yearlyTrends.map((trend, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center p-2 bg-gray-50 rounded"
                    >
                      <span className="font-medium">{trend.year}</span>
                      <span className="text-sm text-gray-600">
                        {trend.totalHouseholds.toLocaleString()} records
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Key Insights */}
            {analytics.keyInsights && analytics.keyInsights.length > 0 && (
              <div>
                <h4 className="font-medium text-gray-800 mb-3">Key Insights</h4>
                <div className="space-y-2">
                  {analytics.keyInsights.map((insight, index) => (
                    <div
                      key={index}
                      className="flex items-start p-2 bg-blue-50 rounded"
                    >
                      <Info className="h-4 w-4 text-blue-600 mr-2 mt-0.5 shrink-0" />
                      <span className="text-sm text-blue-800">{insight}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Main Data Component with Enhanced Filtering */}
      <HealthDataTableComponent
        defaultDataType="household"
        defaultYear={availableYears?.[0] || 1992}
        className="shadow-lg"
      />

      {/* Documentation Link */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Info className="h-5 w-5 text-blue-600 mr-2" />
            <div>
              <h3 className="text-sm font-medium text-blue-900">
                Need help understanding the data codes/column titles?
              </h3>
              <p className="text-sm text-blue-700">
                View our comprehensive documentation to understand what each
                variable means.
              </p>
            </div>
          </div>
          <Link
            href="/dashboard/documentation"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Book className="h-4 w-4 mr-2" />
            View Documentation
          </Link>
        </div>
      </div>
    </div>
  );
}
