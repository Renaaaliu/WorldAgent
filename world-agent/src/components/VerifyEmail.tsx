import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Mail, ArrowLeft, RefreshCw, CheckCircle2, AlertCircle, Globe } from 'lucide-react';

interface VerifyEmailProps {
  email: string;
  onViewChange: (view: any) => void;
}

export const VerifyEmail: React.FC<VerifyEmailProps> = ({ email, onViewChange }) => {
  const [status, setStatus] = useState<'pending' | 'verifying' | 'success' | 'error'>('pending');
  const [message, setMessage] = useState('');
  const [token, setToken] = useState('');

  const handleVerify = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setStatus('verifying');
    try {
      const res = await fetch(`/api/auth/verify?token=${token}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setStatus('success');
      setMessage(data.message);
      setTimeout(() => onViewChange('login'), 3000);
    } catch (err: any) {
      setStatus('error');
      setMessage(err.message);
    }
  };

  const handleResend = async () => {
    alert(`Verification email resent to ${email} (Demo: Check server console)`);
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-background-dark">
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary/10 blur-[120px]" />
      
      <div className="relative z-10 flex-1 flex items-center justify-center p-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-[480px] bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-xl p-8 shadow-2xl text-center"
        >
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-primary/10 rounded-full">
              {status === 'success' ? (
                <CheckCircle2 className="w-12 h-12 text-primary" />
              ) : status === 'error' ? (
                <AlertCircle className="w-12 h-12 text-red-400" />
              ) : (
                <Mail className="w-12 h-12 text-primary" />
              )}
            </div>
          </div>

          <h1 className="text-2xl font-bold text-slate-100 mb-2">
            {status === 'success' ? 'Email Verified' : 'Check your inbox'}
          </h1>
          <p className="text-slate-400 text-sm mb-8">
            {status === 'success' 
              ? 'Your account is now active. Redirecting to login...' 
              : `We've sent a verification link to ${email || 'your email'}. Please click the link to continue.`}
          </p>

          {status === 'pending' || status === 'error' || status === 'verifying' ? (
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2 text-left">
                <label className="text-slate-300 text-xs font-medium uppercase tracking-wider">Manual Verification Token</label>
                <div className="flex gap-2">
                  <input 
                    className="flex-1 rounded-lg bg-slate-800/50 border border-slate-700 focus:border-primary text-slate-100 px-4 py-3 text-sm outline-none" 
                    placeholder="Enter token from console"
                    value={token}
                    onChange={(e) => setToken(e.target.value)}
                  />
                  <button 
                    onClick={handleVerify}
                    disabled={!token || status === 'verifying'}
                    className="bg-primary text-background-dark px-4 rounded-lg font-bold hover:bg-primary/90 transition-all disabled:opacity-50"
                  >
                    {status === 'verifying' ? <RefreshCw className="w-4 h-4 animate-spin" /> : 'Verify'}
                  </button>
                </div>
              </div>

              {status === 'error' && <p className="text-red-400 text-xs">{message}</p>}

              <div className="grid grid-cols-2 gap-3 mt-4">
                <button 
                  onClick={handleResend}
                  className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg border border-white/10 text-slate-300 text-sm font-medium hover:bg-white/5 transition-all"
                >
                  <RefreshCw className="w-4 h-4" />
                  Resend Email
                </button>
                <button 
                  onClick={() => onViewChange('login')}
                  className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg border border-white/10 text-slate-300 text-sm font-medium hover:bg-white/5 transition-all"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Login
                </button>
              </div>
              
              <button 
                onClick={() => onViewChange('signup')}
                className="text-primary text-xs hover:underline mt-2"
              >
                Change email address
              </button>
            </div>
          ) : null}
        </motion.div>
      </div>
    </div>
  );
};
