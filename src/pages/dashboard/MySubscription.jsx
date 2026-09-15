import { CreditCard, Calendar, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function MySubscription() {
  // Simulating state for now
  const subscription = { active: false }; // Change to test different states

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-white mb-2">My Subscription</h1>
        <p className="text-text-muted">Manage your premium advisory services.</p>
      </div>

      <div className="glass-card p-8 border-l-4 border-l-brand-blue">
        {subscription.active ? (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">Quarterly Plan</h2>
              <span className="bg-brand-blue/10 text-brand-blue px-3 py-1 rounded-full text-sm font-bold border border-brand-blue/20">ACTIVE</span>
            </div>
            
            <div className="space-y-4 mb-8">
              <p className="flex justify-between text-text-muted border-b border-navy-700/50 pb-4">
                <span>Start Date</span>
                <span className="text-white font-medium">Oct 12, 2026</span>
              </p>
              <p className="flex justify-between text-text-muted border-b border-navy-700/50 pb-4">
                <span>Expiry Date</span>
                <span className="text-white font-medium">Jan 12, 2027</span>
              </p>
              <p className="flex justify-between text-text-muted pb-2">
                <span>Purchase Details</span>
                <span className="text-white font-medium">₹4,499 via UPI</span>
              </p>
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <h2 className="text-2xl font-bold text-white mb-4">No Active Plan</h2>
            <p className="text-text-muted mb-8 text-lg">You're not subscribed to an advisory plan yet.</p>
            <Link to="/advisory" className="bg-brand-blue hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-bold transition-all shadow-lg shadow-brand-blue/20 inline-block">
              View Advisory Plans
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
