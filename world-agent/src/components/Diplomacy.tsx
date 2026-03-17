import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { StrategicHeader } from './StrategicHeader';
import { 
  Globe, Handshake, Shield, Users, 
  TrendingUp, AlertTriangle, MessageSquare,
  ArrowRight, ChevronRight, Filter, Search,
  Flag, Award, Star, Lock, AlertCircle, X,
  MapPin, Send
} from 'lucide-react';
import { cn } from '../lib/utils';
import { useLanguage } from '../contexts/LanguageContext';

export const Diplomacy: React.FC<{ 
  onViewChange: (view: any) => void;
  isPremium?: boolean;
  isGuest?: boolean;
  user?: any;
  onLogout?: () => void;
}> = ({ onViewChange, isPremium = false, isGuest = false, user, onLogout }) => {
  const { t } = useLanguage();
  const [activeModal, setActiveModal] = useState<'partners' | 'treaties' | 'envoy' | null>(null);
  const [envoyData, setEnvoyData] = useState({ target: '', mission: 'Trade' });

  const handleDeployEnvoy = () => {
    if (!envoyData.target || isGuest) return;
    alert(`Diplomatic mission initiated: ${envoyData.mission} envoy deployed to ${envoyData.target}.`);
    setActiveModal(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background-deep">
      <StrategicHeader 
        currentView="diplomacy" 
        onViewChange={onViewChange} 
        user={user}
        onLogout={onLogout}
      />

      <main className="flex-1 px-6 lg:px-40 py-10 max-w-7xl mx-auto w-full">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6">
            <div className="flex flex-col gap-2">
              <h1 className="text-4xl font-black leading-tight tracking-tight text-white flex items-center gap-4">
                <Handshake className="w-10 h-10 text-primary" />
                Diplomatic Relations Hub
              </h1>
              <p className="text-slate-400 text-lg">Manage international alliances, negotiate treaties, and monitor global sentiment.</p>
            </div>
            <div className="flex gap-3">
              <button 
                onClick={() => !isGuest && setActiveModal('partners')}
                disabled={isGuest}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${isGuest ? 'bg-slate-800/50 border-slate-800 text-slate-600 cursor-not-allowed' : 'bg-slate-800 border border-slate-700 text-slate-300 hover:bg-slate-700'}`}
              >
                <Search className="w-5 h-5" />
                {t('diplomacy.partners.connect')}
              </button>
              <div className="relative group">
                <button 
                  onClick={() => !isPremium && !isGuest && onViewChange('settings')}
                  disabled={isGuest}
                  className={cn(
                    "flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all shadow-lg",
                    isGuest
                      ? "bg-slate-800 border border-slate-800 text-slate-600 cursor-not-allowed"
                      : isPremium 
                        ? "bg-primary text-background-dark hover:scale-105 shadow-primary/20" 
                        : "bg-slate-800 border border-slate-700 text-slate-500 cursor-pointer"
                  )}
                >
                  <MessageSquare className="w-5 h-5" />
                  Initiate Summit
                  {(!isPremium || isGuest) && <Lock className="w-4 h-4 ml-1" />}
                </button>
                {(isGuest || !isPremium) && (
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-background-dark border border-primary/20 rounded-lg text-[10px] text-primary font-bold text-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                    {isGuest ? 'GUEST RESTRICTION: Register to initiate summits.' : 'PREMIUM FEATURE: Create diplomatic meetings and summits.'}
                  </div>
                )}
              </div>
            </div>
          </div>

          {isGuest && (
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-amber-500 shrink-0" />
              <p className="text-xs text-amber-200/80 font-medium">
                <span className="font-bold text-amber-500 uppercase mr-2">Guest Access:</span>
                Diplomatic missions and treaty negotiations are restricted. Register to engage in global diplomacy.
              </p>
            </div>
          )}

          {/* Global Sentiment Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { label: 'Allies', value: '12', icon: <Star className="text-amber-400" /> },
              { label: 'Trade Partners', value: '28', icon: <TrendingUp className="text-emerald-400" /> },
              { label: 'Rivals', value: '4', icon: <AlertTriangle className="text-red-500" /> },
              { label: 'Neutral', value: '156', icon: <Users className="text-slate-400" /> }
            ].map((stat, i) => (
              <div key={i} className="glass-panel p-6 rounded-2xl border-primary/5 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <div className="p-2 bg-slate-800 rounded-lg">{stat.icon}</div>
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Global</span>
                </div>
                <span className="text-slate-500 text-xs font-bold uppercase tracking-widest">{stat.label}</span>
                <span className="text-3xl font-bold text-white">{stat.value}</span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Active Treaties & Missions */}
            <div className="lg:col-span-2 space-y-8">
              <div className="glass-panel rounded-2xl p-8 border-primary/10">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Shield className="w-5 h-5 text-primary" />
                    Active Treaties & Accords
                  </h3>
                  <button 
                    onClick={() => setActiveModal('treaties')}
                    className="text-primary text-xs font-bold uppercase tracking-widest hover:underline"
                  >
                    View All
                  </button>
                </div>
                <div className="space-y-4">
                  {[
                    { name: 'Arctic Resource Treaty', partner: 'Nordic Council', type: 'Economic', status: 'Active', expiry: '2028' },
                    { name: 'Maritime Security Pact', partner: 'Brazil', type: 'Defense', status: 'Active', expiry: '2030' },
                    { name: 'Signal Intelligence Sharing', partner: 'EU', type: 'Intelligence', status: 'Pending', expiry: 'N/A' }
                  ].map((treaty, i) => (
                    <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-slate-800/40 border border-slate-700 group hover:border-primary/30 transition-all">
                      <div className="flex items-center gap-4">
                        <div className="size-12 rounded-lg bg-slate-900 flex items-center justify-center text-primary">
                          <Flag className="w-6 h-6" />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-slate-200">{treaty.name}</span>
                          <span className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">{treaty.partner} • {treaty.type}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-8">
                        <div className="flex flex-col items-end">
                          <span className="text-[10px] text-slate-500 uppercase font-bold">Expires</span>
                          <span className="text-xs font-bold text-slate-300">{treaty.expiry}</span>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border ${treaty.status === 'Active' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500' : 'bg-amber-500/10 border-amber-500/20 text-amber-500'}`}>
                          {treaty.status}
                        </div>
                        <ChevronRight className="w-5 h-5 text-slate-600 group-hover:text-primary transition-colors" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass-panel rounded-2xl p-8 border-primary/10">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Users className="w-5 h-5 text-primary" />
                    Diplomatic Missions
                  </h3>
                  <button 
                    disabled={isGuest}
                    onClick={() => !isGuest && setActiveModal('envoy')}
                    className={`text-xs font-bold uppercase tracking-widest hover:underline ${isGuest ? 'text-slate-600 cursor-not-allowed' : 'text-primary'}`}
                  >
                    Deploy Envoy
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { country: 'China', mission: 'Trade Negotiation', progress: 65, status: 'In Progress' },
                    { country: 'Russia', mission: 'De-escalation', progress: 20, status: 'Stalled' },
                    { country: 'Japan', mission: 'Tech Exchange', progress: 90, status: 'Finalizing' },
                    { country: 'UK', mission: 'Security Summit', progress: 45, status: 'In Progress' }
                  ].map((mission, i) => (
                    <div key={i} className="p-5 rounded-2xl bg-slate-800/40 border border-slate-700 flex flex-col gap-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-slate-200">{mission.country}</span>
                        <span className={`text-[8px] font-bold uppercase px-1.5 py-0.5 rounded ${mission.status === 'Stalled' ? 'bg-red-500/10 text-red-500' : 'bg-primary/10 text-primary'}`}>
                          {mission.status}
                        </span>
                      </div>
                      <span className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">{mission.mission}</span>
                      <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-primary h-full transition-all" style={{ width: `${mission.progress}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Sidebar: Global Influence */}
            <div className="space-y-8">
              <div className="glass-panel rounded-2xl p-6 border-primary/10">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-6 flex items-center gap-2">
                  <Award className="w-4 h-4 text-primary" />
                  Global Influence
                </h3>
                <div className="space-y-6">
                  <div className="flex flex-col items-center justify-center py-4">
                    <div className="relative size-32">
                      <svg className="size-full" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="45" fill="none" stroke="#1e293b" strokeWidth="8" />
                        <circle cx="50" cy="50" r="45" fill="none" stroke="#20d3ee" strokeWidth="8" strokeDasharray="283" strokeDashoffset="45" transform="rotate(-90 50 50)" />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-2xl font-black text-white">84</span>
                        <span className="text-[8px] text-slate-500 uppercase font-bold">Influence</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-slate-400">Soft Power</span>
                      <span className="text-xs font-bold text-emerald-500">High</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-slate-400">Economic Leverage</span>
                      <span className="text-xs font-bold text-emerald-500">Extreme</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-slate-400">Military Deterrence</span>
                      <span className="text-xs font-bold text-amber-500">Moderate</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="glass-panel rounded-2xl p-6 border-primary/10">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-6 flex items-center gap-2">
                  <Filter className="w-4 h-4 text-primary" />
                  Diplomatic Pulse
                </h3>
                <div className="space-y-4">
                  {[
                    { event: 'UN Vote', detail: 'Voted in favor of Climate Accord.', time: '2h ago' },
                    { event: 'Embassy Open', detail: 'New mission established in Brasilia.', time: '1d ago' },
                    { event: 'Sanction Lift', detail: 'Trade restrictions removed for Sector 9.', time: '3d ago' }
                  ].map((pulse, i) => (
                    <div key={i} className="flex gap-3 items-start">
                      <div className="size-1.5 rounded-full bg-primary mt-1.5" />
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-slate-200">{pulse.event}</span>
                        <p className="text-[10px] text-slate-500 leading-relaxed">{pulse.detail}</p>
                        <span className="text-[8px] text-slate-600 mt-1">{pulse.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass-panel rounded-2xl p-6 border-primary/10 bg-primary/5">
                <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Strategic Opportunity</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  "The **Nordic Council** is seeking a new security partner. Establishing a defense pact now would secure the Northern trade routes for the next decade."
                </p>
                <button 
                  onClick={() => !isPremium && !isGuest && onViewChange('settings')}
                  disabled={isGuest}
                  className={cn(
                    "mt-4 w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-[10px] uppercase tracking-widest shadow-lg transition-all",
                    isGuest
                      ? "bg-slate-800 border border-slate-800 text-slate-600 cursor-not-allowed"
                      : isPremium 
                        ? "bg-primary text-background-dark shadow-primary/20 hover:scale-105" 
                        : "bg-slate-800 border border-slate-700 text-slate-500"
                  )}
                >
                  {isGuest ? 'Alliance Tools Locked' : isPremium ? 'Propose Alliance' : 'Unlock Alliance Tools'}
                  {(isGuest || !isPremium) ? <Lock className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Modals */}
      <AnimatePresence>
        {activeModal === 'partners' && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setActiveModal(null)} className="absolute inset-0 bg-background-deep/80 backdrop-blur-md" />
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="relative w-full max-w-2xl glass-panel rounded-3xl border-primary/20 p-8 shadow-2xl bg-background-dark">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-black text-white uppercase tracking-tight">{t('diplomacy.partners.title')}</h2>
                <button onClick={() => setActiveModal(null)} className="p-2 rounded-lg hover:bg-slate-800 text-slate-400"><X className="w-6 h-6" /></button>
              </div>
              <div className="relative mb-8">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary/60" />
                <input type="text" placeholder={t('diplomacy.partners.search')} className="w-full bg-slate-900/50 border border-primary/20 rounded-xl py-4 pl-12 pr-4 text-white placeholder:text-slate-600 focus:ring-2 focus:ring-primary/30 outline-none" />
              </div>
              <div className="space-y-4">
                <h3 className="text-xs font-bold text-primary uppercase tracking-widest">{t('diplomacy.partners.suggested')}</h3>
                {[
                  { name: 'Australia', region: 'Oceania', match: '94%', resources: 'Minerals, Tech' },
                  { name: 'Canada', region: 'North America', match: '88%', resources: 'Energy, Water' },
                  { name: 'Singapore', region: 'Asia', match: '82%', resources: 'Finance, Logistics' }
                ].map((partner, i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-slate-800/40 border border-slate-700 hover:border-primary/30 transition-all group">
                    <div className="flex items-center gap-4">
                      <div className="size-12 rounded-xl bg-slate-900 flex items-center justify-center text-primary border border-slate-700"><Globe className="w-6 h-6" /></div>
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-white">{partner.name}</span>
                        <span className="text-[10px] text-slate-500 uppercase font-bold">{partner.region} • {partner.resources}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <span className="text-xs font-black text-emerald-500">{partner.match} Match</span>
                      <button className="px-4 py-2 rounded-lg bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest border border-primary/20 group-hover:bg-primary group-hover:text-background-dark transition-all">{t('diplomacy.partners.connect')}</button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        )}

        {activeModal === 'treaties' && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setActiveModal(null)} className="absolute inset-0 bg-background-deep/80 backdrop-blur-md" />
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="relative w-full max-w-4xl glass-panel rounded-3xl border-primary/20 p-8 shadow-2xl bg-background-dark max-h-[80vh] overflow-hidden flex flex-col">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-black text-white uppercase tracking-tight">{t('diplomacy.treaties.all')}</h2>
                <button onClick={() => setActiveModal(null)} className="p-2 rounded-lg hover:bg-slate-800 text-slate-400"><X className="w-6 h-6" /></button>
              </div>
              <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
                {[
                  { name: 'Arctic Resource Treaty', partner: 'Nordic Council', type: 'Economic', status: 'Active', expiry: '2028' },
                  { name: 'Maritime Security Pact', partner: 'Brazil', type: 'Defense', status: 'Active', expiry: '2030' },
                  { name: 'Signal Intelligence Sharing', partner: 'EU', type: 'Intelligence', status: 'Pending', expiry: 'N/A' },
                  { name: 'Space Debris Mitigation', partner: 'Global Coalition', type: 'Environment', status: 'Active', expiry: '2045' },
                  { name: 'Quantum Encryption Standard', partner: 'Japan', type: 'Technology', status: 'Active', expiry: '2032' },
                  { name: 'Deep Sea Mining Accord', partner: 'ASEAN', type: 'Economic', status: 'Active', expiry: '2029' }
                ].map((treaty, i) => (
                  <div key={i} className="flex items-center justify-between p-5 rounded-2xl bg-slate-800/40 border border-slate-700 hover:border-primary/30 transition-all">
                    <div className="flex items-center gap-4">
                      <div className="size-12 rounded-xl bg-slate-900 flex items-center justify-center text-primary border border-slate-700"><Flag className="w-6 h-6" /></div>
                      <div className="flex flex-col">
                        <span className="text-base font-bold text-white">{treaty.name}</span>
                        <span className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">{treaty.partner} • {treaty.type}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-8">
                      <div className="flex flex-col items-end">
                        <span className="text-[10px] text-slate-500 uppercase font-bold">Expires</span>
                        <span className="text-xs font-bold text-slate-300">{treaty.expiry}</span>
                      </div>
                      <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${treaty.status === 'Active' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500' : 'bg-amber-500/10 border-amber-500/20 text-amber-500'}`}>
                        {treaty.status}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        )}

        {activeModal === 'envoy' && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setActiveModal(null)} className="absolute inset-0 bg-background-deep/80 backdrop-blur-md" />
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="relative w-full max-w-lg glass-panel rounded-3xl border-primary/20 p-8 shadow-2xl bg-background-dark">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-black text-white uppercase tracking-tight">{t('diplomacy.envoy.title')}</h2>
                <button onClick={() => setActiveModal(null)} className="p-2 rounded-lg hover:bg-slate-800 text-slate-400"><X className="w-6 h-6" /></button>
              </div>
              <div className="space-y-6">
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">{t('diplomacy.envoy.target')}</label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary/60" />
                    <input 
                      type="text" 
                      value={envoyData.target}
                      onChange={(e) => setEnvoyData({...envoyData, target: e.target.value})}
                      placeholder="e.g. France, Japan, Brazil..." 
                      className="w-full bg-slate-900 border border-primary/20 rounded-xl py-4 pl-12 pr-4 text-white placeholder:text-slate-600 focus:ring-2 focus:ring-primary/30 outline-none" 
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">{t('diplomacy.envoy.mission')}</label>
                  <select 
                    value={envoyData.mission}
                    onChange={(e) => setEnvoyData({...envoyData, mission: e.target.value})}
                    className="w-full bg-slate-900 border border-primary/20 rounded-xl py-4 px-4 text-white focus:ring-2 focus:ring-primary/30 outline-none appearance-none"
                  >
                    <option value="Trade">Trade Negotiation</option>
                    <option value="Security">Security Pact</option>
                    <option value="Intelligence">Intelligence Sharing</option>
                    <option value="De-escalation">De-escalation</option>
                  </select>
                </div>
                <button 
                  onClick={handleDeployEnvoy}
                  disabled={!envoyData.target}
                  className="w-full py-5 bg-primary text-background-dark font-black uppercase tracking-widest rounded-2xl hover:brightness-110 transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-5 h-5" />
                  {t('diplomacy.envoy.deploy')}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
