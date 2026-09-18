import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  BarChart2,
  TrendingUp,
  ShieldCheck,
  BookOpen,
  PieChart,
  PlayCircle,
  Target,
  Activity,
  CheckCircle2,
  Users,
  Lightbulb,
  Award
} from 'lucide-react';
import PricingCard from '../components/ui/PricingCard';
import Accordion from '../components/ui/Accordion';
import TestimonialCard from '../components/ui/TestimonialCard';
import api from '../api/client';
import usePayment from '../hooks/usePayment';

export default function Home() {
  const [products, setProducts] = useState([]);
  const { handlePayment, loadingId } = usePayment();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await api.get('/products');
        if (data && data.success) {
          setProducts(data.data);
        }
      } catch (err) {
        console.error('Failed to fetch products', err);
      }
    };
    fetchProducts();
  }, []);

  const getProductPrice = (name) => {
    const product = products.find(p => p.name === name);
    return product && product.sellingPrice ? product.sellingPrice.toLocaleString() : '...';
  };
  const getProductOriginalPrice = (name) => {
    const product = products.find(p => p.name === name);
    return product && product.originalPrice ? product.originalPrice.toLocaleString() : '...';
  };
  const getProductId = (name) => {
    const product = products.find(p => p.name === name);
    return product ? product._id : null;
  };

  const handleSubscribe = (name) => {
    const id = getProductId(name);
    if(id) handlePayment(id);
  };

  const faqItems = [
    {
      title: "What is Equity Advisory Services?",
      content: "Equity Advisory Services provide structured equity market insights with clearly defined entry, exit, target and stop-loss levels. You receive calls based on thorough technical analysis."
    },
    {
      title: "How many advisory calls are provided?",
      content: "We provide 4–7 calls per month depending on market conditions and opportunities."
    },
    {
      title: "What information is included in an advisory call?",
      content: "Each call includes clearly defined Entry, Exit, Target, and Stop Loss levels."
    },
    {
      title: "What is included in the online class?",
      content: "The online class covers Technical Analysis from basic to advanced, Technical vs Fundamental Analysis, Chart Patterns, Indicators & Tools, and Risk Management."
    },
    {
      title: "Who can join the online class?",
      content: "Anyone interested in learning technical analysis, from beginners to experienced traders."
    },
    {
      title: "Is the course focused on technical analysis?",
      content: "Yes. The provided course is entirely focused on understanding technical analysis."
    }
  ];

  const syllabusItems = [
    {
      title: "Module 01 — Technical Analysis Basics",
      content: (
        <ul className="list-disc pl-5 space-y-2">
          <li>Introduction to Technical Analysis</li>
          <li>Understanding price movement</li>
          <li>Charts and timeframes</li>
        </ul>
      )
    },
    {
      title: "Module 02 — Technical vs Fundamental Analysis",
      content: (
        <ul className="list-disc pl-5 space-y-2">
          <li>Technical Analysis</li>
          <li>Fundamental Analysis</li>
          <li>Key differences</li>
          <li>When each approach is used</li>
        </ul>
      )
    },
    {
      title: "Module 03 — Chart Patterns",
      content: (
        <ul className="list-disc pl-5 space-y-2">
          <li>Understanding chart patterns</li>
          <li>Pattern identification</li>
          <li>Practical chart examples</li>
        </ul>
      )
    },
    {
      title: "Module 04 — Indicators & Tools",
      content: (
        <ul className="list-disc pl-5 space-y-2">
          <li>Technical indicators</li>
          <li>Trading tools</li>
          <li>Indicator-based analysis</li>
        </ul>
      )
    },
    {
      title: "Module 05 — Risk Management",
      content: (
        <ul className="list-disc pl-5 space-y-2">
          <li>Risk management basics</li>
          <li>Stop-loss concepts</li>
          <li>Position sizing</li>
          <li>Trading discipline</li>
        </ul>
      )
    }
  ];

  const featuresAdvisory = [
    "4–7 calls per month",
    "Entry",
    "Exit",
    "Target",
    "Stop Loss",
    "Multibagger stock opportunities"
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* ================================================== */}
      {/* 1. HOME HERO SECTION */}
      {/* ================================================== */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[800px] bg-brand-blue/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <span className="inline-block py-1 px-3 rounded-full bg-brand-blue/20 text-brand-blue text-xs font-bold tracking-widest mb-6 uppercase border border-brand-blue/30">
                KK WEALTH
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-6">
                Make Smarter Moves in the <span className="gradient-text">Stock Market</span>
              </h1>
              <p className="text-lg sm:text-xl text-text-muted mb-8 max-w-2xl mx-auto lg:mx-0">
                Professional equity insights and practical technical analysis education designed to help you understand the market and make informed decisions.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <a href="#advisory-pricing" className="w-full sm:w-auto px-8 py-3.5 bg-brand-blue hover:bg-blue-600 text-white font-medium rounded-lg transition-all shadow-lg shadow-brand-blue/20 flex justify-center items-center gap-2">
                  Explore Advisory <ArrowRight size={20} />
                </a>
                <a href="#online-class" className="w-full sm:w-auto px-8 py-3.5 bg-navy-800 border border-navy-700 hover:border-brand-green/30 hover:bg-navy-700 text-white font-medium rounded-lg transition-all flex justify-center items-center gap-2">
                  Join Online Class <PlayCircle size={20} />
                </a>
              </div>
            </div>

            {/* Hero Visual */}
            <div className="relative mt-12 lg:mt-0 px-4 sm:px-0">
              <div className="absolute -inset-1 bg-gradient-to-r from-brand-blue to-brand-green rounded-2xl blur opacity-20 animate-pulse"></div>
              <div className="relative glass-card p-4 sm:p-6 overflow-hidden max-w-md mx-auto lg:mx-0">
                <div className="flex justify-between items-center mb-6 border-b border-navy-700/50 pb-4">
                  <div>
                    <h3 className="text-white font-medium text-sm sm:text-base">NIFTY 50</h3>
                    <p className="text-xl sm:text-2xl font-bold text-brand-green flex items-center gap-2 mt-1">
                      22,419.55 <TrendingUp size={18} />
                    </p>
                  </div>
                  <div className="text-right">
                    <h3 className="text-text-muted text-xs sm:text-sm">Action</h3>
                    <div className="bg-brand-blue/20 text-brand-blue px-3 py-1 rounded text-xs font-bold mt-1 inline-block uppercase">Wait & Watch</div>
                  </div>
                </div>
                
                {/* Candlestick visual representation */}
                <div className="h-40 flex items-end justify-between gap-1 sm:gap-2 mb-4 relative">
                  <div className="absolute top-1/2 left-0 w-full border-t border-dashed border-gray-500/30 z-0"></div>
                  <div className="absolute top-1/4 left-0 w-full border-t border-dashed border-brand-green/30 z-0"></div>
                  {[40, 50, 45, 60, 55, 70, 65, 80, 75, 90].map((h, i) => (
                    <div key={i} className="flex flex-col items-center justify-end w-full h-full relative z-10 group">
                      {/* Candlestick wick */}
                      <div className="w-[1px] bg-brand-green/50 absolute bottom-0 h-full max-h-[90%]"></div>
                      {/* Candlestick body */}
                      <div className={`w-[80%] rounded-sm ${i % 2 === 0 ? 'bg-brand-blue/80' : 'bg-brand-green/80'}`} style={{ height: `${h}%` }}></div>
                    </div>
                  ))}
                  <div className="absolute top-[10%] right-0 bg-brand-green text-navy-900 text-[10px] font-bold px-2 py-0.5 rounded z-20 shadow-lg">Target</div>
                  <div className="absolute top-[60%] left-[20%] bg-brand-blue text-white text-[10px] font-bold px-2 py-0.5 rounded z-20 shadow-lg">Entry</div>
                  <div className="absolute bottom-[5%] left-[40%] bg-red-400 text-navy-900 text-[10px] font-bold px-2 py-0.5 rounded z-20 shadow-lg">Stop Loss</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================== */}
      {/* 2. PRODUCT SECTION (Our Services) */}
      {/* ================================================== */}
      <section className="py-20 bg-navy-900 relative border-t border-navy-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-sm font-bold text-brand-blue tracking-widest uppercase mb-2">Our Services</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">Choose the service that fits your market journey.</h3>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
            {/* Service 1 */}
            <div className="glass-card hover:border-brand-blue/30 transition-all p-8 md:p-10 text-center flex flex-col items-center">
              <div className="w-20 h-20 bg-navy-900 border border-navy-700 rounded-full flex items-center justify-center mb-6 text-brand-blue">
                <Target size={40} />
              </div>
              <h4 className="text-2xl font-bold text-white mb-4">Equity Advisory Services</h4>
              <p className="text-text-muted mb-8">Get structured equity market insights with clearly defined entry, exit, target and stop-loss levels.</p>
              <a href="#advisory-pricing" className="mt-auto px-8 py-3 bg-navy-700 hover:bg-navy-600 text-white rounded-lg font-medium transition-all w-full md:w-auto">
                View Plans
              </a>
            </div>
            {/* Service 2 */}
            <div className="glass-card hover:border-brand-green/30 transition-all p-8 md:p-10 text-center flex flex-col items-center">
              <div className="w-20 h-20 bg-navy-900 border border-navy-700 rounded-full flex items-center justify-center mb-6 text-brand-green">
                <BookOpen size={40} />
              </div>
              <h4 className="text-2xl font-bold text-white mb-4">Stock Market Online Class</h4>
              <p className="text-text-muted mb-8">Learn Technical Analysis from Basic to Advanced level through a structured and practical learning experience.</p>
              <a href="#online-class" className="mt-auto px-8 py-3 bg-navy-700 hover:bg-navy-600 text-white rounded-lg font-medium transition-all w-full md:w-auto">
                Course Details
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================== */}
      {/* 3. PRODUCT 1 — EQUITY ADVISORY SERVICES */}
      {/* ================================================== */}
      <section id="advisory-pricing" className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-4">Equity Advisory Services</h2>
            <p className="text-xl text-text-muted">
              Get structured equity market insights with clearly defined entry, exit, target and stop-loss levels.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto items-center">
            <PricingCard title="MONTHLY PLAN" price={getProductPrice("Monthly Advisory")} features={featuresAdvisory} onClick={() => handleSubscribe("Monthly Advisory")} loading={loadingId === getProductId("Monthly Advisory")} />
            <PricingCard title="QUARTERLY PLAN" price={getProductPrice("Quarterly Advisory")} features={featuresAdvisory} recommended onClick={() => handleSubscribe("Quarterly Advisory")} loading={loadingId === getProductId("Quarterly Advisory")} />
            <PricingCard title="YEARLY PLAN" price={getProductPrice("Yearly Advisory")} features={featuresAdvisory} bestValue onClick={() => handleSubscribe("Yearly Advisory")} loading={loadingId === getProductId("Yearly Advisory")} />
          </div>
        </div>
      </section>

      {/* ================================================== */}
      {/* 4. ADVISORY BENEFITS */}
      {/* ================================================== */}
      <section className="py-20 bg-navy-800/30 border-y border-navy-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">What You Get With KK Wealth Advisory</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <BenefitCard icon={<Target />} title="Entry Levels" desc="Clearly present the planned entry level for an advisory call." />
            <BenefitCard icon={<ArrowRight />} title="Exit Levels" desc="Define the planned exit approach." />
            <BenefitCard icon={<TrendingUp />} title="Target" desc="Clearly communicate target levels." />
            <BenefitCard icon={<ShieldCheck />} title="Stop Loss" desc="Emphasize disciplined risk management." />
            <BenefitCard icon={<Lightbulb />} title="Market Opportunities" desc="Highlight selected stock opportunities based on the advisory process." />
            <BenefitCard icon={<Activity />} title="Regular Calls" desc="4–7 advisory calls per month." />
          </div>
        </div>
      </section>

      {/* ================================================== */}
      {/* 5. PRODUCT 2 — STOCK MARKET ONLINE CLASS */}
      {/* ================================================== */}
      <section id="online-class" className="py-24 relative overflow-hidden bg-gradient-to-b from-navy-900 to-navy-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-block bg-brand-green/20 text-brand-green px-4 py-1.5 rounded-full text-sm font-bold tracking-widest uppercase mb-6 border border-brand-green/30">
                Premium Course
              </div>
              <h2 className="text-4xl sm:text-5xl font-black text-white mb-6">Stock Market Online Class</h2>
              <p className="text-xl text-text-muted mb-8 leading-relaxed">
                Learn Technical Analysis from Basic to Advanced level through a structured and practical learning experience.
              </p>
              
              <div className="glass-card p-6 inline-block mb-8 border-l-4 border-l-brand-green w-full sm:w-auto">
                <div className="flex flex-col sm:flex-row items-baseline gap-4 mb-2">
                  <span className="text-5xl font-black text-white">₹{getProductPrice("Stock Market Online Class")}/-</span>
                  <span className="text-2xl text-text-muted line-through">₹{getProductOriginalPrice("Stock Market Online Class")}/-</span>
                </div>
                <div className="text-brand-green font-bold text-sm tracking-wider">50% OFF LIMITED TIME</div>
              </div>

              <div>
                <button 
                  onClick={() => handleSubscribe("Stock Market Online Class")}
                  disabled={loadingId === getProductId("Stock Market Online Class")}
                  className="w-full sm:w-auto px-10 py-4 bg-brand-green text-navy-900 hover:bg-green-400 font-bold text-lg rounded-lg transition-all shadow-lg shadow-brand-green/20 inline-block text-center mr-4">
                  {loadingId === getProductId("Stock Market Online Class") ? 'Processing...' : 'Enroll Now'}
                </button>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-video bg-navy-900 rounded-2xl border border-navy-700 shadow-2xl overflow-hidden flex items-center justify-center group relative">
                {/* Placeholder for Video */}
                <div className="absolute inset-0 bg-gradient-to-tr from-brand-blue/20 to-brand-green/20 opacity-50"></div>
                <img src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=1000" alt="Trading class preview" className="object-cover w-full h-full opacity-40 mix-blend-overlay" />
                <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 group-hover:scale-110 transition-transform cursor-pointer z-10 shadow-2xl">
                  <PlayCircle className="text-white" size={40} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================== */}
      {/* 6. COURSE HIGHLIGHTS */}
      {/* ================================================== */}
      <section className="py-24 relative bg-navy-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white">What You Will Learn</h2>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <HighlightNumberCard num="01" title="Technical Analysis Only" desc="Focused entirely on understanding technical analysis." />
            <HighlightNumberCard num="02" title="Basic to Advanced" desc="Start from fundamentals and gradually move towards advanced technical analysis concepts." />
            <HighlightNumberCard num="03" title="Technical vs Fundamental Analysis" desc="Understand the difference between technical and fundamental analysis and where each approach is used." />
            <HighlightNumberCard num="04" title="Chart Patterns" desc="Learn how to identify and understand important chart patterns." />
            <HighlightNumberCard num="05" title="Indicators & Tools" desc="Learn about commonly used technical indicators and analysis tools." />
            <HighlightNumberCard num="06" title="Risk Management" desc="Understand risk management and disciplined trading practices." />
          </div>
        </div>
      </section>

      {/* ================================================== */}
      {/* 7. COURSE SYLLABUS */}
      {/* ================================================== */}
      <section className="py-24 relative bg-navy-800/20 border-y border-navy-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Course Curriculum</h2>
            <p className="text-text-muted">A structured syllabus designed for clarity and practical application.</p>
          </div>
          <Accordion items={syllabusItems} />
        </div>
      </section>

      {/* ================================================== */}
      {/* 8. WHO SHOULD JOIN THIS COURSE? */}
      {/* ================================================== */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white">Who Should Join This Course?</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <AudienceCard text="Beginners who want to understand technical analysis" />
            <AudienceCard text="Traders who want to improve their chart-reading skills" />
            <AudienceCard text="Learners who want to understand technical indicators" />
            <AudienceCard text="People who want to learn risk management" />
            <AudienceCard text="Anyone looking for structured technical-analysis education" />
          </div>
        </div>
      </section>

      {/* ================================================== */}
      {/* 9. WHY KK WEALTH? */}
      {/* ================================================== */}
      <section className="py-24 relative bg-navy-800/40 border-y border-navy-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Why Learn With KK Wealth?</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <FeatureCard 
              title="Structured Learning" 
              desc="Learn technical analysis in a structured manner." 
              icon={<BookOpen size={24} />} 
            />
            <FeatureCard 
              title="Practical Understanding" 
              desc="Understand charts, patterns and indicators." 
              icon={<TrendingUp size={24} />} 
            />
            <FeatureCard 
              title="Risk Awareness" 
              desc="Learn the importance of risk management." 
              icon={<ShieldCheck size={24} />} 
            />
            <FeatureCard 
              title="Easy to Understand" 
              desc="Present complex concepts in a simple and organized way." 
              icon={<Award size={24} />} 
            />
          </div>
        </div>
      </section>

      {/* ================================================== */}
      {/* 10. HOW IT WORKS */}
      {/* ================================================== */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">How It Works</h2>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            <div className="hidden lg:block absolute top-[25%] left-[10%] right-[10%] border-t-2 border-dashed border-navy-600 z-0"></div>
            <StepCard number="01" title="Choose Your Service" desc="Select Equity Advisory or Online Class." />
            <StepCard number="02" title="Complete Registration" desc="Create your account and provide the required details." />
            <StepCard number="03" title="Make Payment" desc="Complete the secure payment process." />
            <StepCard number="04" title="Get Access" desc="Access your selected service/course." />
          </div>
        </div>
      </section>

      {/* ================================================== */}
      {/* 11. OWNER / ABOUT SECTION */}
      {/* ================================================== */}
      <section className="py-24 bg-navy-800/40 relative border-y border-navy-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1 relative">
              <div className="aspect-square bg-navy-900 rounded-3xl border border-navy-700 overflow-hidden relative shadow-2xl">
                <img src="/founder.jpg" alt="Krishan kumhar" className="object-cover w-full h-full opacity-80" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-transparent to-transparent"></div>
              </div>
              <div className="absolute -bottom-6 -right-6 bg-brand-blue p-6 rounded-2xl shadow-xl hidden sm:block">
                <p className="text-white font-bold text-2xl mb-1">Founder</p>
                <p className="text-white/80">KK Wealth</p>
              </div>
            </div>
            <div className="order-1 md:order-2 text-center md:text-left">
              <h2 className="text-4xl sm:text-5xl font-black text-white mb-2">Meet Krishan kumhar</h2>
              <p className="text-brand-blue font-medium text-lg mb-4">Founder — KK Wealth</p>
              
              <div className="flex flex-col gap-2 mb-8 text-white/80">
                <a href="mailto:krishankumhar7300@gmail.com" className="flex items-center gap-2 justify-center md:justify-start hover:text-brand-blue transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                  krishankumhar7300@gmail.com
                </a>
                <a href="tel:7300285537" className="flex items-center gap-2 justify-center md:justify-start hover:text-brand-blue transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  7300285537
                </a>
              </div>

              <p className="text-lg text-text-muted leading-relaxed mb-8">
                KK Wealth is focused on providing structured equity market insights and stock market education. The platform aims to help learners and investors better understand technical analysis, market concepts and disciplined risk management.
              </p>
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <div className="bg-navy-900 px-4 py-2 border border-navy-700 rounded-md text-sm text-white/70">Experience: [Placeholder]</div>
                <div className="bg-navy-900 px-4 py-2 border border-navy-700 rounded-md text-sm text-white/70">Certifications: [Placeholder]</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================== */}
      {/* 12. TESTIMONIALS */}
      {/* ================================================== */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white">Client Testimonials</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <TestimonialCard 
              content="Add verified client feedback here. [Placeholder for real testimonials during production]"
              author="User A" 
              role="Student / Advisory Client"
            />
            <TestimonialCard 
              content="Add verified client feedback here. [Placeholder for real testimonials during production]"
              author="User B" 
              role="Student / Advisory Client"
            />
             <TestimonialCard 
              content="Add verified client feedback here. [Placeholder for real testimonials during production]"
              author="User C" 
              role="Student / Advisory Client"
            />
          </div>
        </div>
      </section>

      {/* ================================================== */}
      {/* 13. FAQ SECTION */}
      {/* ================================================== */}
      <section id="faq" className="py-24 relative bg-navy-800/20 border-t border-navy-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Frequently Asked Questions</h2>
          </div>
          <Accordion items={faqItems} />
        </div>
      </section>

      {/* ================================================== */}
      {/* 14. FINAL CTA & DISCLAIMER */}
      {/* ================================================== */}
      <section className="py-24 relative overflow-hidden bg-brand-blue">
        {/* Background elements */}
        <div className="absolute inset-0 pattern-dots text-white/10 opacity-30"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-6">Ready to Learn & Understand the Market Better?</h2>
          <p className="text-xl text-white/90 mb-10">
            Explore KK Wealth Advisory Services and start your technical analysis learning journey.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <a href="#advisory-pricing" className="w-full sm:w-auto px-8 py-3.5 bg-navy-900 hover:bg-navy-800 text-white font-bold rounded-lg transition-all shadow-lg flex justify-center items-center gap-2">
              Explore Advisory
            </a>
            <a href="#online-class" className="w-full sm:w-auto px-8 py-3.5 bg-transparent border border-white hover:bg-white/10 text-white font-bold rounded-lg transition-all flex justify-center items-center gap-2">
              Join Online Class
            </a>
          </div>

          <div className="p-6 bg-navy-900/40 rounded-xl border border-white/20 backdrop-blur-sm text-left">
            <div className="flex items-start gap-4">
              <ShieldCheck className="text-white flex-shrink-0 mt-1" size={24} />
              <div>
                <p className="text-white/90 text-sm font-bold uppercase tracking-wider mb-2">Disclaimer</p>
                <p className="text-white/80 text-sm mb-4 leading-relaxed">
                  “Investments in securities market are subject to market risks, read all the related documents carefully before investing.”
                </p>
                <p className="text-white/80 text-sm leading-relaxed">
                  <span className="font-bold">Educational Disclaimer:</span> The online class is educational in nature and should not be presented as a guarantee of profits or returns. We do not provide guaranteed returns, guaranteed profits, guaranteed multibagger returns, 100% accuracy, or risk-free trading.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// Subcomponents

function BenefitCard({ icon, title, desc }) {
  return (
    <div className="glass-card hover:-translate-y-1 p-6 transition-all group flex flex-col items-start text-left">
      <div className="w-12 h-12 bg-navy-900 border border-navy-700 rounded-xl flex items-center justify-center mb-4 text-brand-blue group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-sm text-text-muted">{desc}</p>
    </div>
  );
}

function HighlightNumberCard({ num, title, desc }) {
  return (
    <div className="p-8 bg-navy-800/40 border border-navy-700 rounded-2xl hover:border-brand-blue/30 transition-all flex flex-col group">
      <span className="text-5xl font-black text-navy-600/50 mb-4 group-hover:text-brand-blue/20 transition-colors uppercase">{num}</span>
      <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
      <p className="text-text-muted">{desc}</p>
    </div>
  );
}

function AudienceCard({ text }) {
  return (
    <div className="flex items-start gap-4 p-6 glass-card hover:bg-navy-800/60 transition-all rounded-xl">
      <CheckCircle2 className="text-brand-green flex-shrink-0 mt-1" size={24} />
      <span className="text-white font-medium">{text}</span>
    </div>
  );
}

function FeatureCard({ title, desc, icon }) {
  return (
    <div className="p-8 border border-navy-700/50 bg-navy-800/40 rounded-2xl hover:border-brand-green/30 hover:bg-navy-800/80 transition-all flex flex-col sm:flex-row gap-6 group">
      <div className="flex-shrink-0 w-14 h-14 bg-navy-900 rounded-xl flex items-center justify-center text-brand-green border border-navy-700 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <div>
        <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
        <p className="text-text-muted leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}

function StepCard({ number, title, desc }) {
  return (
    <div className="relative z-10 group p-6 rounded-2xl bg-navy-900 border border-navy-700 hover:border-brand-blue/50 transition-all shadow-xl">
      <div className="text-6xl font-black text-navy-800/80 mb-6 transition-colors group-hover:text-brand-blue/10">{number}</div>
      <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
      <p className="text-text-muted">{desc}</p>
    </div>
  );
}
