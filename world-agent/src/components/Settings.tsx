import React, { useState } from 'react';
import { motion } from 'motion/react';
import { StrategicHeader } from './StrategicHeader';
import { 
  Settings as SettingsIcon, Shield, CreditCard, 
  User, Bell, Lock, Eye, EyeOff, 
  Check, Zap, Star, ArrowRight,
  Globe, BarChart3, Users, FileText, Handshake,
  AlertTriangle
} from 'lucide-react';
import { cn } from '../lib/utils';
import { useLanguage, Language } from '../contexts/LanguageContext';

export const Settings: React.FC<{ 
  onViewChange: (view: any) => void;
  isPremium: boolean;
  onTogglePremium: () => void;
  isGuest?: boolean;
  purchasedScenarios?: string[];
  user?: any;
  onLogout?: () => void;
  highContrast: boolean;
  setHighContrast: (val: boolean) => void;
}> = ({ onViewChange, isPremium, onTogglePremium, isGuest = false, purchasedScenarios = [], user, onLogout, highContrast, setHighContrast }) => {
  const { language, setLanguage, t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'command' | 'security' | 'membership' | 'scenarios'>('command');
  const [incognito, setIncognito] = useState(false);
  const [avatar, setAvatar] = useState('https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200');

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const languages: { name: Language; flag: string }[] = [
    { name: 'English', flag: '🇺🇸' },
    { name: 'Chinese', flag: '🇨🇳' },
    { name: 'French', flag: '🇫🇷' },
    { name: 'Spanish', flag: '🇪🇸' },
    { name: 'Russian', flag: '🇷🇺' },
    { name: 'Italian', flag: '🇮🇹' },
    { name: 'Arabic', flag: '🇸🇦' },
    { name: 'Japanese', flag: '🇯🇵' },
    { name: 'German', flag: '🇩🇪' },
    { name: 'Portuguese', flag: '🇵🇹' },
    { name: 'Korean', flag: '🇰🇷' },
    { name: 'Hindi', flag: '🇮🇳' },
  ];

  const tabs = [
    { id: 'command', label: t('settings.tab.command'), icon: <SettingsIcon className="w-4 h-4" /> },
    { id: 'security', label: t('settings.tab.security'), icon: <Shield className="w-4 h-4" /> },
    { id: 'membership', label: t('settings.tab.membership'), icon: <CreditCard className="w-4 h-4" /> },
    { id: 'scenarios', label: t('settings.tab.scenarios'), icon: <Zap className="w-4 h-4" /> },
  ];

  const scenarioDetails: Record<string, { title: string; type: string }> = {
    'cold-war-62': { title: 'Cuban Missile Crisis 1962', type: 'Historical' },
    'climate-2050': { title: 'Climate Collapse 2050', type: 'Future' },
    'mars-2100': { title: 'Mars Colonization 2100', type: 'Future' },
    'ww2-alternate': { title: 'Alternate WWII', type: 'Alternate' },
  };

  const handleUpgrade = () => {
    onTogglePremium();
    setActiveTab('membership');
  };

  return (
    <div className="min-h-screen flex flex-col bg-background-deep">
      <StrategicHeader 
        currentView="settings" 
        onViewChange={onViewChange} 
        user={user}
        onLogout={onLogout}
      />

      <main className="flex-1 px-6 lg:px-40 py-10 max-w-7xl mx-auto w-full">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-black leading-tight tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-primary">
              {t('settings.title')}
            </h1>
            <p className="text-slate-400 text-lg max-w-2xl">
              {t('settings.desc')}
            </p>
          </div>

          {isGuest && (
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-amber-200">{t('settings.guest.title')}</span>
                  <span className="text-xs text-amber-500/80">{t('settings.guest.desc')}</span>
                </div>
              </div>
              <button 
                onClick={() => onViewChange('login')}
                className="px-4 py-2 rounded-lg bg-amber-500 text-background-dark text-xs font-bold hover:bg-amber-400 transition-all"
              >
                {t('settings.register')}
              </button>
            </div>
          )}

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Tabs */}
            <div className="w-full lg:w-64 shrink-0 flex flex-col gap-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all border",
                    activeTab === tab.id 
                      ? "bg-primary text-background-dark border-primary shadow-lg shadow-primary/20" 
                      : "bg-primary/5 text-slate-400 border-primary/10 hover:border-primary/30 hover:text-primary"
                  )}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Content Area */}
            <div className="flex-1">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="glass-panel p-8 rounded-2xl border-primary/10"
              >
                {activeTab === 'command' && (
                  <div className="flex flex-col gap-8">
                    <div className="flex items-center gap-4 pb-6 border-b border-primary/10">
                      <div className="relative group">
                        <div className="size-20 rounded-full border-2 border-primary/30 bg-cover bg-center overflow-hidden" style={{ backgroundImage: `url("${avatar}")` }}>
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <User className="w-6 h-6 text-white" />
                          </div>
                        </div>
                        <input 
                          type="file" 
                          accept="image/*" 
                          className="absolute inset-0 opacity-0 cursor-pointer" 
                          onChange={handleAvatarChange}
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <h3 className="text-xl font-bold text-white">{user?.username || 'Commander Liu'}</h3>
                        <p className="text-slate-400 text-sm">{t('settings.command.level')} • {t('settings.command.joined')}</p>
                        <div className="relative">
                          <button className="text-primary text-xs font-bold hover:underline mt-1">{t('settings.avatar.change')}</button>
                          <input 
                            type="file" 
                            accept="image/*" 
                            className="absolute inset-0 opacity-0 cursor-pointer" 
                            onChange={handleAvatarChange}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="flex flex-col gap-2">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">{t('settings.display.name')}</label>
                        <input 
                          type="text" 
                          defaultValue="Commander Liu"
                          className="bg-primary/5 border border-primary/20 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-primary/50 outline-none transition-all"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">{t('settings.command.email')}</label>
                        <input 
                          type="email" 
                          defaultValue="liu172790@gmail.com"
                          className="bg-primary/5 border border-primary/20 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-primary/50 outline-none transition-all"
                        />
                      </div>
                    </div>

                      <div className="flex flex-col gap-4">
                        <h4 className="text-sm font-bold text-white uppercase tracking-widest">{t('settings.lang.title')}</h4>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                          {languages.map((lang) => (
                            <button
                              key={lang.name}
                              onClick={() => setLanguage(lang.name)}
                              className={cn(
                                "flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-bold transition-all border",
                                language === lang.name
                                  ? "bg-primary text-background-dark border-primary shadow-lg shadow-primary/20"
                                  : "bg-primary/5 text-slate-400 border-primary/10 hover:border-primary/30 hover:text-primary"
                              )}
                            >
                              <span className="text-lg">{lang.flag}</span>
                              {lang.name}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="flex flex-col gap-4">
                        <h4 className="text-sm font-bold text-white uppercase tracking-widest">{t('settings.pref.title')}</h4>
                      <div className="flex items-center justify-between p-4 rounded-xl bg-primary/5 border border-primary/10">
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-slate-200">High-Contrast Mode</span>
                          <span className="text-xs text-slate-500">Enhance visibility for critical data feeds.</span>
                        </div>
                        <button 
                          onClick={() => setHighContrast(!highContrast)}
                          className={cn(
                            "size-12 rounded-full border transition-all flex items-center p-1",
                            highContrast ? "bg-primary border-primary justify-end" : "bg-slate-800 border-primary/20 justify-start"
                          )}
                        >
                          <motion.div 
                            layout
                            className={cn("size-5 rounded-full", highContrast ? "bg-background-dark" : "bg-primary/20")} 
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'security' && (
                  <div className="flex flex-col gap-8">
                    <div className="flex flex-col gap-2">
                      <h3 className="text-xl font-bold text-white flex items-center gap-2">
                        <Lock className="w-5 h-5 text-primary" />
                        {t('settings.security.title')}
                      </h3>
                      <p className="text-slate-400 text-sm">{t('settings.security.desc')}</p>
                    </div>

                    <div className="space-y-4">
                      <div className="p-4 rounded-xl bg-primary/5 border border-primary/10 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center">
                            <EyeOff className="w-5 h-5 text-primary" />
                          </div>
                          <div className="flex flex-col">
                            <span className="text-sm font-bold text-slate-200">{t('settings.security.incognito')}</span>
                            <span className="text-xs text-slate-500">{t('settings.security.incognito.desc')}</span>
                          </div>
                        </div>
                        <button 
                          onClick={() => setIncognito(!incognito)}
                          className={cn(
                            "px-4 py-2 rounded-lg text-xs font-bold border transition-all",
                            incognito 
                              ? "bg-primary text-background-dark border-primary" 
                              : "bg-primary/20 text-primary border-primary/30 hover:bg-primary/30"
                          )}
                        >
                          {incognito ? 'Enabled' : 'Enable'}
                        </button>
                      </div>

                      <div className="p-4 rounded-xl bg-primary/5 border border-primary/10 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center">
                            <Shield className="w-5 h-5 text-primary" />
                          </div>
                          <div className="flex flex-col">
                            <span className="text-sm font-bold text-slate-200">{t('settings.security.2fa')}</span>
                            <span className="text-xs text-slate-500">{t('settings.security.2fa.desc')}</span>
                          </div>
                        </div>
                        <button className="px-4 py-2 rounded-lg bg-primary text-background-dark text-xs font-bold">{t('settings.security.configure')}</button>
                      </div>

                      <div className="p-4 rounded-xl bg-red-500/5 border border-red-500/20 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="size-10 rounded-lg bg-red-500/10 flex items-center justify-center">
                            <Lock className="w-5 h-5 text-red-400" />
                          </div>
                          <div className="flex flex-col">
                            <span className="text-sm font-bold text-red-400">{t('settings.security.erasure')}</span>
                            <span className="text-xs text-slate-500">{t('settings.security.erasure.desc')}</span>
                          </div>
                        </div>
                        <button className="px-4 py-2 rounded-lg bg-red-500/20 text-red-400 text-xs font-bold border border-red-500/30">{t('settings.security.initiate')}</button>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'membership' && (
                  <div className="flex flex-col gap-8">
                    <div className="flex flex-col gap-2">
                      <h3 className="text-xl font-bold text-white flex items-center gap-2">
                        <Star className="w-5 h-5 text-amber-500" />
                        {t('settings.membership.title')}
                      </h3>
                      <p className="text-slate-400 text-sm">{t('settings.membership.desc')}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Free Tier */}
                      <div className={cn(
                        "p-6 rounded-2xl flex flex-col gap-6 transition-all",
                        !isPremium ? "bg-white/5 border border-white/10" : "bg-slate-900/50 border border-slate-800 opacity-60"
                      )}>
                        <div className="flex flex-col gap-1">
                          <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                            {!isPremium ? t('settings.membership.current') : t('settings.membership.legacy')}
                          </span>
                          <h4 className="text-2xl font-black text-white">{t('settings.membership.free')}</h4>
                        </div>
                        <ul className="space-y-3">
                          {[
                            'Explore interactive world map',
                            'Select and represent a country',
                            'View national data',
                            'Participate in national forums',
                            'Vote on policy proposals',
                            'Join basic diplomatic interactions',
                            'View global events'
                          ].map((feature, i) => (
                            <li key={i} className="flex items-start gap-3 text-sm text-slate-400">
                              <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                        {isPremium && (
                          <button 
                            onClick={onTogglePremium}
                            className="mt-auto text-xs font-bold text-slate-500 hover:text-white transition-colors"
                          >
                            {t('settings.membership.downgrade')}
                          </button>
                        )}
                      </div>

                      {/* Premium Tier */}
                      <div className={cn(
                        "p-6 rounded-2xl border flex flex-col gap-6 relative overflow-hidden transition-all",
                        isPremium 
                          ? "bg-primary/20 border-primary shadow-[0_0_30px_rgba(0,255,255,0.1)]" 
                          : "bg-primary/10 border-primary/30"
                      )}>
                        {isPremium && (
                          <div className="absolute top-0 right-0 bg-primary text-background-dark px-4 py-1 text-[10px] font-black uppercase tracking-tighter rounded-bl-xl">{t('settings.membership.active')}</div>
                        )}
                        {!isPremium && (
                          <div className="absolute top-0 right-0 bg-primary/50 text-background-dark px-4 py-1 text-[10px] font-black uppercase tracking-tighter rounded-bl-xl">Recommended</div>
                        )}
                        <div className="flex flex-col gap-1">
                          <span className="text-xs font-bold text-primary uppercase tracking-widest">Strategic Upgrade</span>
                          <h4 className="text-2xl font-black text-white">{t('settings.membership.premium')}</h4>
                          <div className="flex items-baseline gap-1 mt-2">
                            <span className="text-3xl font-black text-white">{t('settings.membership.price')}</span>
                            <span className="text-slate-400 text-sm">{t('settings.membership.month')}</span>
                          </div>
                        </div>
                        
                        <div className="space-y-4">
                          <div className="flex flex-col gap-2">
                            <span className="text-[10px] font-bold text-primary uppercase tracking-widest">{t('settings.membership.advanced.data')}</span>
                            <ul className="space-y-2">
                              {['GDP growth forecasting', 'Population projections', 'Economic simulations', 'Policy impact analysis'].map((tool, i) => (
                                <li key={i} className="flex items-center gap-2 text-xs font-bold text-slate-200">
                                  <Zap className="w-3 h-3 text-primary" />
                                  {tool}
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="flex flex-col gap-2">
                            <span className="text-[10px] font-bold text-primary uppercase tracking-widest">{t('settings.membership.advanced.diplomacy')}</span>
                            <ul className="space-y-2">
                              {['Create diplomatic meetings', 'Initiate alliances', 'Draft international treaties', 'Propose global initiatives'].map((tool, i) => (
                                <li key={i} className="flex items-center gap-2 text-xs font-bold text-slate-200">
                                  <Handshake className="w-3 h-3 text-primary" />
                                  {tool}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        <button 
                          onClick={!isPremium ? onTogglePremium : undefined}
                          disabled={isPremium}
                          className={cn(
                            "w-full py-4 rounded-xl font-black text-sm shadow-lg transition-all flex items-center justify-center gap-2",
                            isPremium 
                              ? "bg-slate-800 text-slate-400 cursor-default" 
                              : "bg-primary text-background-dark shadow-primary/20 hover:brightness-110"
                          )}
                        >
                          {isPremium ? t('settings.membership.active') : t('settings.membership.upgrade')} 
                          {!isPremium && <ArrowRight className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    <div className="p-6 rounded-2xl bg-primary/5 border border-primary/10">
                      <h4 className="text-sm font-bold text-white mb-4 uppercase tracking-widest">{t('settings.membership.comparison')}</h4>
                      <div className="grid grid-cols-2 gap-8">
                        <div className="flex flex-col gap-3">
                          <span className="text-xs font-bold text-slate-500 uppercase">{t('settings.membership.comparison.free')}</span>
                          <ul className="space-y-2">
                            <li className="text-xs text-slate-400 flex items-center gap-2">
                              <div className="size-1.5 rounded-full bg-slate-600" />
                              Join diplomatic meetings
                            </li>
                            <li className="text-xs text-slate-400 flex items-center gap-2">
                              <div className="size-1.5 rounded-full bg-slate-600" />
                              Vote on treaties
                            </li>
                          </ul>
                        </div>
                        <div className="flex flex-col gap-3">
                          <span className="text-xs font-bold text-primary uppercase">{t('settings.membership.comparison.premium')}</span>
                          <ul className="space-y-2">
                            <li className="text-xs text-slate-200 flex items-center gap-2">
                              <div className="size-1.5 rounded-full bg-primary" />
                              Create diplomatic meetings
                            </li>
                            <li className="text-xs text-slate-200 flex items-center gap-2">
                              <div className="size-1.5 rounded-full bg-primary" />
                              Initiate alliances
                            </li>
                            <li className="text-xs text-slate-200 flex items-center gap-2">
                              <div className="size-1.5 rounded-full bg-primary" />
                              Draft international treaties
                            </li>
                            <li className="text-xs text-slate-200 flex items-center gap-2">
                              <div className="size-1.5 rounded-full bg-primary" />
                              Propose global initiatives
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {activeTab === 'scenarios' && (
                  <div className="flex flex-col gap-8">
                    <div className="flex flex-col gap-2">
                      <h3 className="text-xl font-bold text-white flex items-center gap-2">
                        <Zap className="w-5 h-5 text-primary" />
                        {t('settings.scenarios.title')}
                      </h3>
                      <p className="text-slate-400 text-sm">{t('settings.scenarios.desc')}</p>
                    </div>

                    {purchasedScenarios.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {purchasedScenarios.map((id) => (
                          <div key={id} className="p-4 rounded-xl bg-primary/5 border border-primary/10 flex items-center justify-between">
                            <div className="flex flex-col">
                              <span className="text-sm font-bold text-slate-200">{scenarioDetails[id]?.title}</span>
                              <span className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">{scenarioDetails[id]?.type}</span>
                            </div>
                            <button 
                              onClick={() => onViewChange('map-selection')}
                              className="text-primary text-xs font-bold hover:underline"
                            >
                              {t('settings.scenarios.initialize')}
                            </button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="py-12 flex flex-col items-center justify-center border-2 border-dashed border-slate-800 rounded-2xl gap-4">
                        <p className="text-slate-500 text-sm italic">{t('settings.scenarios.none')}</p>
                        <button 
                          onClick={() => onViewChange('scenario-market')}
                          className="bg-primary/10 text-primary px-6 py-2 rounded-lg text-xs font-bold uppercase tracking-widest border border-primary/20 hover:bg-primary/20 transition-all"
                        >
                          {t('settings.scenarios.market')}
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
