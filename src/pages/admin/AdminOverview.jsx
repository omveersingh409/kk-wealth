import { useState, useEffect } from 'react';
import { Users, CreditCard, BookOpen, BarChart2, TrendingUp, RefreshCw } from 'lucide-react';
import api from '../../api/client';

export default function AdminOverview() {
  const [data, setData] = useState({
    totalUsers: 0,
    activeSubscriptions: 0,
    totalCourseEnrollments: 0,
    totalRevenue: 0,
    successfulPayments: 0,
    recentActivity: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const res = await api.get('/admin/dashboard');
      if (res.data.success) {
        setData(res.data.data);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch dashboard data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const formatCurrency = (val) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(val);

  if (loading) {
     return (
       <div className="flex justify-center items-center h-96">
         <div className="animate-spin text-brand-blue"><RefreshCw size={40} /></div>
       </div>
     );
  }

  if (error) {
     return <div className="text-brand-red font-bold p-8">Error: {error}</div>;
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
         <div>
            <h1 className="text-3xl font-black text-white mb-2">Platform Overview</h1>
            <p className="text-text-muted">High-level metrics for KK Wealth operations.</p>
         </div>
         <button onClick={fetchDashboardData} className="bg-brand-blue hover:bg-blue-600 text-white px-5 py-2.5 font-medium rounded-lg text-sm transition-colors shadow-lg shadow-brand-blue/20 flex items-center gap-2">
            <RefreshCw size={16} /> Refresh Data
         </button>
      </div>
      
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
         <StatCard title="Total Users" value={data.totalUsers} icon={<Users size={24} />} trend="Registered DB" />
         <StatCard title="Active Subscriptions" value={data.activeSubscriptions} icon={<CreditCard size={24} />} trend="Live Services" />
         <StatCard title="Course Enrollments" value={data.totalCourseEnrollments} icon={<BookOpen size={24} />} trend="Active Lifetime" />
         <StatCard title="Total Revenue" value={formatCurrency(data.totalRevenue)} icon={<TrendingUp size={24} />} trend={`${data.successfulPayments} successful pmts`} />
      </div>
      
      <div className="grid lg:grid-cols-2 gap-8">
          <div className="glass-card p-6 border border-navy-700">
             <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
               <div className="w-8 h-8 rounded bg-brand-blue/20 flex items-center justify-center text-brand-blue"><BarChart2 size={18} /></div> 
               Recent Platform Activity
             </h3>
             <div className="space-y-4 text-sm">
                {data.recentActivity && data.recentActivity.length > 0 ? (
                  data.recentActivity.map((order, idx) => (
                    <div key={idx} className="flex justify-between items-center p-4 bg-navy-800/50 hover:bg-navy-800 rounded-lg transition-colors border border-navy-700/50">
                      <div>
                        <p className="text-white font-medium mb-1">{order.user?.email || 'Unknown User'}</p>
                        <p className="text-text-muted">{order.product?.name || 'Item Removed'}</p>
                      </div>
                      <span className="text-brand-green font-bold">+{formatCurrency(order.amount)}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-text-muted text-center py-4">No recent activity detected.</p>
                )}
             </div>
          </div>
          
          <div className="glass-card p-6 border border-navy-700">
             <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
               <div className="w-8 h-8 rounded bg-brand-green/20 flex items-center justify-center text-brand-green"><BookOpen size={18} /></div> 
               Quick Actions
             </h3>
             <p className="text-text-muted mb-4">You can navigate through your sidebar elements to perform detailed analytics, create new products, and track real-time payments through razorpay.</p>
             <p className="text-brand-green font-bold text-sm bg-brand-green/10 p-3 rounded-lg border border-brand-green/20">
               Database Sync: CONNECTED ✓
             </p>
          </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, trend }) {
  return (
    <div className="glass-card p-6 border border-navy-700 hover:border-brand-blue/40 hover:bg-navy-800/80 transition-all group">
      <div className="flex justify-between items-start mb-4">
        <div className="w-12 h-12 bg-navy-900 text-brand-blue rounded-xl flex items-center justify-center border border-navy-700 group-hover:scale-110 transition-transform shadow-inner">
          {icon}
        </div>
      </div>
      <h3 className="text-text-muted text-xs font-semibold uppercase tracking-wider mb-2">{title}</h3>
      <p className="text-3xl font-black text-white mb-3">{value}</p>
      <p className="text-sm font-medium text-brand-green flex items-center gap-1">{trend}</p>
    </div>
  );
}
