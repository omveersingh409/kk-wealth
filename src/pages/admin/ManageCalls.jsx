import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Search, Filter, RefreshCw } from 'lucide-react';
import api from '../../api/client';

export default function ManageCalls() {
  const [calls, setCalls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Basic Search state
  const [searchTerm, setSearchTerm] = useState('');

  // Form State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    stockName: '',
    entryPrice: '',
    targetPrice: '',
    stopLoss: '',
    status: 'Active'
  });

  const fetchCalls = async () => {
    try {
      setLoading(true);
      const res = await api.get('/admin/advisory');
      if (res.data.success) {
        setCalls(res.data.data);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch calls.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCalls();
  }, []);

  const handleOpenForm = (call = null) => {
    if (call) {
      setEditingId(call._id);
      setFormData({
        stockName: call.stockName,
        entryPrice: call.entryPrice,
        targetPrice: call.targetPrice,
        stopLoss: call.stopLoss,
        status: call.status || 'Active'
      });
    } else {
      setEditingId(null);
      setFormData({
        stockName: '',
        entryPrice: '',
        targetPrice: '',
        stopLoss: '',
        status: 'Active'
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`/admin/advisory/${editingId}`, formData);
      } else {
        await api.post('/admin/advisory', formData);
      }
      setIsModalOpen(false);
      fetchCalls();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to save call.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this advisory call permanently?")) return;
    try {
      await api.delete(`/admin/advisory/${id}`);
      fetchCalls();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete.');
    }
  };

  const filteredCalls = calls.filter((c) => c.stockName?.toLowerCase().includes(searchTerm.toLowerCase()));

  if (loading) return <div className="flex justify-center p-12"><RefreshCw className="animate-spin text-brand-blue" size={32} /></div>;
  if (error) return <div className="p-8 text-brand-red">Error: {error}</div>;

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4 border-b border-navy-700 pb-6">
        <div>
          <h1 className="text-3xl font-black text-white mb-2">Manage Advisory Calls</h1>
          <p className="text-text-muted">Create, update, or resolve trading calls for users.</p>
        </div>
        <button onClick={() => handleOpenForm()} className="bg-brand-blue hover:bg-blue-600 text-white px-5 py-2.5 rounded-lg font-bold flex items-center gap-2 transition-colors shadow-lg shadow-brand-blue/20">
          <Plus size={20} /> Add New Call
        </button>
      </div>
      
      <div className="glass-card border border-navy-700 overflow-hidden">
        <div className="p-5 border-b border-navy-700 flex flex-col sm:flex-row justify-between items-center gap-4 bg-navy-900/60">
           <div className="relative w-full max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted/60" size={18} />
              <input 
                 type="text" 
                 placeholder="Search stock symbol..." 
                 value={searchTerm}
                 onChange={(e) => setSearchTerm(e.target.value)}
                 className="w-full bg-navy-900 border border-navy-700 rounded-lg pl-10 pr-4 py-2.5 text-white text-sm focus:border-brand-blue focus:outline-none transition-colors" 
              />
           </div>
           <button onClick={fetchCalls} className="flex items-center gap-2 px-4 py-2.5 border border-navy-700 rounded-lg text-sm text-text-muted hover:text-white hover:bg-navy-700 transition-colors">
              <RefreshCw size={16} /> Reload Data
           </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[900px]">
             <thead>
               <tr className="bg-navy-800 border-b border-navy-700 text-text-muted text-xs uppercase tracking-wider">
                 <th className="p-5 font-semibold">Stock</th>
                 <th className="p-5 font-semibold">Levels (Entry/Tgt/SL)</th>
                 <th className="p-5 font-semibold">Status</th>
                 <th className="p-5 font-semibold">Date</th>
                 <th className="p-5 font-semibold text-right">Actions</th>
               </tr>
             </thead>
             <tbody className="divide-y divide-navy-700/50">
               {filteredCalls.map(call => (
                 <tr key={call._id} className="hover:bg-navy-800/50 transition-colors">
                    <td className="p-5 text-white font-bold">{call.stockName}</td>
                    <td className="p-5 text-sm font-medium text-text-main">
                        <span className="text-text-muted font-normal mr-1">E:</span>₹{call.entryPrice} 
                        <span className="text-text-muted font-normal ml-3 mr-1">T:</span><span className="text-brand-green">₹{call.targetPrice}</span> 
                        <span className="text-text-muted font-normal ml-3 mr-1">S:</span><span className="text-brand-red">₹{call.stopLoss}</span>
                    </td>
                    <td className="p-5">
                      <span className={`text-xs text-text-main font-bold px-3 py-1 rounded-full border shadow-sm ${
                        call.status?.toLowerCase() === 'active' ? 'bg-navy-700 border-navy-600 text-brand-blue' : 'bg-brand-green/10 border-brand-green/30 text-brand-green'
                      }`}>{call.status || 'Active'}</span>
                    </td>
                    <td className="p-5 text-text-muted text-sm">{new Date(call.createdAt).toLocaleDateString()}</td>
                    <td className="p-5 text-right">
                       <button onClick={() => handleOpenForm(call)} className="text-text-muted hover:text-white p-2 rounded-lg hover:bg-navy-700 ml-2 transition-colors"><Edit2 size={16} /></button>
                       <button onClick={() => handleDelete(call._id)} className="text-text-muted hover:text-brand-red p-2 rounded-lg hover:bg-brand-red/10 ml-1 transition-colors"><Trash2 size={16} /></button>
                    </td>
                 </tr>
               ))}
               {filteredCalls.length === 0 && (
                 <tr>
                    <td colSpan="5" className="p-10 text-center text-text-muted">No advisory calls reflect in the database yet.</td>
                 </tr>
               )}
             </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Form Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-navy-900/80 backdrop-blur-sm flex items-center justify-center p-4">
           <div className="bg-[#0a1526] border border-navy-700 rounded-2xl p-6 w-full max-w-lg shadow-2xl relative">
              <h2 className="text-2xl font-black text-white mb-6">{editingId ? 'Edit Call' : 'New Advisory Call'}</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm text-text-muted mb-1.5">Stock Symbol</label>
                  <input type="text" value={formData.stockName} onChange={(e) => setFormData({...formData, stockName: e.target.value})} className="w-full bg-navy-900 border border-navy-700 rounded-lg px-4 py-2.5 text-white outline-none focus:border-brand-blue" required />
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm text-text-muted mb-1.5">Entry Price (₹)</label>
                    <input type="number" value={formData.entryPrice} onChange={(e) => setFormData({...formData, entryPrice: e.target.value})} className="w-full bg-navy-900 border border-navy-700 rounded-lg px-4 py-2.5 text-white outline-none focus:border-brand-blue" required />
                  </div>
                  <div>
                    <label className="block text-sm text-brand-green mb-1.5">Target (₹)</label>
                    <input type="number" value={formData.targetPrice} onChange={(e) => setFormData({...formData, targetPrice: e.target.value})} className="w-full bg-navy-900 border border-navy-700 rounded-lg px-4 py-2.5 text-white outline-none focus:border-brand-blue" required />
                  </div>
                  <div>
                    <label className="block text-sm text-brand-red mb-1.5">Stop Loss (₹)</label>
                    <input type="number" value={formData.stopLoss} onChange={(e) => setFormData({...formData, stopLoss: e.target.value})} className="w-full bg-navy-900 border border-navy-700 rounded-lg px-4 py-2.5 text-white outline-none focus:border-brand-blue" required />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-text-muted mb-1.5">Status</label>
                  <select value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value})} className="w-full bg-navy-900 border border-navy-700 rounded-lg px-4 py-2.5 text-white outline-none focus:border-brand-blue">
                    <option value="Active">Active</option>
                    <option value="Target Achieved">Target Achieved</option>
                    <option value="Stop Loss Hit">Stop Loss Hit</option>
                    <option value="Closed">Closed</option>
                  </select>
                </div>
                
                <div className="flex justify-end gap-3 pt-6 border-t border-navy-800">
                   <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 text-text-muted hover:text-white transition-colors">Cancel</button>
                   <button type="submit" className="px-5 py-2.5 bg-brand-blue hover:bg-blue-600 text-white rounded-lg font-bold shadow-lg shadow-brand-blue/20">Save Call</button>
                </div>
              </form>
           </div>
        </div>
      )}
    </div>
  );
}
