
import React, { useEffect, useRef, useState } from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from 'chart.js';
import { Chart } from 'react-chartjs-2';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

const Index = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeJourney, setActiveJourney] = useState('health');
  const [countersAnimated, setCountersAnimated] = useState(false);

  useEffect(() => {
    // Animate counters on scroll
    const animateCounter = (el: HTMLElement) => {
      const target = parseInt(el.dataset.target || '0');
      el.innerText = '0';
      const duration = 1500;
      const stepTime = Math.abs(Math.floor(duration / target));
      let current = 0;
      const timer = setInterval(() => {
        current += 1;
        el.innerText = current + '%';
        if (current == target) {
          clearInterval(timer);
        }
      }, stepTime);
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !countersAnimated) {
          const counters = document.querySelectorAll('.stat-counter');
          counters.forEach(counter => animateCounter(counter as HTMLElement));
          setCountersAnimated(true);
        }
      });
    }, { threshold: 0.5 });

    const opportunitySection = document.getElementById('opportunity');
    if (opportunitySection) {
      observer.observe(opportunitySection);
    }

    // Navigation active state
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            const linkElement = link as HTMLElement;
            const href = linkElement.getAttribute('href');
            if (href === `#${id}`) {
              linkElement.classList.add('active');
            } else {
              linkElement.classList.remove('active');
            }
          });
        }
      });
    }, { rootMargin: '-50% 0px -50% 0px' });

    sections.forEach(section => sectionObserver.observe(section));

    return () => {
      observer.disconnect();
      sectionObserver.disconnect();
    };
  }, [countersAnimated]);

  const handleJourneyTab = (journeyId: string) => {
    setActiveJourney(journeyId);
  };

  const handleNavClick = () => {
    setMobileMenuOpen(false);
  };

  const demandChartData = {
    labels: ['Want AI-Driven Insights', 'Traditional Approach'],
    datasets: [{
      label: 'Client Preferences',
      data: [78, 22],
      backgroundColor: ['#10B981', '#E5E7EB'],
      borderColor: ['#FFFFFF'],
      borderWidth: 2,
      hoverOffset: 4
    }]
  };

  const demandChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '70%',
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          color: '#4B5563',
          font: { size: 14 }
        }
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            return `${context.label}: ${context.raw}%`;
          }
        }
      }
    }
  };

  const riceChartData = {
    labels: ['Proactive Insights', 'Behavioral Nudges', 'Bite-sized News', 'Weekly Recap', 'AI Chatbot'],
    datasets: [
      {
        label: 'RICE Score',
        data: [85, 70, 80, 65, 45],
        backgroundColor: ['#10B981', '#059669', '#047857', '#065F46', '#064E3B'],
        borderRadius: 4,
      }
    ]
  };

  const riceChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            return `RICE Score: ${context.raw}`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          color: '#4B5563'
        },
        grid: {
          color: '#E5E7EB'
        }
      },
      x: {
        ticks: { color: '#4B5563', font: { size: 12 } },
        grid: {
          display: false
        }
      }
    }
  };

  return (
    <div className="bg-slate-50 text-slate-800 font-inter">
      <style dangerouslySetInnerHTML={{
        __html: `
          .chart-container { 
            position: relative; 
            width: 100%; 
            max-width: 400px; 
            margin-left: auto; 
            margin-right: auto; 
            height: 300px; 
            max-height: 400px; 
          }
          @media (min-width: 640px) { 
            .chart-container { height: 350px; } 
          }
          .rice-chart-container { 
            position: relative; 
            width: 100%; 
            height: 400px; 
            max-height: 500px; 
          }
          .nav-link { 
            transition: color 0.3s ease; 
          }
          .nav-link:hover, .nav-link.active { 
            color: #10B981; 
          }
          .phase-card::before { 
            content: ''; 
            position: absolute; 
            top: 50%; 
            left: -2.05rem; 
            transform: translateY(-50%); 
            width: 1.25rem; 
            height: 1.25rem; 
            background-color: #F3F4F6; 
            border: 4px solid #4B5563; 
            border-radius: 9999px; 
            z-index: 10; 
          }
          .timeline::before { 
            content: ''; 
            position: absolute; 
            top: 0; 
            bottom: 0; 
            left: 1rem; 
            transform: translateX(-50%); 
            width: 4px; 
            background-color: #E5E7EB; 
            border-radius: 2px; 
          }
        `
      }} />

      <header id="top" className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg shadow-sm">
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <span className="font-bold text-xl text-slate-900">Dezerv AI Compass</span>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <a href="#overview" className="nav-link px-3 py-2 rounded-md text-sm font-medium text-slate-600" onClick={handleNavClick}>Overview</a>
                <a href="#problem" className="nav-link px-3 py-2 rounded-md text-sm font-medium text-slate-600" onClick={handleNavClick}>The Problem</a>
                <a href="#solution" className="nav-link px-3 py-2 rounded-md text-sm font-medium text-slate-600" onClick={handleNavClick}>Solution</a>
                <a href="#prioritization" className="nav-link px-3 py-2 rounded-md text-sm font-medium text-slate-600" onClick={handleNavClick}>Prioritization</a>
                <a href="#roadmap" className="nav-link px-3 py-2 rounded-md text-sm font-medium text-slate-600" onClick={handleNavClick}>Roadmap</a>
              </div>
            </div>
            <div className="md:hidden">
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-slate-500 hover:text-slate-800 hover:bg-slate-100 focus:outline-none"
              >
                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </nav>
        <div className={`md:hidden ${mobileMenuOpen ? '' : 'hidden'}`}>
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a href="#overview" className="nav-link block px-3 py-2 rounded-md text-base font-medium text-slate-600" onClick={handleNavClick}>Overview</a>
            <a href="#problem" className="nav-link block px-3 py-2 rounded-md text-base font-medium text-slate-600" onClick={handleNavClick}>The Problem</a>
            <a href="#solution" className="nav-link block px-3 py-2 rounded-md text-base font-medium text-slate-600" onClick={handleNavClick}>Solution</a>
            <a href="#prioritization" className="nav-link block px-3 py-2 rounded-md text-base font-medium text-slate-600" onClick={handleNavClick}>Prioritization</a>
            <a href="#roadmap" className="nav-link block px-3 py-2 rounded-md text-base font-medium text-slate-600" onClick={handleNavClick}>Roadmap</a>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <section className="text-center pt-8 pb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight">
            Dezerv AI Compass – Your Intelligent <span className="text-emerald-500">Financial Co-Pilot</span>
          </h1>
          <p className="mt-6 max-w-3xl mx-auto text-lg md:text-xl text-slate-600">
            Transforming wealth management with proactive, AI-powered insights that help clients make smarter investment decisions and achieve better financial outcomes.
          </p>
        </section>

        {/* Executive Summary */}
        <section className="py-12 bg-gradient-to-r from-emerald-50 to-green-50 rounded-2xl shadow-lg mb-16">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">🚀 Executive Summary</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="font-semibold text-red-600 mb-2">Problem</h3>
                <p className="text-slate-700 text-sm">Dezerv's affluent clients face information overload, behavioral biases, and delayed, generic advice despite its strong data-driven foundation.</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="font-semibold text-blue-600 mb-2">Solution</h3>
                <p className="text-slate-700 text-sm">Launch Dezerv AI Compass—an AI-powered feature offering contextual insights, behavioral nudges, and hyper-personalized financial guidance in real-time.</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="font-semibold text-green-600 mb-2">Outcome</h3>
                <p className="text-slate-700 text-sm">Increased engagement, higher client retention, improved AUM growth, and enhanced brand differentiation in India's competitive wealth-tech space.</p>
              </div>
            </div>
          </div>
        </section>

        {/* What is Dezerv */}
        <section id="overview" className="py-16 bg-white rounded-2xl shadow-lg scroll-mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-base font-semibold text-emerald-600 tracking-wide uppercase">1️⃣ Comprehend the Situation</h2>
              <p className="mt-2 text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">What is Dezerv?</p>
            </div>

            <div class="mt-12 grid gap-8 md:grid-cols-2">
              <div>
                <h3 className="text-2xl font-bold text-slate-800 mb-4">About Dezerv</h3>
                <p className="text-slate-600 leading-relaxed mb-4">
                  Dezerv is a modern wealth management platform in India that helps people invest in PMS (portfolio management services), mutual funds, bonds, and private assets. It's built with smart technology and has a clean, user-friendly design.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  <strong>The goal?</strong> Help clients grow their wealth through data-driven advice and better returns.
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-800 mb-4">Industry Shift & Opportunity</h3>
                <ul className="space-y-3 text-slate-600">
                  <li>• Rise of AI robo-advisors (e.g., INDmoney, Zerodha's Nudge layer)</li>
                  <li>• Clients now expect personalized, real-time guidance, not quarterly PDFs</li>
                  <li>• Opportunity: Create a proactive, AI-driven co-pilot that strengthens personalization</li>
                </ul>
                <div className="mt-6 p-4 bg-emerald-50 rounded-lg">
                  <p className="text-sm text-emerald-700 font-medium">
                    Mission: Be the go-to investment partner for affluent Indians using technology and data—not sales tactics.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Customer Needs */}
        <section className="py-16 scroll-mt-20">
          <div class="text-center mb-12">
            <h2 className="text-base font-semibold text-emerald-600 tracking-wide uppercase">2️⃣ & 3️⃣ Customer Identification & Needs</h2>
            <p className="mt-2 text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">Understanding Our Users</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-slate-800 mb-4">User Segments</h3>
              <ul className="space-y-2 text-slate-600">
                <li>• Affluent, digitally-savvy investors (core Dezerv customers)</li>
                <li>• First-time, high-income professionals needing education + guidance</li>
                <li>• Existing clients expecting more from their advisors due to rising market volatility</li>
              </ul>
            </div>
            <div className="p-6 rounded-lg">
              <h3 className="text-center text-xl font-semibold text-slate-800 mb-4">Client Preferences</h3>
              <div className="chart-container">
                <Chart type="doughnut" data={demandChartData} options={demandChartOptions} />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-slate-800 mb-6">Key User Needs</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User Need</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Why It Matters</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Proactive, real-time guidance</td>
                    <td className="px-6 py-4 text-sm text-gray-700">Markets change fast; clients need insights now.</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Behavioral nudges</td>
                    <td className="px-6 py-4 text-sm text-gray-700">Even smart investors act emotionally.</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Simpler understanding</td>
                    <td className="px-6 py-4 text-sm text-gray-700">Reports ≠ clarity. Clients want explanations, not just data.</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Personalization</td>
                    <td className="px-6 py-4 text-sm text-gray-700">One-size-fits-all advice creates churn.</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Light, bite-sized learning</td>
                    <td className="px-6 py-4 text-sm text-gray-700">Many don't want long whitepapers or full webinars.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Problem Framing */}
        <section id="problem" className="py-16 bg-white rounded-2xl shadow-lg scroll-mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-base font-semibold text-emerald-600 tracking-wide uppercase">4️⃣ Cut (Prioritize) – Problem Framing</h2>
              <p className="mt-2 text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">Top Pain Points</p>
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              <div className="bg-red-50 p-6 rounded-lg border-l-4 border-red-400">
                <h4 className="font-bold text-lg text-red-800">Information Overload</h4>
                <p className="mt-2 text-red-700">Users receive too much unstructured data and struggle to extract actionable insights.</p>
              </div>
              <div className="bg-orange-50 p-6 rounded-lg border-l-4 border-orange-400">
                <h4 className="font-bold text-lg text-orange-800">Emotional Decision-Making</h4>
                <p className="mt-2 text-orange-700">Behavioral biases hurt long-term results and lead to poor investment timing.</p>
              </div>
              <div className="bg-yellow-50 p-6 rounded-lg border-l-4 border-yellow-400">
                <h4 className="font-bold text-lg text-yellow-800">Delayed Advice</h4>
                <p className="mt-2 text-yellow-700">Life changes quickly; advisor recommendations don't always keep up with client needs.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Solution */}
        <section id="solution" class="py-16 scroll-mt-20">
          <div className="text-center mb-12">
            <h2 className="text-base font-semibold text-emerald-600 tracking-wide uppercase">5️⃣ List Solutions</h2>
            <p className="mt-2 text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">Proposed Solutions</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Goal</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pain Point</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Proposed Solution</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Example</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 text-sm">
                  <tr>
                    <td className="px-6 py-4 font-medium text-gray-900">Engagement</td>
                    <td className="px-6 py-4 text-gray-700">Info overload</td>
                    <td className="px-6 py-4 text-gray-700">Proactive, contextual insights</td>
                    <td className="px-6 py-4 text-gray-700">"Your portfolio is underweight in mid-cap equity based on current goals. Here's why."</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-medium text-gray-900">Retention</td>
                    <td className="px-6 py-4 text-gray-700">Behavioral bias</td>
                    <td className="px-6 py-4 text-gray-700">Behavioral nudges</td>
                    <td className="px-6 py-4 text-gray-700">"Clients who stayed invested during corrections gained 11% more over 3 yrs."</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-medium text-gray-900">Revenue Growth</td>
                    <td className="px-6 py-4 text-gray-700">Delayed advice</td>
                    <td className="px-6 py-4 text-gray-700">Timely product recommendations</td>
                    <td className="px-6 py-4 text-gray-700">"Your idle cash can earn 7.8% in our new short-duration bond fund."</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-medium text-gray-900">User Education</td>
                    <td className="px-6 py-4 text-gray-700">Low clarity</td>
                    <td className="px-6 py-4 text-gray-700">Weekly summaries, bite-sized news</td>
                    <td className="px-6 py-4 text-gray-700">"Here's what moved your portfolio this week in plain English."</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* RICE Prioritization */}
        <section id="prioritization" className="py-16 bg-white rounded-2xl shadow-lg scroll-mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-base font-semibold text-emerald-600 tracking-wide uppercase">6️⃣ Evaluate Trade-offs (RICE Framework)</h2>
              <p className="mt-2 text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">Feature Prioritization</p>
            </div>
            <div className="mt-12">
              <div className="rice-chart-container mb-8">
                <Chart type="bar" data={riceChartData} options={riceChartOptions} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                <div className="bg-emerald-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-emerald-800">🔥 Proactive Insights</h4>
                  <p className="text-emerald-700">High reach, high impact - Top priority</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-800">📰 Bite-sized News</h4>
                  <p className="text-green-700">High confidence, low effort - Quick win</p>
                </div>
                <div className="bg-teal-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-teal-800">🔁 Behavioral Nudges</h4>
                  <p className="text-teal-700">Medium-high priority</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-slate-800">📈 Weekly Recap</h4>
                  <p className="text-slate-700">Medium priority</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-800">🤖 AI Chatbot</h4>
                  <p className="text-gray-700">Lower priority due to high effort</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Roadmap */}
        <section id="roadmap" className="py-16 scroll-mt-20">
          <div className="text-center mb-12">
            <h2 className="text-base font-semibold text-emerald-600 tracking-wide uppercase">7️⃣ Final Recommendation & Roadmap</h2>
            <p className="mt-2 text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">Launch MVP: Dezerv AI Compass</p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="relative pl-12 timeline">
              <div className="mb-10 relative">
                <div className="phase-card bg-emerald-50 p-6 rounded-lg shadow-sm border-l-4 border-emerald-400">
                  <p className="text-sm font-semibold text-emerald-600">🔹 Phase 1: Quick Wins (3–6 months)</p>
                  <h4 className="font-bold text-lg mt-1 text-slate-800">Foundation & Basic Features</h4>
                  <ul className="mt-2 text-slate-600 space-y-1 text-sm">
                    <li>• Rule-based contextual alerts (e.g., fund manager change, high AUM churn)</li>
                    <li>• Weekly summaries with market insights + portfolio health</li>
                    <li>• Basic nudges (e.g., "Consider rebalancing now due to X.")</li>
                  </ul>
                </div>
              </div>
              <div className="relative">
                <div className="phase-card bg-blue-50 p-6 rounded-lg shadow-sm border-l-4 border-blue-400">
                  <p className="text-sm font-semibold text-blue-600">🔹 Phase 2: Long-term (6–18 months)</p>
                  <h4 className="font-bold text-lg mt-1 text-slate-800">Advanced AI Features</h4>
                  <ul className="mt-2 text-slate-600 space-y-1 text-sm">
                    <li>• LLM-powered assistant for conversational insights</li>
                    <li>• Predictive analytics for financial planning needs</li>
                    <li>• Real-time product matching & nudged product flows</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Success Metrics */}
        <section className="py-16 bg-white rounded-2xl shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-base font-semibold text-emerald-600 tracking-wide uppercase">8️⃣ Success Metrics</h2>
              <p className="mt-2 text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">Measuring Our Success</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-blue-800 mb-3">Engagement</h3>
                <ul className="text-blue-700 space-y-2 text-sm">
                  <li>• DAU/WAU of AI Compass</li>
                  <li>• Time Spent</li>
                  <li>• CTR on AI alerts</li>
                </ul>
              </div>
              <div className="bg-green-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-green-800 mb-3">Retention</h3>
                <ul className="text-green-700 space-y-2 text-sm">
                  <li>• Churn rate delta (users with vs. without Compass)</li>
                  <li>• Net Promoter Score (NPS)</li>
                </ul>
              </div>
              <div className="bg-purple-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-purple-800 mb-3">Revenue & Efficiency</h3>
                <ul className="text-purple-700 space-y-2 text-sm">
                  <li>• AUM uplift (AI-influenced)</li>
                  <li>• Product adoption (via AI nudges)</li>
                  <li>• Fewer manual advisor touchpoints</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Next Steps */}
        <section className="py-16 bg-gradient-to-r from-slate-100 to-gray-100 rounded-2xl">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">9️⃣ Next Steps (If I Were the PM)</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg shadow-sm text-left">
                  <h4 className="font-semibold text-slate-800">User Interviews</h4>
                  <p className="text-sm text-slate-600">Validate assumptions on what insights they want and how they want them.</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm text-left">
                  <h4 className="font-semibold text-slate-800">Data Audit</h4>
                  <p className="text-sm text-slate-600">Ensure portfolio + user behavior data is structured and ML-ready.</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg shadow-sm text-left">
                  <h4 className="font-semibold text-slate-800">UX Mockups</h4>
                  <p className="text-sm text-slate-600">Test early prototypes with existing clients.</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm text-left">
                  <h4 className="font-semibold text-slate-800">Build v0 & Launch</h4>
                  <p className="text-sm text-slate-600">Prioritize insights that can run on existing infra. Monitor metrics weekly.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="bg-slate-800 text-white">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold tracking-tight">🔚 Final Words</h2>
          <div className="mt-6 max-w-3xl mx-auto space-y-4">
            <p className="text-lg text-slate-300">
              <strong>Why this matters:</strong> Dezerv's clients don't want "more data." They want "better direction."
            </p>
            <p className="text-lg text-slate-300">
              The AI Compass doesn't replace your advisor—it <strong>supercharges</strong> them.
            </p>
            <p className="text-lg text-slate-300">
              It gives Dezerv the edge to <strong>lead the future of wealth management in India.</strong>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
