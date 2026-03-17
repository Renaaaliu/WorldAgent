import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Globe, Mail, Lock, LogIn, User, ArrowLeft, CheckCircle2, AlertCircle } from 'lucide-react';

interface LoginPageProps {
  onLogin: (userData: any, guest?: boolean) => void;
  onViewChange: (view: any) => void;
  mode?: 'login' | 'signup' | 'forgot';
  setPendingEmail: (email: string) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLogin, onViewChange, mode = 'login', setPendingEmail }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [acceptedPrivacy, setAcceptedPrivacy] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (mode === 'signup') {
        if (!acceptedTerms || !acceptedPrivacy) {
          throw new Error("Please accept the Terms and Privacy Policy");
        }
        const res = await fetch('/api/auth/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, email, password }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error);
        
        setPendingEmail(email);
        onViewChange('verify-pending');
      } else if (mode === 'login') {
        const res = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });
        const data = await res.json();
        if (!res.ok) {
          if (res.status === 403) {
            setPendingEmail(email);
            onViewChange('verify-pending');
            return;
          }
          throw new Error(data.error);
        }
        onLogin(data.user);
      } else if (mode === 'forgot') {
        const res = await fetch('/api/auth/forgot-password', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error);
        alert(data.message);
        onViewChange('login');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    // Mock Google Sign-In for demo
    onLogin({ id: 1, username: 'Google Commander', email: 'commander@google.com' });
  };

  const handleGuestEntry = () => {
    onLogin(null, true);
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Background Space-themed Gradient */}
      <div className="fixed inset-0 z-0 bg-background-dark overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-900/20 blur-[100px]" />
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#20d3ee 0.5px, transparent 0.5px)', backgroundSize: '32px 32px' }} />
      </div>

      <div className="relative z-10 flex h-auto min-h-screen w-full flex-col">
        {/* Top Navigation Bar */}
        <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-primary/20 px-6 lg:px-20 py-4 bg-background-dark/50 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <button onClick={() => onViewChange('landing')} className="text-primary hover:scale-110 transition-transform">
              <Globe className="w-8 h-8" />
            </button>
            <h2 className="text-slate-100 text-xl font-bold leading-tight tracking-tight">World Agent</h2>
          </div>
          <div className="hidden md:flex flex-1 justify-center gap-8">
            {['Platform', 'Lore', 'Leaderboard', 'Support'].map((item) => (
              <button key={item} onClick={() => alert(`${item} details coming soon.`)} className="text-slate-300 hover:text-primary transition-colors text-sm font-medium">{item}</button>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => alert('Help center is under maintenance.')} className="hidden sm:flex min-w-[100px] cursor-pointer items-center justify-center rounded-lg h-10 px-5 bg-primary/10 border border-primary/30 text-primary text-sm font-bold hover:bg-primary/20 transition-all">
              <span>Help</span>
            </button>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 flex items-center justify-center p-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-[480px]"
          >
            {/* Glassmorphism Card */}
            <div className="bg-slate-900/40 backdrop-blur-xl border border-white/10 dark:border-primary/20 rounded-xl p-8 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
              
              <div className="flex flex-col gap-2 mb-8">
                <div className="flex items-center gap-2">
                  {mode !== 'login' && (
                    <button onClick={() => onViewChange('login')} className="p-1 hover:bg-white/10 rounded-full transition-colors">
                      <ArrowLeft className="w-4 h-4 text-slate-400" />
                    </button>
                  )}
                  <h1 className="text-3xl font-bold text-slate-100 tracking-tight">
                    {mode === 'login' ? 'Access Terminal' : mode === 'signup' ? 'Establish Rank' : 'Recover Access'}
                  </h1>
                </div>
                <p className="text-slate-400 text-sm">
                  {mode === 'login' ? 'Welcome back, Commander. Enter your credentials.' : 
                   mode === 'signup' ? 'Join the global strategy network. Create your profile.' :
                   'Enter your email to receive a secure reset link.'}
                </p>
              </div>

              {error && (
                <div className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center gap-3 text-red-400 text-sm">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  {error}
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                {mode === 'signup' && (
                  <div className="flex flex-col gap-2">
                    <label className="text-slate-300 text-sm font-medium flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Display Name
                    </label>
                    <input 
                      className="w-full rounded-lg bg-slate-800/50 border border-slate-700 focus:border-primary focus:ring-1 focus:ring-primary/30 text-slate-100 px-4 py-3 text-sm transition-all outline-none placeholder:text-slate-500" 
                      placeholder="Commander Liu" 
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </div>
                )}

                <div className="flex flex-col gap-2">
                  <label className="text-slate-300 text-sm font-medium flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email Address
                  </label>
                  <input 
                    className="w-full rounded-lg bg-slate-800/50 border border-slate-700 focus:border-primary focus:ring-1 focus:ring-primary/30 text-slate-100 px-4 py-3 text-sm transition-all outline-none placeholder:text-slate-500" 
                    placeholder="commander@worldagent.com" 
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                {mode !== 'forgot' && (
                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between items-center">
                      <label className="text-slate-300 text-sm font-medium flex items-center gap-2">
                        <Lock className="w-4 h-4" />
                        {mode === 'signup' ? 'Create Password' : 'Encryption Key'}
                      </label>
                      {mode === 'login' && (
                        <button type="button" onClick={() => onViewChange('forgot-password')} className="text-primary text-xs hover:underline">Forgot?</button>
                      )}
                    </div>
                    <input 
                      className="w-full rounded-lg bg-slate-800/50 border border-slate-700 focus:border-primary focus:ring-1 focus:ring-primary/30 text-slate-100 px-4 py-3 text-sm transition-all outline-none placeholder:text-slate-500" 
                      placeholder="••••••••" 
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    {mode === 'signup' && (
                      <p className="text-[10px] text-slate-500 mt-1">Min. 8 chars, 1 letter, 1 number.</p>
                    )}
                  </div>
                )}

                {mode === 'signup' && (
                  <div className="flex flex-col gap-3 mt-2">
                    <div className="flex items-start gap-3">
                      <input 
                        className="mt-1 rounded bg-slate-800 border-slate-700 text-primary focus:ring-primary/30" 
                        id="terms" 
                        type="checkbox" 
                        checked={acceptedTerms}
                        onChange={(e) => setAcceptedTerms(e.target.checked)}
                        required
                      />
                      <label className="text-slate-400 text-xs leading-relaxed" htmlFor="terms">
                        I accept the <button type="button" className="text-primary hover:underline">Terms of Service</button>
                      </label>
                    </div>
                    <div className="flex items-start gap-3">
                      <input 
                        className="mt-1 rounded bg-slate-800 border-slate-700 text-primary focus:ring-primary/30" 
                        id="privacy" 
                        type="checkbox" 
                        checked={acceptedPrivacy}
                        onChange={(e) => setAcceptedPrivacy(e.target.checked)}
                        required
                      />
                      <label className="text-slate-400 text-xs leading-relaxed" htmlFor="privacy">
                        I acknowledge the <button type="button" className="text-primary hover:underline">Privacy Policy</button>
                      </label>
                    </div>
                  </div>
                )}

                {mode === 'login' && (
                  <div className="flex items-center gap-2 mt-2">
                    <input className="rounded bg-slate-800 border-slate-700 text-primary focus:ring-primary/30" id="remember" type="checkbox" />
                    <label className="text-slate-400 text-xs" htmlFor="remember">Keep session persistent</label>
                  </div>
                )}

                <button 
                  className="w-full bg-primary hover:bg-primary/90 text-background-dark font-bold py-3.5 rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/20 disabled:opacity-50" 
                  type="submit"
                  disabled={loading}
                >
                  <span>{loading ? 'Processing...' : mode === 'login' ? 'Authorize Login' : mode === 'signup' ? 'Create Account' : 'Send Reset Link'}</span>
                  {!loading && <LogIn className="w-4 h-4" />}
                </button>
              </form>

              {mode === 'login' && (
                <>
                  <div className="relative my-8">
                    <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-800" /></div>
                    <div className="relative flex justify-center text-xs uppercase"><span className="bg-[#1a282b] px-2 text-slate-500">External Authentication</span></div>
                  </div>

                  <div className="flex flex-col gap-3">
                    <button 
                      onClick={handleGoogleSignIn}
                      className="w-full bg-slate-800/50 hover:bg-slate-800 border border-slate-700 text-slate-200 py-3 rounded-lg transition-all flex items-center justify-center gap-3"
                    >
                      <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="currentColor" />
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="currentColor" />
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.28.81-.56z" fill="currentColor" />
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="currentColor" />
                      </svg>
                      <span className="text-sm font-medium">Continue with Google</span>
                    </button>
                    <button 
                      onClick={handleGuestEntry}
                      className="w-full bg-primary/5 hover:bg-primary/10 border border-primary/20 text-primary py-3 rounded-lg transition-all flex items-center justify-center gap-3"
                    >
                      <span className="text-sm font-bold uppercase tracking-widest">Enter as Guest (Limited Access)</span>
                    </button>
                  </div>
                </>
              )}

              <div className="mt-8 text-center">
                <p className="text-slate-400 text-sm">
                  {mode === 'login' ? (
                    <>
                      New to the simulations? 
                      <button onClick={() => onViewChange('signup')} className="text-primary font-semibold hover:underline decoration-primary/30 underline-offset-4 ml-1">Establish Rank</button>
                    </>
                  ) : (
                    <>
                      Already have a profile? 
                      <button onClick={() => onViewChange('login')} className="text-primary font-semibold hover:underline decoration-primary/30 underline-offset-4 ml-1">Access Terminal</button>
                    </>
                  )}
                </p>
              </div>
            </div>

            {/* Terminal Metadata */}
            <div className="mt-6 flex justify-between px-2 text-[10px] text-slate-500 uppercase tracking-widest font-mono">
              <span>Region: EU-WEST-1</span>
              <span>Status: {loading ? 'Processing...' : 'Connected'}</span>
              <span>Enc: AES-256-GCM</span>
            </div>
          </motion.div>
        </main>

        {/* Footer */}
        <footer className="p-8 text-center border-t border-slate-200/5 bg-background-dark/30">
          <p className="text-slate-500 text-xs">© 2024 World Agent Geopolitical Simulations. All rights reserved. Access authorized for Commanders only.</p>
        </footer>
      </div>
    </div>
  );
};
