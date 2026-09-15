import { useState, useEffect } from 'react';
import { Save, RefreshCw } from 'lucide-react';
import api from '../../api/client';

export default function AdminSettings() {
  const [settings, setSettings] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Form mapping
  const [formData, setFormData] = useState({
    SUPPORT_EMAIL: '',
    SUPPORT_PHONE: '',
    ALLOW_NEW_REGISTRATIONS: true,
    MAINTENANCE_MODE: false
  });

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const res = await api.get('/admin/settings');
      if (res.data.success) {
        setSettings(res.data.data);
        setFormData({
          SUPPORT_EMAIL: res.data.data['SUPPORT_EMAIL'] || 'support@kkwealth.in',
          SUPPORT_PHONE: res.data.data['SUPPORT_PHONE'] || '+91-9876543210',
          ALLOW_NEW_REGISTRATIONS: res.data.data['ALLOW_NEW_REGISTRATIONS'] !== false, // Default true
          MAINTENANCE_MODE: res.data.data['MAINTENANCE_MODE'] === true
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleSave = async () => {
    try {
      setSaving(true);
      
      // Save elements sequentially via endpoint
      for (const [key, value] of Object.entries(formData)) {
        await api.post('/admin/settings', { key, value });
      }
      
      alert('Settings formally propagated to the database successfully.');
      fetchSettings();
    } catch (err) {
      alert('Error updating Settings.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="flex justify-center p-12"><RefreshCw className="animate-spin text-brand-blue" size={32} /></div>;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-center border-b border-navy-700 pb-6 mb-8">
        <div>
          <h1 className="text-3xl font-black text-white">Platform Settings</h1>
          <p className="text-text-muted mt-1">Configure global application variables securely.</p>
        </div>
        <button 
          onClick={handleSave} 
          disabled={saving}
          className="bg-brand-green hover:bg-green-600 text-white px-5 py-2.5 rounded-lg flex items-center gap-2 font-medium shadow-lg shadow-brand-green/20 transition-all disabled:opacity-50"
        >
          {saving ? <RefreshCw className="animate-spin" size={18} /> : <Save size={18} />}
          Save Configuration
        </button>
      </div>

      <div className="space-y-6">
         <div className="glass-card p-6 border border-navy-700">
            <h2 className="text-xl font-bold text-white mb-6">Contact Information</h2>
            
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-text-muted mb-2">Support Email Address</label>
                <input 
                  type="email" 
                  value={formData.SUPPORT_EMAIL}
                  onChange={(e) => setFormData({...formData, SUPPORT_EMAIL: e.target.value})}
                  className="w-full bg-navy-900 border border-navy-700 rounded-xl px-4 py-3 text-white outline-none focus:border-brand-blue transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-muted mb-2">Support Phone Number</label>
                <input 
                  type="text" 
                  value={formData.SUPPORT_PHONE}
                  onChange={(e) => setFormData({...formData, SUPPORT_PHONE: e.target.value})}
                  className="w-full bg-navy-900 border border-navy-700 rounded-xl px-4 py-3 text-white outline-none focus:border-brand-blue transition-colors"
                />
              </div>
            </div>
         </div>

         <div className="glass-card p-6 border border-navy-700">
            <h2 className="text-xl font-bold text-white mb-6">Website Access Rules</h2>
            
            <div className="space-y-4">
              <label className="flex items-center gap-3 cursor-pointer p-4 bg-navy-900/50 hover:bg-navy-900 rounded-xl border border-navy-700 transition-colors">
                <input 
                  type="checkbox" 
                  className="w-5 h-5 rounded border-navy-700 bg-navy-900 text-brand-blue focus:ring-brand-blue" 
                  checked={formData.ALLOW_NEW_REGISTRATIONS}
                  onChange={(e) => setFormData({...formData, ALLOW_NEW_REGISTRATIONS: e.target.checked})}
                />
                <div>
                  <div className="font-bold text-white">Enable Open Registrations</div>
                  <div className="text-sm text-text-muted">Allow new public users to register accounts on KK Wealth platform natively.</div>
                </div>
              </label>

              <label className="flex items-center gap-3 cursor-pointer p-4 bg-navy-900/50 hover:bg-navy-900 rounded-xl border border-navy-700 transition-colors">
                <input 
                  type="checkbox" 
                  className="w-5 h-5 rounded border-navy-700 bg-navy-900 text-brand-red focus:ring-brand-red" 
                  checked={formData.MAINTENANCE_MODE}
                  onChange={(e) => setFormData({...formData, MAINTENANCE_MODE: e.target.checked})}
                />
                <div>
                  <div className="font-bold text-white">Maintenance Mode Override</div>
                  <div className="text-sm text-text-muted">Displays maintenance barrier to all normal users stopping them from interacting with Razorpay or Content APIs simultaneously.</div>
                </div>
              </label>
            </div>
         </div>
      </div>
    </div>
  );
}
