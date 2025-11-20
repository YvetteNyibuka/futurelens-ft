"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { healthDataQueries } from "@/services/healthDataService";
import { MapPin, BarChart3, TrendingUp, Users, ArrowLeft } from "lucide-react";

export default function ProvincesPage() {
  // Fetch provincial health data
  const { data: provincialData, isLoading } = useQuery(
    healthDataQueries.provincialHealth()
  );

  const { data: healthIndicators } = useQuery(
    healthDataQueries.healthIndicators()
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <main className="container mx-auto px-4 py-8">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-200 rounded w-1/3"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-48 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </main>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center space-x-2 text-gray-600 hover:text-nsir-primary"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Home</span>
            </Link>
            <div className="flex items-center space-x-3">
              <div className="h-8 w-8 bg-gradient-to-br from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
                <MapPin className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-semibold text-gray-900">
                Provincial Health Analysis
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Provincial Health Insights
          </h1>
          <p className="text-gray-600">
            Compare health outcomes and progress across Rwanda's five provinces
          </p>
        </div>

        {/* Map Placeholder */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Interactive Rwanda Map
          </h2>
          <div className="h-96 bg-gradient-to-br from-nsir-secondary-50 to-nsir-primary-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl mb-4">🇷🇼</div>
              <p className="text-gray-600 font-medium text-lg">
                Interactive Province Map
              </p>
              <p className="text-gray-500 mb-4">
                Click on provinces to view detailed health analytics
              </p>
              <div className="flex items-center justify-center space-x-4 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-green-500 rounded"></div>
                  <span className="text-gray-600">Excellent (80-100)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-yellow-500 rounded"></div>
                  <span className="text-gray-600">Good (60-79)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-orange-500 rounded"></div>
                  <span className="text-gray-600 ">Fair (40-59)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-red-500 rounded"></div>
                  <span className="text-gray-600">
                    Needs Improvement (&lt;40)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Province Comparison */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">
            Province Performance Overview
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {provincialData && provincialData.length > 0 ? (
              provincialData.map((province: any, index: number) => (
                <ProvinceCard
                  key={province.name || index}
                  name={province.name || `Province ${index + 1}`}
                  healthScore={province.healthScore || 85}
                  population={province.population || "N/A"}
                  rank={index + 1}
                  highlights={province.highlights || [
                    "Health services available",
                    "Data collection ongoing",
                    "Progress monitored"
                  ]}
                  color={province.healthScore > 85 ? "green" : province.healthScore > 70 ? "yellow" : "orange"}
                />
              ))
            ) : (
              <>
                <ProvinceCard
                  name="Kigali City"
                  healthScore={92}
                  population="1.2M"
                  rank={1}
                  highlights={[
                    "Highest health score",
                    "Best maternal care",
                    "Leading vaccination rates",
                  ]}
                  color="green"
                />

                <ProvinceCard
                  name="Southern Province"
                  healthScore={86}
                  population="2.6M"
                  rank={2}
                  highlights={[
                    "Strong child health",
                    "Good nutrition programs",
                    "Improved water access",
                  ]}
                  color="green"
                />

                <ProvinceCard
                  name="Western Province"
                  healthScore={81}
                  population="2.5M"
                  rank={3}
                  highlights={[
                    "Steady improvement",
                    "Rural health success",
                    "Community engagement",
                  ]}
                  color="yellow"
                />

                <ProvinceCard
                  name="Northern Province"
                  healthScore={78}
                  population="1.9M"
                  rank={4}
                  highlights={[
                    "Infrastructure development",
                    "Training programs",
                    "Health facility upgrades",
                  ]}
                  color="yellow"
                />

                <ProvinceCard
                  name="Eastern Province"
                  healthScore={75}
                  population="2.6M"
                  rank={5}
                  highlights={[
                    "Rapid progress",
                    "Community health workers",
                    "Mobile health services",
                  ]}
                  color="orange"
                />
              </>
            )}
              

            <ProvinceCard
              name="Northern Province"
              healthScore={78}
              population="1.9M"
              rank={4}
              highlights={[
                "Mountain health challenges",
                "Infrastructure development",
                "Tourism health benefits",
              ]}
              color="yellow"
            />

            <ProvinceCard
              name="Eastern Province"
              healthScore={75}
              population="2.6M"
              rank={5}
              highlights={[
                "Border health programs",
                "Agricultural health",
                "Refugee integration",
              ]}
              color="orange"
            />
          </div>
        </div>

        {/* Detailed Comparison Table */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">
            Detailed Health Indicators by Province
          </h2>

          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-900">
                    Province
                  </th>
                  <th className="text-center py-3 px-4 font-medium text-gray-900">
                    Health Score
                  </th>
                  <th className="text-center py-3 px-4 font-medium text-gray-900">
                    Maternal Mortality
                  </th>
                  <th className="text-center py-3 px-4 font-medium text-gray-900">
                    Child Mortality
                  </th>
                  <th className="text-center py-3 px-4 font-medium text-gray-900">
                    Vaccination Rate
                  </th>
                  <th className="text-center py-3 px-4 font-medium text-gray-900">
                    Health Insurance
                  </th>
                </tr>
              </thead>
              <tbody>
                <ProvinceRow
                  name="Kigali City"
                  healthScore={92}
                  maternalMortality={180}
                  childMortality={22}
                  vaccinationRate={98}
                  healthInsurance={97}
                  isTop={true}
                />
                <ProvinceRow
                  name="Southern Province"
                  healthScore={86}
                  maternalMortality={220}
                  childMortality={28}
                  vaccinationRate={96}
                  healthInsurance={95}
                />
                <ProvinceRow
                  name="Western Province"
                  healthScore={81}
                  maternalMortality={250}
                  childMortality={32}
                  vaccinationRate={94}
                  healthInsurance={93}
                />
                <ProvinceRow
                  name="Northern Province"
                  healthScore={78}
                  maternalMortality={270}
                  childMortality={35}
                  vaccinationRate={92}
                  healthInsurance={91}
                />
                <ProvinceRow
                  name="Eastern Province"
                  healthScore={75}
                  maternalMortality={290}
                  childMortality={38}
                  vaccinationRate={90}
                  healthInsurance={89}
                />
              </tbody>
            </table>
          </div>
        </div>

        {/* Key Insights */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <InsightCard
            title="Urban Advantage"
            description="Kigali City leads in most health indicators due to concentrated healthcare infrastructure and resources."
            icon={<BarChart3 className="h-5 w-5 text-blue-600" />}
          />

          <InsightCard
            title="Rural Progress"
            description="Rural provinces show remarkable improvement in health outcomes over the 28-year period."
            icon={<TrendingUp className="h-5 w-5 text-green-600" />}
          />

          <InsightCard
            title="Universal Coverage"
            description="All provinces achieve 89%+ health insurance coverage, demonstrating successful policy implementation."
            icon={<Users className="h-5 w-5 text-purple-600" />}
          />
        </div>
      </main>
    </div>
  );
}

function ProvinceCard({
  name,
  healthScore,
  population,
  rank,
  highlights,
  color,
}: {
  name: string;
  healthScore: number;
  population: string;
  rank: number;
  highlights: string[];
  color: "green" | "yellow" | "orange";
}) {
  const colorClasses = {
    green: "bg-green-50 border-green-200 text-green-800",
    yellow: "bg-yellow-50 border-yellow-200 text-yellow-800",
    orange: "bg-orange-50 border-orange-200 text-orange-800",
  };

  return (
    <div className={`${colorClasses[color]} rounded-lg border p-4`}>
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-gray-900">{name}</h3>
        <span className="text-xs bg-white px-2 py-1 rounded-full">#{rank}</span>
      </div>

      <div className="mb-3">
        <div className="text-2xl font-bold text-gray-900">{healthScore}</div>
        <div className="text-sm text-gray-600">Health Score</div>
      </div>

      <div className="mb-3">
        <div className="text-sm text-gray-600">Population: {population}</div>
      </div>

      <div className="space-y-1">
        {highlights.map((highlight, index) => (
          <div key={index} className="text-xs text-gray-700">
            • {highlight}
          </div>
        ))}
      </div>
    </div>
  );
}

function ProvinceRow({
  name,
  healthScore,
  maternalMortality,
  childMortality,
  vaccinationRate,
  healthInsurance,
  isTop = false,
}: {
  name: string;
  healthScore: number;
  maternalMortality: number;
  childMortality: number;
  vaccinationRate: number;
  healthInsurance: number;
  isTop?: boolean;
}) {
  return (
    <tr
      className={`border-b border-gray-100 ${
        isTop ? "bg-green-50" : "hover:bg-gray-50"
      }`}
    >
      <td className="py-3 px-4 font-medium text-gray-900">{name}</td>
      <td className="py-3 px-4 text-center">
        <span
          className={`font-semibold ${
            healthScore >= 85
              ? "text-nsir-secondary"
              : healthScore >= 75
              ? "text-yellow-600"
              : "text-orange-600"
          }`}
        >
          {healthScore}
        </span>
      </td>
      <td className="py-3 px-4 text-center text-gray-600">
        {maternalMortality}
      </td>
      <td className="py-3 px-4 text-center text-gray-600">{childMortality}</td>
      <td className="py-3 px-4 text-center text-gray-600">
        {vaccinationRate}%
      </td>
      <td className="py-3 px-4 text-center text-gray-600">
        {healthInsurance}%
      </td>
    </tr>
  );
}

function InsightCard({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center space-x-3 mb-3">
        {icon}
        <h3 className="font-semibold text-gray-900">{title}</h3>
      </div>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );
}
