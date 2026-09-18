import { useState, useEffect } from 'react';
import { 
  CheckCircle2, Play, BookOpen, BarChart2, TrendingUp, MonitorPlay, 
  ChevronDown, ChevronUp, Star, Users, User, Briefcase, Zap, Shield, HelpCircle 
} from 'lucide-react';
import api from '../api/client';
import usePayment from '../hooks/usePayment';

export default function OnlineClasses() {
  const [products, setProducts] = useState([]);
  const { handlePayment, loadingId } = usePayment();
  const [activeFaq, setActiveFaq] = useState(null);
  const [activeModule, setActiveModule] = useState(0);

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
  const getProductId = (name) => products.find(p => p.name === name)?._id || null;

  const handleSubscribe = (name) => {
    const product = products.find(p => p.name === name);
    if(product) handlePayment(product._id);
  };

  const courseTitle = "Stock Market Online Class";

  const syllabus = [
    { title: "01 — Technical Analysis Basics", desc: "Introduction to candles, timeframes, and market structuring." },
    { title: "02 — Technical Analysis vs Fundamental Analysis", desc: "Understanding the difference and when to use which approach." },
    { title: "03 — Chart Patterns", desc: "Mastering breakouts, reversals, and continuation patterns." },
    { title: "04 — Indicators & Tools", desc: "RSI, MACD, Moving Averages, and Volume analysis." },
    { title: "05 — Risk Management", desc: "Position sizing, stop-loss trailing, and capital preservation." }
  ];

  const faqs = [
    { q: "What is included in the online class?", a: "You get access to comprehensive modules covering technical analysis, risk management, and chart patterns, plus lifetime access to the materials." },
    { q: "How does Razorpay payment work?", a: "Razorpay offers a secure checkout experience supporting UPI, Cards, and Netbanking. Your payment is instantly verified by our backend." },
    { q: "When will I get access?", a: "Access is granted automatically immediately after your payment is verified successfully." },
    { q: "How can I access my course?", a: "Once enrolled, simply navigate to your Dashboard and click on 'My Course'." },
    { q: "What payment methods are supported?", a: "We support UPI (GPay, PhonePe, Paytm), all major Credit/Debit cards, and Netbanking." }
  ];

  return (
    <div className="bg-[#07101E] min-h-screen text-white font-sans selection:bg-brand-blue/30 selection:text-white">
      
      {/* 1. HERO SECTION */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-blue/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand-green/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-green/10 text-brand-green rounded-full font-bold text-sm mb-6 border border-brand-green/20 ring-1 ring-brand-green/30">
                <MonitorPlay size={16} /> Premium Online Education
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight tracking-tight">
                Make Smarter Moves in the Stock Market
              </h1>
              <p className="text-xl text-text-muted mb-8 leading-relaxed">
                Professional equity insights and practical technical-analysis education designed to help you understand the market and make informed decisions.
              </p>
              
              <div className="flex flex-wrap items-center gap-6 mb-10">
                <div className="flex flex-col">
                  <span className="text-4xl font-black text-white">₹{getProductPrice(courseTitle)}</span>
                  <span className="text-lg text-text-muted line-through">₹{getProductOriginalPrice(courseTitle)}</span>
                </div>
                <div className="bg-brand-green/20 border border-brand-green text-brand-green px-4 py-2 rounded-lg font-black text-lg shadow-[0_0_15px_rgba(34,197,94,0.2)] transform -rotate-2">
                  50% OFF
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button onClick={() => handleSubscribe(courseTitle)} disabled={loadingId === getProductId(courseTitle)} className="px-8 py-4 bg-brand-blue hover:bg-blue-600 text-white font-bold rounded-xl transition-all shadow-xl shadow-brand-blue/20 flex justify-center items-center gap-2 text-lg">
                  {loadingId === getProductId(courseTitle) ? 'Processing...' : 'Enroll Now'} <Play size={20} fill="currentColor" />
                </button>
                <a href="#syllabus" className="px-8 py-4 bg-navy-800 hover:bg-navy-700 text-white font-bold rounded-xl transition-all border border-navy-700 flex justify-center items-center gap-2 text-lg">
                  View Syllabus
                </a>
              </div>
            </div>

            {/* Dashboard Visual Hero */}
            <div className="relative group perspective-1000">
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-blue/20 to-brand-green/20 rounded-3xl blur-2xl opacity-70 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative glass-card p-2 rounded-3xl border border-navy-700/50 shadow-2xl overflow-hidden transform transition-transform duration-700 hover:rotate-y-2 hover:rotate-x-2">
                 <div className="bg-navy-900 rounded-2xl overflow-hidden border border-navy-800">
                   <div className="bg-navy-800 px-4 py-3 border-b border-navy-700 flex gap-2">
                     <div className="w-3 h-3 rounded-full bg-red-400"></div>
                     <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                     <div className="w-3 h-3 rounded-full bg-green-400"></div>
                   </div>
                   <div className="aspect-video bg-navy-900 relative flex items-center justify-center cursor-pointer overflow-hidden group/video">
                      <div className="absolute inset-0 bg-black/40 group-hover/video:bg-black/20 transition-all z-10"></div>
                      <div className="w-20 h-20 bg-brand-blue/90 rounded-full flex items-center justify-center pl-2 z-20 shadow-[0_0_30px_rgba(59,130,246,0.5)] group-hover/video:scale-110 transition-transform duration-300">
                        <Play size={32} fill="white" className="text-white" />
                      </div>
                      <div className="absolute opacity-30 pointer-events-none w-full h-full flex flex-col justify-end bottom-0 left-0 pt-10">
                         <TrendingUp size={400} className="text-brand-blue -mb-20 object-cover" />
                      </div>
                   </div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. ABOUT THE COURSE */}
      <section className="py-20 bg-navy-900/50 border-y border-navy-800 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-6">About the Course</h2>
            <p className="text-xl text-text-muted leading-relaxed">
              Learn technical analysis from basic to advanced concepts with a structured approach designed for practical market understanding.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {["Technical Analysis", "Basic to Advanced", "Tech vs Fundamental Analysis", "Chart Patterns", "Indicators & Tools", "Risk Management"].map((topic, i) => (
              <div key={i} className="glass-card p-6 border border-navy-700 flex items-center gap-4 hover-glass group">
                <div className="w-10 h-10 bg-brand-green/10 text-brand-green rounded-lg flex items-center justify-center group-hover:bg-brand-green group-hover:text-navy-900 transition-colors">
                  <CheckCircle2 size={24} />
                </div>
                <span className="text-lg font-bold text-white tracking-wide">{topic}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. WHO SHOULD JOIN */}
      <section className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">Who Is This Course For?</h2>
            <p className="text-text-muted text-lg">Perfectly calibrated for everyone from novices to structured learners.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
             <div className="glass-card p-8 border border-navy-700 hover-glass text-center">
                <div className="w-16 h-16 bg-navy-800 rounded-2xl flex items-center justify-center mx-auto mb-6 text-brand-blue">
                  <Users size={32} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Beginners</h3>
                <p className="text-text-muted">Start your journey with zero prior experience required.</p>
             </div>
             
             <div className="glass-card p-8 border border-brand-blue/30 shadow-[0_0_20px_rgba(59,130,246,0.1)] relative text-center transform md:-translate-y-4">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-brand-blue text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Most Popular</div>
                <div className="w-16 h-16 bg-brand-blue/20 rounded-2xl flex items-center justify-center mx-auto mb-6 text-brand-blue">
                  <BarChart2 size={32} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Technical Learners</h3>
                <p className="text-text-muted">Traders explicitly aiming to master chart reading and indicators.</p>
             </div>
             
             <div className="glass-card p-8 border border-navy-700 hover-glass text-center">
                <div className="w-16 h-16 bg-navy-800 rounded-2xl flex items-center justify-center mx-auto mb-6 text-brand-blue">
                  <Briefcase size={32} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Risk Managers</h3>
                <p className="text-text-muted">Those looking for structured risk management logic.</p>
             </div>
          </div>
        </div>
      </section>

      {/* 4. SYLLABUS ACCORDION */}
      <section id="syllabus" className="py-20 bg-[#0A1628] border-y border-navy-800 relative z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">Course Syllabus</h2>
            <p className="text-text-muted text-lg">A sneak peek into the structured curriculum.</p>
          </div>
          
          <div className="space-y-4">
            {syllabus.map((mod, i) => (
              <div key={i} className="glass-card border border-navy-700 overflow-hidden">
                <button 
                  onClick={() => setActiveModule(activeModule === i ? null : i)}
                  className="w-full text-left px-6 py-5 flex items-center justify-between focus:outline-none hover:bg-navy-800/50 transition-colors"
                >
                  <span className="font-bold text-lg md:text-xl text-white">{mod.title}</span>
                  {activeModule === i ? <ChevronUp className="text-brand-blue" /> : <ChevronDown className="text-text-muted" />}
                </button>
                {activeModule === i && (
                  <div className="px-6 pb-6 pt-2 text-text-muted border-t border-navy-700/50">
                    <p className="leading-relaxed">{mod.desc}</p>
                    <div className="mt-4 flex gap-4">
                       <span className="text-xs bg-navy-800 px-3 py-1.5 rounded-md font-medium flex items-center gap-2"><Play size={12} fill="currentColor"/> Video Lesson</span>
                       <span className="text-xs bg-navy-800 px-3 py-1.5 rounded-md font-medium flex items-center gap-2"><BookOpen size={12}/> Study Material</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. WHY KK WEALTH & HIGHLIGHTS */}
      <section className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">Why KK Wealth?</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
             <HighlightCard icon={<Zap />} title="Structured Learning" desc="Step-by-step methodologies mapping out the complex market logic." />
             <HighlightCard icon={<TrendingUp />} title="Practical Understanding" desc="Real-world case studies overriding purely theoretical fluff." />
             <HighlightCard icon={<Shield />} title="Risk Awareness" desc="Capital protection frameworks embedded into every lesson." />
          </div>
        </div>
      </section>

      {/* 6. MEET THE INSTRUCTOR */}
      <section className="py-20 bg-navy-900 border-y border-navy-800 relative z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="glass-card border border-brand-blue/20 p-8 md:p-12 overflow-hidden relative">
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-brand-blue/10 rounded-full blur-3xl"></div>
              <div className="grid md:grid-cols-[1fr,2fr] gap-8 items-center relative z-10">
                 {/* Fake Placeholder Image */}
                 <div className="aspect-square bg-navy-800 rounded-3xl border border-navy-700 shadow-xl overflow-hidden flex items-end justify-center pt-8 px-4">
                    <div className="w-full h-full bg-gradient-to-t from-navy-900 to-transparent absolute bottom-0 left-0 z-10"></div>
                    <User size={200} className="text-navy-700 relative z-0" />
                 </div>
                 
                 <div>
                    <h2 className="text-3xl md:text-5xl font-black text-white mb-2">Meet Krishan Kumhar</h2>
                    <h3 className="text-xl text-brand-blue font-bold tracking-widest uppercase mb-6">Founder — KK Wealth</h3>
                    <p className="text-text-muted text-lg leading-relaxed mb-8">
                      Navigate finance and investing confidently. Learn structural investment strategies, wealth management, and risk-checked financial planning. Make informed choices in the world of finance through actionable market insights and practical knowledge.
                    </p>
                    <div className="flex gap-4">
                       <span className="glass-card px-4 py-2 border border-navy-700 rounded-lg text-sm font-bold flex items-center gap-2 text-white">
                         <Star className="text-yellow-400" fill="currentColor" size={16} /> Premium Educator
                       </span>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* 7. HOW IT WORKS */}
      <section className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">How It Works</h2>
            <p className="text-text-muted text-lg">Four simple steps to transform your trading journey.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
             <div className="hidden md:block absolute top-12 left-1/2 -translate-x-1/2 w-[70%] border-t-2 border-dashed border-navy-700 z-0"></div>
             
             {[
               { no: '01', title: 'Choose Your Plan', desc: 'Select the online class or advisory package.' },
               { no: '02', title: 'Register / Login', desc: 'Securely create your account with OTP.' },
               { no: '03', title: 'Complete Payment', desc: 'Check out securely via Razorpay.' },
               { no: '04', title: 'Get Access', desc: 'Instant access to your dashboard.' }
             ].map((step, i) => (
                <div key={i} className="relative z-10 flex flex-col items-center text-center">
                  <div className="w-24 h-24 bg-navy-900 border-4 border-navy-800 rounded-full flex items-center justify-center text-3xl font-black text-brand-blue mb-6 shadow-[0_0_20px_rgba(59,130,246,0.15)] group hover:border-brand-blue transition-colors">
                    {step.no}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-text-muted">{step.desc}</p>
                </div>
             ))}
          </div>
        </div>
      </section>

      {/* 8. TESTIMONIALS (Placeholders) */}
      <section className="py-20 bg-navy-900 border-y border-navy-800 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">Reviews and Testimonials</h2>
            <p className="text-text-muted text-lg">See what our community has to say.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
             {[1, 2, 3].map(i => (
                <div key={i} className="glass-card p-8 border border-navy-700 text-left relative hover-glass">
                   <div className="flex gap-1 mb-4">
                     {[1,2,3,4,5].map(s => <Star key={s} size={16} className="text-yellow-400" fill="currentColor" />)}
                   </div>
                   <p className="text-white leading-relaxed mb-6 italic">" [Placeholder Testimonial Text. This will be replaced by genuine customer feedback highlighting practical structuring and risk management.] "</p>
                   <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-navy-800 rounded-full border border-navy-700"></div>
                      <div>
                         <p className="text-white font-bold text-sm">Customer Name</p>
                         <p className="text-text-muted text-xs">Student</p>
                      </div>
                   </div>
                </div>
             ))}
          </div>
        </div>
      </section>

      {/* 9. FAQ ACCORDION */}
      <section className="py-24 relative z-10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">Frequently Asked Questions</h2>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="glass-card border border-navy-700 overflow-hidden">
                <button 
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                  className="w-full text-left px-6 py-5 flex items-center justify-between focus:outline-none hover:bg-navy-800/50 transition-colors"
                >
                  <span className="font-bold text-lg text-white pr-4">{faq.q}</span>
                  {activeFaq === i ? <ChevronUp className="text-brand-blue flex-shrink-0" /> : <ChevronDown className="text-text-muted flex-shrink-0" />}
                </button>
                {activeFaq === i && (
                  <div className="px-6 pb-6 pt-2 text-text-muted border-t border-navy-700/50">
                    <p className="leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* 10. DISCLAIMER */}
      <section className="py-8 bg-navy-900 border-t border-navy-800 relative z-10 text-center">
         <div className="max-w-4xl mx-auto px-4 text-text-muted text-sm flex items-center justify-center gap-3">
            <HelpCircle size={18} className="text-brand-red flex-shrink-0" />
            <p><strong>Disclaimer:</strong> Investments in securities market are subject to market risks, read all the related documents carefully before investing.</p>
         </div>
      </section>

      {/* 11. FINAL CTA */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-brand-blue/10 pointer-events-none"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-8">Ready to Learn and Make Smarter Market Decisions?</h2>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => handleSubscribe(courseTitle)} disabled={loadingId === getProductId(courseTitle)} className="px-10 py-4 bg-brand-blue hover:bg-blue-600 text-white font-bold rounded-xl transition-all shadow-xl shadow-brand-blue/20 flex justify-center items-center gap-2 text-lg">
              {loadingId === getProductId(courseTitle) ? 'Processing...' : 'Enroll Now'} <Play size={20} fill="currentColor" />
            </button>
            <a href="/advisory" className="px-10 py-4 bg-navy-800 hover:bg-navy-700 text-white font-bold rounded-xl transition-all border border-navy-700 flex justify-center items-center gap-2 text-lg">
              Explore Advisory
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}

function HighlightCard({ icon, title, desc }) {
  return (
    <div className="glass-card p-8 border border-navy-700 hover-glass group transition-all">
       <div className="w-14 h-14 bg-navy-800 rounded-xl flex items-center justify-center text-brand-blue mb-6 border border-navy-700 group-hover:bg-brand-blue group-hover:text-white transition-colors shadow-lg">
         {icon}
       </div>
       <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
       <p className="text-text-muted leading-relaxed">{desc}</p>
    </div>
  );
}
