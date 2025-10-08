import { FileText, Download, Calendar, Eye } from "lucide-react";

export default function DashboardReportsPage() {
  const reports = [
    {
      title: "Health Transformation Report 2020",
      description:
        "Comprehensive analysis of Rwanda's health journey from 1992-2020",
      date: "2020-12-15",
      type: "Annual Report",
      status: "Published",
      size: "2.3 MB",
    },
    {
      title: "Child Mortality Trends Analysis",
      description:
        "Detailed examination of child mortality reduction strategies",
      date: "2020-11-20",
      type: "Special Report",
      status: "Published",
      size: "1.8 MB",
    },
    {
      title: "Vaccination Coverage Study",
      description:
        "Provincial vaccination coverage analysis and recommendations",
      date: "2020-10-10",
      type: "Research Report",
      status: "Published",
      size: "3.1 MB",
    },
    {
      title: "Maternal Health Progress Report",
      description:
        "Analysis of maternal health improvements across all provinces",
      date: "2020-09-25",
      type: "Progress Report",
      status: "Published",
      size: "2.7 MB",
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Health Reports
        </h1>
        <p className="text-gray-600">
          Access and download comprehensive health analysis reports
        </p>
      </div>

      {/* Report Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center">
            <FileText className="h-8 w-8 text-blue-600 mr-3" />
            <div>
              <p className="text-2xl font-bold text-gray-900">24</p>
              <p className="text-sm text-gray-600">Total Reports</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center">
            <Download className="h-8 w-8 text-green-600 mr-3" />
            <div>
              <p className="text-2xl font-bold text-gray-900">1,247</p>
              <p className="text-sm text-gray-600">Downloads</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center">
            <Calendar className="h-8 w-8 text-purple-600 mr-3" />
            <div>
              <p className="text-2xl font-bold text-gray-900">4</p>
              <p className="text-sm text-gray-600">This Year</p>
            </div>
          </div>
        </div>
      </div>

      {/* Reports List */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            Available Reports
          </h3>
        </div>
        <div className="divide-y divide-gray-200">
          {reports.map((report, index) => (
            <div key={index} className="p-6 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h4 className="text-lg font-medium text-gray-900 mb-1">
                    {report.title}
                  </h4>
                  <p className="text-gray-600 mb-2">{report.description}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span>{report.type}</span>
                    <span>•</span>
                    <span>{new Date(report.date).toLocaleDateString()}</span>
                    <span>•</span>
                    <span>{report.size}</span>
                    <span>•</span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {report.status}
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-2 ml-4">
                  <button className="p-2 text-gray-400 hover:text-blue-600 rounded-full hover:bg-blue-50">
                    <Eye className="h-5 w-5" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-green-600 rounded-full hover:bg-green-50">
                    <Download className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
