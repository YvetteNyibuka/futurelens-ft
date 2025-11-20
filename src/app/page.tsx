import Link from "next/link";
import { ArrowRight, BarChart3, Map, TrendingUp, Users } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-green-50">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
            🇷🇼 Official NISR DHS Data • 1992-2020
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Rwanda's Health
            <span className="bg-linear-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              {" "}
              Transformation Story
            </span>
          </h1>

          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Explore 28 years of Rwanda's remarkable health journey from 1992 to
            2020. Discover how a nation rebuilt its health system and achieved
            some of the most impressive health outcomes in modern history.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              href="/dashboard"
              className="inline-flex items-center bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl"
            >
              Explore Dashboard
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              href="/transformation"
              className="inline-flex items-center border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg font-semibold hover:border-gray-400 transition-all"
            >
              View Transformation Story
            </Link>
          </div>

          {/* Key Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">28</div>
              <div className="text-sm text-gray-600">Years of Data</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">70%+</div>
              <div className="text-sm text-gray-600">
                Child Mortality Reduction
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-600">95%+</div>
              <div className="text-sm text-gray-600">Vaccination Coverage</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">5</div>
              <div className="text-sm text-gray-600">Provinces Analyzed</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Comprehensive Health Analytics
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Access powerful tools to analyze Rwanda's health transformation
              with official government data spanning nearly three decades.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={<TrendingUp className="h-8 w-8 text-blue-600" />}
              title="28-Year Trends"
              description="Track health indicators from 1992 to 2020 and see Rwanda's remarkable progress."
              href="/trends"
            />
            <FeatureCard
              icon={<Map className="h-8 w-8 text-green-600" />}
              title="Province Insights"
              description="Compare health outcomes across all five provinces with detailed geographic analysis."
              href="/provinces"
            />
            <FeatureCard
              icon={<BarChart3 className="h-8 w-8 text-yellow-600" />}
              title="Interactive Dashboard"
              description="Explore real-time visualizations of maternal health, child nutrition, and vaccination data."
              href="/dashboard"
            />
            <FeatureCard
              icon={<Users className="h-8 w-8 text-purple-600" />}
              title="Policy Impact"
              description="Analyze how health policies translated into measurable health outcome improvements."
              href="/transformation"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-linear-to-r from-blue-600 to-green-600 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Explore Rwanda's Health Data?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Dive into comprehensive analytics powered by official NISR
            Demographic and Health Survey data spanning 28 years of progress.
          </p>
          <Link
            href="/dashboard"
            className="inline-flex items-center bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-50 transition-all shadow-lg"
          >
            Start Exploring
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="h-8 w-8 bg-linear-to-br from-blue-500 to-green-500 rounded-lg flex items-center justify-center">
              <BarChart3 className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg font-semibold">FutureLens Rwanda</span>
          </div>
          <p className="text-gray-400 mb-2">
            Official Rwanda Health Analytics Platform
          </p>
          <p className="text-sm text-gray-500">
            Data Source: National Institute of Statistics of Rwanda (NISR) •
            Demographic and Health Surveys
          </p>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
  href,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
}) {
  return (
    <Link href={href} className="group">
      <div className="bg-gray-50 rounded-xl p-6 hover:bg-white hover:shadow-lg transition-all duration-300 border border-transparent hover:border-gray-200">
        <div className="mb-4">{icon}</div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
          {title}
        </h3>
        <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
      </div>
    </Link>
  );
}
