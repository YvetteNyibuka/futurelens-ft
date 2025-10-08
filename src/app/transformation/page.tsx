import Link from "next/link";
import { Heart, TrendingUp, Users, Award } from "lucide-react";

export default function TransformationPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="inline-flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
            🇷🇼 1992-2020 • 28 Years of Progress
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            A Story of
            <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              {" "}
              Remarkable Transformation
            </span>
          </h1>

          <p className="text-xl text-gray-600 leading-relaxed">
            From the ashes of 1994, Rwanda has achieved one of the most
            remarkable health transformations in modern history. This is the
            data-driven story of resilience, innovation, and unwavering
            commitment to health for all.
          </p>
        </div>

        {/* Timeline */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Journey Through Time
          </h2>

          <div className="space-y-8">
            <TimelineItem
              year="1992-1994"
              title="Pre-Genocide Baseline"
              description="Health system devastation and humanitarian crisis"
              icon={<Heart className="h-5 w-5 text-red-600" />}
              color="red"
            />

            <TimelineItem
              year="1995-2000"
              title="Post-Genocide Reconstruction"
              description="Rebuilding health infrastructure and establishing basic services"
              icon={<Users className="h-5 w-5 text-orange-600" />}
              color="orange"
            />

            <TimelineItem
              year="2000-2010"
              title="Millennium Development Goals Era"
              description="Rapid progress in maternal and child health indicators"
              icon={<TrendingUp className="h-5 w-5 text-blue-600" />}
              color="blue"
            />

            <TimelineItem
              year="2010-2020"
              title="Vision 2020 & SDG Implementation"
              description="Achieving remarkable health outcomes and global recognition"
              icon={<Award className="h-5 w-5 text-green-600" />}
              color="green"
            />
          </div>
        </div>
      </section>

      {/* Key Achievements */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Transformational Achievements
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <AchievementCard
              title="Child Mortality"
              before="High infant mortality rates"
              after="70%+ reduction achieved"
              improvement="+70%"
              color="blue"
            />

            <AchievementCard
              title="Vaccination Coverage"
              before="Less than 30% coverage"
              after="95%+ national coverage"
              improvement="+65%"
              color="green"
            />

            <AchievementCard
              title="Maternal Health"
              before="Limited maternal care"
              after="Significant mortality reduction"
              improvement="+60%"
              color="purple"
            />

            <AchievementCard
              title="Health Insurance"
              before="No universal coverage"
              after="95%+ population covered"
              improvement="+95%"
              color="yellow"
            />

            <AchievementCard
              title="Life Expectancy"
              before="Regional lowest levels"
              after="Regional leadership"
              improvement="+25 years"
              color="indigo"
            />

            <AchievementCard
              title="Health System"
              before="Devastated infrastructure"
              after="Model for Africa"
              improvement="Complete rebuild"
              color="pink"
            />
          </div>
        </div>
      </section>

      {/* Policy Impact */}
      <section className="bg-gradient-to-r from-blue-600 to-green-600 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Policy-Driven Success
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Rwanda's health transformation was driven by visionary policies,
              strong leadership, and data-driven decision making.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <PolicyCard
              title="Mutual Health Insurance (Mutuelle)"
              year="2005"
              impact="Universal health coverage achieved"
            />

            <PolicyCard
              title="Community Health Program"
              year="2007"
              impact="Brought healthcare to every village"
            />

            <PolicyCard
              title="Performance-Based Financing"
              year="2008"
              impact="Improved quality and accountability"
            />

            <PolicyCard
              title="Health Sector Strategic Plans"
              year="2009-2020"
              impact="Systematic approach to health development"
            />

            <PolicyCard
              title="Digital Health Initiatives"
              year="2015"
              impact="Data-driven health management"
            />

            <PolicyCard
              title="Specialized Healthcare"
              year="2018"
              impact="Advanced medical services in-country"
            />
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Explore the Data Behind the Story
        </h2>
        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
          Dive deep into the comprehensive health analytics that tell Rwanda's
          transformation story with interactive dashboards and detailed
          visualizations.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/dashboard"
            className="inline-flex items-center bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-all shadow-lg"
          >
            View Analytics Dashboard
          </Link>
          <Link
            href="/trends"
            className="inline-flex items-center border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg font-semibold hover:border-gray-400 transition-all"
          >
            Explore Health Trends
          </Link>
        </div>
      </section>
    </div>
  );
}

function TimelineItem({
  year,
  title,
  description,
  icon,
  color,
}: {
  year: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: "red" | "orange" | "blue" | "green";
}) {
  const colorClasses = {
    red: "bg-red-50 border-red-200",
    orange: "bg-orange-50 border-orange-200",
    blue: "bg-blue-50 border-blue-200",
    green: "bg-green-50 border-green-200",
  };

  return (
    <div className="flex items-start space-x-4">
      <div className={`${colorClasses[color]} rounded-full p-3 border-2`}>
        {icon}
      </div>
      <div className="flex-1">
        <div className="flex items-center space-x-3 mb-2">
          <span className="text-sm font-semibold text-gray-500">{year}</span>
          <div className="h-px bg-gray-300 flex-1"></div>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
}

function AchievementCard({
  title,
  before,
  after,
  improvement,
  color,
}: {
  title: string;
  before: string;
  after: string;
  improvement: string;
  color: "blue" | "green" | "purple" | "yellow" | "indigo" | "pink";
}) {
  const colorClasses = {
    blue: "from-blue-500 to-blue-600",
    green: "from-green-500 to-green-600",
    purple: "from-purple-500 to-purple-600",
    yellow: "from-yellow-500 to-yellow-600",
    indigo: "from-indigo-500 to-indigo-600",
    pink: "from-pink-500 to-pink-600",
  };

  return (
    <div className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-all">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      <div className="space-y-3">
        <div>
          <p className="text-sm text-gray-500 mb-1">Before:</p>
          <p className="text-gray-700">{before}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500 mb-1">After:</p>
          <p className="text-gray-700">{after}</p>
        </div>
        <div
          className={`bg-gradient-to-r ${colorClasses[color]} text-white px-3 py-2 rounded-lg text-center`}
        >
          <span className="font-semibold">{improvement}</span>
        </div>
      </div>
    </div>
  );
}

function PolicyCard({
  title,
  year,
  impact,
}: {
  title: string;
  year: string;
  impact: string;
}) {
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-white">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold">{title}</h3>
        <span className="text-sm bg-white/20 px-2 py-1 rounded">{year}</span>
      </div>
      <p className="text-blue-100 text-sm">{impact}</p>
    </div>
  );
}
