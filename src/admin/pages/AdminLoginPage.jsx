import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { ShieldCheck, Eye, EyeOff, Lock, Mail, ArrowRight, Building2, Sparkles } from 'lucide-react';
import { useAdminAuth } from '../context/AdminAuthContext';
import { useToast } from '../context/ToastContext';

export default function AdminLoginPage() {
  const { login } = useAdminAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const redirectPath = location.state?.from?.pathname || '/admin';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email || !password) {
      setErrorMessage('Please enter both administrator email and password.');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await login(email, password, rememberMe);
      if (res.success) {
        showToast({
          type: 'success',
          title: 'Access Authorized',
          message: `Welcome back, ${res.admin?.name || 'Administrator'}.`
        });
        navigate(redirectPath, { replace: true });
      } else {
        setErrorMessage(res.message || 'Invalid administrator credentials.');
      }
    } catch (err) {
      setErrorMessage(err.message || 'Server connection error.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDemoFill = () => {
    setEmail('admin@vardhabuilders.com');
    setPassword('VardhaAdmin@2026');
    setErrorMessage('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF5F8] via-[#FAF8FC] to-[#F3E8FF]/60 text-[#241B35] flex items-center justify-center p-4 sm:p-6 relative overflow-hidden font-sans">
      {/* Background Pink & Purple Ambient Glow Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-gradient-to-br from-[#EC4899]/15 via-[#8B5CF6]/15 to-[#6D28D9]/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] bg-[#EC4899]/15 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute top-10 left-10 w-[420px] h-[420px] bg-[#6D28D9]/10 rounded-full blur-[110px] pointer-events-none" />

      {/* Decorative delicate grid */}
      <div
        className="absolute inset-0 opacity-[0.4] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#FCE7F3 1px, transparent 1px), linear-gradient(to right, #F3E8FF 1px, transparent 1px)`,
          backgroundSize: '48px 48px'
        }}
      />

      <div className="relative w-full max-w-md z-10">
        {/* Monogram & Title with Pink and Purple Gradients */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#EC4899] via-[#8B5CF6] to-[#6D28D9] border-2 border-white/80 shadow-xl shadow-[#EC4899]/30 mb-4 transform hover:scale-105 transition-transform">
            <span className="font-sans font-black text-xl text-white tracking-widest drop-shadow-sm">
              ER
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#241B35] font-display">
            Elicit Research
          </h1>
          <p className="text-xs text-[#786D88] font-medium">&amp; Insights Inc.</p>

          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-gradient-to-r from-[#FDF2F8] to-[#F3E8FF] border border-[#FCE7F3] mt-2 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#EC4899]" />
            <span className="text-[10px] uppercase tracking-widest font-extrabold text-[#DB2777] font-mono">
              Administrative Command Center
            </span>
          </div>
        </div>

        {/* Login Card with Pink-to-Purple Accent Top Border */}
        <div className="rounded-3xl bg-white border border-[#FCE7F3] shadow-[0_20px_60px_rgba(236,72,153,0.12),0_10px_25px_rgba(109,40,217,0.08)] backdrop-blur-xl overflow-hidden">
          {/* Glowing Gradient Accent Line */}
          <div className="h-1.5 w-full bg-gradient-to-r from-[#EC4899] via-[#A855F7] to-[#6D28D9]" />

          <div className="p-8 sm:p-9 space-y-6">
            <div>
              <h2 className="text-xl font-bold text-[#241B35] font-display">
                Administrator Sign-In
              </h2>
              <p className="text-xs text-[#786D88] mt-1 leading-relaxed">
                Authorized personnel only. Sessions are encrypted and protected by JWT.
              </p>
            </div>

            {errorMessage && (
              <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center space-x-2 animate-fade-in font-medium">
                <ShieldCheck className="w-4 h-4 text-rose-600 flex-shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#241B35] mb-1.5">
                  Administrator Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#EC4899]" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@vardhabuilders.com"
                    required
                    className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-[#FCE7F3] bg-[#FFF9FB] text-[#241B35] placeholder-[#A58E9E] focus:outline-none focus:ring-2 focus:ring-[#EC4899]/20 focus:border-[#EC4899] transition-all font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#241B35] mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6D28D9]" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    required
                    className="w-full pl-10 pr-10 py-2.5 text-xs rounded-xl border border-[#FCE7F3] bg-[#FFF9FB] text-[#241B35] placeholder-[#A58E9E] focus:outline-none focus:ring-2 focus:ring-[#6D28D9]/20 focus:border-[#6D28D9] transition-all font-medium"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#786D88] hover:text-[#EC4899]"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center space-x-2 text-xs text-[#786D88] cursor-pointer font-medium">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded border-[#FBCFE8] text-[#EC4899] focus:ring-[#EC4899] accent-[#EC4899]"
                  />
                  <span>Remember session</span>
                </label>

                <button
                  type="button"
                  onClick={handleDemoFill}
                  className="text-[11px] font-bold text-[#EC4899] hover:text-[#DB2777] hover:underline"
                >
                  Auto-fill credentials
                </button>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-2 py-3 rounded-xl bg-gradient-to-r from-[#EC4899] via-[#8B5CF6] to-[#6D28D9] hover:from-[#DB2777] hover:via-[#7C3AED] hover:to-[#5B21B6] text-white text-xs font-bold hover:shadow-xl hover:shadow-[#EC4899]/35 hover:-translate-y-0.5 transition-all flex items-center justify-center space-x-2 shadow-lg shadow-[#EC4899]/25 disabled:opacity-50"
              >
                <span>{isSubmitting ? 'Authenticating...' : 'Sign In to Console'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* Quick Credential Hint Box */}
            <div className="pt-4 border-t border-[#FCE7F3] text-center">
              <div className="p-2.5 rounded-xl bg-gradient-to-r from-[#FDF2F8] to-[#F3E8FF] border border-[#FCE7F3]">
                <p className="text-[11px] text-[#786D88]">
                  Seeded Superadmin: <span className="font-mono text-[#DB2777] font-bold">admin@vardhabuilders.com</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Back to Public Site */}
        <div className="text-center mt-6">
          <Link
            to="/"
            className="text-xs font-semibold text-[#786D88] hover:text-[#EC4899] transition-colors inline-flex items-center space-x-1"
          >
            <span>← Return to Elicit Research Website</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
