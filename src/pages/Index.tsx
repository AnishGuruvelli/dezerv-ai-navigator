
import { useState } from "react";
import { Menu, X } from "lucide-react";

const Index = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation = [
    { name: "About", href: "#about" },
    { name: "Problem", href: "#problem" },
    { name: "Goal", href: "#goal" },
    { name: "Features", href: "#features" },
    { name: "Journey", href: "#journey" },
    { name: "Prioritization", href: "#prioritization" },
    { name: "Metrics", href: "#metrics" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-md py-4 sticky top-0 z-50 rounded-b-xl">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <a href="#" className="text-2xl font-bold text-indigo-700">
            Dezerv AI Compass
          </a>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-600 hover:text-indigo-700 font-medium transition-colors duration-200"
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-gray-600 hover:text-indigo-700"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 px-4 py-4">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="block py-2 text-gray-600 hover:text-indigo-700 font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <header className="gradient-bg text-white text-center py-20 px-6 rounded-b-xl mb-8 mx-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-extrabold mb-4 leading-tight animate-fade-in">
            AI-Powered Hyper-Personalized Investment Insights for Dezerv
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto mb-8 animate-fade-in">
            Transforming wealth management with dynamic, real-time financial guidance. Your personal financial co-pilot.
          </p>
          <a
            href="#features"
            className="bg-white text-indigo-700 hover:bg-indigo-50 font-bold py-3 px-8 rounded-full text-lg transition duration-300 shadow-lg inline-block animate-fade-in"
          >
            Discover the Compass
          </a>
        </div>
      </header>

      {/* About Section */}
      <section id="about" className="py-16 bg-gray-50 rounded-xl mx-4 mb-8">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">About Dezerv & Our AI Mission</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Dezerv excels at data-driven wealth management, providing personalized portfolios and actively tracking market impact. Our mission is to transform the client-advisor relationship into a truly intelligent partnership.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Our Vision</h3>
              <p className="text-gray-700 leading-relaxed">
                We envision a future where every client receives hyper-personalized, actionable financial insights, not just generic updates. The "Dezerv AI Compass" is designed to be a dynamic, real-time "financial co-pilot."
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Core Principles</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li><strong>Personalization at Scale:</strong> Delivering unique insights for every individual.</li>
                <li><strong>Proactive Guidance:</strong> Anticipating needs and offering timely advice.</li>
                <li><strong>Empowerment Through Knowledge:</strong> Fostering financial literacy.</li>
                <li><strong>Efficiency & Innovation:</strong> Automating routine tasks and leading AI-driven wealth management.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Statement */}
      <section id="problem" className="py-16 bg-white rounded-xl mx-4 mb-8">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">The Opportunity & Problem Statement</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Traditional wealth management often struggles with providing timely, context-rich advice tailored to each individual's evolving financial landscape.
            </p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-md">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">The Core Challenge: Lack of Hyper-Personalization at Scale</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Despite data-driven approaches, a significant gap remains in delivering truly hyper-personalized and actionable insights efficiently. Clients often receive generic market updates or advice based on static risk profiles.
            </p>
            <p className="text-gray-700 leading-relaxed">
              The "Dezerv AI Compass" addresses this by moving beyond traditional rebalancing to provide a dynamic, real-time financial co-pilot that understands and responds to individual nuances.
            </p>
          </div>
        </div>
      </section>

      {/* Goal Section */}
      <section id="goal" className="py-16 bg-gray-50 rounded-xl mx-4 mb-8">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Goal: Empowering Clients with an AI Financial Co-Pilot</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              To provide each client with a dynamic, real-time "financial co-pilot" that leverages advanced AI models to deliver unparalleled personalized insights.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-md text-center">
              <h3 className="text-xl font-semibold text-indigo-700 mb-3">Enhanced Engagement</h3>
              <p className="text-gray-700">Make clients feel understood and empowered with tailored, timely advice, leading to higher satisfaction and loyalty.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md text-center">
              <h3 className="text-xl font-semibold text-indigo-700 mb-3">Superior Insights</h3>
              <p className="text-gray-700">Deliver actionable intelligence that helps clients make better decisions and potentially achieve higher risk-adjusted returns.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md text-center">
              <h3 className="text-xl font-semibold text-indigo-700 mb-3">Operational Efficiency</h3>
              <p className="text-gray-700">Automate routine advisory tasks, freeing up human advisors to focus on complex problem-solving and high-value relationships.</p>
            </div>
          </div>
        </div>
      </section>

      {/* User Persona */}
      <section id="persona" className="py-16 bg-white rounded-xl mx-4 mb-8">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Target User: The Modern Investor</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Meet "Ananya," a driven professional seeking intelligent, proactive financial guidance.</p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-md grid md:grid-cols-2 gap-8 items-center">
            <div className="text-center">
              <div className="w-48 h-48 mx-auto mb-6 bg-gradient-to-br from-purple-400 to-indigo-600 rounded-full flex items-center justify-center text-white text-6xl font-bold shadow-lg">
                A
              </div>
              <h3 className="text-3xl font-bold text-gray-800 mb-2">Ananya Sharma</h3>
              <p className="text-gray-600 text-lg">35, Tech Lead, Bengaluru</p>
            </div>
            <div>
              <ul className="space-y-4 text-gray-700">
                <li><strong className="text-indigo-700">Background:</strong> Successful in her career, busy with demanding work, limited time for in-depth financial research.</li>
                <li><strong className="text-indigo-700">Goals:</strong> Grow wealth, plan for early retirement, optimize taxes, and explore new investment avenues.</li>
                <li><strong className="text-indigo-700">Pain Points:</strong> Overwhelmed by market noise, unsure if portfolio is optimized, prone to emotional decisions.</li>
                <li><strong className="text-indigo-700">Needs:</strong> Proactive alerts, understanding of behavioral biases, simplified learning about financial products.</li>
                <li><strong className="text-indigo-700">Quote:</strong> "I need a financial partner who truly understands *my* life and *my* money."</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* User Journey */}
      <section id="journey" className="py-16 bg-gray-50 rounded-xl mx-4 mb-8">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">The Dezerv AI Compass User Journey</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">A seamless and intelligent experience, guiding clients toward better financial outcomes.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: "1",
                title: "Initial Engagement & Data Sync",
                description: "Client logs into Dezerv, AI Compass seamlessly integrates existing portfolio, transaction, and behavioral data."
              },
              {
                step: "2",
                title: "Proactive Insight Delivery",
                description: "AI detects life events or market shifts, pushing personalized alerts and insights to the client."
              },
              {
                step: "3",
                title: "Interactive Exploration & Nudges",
                description: "Client can ask natural language questions or receives behavioral nudges during portfolio review."
              },
              {
                step: "4",
                title: "Action & Continuous Learning",
                description: "Client acts on recommendations, AI learns and refines future insights."
              }
            ].map((item) => (
              <div key={item.step} className="bg-white p-6 rounded-xl shadow-md text-center">
                <div className="text-indigo-700 text-4xl mb-4">
                  <span className="inline-block px-3 py-1 rounded-full bg-indigo-100 font-bold">{item.step}</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{item.title}</h3>
                <p className="text-gray-700">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-16 bg-white rounded-xl mx-4 mb-8">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Key Features of Dezerv AI Compass</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Leveraging advanced AI models for a truly dynamic financial co-pilot.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "1. Proactive, Contextual Insights",
                description: "Instead of generic market updates, clients receive highly personalized alerts and insights based on their specific situation and market conditions."
              },
              {
                title: "2. Behavioral Finance Nudges",
                description: "The AI learns client behavior and biases, offering calming, data-backed perspectives during market volatility to prevent emotional decisions."
              },
              {
                title: "3. Personalized Learning & Upskilling",
                description: "AI recommends bite-sized, relevant educational content based on portfolio, interests, and engagement patterns to foster financial literacy."
              },
              {
                title: "4. Optimized Product Recommendations",
                description: "AI identifies gaps in financial plans and proactively suggests suitable Dezerv products aligned with client needs and market conditions."
              }
            ].map((feature) => (
              <div key={feature.title} className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-2xl font-semibold text-gray-800 mb-3">{feature.title}</h3>
                <p className="text-gray-700 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Prioritization */}
      <section id="prioritization" className="py-16 bg-gray-50 rounded-xl mx-4 mb-8">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Feature Prioritization (RICE Framework)</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">Using the RICE scoring model to prioritize features for maximum impact.</p>
          </div>
          <div className="overflow-x-auto bg-white p-6 rounded-xl shadow-md">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Feature</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reach</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Impact</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Confidence</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Effort</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">RICE Score</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {[
                  { feature: "Proactive, Contextual Insights", reach: 8, impact: 5, confidence: "90%", effort: 7, score: 51.4 },
                  { feature: "Behavioral Finance Nudges", reach: 7, impact: 4, confidence: "85%", effort: 6, score: 39.7 },
                  { feature: "Personalized Learning & Upskilling", reach: 9, impact: 3, confidence: "95%", effort: 5, score: 51.3 },
                  { feature: "Optimized Product Recommendations", reach: 6, impact: 5, confidence: "80%", effort: 8, score: 30.0 }
                ].map((row) => (
                  <tr key={row.feature}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{row.feature}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{row.reach}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{row.impact}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{row.confidence}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{row.effort}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-indigo-700 font-bold">{row.score}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Success Metrics */}
      <section id="metrics" className="py-16 bg-white rounded-xl mx-4 mb-8">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Measuring Our Success</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Key indicators to track the impact and growth of Dezerv AI Compass.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-2xl font-semibold text-gray-800 mb-3">Client Engagement & Retention</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li><strong>Feature Adoption Rate:</strong> Percentage of active users engaging with AI Compass features.</li>
                <li><strong>Retention Rate:</strong> Longitudinal client retention for AI Compass users.</li>
                <li><strong>Customer Satisfaction:</strong> CSAT/NPS surveys measuring client sentiment.</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-2xl font-semibold text-gray-800 mb-3">Financial Outcomes & Efficiency</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li><strong>AUM Growth per Client:</strong> Growth in Assets Under Management for AI-guided clients.</li>
                <li><strong>Risk-Adjusted Returns:</strong> Improved returns for AI-guided portfolios vs benchmarks.</li>
                <li><strong>Advisor Efficiency:</strong> Time saved by human advisors on routine tasks.</li>
                <li><strong>Product Cross-Sell/Upsell:</strong> Increase in new product adoptions via AI recommendations.</li>
              </ul>
            </div>
          </div>

          {/* Stats Section */}
          <div className="mt-16">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold text-gray-800 mb-4">Our Impact in Numbers</h3>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">The potential of AI to revolutionize financial engagement and returns.</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { stat: "90%+", label: "Projected Client Satisfaction Increase" },
                { stat: "25%", label: "Potential Increase in Advisor Efficiency" },
                { stat: "15%", label: "Improved Client Retention Rate" },
                { stat: "3X", label: "Growth in Personalized Insight Delivery" }
              ].map((item) => (
                <div key={item.label} className="bg-white p-6 rounded-xl shadow-md text-center">
                  <div className="text-indigo-700 text-5xl font-bold mb-2">{item.stat}</div>
                  <p className="text-gray-700 font-semibold">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="gradient-bg text-white text-center py-10 rounded-t-xl mt-8 mx-4">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-lg mb-4">&copy; 2025 Dezerv AI Compass. All rights reserved.</p>
          <p className="text-md">Transforming wealth management, one personalized insight at a time.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
