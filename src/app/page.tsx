import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Icon } from "@iconify/react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-nsir-surface">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, #f5f7f8 0%, #ffffff 50%, #E6E9EB 100%)",
          }}
        ></div>
        <div className="container mx-auto px-4 py-16 relative">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center bg-white border border-gray-300 text-nsir-primary px-6 py-3 rounded-lg font-medium mb-8 shadow-sm">
              <Icon icon="mdi:trophy" className="w-5 h-5 mr-2" />
              NSIR Competition Entry • 978,687 Health Records Analyzed
            </div>

            <h1 className="heading-nsir-1">
              Rwanda's Health
              <span className="text-nsir-primary block">
                Transformation Success
              </span>
            </h1>

            <p className="text-nsir-body text-lg max-w-3xl mx-auto">
              Explore 28 years of Rwanda's remarkable health transformation from
              1992 to 2020. Discover how evidence-based policy making and
              rigorous data analysis transformed a nation's health system into{" "}
              <strong>Africa's leading health model</strong>, powered by 978,687
              comprehensive health records.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link
                href="/dashboard"
                className="btn-nsir-primary inline-flex items-center"
              >
                <Icon icon="mdi:chart-line" className="w-5 h-5 mr-2" />
                Explore Analytics Dashboard
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                href="/transformation"
                className="btn-nsir-secondary inline-flex items-center"
              >
                <Icon icon="mdi:book-open-variant" className="w-5 h-5 mr-2" />
                View Transformation Story
              </Link>
            </div>

            {/* Key Achievement Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <div className="card-nsir text-center">
                <Icon
                  icon="mdi:database"
                  className="w-8 h-8 text-nsir-primary mx-auto mb-3"
                />
                <div className="text-3xl font-bold text-nsir-primary mb-2">
                  978,687
                </div>
                <div className="text-nsir-small font-medium">
                  Health Records Analyzed
                </div>
              </div>
              <div className="card-nsir text-center">
                <Icon
                  icon="mdi:heart-pulse"
                  className="w-8 h-8 text-nsir-primary mx-auto mb-3"
                />
                <div className="text-3xl font-bold text-nsir-primary mb-2">
                  79%
                </div>
                <div className="text-nsir-small font-medium">
                  Child Mortality Reduction
                </div>
              </div>
              <div className="card-nsir text-center">
                <Icon
                  icon="mdi:trending-up"
                  className="w-8 h-8 text-nsir-primary mx-auto mb-3"
                />
                <div className="text-3xl font-bold text-nsir-primary mb-2">
                  48→69
                </div>
                <div className="text-nsir-small font-medium">
                  Life Expectancy Years
                </div>
              </div>
              <div className="card-nsir text-center">
                <Icon
                  icon="mdi:calendar-clock"
                  className="w-8 h-8 text-nsir-primary mx-auto mb-3"
                />
                <div className="text-3xl font-bold text-nsir-primary mb-2">
                  28
                </div>
                <div className="text-nsir-small font-medium">
                  Years of Progress
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Achievement Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="heading-nsir-2">
              Transformational Health Achievements
            </h2>
            <p className="text-nsir-body max-w-3xl mx-auto">
              Three decades of evidence-based health policy implementation have
              delivered measurable improvements across every major health
              indicator, establishing Rwanda as Africa's premier health
              transformation success story.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <AchievementCard
              icon={
                <Icon icon="mdi:baby" className="h-12 w-12 text-nsir-error" />
              }
              title="Child Health Revolution"
              before="151 per 1,000"
              after="32 per 1,000"
              improvement="79% reduction"
              description="Under-5 mortality rate transformed through community health programs and evidence-based interventions"
            />
            <AchievementCard
              icon={
                <Icon
                  icon="mdi:heart-pulse"
                  className="h-12 w-12 text-nsir-primary"
                />
              }
              title="Maternal Care Excellence"
              before="12% skilled delivery"
              after="91% skilled delivery"
              improvement="659% increase"
              description="Revolutionary improvement in maternal healthcare access through systematic health system strengthening"
            />
            <AchievementCard
              icon={
                <Icon
                  icon="mdi:shield-check"
                  className="h-12 w-12 text-nsir-success"
                />
              }
              title="Vaccination Success"
              before="45% coverage"
              after="97% coverage"
              improvement="116% increase"
              description="Near-universal immunization coverage achieved through comprehensive national vaccination programs"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-nsir-surface py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="heading-nsir-2">Professional Analytics Platform</h2>
            <p className="text-nsir-body max-w-3xl mx-auto">
              Access comprehensive health analytics tools designed for policy
              makers, researchers, and development professionals working with
              African health data.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={
                <Icon
                  icon="mdi:chart-timeline-variant"
                  className="h-10 w-10 text-nsir-primary"
                />
              }
              title="28-Year Timeline Analysis"
              description="Complete historical analysis from 1992 post-genocide recovery to 2020 health system excellence"
              stats="978,687 records processed"
              href="/dashboard"
            />
            <FeatureCard
              icon={
                <Icon
                  icon="mdi:map-marker-radius"
                  className="h-10 w-10 text-nsir-success"
                />
              }
              title="5-Province Coverage"
              description="Comprehensive geographic analysis across Kigali, Northern, Southern, Eastern, and Western provinces"
              stats="Complete national coverage"
              href="/dashboard"
            />
            <FeatureCard
              icon={
                <Icon
                  icon="mdi:chart-bar"
                  className="h-10 w-10 text-nsir-primary-light"
                />
              }
              title="Interactive Visualizations"
              description="Professional charts and analytics with live filtering and dynamic data exploration capabilities"
              stats="15+ visualization types"
              href="/dashboard"
            />
            <FeatureCard
              icon={
                <Icon
                  icon="mdi:brain"
                  className="h-10 w-10 text-nsir-warning"
                />
              }
              title="AI-Ready Dataset"
              description="Structured, clean dataset optimized for machine learning and predictive health modeling research"
              stats="41 processed datasets"
              href="/dashboard"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden bg-nsir-primary">
        <div className="container mx-auto px-4 py-20 relative">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center bg-white/20 backdrop-blur text-white px-6 py-3 rounded-lg font-medium mb-8">
              <Icon icon="mdi:check-circle" className="w-5 h-5 mr-2" />
              Ready for NSIR Competition Excellence
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Experience Rwanda's Health Transformation
            </h2>

            <p className="text-xl text-white/90 mb-12 leading-relaxed">
              Explore comprehensive analytics showing how Rwanda became Africa's
              health transformation leader through evidence-based policy making
              and systematic health system strengthening over 28 years.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                href="/dashboard"
                className="inline-flex items-center bg-white text-nsir-primary px-8 py-4 rounded-lg font-semibold hover:bg-gray-50 transition-all shadow-lg"
              >
                <Icon icon="mdi:chart-box" className="mr-3 h-5 w-5" />
                Start Data Exploration
                <ArrowRight className="ml-3 h-5 w-5" />
              </Link>
              <Link
                href="/dashboard/analytics-rich"
                className="inline-flex items-center border-2 border-white/30 text-white px-8 py-4 rounded-lg font-semibold hover:border-white hover:bg-white/10 transition-all backdrop-blur"
              >
                <Icon icon="mdi:pulse" className="mr-3 h-5 w-5" />
                View Live Analytics
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <div className="h-10 w-10 bg-nsir-primary rounded-lg flex items-center justify-center">
                <Icon icon="mdi:chart-line" className="h-6 w-6 text-white" />
              </div>
              <div className="text-left">
                <div className="text-xl font-bold">FutureLens Rwanda</div>
                <div className="text-blue-400 text-sm">
                  Official Rwanda Health Analytics Platform
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 text-center md:text-left mb-8">
            <div>
              <h4 className="font-bold text-white mb-3">Platform</h4>
              <div className="space-y-2 text-gray-400">
                <Link
                  href="/dashboard"
                  className="block hover:text-white transition-colors"
                >
                  Analytics Dashboard
                </Link>
                <Link
                  href="/trends"
                  className="block hover:text-white transition-colors"
                >
                  Health Trends
                </Link>
                <Link
                  href="/provinces"
                  className="block hover:text-white transition-colors"
                >
                  Provincial Data
                </Link>
              </div>
            </div>
            <div>
              <h4 className="font-bold text-white mb-3">Research</h4>
              <div className="space-y-2 text-gray-400">
                <Link
                  href="/transformation"
                  className="block hover:text-white transition-colors"
                >
                  Transformation Analysis
                </Link>
                <Link
                  href="/predictions"
                  className="block hover:text-white transition-colors"
                >
                  Predictive Models
                </Link>
                <Link
                  href="/upload"
                  className="block hover:text-white transition-colors"
                >
                  Data Upload
                </Link>
              </div>
            </div>
            <div>
              <h4 className="font-bold text-white mb-3">About</h4>
              <div className="space-y-2 text-gray-400">
                <div>NSIR Competition Entry</div>
                <div>Evidence-Based Health Policy</div>
                <div>Rwanda Health Excellence</div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center">
            <p className="text-gray-400 mb-2">
              © 2024 FutureLens Rwanda • Official Rwanda Health Analytics
              Platform
            </p>
            <p className="text-sm text-gray-500">
              Data Source: National Institute of Statistics of Rwanda (NISR) •
              Demographic and Health Surveys (1992-2020) • Processed: 978,687
              records
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
  stats,
  href,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  stats: string;
  href: string;
}) {
  return (
    <Link href={href} className="group">
      <div className="card-nsir hover:shadow-xl transition-all duration-300 group transform hover:scale-105">
        <div className="mb-6">{icon}</div>
        <h3 className="heading-nsir-3 group-hover:text-nsir-primary transition-colors">
          {title}
        </h3>
        <p className="text-nsir-body text-sm leading-relaxed mb-4">
          {description}
        </p>
        <div className="text-xs font-medium text-nsir-primary bg-blue-50 px-3 py-1 rounded-full inline-block">
          {stats}
        </div>
      </div>
    </Link>
  );
}

function AchievementCard({
  icon,
  title,
  before,
  after,
  improvement,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  before: string;
  after: string;
  improvement: string;
  description: string;
}) {
  return (
    <div className="card-nsir hover:shadow-xl transition-all duration-300 group">
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gray-50 mb-4 shadow-lg group-hover:scale-110 transition-transform">
          {icon}
        </div>
        <h3 className="heading-nsir-3">{title}</h3>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center p-3 bg-red-50 rounded-xl">
          <span className="text-sm font-medium text-gray-600">Before 1990s:</span>
          <span className="font-bold text-red-600">{before}</span>
        </div>

        <div className="flex justify-between items-center p-3 bg-green-50 rounded-xl">
          <span className="text-sm font-medium text-gray-600">By 2020:</span>
          <span className="font-bold text-green-600">{after}</span>
        </div>

        <div className="text-center p-4 bg-nsir-surface rounded-xl">
          <div className="text-2xl font-bold text-nsir-primary mb-1">
            {improvement}
          </div>
          <div className="text-nsir-small">Total Improvement</div>
        </div>

        <p className="text-nsir-small text-center leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}