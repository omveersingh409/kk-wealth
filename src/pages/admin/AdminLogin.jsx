import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/client';
import { Lock, Mail, ArrowRight, ShieldAlert } from 'lucide-react';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { data } = await api.post('/auth/admin/login', { email, password });
      
      if (data.success) {
        localStorage.setItem('token', data.data.token);
        localStorage.setItem('user', JSON.stringify(data.data));
        navigate('/admin');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Unauthorized Access. Credentials invalid.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#07101E] px-4 font-sans relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-blue/10 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="max-w-md w-full bg-navy-900/80 backdrop-blur-xl border border-navy-700/50 rounded-2xl shadow-2xl p-8 relative z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-blue/20 text-brand-blue mb-4 border border-brand-blue/30 shadow-[0_0_20px_rgba(37,99,235,0.2)]">
            <Lock size={28} />
          </div>
          <h2 className="text-3xl font-black text-white tracking-tight mb-2">Admin Portal</h2>
          <p className="text-text-muted">Restricted Access Connection</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-brand-red/10 border border-brand-red/20 rounded-xl flex items-start gap-3">
            <ShieldAlert className="text-brand-red mt-0.5" size={20} />
            <span className="text-red-200 text-sm font-medium">{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-text-muted mb-1.5">Administrative Email</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="off"
                className="w-full bg-[#0a1526] text-white pl-11 pr-4 py-3 rounded-xl border border-navy-700 focus:border-brand-blue focus:ring-1 focus:ring-brand-blue outline-none transition-all placeholder:text-gray-600 font-medium"
                placeholder="admin@kkwealth.in"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-text-muted mb-1.5">Secure Password</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
              <input 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#0a1526] text-white pl-11 pr-4 py-3 rounded-xl border border-navy-700 focus:border-brand-blue focus:ring-1 focus:ring-brand-blue outline-none transition-all placeholder:text-gray-600 font-medium"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 bg-brand-blue hover:bg-blue-600 text-white py-3.5 rounded-xl font-bold transition-all shadow-lg shadow-brand-blue/25 flex items-center justify-center gap-2 group disabled:opacity-70"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                Authenticate <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
