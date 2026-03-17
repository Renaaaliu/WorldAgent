import React from 'react';
import { motion } from 'motion/react';
import { Globe, Shield, Handshake, TrendingUp, ChevronRight } from 'lucide-react';
import { GenImage } from './GenImage';
import { useLanguage } from '../contexts/LanguageContext';

interface LandingPageProps {
  onStart: () => void;
  onLogin: () => void;
  onGuestEntry: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onStart, onLogin, onGuestEntry }) => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation Bar */}
      <header className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 md:px-20 lg:px-40 bg-background-dark/70 backdrop-blur-xl border-b border-primary/10">
        <div className="flex items-center gap-2 text-primary">
          <Globe className="w-8 h-8" />
          <div className="flex flex-col">
            <h2 className="text-slate-100 text-xl font-bold tracking-tight">{t('app.title')}</h2>
            <p className="text-primary text-[10px] font-black uppercase tracking-[0.2em] leading-none">Plan.Negotiate.Evolve.</p>
          </div>
        </div>
        <nav className="hidden md:flex items-center gap-10">
          <button onClick={() => alert(t('landing.alert.simulation'))} className="text-slate-300 hover:text-primary transition-colors text-sm font-medium">{t('landing.nav.simulation')}</button>
          <button onClick={() => alert(t('landing.alert.missions'))} className="text-slate-300 hover:text-primary transition-colors text-sm font-medium">{t('landing.nav.missions')}</button>
          <button onClick={() => alert(t('landing.alert.leaderboard'))} className="text-slate-300 hover:text-primary transition-colors text-sm font-medium">{t('landing.nav.leaderboard')}</button>
          <button onClick={() => alert(t('landing.alert.docs'))} className="text-slate-300 hover:text-primary transition-colors text-sm font-medium">{t('landing.nav.docs')}</button>
        </nav>
        <div className="flex items-center gap-4">
          <button 
            onClick={onLogin}
            className="hidden sm:flex cursor-pointer items-center justify-center rounded-lg h-10 px-5 border border-primary/20 text-slate-100 text-sm font-semibold hover:bg-primary/10 transition-all"
          >
            {t('landing.login')}
          </button>
          <button 
            onClick={onStart}
            className="flex cursor-pointer items-center justify-center rounded-lg h-10 px-5 bg-primary text-background-dark text-sm font-bold shadow-[0_0_20px_rgba(32,211,238,0.3)] hover:scale-105 transition-transform"
          >
            {t('landing.start')}
          </button>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative flex flex-col items-center justify-center px-6 py-20 md:py-32 overflow-hidden min-h-[85vh]">
          <div className="absolute inset-0 hero-gradient pointer-events-none" />
          <div className="orbit-ring w-[600px] h-[600px]" />
          <div className="orbit-ring w-[900px] h-[900px] opacity-50" />
          <div className="orbit-ring w-[1200px] h-[1200px] opacity-30" />

          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative z-10 mb-12 flex justify-center items-center"
          >
            <div className="absolute inset-0 bg-primary/20 blur-[120px] rounded-full" />
            <div className="relative w-64 h-64 md:w-96 md:h-96 rounded-full overflow-hidden border border-primary/30 shadow-[0_0_80px_rgba(32,211,238,0.2)] bg-slate-900">
              <img 
                src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1000" 
                alt="High-tech Earth Logo"
                className="w-full h-full object-cover opacity-80"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <svg className="w-[140%] h-[140%] opacity-40 text-primary" viewBox="0 0 100 100">
                <ellipse cx="50" cy="50" fill="none" rx="45" ry="15" stroke="currentColor" strokeWidth="0.1" transform="rotate(-25 50 50)" />
                <ellipse cx="50" cy="50" fill="none" rx="48" ry="20" stroke="currentColor" strokeWidth="0.1" transform="rotate(15 50 50)" />
              </svg>
            </div>
          </motion.div>

          <div className="relative z-20 text-center max-w-4xl mx-auto flex flex-col items-center gap-6">
            <motion.h1 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-slate-100 text-5xl md:text-7xl font-bold tracking-tight leading-[1.1]"
            >
              {t('landing.title')}
            </motion.h1>
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-slate-400 text-lg md:text-xl max-w-2xl font-light leading-relaxed"
            >
              {t('landing.subtitle')}
            </motion.p>
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-4 mt-4 justify-center"
            >
              <button 
                onClick={onStart}
                className="flex min-w-[180px] cursor-pointer items-center justify-center rounded-lg h-14 px-8 bg-gradient-to-r from-primary to-cyan-400 text-background-dark text-lg font-bold shadow-xl hover:shadow-primary/20 transition-all active:scale-95"
              >
                {t('landing.start')}
              </button>
              <button 
                onClick={onGuestEntry}
                className="flex min-w-[180px] cursor-pointer items-center justify-center rounded-lg h-14 px-8 bg-slate-800/50 backdrop-blur-md border border-slate-700 text-slate-100 text-lg font-semibold hover:bg-slate-700/50 transition-all"
              >
                {t('landing.guest')}
              </button>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="px-6 py-20 lg:px-40 bg-slate-900/30">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {[
              { icon: <TrendingUp />, title: t('landing.features.dynamics'), desc: t('landing.features.dynamics.desc') },
              { icon: <Handshake />, title: t('landing.features.alliances'), desc: t('landing.features.alliances.desc') },
              { icon: <Shield />, title: t('landing.features.engines'), desc: t('landing.features.engines.desc') }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col gap-4 p-8 rounded-2xl bg-slate-800/40 border border-slate-700/50 hover:border-primary/40 transition-colors group"
              >
                <div className="text-primary text-4xl mb-2 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-slate-100 text-xl font-bold">{feature.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-20 flex flex-wrap justify-center gap-12 border-t border-slate-800 pt-16">
            {[
              { label: t('landing.stats.agents'), value: '125K+' },
              { label: t('landing.stats.simulations'), value: '2.4M' },
              { label: t('landing.stats.nations'), value: '195' }
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <p className="text-slate-500 text-sm uppercase tracking-widest font-semibold mb-1">{stat.label}</p>
                <p className="text-slate-100 text-4xl font-bold">{stat.value}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Mission Control Section */}
        <section className="px-6 py-32 lg:px-40 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1 space-y-6">
            <h2 className="text-slate-100 text-4xl md:text-5xl font-bold leading-tight">
              {t('landing.mission.title')}
            </h2>
            <p className="text-slate-400 text-lg leading-relaxed">
              {t('landing.mission.desc')}
            </p>
            <ul className="space-y-4">
              {[
                t('landing.mission.item1'),
                t('landing.mission.item2'),
                t('landing.mission.item3')
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-300">
                  <Shield className="w-5 h-5 text-primary" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex-1 w-full aspect-video rounded-2xl bg-slate-800 border border-slate-700 shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-slate-900/40 z-10" />
            <GenImage 
              className="w-full h-full object-cover" 
              prompt="Futuristic mission control dashboard with holographic maps and data analytics" 
              alt="Dashboard"
            />
            <div className="absolute top-4 left-4 z-20 bg-slate-900/80 backdrop-blur p-3 rounded-lg border border-primary/20 flex gap-2 items-center">
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span className="text-[10px] text-slate-100 uppercase font-bold tracking-widest">{t('landing.conflict')}</span>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-6 py-24 mb-20">
          <div className="max-w-5xl mx-auto rounded-3xl bg-gradient-to-br from-primary/20 via-slate-900 to-slate-900 border border-primary/30 p-12 md:p-20 text-center relative overflow-hidden">
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/10 rounded-full blur-[80px]" />
            <div className="relative z-10 space-y-8">
              <h2 className="text-slate-100 text-4xl md:text-6xl font-bold">{t('landing.ready')}</h2>
              <p className="text-slate-400 text-xl max-w-xl mx-auto font-light">
                {t('landing.ready.desc')}
              </p>
              <div className="flex justify-center">
                <button 
                  onClick={onStart}
                  className="flex min-w-[240px] cursor-pointer items-center justify-center rounded-lg h-16 px-10 bg-primary text-background-dark text-xl font-bold shadow-[0_0_30px_rgba(32,211,238,0.4)] hover:scale-105 transition-all"
                >
                  {t('landing.launch')}
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="px-6 py-12 lg:px-40 border-t border-slate-800/50 bg-slate-950/50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2 text-primary opacity-80">
            <Globe className="w-6 h-6" />
            <span className="text-slate-100 font-bold">{t('app.title')}</span>
          </div>
          <div className="flex gap-8 text-slate-500 text-sm">
            <button onClick={() => alert('Privacy Policy: Your strategic data is encrypted and never shared with 3rd parties.')} className="hover:text-primary transition-colors">{t('footer.privacy')}</button>
            <button onClick={() => alert('Terms of Service: By using World Agent, you agree to the Geopolitical Conduct Protocols.')} className="hover:text-primary transition-colors">{t('footer.terms')}</button>
            <button onClick={() => alert('Contact Support: Secure line established. How can we assist you, Commander?')} className="hover:text-primary transition-colors">{t('footer.contact')}</button>
          </div>
          <div className="text-slate-600 text-xs">
            © 2024 {t('app.title')} Geopolitical Systems. {t('footer.rights')}
          </div>
        </div>
      </footer>
    </div>
  );
};
