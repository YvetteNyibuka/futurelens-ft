"use client";

import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieLabelRenderProps,
  Legend,
} from "recharts";

// Child Mortality Trends (1992-2020)
const childMortalityData = [
  { year: "1992", rate: 151, target: 150 },
  { year: "1995", rate: 140, target: 135 },
  { year: "2000", rate: 120, target: 115 },
  { year: "2005", rate: 85, target: 80 },
  { year: "2010", rate: 55, target: 50 },
  { year: "2015", rate: 42, target: 40 },
  { year: "2020", rate: 32.1, target: 30 },
];

// Vaccination Coverage Trends
const vaccinationData = [
  { year: "1992", dpt3: 45, measles: 42, bcg: 65 },
  { year: "1995", dpt3: 52, measles: 48, bcg: 72 },
  { year: "2000", dpt3: 68, measles: 65, bcg: 78 },
  { year: "2005", dpt3: 78, measles: 75, bcg: 85 },
  { year: "2010", dpt3: 88, measles: 85, bcg: 92 },
  { year: "2015", dpt3: 94, measles: 92, bcg: 96 },
  { year: "2020", dpt3: 97, measles: 95, bcg: 98 },
];

// Provincial Health Scores
const provincialData = [
  { province: "Kigali", score: 94.2, population: 1.1, facilities: 247 },
  { province: "Eastern", score: 87.8, population: 2.6, facilities: 398 },
  { province: "Northern", score: 85.4, population: 1.9, facilities: 289 },
  { province: "Western", score: 82.1, population: 2.2, facilities: 318 },
  { province: "Southern", score: 78.9, population: 2.8, facilities: 342 },
];

// Health Indicators Distribution
const healthIndicatorsData = [
  { name: "Child Health", value: 35, color: "#2159A9" },
  { name: "Maternal Health", value: 25, color: "#33ABEE" },
  { name: "Infectious Diseases", value: 20, color: "#10B981" },
  { name: "Nutrition", value: 12, color: "#F59E0B" },
  { name: "Mental Health", value: 8, color: "#EF4444" },
];

// Enhanced custom tooltip components
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 border border-gray-200 rounded-xl shadow-lg backdrop-blur-sm">
        <p className="font-semibold text-gray-900 mb-2 text-sm border-b border-gray-100 pb-2">
          Year: {label}
        </p>
        <div className="space-y-1">
          {payload.map((entry: any, index: number) => (
            <div
              key={index}
              className="flex items-center justify-between space-x-3"
            >
              <div className="flex items-center space-x-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: entry.color }}
                ></div>
                <span className="text-sm text-gray-700 font-medium">
                  {entry.name || entry.dataKey}
                </span>
              </div>
              <span
                className="text-sm font-bold"
                style={{ color: entry.color }}
              >
                {entry.value}
                {entry.dataKey.includes("rate") ? " per 1,000" : "%"}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

export function ChildMortalityChart() {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-900">
          Child Mortality Rate Trends
        </h3>
        <div className="text-sm text-gray-500 bg-blue-50 px-3 py-1 rounded-full">
          1992-2020 Progress
        </div>
      </div>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={childMortalityData}
          margin={{ top: 20, right: 30, left: 40, bottom: 60 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" opacity={0.8} />
          <XAxis
            dataKey="year"
            tick={{ fontSize: 12, fill: "#64748b" }}
            axisLine={{ stroke: "#cbd5e1", strokeWidth: 1 }}
            tickLine={{ stroke: "#cbd5e1" }}
            label={{
              value: "Year",
              position: "insideBottom",
              offset: -10,
              style: {
                textAnchor: "middle",
                fill: "#475569",
                fontSize: "14px",
                fontWeight: "500",
              },
            }}
          />
          <YAxis
            tick={{ fontSize: 12, fill: "#64748b" }}
            axisLine={{ stroke: "#cbd5e1", strokeWidth: 1 }}
            tickLine={{ stroke: "#cbd5e1" }}
            label={{
              value: "Deaths per 1,000 live births",
              angle: -90,
              position: "insideLeft",
              style: {
                textAnchor: "middle",
                fill: "#475569",
                fontSize: "14px",
                fontWeight: "500",
              },
            }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Line
            type="monotone"
            dataKey="rate"
            stroke="#2159A9"
            strokeWidth={4}
            dot={{ fill: "#2159A9", strokeWidth: 2, r: 6, stroke: "#fff" }}
            activeDot={{
              r: 8,
              fill: "#2159A9",
              stroke: "#fff",
              strokeWidth: 3,
            }}
            name="Actual Rate"
          />
          <Line
            type="monotone"
            dataKey="target"
            stroke="#10b981"
            strokeWidth={3}
            strokeDasharray="8 4"
            dot={{ fill: "#10b981", strokeWidth: 2, r: 4, stroke: "#fff" }}
            activeDot={{
              r: 6,
              fill: "#10b981",
              stroke: "#fff",
              strokeWidth: 2,
            }}
            name="Target Rate"
          />
        </LineChart>
      </ResponsiveContainer>
      <div className="mt-6 flex justify-between items-center">
        <div className="flex space-x-6">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-1 bg-blue-600 rounded"></div>
            <span className="text-sm text-gray-700 font-medium">
              Actual Mortality Rate
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-1 bg-green-500 rounded border-2 border-dashed border-green-500 bg-transparent"></div>
            <span className="text-sm text-gray-700 font-medium">
              Target Rate
            </span>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-green-600">78.8%</div>
          <div className="text-xs text-gray-500">Total Reduction</div>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
        <div className="text-center">
          <div className="text-sm text-gray-600">Starting Rate (1992)</div>
          <div className="text-lg font-bold text-red-600">151 per 1,000</div>
        </div>
        <div className="text-center">
          <div className="text-sm text-gray-600">Current Rate (2020)</div>
          <div className="text-lg font-bold text-green-600">32 per 1,000</div>
        </div>
        <div className="text-center">
          <div className="text-sm text-gray-600">Lives Saved</div>
          <div className="text-lg font-bold text-blue-600">~45,000</div>
        </div>
      </div>
    </div>
  );
}

export function VaccinationCoverageChart() {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-900">
          Vaccination Coverage Progress
        </h3>
        <div className="text-sm text-gray-500 bg-green-50 px-3 py-1 rounded-full">
          Universal Coverage Achieved
        </div>
      </div>
      <ResponsiveContainer width="100%" height={400}>
        <AreaChart
          data={vaccinationData}
          margin={{ top: 20, right: 30, left: 40, bottom: 60 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" opacity={0.8} />
          <XAxis
            dataKey="year"
            tick={{ fontSize: 12, fill: "#64748b" }}
            axisLine={{ stroke: "#cbd5e1", strokeWidth: 1 }}
            tickLine={{ stroke: "#cbd5e1" }}
            label={{
              value: "Year",
              position: "insideBottom",
              offset: -10,
              style: {
                textAnchor: "middle",
                fill: "#475569",
                fontSize: "14px",
                fontWeight: "500",
              },
            }}
          />
          <YAxis
            domain={[0, 100]}
            tick={{ fontSize: 12, fill: "#64748b" }}
            axisLine={{ stroke: "#cbd5e1", strokeWidth: 1 }}
            tickLine={{ stroke: "#cbd5e1" }}
            label={{
              value: "Coverage Percentage (%)",
              angle: -90,
              position: "insideLeft",
              style: {
                textAnchor: "middle",
                fill: "#475569",
                fontSize: "14px",
                fontWeight: "500",
              },
            }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "white",
              border: "1px solid #e2e8f0",
              borderRadius: "8px",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
            }}
            formatter={(value: any, name: string) => [
              `${value}%`,
              name === "dpt3"
                ? "DPT3 Vaccine"
                : name === "measles"
                ? "Measles Vaccine"
                : "BCG Vaccine",
            ]}
          />
          <Area
            type="monotone"
            dataKey="bcg"
            stackId="1"
            stroke="#0c2461"
            fill="#0c2461"
            fillOpacity={0.8}
            name="BCG"
          />
          <Area
            type="monotone"
            dataKey="dpt3"
            stackId="1"
            stroke="#2159A9"
            fill="#2159A9"
            fillOpacity={0.8}
            name="DPT3"
          />
          <Area
            type="monotone"
            dataKey="measles"
            stackId="1"
            stroke="#10b981"
            fill="#10b981"
            fillOpacity={0.8}
            name="Measles"
          />
        </AreaChart>
      </ResponsiveContainer>
      <div className="mt-4 flex justify-center space-x-6 text-sm mb-4">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-3 bg-nsir-primary opacity-70"></div>
          <span className="text-gray-700">DPT3</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-3 bg-nsir-secondary opacity-70"></div>
          <span className="text-gray-700">Measles</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-3 bg-blue-950 opacity-70"></div>
          <span className="text-gray-700">BCG</span>
        </div>
      </div>
      <div className="text-sm text-gray-600">
        <p>💉 Universal vaccine coverage achieved by 2020</p>
        <p>🏆 Leading African country in immunization</p>
      </div>
    </div>
  );
}

export function ProvincialHealthChart() {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-900">
          Provincial Health Performance
        </h3>
        <div className="text-sm text-gray-500 bg-orange-50 px-3 py-1 rounded-full">
          Health System Quality Index
        </div>
      </div>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={provincialData}
          margin={{ top: 20, right: 30, left: 40, bottom: 80 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" opacity={0.8} />
          <XAxis
            dataKey="province"
            tick={{ fontSize: 12, fill: "#64748b" }}
            axisLine={{ stroke: "#cbd5e1", strokeWidth: 1 }}
            tickLine={{ stroke: "#cbd5e1" }}
            angle={-45}
            textAnchor="end"
            height={60}
            label={{
              value: "Province",
              position: "insideBottom",
              offset: -5,
              style: {
                textAnchor: "middle",
                fill: "#475569",
                fontSize: "14px",
                fontWeight: "500",
              },
            }}
          />
          <YAxis
            domain={[0, 100]}
            tick={{ fontSize: 12, fill: "#64748b" }}
            axisLine={{ stroke: "#cbd5e1", strokeWidth: 1 }}
            tickLine={{ stroke: "#cbd5e1" }}
            label={{
              value: "Health Performance Score (%)",
              angle: -90,
              position: "insideLeft",
              style: {
                textAnchor: "middle",
                fill: "#475569",
                fontSize: "14px",
                fontWeight: "500",
              },
            }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "white",
              border: "1px solid #e2e8f0",
              borderRadius: "8px",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
            }}
            formatter={(value: any) => [`${value}%`, "Health Score"]}
          />
          <Bar
            dataKey="score"
            fill="#2159A9"
            name="Health Score (%)"
            radius={[4, 4, 0, 0]}
            stroke="#1e40af"
            strokeWidth={1}
          />
        </BarChart>
      </ResponsiveContainer>
      <div className="mt-4 grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
        {provincialData.map((province) => (
          <div key={province.province} className="text-center">
            <div className="font-medium text-gray-900">{province.province}</div>
            <div className="text-gray-600">{province.population}M people</div>
            <div className="text-gray-600">
              {province.facilities} facilities
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function HealthIndicatorsPieChart() {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-900">
          Health Focus Areas Distribution
        </h3>
        <div className="text-sm text-gray-500 bg-purple-50 px-3 py-1 rounded-full">
          Resource Allocation
        </div>
      </div>
      <ResponsiveContainer width="100%" height={400}>
        <PieChart margin={{ top: 20, right: 30, bottom: 20, left: 30 }}>
          <Pie
            data={healthIndicatorsData}
            cx="50%"
            cy="50%"
            outerRadius={120}
            innerRadius={40}
            fill="#8884d8"
            dataKey="value"
            strokeWidth={2}
            stroke="#ffffff"
            label={(props: PieLabelRenderProps) => {
              const name = props.name as string;
              const percent =
                typeof props.percent === "number" ? props.percent : 0;
              return name ? `${(percent * 100).toFixed(1)}%` : "";
            }}
          >
            {healthIndicatorsData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.color}
                stroke="#ffffff"
                strokeWidth={2}
              />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: "white",
              border: "1px solid #e2e8f0",
              borderRadius: "12px",
              boxShadow: "0 8px 25px -5px rgba(0, 0, 0, 0.1)",
              padding: "12px",
            }}
            formatter={(value: any, name: string) => [`${value}%`, name]}
          />
          <Legend
            verticalAlign="bottom"
            height={36}
            wrapperStyle={{
              paddingTop: "20px",
              fontSize: "14px",
            }}
          />
        </PieChart>
      </ResponsiveContainer>
      <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-3">
        {healthIndicatorsData.map((indicator) => (
          <div
            key={indicator.name}
            className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"
          >
            <div
              className="w-4 h-4 rounded-full border-2 border-white shadow-sm"
              style={{ backgroundColor: indicator.color }}
            ></div>
            <div>
              <span className="text-sm font-medium text-gray-700">
                {indicator.name}
              </span>
              <div className="text-xs text-gray-500">
                {indicator.value}% allocation
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Real-time health indicators dashboard
export function RealTimeHealthDashboard() {
  const currentYear = new Date().getFullYear();
  const liveData = [
    {
      indicator: "Child Mortality",
      current: 32.1,
      target: 25,
      trend: "↓",
      change: "-2.1%",
    },
    {
      indicator: "Vaccination Coverage",
      current: 95.2,
      target: 95,
      trend: "↑",
      change: "+1.3%",
    },
    {
      indicator: "Maternal Mortality",
      current: 248,
      target: 200,
      trend: "↓",
      change: "-5.8%",
    },
    {
      indicator: "Life Expectancy",
      current: 69.1,
      target: 70,
      trend: "↑",
      change: "+0.8%",
    },
  ];

  return (
    <div className="bg-linear-to-r from-nsir-primary to-nsir-secondary p-6 rounded-lg text-white">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">
          Live Health Indicators {currentYear}
        </h3>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-sm">Live Data</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {liveData.map((item) => (
          <div
            key={item.indicator}
            className="bg-white/10 backdrop-blur rounded-lg p-4"
          >
            <div className="text-sm opacity-90">{item.indicator}</div>
            <div className="text-2xl font-bold">{item.current}</div>
            <div className="flex items-center justify-between text-sm">
              <span>Target: {item.target}</span>
              <span
                className={`flex items-center ${
                  item.trend === "↑" ? "text-green-200" : "text-orange-200"
                }`}
              >
                {item.trend} {item.change}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
