#!/usr/bin/env node

/**
 * API Testing Script for Health Analytics Dashboard
 * Test the API endpoints to ensure they're working correctly
 */

const axios = require("axios");

const BASE_URL = "http://localhost:3000";

async function testAPI() {
  console.log("🧪 Testing Health Analytics API Endpoints\n");

  try {
    // Test dashboard data
    console.log("📊 Testing Dashboard Data...");
    const dashboardResponse = await axios.get(
      `${BASE_URL}/api/analytics/dashboard`
    );
    console.log("✅ Dashboard API working");
    console.log(
      `   Records: ${dashboardResponse.data.data.summary.totalRecords}`
    );
    console.log(
      `   Categories: ${dashboardResponse.data.data.summary.categories}`
    );
    console.log(
      `   Provinces: ${dashboardResponse.data.data.summary.provinces}\n`
    );

    // Test trends analysis
    console.log("📈 Testing Trends Analysis...");
    const trendsResponse = await axios.get(
      `${BASE_URL}/api/analytics/trends?indicator=childMortality&years=10`
    );
    console.log("✅ Trends API working");
    console.log(`   Indicator: ${trendsResponse.data.data.indicator}`);
    console.log(`   Trend: ${trendsResponse.data.data.trend}\n`);

    // Test data querying
    console.log("🔍 Testing Data Query...");
    const queryResponse = await axios.get(
      `${BASE_URL}/api/health-data/query?category=child&limit=50`
    );
    console.log("✅ Query API working");
    console.log(`   Total results: ${queryResponse.data.result.total}`);
    console.log(`   Current page: ${queryResponse.data.result.page}\n`);

    // Test data aggregation
    console.log("📊 Testing Data Aggregation...");
    const aggResponse = await axios.get(
      `${BASE_URL}/api/health-data/query?groupBy=year&aggregation=count&category=women`
    );
    console.log("✅ Aggregation API working");
    console.log(`   Group by: ${aggResponse.data.result.groupBy}`);
    console.log(`   Aggregation: ${aggResponse.data.result.aggregation}\n`);

    console.log("🎉 All API endpoints are working correctly!");
    console.log(
      "\n📱 You can now visit: http://localhost:3000/dashboard/analytics-rich"
    );
  } catch (error) {
    console.error(
      "❌ API Test Failed:",
      error.response?.data?.error || error.message
    );
    console.log(
      "\n🔧 Make sure the development server is running: npm run dev"
    );
  }
}

async function generateSampleQueries() {
  console.log("\n📝 Sample API Queries:\n");

  const queries = [
    {
      name: "Child mortality by province",
      url: "/api/health-data/query?category=child&groupBy=province&aggregation=count",
    },
    {
      name: "Women health data from 2019",
      url: "/api/health-data/query?category=women&year=2019&limit=100",
    },
    {
      name: "Vaccination trend analysis",
      url: "/api/analytics/trends?indicator=vaccination&years=28",
    },
    {
      name: "Household data aggregation",
      url: "/api/health-data/query?category=household&groupBy=year&aggregation=avg",
    },
  ];

  queries.forEach((query) => {
    console.log(`🔗 ${query.name}:`);
    console.log(`   ${BASE_URL}${query.url}\n`);
  });
}

if (require.main === module) {
  console.log("Starting API tests...\n");
  testAPI().then(() => {
    generateSampleQueries();
  });
}

module.exports = { testAPI };
