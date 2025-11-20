"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  Home,
  TrendingUp,
  Map,
  Heart,
  Activity,
  TestTube,
  Users,
  FileText,
  Settings,
  HelpCircle,
  Menu,
  X,
  Database,
  PieChart,
  MapPin,
  Book,
  Upload,
} from "lucide-react";

export default function DashboardSidebar({
  children,
}: {
  children?: React.ReactNode;
}) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const mainNavItems = [
    { href: "/dashboard", label: "Dashboard", icon: BarChart3 },
    {
      href: "/dashboard/household-data",
      label: "Household Data",
      icon: Database,
    },
    { href: "/dashboard/analytics", label: "Analytics", icon: PieChart },
    { href: "/dashboard/provinces", label: "Provinces", icon: MapPin },
    { href: "/dashboard/demographics", label: "Demographics", icon: Users },
    { href: "/dashboard/reports", label: "Reports", icon: FileText },
    { href: "/dashboard/upload", label: "Upload Data", icon: Upload },
  ];

  const analyticsSections = [
    { href: "/transformation", label: "Transformation Story", icon: Heart },
    // { href: "/trends", label: "Health Trends", icon: TrendingUp },
    { href: "/provinces", label: "Provincial Analysis", icon: Map },
    { href: "/test-api", label: "API Testing", icon: TestTube },
  ];

  const utilityItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/dashboard/documentation", label: "Documentation", icon: Book },
    { href: "/dashboard/settings", label: "Settings", icon: Settings },
    { href: "/dashboard/help", label: "Help", icon: HelpCircle },
  ];

  return (
    <div className="flex h-screen bg-linear-to-br from-gray-50 to-gray-100">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed lg:static inset-y-0 left-0 z-50 h-full w-72 bg-white shadow-2xl border-r border-gray-200 overflow-y-auto transform transition-all duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-gray-200 bg-linear-to-r from-blue-600 to-green-600">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3">
              <div className="h-10 w-10 bg-white rounded-xl flex items-center justify-center shadow-md">
                <Activity className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <span className="text-xl font-bold text-white">
                  NSIR FutureLens
                </span>
                <p className="text-sm text-blue-100">
                  Health Analytics Platform
                </p>
              </div>
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-2 rounded-lg hover:bg-white/20 transition-colors"
            >
              <X className="h-5 w-5 text-white" />
            </button>
          </div>
        </div>

        {/* Navigation Sections */}
        <div className="p-6 space-y-8">
          {/* Main Navigation */}
          <div>
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4 flex items-center">
              <BarChart3 className="h-3 w-3 mr-2" />
              Dashboard
            </h3>
            <nav className="space-y-2">
              {mainNavItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={`group flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? "bg-linear-to-r from-blue-500 to-blue-600 text-white shadow-lg transform scale-105"
                        : "text-gray-600 hover:text-blue-600 hover:bg-blue-50 hover:shadow-md hover:transform hover:scale-105"
                    }`}
                  >
                    <Icon
                      className={`h-5 w-5 transition-transform ${
                        isActive ? "text-white" : "group-hover:scale-110"
                      }`}
                    />
                    <span className="font-semibold">{item.label}</span>
                    {isActive && (
                      <div className="ml-auto h-2 w-2 bg-white rounded-full"></div>
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Analytics Section */}
          <div>
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4 flex items-center">
              <PieChart className="h-3 w-3 mr-2" />
              Analytics
            </h3>
            <nav className="space-y-2">
              {analyticsSections.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={`group flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? "bg-linear-to-r from-green-500 to-green-600 text-white shadow-lg transform scale-105"
                        : "text-gray-600 hover:text-green-600 hover:bg-green-50 hover:shadow-md hover:transform hover:scale-105"
                    }`}
                  >
                    <Icon
                      className={`h-5 w-5 transition-transform ${
                        isActive ? "text-white" : "group-hover:scale-110"
                      }`}
                    />
                    <span className="font-semibold">{item.label}</span>
                    {isActive && (
                      <div className="ml-auto h-2 w-2 bg-white rounded-full"></div>
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Utilities */}
          <div>
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4 flex items-center">
              <Settings className="h-3 w-3 mr-2" />
              Utilities
            </h3>
            <nav className="space-y-2">
              {utilityItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={`group flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? "bg-linear-to-r from-gray-500 to-gray-600 text-white shadow-lg transform scale-105"
                        : "text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:shadow-md hover:transform hover:scale-105"
                    }`}
                  >
                    <Icon
                      className={`h-5 w-5 transition-transform ${
                        isActive ? "text-white" : "group-hover:scale-110"
                      }`}
                    />
                    <span className="font-semibold">{item.label}</span>
                    {isActive && (
                      <div className="ml-auto h-2 w-2 bg-white rounded-full"></div>
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>

        {/* User Info */}
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-200 bg-linear-to-r from-white to-gray-50">
          <div className="flex items-center space-x-3 p-3 rounded-xl bg-white shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-200">
            <div className="h-10 w-10 bg-linear-to-r from-blue-600 to-green-600 rounded-full flex items-center justify-center shadow-md">
              <span className="text-white text-sm font-bold">NS</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-gray-900 truncate">
                NSIR Analytics
              </p>
              <p className="text-xs text-gray-500 truncate">
                Administrator Portal
              </p>
            </div>
            <div className="h-3 w-3 bg-green-400 rounded-full border-2 border-white shadow-sm"></div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1">
        <div className="h-screen overflow-y-auto bg-linear-to-br from-gray-50 to-gray-100">
          {/* Mobile Menu Button */}
          <div className="lg:hidden fixed top-4 left-4 z-30">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-3 rounded-xl bg-white shadow-lg border border-gray-200 hover:shadow-xl hover:bg-blue-50 transition-all duration-200"
            >
              <Menu className="h-5 w-5 text-gray-700" />
            </button>
          </div>

          {/* Content */}
          <div className="pt-16 lg:pt-0">{children}</div>
        </div>
      </div>
    </div>
  );
}
