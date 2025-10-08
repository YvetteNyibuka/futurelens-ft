import Link from "next/link";
import {
  TrendingUp,
  BarChart3,
  LineChart,
  Activity,
} from "lucide-react";

export default function TrendsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            28-Year Health Trends Analysis
          </h1>
          <p className="text-gray-600">
            Interactive visualization of Rwanda's health indicators from 1992 to
            2020
          </p>
        </div>

        {/* Filter Section */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Filter & Search
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Health Category
              </label>
              <select className="w-full p-3 border text-gray-700 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <option>All Categories</option>
                <option>Maternal Health</option>
                <option>Child Health</option>
                <option>Infectious Diseases</option>
                <option>Nutrition</option>
                <option>Vaccination</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Time Period
              </label>
              <select className="w-full p-3 border text-gray-700 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <option>All Years (1992-2020)</option>
                <option>Last 10 Years (2010-2020)</option>
                <option>Last 5 Years (2015-2020)</option>
                <option>Custom Range</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Province
              </label>
              <select className="w-full p-3 border text-gray-700 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <option>National Average</option>
                <option>Kigali City</option>
                <option>Eastern Province</option>
                <option>Western Province</option>
                <option>Northern Province</option>
                <option>Southern Province</option>
              </select>
            </div>
          </div>
        </div>

        {/* Trend Categories */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Maternal Health Trends */}
          <TrendSection
            title="Maternal Health Trends"
            description="Maternal mortality and health service improvements"
            icon={<Activity className="h-6 w-6 text-pink-600" />}
            color="pink"
          >
            <div className="space-y-4">
              <TrendIndicator
                name="Maternal Mortality Rate"
                trend="improving"
                change="-65%"
                current="248 per 100,000"
                period="1992-2020"
              />
              <TrendIndicator
                name="Skilled Birth Attendance"
                trend="improving"
                change="+80%"
                current="91% of births"
                period="1992-2020"
              />
            </div>
          </TrendSection>

          {/* Child Health Trends */}
          <TrendSection
            title="Child Health & Nutrition"
            description="Child mortality and nutrition indicators"
            icon={<Activity className="h-6 w-6 text-blue-600" />}
            color="blue"
          >
            <div className="space-y-4">
              <TrendIndicator
                name="Child Mortality Rate"
                trend="improving"
                change="-70%"
                current="29.1 per 1,000"
                period="1992-2020"
              />
              <TrendIndicator
                name="Stunting Prevalence"
                trend="improving"
                change="-45%"
                current="33.1% of children"
                period="2000-2020"
              />
            </div>
          </TrendSection>

          {/* Vaccination Trends */}
          <TrendSection
            title="Vaccination Coverage"
            description="Immunization program achievements"
            icon={<Activity className="h-6 w-6 text-green-600" />}
            color="green"
          >
            <div className="space-y-4">
              <TrendIndicator
                name="DPT3 Coverage"
                trend="improving"
                change="+70%"
                current="98% coverage"
                period="1992-2020"
              />
              <TrendIndicator
                name="Measles Vaccination"
                trend="improving"
                change="+65%"
                current="95% coverage"
                period="1992-2020"
              />
            </div>
          </TrendSection>

          {/* Disease Prevention */}
          <TrendSection
            title="Disease Prevention"
            description="Infectious disease control and prevention"
            icon={<Activity className="h-6 w-6 text-purple-600" />}
            color="purple"
          >
            <div className="space-y-4">
              <TrendIndicator
                name="HIV Prevalence"
                trend="stable"
                change="-1%"
                current="2.9% adult prevalence"
                period="2010-2020"
              />
              <TrendIndicator
                name="Malaria Incidence"
                trend="improving"
                change="-30%"
                current="Reduced significantly"
                period="2010-2020"
              />
            </div>
          </TrendSection>
        </div>

        {/* Chart Placeholder */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Interactive Trend Chart
          </h2>
          <div className="h-96 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <LineChart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 font-medium text-lg">
                Interactive Chart Component
              </p>
              <p className="text-gray-500">
                Will display selectable health indicators with 28-year trend
                lines
              </p>
              <div className="mt-4 space-x-4">
                <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                  Multi-year comparison
                </span>
                <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                  Province filtering
                </span>
                <span className="inline-block px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                  Export capabilities
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Key Insights */}
        <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-lg p-8 text-white">
          <h2 className="text-2xl font-bold mb-6">Key Trend Insights</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <InsightCard
              title="Remarkable Progress"
              description="Rwanda achieved some of the fastest health improvements globally between 1992-2020"
            />
            <InsightCard
              title="Policy Impact"
              description="Major health policies show clear correlation with improved health outcomes"
            />
            <InsightCard
              title="Universal Coverage"
              description="Health insurance and service coverage reached 95%+ of the population"
            />
          </div>
        </div>
      </main>
    </div>
  );
}

function TrendSection({
  title,
  description,
  icon,
  color,
  children,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: "pink" | "blue" | "green" | "purple";
  children: React.ReactNode;
}) {
  const colorClasses = {
    pink: "bg-pink-50 border-pink-200",
    blue: "bg-blue-50 border-blue-200",
    green: "bg-green-50 border-green-200",
    purple: "bg-purple-50 border-purple-200",
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className={`${colorClasses[color]} rounded-lg p-4 mb-4`}>
        <div className="flex items-center space-x-3 mb-2">
          {icon}
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        </div>
        <p className="text-gray-600 text-sm">{description}</p>
      </div>
      {children}
    </div>
  );
}

function TrendIndicator({
  name,
  trend,
  change,
  current,
  period,
}: {
  name: string;
  trend: "improving" | "stable" | "declining";
  change: string;
  current: string;
  period: string;
}) {
  const trendColors = {
    improving: "text-green-600 bg-green-100",
    stable: "text-yellow-600 bg-yellow-100",
    declining: "text-red-600 bg-red-100",
  };

  const trendIcons = {
    improving: "↗",
    stable: "→",
    declining: "↘",
  };

  return (
    <div className="border border-gray-200 rounded-lg p-4">
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-medium text-gray-900">{name}</h4>
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${trendColors[trend]}`}
        >
          {trendIcons[trend]} {change}
        </span>
      </div>
      <p className="text-gray-600 text-sm mb-1">{current}</p>
      <p className="text-gray-500 text-xs">{period}</p>
    </div>
  );
}

function InsightCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
      <h3 className="font-semibold text-white mb-2">{title}</h3>
      <p className="text-blue-100 text-sm">{description}</p>
    </div>
  );
}
