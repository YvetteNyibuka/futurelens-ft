import { Users, TrendingUp, BarChart3, PieChart } from "lucide-react";

export default function DashboardDemographicsPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Demographics Analysis
        </h1>
        <p className="text-gray-600">
          Population demographics and health indicators by age, gender, and
          location
        </p>
      </div>

      {/* Demographics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Total Population
              </p>
              <p className="text-2xl font-bold text-gray-900">12.6M</p>
              <p className="text-sm text-green-600">2020 estimate</p>
            </div>
            <Users className="h-8 w-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Urban Population
              </p>
              <p className="text-2xl font-bold text-gray-900">17.4%</p>
              <p className="text-sm text-blue-600">Growing urbanization</p>
            </div>
            <TrendingUp className="h-8 w-8 text-green-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Youth (15-24)</p>
              <p className="text-2xl font-bold text-gray-900">20.3%</p>
              <p className="text-sm text-purple-600">Youth demographic</p>
            </div>
            <BarChart3 className="h-8 w-8 text-purple-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Gender Ratio</p>
              <p className="text-2xl font-bold text-gray-900">52:48</p>
              <p className="text-sm text-orange-600">Female:Male</p>
            </div>
            <PieChart className="h-8 w-8 text-orange-600" />
          </div>
        </div>
      </div>

      {/* Demographics Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Age Distribution
          </h3>
          <div className="h-64 bg-gradient-to-br from-purple-50 to-indigo-100 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <BarChart3 className="h-12 w-12 text-purple-600 mx-auto mb-2" />
              <p className="text-purple-700 font-medium">
                Age Distribution Chart
              </p>
              <p className="text-sm text-purple-600">
                Population by age groups
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Geographic Distribution
          </h3>
          <div className="h-64 bg-gradient-to-br from-green-50 to-emerald-100 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <PieChart className="h-12 w-12 text-green-600 mx-auto mb-2" />
              <p className="text-green-700 font-medium">Geographic Chart</p>
              <p className="text-sm text-green-600">Provincial distribution</p>
            </div>
          </div>
        </div>
      </div>

      {/* Provincial Demographics */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Provincial Demographics
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-900">
                  Province
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">
                  Population
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">
                  Urban %
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">
                  Youth %
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">
                  Health Score
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="py-3 px-4 text-gray-900">Kigali</td>
                <td className="py-3 px-4 text-gray-600">1.1M</td>
                <td className="py-3 px-4 text-gray-600">75.2%</td>
                <td className="py-3 px-4 text-gray-600">22.1%</td>
                <td className="py-3 px-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Excellent
                  </span>
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 text-gray-900">Eastern</td>
                <td className="py-3 px-4 text-gray-600">2.6M</td>
                <td className="py-3 px-4 text-gray-600">12.3%</td>
                <td className="py-3 px-4 text-gray-600">19.8%</td>
                <td className="py-3 px-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    Good
                  </span>
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 text-gray-900">Northern</td>
                <td className="py-3 px-4 text-gray-600">1.9M</td>
                <td className="py-3 px-4 text-gray-600">8.7%</td>
                <td className="py-3 px-4 text-gray-600">18.9%</td>
                <td className="py-3 px-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    Good
                  </span>
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 text-gray-900">Southern</td>
                <td className="py-3 px-4 text-gray-600">2.8M</td>
                <td className="py-3 px-4 text-gray-600">11.2%</td>
                <td className="py-3 px-4 text-gray-600">21.2%</td>
                <td className="py-3 px-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                    Fair
                  </span>
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 text-gray-900">Western</td>
                <td className="py-3 px-4 text-gray-600">2.2M</td>
                <td className="py-3 px-4 text-gray-600">14.6%</td>
                <td className="py-3 px-4 text-gray-600">20.5%</td>
                <td className="py-3 px-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    Good
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
