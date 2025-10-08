import {
  HelpCircle,
  Book,
  MessageCircle,
  Phone,
  Mail,
  Search,
  ExternalLink,
} from "lucide-react";

export default function DashboardHelpPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Help & Support
        </h1>
        <p className="text-gray-600">
          Find answers to your questions and get support for FutureLens
        </p>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search help articles, FAQs, and documentation..."
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Quick Help Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow cursor-pointer">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Book className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900">User Guide</h3>
          </div>
          <p className="text-sm text-gray-600 mb-3">
            Comprehensive guide to using FutureLens dashboard and features
          </p>
          <a
            href="#"
            className="text-blue-600 text-sm font-medium hover:text-blue-700"
          >
            Read Guide →
          </a>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow cursor-pointer">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-green-100 rounded-lg">
              <HelpCircle className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900">FAQs</h3>
          </div>
          <p className="text-sm text-gray-600 mb-3">
            Frequently asked questions about data analysis and reports
          </p>
          <a
            href="#"
            className="text-green-600 text-sm font-medium hover:text-green-700"
          >
            View FAQs →
          </a>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow cursor-pointer">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-purple-100 rounded-lg">
              <MessageCircle className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-900">Live Chat</h3>
          </div>
          <p className="text-sm text-gray-600 mb-3">
            Chat with our support team for immediate assistance
          </p>
          <a
            href="#"
            className="text-purple-600 text-sm font-medium hover:text-purple-700"
          >
            Start Chat →
          </a>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow cursor-pointer">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-orange-100 rounded-lg">
              <ExternalLink className="h-6 w-6 text-orange-600" />
            </div>
            <h3 className="font-semibold text-gray-900">API Docs</h3>
          </div>
          <p className="text-sm text-gray-600 mb-3">
            Technical documentation for developers and integrations
          </p>
          <a
            href="#"
            className="text-orange-600 text-sm font-medium hover:text-orange-700"
          >
            View Docs →
          </a>
        </div>
      </div>

      {/* Popular Help Topics */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Popular Help Topics
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900">Getting Started</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-blue-600 hover:text-blue-700 text-sm"
                >
                  How to navigate the dashboard
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-blue-600 hover:text-blue-700 text-sm"
                >
                  Understanding health indicators
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-blue-600 hover:text-blue-700 text-sm"
                >
                  Setting up your profile
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-blue-600 hover:text-blue-700 text-sm"
                >
                  Customizing notifications
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-medium text-gray-900">Data & Reports</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-blue-600 hover:text-blue-700 text-sm"
                >
                  Downloading reports
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-blue-600 hover:text-blue-700 text-sm"
                >
                  Understanding analytics
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-blue-600 hover:text-blue-700 text-sm"
                >
                  Data visualization tips
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-blue-600 hover:text-blue-700 text-sm"
                >
                  Troubleshooting data issues
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Contact Support
          </h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Phone className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm font-medium text-gray-900">
                  Phone Support
                </p>
                <p className="text-sm text-gray-600">+250 788 123 456</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Mail className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm font-medium text-gray-900">
                  Email Support
                </p>
                <p className="text-sm text-gray-600">support@nsir.gov.rw</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <MessageCircle className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm font-medium text-gray-900">
                  Support Hours
                </p>
                <p className="text-sm text-gray-600">
                  Mon-Fri: 8:00 AM - 6:00 PM CAT
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            System Status
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Dashboard</span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Operational
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Analytics Engine</span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Operational
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Report Generation</span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Operational
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Data Sync</span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                Maintenance
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Video Tutorials */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Video Tutorials
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <div className="h-32 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
              <div className="text-center text-white">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2">
                  <div className="w-0 h-0 border-l-4 border-l-white border-y-2 border-y-transparent ml-1"></div>
                </div>
                <p className="text-sm font-medium">Dashboard Overview</p>
              </div>
            </div>
            <div className="p-4">
              <h4 className="font-medium text-gray-900 mb-1">
                Getting Started with FutureLens
              </h4>
              <p className="text-sm text-gray-600">5:32 minutes</p>
            </div>
          </div>

          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <div className="h-32 bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
              <div className="text-center text-white">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2">
                  <div className="w-0 h-0 border-l-4 border-l-white border-y-2 border-y-transparent ml-1"></div>
                </div>
                <p className="text-sm font-medium">Analytics Deep Dive</p>
              </div>
            </div>
            <div className="p-4">
              <h4 className="font-medium text-gray-900 mb-1">
                Understanding Health Analytics
              </h4>
              <p className="text-sm text-gray-600">8:15 minutes</p>
            </div>
          </div>

          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <div className="h-32 bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center">
              <div className="text-center text-white">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2">
                  <div className="w-0 h-0 border-l-4 border-l-white border-y-2 border-y-transparent ml-1"></div>
                </div>
                <p className="text-sm font-medium">Report Generation</p>
              </div>
            </div>
            <div className="p-4">
              <h4 className="font-medium text-gray-900 mb-1">
                Creating Custom Reports
              </h4>
              <p className="text-sm text-gray-600">6:45 minutes</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
