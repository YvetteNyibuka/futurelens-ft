import { MapPin, Users, TrendingUp, Calendar } from "lucide-react";

export default function DashboardProvincesPage() {
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
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Rwanda Health Map
        </h3>
        <div className="h-80 bg-gradient-to-br from-blue-50 to-cyan-100 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <MapPin className="h-16 w-16 text-blue-600 mx-auto mb-4" />
            <p className="text-blue-700 font-medium text-lg">
              Interactive Health Map
            </p>
            <p className="text-sm text-blue-600">
              Click on provinces for detailed health data
            </p>
          </div>
        </div>
      </div>

      {/* Provincial Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Kigali Province */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Kigali</h3>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              Excellent
            </span>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Population</span>
              <span className="text-sm font-medium text-gray-900">1.1M</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Health Facilities</span>
              <span className="text-sm font-medium text-gray-900">247</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Coverage Rate</span>
              <span className="text-sm font-medium text-green-600">94.2%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Urban Population</span>
              <span className="text-sm font-medium text-gray-900">75.2%</span>
            </div>
          </div>
        </div>

        {/* Eastern Province */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Eastern</h3>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              Good
            </span>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Population</span>
              <span className="text-sm font-medium text-gray-900">2.6M</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Health Facilities</span>
              <span className="text-sm font-medium text-gray-900">398</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Coverage Rate</span>
              <span className="text-sm font-medium text-blue-600">87.8%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Urban Population</span>
              <span className="text-sm font-medium text-gray-900">12.3%</span>
            </div>
          </div>
        </div>

        {/* Northern Province */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Northern</h3>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              Good
            </span>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Population</span>
              <span className="text-sm font-medium text-gray-900">1.9M</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Health Facilities</span>
              <span className="text-sm font-medium text-gray-900">289</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Coverage Rate</span>
              <span className="text-sm font-medium text-blue-600">85.4%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Urban Population</span>
              <span className="text-sm font-medium text-gray-900">8.7%</span>
            </div>
          </div>
        </div>

        {/* Southern Province */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Southern</h3>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
              Fair
            </span>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Population</span>
              <span className="text-sm font-medium text-gray-900">2.8M</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Health Facilities</span>
              <span className="text-sm font-medium text-gray-900">342</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Coverage Rate</span>
              <span className="text-sm font-medium text-yellow-600">78.9%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Urban Population</span>
              <span className="text-sm font-medium text-gray-900">11.2%</span>
            </div>
          </div>
        </div>

        {/* Western Province */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Western</h3>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              Good
            </span>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Population</span>
              <span className="text-sm font-medium text-gray-900">2.2M</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Health Facilities</span>
              <span className="text-sm font-medium text-gray-900">318</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Coverage Rate</span>
              <span className="text-sm font-medium text-blue-600">82.1%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Urban Population</span>
              <span className="text-sm font-medium text-gray-900">14.6%</span>
            </div>
          </div>
        </div>

        {/* National Summary */}
        <div className="bg-gradient-to-br from-blue-600 to-cyan-600 rounded-lg p-6 text-white">
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
              <span className="text-blue-100">Urban Population</span>
              <span className="font-medium">17.4%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Provincial Health Trends */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Provincial Health Trends
        </h3>
        <div className="h-64 bg-gradient-to-br from-emerald-50 to-green-100 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <TrendingUp className="h-12 w-12 text-green-600 mx-auto mb-2" />
            <p className="text-green-700 font-medium">Health Trends Chart</p>
            <p className="text-sm text-green-600">
              Provincial health improvements over time
            </p>
          </div>
        </div>
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
          <div className="flex items-start space-x-4 p-4 bg-green-50 rounded-lg">
            <Calendar className="h-5 w-5 text-green-600 mt-0.5" />
            <div>
              <p className="font-medium text-gray-900">Kigali</p>
              <p className="text-sm text-gray-600">
                Vaccination campaign reached 98% coverage
              </p>
              <p className="text-xs text-green-600">1 week ago</p>
            </div>
          </div>
          <div className="flex items-start space-x-4 p-4 bg-yellow-50 rounded-lg">
            <Calendar className="h-5 w-5 text-yellow-600 mt-0.5" />
            <div>
              <p className="font-medium text-gray-900">Southern Province</p>
              <p className="text-sm text-gray-600">
                Mobile clinic program expansion in rural areas
              </p>
              <p className="text-xs text-yellow-600">2 weeks ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
