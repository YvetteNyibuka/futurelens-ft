import {
  BarChart3,
  TrendingUp,
  Users,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

export default function DashboardAnalyticsPage() {
  return (
    <div className="p-6 space-y-6 min-h-screen w-full">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Health Analytics
        </h1>
        <p className="text-gray-600">
          Detailed analysis of Rwanda's health indicators and trends
        </p>
      </div>

      {/* Key Performance Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Child Mortality Rate
              </p>
              <p className="text-2xl font-bold text-gray-900">32.1</p>
              <p className="text-sm text-green-600 flex items-center">
                <ArrowDownRight className="h-4 w-4 mr-1" />
                -70% since 1992
              </p>
            </div>
            <Activity className="h-8 w-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Vaccination Coverage
              </p>
              <p className="text-2xl font-bold text-gray-900">95.2%</p>
              <p className="text-sm text-green-600 flex items-center">
                <ArrowUpRight className="h-4 w-4 mr-1" />
                +65% improvement
              </p>
            </div>
            <TrendingUp className="h-8 w-8 text-green-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Life Expectancy
              </p>
              <p className="text-2xl font-bold text-gray-900">69.1 years</p>
              <p className="text-sm text-green-600 flex items-center">
                <ArrowUpRight className="h-4 w-4 mr-1" />
                +25 years since 1992
              </p>
            </div>
            <Users className="h-8 w-8 text-purple-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Health Insurance
              </p>
              <p className="text-2xl font-bold text-gray-900">95.8%</p>
              <p className="text-sm text-green-600 flex items-center">
                <ArrowUpRight className="h-4 w-4 mr-1" />
                Universal coverage
              </p>
            </div>
            <BarChart3 className="h-8 w-8 text-orange-600" />
          </div>
        </div>
      </div>

      {/* Analytics Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Health Trend Analysis
          </h3>
          <div className="h-64 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <TrendingUp className="h-12 w-12 text-blue-600 mx-auto mb-2" />
              <p className="text-blue-700 font-medium">Trend Analysis Chart</p>
              <p className="text-sm text-blue-600">
                28-year health transformation
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Provincial Comparison
          </h3>
          <div className="h-64 bg-gradient-to-br from-green-50 to-emerald-100 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <BarChart3 className="h-12 w-12 text-green-600 mx-auto mb-2" />
              <p className="text-green-700 font-medium">Comparative Analysis</p>
              <p className="text-sm text-green-600">5 provinces overview</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
