"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "@iconify/react";
import {
  BarChart3,
  Home,
  TrendingUp,
  Map,
  Heart,
  Activity,
  Users,
  Menu,
  X,
  Database,
  PieChart,
  MapPin,
  Brain,
  Target,
  Award,
  Zap,
  Globe,
  Baby,
  Shield,
} from "lucide-react";

export default function DashboardSidebar({
  children,
}: {
  children?: React.ReactNode;
}) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const mainNavItems = [
    {
      href: "/dashboard",
      label: "Health Overview",
      icon: BarChart3,
      // badge: "978K",
    },
    // {
    //   href: "/dashboard/analytics-rich",
    //   label: "Interactive Analytics",
    //   icon: Activity,
    //   badge: "Live",
    // },
    {
      href: "/dashboard/transformation-story",
      label: "Rwanda's Miracle",
      icon: Award,
      // badge: "28Y",
    },
    {
      href: "/dashboard/real-time-insights",
      label: "AI Insights",
      icon: Brain,
      // badge: "ML",
    },
    {
      href: "/dashboard/policy-impact",
      label: "Policy Impact",
      icon: Target,
      // badge: "Evidence",
    },
  ];

  const analyticsSections = [
    {
      href: "/dashboard/provincial-champion",
      label: "Provincial Champions",
      icon: MapPin,
      // badge: "5 Provinces",
    },
    {
      href: "/dashboard/health-revolution",
      label: "Health Revolution",
      icon: Heart,
      // badge: "79% ↓",
    },
    {
      href: "/dashboard/millennium-progress",
      label: "Millennium Progress",
      icon: TrendingUp,
      // badge: "MDGs",
    },
    {
      href: "/dashboard/future-predictions",
      label: "Future Predictions",
      icon: Zap,
      // badge: "2030",
    },
    {
      href: "/dashboard/global-leadership",
      label: "Global Leadership",
      icon: Globe,
      // badge: "Africa #1",
    },
  ];

  const specialFeatures = [
    {
      href: "/dashboard/health-heroes",
      label: "Health Heroes",
      icon: Baby,
      badge: "Child ↓79%",
    },
    {
      href: "/dashboard/vaccination-success",
      label: "Vaccination Victory",
      icon: Shield,
      badge: "97%",
    },
    { href: "/", label: "Home", icon: Home, badge: null },
  ];

  return (
    <div className="flex h-screen bg-white">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-20 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed lg:static inset-y-0 left-0 z-50 h-full w-64 bg-white border-r border-gray-200 overflow-y-auto transform transition-all duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3">
              <div
                className="h-8 w-8 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: "#2159A9" }}
              >
                <Icon icon="mdi:chart-line" className="h-5 w-5 text-white" />
              </div>
              <div>
                <span
                  className="text-lg font-semibold"
                  style={{ color: "#1f2937" }}
                >
                  FutureLens
                </span>
                <p className="text-xs font-medium" style={{ color: "#6b7280" }}>
                  Health Analytics
                </p>
              </div>
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <X className="h-4 w-4" style={{ color: "#6b7280" }} />
            </button>
          </div>
        </div>

        {/* Navigation Sections */}
        <div className="p-4 space-y-6">
          {/* Main Navigation */}
          <div>
            <h3
              className="text-xs font-medium uppercase tracking-wider mb-3 px-2"
              style={{ color: "#6b7280" }}
            >
              Overview
            </h3>
            <nav className="space-y-1">
              {mainNavItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className="group flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150"
                    style={{
                      backgroundColor: isActive ? "#2159A9" : "transparent",
                      color: isActive ? "#ffffff" : "#1f2937",
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.backgroundColor = "#f0f4ff";
                        e.currentTarget.style.color = "#2159A9";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.backgroundColor = "transparent";
                        e.currentTarget.style.color = "#1f2937";
                      }
                    }}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="flex-1">{item.label}</span>
                    {/* {item.badge && (
                      <span
                        className="px-2 py-0.5 text-xs rounded-md font-medium"
                        style={{
                          backgroundColor: isActive
                            ? "rgba(255,255,255,0.2)"
                            : "#f3f4f6",
                          color: isActive ? "#ffffff" : "#6b7280",
                        }}
                      >
                        {item.badge}
                      </span>
                    )} */}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Analytics Section */}
          <div>
            <h3
              className="text-xs font-medium uppercase tracking-wider mb-3 px-2"
              style={{ color: "#6b7280" }}
            >
              Analytics
            </h3>
            <nav className="space-y-1">
              {analyticsSections.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className="group flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150"
                    style={{
                      backgroundColor: isActive ? "#2159A9" : "transparent",
                      color: isActive ? "#ffffff" : "#1f2937",
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.backgroundColor = "#f0f4ff";
                        e.currentTarget.style.color = "#2159A9";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.backgroundColor = "transparent";
                        e.currentTarget.style.color = "#1f2937";
                      }
                    }}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="flex-1">{item.label}</span>
                    {/* {item.badge && (
                      <span
                        className="px-2 py-0.5 text-xs rounded-md font-medium"
                        style={{
                          backgroundColor: isActive
                            ? "rgba(255,255,255,0.2)"
                            : "#f3f4f6",
                          color: isActive ? "#ffffff" : "#6b7280",
                        }}
                      >
                        {item.badge}
                      </span>
                    )} */}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Special Features */}
          <div>
            <h3
              className="text-xs font-medium uppercase tracking-wider mb-3 px-2"
              style={{ color: "#6b7280" }}
            >
              Features
            </h3>
            <nav className="space-y-1">
              {specialFeatures.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className="group flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150"
                    style={{
                      backgroundColor: isActive ? "#2159A9" : "transparent",
                      color: isActive ? "#ffffff" : "#1f2937",
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.backgroundColor = "#f0f4ff";
                        e.currentTarget.style.color = "#2159A9";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.backgroundColor = "transparent";
                        e.currentTarget.style.color = "#1f2937";
                      }
                    }}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="flex-1">{item.label}</span>
                    {/* {item.badge && (
                      <span
                        className="px-2 py-0.5 text-xs rounded-md font-medium"
                        style={{
                          backgroundColor: isActive
                            ? "rgba(255,255,255,0.2)"
                            : "#f3f4f6",
                          color: isActive ? "#ffffff" : "#6b7280",
                        }}
                      >
                        {item.badge}
                      </span>
                    )} */}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1">
        <div className="h-screen overflow-y-auto">
          {/* Mobile Menu Button */}
          <div className="lg:hidden fixed top-4 left-4 z-30">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-lg bg-white border transition-all duration-200"
              style={{
                borderColor: "#e6e9eb",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#f0f4ff";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#ffffff";
              }}
            >
              <Menu className="h-5 w-5" style={{ color: "#1f2937" }} />
            </button>
          </div>

          {/* Content */}
          <div className="pt-16 lg:pt-0">{children}</div>
        </div>
      </div>
    </div>
  );
}
