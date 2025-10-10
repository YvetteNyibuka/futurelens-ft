"use client";

import { MapPin, Users, TrendingUp, Calendar } from "lucide-react";
import { useState, useEffect } from "react";
import { RwandaHealthMap } from "@/components/maps/RwandaHealthMap";
import { ProvincialTrendChart } from "@/components/charts/ProvincialTrendChart";
import nsirDataService, {
  ProcessedSurveyData,
} from "@/services/nsirDataService";

export default function DashboardProvincesPage() {
  const [selectedIndicator, setSelectedIndicator] = useState("coverage_rate");
  const [selectedProvince, setSelectedProvince] = useState("");
  const [provinceData, setProvinceData] = useState<Record<string, any>>({});

  useEffect(() => {
    // Using the imported service instance directly
    nsirDataService
      .getProcessedHealthData()
      .then((data: ProcessedSurveyData) => {
        setProvinceData(data.provincialComparison);
      });
  }, []);

  return (
    <div className="p-6 space-y-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Provincial Health Overview
        </h1>
        <p className="text-gray-600">
          Health indicators and insights across Rwanda's five provinces
        </p>
      </div>

      {/* Provincial Map Overview */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Rwanda Health Map
          </h3>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Indicator:</span>
            <select
              className="text-sm border-gray-300 rounded-md"
              value={selectedIndicator}
              onChange={(e) => setSelectedIndicator(e.target.value)}
            >
              <option value="coverage_rate">Health Coverage</option>
              <option value="childMortality">Child Mortality</option>
              <option value="vaccination">Vaccination Rate</option>
            </select>
          </div>
        </div>
        <div className="h-80 rounded-lg">
          <RwandaHealthMap
            selectedIndicator={selectedIndicator}
            provinceData={provinceData}
            onProvinceClick={(province: string) =>
              setSelectedProvince(province)
            }
          />
        </div>
        <p className="text-sm text-center text-gray-600 mt-4">
          Click on any province to view detailed health indicators
        </p>
      </div>

      {/* Provincial Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.keys(provinceData).map((province) => {
          const provinceInfo = provinceData[province];
          const latestData = provinceInfo?.length
            ? provinceInfo[provinceInfo.length - 1]
            : null;

          if (!latestData) return null;

          const coverageRate = latestData.vaccination?.dpt3 || 0;
          const statusColor =
            coverageRate > 90
              ? "bg-green-100 text-green-800"
              : coverageRate > 80
              ? "bg-blue-100 text-blue-800"
              : "bg-yellow-100 text-yellow-800";
          const statusText =
            coverageRate > 90
              ? "Excellent"
              : coverageRate > 80
              ? "Good"
              : "Average";

          const isSelected = selectedProvince === province;

          return (
            <div
              key={province}
              className={`bg-white rounded-lg border ${
                isSelected ? "border-blue-500 shadow-lg" : "border-gray-200"
              } p-6 hover:shadow-lg transition-shadow cursor-pointer`}
              onClick={() => setSelectedProvince(province)}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  {province}
                </h3>
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColor}`}
                >
                  {statusText}
                </span>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Child Mortality</span>
                  <span className="text-sm font-medium text-gray-900">
                    {latestData.childMortality || 0} per 1,000
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">
                    Vaccination Rate
                  </span>
                  <span className="text-sm font-medium text-blue-600">
                    {coverageRate}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Stunting</span>
                  <span className="text-sm font-medium text-gray-900">
                    {latestData.stunting || 0}%
                  </span>
                </div>
                {latestData.maternalHealth && (
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">
                      Skilled Birth Attendance
                    </span>
                    <span className="text-sm font-medium text-gray-900">
                      {latestData.maternalHealth.skilledDelivery || 0}%
                    </span>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {/* National Summary */}
        <div className="bg-gradient-to-br from-blue-950 to-blue-700 rounded-lg p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">National Average</h3>
            <Users className="h-6 w-6" />
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-blue-100">Total Population</span>
              <span className="font-medium">12.6M</span>
            </div>
            <div className="flex justify-between">
              <span className="text-blue-100">Health Facilities</span>
              <span className="font-medium">1,594</span>
            </div>
            <div className="flex justify-between">
              <span className="text-blue-100">Avg Coverage Rate</span>
              <span className="font-medium">85.7%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-blue-100">Child Mortality</span>
              <span className="font-medium">32.1 per 1,000</span>
            </div>
          </div>
        </div>
      </div>

      {/* Provincial Health Trends */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Provincial Health Trends
          </h3>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Metric:</span>
            <select
              className="text-sm border-gray-300 rounded-md"
              value={selectedIndicator}
              onChange={(e) => setSelectedIndicator(e.target.value)}
            >
              <option value="childMortality">Child Mortality</option>
              <option value="vaccination">Vaccination Coverage</option>
              <option value="coverage_rate">Health Coverage</option>
            </select>
          </div>
        </div>
        <div className="h-64">
          <ProvincialTrendChart
            provinceData={provinceData}
            selectedProvince={selectedProvince}
            indicator={
              selectedIndicator as "childMortality" | "vaccination" | "stunting"
            }
          />
        </div>
        <p className="text-sm text-center text-gray-600 mt-4">
          {selectedIndicator === "childMortality"
            ? "Lower values indicate better outcomes"
            : "Higher values indicate better coverage"}
        </p>
      </div>

      {/* Recent Updates */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Recent Provincial Updates
        </h3>
        <div className="space-y-4">
          <div className="flex items-start space-x-4 p-4 bg-blue-50 rounded-lg">
            <Calendar className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <p className="font-medium text-gray-900">Eastern Province</p>
              <p className="text-sm text-gray-600">
                New health facility opened in Kayonza district
              </p>
              <p className="text-xs text-blue-600">2 days ago</p>
            </div>
          </div>
          <div className="flex items-start space-x-4 p-4 bg-blue-50 rounded-lg">
            <Calendar className="h-5 w-5 text-blue-700 mt-0.5" />
            <div>
              <p className="font-medium text-gray-900">Kigali</p>
              <p className="text-sm text-gray-600">
                Vaccination campaign reached 98% coverage
              </p>
              <p className="text-xs text-blue-700">1 week ago</p>
            </div>
          </div>
          <div className="flex items-start space-x-4 p-4 bg-blue-50 rounded-lg">
            <Calendar className="h-5 w-5 text-blue-800 mt-0.5" />
            <div>
              <p className="font-medium text-gray-900">Southern Province</p>
              <p className="text-sm text-gray-600">
                Mobile clinic program expansion in rural areas
              </p>
              <p className="text-xs text-blue-800">2 weeks ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
