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

// Custom tooltip components
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-gray-300 rounded-lg shadow-lg">
        <p className="font-medium text-gray-900">{`Year: ${label}`}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} style={{ color: entry.color }}>
            {`${entry.dataKey}: ${entry.value}${
              entry.dataKey.includes("rate") ? " per 1,000" : "%"
            }`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export function ChildMortalityChart() {
  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Child Mortality Rate Trends (1992-2020)
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={childMortalityData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Line
            type="monotone"
            dataKey="rate"
            stroke="#2159A9"
            strokeWidth={3}
            dot={{ fill: "#2159A9", strokeWidth: 2, r: 5 }}
            name="Actual Rate"
          />
          <Line
            type="monotone"
            dataKey="target"
            stroke="#33ABEE"
            strokeWidth={2}
            strokeDasharray="5 5"
            name="Target Rate"
          />
        </LineChart>
      </ResponsiveContainer>
      <div className="mt-4 flex justify-center space-x-6 text-sm">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-0.5 bg-nsir-primary"></div>
          <span className="text-gray-700">Actual Rate</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-0.5 bg-nsir-secondary border-dashed border-t-2 border-nsir-secondary bg-transparent"></div>
          <span className="text-gray-700">Target Rate</span>
        </div>
      </div>
      <div className="mt-4 text-sm text-gray-600">
        <p>📊 70% reduction in child mortality over 28 years</p>
        <p>🎯 Consistently meeting international targets</p>
      </div>
    </div>
  );
}

export function VaccinationCoverageChart() {
  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Vaccination Coverage Trends
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={vaccinationData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="dpt3"
            stackId="1"
            stroke="#2159A9"
            fill="#2159A9"
            fillOpacity={0.7}
            name="DPT3"
          />
          <Area
            type="monotone"
            dataKey="measles"
            stackId="2"
            stroke="#33ABEE"
            fill="#33ABEE"
            fillOpacity={0.7}
            name="Measles"
          />
          <Area
            type="monotone"
            dataKey="bcg"
            stackId="3"
            stroke="#10B981"
            fill="#10B981"
            fillOpacity={0.7}
            name="BCG"
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
          <div className="w-4 h-3 bg-green-500 opacity-70"></div>
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
    <div className="bg-white p-6 rounded-lg border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Provincial Health Performance
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={provincialData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="province" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="score" fill="#2159A9" name="Health Score (%)" />
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
    <div className="bg-white p-6 rounded-lg border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Health Indicators Distribution
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={healthIndicatorsData}
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
            label={(props: PieLabelRenderProps) => {
              const name = props.name as string;
              // Ensure percent is a number with a default of 0
              const percent =
                typeof props.percent === "number" ? props.percent : 0;
              return name ? `${name} ${(percent * 100).toFixed(0)}%` : "";
            }}
          >
            {healthIndicatorsData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
      <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
        {healthIndicatorsData.map((indicator) => (
          <div key={indicator.name} className="flex items-center space-x-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: indicator.color }}
            ></div>
            <span className="text-gray-700">{indicator.name}</span>
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
    <div className="bg-gradient-to-r from-nsir-primary to-nsir-secondary p-6 rounded-lg text-white">
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
