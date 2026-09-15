import { useState, useEffect } from 'react';
import { CheckCircle2, TrendingUp, BookOpen, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../../api/client';

export default function Overview() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await api.get('/dashboard');
        if (res.data.success) {
          setData(res.data.data);
        }
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || 'Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  if (loading) {
    return <div className="text-white text-center pt-24 text-xl">Loading dashboard...</div>;
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto pt-10 text-center">
         <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-6 rounded-md">
            <h3 className="text-xl font-bold mb-2">Error Loading Dashboard</h3>
            <p>{error}</p>
         </div>
      </div>
    );
  }

  const { user, subscription, courses, stats } = data;
  const firstName = user?.name ? user.name.split(' ')[0] : 'Investor';

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-white mb-2">Welcome, {firstName}!</h1>
        <p className="text-text-muted">Here is the overview of your connected services.</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* Active Subscription Card */}
        <div className={`glass-card p-6 border-l-4 ${subscription?.active ? 'border-l-brand-blue' : 'border-l-navy-700'} hover-glass`}>
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-text-muted text-sm uppercase tracking-wider mb-1">Active Plan</p>
              <h3 className="text-xl font-bold text-white">
                 {subscription?.active ? subscription.plan : 'No Active Plan'}
              </h3>
            </div>
            {subscription?.active && (
              <span className="bg-brand-blue/10 text-brand-blue px-2.5 py-1 rounded-md text-xs font-bold ring-1 ring-brand-blue/20">ACTIVE</span>
            )}
          </div>
          
          {subscription?.active ? (
            <div className="space-y-3 mb-6 border-t border-navy-700/50 pt-4">
              <div className="flex justify-between text-sm">
                <span className="text-text-muted">Valid till</span>
                <span className="text-white font-medium">
                  {new Date(subscription.expiresAt).toLocaleDateString()}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-text-muted">Status</span>
                <span className="text-brand-green font-medium flex items-center gap-1"><CheckCircle2 size={14} /> Healthy</span>
              </div>
            </div>
          ) : (
            <div className="mb-6 pt-4 text-sm text-text-muted">
               Unlock premium insights by subscribing to our advisory services.
            </div>
          )}
          
          <Link to={subscription?.active ? "/dashboard/subscription" : "/advisory"} className="text-brand-blue hover:text-blue-400 text-sm font-bold transition-colors">
            {subscription?.active ? 'Manage Subscription \u2192' : 'View Plans \u2192'}
          </Link>
        </div>

        {/* Advisory Calls Card */}
        <div className="glass-card p-6 hover-glass">
          <div className="w-12 h-12 bg-brand-green/10 text-brand-green rounded-xl flex items-center justify-center mb-4 border border-brand-green/20">
            <TrendingUp size={24} />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">
            {stats?.totalAdvisoryCallsAvailable || 0} Active Calls
          </h3>
          <p className="text-text-muted text-sm mb-6">You have structured market insights ready to review.</p>
          <Link to="/dashboard/calls" className={`w-full block text-center py-2.5 rounded-lg transition-colors font-medium border ${subscription?.active ? 'bg-navy-700 hover:bg-navy-600 text-white border-navy-600' : 'bg-navy-800 text-text-muted border-navy-800 cursor-not-allowed opacity-50'}`} 
            onClick={(e) => !subscription?.active && e.preventDefault()}>
            View Calls
          </Link>
        </div>

        {/* Course Access Card */}
        <div className="glass-card p-6 border border-navy-700 overflow-hidden relative hover-glass group">
          <div className="absolute -top-4 -right-4 p-4 opacity-5 group-hover:scale-110 transition-transform duration-500 pointer-events-none">
             <BookOpen size={120} />
          </div>
          <div className="relative z-10">
            <h3 className="text-xl font-bold text-white mb-2">Courses</h3>
            <p className="text-text-muted text-sm mb-6">
              {courses?.length > 0 ? `Access your ${courses.length} enrolled class(es).` : 'No active courses enrolled.'}
            </p>
            {courses?.length > 0 ? (
                <>
                  <div className="w-full bg-navy-900 h-2 rounded-full overflow-hidden mb-6 border border-navy-700">
                    <div className="bg-gradient-to-r from-brand-blue to-brand-green h-full rounded-full" style={{ width: '5% পড়ে' }}></div>
                  </div>
                  <Link to="/dashboard/course" className="w-full flex justify-center py-2.5 bg-brand-blue hover:bg-blue-600 text-white rounded-lg transition-all font-bold shadow-lg shadow-brand-blue/20">Continue Learning</Link>
                </>
            ) : (
                <Link to="/classes" className="w-full flex justify-center flex-col text-center py-2.5 bg-navy-700 hover:bg-navy-600 border border-navy-600 text-white rounded-lg transition-all font-bold mt-8">Explore Course</Link>
            )}
          </div>
        </div>
      </div>
      
      {/* Important Alert */}
      <div className="bg-brand-red/10 border border-brand-red/20 rounded-xl p-4 flex gap-4 max-w-4xl">
        <AlertCircle className="text-brand-red flex-shrink-0 mt-0.5" />
        <p className="text-text-muted text-sm leading-relaxed">
          <strong className="text-brand-red">Notice:</strong> We do not provide Demat account management services. Never share your trading passwords or OTPs with anyone. Trading involves significant risk.
        </p>
      </div>
    </div>
  );
}
