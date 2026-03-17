import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Lock, ArrowLeft, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';

interface ResetPasswordProps {
  onViewChange: (view: any) => void;
}

export const ResetPassword: React.FC<ResetPasswordProps> = ({ onViewChange }) => {
  const [token, setToken] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setStatus('error');
      setMessage("Passwords do not match");
      return;
    }

    setStatus('loading');
    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      });
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

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-background-dark">
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary/10 blur-[120px]" />
      
      <div className="relative z-10 flex-1 flex items-center justify-center p-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-[480px] bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-xl p-8 shadow-2xl"
        >
          <div className="flex flex-col gap-2 mb-8">
            <h1 className="text-3xl font-bold text-slate-100 tracking-tight">Update Password</h1>
            <p className="text-slate-400 text-sm">Enter the reset token from your email and your new encryption key.</p>
          </div>

          {status === 'success' ? (
            <div className="flex flex-col items-center gap-4 py-8">
              <CheckCircle2 className="w-16 h-16 text-primary" />
              <p className="text-slate-100 font-bold text-xl">Password Updated</p>
              <p className="text-slate-400 text-sm text-center">Your security credentials have been synchronized. Redirecting to login...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              {status === 'error' && (
                <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center gap-3 text-red-400 text-sm">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  {message}
                </div>
              )}

              <div className="flex flex-col gap-2">
                <label className="text-slate-300 text-sm font-medium">Reset Token</label>
                <input 
                  className="w-full rounded-lg bg-slate-800/50 border border-slate-700 focus:border-primary text-slate-100 px-4 py-3 text-sm outline-none" 
                  placeholder="Enter token from console"
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                  required
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-slate-300 text-sm font-medium">New Password</label>
                <input 
                  className="w-full rounded-lg bg-slate-800/50 border border-slate-700 focus:border-primary text-slate-100 px-4 py-3 text-sm outline-none" 
                  placeholder="••••••••"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-slate-300 text-sm font-medium">Confirm New Password</label>
                <input 
                  className="w-full rounded-lg bg-slate-800/50 border border-slate-700 focus:border-primary text-slate-100 px-4 py-3 text-sm outline-none" 
                  placeholder="••••••••"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>

              <button 
                className="w-full bg-primary text-background-dark font-bold py-3.5 rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/20 disabled:opacity-50" 
                type="submit"
                disabled={status === 'loading'}
              >
                {status === 'loading' ? <RefreshCw className="w-4 h-4 animate-spin" /> : 'Update Password'}
              </button>

              <button 
                type="button"
                onClick={() => onViewChange('login')}
                className="flex items-center justify-center gap-2 text-slate-400 text-sm hover:text-primary transition-colors mt-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Login
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </div>
  );
};
