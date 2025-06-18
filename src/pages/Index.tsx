
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
    labels: ['Would Switch for AI Insights', 'Would Not Switch'],
    datasets: [{
      label: 'Consumer Demand',
      data: [84, 16],
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

  const kpiChartData = {
    labels: ['DAU', 'Churn Reduction', 'AUM/User', 'Support Tickets', 'NPS'],
    datasets: [
      {
        label: 'Current Baseline (Illustrative)',
        data: [100, 100, 100, 100, 100],
        backgroundColor: '#9CA3AF',
        borderRadius: 4,
      },
      {
        label: 'Expected Impact with AI Co-Pilot',
        data: [120, 110, 115, 65, 115],
        backgroundColor: '#10B981',
        borderRadius: 4
      }
    ]
  };

  const kpiChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: { color: '#4B5563', font: { size: 14 } }
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            let value = context.raw;
            let change = value - 100;
            if (context.datasetIndex === 0) return 'Baseline: 100%';
            
            if (context.label === 'Churn Reduction') {
              let reduction = context.dataset.data[1] - 100;
              return `Expected Impact: -${200 - context.dataset.data[1]}% Churn`;
            }
            if (context.label === 'Support Tickets') {
              let reduction = 100 - context.raw;
              return `Expected Impact: -${reduction}% Tickets`;
            }
            
            return `Expected Impact: +${change.toFixed(0)}%`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value: any) {
            return value + '%';
          },
          color: '#4B5563'
        },
        grid: {
          color: '#E5E7EB'
        }
      },
      x: {
        ticks: { color: '#4B5563', font: { size: 14 } },
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
          .kpi-chart-container { 
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
              <span className="font-bold text-xl text-slate-900">Dezerv AI Co-Pilot</span>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <a href="#opportunity" className="nav-link px-3 py-2 rounded-md text-sm font-medium text-slate-600" onClick={handleNavClick}>The Opportunity</a>
                <a href="#problem" className="nav-link px-3 py-2 rounded-md text-sm font-medium text-slate-600" onClick={handleNavClick}>The Problem</a>
                <a href="#solution" className="nav-link px-3 py-2 rounded-md text-sm font-medium text-slate-600" onClick={handleNavClick}>The Solution</a>
                <a href="#impact" className="nav-link px-3 py-2 rounded-md text-sm font-medium text-slate-600" onClick={handleNavClick}>The Impact</a>
                <a href="#roadmap" className="nav-link px-3 py-2 rounded-md text-sm font-medium text-slate-600" onClick={handleNavClick}>The Roadmap</a>
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
            <a href="#opportunity" className="nav-link block px-3 py-2 rounded-md text-base font-medium text-slate-600" onClick={handleNavClick}>The Opportunity</a>
            <a href="#problem" className="nav-link block px-3 py-2 rounded-md text-base font-medium text-slate-600" onClick={handleNavClick}>The Problem</a>
            <a href="#solution" className="nav-link block px-3 py-2 rounded-md text-base font-medium text-slate-600" onClick={handleNavClick}>The Solution</a>
            <a href="#impact" className="nav-link block px-3 py-2 rounded-md text-base font-medium text-slate-600" onClick={handleNavClick}>The Impact</a>
            <a href="#roadmap" className="nav-link block px-3 py-2 rounded-md text-base font-medium text-slate-600" onClick={handleNavClick}>The Roadmap</a>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <section className="text-center pt-8 pb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight">
            Revolutionizing Personalized <span className="text-emerald-500">Wealth Management</span>
          </h1>
          <p className="mt-6 max-w-3xl mx-auto text-lg md:text-xl text-slate-600">
            A strategic proposal to build the Dezerv AI Financial Co-Pilot — an intelligent, proactive partner designed to enhance user engagement, retention, and financial well-being.
          </p>
        </section>

        <section id="opportunity" className="py-16 bg-white rounded-2xl shadow-lg scroll-mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-base font-semibold text-emerald-600 tracking-wide uppercase">The Opportunity</h2>
              <p className="mt-2 text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">Why AI is a Strategic Imperative Now</p>
              <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">The wealth management landscape is rapidly evolving. Consumer demand for intelligent, personalized financial guidance has reached a critical tipping point, creating a massive opportunity for tech-first leaders like Dezerv.</p>
            </div>

            <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-2">
              <div className="flex flex-col justify-center items-center text-center p-8">
                <h3 className="text-2xl font-bold text-slate-800">A Market Ready for Change</h3>
                <p className="mt-2 text-slate-600">Modern investors demand more than just a platform; they want a partner. A staggering majority are ready to switch providers to get AI-driven, contextualized advice.</p>
                <div className="mt-6 grid grid-cols-2 gap-4 text-center">
                  <div>
                    <span className="block text-4xl font-bold text-emerald-500 stat-counter" data-target="52">0</span>
                    <span className="block mt-1 text-slate-500">prioritize financial wellness</span>
                  </div>
                  <div>
                    <span className="block text-4xl font-bold text-emerald-500 stat-counter" data-target="70">0</span>
                    <span className="block mt-1 text-slate-500">want personalized insights</span>
                  </div>
                </div>
              </div>
              <div className="p-6 rounded-lg">
                <h3 className="text-center text-xl font-semibold text-slate-800 mb-4">Consumer Demand for AI-Driven Insights</h3>
                <div className="chart-container">
                  <Chart type="doughnut" data={demandChartData} options={demandChartOptions} />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="problem" className="py-16 scroll-mt-20">
          <div className="text-center">
            <h2 className="text-base font-semibold text-emerald-600 tracking-wide uppercase">The Problem</h2>
            <p className="mt-2 text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">Understanding the "Ambitious Investor"</p>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">Our target users are tech-savvy and goal-oriented, but they face significant hurdles in managing their wealth effectively. The AI Co-Pilot is designed to solve these specific pain points.</p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
              <h4 className="font-bold text-lg text-slate-800">Generic Advice Overload</h4>
              <p className="mt-2 text-slate-600">Standard, non-personalized advice fails to address unique goals and financial habits, leaving users underserved.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
              <h4 className="font-bold text-lg text-slate-800">Financial Complexity</h4>
              <p className="mt-2 text-slate-600">Users find it difficult to understand complex products like PMS and private assets, creating a barrier to entry.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
              <h4 className="font-bold text-lg text-slate-800">Time-Consuming Research</h4>
              <p className="mt-2 text-slate-600">Keeping up with market changes and portfolio optimization is a significant time commitment many cannot afford.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
              <h4 className="font-bold text-lg text-slate-800">Decision Uncertainty</h4>
              <p className="mt-2 text-slate-600">Conflicting goals or lack of clarity often leads to inaction or suboptimal financial choices.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
              <h4 className="font-bold text-lg text-slate-800">Reactive, Not Proactive</h4>
              <p className="mt-2 text-slate-600">Users desire proactive wellness support that goes beyond investing, helping with daily financial health.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
              <h4 className="font-bold text-lg text-slate-800">Onboarding Friction</h4>
              <p className="mt-2 text-slate-600">High abandonment rates in digital onboarding show a clear need for simpler, more guided user experiences.</p>
            </div>
          </div>
        </section>

        <section id="solution" className="py-16 bg-white rounded-2xl shadow-lg scroll-mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-base font-semibold text-emerald-600 tracking-wide uppercase">The Solution</h2>
              <p className="mt-2 text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">Meet the Dezerv AI Financial Co-Pilot</p>
              <p className="mt-4 max-w-3xl mx-auto text-xl text-gray-500">An intelligent financial partner integrated into the Dezerv platform. It leverages three core AI technologies to deliver a hyper-personalized, proactive, and educational experience.</p>
            </div>
            
            <div className="mt-12">
              <div className="bg-slate-100 p-6 rounded-xl">
                <h3 className="text-xl font-bold text-center mb-6 text-slate-800">Illustrative User Journeys</h3>
                <div className="mb-4 flex justify-center space-x-2 md:space-x-4 border-b border-slate-300">
                  <button 
                    onClick={() => handleJourneyTab('health')}
                    className={`flex-1 md:flex-none text-sm md:text-base py-3 px-4 font-medium border-b-2 ${
                      activeJourney === 'health' 
                        ? 'border-emerald-500 text-emerald-600' 
                        : 'border-transparent text-slate-500 hover:border-slate-400'
                    }`}
                  >
                    Proactive Health Check
                  </button>
                  <button 
                    onClick={() => handleJourneyTab('investment')}
                    className={`flex-1 md:flex-none text-sm md:text-base py-3 px-4 font-medium border-b-2 ${
                      activeJourney === 'investment' 
                        ? 'border-emerald-500 text-emerald-600' 
                        : 'border-transparent text-slate-500 hover:border-slate-400'
                    }`}
                  >
                    Investment Opportunity
                  </button>
                  <button 
                    onClick={() => handleJourneyTab('query')}
                    className={`flex-1 md:flex-none text-sm md:text-base py-3 px-4 font-medium border-b-2 ${
                      activeJourney === 'query' 
                        ? 'border-emerald-500 text-emerald-600' 
                        : 'border-transparent text-slate-500 hover:border-slate-400'
                    }`}
                  >
                    Complex Query
                  </button>
                </div>

                <div className="min-h-[200px] p-4">
                  {activeJourney === 'health' && (
                    <div>
                      <p className="text-center text-slate-600">"As an investor, I want proactive alerts on my budget so I can stay on track with my savings goals."</p>
                      <div className="mt-4 space-y-3">
                        <div className="flex items-start"><span className="mr-3 text-emerald-500 font-bold">1.</span> User receives a push notification: "AI Co-Pilot: Your spending is trending high. We have suggestions to keep you on track for your Q3 goal."</div>
                        <div className="flex items-start"><span className="mr-3 text-emerald-500 font-bold">2.</span> User opens the app and enters a chat with the Co-Pilot.</div>
                        <div className="flex items-start"><span className="mr-3 text-emerald-500 font-bold">3.</span> The AI provides actionable tips, like reducing discretionary spending by a specific amount.</div>
                      </div>
                    </div>
                  )}
                  {activeJourney === 'investment' && (
                    <div>
                      <p className="text-center text-slate-600">"As an investor, I want to know about relevant market opportunities that fit my profile."</p>
                      <div className="mt-4 space-y-3">
                        <div className="flex items-start"><span className="mr-3 text-emerald-500 font-bold">1.</span> AI Co-Pilot surfaces a notification in-app: "Market analysis shows a buying opportunity that fits your growth profile."</div>
                        <div className="flex items-start"><span className="mr-3 text-emerald-500 font-bold">2.</span> AI asks: "Would you like to explore relevant Dezerv funds?"</div>
                        <div className="flex items-start"><span className="mr-3 text-emerald-500 font-bold">3.</span> User engages, gets a clear explanation of risks and products, and can choose to invest directly.</div>
                      </div>
                    </div>
                  )}
                  {activeJourney === 'query' && (
                    <div>
                      <p className="text-center text-slate-600">"As an investor, I want to understand complex market events and their impact on my portfolio."</p>
                      <div className="mt-4 space-y-3">
                        <div className="flex items-start"><span className="mr-3 text-emerald-500 font-bold">1.</span> User types into chat: "Explain how rising interest rates affect my bonds."</div>
                        <div className="flex items-start"><span className="mr-3 text-emerald-500 font-bold">2.</span> The Co-Pilot provides a concise explanation tailored to the user's actual bond holdings.</div>
                        <div className="flex items-start"><span className="mr-3 text-emerald-500 font-bold">3.</span> The AI suggests relevant actions or connects the user with a human advisor for a deeper dive.</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="impact" className="py-16 scroll-mt-20">
          <div className="text-center">
            <h2 className="text-base font-semibold text-emerald-600 tracking-wide uppercase">The Impact</h2>
            <p className="mt-2 text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">Driving Quantifiable Value</p>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">The AI Co-Pilot is not just a feature; it's a growth engine. It is projected to deliver significant, measurable improvements across our most critical business metrics.</p>
          </div>
          <div className="mt-12 bg-white rounded-lg shadow-lg p-6 md:p-8">
            <h3 className="text-xl font-bold text-center text-slate-800 mb-6">Expected KPI Improvements</h3>
            <div className="kpi-chart-container">
              <Chart type="bar" data={kpiChartData} options={kpiChartOptions} />
            </div>
          </div>
        </section>

        <section id="roadmap" className="py-16 bg-white rounded-2xl shadow-lg scroll-mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-base font-semibold text-emerald-600 tracking-wide uppercase">The Roadmap</h2>
              <p className="mt-2 text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">A Phased Path to Innovation</p>
              <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">We will deliver the AI Co-Pilot through a disciplined, phased approach, ensuring rapid value delivery while mitigating risks and gathering user feedback.</p>
            </div>
            <div className="mt-12 max-w-3xl mx-auto">
              <div className="relative pl-12 timeline">
                <div className="mb-10 relative">
                  <div className="phase-card bg-slate-100 p-6 rounded-lg shadow-sm">
                    <p className="text-sm font-semibold text-emerald-600">Months 1-3</p>
                    <h4 className="font-bold text-lg mt-1 text-slate-800">Phase 1: Foundation & Core LLM</h4>
                    <p className="mt-2 text-slate-600">Establish data infrastructure, integrate a core LLM for basic Q&A, and design initial conversational flows.</p>
                  </div>
                </div>
                <div className="mb-10 relative">
                  <div className="phase-card bg-slate-100 p-6 rounded-lg shadow-sm">
                    <p className="text-sm font-semibold text-emerald-600">Months 4-7</p>
                    <h4 className="font-bold text-lg mt-1 text-slate-800">Phase 2: Predictive Insights & Basic Recs</h4>
                    <p className="mt-2 text-slate-600">Develop predictive models for financial health alerts and launch a basic recommendation engine for a pilot user group.</p>
                  </div>
                </div>
                <div className="mb-10 relative">
                  <div className="phase-card bg-slate-100 p-6 rounded-lg shadow-sm">
                    <p className="text-sm font-semibold text-emerald-600">Months 8-12</p>
                    <h4 className="font-bold text-lg mt-1 text-slate-800">Phase 3: Advanced Personalization</h4>
                    <p className="mt-2 text-slate-600">Enhance recommendations to include PMS/private assets, develop portfolio optimization tools, and begin a wider rollout.</p>
                  </div>
                </div>
                <div className="relative">
                  <div className="phase-card bg-slate-100 p-6 rounded-lg shadow-sm">
                    <p className="text-sm font-semibold text-emerald-600">Ongoing</p>
                    <h4 className="font-bold text-lg mt-1 text-slate-800">Phase 4: Continuous Learning</h4>
                    <p className="mt-2 text-slate-600">Establish MLOps for continuous model improvement, integrate external data, and expand features based on user feedback.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="bg-slate-800 text-white">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold tracking-tight">Lead the Future of Wealth Management</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-300">
            By investing in the AI Financial Co-Pilot, Dezerv will not just follow the market — it will define the next generation of wealth technology, creating a powerful, sustainable competitive advantage.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
