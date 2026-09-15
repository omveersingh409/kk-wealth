import { CheckCircle2, Star, ShieldCheck } from 'lucide-react';

export default function PricingCard({ title, price, recommended, bestValue, features, actionText = 'Subscribe Now', onClick, loading }) {
  const isHighlighted = recommended || bestValue;
  
  return (
    <div className={`relative p-8 rounded-2xl border flex flex-col h-full ${
      isHighlighted 
        ? 'border-brand-blue bg-navy-800/80 shadow-xl shadow-brand-blue/10 transform lg:-translate-y-2' 
        : 'border-navy-700 bg-navy-900/50'
    }`}>
      {recommended && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-brand-blue text-white px-4 py-1.5 rounded-full text-xs font-bold tracking-wider flex items-center gap-1 shadow-lg pointer-events-none">
          <Star size={14} fill="currentColor" /> RECOMMENDED
        </div>
      )}
      {bestValue && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-brand-green text-navy-900 px-4 py-1.5 rounded-full text-xs font-bold tracking-wider flex items-center gap-1 shadow-lg pointer-events-none">
          <ShieldCheck size={14} /> BEST VALUE
        </div>
      )}
      
      <h3 className="text-xl font-bold text-white mb-2 tracking-wide uppercase">{title}</h3>
      <div className="mb-6 flex-shrink-0">
        <span className="text-4xl font-black text-white">₹{price}</span>
        <span className="text-text-muted">/-</span>
      </div>

      <ul className="space-y-4 mb-8 flex-grow">
        {features.map((feature, idx) => (
          <li key={idx} className="flex items-start gap-3">
            <CheckCircle2 size={20} className="text-brand-green flex-shrink-0 mt-0.5" />
            <span className="text-text-muted">{feature}</span>
          </li>
        ))}
      </ul>

      <button 
        onClick={onClick}
        disabled={loading}
        className={`w-full py-3.5 mt-auto rounded-lg font-bold transition-all ${
        isHighlighted 
          ? 'bg-brand-blue hover:bg-blue-600 text-white shadow-lg shadow-brand-blue/20' 
          : 'bg-navy-700 hover:bg-navy-600 text-white border border-navy-600'
      } ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}>
        {loading ? 'Processing...' : actionText}
      </button>
    </div>
  );
}
