export default function About() {
  return (
    <div className="pt-32 pb-24 min-h-[85vh] flex items-center">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center w-full">
        <h1 className="text-4xl md:text-5xl font-black text-white mb-8">About <span className="gradient-text">KK Wealth</span></h1>
        
        <div className="glass-card p-10 md:p-16 text-left relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-blue/10 blur-3xl rounded-full"></div>
          
          <p className="text-xl text-text-main leading-relaxed mb-10 relative z-10">
            KK Wealth is focused on providing structured equity market insights and stock market education. Our goal is to help investors and learners understand market analysis, technical indicators, chart patterns and risk management.
          </p>
          
          <div className="border-t border-navy-700/50 pt-8 relative z-10 flex items-center justify-between">
            <div>
              <p className="text-text-muted text-sm uppercase tracking-wider mb-1 font-semibold">Founder & Owner</p>
              <h3 className="text-2xl font-bold text-white">Krishan kumhar</h3>
            </div>
            <div className="w-16 h-16 bg-navy-800 rounded-full overflow-hidden shadow-[0_0_20px_rgba(59,130,246,0.3)] border-2 border-brand-blue">
              <img src="/founder.jpg" alt="Krishan kumhar" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
