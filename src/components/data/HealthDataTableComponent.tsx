/**
 * Generic Health Data Table Component
 * Displays health survey data with data type and year filters
 * Supports all available data types: person, household, child, women, men, calendar, maternal
 */

"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  HealthDataService,
  healthDataQueries,
} from "../../services/healthDataService";
import {
  Download,
  Filter,
  Search,
  ChevronLeft,
  ChevronRight,
  ArrowUp,
  ArrowDown,
  Calendar,
  MapPin,
  Users,
  Home,
  Info,
  Eye,
  FileSpreadsheet,
  BarChart3,
  Database,
} from "lucide-react";

interface HealthDataTableComponentProps {
  defaultDataType?:
    | "person"
    | "household"
    | "child"
    | "women"
    | "men"
    | "calendar"
    | "maternal";
  defaultYear?: number | string;
  defaultProvince?: string;
  className?: string;
}

// Data type configurations
const DATA_TYPE_CONFIG = {
  person: {
    label: "Person Data",
    icon: Users,
    description: "Individual-level demographic data",
    color: "blue",
  },
  household: {
    label: "Household Data",
    icon: Home,
    description: "Household-level survey data",
    color: "green",
  },
  child: {
    label: "Child Health Data",
    icon: Users,
    description: "Child health and nutrition data",
    color: "purple",
  },
  women: {
    label: "Women's Health Data",
    icon: Users,
    description: "Women's health and reproductive data",
    color: "pink",
  },
  men: {
    label: "Men's Health Data",
    icon: Users,
    description: "Men's health and demographic data",
    color: "indigo",
  },
  calendar: {
    label: "Calendar Data",
    icon: Calendar,
    description: "Calendar and event data",
    color: "orange",
  },
  maternal: {
    label: "Maternal Health Data",
    icon: Users,
    description: "Maternal health and pregnancy data",
    color: "red",
  },
};

// Helper function to export data to CSV
const exportToCSV = (data: any[], filename: string) => {
  if (!data || data.length === 0) return;

  const headers = Object.keys(data[0]);
  const csvContent = [
    headers.join(","),
    ...data.map((row) =>
      headers
        .map((header) => {
          const value = row[header];
          return typeof value === "string" && value.includes(",")
            ? `"${value}"`
            : value;
        })
        .join(",")
    ),
  ].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.setAttribute("href", url);
  link.setAttribute("download", filename);
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// Loading component
const LoadingSpinner = () => (
  <div className="flex justify-center items-center py-8">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
  </div>
);

// Error component
const ErrorMessage = ({ message }: { message: string }) => (
  <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-800">
    <p className="font-medium">Error loading health data</p>
    <p className="text-sm">{message}</p>
  </div>
);

export default function HealthDataTableComponent({
  defaultDataType = "household",
  defaultYear = 2000,
  defaultProvince,
  className = "",
}: HealthDataTableComponentProps) {
  // State management
  const [selectedDataType, setSelectedDataType] =
    useState<string>(defaultDataType);
  const [selectedYear, setSelectedYear] = useState<number | string>(
    defaultYear || 2000
  );
  const [selectedProvince, setSelectedProvince] = useState<string>(
    defaultProvince || ""
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(50);
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [sortField, setSortField] = useState<string>("");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  // Fetch available data types and years from backend
  const { data: availableData, isLoading: isLoadingAvailable } = useQuery({
    queryKey: ["availableDataTypes"],
    queryFn: async () => {
      const result = await HealthDataService.getAvailableDataTypes();
      return {
        types: result.types,
        years: result.years.map((year) =>
          typeof year === "string" && year.includes("-")
            ? year
            : parseInt(year.toString())
        ),
      };
    },
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
  });

  const {
    data: healthData,
    isLoading: isLoadingData,
    error: dataError,
    refetch: refetchData,
  } = useQuery({
    queryKey: [
      "healthData",
      selectedDataType,
      selectedYear,
      currentPage,
      pageSize,
      selectedProvince,
    ],
    queryFn: async () => {
      try {
        return await HealthDataService.getHealthDataByType(
          selectedDataType,
          selectedYear,
          {
            page: currentPage,
            limit: pageSize,
            province: selectedProvince || undefined,
          }
        );
      } catch (error: any) {
        console.error("Failed to fetch data:", error);
        // Return empty data structure on error
        return {
          data: [],
          pagination: {
            page: currentPage,
            limit: pageSize,
            total: 0,
            pages: 0,
            hasNext: false,
            hasPrev: false,
          },
          metadata: {
            source: "error",
            data_type: selectedDataType,
            year: selectedYear,
            count: 0,
          },
        };
      }
    },
    enabled: !!selectedDataType && !!selectedYear,
  });

  // Derived data
  const records = healthData?.data || [];
  const totalRecords = healthData?.pagination?.total || 0;
  const totalPages = healthData?.pagination?.pages || 1;
  const availableTypes = availableData?.types || [];
  const availableYears = availableData?.years || [];

  // Filter and sort data client-side
  const filteredAndSortedData = React.useMemo(() => {
    let filtered = records;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter((record: any) =>
        Object.values(record).some((value) =>
          value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    // Sort data
    if (sortField) {
      filtered.sort((a: any, b: any) => {
        const aVal = a[sortField];
        const bVal = b[sortField];

        if (typeof aVal === "number" && typeof bVal === "number") {
          return sortDirection === "asc" ? aVal - bVal : bVal - aVal;
        }

        const aStr = aVal?.toString() || "";
        const bStr = bVal?.toString() || "";
        return sortDirection === "asc"
          ? aStr.localeCompare(bStr)
          : bStr.localeCompare(aStr);
      });
    }

    return filtered;
  }, [records, searchTerm, sortField, sortDirection]);

  // Handle sorting
  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  // Handle data type change
  const handleDataTypeChange = (dataType: string) => {
    setSelectedDataType(dataType);
    setCurrentPage(1); // Reset to first page
    setSortField(""); // Reset sorting
  };

  // Handle year change
  const handleYearChange = (year: number | string) => {
    setSelectedYear(year);
    setCurrentPage(1); // Reset to first page
    setSortField(""); // Reset sorting
  };

  // Handle province change
  const handleProvinceChange = (province: string) => {
    setSelectedProvince(province);
    setCurrentPage(1); // Reset to first page
  };

  // Export functionality
  const handleExport = () => {
    const filename = `${selectedDataType}_data_${selectedYear}${
      selectedProvince ? `_${selectedProvince}` : ""
    }.csv`;
    exportToCSV(filteredAndSortedData, filename);
  };

  // Get dynamic display fields from first record
  const displayFields = React.useMemo(() => {
    if (!records || records.length === 0) return [];

    const firstRecord = records[0];
    return Object.keys(firstRecord)
      .slice(0, 10)
      .map((key) => ({
        key,
        label: key.toUpperCase().replace(/_/g, " "),
        type:
          typeof firstRecord[key] === "number"
            ? ("number" as const)
            : ("string" as const),
      }));
  }, [records]);

  const currentConfig =
    DATA_TYPE_CONFIG[selectedDataType as keyof typeof DATA_TYPE_CONFIG] ||
    DATA_TYPE_CONFIG.household;
  const IconComponent = currentConfig.icon;

  if (isLoadingAvailable || isLoadingData) {
    return (
      <div
        className={`bg-white rounded-lg border border-gray-200 p-6 ${className}`}
      >
        <LoadingSpinner />
      </div>
    );
  }

  if (dataError) {
    return (
      <div className={`${className}`}>
        <ErrorMessage
          message={(dataError as any)?.message || "Failed to load health data"}
        />
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-lg border border-gray-200 ${className}`}>
      {/* Header */}
      <div className="border-b border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2
              className={`text-xl font-semibold text-gray-900 flex items-center`}
            >
              <IconComponent
                className={`mr-2 h-5 w-5 text-${currentConfig.color}-600`}
              />
              Rwanda {currentConfig.label}
            </h2>
            <p className="text-gray-600 text-sm mt-1">
              {currentConfig.description} from DHS surveys
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={handleExport}
              className="flex items-center px-3 py-2 text-sm font-medium text-black bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              disabled={filteredAndSortedData.length === 0}
            >
              <Download className="mr-2 h-4 w-4" />
              Export CSV
            </button>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center px-3 py-2 text-sm font-medium text-black bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <div className={`bg-${currentConfig.color}-50 rounded-lg p-4`}>
            <div className="flex items-center">
              <Database
                className={`h-5 w-5 text-${currentConfig.color}-600 mr-2`}
              />
              <div>
                <p
                  className={`text-sm font-medium text-${currentConfig.color}-900`}
                >
                  Data Type
                </p>
                <p
                  className={`text-lg font-bold text-${currentConfig.color}-900`}
                >
                  {currentConfig.label}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-green-50 rounded-lg p-4">
            <div className="flex items-center">
              <Calendar className="h-5 w-5 text-green-600 mr-2" />
              <div>
                <p className="text-sm font-medium text-green-900">
                  Survey Year
                </p>
                <p className="text-lg font-bold text-green-900">
                  {selectedYear}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-purple-50 rounded-lg p-4">
            <div className="flex items-center">
              <Users className="h-5 w-5 text-purple-600 mr-2" />
              <div>
                <p className="text-sm font-medium text-purple-900">
                  Total Records
                </p>
                <p className="text-lg font-bold text-purple-900">
                  {totalRecords.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-orange-50 rounded-lg p-4">
            <div className="flex items-center">
              <BarChart3 className="h-5 w-5 text-orange-600 mr-2" />
              <div>
                <p className="text-sm font-medium text-orange-900">
                  Current Page
                </p>
                <p className="text-lg font-bold text-orange-900">
                  {currentPage} of {totalPages}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="bg-gray-50 rounded-lg p-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Data Type Selection */}
              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  Data Type
                </label>
                <select
                  value={selectedDataType}
                  onChange={(e) => handleDataTypeChange(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black text-sm"
                >
                  {availableTypes.map((type) => (
                    <option key={type} value={type} className="text-black">
                      {DATA_TYPE_CONFIG[type as keyof typeof DATA_TYPE_CONFIG]
                        ?.label || type}
                    </option>
                  ))}
                </select>
              </div>

              {/* Year Selection */}
              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  Survey Year
                </label>
                <select
                  value={selectedYear}
                  onChange={(e) => {
                    const value = e.target.value;
                    // Handle both numeric years and year ranges
                    const yearValue = isNaN(Number(value))
                      ? value
                      : Number(value);
                    handleYearChange(yearValue);
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black text-sm"
                >
                  {availableYears.map((year) => (
                    <option key={year} value={year} className="text-black">
                      {year}
                    </option>
                  ))}
                </select>
              </div>

              {/* Province Selection */}
              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  Province (Optional)
                </label>
                <input
                  type="text"
                  value={selectedProvince}
                  onChange={(e) => handleProvinceChange(e.target.value)}
                  placeholder="Enter province..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-black placeholder:font-normal text-sm"
                />
              </div>

              {/* Search */}
              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  Search Records
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search records..."
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-black placeholder:font-normal text-sm"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Data Table */}
      {records.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {displayFields.map((field) => (
                  <th
                    key={field.key}
                    onClick={() => handleSort(field.key)}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  >
                    <div className="flex items-center space-x-1">
                      <span>{field.label}</span>
                      {sortField === field.key &&
                        (sortDirection === "asc" ? (
                          <ArrowUp className="h-4 w-4" />
                        ) : (
                          <ArrowDown className="h-4 w-4" />
                        ))}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAndSortedData.map((record: any, index: number) => (
                <tr key={record.id || index} className="hover:bg-gray-50">
                  {displayFields.map((field) => (
                    <td
                      key={field.key}
                      className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                    >
                      {field.type === "number"
                        ? typeof record[field.key] === "number"
                          ? record[field.key].toLocaleString()
                          : record[field.key]
                        : record[field.key]?.toString() || "-"}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-12">
          <FileSpreadsheet className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No data found
          </h3>
          <p className="text-gray-600">
            No records match your current filters. Try adjusting your search
            criteria.
          </p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="border-t border-gray-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-black">
              Showing {(currentPage - 1) * pageSize + 1} to{" "}
              {Math.min(currentPage * pageSize, totalRecords)} of {totalRecords}{" "}
              results
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="flex items-center px-3 py-2 text-sm font-medium text-black bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="mr-1 h-4 w-4" />
              Previous
            </button>
            <span className="text-sm text-black">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() =>
                setCurrentPage(Math.min(totalPages, currentPage + 1))
              }
              disabled={currentPage === totalPages}
              className="flex items-center px-3 py-2 text-sm font-medium text-black bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
              <ChevronRight className="ml-1 h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
