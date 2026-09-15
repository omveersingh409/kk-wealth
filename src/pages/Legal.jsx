export default function Legal({ title }) {
  return (
    <div className="pt-32 pb-24 min-h-[70vh]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl md:text-5xl font-black text-white mb-10">{title}</h1>
        
        <div className="glass-card p-8 md:p-12 text-text-muted space-y-6 text-lg leading-relaxed">
          <p className="text-xl font-medium text-white p-6 bg-navy-900/50 rounded-xl border-l-4 border-l-brand-red mb-10 shadow-lg shadow-brand-red/5">
            <strong className="text-brand-red mb-2 block">IMPORTANT DISCLAIMER:</strong> Investments in securities market are subject to market risks, read all the related documents carefully before investing.
          </p>
          
          <h2 className="text-2xl font-bold text-white mb-4">1. General Information</h2>
          <p>This is a placeholder page for {title}. Please replace this content with the actual legal text suitable for KK Wealth operations.</p>
          
          <h2 className="text-2xl font-bold text-white mb-4 mt-8">2. No Guaranteed Returns</h2>
          <p>We do not claim guaranteed returns, guaranteed profits or guaranteed multibagger returns. The stock market is inherently risky, and past performance is not indicative of future results.</p>
          
          <h2 className="text-2xl font-bold text-white mb-4 mt-8">3. Education Purpose</h2>
          <p>Our online classes and technical analysis modules are created purely for educational purposes, to enable you to understand the functionalities of market charts.</p>
        </div>
      </div>
    </div>
  );
}
