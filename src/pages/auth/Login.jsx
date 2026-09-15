import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Mail, Lock, LogIn, AlertCircle } from 'lucide-react';
import { GoogleLogin } from '@react-oauth/google';
import api from '../../api/client';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleStandardLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);
      const { data } = await api.post('/auth/login', { email, password });
      if (data.success) {
        localStorage.setItem('token', data.data.token);
        localStorage.setItem('user', JSON.stringify(data.data));
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      setLoading(true);
      setError(null);
      const { data } = await api.post('/auth/google', { 
        credential: credentialResponse.credential 
      });
      
      if (data.success) {
        localStorage.setItem('token', data.data.token);
        localStorage.setItem('user', JSON.stringify(data.data));
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Google authentication failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-32 pb-24 min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full px-4">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-black text-white mb-3">Welcome Back</h1>
          <p className="text-text-muted">Sign in to your KK Wealth account</p>
        </div>

        <div className="glass-card p-8 border border-navy-700">
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-lg flex items-center gap-3 text-red-500 text-sm">
              <AlertCircle size={18} />
              <p>{error}</p>
            </div>
          )}

          <form className="space-y-6" onSubmit={handleStandardLogin}>
            <div>
              <label className="block text-sm font-medium text-text-muted mb-2">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail size={18} className="text-text-muted/60" />
                </div>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-navy-900 border border-navy-700 rounded-lg pl-10 pr-4 py-3.5 text-white focus:outline-none focus:border-brand-blue transition-colors" 
                  placeholder="abc@example.com" 
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-text-muted mb-2">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock size={18} className="text-text-muted/60" />
                </div>
                <input 
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-navy-900 border border-navy-700 rounded-lg pl-10 pr-4 py-3.5 text-white focus:outline-none focus:border-brand-blue transition-colors" 
                  placeholder="••••••••" 
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-sm pt-2">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input type="checkbox" className="w-4 h-4 rounded border-navy-700 bg-navy-900 text-brand-blue focus:ring-brand-blue/50 cursor-pointer" />
                <span className="text-text-muted group-hover:text-white transition-colors">Remember me</span>
              </label>
              <Link to="/forgot-password" className="text-brand-blue hover:text-blue-400 font-medium transition-colors">Forgot Password?</Link>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-brand-blue hover:bg-blue-600 text-white font-bold rounded-lg transition-all shadow-lg shadow-brand-blue/20 flex justify-center items-center gap-2 mt-4 disabled:opacity-50"
            >
              {loading ? 'Processing...' : <><LogIn size={18} /> Login</>}
            </button>
          </form>

          <div className="my-8 flex items-center justify-center gap-4">
             <div className="flex-1 h-px bg-navy-700"></div>
             <span className="text-text-muted text-sm font-medium uppercase tracking-wider">Or continue with</span>
             <div className="flex-1 h-px bg-navy-700"></div>
          </div>

          <div className="flex justify-center w-full">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => setError('Google Sign-In failed or was cancelled.')}
              theme="filled_black"
              size="large"
              text="continue_with"
              shape="rectangular"
            />
          </div>

          <div className="mt-8 text-center text-sm text-text-muted">
            Don't have an account?{' '}
            <Link to="/register" className="text-brand-blue hover:text-blue-400 font-bold transition-colors">Register now</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
