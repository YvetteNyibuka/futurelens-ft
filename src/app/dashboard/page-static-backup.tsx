// import Link from "next/link";
// import { BarChart3, TrendingUp, MapPin, Users } from "lucide-react";

import Link from "next/link";
import {
  BarChart3,
  TrendingUp,
  MapPin,
  Users,
  Activity,
  Heart,
  AlertTriangle,
  CheckCircle,
  Clock,
} from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="p-6 space-y-6 min-h-screen w-full">
      {/* Dashboard Overview */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              Health Analytics Overview
            </h2>
            <p className="text-gray-600">
              Key health indicators and trends (1992-2020)
            </p>
          </div>
          <div className="text-sm text-gray-500">
            Last updated: {new Date().toLocaleDateString()}
          </div>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            title="Years of Data"
            value="28"
            subtitle="1992-2020"
            icon={<BarChart3 className="h-6 w-6" />}
            trend="+100%"
            trendUp={true}
            color="nsir-primary"
          />
          <MetricCard
            title="Child Mortality Reduction"
            value="70%"
            subtitle="Remarkable improvement"
            icon={<Heart className="h-6 w-6" />}
            trend="-70%"
            trendUp={true}
            color="green"
          />
          <MetricCard
            title="Vaccination Coverage"
            value="95%"
            subtitle="National average"
            icon={<Activity className="h-6 w-6" />}
            trend="+95%"
            trendUp={true}
            color="nsir-secondary"
          />
          <MetricCard
            title="Provinces Analyzed"
            value="5"
            subtitle="Complete coverage"
            icon={<MapPin className="h-6 w-6" />}
            trend="100%"
            trendUp={true}
            color="purple"
          />
        </div>
      </div>

      {/* Charts and Analytics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart Placeholder */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Health Trends Over Time
          </h3>
          <div className="h-64 bg-gradient-to-br from-nsir-primary-50 to-nsir-secondary-50 rounded-lg flex items-center justify-center border-2 border-dashed border-nsir-primary-300">
            <div className="text-center">
              <TrendingUp className="h-12 w-12 text-nsir-primary mx-auto mb-2" />
              <p className="text-nsir-primary-700 font-medium">
                Interactive Chart
              </p>
              <p className="text-sm text-nsir-primary-700">
                Health indicators visualization
              </p>
            </div>
          </div>
        </div>

        {/* Provincial Comparison */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Provincial Performance
          </h3>
          <div className="h-64 bg-gradient-to-br from-nsir-secondary-50 to-nsir-primary-50 rounded-lg flex items-center justify-center border-2 border-dashed border-nsir-secondary-300">
            <div className="text-center">
              <MapPin className="h-12 w-12 text-nsir-secondary mx-auto mb-2" />
              <p className="text-nsir-secondary-700 font-medium">
                Province Comparison
              </p>
              <p className="text-sm text-nsir-secondary-700">
                Geographic health analysis
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activities and Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activities */}
        <div className="lg:col-span-2 bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Recent Analysis
          </h3>
          <div className="space-y-4">
            <ActivityItem
              title="Child Mortality Analysis Updated"
              description="Latest data analysis showing 70% reduction in child mortality rates"
              time="2 hours ago"
              icon={<Heart className="h-5 w-5 text-green-600" />}
              status="completed"
            />
            <ActivityItem
              title="Vaccination Coverage Report"
              description="Provincial vaccination coverage analysis completed"
              time="4 hours ago"
              icon={<Activity className="h-5 w-5 text-nsir-primary" />}
              status="completed"
            />
            <ActivityItem
              title="Data Validation in Progress"
              description="Validating 2020 health indicators data"
              time="6 hours ago"
              icon={<CheckCircle className="h-5 w-5 text-nsir-secondary" />}
              status="in-progress"
            />
          </div>
        </div>

        {/* Alerts and Notifications */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Alerts</h3>
          <div className="space-y-4">
            <AlertItem
              title="Data Update Available"
              description="New DHS data ready for analysis"
              type="info"
            />
            <AlertItem
              title="Review Required"
              description="Provincial comparison needs review"
              type="warning"
            />
            <AlertItem
              title="Analysis Complete"
              description="Trends analysis finished successfully"
              type="success"
            />
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Quick Actions
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <ActionButton
            href="/dashboard/analytics"
            icon={<BarChart3 className="h-6 w-6" />}
            label="View Analytics"
            description="Detailed analysis"
          />
          <ActionButton
            href="/dashboard/trends"
            icon={<TrendingUp className="h-6 w-6" />}
            label="Trend Analysis"
            description="Historical trends"
          />
          <ActionButton
            href="/dashboard/provinces"
            icon={<MapPin className="h-6 w-6" />}
            label="Provincial Data"
            description="Geographic insights"
          />
          <ActionButton
            href="/dashboard/reports"
            icon={<Users className="h-6 w-6" />}
            label="Generate Reports"
            description="Export data"
          />
        </div>
      </div>
    </div>
  );
}
<div className="mb-8">
  <h1 className="text-3xl font-bold text-gray-900 mb-2">
    Rwanda Health Analytics Dashboard
  </h1>
  <p className="text-gray-600">
    Comprehensive health data visualization spanning 28 years (1992-2020)
  </p>
</div>;

{
  /* Stats Grid */
}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
  <StatCard
    title="Years of Data"
    value="28"
    subtitle="1992-2020"
    icon={<BarChart3 className="h-6 w-6 text-blue-600" />}
    color="blue"
  />
  <StatCard
    title="Child Mortality Reduction"
    value="70%+"
    subtitle="Remarkable improvement"
    icon={<TrendingUp className="h-6 w-6 text-green-600" />}
    color="green"
  />
  <StatCard
    title="Vaccination Coverage"
    value="95%+"
    subtitle="National average"
    icon={<Users className="h-6 w-6 text-purple-600" />}
    color="purple"
  />
  <StatCard
    title="Provinces Analyzed"
    value="5"
    subtitle="Complete coverage"
    icon={<MapPin className="h-6 w-6 text-yellow-600" />}
    color="yellow"
  />
</div>;

{
  /* Dashboard Sections */
}
<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
  {/* Placeholder for Charts */}
  <DashboardSection
    title="Health Trends Overview"
    description="Key health indicators showing Rwanda's transformation journey"
  >
    <div className="h-64 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg flex items-center justify-center">
      <div className="text-center">
        <BarChart3 className="h-12 w-12 text-blue-400 mx-auto mb-4" />
        <p className="text-blue-600 font-medium">Chart Component</p>
        <p className="text-blue-500 text-sm">Coming Soon</p>
      </div>
    </div>
  </DashboardSection>

  <DashboardSection
    title="Provincial Comparison"
    description="Health scores and metrics across all five provinces"
  >
    <div className="h-64 bg-gradient-to-br from-green-50 to-green-100 rounded-lg flex items-center justify-center">
      <div className="text-center">
        <MapPin className="h-12 w-12 text-green-400 mx-auto mb-4" />
        <p className="text-green-600 font-medium">Map Component</p>
        <p className="text-green-500 text-sm">Coming Soon</p>
      </div>
    </div>
  </DashboardSection>

  <DashboardSection
    title="Early Warning Alerts"
    description="Real-time health monitoring and trend analysis"
  >
    <div className="space-y-3">
      <AlertItem
        type="info"
        message="System monitoring 50+ health indicators"
      />
      <AlertItem
        type="success"
        message="Vaccination coverage targets met nationally"
      />
      <AlertItem
        type="warning"
        message="Maternal mortality tracking in progress"
      />
    </div>
  </DashboardSection>

  <DashboardSection
    title="Quick Actions"
    description="Common dashboard operations and data management"
  >
    <div className="space-y-3">
      <Link
        href="/test-api"
        className="block p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
      >
        <div className="flex items-center space-x-3">
          <BarChart3 className="h-5 w-5 text-blue-600" />
          <div>
            <p className="font-medium text-blue-900">Test API Connection</p>
            <p className="text-blue-600 text-sm">Verify backend connectivity</p>
          </div>
        </div>
      </Link>
      <Link
        href="/transformation"
        className="block p-3 bg-green-50 hover:bg-green-100 rounded-lg transition-colors"
      >
        <div className="flex items-center space-x-3">
          <TrendingUp className="h-5 w-5 text-green-600" />
          <div>
            <p className="font-medium text-green-900">Transformation Story</p>
            <p className="text-green-600 text-sm">
              View 28-year health journey
            </p>
          </div>
        </div>
      </Link>
    </div>
  </DashboardSection>
</div>;

// Component for metric cards
function MetricCard({
  title,
  value,
  subtitle,
  icon,
  trend,
  trendUp,
  color,
}: {
  title: string;
  value: string;
  subtitle: string;
  icon: React.ReactNode;
  trend: string;
  trendUp: boolean;
  color: string;
}) {
  const colorClasses = {
    "nsir-primary": "text-nsir-primary bg-nsir-primary-100",
    "nsir-secondary": "text-nsir-secondary bg-nsir-secondary-100",
    blue: "text-nsir-primary bg-nsir-primary-100",
    green: "text-green-600 bg-green-100",
    purple: "text-purple-600 bg-purple-100",
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <div
          className={`p-2 rounded-lg ${
            colorClasses[color as keyof typeof colorClasses]
          }`}
        >
          {icon}
        </div>
        <span
          className={`text-sm font-medium ${
            trendUp ? "text-green-600" : "text-red-600"
          }`}
        >
          {trend}
        </span>
      </div>
      <div>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className="text-xs text-gray-500">{subtitle}</p>
      </div>
    </div>
  );
}

// Component for activity items
function ActivityItem({
  title,
  description,
  time,
  icon,
  status,
}: {
  title: string;
  description: string;
  time: string;
  icon: React.ReactNode;
  status: "completed" | "in-progress" | "pending";
}) {
  return (
    <div className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
      <div className="flex-shrink-0 mt-1">{icon}</div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900">{title}</p>
        <p className="text-sm text-gray-600">{description}</p>
        <div className="flex items-center mt-1 space-x-2">
          <Clock className="h-3 w-3 text-gray-400" />
          <span className="text-xs text-gray-500">{time}</span>
          <span
            className={`text-xs px-2 py-1 rounded-full ${
              status === "completed"
                ? "bg-green-100 text-green-800"
                : status === "in-progress"
                ? "bg-blue-100 text-blue-800"
                : "bg-gray-100 text-gray-800"
            }`}
          >
            {status}
          </span>
        </div>
      </div>
    </div>
  );
}

// Component for action buttons
function ActionButton({
  href,
  icon,
  label,
  description,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  description: string;
}) {
  return (
    <Link
      href={href}
      className="flex flex-col items-center p-4 rounded-lg border border-gray-200 hover:border-nsir-primary-300 hover:bg-nsir-primary-50 transition-all group"
    >
      <div className="text-nsir-primary group-hover:text-nsir-primary-700 mb-2">
        {icon}
      </div>
      <p className="text-sm font-medium text-gray-900 text-center">{label}</p>
      <p className="text-xs text-gray-600 text-center">{description}</p>
    </Link>
  );
}

function StatCard({
  title,
  value,
  subtitle,
  icon,
  color,
}: {
  title: string;
  value: string;
  subtitle: string;
  icon: React.ReactNode;
  color: "blue" | "green" | "purple" | "yellow";
}) {
  const colorClasses = {
    blue: "bg-blue-50 border-blue-200",
    green: "bg-green-50 border-green-200",
    purple: "bg-purple-50 border-purple-200",
    yellow: "bg-yellow-50 border-yellow-200",
  };

  return (
    <div className={`${colorClasses[color]} rounded-lg border p-6`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-700">{title}</h3>
        {icon}
      </div>
      <div>
        <p className="text-2xl font-bold text-gray-900 mb-1">{value}</p>
        <p className="text-sm text-gray-600">{subtitle}</p>
      </div>
    </div>
  );
}

function DashboardSection({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
      {children}
    </div>
  );
}

function AlertItem({
  title,
  description,
  type,
  message,
}: {
  title?: string;
  description?: string;
  type: "info" | "success" | "warning";
  message?: string;
}) {
  // Handle both new dashboard interface and original interface
  if (title && description) {
    // New dashboard interface
    const typeClasses = {
      info: "text-blue-600 bg-blue-100",
      warning: "text-yellow-600 bg-yellow-100",
      success: "text-green-600 bg-green-100",
    };

    const icons = {
      info: <BarChart3 className="h-4 w-4" />,
      warning: <AlertTriangle className="h-4 w-4" />,
      success: <CheckCircle className="h-4 w-4" />,
    };

    return (
      <div className="flex items-start space-x-3 p-3 rounded-lg border border-gray-200">
        <div className={`p-1 rounded ${typeClasses[type]}`}>{icons[type]}</div>
        <div>
          <p className="text-sm font-medium text-gray-900">{title}</p>
          <p className="text-xs text-gray-600">{description}</p>
        </div>
      </div>
    );
  } else {
    // Original interface
    const typeStyles = {
      info: "bg-blue-50 text-blue-800 border-blue-200",
      success: "bg-green-50 text-green-800 border-green-200",
      warning: "bg-yellow-50 text-yellow-800 border-yellow-200",
    };

    return (
      <div className={`p-3 rounded-lg border ${typeStyles[type]}`}>
        <p className="text-sm font-medium">{message}</p>
      </div>
    );
  }
}
