import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-navy-900/50 border-t border-navy-800 pt-16 pb-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-3xl font-black text-white tracking-tight">KK</span>
              <span className="text-3xl font-bold gradient-text pb-0.5">Wealth</span>
            </div>
            <p className="text-text-muted max-w-sm mb-6 leading-relaxed">
              "Smart Insights. Better Decisions." <br /><br />
              Professional equity insights and practical technical analysis education to help you make informed market decisions.
            </p>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-6 flex items-center gap-2 text-lg">Quick Links</h3>
            <ul className="space-y-4">
              <li><Link to="/" className="text-text-muted hover:text-brand-blue transition-colors flex items-center">Home</Link></li>
              <li><Link to="/advisory" className="text-text-muted hover:text-brand-blue transition-colors flex items-center">Advisory</Link></li>
              <li><Link to="/classes" className="text-text-muted hover:text-brand-blue transition-colors flex items-center">Online Class</Link></li>
              <li><Link to="/about" className="text-text-muted hover:text-brand-blue transition-colors flex items-center">About</Link></li>
              <li><Link to="/#faq" className="text-text-muted hover:text-brand-blue transition-colors flex items-center">FAQ</Link></li>
              <li><Link to="/contact" className="text-text-muted hover:text-brand-blue transition-colors flex items-center">Contact</Link></li>
              <li><Link to="/admin/login" className="text-text-muted hover:text-brand-blue transition-colors flex items-center mt-2 group"><span className="text-[10px] uppercase font-bold tracking-wider text-text-muted/50 group-hover:text-brand-blue/50 mr-2 border border-navy-700 rounded px-1.5 py-0.5">Staff</span> Admin Login</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-6 flex items-center gap-2 text-lg">Legal Info</h3>
            <ul className="space-y-4">
              <li><Link to="/disclaimer" className="text-text-muted hover:text-brand-blue transition-colors flex items-center">Disclaimer</Link></li>
              <li><Link to="/privacy" className="text-text-muted hover:text-brand-blue transition-colors flex items-center">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-text-muted hover:text-brand-blue transition-colors flex items-center">Terms & Conditions</Link></li>
              <li><Link to="/refund" className="text-text-muted hover:text-brand-blue transition-colors flex items-center">Refund/Cancellation Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-navy-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-text-muted text-sm text-center md:text-left max-w-3xl leading-relaxed mt-4 md:mt-0">
            <span className="font-semibold text-white/50">DISCLAIMER:</span> Investments in securities market are subject to market risks, read all the related documents carefully before investing. This platform does not promise or guarantee returns.
          </p>
          <div className="flex flex-col items-center md:items-end gap-1 flex-shrink-0">
            <p className="text-brand-blue text-sm font-semibold">
              Owner: Krishan kumhar
            </p>
            <p className="text-text-muted text-sm">
              &copy; 2026 KK Wealth. All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
