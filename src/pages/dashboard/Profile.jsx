import { useState, useEffect } from 'react';
import api from '../../api/client';

export default function Profile() {
  const [user, setUser] = useState(null);
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState({ type: '', text: '' });
  
  const [pwd, setPwd] = useState({ old: '', new: '', confirm: '' });
  const [pwdLoading, setPwdLoading] = useState(false);
  const [pwdMsg, setPwdMsg] = useState({ type: '', text: '' });

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      setUser(parsed);
      setName(parsed.name);
    }
  }, []);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setMsg({ type: '', text: '' });
      const res = await api.put('/auth/profile', { name });
      if (res.data.success) {
        localStorage.setItem('user', JSON.stringify(res.data.data));
        setUser(res.data.data);
        setMsg({ type: 'success', text: 'Profile updated successfully' });
      }
    } catch (err) {
      setMsg({ type: 'error', text: err.response?.data?.message || 'Update failed' });
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    if (pwd.new !== pwd.confirm) {
      setPwdMsg({ type: 'error', text: 'New passwords do not match' });
      return;
    }
    try {
      setPwdLoading(true);
      setPwdMsg({ type: '', text: '' });
      const res = await api.put('/auth/password', { oldPassword: pwd.old, newPassword: pwd.new });
      if (res.data.success) {
        setPwdMsg({ type: 'success', text: 'Password changed successfully' });
        setPwd({ old: '', new: '', confirm: '' });
      }
    } catch (err) {
      setPwdMsg({ type: 'error', text: err.response?.data?.message || 'Password update failed' });
    } finally {
      setPwdLoading(false);
    }
  };

  if (!user) return <div className="text-white text-center pt-32">Loading...</div>;

  const initials = user.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black text-white mb-2">My Profile</h1>
          <p className="text-text-muted">Manage your personal information and preferences.</p>
        </div>
        <button onClick={() => {
          localStorage.removeItem('user');
          localStorage.removeItem('token');
          window.location.href = '/';
        }} className="bg-brand-red/10 border border-brand-red/30 hover:bg-brand-red text-brand-red hover:text-white px-6 py-2 rounded-lg font-medium transition-all">
          Logout
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Profile Info */}
        <div className="glass-card p-8 border border-navy-700">
          <div className="flex items-center gap-6 mb-8">
            <div className="w-24 h-24 bg-gradient-to-br from-brand-blue to-brand-green rounded-full flex items-center justify-center text-3xl font-black text-navy-900 shadow-lg shadow-brand-blue/20">
              {initials}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">{user.name}</h2>
              <p className="text-text-muted">{user.email}</p>
            </div>
          </div>
          
          {msg.text && (
            <div className={`p-3 rounded-md mb-6 text-sm text-center ${msg.type === 'error' ? 'bg-red-500/10 border border-red-500/50 text-red-500' : 'bg-brand-green/10 border border-brand-green/50 text-brand-green'}`}>
              {msg.text}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleProfileUpdate}>
            <div>
              <label className="block text-sm font-medium text-text-muted mb-2">Full Name</label>
              <input value={name} onChange={e => setName(e.target.value)} required type="text" className="w-full bg-navy-900 border border-navy-700 rounded-lg px-4 py-3.5 text-white focus:outline-none focus:border-brand-blue transition-colors" />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-muted mb-2">Email (Cannot be changed)</label>
              <input type="email" value={user.email} disabled className="w-full bg-navy-900/50 border border-navy-800 rounded-lg px-4 py-3.5 text-text-muted cursor-not-allowed" />
            </div>
            <button disabled={loading} type="submit" className={`py-3.5 px-8 bg-brand-blue hover:bg-blue-600 text-white font-bold rounded-lg transition-colors mt-4 ${loading ? 'opacity-70' : ''}`}>
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </form>
        </div>

        {/* Change Password */}
        <div className="glass-card p-8 border border-navy-700">
          <h2 className="text-xl font-bold text-white mb-6">Security</h2>
          
          {pwdMsg.text && (
            <div className={`p-3 rounded-md mb-6 text-sm text-center ${pwdMsg.type === 'error' ? 'bg-red-500/10 border border-red-500/50 text-red-500' : 'bg-brand-green/10 border border-brand-green/50 text-brand-green'}`}>
              {pwdMsg.text}
            </div>
          )}

          <form className="space-y-6" onSubmit={handlePasswordUpdate}>
            <div>
              <label className="block text-sm font-medium text-text-muted mb-2">Current Password</label>
              <input value={pwd.old} onChange={e => setPwd({ ...pwd, old: e.target.value })} required type="password" placeholder="••••••••" className="w-full bg-navy-900 border border-navy-700 rounded-lg px-4 py-3.5 text-white focus:outline-none focus:border-brand-blue transition-colors" />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-muted mb-2">New Password</label>
              <input value={pwd.new} onChange={e => setPwd({ ...pwd, new: e.target.value })} required type="password" placeholder="••••••••" className="w-full bg-navy-900 border border-navy-700 rounded-lg px-4 py-3.5 text-white focus:outline-none focus:border-brand-blue transition-colors" />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-muted mb-2">Confirm New Password</label>
              <input value={pwd.confirm} onChange={e => setPwd({ ...pwd, confirm: e.target.value })} required type="password" placeholder="••••••••" className="w-full bg-navy-900 border border-navy-700 rounded-lg px-4 py-3.5 text-white focus:outline-none focus:border-brand-blue transition-colors" />
            </div>
            <button disabled={pwdLoading} type="submit" className={`py-3.5 px-8 bg-brand-green text-navy-900 hover:bg-green-400 font-bold rounded-lg transition-colors mt-4 ${pwdLoading ? 'opacity-70' : ''}`}>
              {pwdLoading ? 'Updating...' : 'Update Password'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
