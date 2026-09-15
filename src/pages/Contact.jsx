import { Mail, Phone, Send } from 'lucide-react';

export default function Contact() {
  return (
    <div className="pt-32 pb-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-6">Contact Us</h1>
          <p className="text-xl text-text-muted">
            Have questions about our advisory services or online classes? Reach out to us.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-24 max-w-5xl mx-auto items-start">
          
          {/* Contact Info */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-8">Get in Touch</h3>
            
            <div className="space-y-8 mb-12">
              <div className="flex items-start gap-4 group">
                 <div className="w-12 h-12 bg-navy-800 rounded-xl flex items-center justify-center text-brand-blue border border-navy-700 flex-shrink-0 group-hover:scale-110 transition-transform">
                   <Mail size={24} />
                 </div>
                 <div>
                   <p className="text-text-muted mb-1 text-sm font-medium">Email Address</p>
                   <p className="text-white font-medium text-lg">krishankumhar7300@gmail.com</p>
                 </div>
              </div>
              <div className="flex items-start gap-4 group">
                 <div className="w-12 h-12 bg-navy-800 rounded-xl flex items-center justify-center text-brand-blue border border-navy-700 flex-shrink-0 group-hover:scale-110 transition-transform">
                   <Phone size={24} />
                 </div>
                 <div>
                   <p className="text-text-muted mb-1 text-sm font-medium">Phone Number</p>
                   <p className="text-white font-medium text-lg">+91 7300285537</p>
                 </div>
              </div>
            </div>

            <div className="glass-card p-6 border-l-4 border-l-brand-blue transition-all hover:bg-navy-800/80 hover:shadow-xl shadow-brand-blue/5">
              <h4 className="text-lg font-bold text-white mb-2">KK Wealth</h4>
              <p className="text-text-muted mb-4">Equity Advisory & Stock Market Education</p>
              <div className="border-t border-navy-700/50 pt-4">
                <p className="text-sm text-text-muted">Owner: <span className="text-white font-medium">Krishan kumhar</span></p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="glass-card p-8 border border-navy-700">
            <h3 className="text-2xl font-bold text-white mb-6">Send a Message</h3>
            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-sm font-medium text-text-muted mb-2">Full Name</label>
                <input type="text" className="w-full bg-navy-900 border border-navy-700 rounded-lg px-4 py-3.5 text-white focus:outline-none focus:border-brand-blue transition-colors" placeholder="John Doe" />
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-text-muted mb-2">Email Address</label>
                  <input type="email" className="w-full bg-navy-900 border border-navy-700 rounded-lg px-4 py-3.5 text-white focus:outline-none focus:border-brand-blue transition-colors" placeholder="abc@example.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-muted mb-2">Phone Number</label>
                  <input type="tel" className="w-full bg-navy-900 border border-navy-700 rounded-lg px-4 py-3.5 text-white focus:outline-none focus:border-brand-blue transition-colors" placeholder="+91 00000 00000" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-muted mb-2">Message</label>
                <textarea rows="4" className="w-full bg-navy-900 border border-navy-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-blue transition-colors resize-none" placeholder="How can we help you?"></textarea>
              </div>

              <button className="w-full py-4 bg-brand-blue hover:bg-blue-600 text-white font-bold rounded-lg transition-all shadow-lg shadow-brand-blue/20 flex justify-center items-center gap-2 mt-4">
                Submit Inquiry <Send size={18} />
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}
