import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Phone, UserPlus, Send, CheckCircle2 } from 'lucide-react';
import api from '../../api/client';

export default function Register() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1 = Details, 2 = OTP
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirm: ''
  });

  const [otp, setOtp] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirm) {
      setError('Passwords do not match');
      return;
    }
    if (!formData.name || !formData.email || !formData.password) {
      setError('Please fill all required fields');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const res = await api.post('/auth/register', {
        name: formData.name,
        email: formData.email,
        password: formData.password
      });

      if (res.data.success) {
        setStep(2); // move to OTP step
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (!otp) {
      setError('Please enter OTP');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const res = await api.post('/auth/verify-otp', {
        email: formData.email,
        otp
      });

      if (res.data.success) {
        localStorage.setItem('token', res.data.data.token);
        localStorage.setItem('user', JSON.stringify(res.data.data));
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await api.post('/auth/resend-otp', { email: formData.email });
      if (res.data.success) {
        alert('OTP Resent check your email!');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to resend OTP');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-32 pb-24 min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full px-4">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-black text-white mb-3">
            {step === 1 ? 'Create an Account' : 'Verify Your Email'}
          </h1>
          <p className="text-text-muted">
            {step === 1 ? 'Join KK Wealth to access premium insights' : `We sent a 6-digit code to ${formData.email}`}
          </p>
        </div>

        <div className="glass-card p-8 border border-navy-700">
          {error && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-3 rounded-md mb-6 text-sm text-center">
              {error}
            </div>
          )}

          {step === 1 ? (
            <form className="space-y-5" onSubmit={handleRegister}>
              <div>
                <label className="block text-sm font-medium text-text-muted mb-2">Full Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User size={18} className="text-text-muted/60" />
                  </div>
                  <input required name="name" value={formData.name} onChange={handleChange} type="text" className="w-full bg-navy-900 border border-navy-700 rounded-lg pl-10 pr-4 py-3.5 text-white focus:outline-none focus:border-brand-blue transition-colors" placeholder="John Doe" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-muted mb-2">Email Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail size={18} className="text-text-muted/60" />
                  </div>
                  <input required name="email" value={formData.email} onChange={handleChange} type="email" className="w-full bg-navy-900 border border-navy-700 rounded-lg pl-10 pr-4 py-3.5 text-white focus:outline-none focus:border-brand-blue transition-colors" placeholder="abc@example.com" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-muted mb-2">Phone Number</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone size={18} className="text-text-muted/60" />
                  </div>
                  <input name="phone" value={formData.phone} onChange={handleChange} type="tel" className="w-full bg-navy-900 border border-navy-700 rounded-lg pl-10 pr-4 py-3.5 text-white focus:outline-none focus:border-brand-blue transition-colors" placeholder="+91 00000 00000" />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                 <div>
                    <label className="block text-sm font-medium text-text-muted mb-2">Password</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                        <Lock size={16} className="text-text-muted/60" />
                      </div>
                      <input required name="password" value={formData.password} onChange={handleChange} type="password" className="w-full bg-navy-900 border border-navy-700 rounded-lg pl-8 pr-3 py-3.5 text-white focus:outline-none focus:border-brand-blue transition-colors text-sm" placeholder="••••••••" />
                    </div>
                 </div>
                 <div>
                    <label className="block text-sm font-medium text-text-muted mb-2">Confirm</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                        <Lock size={16} className="text-text-muted/60" />
                      </div>
                      <input required name="confirm" value={formData.confirm} onChange={handleChange} type="password" className="w-full bg-navy-900 border border-navy-700 rounded-lg pl-8 pr-3 py-3.5 text-white focus:outline-none focus:border-brand-blue transition-colors text-sm" placeholder="••••••••" />
                    </div>
                 </div>
              </div>

              <button disabled={loading} type="submit" className={`w-full py-4 bg-brand-blue hover:bg-blue-600 text-white font-bold rounded-lg transition-all shadow-lg shadow-brand-blue/20 flex justify-center items-center gap-2 mt-6 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}>
                <UserPlus size={18} /> {loading ? 'Processing...' : 'Create Account'}
              </button>
            </form>
          ) : (
            <form className="space-y-5" onSubmit={handleVerifyOtp}>
              <div>
                <label className="block text-sm font-medium text-text-muted mb-2 text-center">Enter 6-digit OTP</label>
                <input 
                  required 
                  value={otp} 
                  onChange={(e) => setOtp(e.target.value)} 
                  maxLength={6}
                  type="text" 
                  className="w-full bg-navy-900 border border-navy-700 rounded-lg px-4 py-4 text-white text-center text-2xl tracking-[0.5em] font-bold focus:outline-none focus:border-brand-blue transition-colors" 
                  placeholder="------" 
                />
              </div>

              <button disabled={loading} type="submit" className={`w-full py-4 bg-brand-green text-navy-900 hover:bg-green-400 font-bold rounded-lg transition-all shadow-lg flex justify-center items-center gap-2 mt-6 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}>
                <CheckCircle2 size={18} /> {loading ? 'Verifying...' : 'Verify OTP'}
              </button>

              <div className="text-center mt-4">
                 <button type="button" onClick={handleResendOtp} disabled={loading} className="text-sm text-text-muted hover:text-brand-blue transition-colors">
                    Didn't receive code? Resend
                 </button>
              </div>
            </form>
          )}

          {step === 1 && (
            <div className="mt-8 text-center text-sm text-text-muted">
              Already have an account?{' '}
              <Link to="/login" className="text-brand-blue hover:text-blue-400 font-bold transition-colors">Login</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
