import { useState, useEffect } from 'react';
import { 
  CheckCircle2, TrendingUp, Target, Shield, AlertTriangle, PhoneCall, 
  ChevronDown, ChevronUp, Star, Play, HelpCircle
} from 'lucide-react';
import api from '../api/client';
import usePayment from '../hooks/usePayment';

export default function Advisory() {
  const [products, setProducts] = useState([]);
  const { handlePayment, loading } = usePayment();
  const [activeFaq, setActiveFaq] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await api.get('/products');
        if (data && data.success) {
          setProducts(data.data.filter(p => p.productType === 'Advisory' || p.type === 'advisory'));
        }
      } catch (err) {
        console.error('Failed to fetch products', err);
      }
    };
    fetchProducts();
  }, []);

  const getProduct = (name) => products.find(p => p.name === name) || {};

  const handleSubscribe = (name) => {
    const product = getProduct(name);
    if(product && product._id) handlePayment(product._id);
  };

  const benefits = [
    { title: "Entry Levels", icon: <TrendingUp />, desc: "Precise numerical levels dictating exact entry zones." },
    { title: "Exit Levels", icon: <CheckCircle2 />, desc: "Clear directions on when to secure profits or exit trades." },
    { title: "Target Levels", icon: <Target />, desc: "Calculated structural targets minimizing greed tracking." },
    { title: "Stop Loss", icon: <Shield />, desc: "Strict risk protocols protecting baseline capital." },
    { title: "Market Opportunities", icon: <Play />, desc: "Momentum alerts derived from live market tracking." },
    { title: "Regular Calls", icon: <PhoneCall />, desc: "4 to 7 highly filtered premium calls structured per month." }
  ];

  const faqs = [
    { q: "What is Equity Advisory?", a: "Equity Advisory is a premium service where we provide you with structured stock market recommendations including exact Entry, Exit, Target, and Stop Loss parameters." },
    { q: "What plans are available?", a: "We offer Monthly (30 days), Quarterly (90 days), and Yearly (365 days) subscriptions to suit your investing horizon." },
    { q: "Can I access advisory calls after subscription expiry?", a: "No, access strictly binds to your active subscription. Once expired, you will lose access until renewed." },
    { q: "What is included in advisory calls?", a: "Each call highlights a specific stock, rationale, entry zone, numerical targets, and rigid stop-loss parameters." }
  ];

  return (
    <div className="bg-[#07101E] min-h-screen text-white font-sans selection:bg-brand-blue/30 selection:text-white">
      
      {/* HERO SECTION */}
      <section className="pt-32 pb-20 relative overflow-hidden text-center">
        <div className="absolute top-0 right-1/2 translate-x-1/2 w-[800px] h-[800px] bg-brand-green/5 rounded-full blur-[120px] pointer-events-none"></div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-blue/10 text-brand-blue rounded-full font-bold text-sm mb-6 border border-brand-blue/20 ring-1 ring-brand-blue/30">
             <Target size={16} /> Premium Advisory
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight tracking-tight">
            Equity Advisory Services
          </h1>
          <p className="text-xl text-text-muted mb-8 leading-relaxed max-w-3xl mx-auto">
            Get structured market insights with Entry, Exit, Target and Stop Loss levels to help you make informed trading and investment decisions.
          </p>
        </div>
      </section>

      {/* PRICING SECTION */}
      <section className="pb-24 relative z-10">
         <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-8 items-end">
               
               {/* Monthly Plan */}
               <div className="glass-card p-8 border border-navy-700 hover-glass flex flex-col justify-between h-full bg-navy-900/40">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">Monthly</h3>
                    <p className="text-text-muted mb-6">30 days of market insights.</p>
                    <div className="mb-8">
                      <span className="text-4xl font-black text-white">₹{getProduct("Monthly Advisory").sellingPrice?.toLocaleString() || '1,999'}</span>
                    </div>
                    <ul className="space-y-4 mb-8">
                      <FeatureList text="4 to 7 calls per month" />
                      <FeatureList text="Entry" />
                      <FeatureList text="Exit" />
                      <FeatureList text="Target" />
                      <FeatureList text="Stop Loss" />
                      <FeatureList text="Multibagger opportunities" />
                    </ul>
                  </div>
                  <button onClick={() => handleSubscribe("Monthly Advisory")} disabled={loading} className="w-full py-4 bg-brand-blue hover:bg-blue-600 text-white font-bold rounded-xl transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-brand-blue/30 disabled:opacity-50 disabled:transform-none">
                    {loading ? 'Processing...' : 'Subscribe Now'}
                  </button>
               </div>

               {/* Quarterly Plan (Recommended) */}
               <div className="glass-card p-8 border-2 border-brand-blue shadow-[0_0_30px_rgba(59,130,246,0.15)] flex flex-col justify-between h-full relative transform md:-translate-y-4 bg-navy-900/60">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-brand-blue text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg">
                    Recommended
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">Quarterly</h3>
                    <p className="text-text-muted mb-6">90 days of structured trading.</p>
                    <div className="mb-8 flex items-baseline gap-2">
                       <span className="text-4xl font-black text-white">₹{getProduct("Quarterly Advisory").sellingPrice?.toLocaleString() || '4,499'}</span>
                       <span className="text-lg text-text-muted line-through">₹{getProduct("Quarterly Advisory").originalPrice?.toLocaleString() || '5,999'}</span>
                    </div>
                    <ul className="space-y-4 mb-8">
                      <FeatureList text="4 to 7 calls per month" />
                      <FeatureList text="Entry" />
                      <FeatureList text="Exit" />
                      <FeatureList text="Target" />
                      <FeatureList text="Stop Loss" />
                      <FeatureList text="Multibagger opportunities" />
                    </ul>
                  </div>
                  <button onClick={() => handleSubscribe("Quarterly Advisory")} disabled={loading} className="w-full py-4 bg-brand-blue hover:bg-blue-600 text-white font-bold rounded-xl transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-brand-blue/30 disabled:opacity-50 disabled:transform-none">
                    {loading ? 'Processing...' : 'Subscribe Now'}
                  </button>
               </div>

               {/* Yearly Plan */}
               <div className="glass-card p-8 border border-navy-700 hover-glass flex flex-col justify-between h-full relative bg-navy-900/40">
                  <div className="absolute top-0 right-4 -translate-y-1/2 bg-brand-green text-navy-900 text-xs font-bold px-3 py-1 rounded-md shadow-lg">
                    Best Value
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">Yearly</h3>
                    <p className="text-text-muted mb-6">365 days of solid wealth building.</p>
                    <div className="mb-8 flex items-baseline gap-2">
                       <span className="text-4xl font-black text-white">₹{getProduct("Yearly Advisory").sellingPrice?.toLocaleString() || '12,499'}</span>
                       <span className="text-lg text-text-muted line-through">₹{getProduct("Yearly Advisory").originalPrice?.toLocaleString() || '15,999'}</span>
                    </div>
                    <ul className="space-y-4 mb-8">
                      <FeatureList text="4 to 7 calls per month" />
                      <FeatureList text="Entry" />
                      <FeatureList text="Exit" />
                      <FeatureList text="Target" />
                      <FeatureList text="Stop Loss" />
                      <FeatureList text="Multibagger opportunities" />
                    </ul>
                  </div>
                  <button onClick={() => handleSubscribe("Yearly Advisory")} disabled={loading} className="w-full py-4 bg-brand-blue hover:bg-blue-600 text-white font-bold rounded-xl transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-brand-blue/30 disabled:opacity-50 disabled:transform-none">
                    {loading ? 'Processing...' : 'Subscribe Now'}
                  </button>
               </div>
               
            </div>
         </div>
      </section>

      {/* ADVISORY BENEFITS */}
      <section className="py-20 bg-navy-900/50 border-y border-navy-800 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">Advisory Benefits</h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((b, i) => (
              <div key={i} className="glass-card p-8 border border-navy-700 flex flex-col gap-4 hover-glass">
                <div className="w-12 h-12 bg-navy-800 text-brand-blue rounded-xl flex items-center justify-center shadow-lg border border-navy-600">
                  {b.icon}
                </div>
                <h3 className="text-xl font-bold text-white tracking-wide">{b.title}</h3>
                <p className="text-text-muted leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS (Placeholders) */}
      <section className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">Reviews and Testimonials</h2>
            <p className="text-text-muted text-lg">Consistent risk-managed insights trusted by traders.</p>
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
                         <p className="text-text-muted text-xs">Subscriber</p>
                      </div>
                   </div>
                </div>
             ))}
          </div>
        </div>
      </section>

      {/* FAQ ACCORDION */}
      <section className="py-24 bg-navy-900 border-y border-navy-800 relative z-10">
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

      {/* DISCLAIMER */}
      <section className="py-8 bg-[#0A1628] relative z-10 text-center">
         <div className="max-w-4xl mx-auto px-4 text-text-muted text-sm flex items-center justify-center gap-3">
            <AlertTriangle size={18} className="text-brand-red flex-shrink-0" />
            <p><strong>Disclaimer:</strong> Investments in securities market are subject to market risks, read all the related documents carefully before investing.</p>
         </div>
      </section>

    </div>
  );
}

function FeatureList({ text }) {
  return (
    <li className="flex items-center gap-3">
      <CheckCircle2 size={18} className="text-brand-green flex-shrink-0" />
      <span className="text-text-main text-sm font-medium">{text}</span>
    </li>
  );
}
