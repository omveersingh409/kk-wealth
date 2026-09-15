import { useState, useEffect } from 'react';
import { RefreshCw, Search, ArrowUpRight } from 'lucide-react';
import api from '../../api/client';

export default function ManagePayments() {
  const [payments, setPayments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPayments = async () => {
    try {
      setLoading(true);
      const res = await api.get('/admin/payments');
      if (res.data.success) {
        setPayments(res.data.data);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load payments.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  const formatCurrency = (val) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(val);

  const filteredPayments = payments.filter((p) => {
    const search = searchTerm.toLowerCase();
    return p.razorpayOrderId?.toLowerCase().includes(search) || 
           p.user?.email?.toLowerCase().includes(search) ||
           p.product?.name?.toLowerCase().includes(search);
  });

  if (loading) return <div className="flex justify-center p-12"><RefreshCw className="animate-spin text-brand-blue" size={32} /></div>;
  if (error) return <div className="p-8 text-brand-red">Error: {error}</div>;

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-navy-700 pb-6">
        <div>
          <h1 className="text-3xl font-black text-white">Payment Records</h1>
          <p className="text-text-muted mt-1">Audit trail of all verified Razorpay transactions.</p>
        </div>
        <div className="flex gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
            <input 
              type="text"
              placeholder="Search ID, email, or course..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 bg-navy-900 border border-navy-700 rounded-lg text-white focus:border-brand-blue focus:ring-1 focus:ring-brand-blue outline-none transition-all w-64"
            />
          </div>
          <button onClick={fetchPayments} className="p-2.5 bg-navy-800 hover:bg-navy-700 text-white rounded-lg border border-navy-700 transition-colors">
             <RefreshCw size={18} />
          </button>
        </div>
      </div>

      <div className="bg-navy-900/50 rounded-xl border border-navy-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-navy-800 text-text-muted border-b border-navy-700 text-sm">
                <th className="p-4 font-medium">Order ID</th>
                <th className="p-4 font-medium">Customer Email</th>
                <th className="p-4 font-medium">Purchased Product</th>
                <th className="p-4 font-medium">Amount</th>
                <th className="p-4 font-medium">Date</th>
                <th className="p-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy-700/50">
              {filteredPayments.length > 0 ? filteredPayments.map((payment) => (
                <tr key={payment._id} className="hover:bg-navy-800/30 transition-colors">
                  <td className="p-4">
                    <span className="text-xs text-brand-blue font-mono">{payment.razorpayOrderId}</span>
                  </td>
                  <td className="p-4 text-white text-sm">{payment.user?.email || 'N/A'}</td>
                  <td className="p-4 text-gray-300 text-sm">
                    {payment.product?.name || 'N/A'} 
                    <span className="text-[10px] ml-2 uppercase bg-navy-700 px-1 py-0.5 rounded text-gray-400">{payment.productType}</span>
                  </td>
                  <td className="p-4 font-bold text-white tracking-wide">
                    {formatCurrency(payment.amount)}
                  </td>
                  <td className="p-4 text-gray-400 text-sm">
                    {new Date(payment.createdAt).toLocaleString()}
                  </td>
                  <td className="p-4">
                    {payment.status === 'paid' ? (
                      <span className="text-brand-green bg-brand-green/10 text-xs px-2 py-1 flex items-center justify-center gap-1 max-w-max rounded-full border border-brand-green/20">
                         <ArrowUpRight size={12} /> Success
                      </span>
                    ) : payment.status === 'failed' ? (
                      <span className="text-brand-red bg-brand-red/10 text-xs px-2 py-1 rounded-full border border-brand-red/20 opacity-80">Failed</span>
                    ) : (
                      <span className="text-yellow-500 bg-yellow-500/10 text-xs px-2 py-1 rounded-full border border-yellow-500/20">{payment.status}</span>
                    )}
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="6" className="p-8 text-center text-text-muted">
                    No payment records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
