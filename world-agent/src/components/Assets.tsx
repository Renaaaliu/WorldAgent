import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { StrategicHeader } from './StrategicHeader';
import { 
  Globe, Shield, Zap, TrendingUp, 
  Package, Truck, Factory, Cpu,
  Plus, ChevronRight, BarChart3, 
  HardDrive, Droplets, Flame, AlertCircle,
  X, Info, DollarSign, MapPin, Building2
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export const Assets: React.FC<{ 
  onViewChange: (view: any) => void; 
  isGuest?: boolean;
  user?: any;
  onLogout?: () => void;
  countryData?: any;
  isDataLoading?: boolean;
}> = ({ onViewChange, isGuest, user, onLogout, countryData, isDataLoading }) => {
  const { t } = useLanguage();
  const [isAcquiring, setIsAcquiring] = useState(false);
  const [isManaging, setIsManaging] = useState(false);
  const [isExpanding, setIsExpanding] = useState(false);
  const [isAcquireModalOpen, setIsAcquireModalOpen] = useState(false);
  const [isExpandModalOpen, setIsExpandModalOpen] = useState(false);

  // Use country data if available, otherwise use defaults
  const militaryAssets = countryData?.assets?.military?.length > 0 
    ? countryData.assets.military 
    : [
        { name: '1st Expeditionary Fleet', type: t('assets.military.naval'), status: t('assets.military.deployed'), location: 'Sector 4', power: 84 },
        { name: 'Iron Guard Division', type: t('assets.military.ground'), status: t('assets.military.standby'), location: 'HQ North', power: 92 },
        { name: 'Sky-Reaper Squadron', type: t('assets.military.air'), status: t('assets.military.patrolling'), location: 'Border Alpha', power: 76 }
      ];

  const industrialAssets = countryData?.assets?.industrial?.length > 0
    ? countryData.assets.industrial.map((a: any) => ({
        ...a,
        icon: a.category === 'Tech' ? <Cpu className="w-5 h-5" /> : 
              a.category === 'Energy' ? <Flame className="w-5 h-5" /> :
              a.category === 'Trade' ? <Truck className="w-5 h-5" /> : <HardDrive className="w-5 h-5" />
      }))
    : [
        { name: 'Quantum Computing Hub', category: t('assets.industrial.tech'), efficiency: 94, icon: <Cpu className="w-5 h-5" /> },
        { name: 'Fusion Power Plant', category: t('assets.industrial.energy'), efficiency: 88, icon: <Flame className="w-5 h-5" /> },
        { name: 'Automated Logistics Center', category: t('assets.industrial.trade'), efficiency: 82, icon: <Truck className="w-5 h-5" /> },
        { name: 'Global Data Vault', category: t('assets.industrial.security'), efficiency: 96, icon: <HardDrive className="w-5 h-5" /> }
      ];

  const stats = countryData?.stats || {
    energy: '84%',
    materials: '62%',
    output: '91%',
    gdp: '$12.8T'
  };
  const [assetForm, setAssetForm] = useState({
    type: 'Industrial',
    name: '',
    location: 'Sector 4',
    budget: '',
    priority: 'Medium',
    description: ''
  });
  const [expandForm, setExpandForm] = useState({
    targetAsset: '1st Expeditionary Fleet',
    expansionType: 'Capacity Increase',
    budget: '',
    timeline: '3 Months',
    justification: ''
  });

  const handleAcquireSubmit = () => {
    if (!assetForm.name || !assetForm.budget) return;
    setIsAcquiring(true);
    setIsAcquireModalOpen(false);
    setTimeout(() => {
      setIsAcquiring(false);
      alert(`Asset Acquisition Initiated: ${assetForm.name} in ${assetForm.location}. Budget of $${assetForm.budget}B allocated.`);
    }, 2000);
  };

  const handleManage = () => {
    setIsManaging(true);
    setTimeout(() => {
      setIsManaging(false);
      alert(t('assets.alert.manage'));
    }, 1500);
  };

  const handleExpandSubmit = () => {
    if (!expandForm.budget) return;
    setIsExpanding(true);
    setIsExpandModalOpen(false);
    setTimeout(() => {
      setIsExpanding(false);
      alert(`Expansion Approved: ${expandForm.expansionType} for ${expandForm.targetAsset}. Budget of $${expandForm.budget}B allocated.`);
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background-deep">
      <StrategicHeader 
        currentView="assets" 
        onViewChange={onViewChange} 
        user={user}
        onLogout={onLogout}
      />

      <main className="flex-1 px-6 lg:px-40 py-10 max-w-7xl mx-auto w-full">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6">
            <div className="flex flex-col gap-2">
              <h1 className="text-4xl font-black leading-tight tracking-tight text-white flex items-center gap-4">
                <Package className="w-10 h-10 text-primary" />
                {t('assets.title')}
              </h1>
              <p className="text-slate-400 text-lg">{t('assets.desc')}</p>
            </div>
            <button 
              disabled={isGuest || isAcquiring}
              onClick={() => !isGuest && setIsAcquireModalOpen(true)}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all shadow-lg ${isGuest ? 'bg-slate-700 text-slate-500 cursor-not-allowed' : 'bg-primary text-background-dark hover:scale-105 shadow-primary/20'}`}
            >
              <Plus className="w-5 h-5" />
              {isAcquiring ? t('assets.acquiring') : t('assets.acquire')}
            </button>
          </div>

          {isGuest && (
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-amber-500 shrink-0" />
              <p className="text-xs text-amber-200/80 font-medium">
                <span className="font-bold text-amber-500 uppercase mr-2">{t('assets.guest.title')}:</span>
                {t('assets.guest.desc')}
              </p>
            </div>
          )}

          {/* Resource Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { label: t('assets.energy'), value: stats.energy, icon: <Zap className="text-amber-400" />, detail: 'Optimal' },
              { label: t('assets.materials'), value: stats.materials, icon: <Droplets className="text-blue-400" />, detail: 'Sufficient' },
              { label: t('assets.output'), value: stats.stability || '91%', icon: <Factory className="text-emerald-400" />, detail: 'Stable' }
            ].map((res, i) => (
              <div key={i} className="glass-panel p-6 rounded-2xl border-primary/5 flex items-center gap-6">
                <div className="size-14 rounded-2xl bg-slate-800 flex items-center justify-center text-primary">
                  {React.cloneElement(res.icon as React.ReactElement, { className: 'w-8 h-8' })}
                </div>
                <div className="flex flex-col flex-1">
                  <span className="text-slate-500 text-xs font-bold uppercase tracking-widest">{res.label}</span>
                  <div className="flex items-end justify-between">
                    <span className="text-2xl font-bold text-white">{res.value}</span>
                    <span className="text-[10px] text-slate-400 font-medium">{res.detail}</span>
                  </div>
                  <div className="w-full bg-slate-800 h-1 rounded-full mt-2 overflow-hidden">
                    <div className="bg-primary h-full" style={{ width: res.value }} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Asset Categories */}
            <div className="lg:col-span-2 space-y-8">
              <div className="glass-panel rounded-2xl p-8 border-primary/10">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Shield className="w-5 h-5 text-primary" />
                    {t('assets.military')}
                  </h3>
                  <button 
                    disabled={isGuest || isManaging}
                    onClick={handleManage}
                    className={`text-xs font-bold uppercase tracking-widest hover:underline ${isGuest ? 'text-slate-600 cursor-not-allowed' : 'text-primary'}`}
                  >
                    {isManaging ? t('assets.managing') : t('assets.manage')}
                  </button>
                </div>
                <div className="space-y-4">
                  {militaryAssets.map((unit: any, i: number) => (
                    <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-slate-800/40 border border-slate-700 group hover:border-primary/30 transition-all">
                      <div className="flex items-center gap-4">
                        <div className="size-12 rounded-lg bg-slate-900 flex items-center justify-center text-primary">
                          {unit.type === t('assets.military.naval') || unit.type === 'Naval' ? <Truck className="w-6 h-6" /> : unit.type === t('assets.military.ground') || unit.type === 'Ground' ? <Shield className="w-6 h-6" /> : <Zap className="w-6 h-6" />}
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-slate-200">{unit.name}</span>
                          <span className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">{unit.type} • {unit.location}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-8">
                        <div className="flex flex-col items-end">
                          <span className="text-[10px] text-slate-500 uppercase font-bold">{t('assets.military.power')}</span>
                          <span className="text-xs font-bold text-primary">{unit.power}%</span>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border ${unit.status === t('assets.military.deployed') || unit.status === 'Deployed' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500' : 'bg-primary/10 border-primary/20 text-primary'}`}>
                          {unit.status}
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
                    <Factory className="w-5 h-5 text-primary" />
                    {t('assets.industrial')}
                  </h3>
                  <button 
                    disabled={isGuest}
                    className={`text-xs font-bold uppercase tracking-widest hover:underline ${isGuest ? 'text-slate-600 cursor-not-allowed' : 'text-primary'}`}
                  >
                    {t('assets.upgrade')}
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {industrialAssets.map((facility: any, i: number) => (
                    <div key={i} className="p-5 rounded-2xl bg-slate-800/40 border border-slate-700 flex flex-col gap-4">
                      <div className="flex items-center justify-between">
                        <div className="p-2 bg-slate-900 rounded-lg text-primary">{facility.icon}</div>
                        <span className="text-[10px] font-bold text-emerald-500">+{facility.efficiency}% {t('assets.industrial.efficiency')}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-slate-200">{facility.name}</span>
                        <span className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">{facility.category}</span>
                      </div>
                      <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-primary h-full" style={{ width: `${facility.efficiency}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Sidebar: Asset Analytics */}
            <div className="space-y-8">
              <div className="glass-panel rounded-2xl p-6 border-primary/10">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-6 flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-primary" />
                  {t('assets.valuation')}
                </h3>
                <div className="space-y-6">
                  <div className="flex justify-between items-end">
                    <div className="flex flex-col">
                      <span className="text-[10px] text-slate-500 uppercase font-bold">{t('assets.valuation.total')}</span>
                      <span className="text-2xl font-black text-white">{stats.gdp}</span>
                    </div>
                    <div className="flex items-center gap-1 text-emerald-500 text-xs font-bold">
                      <TrendingUp className="w-4 h-4" />
                      +4.2%
                    </div>
                  </div>
                  <div className="h-[1px] bg-primary/10" />
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-slate-400">{t('assets.valuation.military')}</span>
                      <span className="text-xs font-bold text-slate-200">$4.2T</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-slate-400">{t('assets.valuation.industrial')}</span>
                      <span className="text-xs font-bold text-slate-200">$5.8T</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-slate-400">{t('assets.valuation.tech')}</span>
                      <span className="text-xs font-bold text-slate-200">$2.8T</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="glass-panel rounded-2xl p-6 border-primary/10">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-6 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-primary" />
                  {t('assets.maintenance')}
                </h3>
                <div className="flex flex-col items-center justify-center py-6">
                  <div className="relative size-32">
                    <svg className="size-full" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="45" fill="none" stroke="#1e293b" strokeWidth="8" />
                      <circle cx="50" cy="50" r="45" fill="none" stroke="#20d3ee" strokeWidth="8" strokeDasharray="283" strokeDashoffset="200" transform="rotate(-90 50 50)" />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-xl font-bold text-white">28%</span>
                      <span className="text-[8px] text-slate-500 uppercase font-bold">{t('assets.maintenance.gdp')}</span>
                    </div>
                  </div>
                  <p className="text-slate-400 text-[10px] text-center mt-4">
                    {t('assets.maintenance.desc')}
                  </p>
                </div>
              </div>

              <div className="glass-panel rounded-2xl p-6 border-primary/10 bg-primary/5">
                <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4">{t('assets.recommendation')}</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {t('assets.recommendation.desc')}
                </p>
                <button 
                  disabled={isGuest || isExpanding}
                  onClick={() => !isGuest && setIsExpandModalOpen(true)}
                  className={`mt-4 w-full py-2 text-[10px] font-bold uppercase rounded-lg transition-all ${isGuest ? 'bg-slate-800 text-slate-600 cursor-not-allowed' : 'bg-primary text-background-dark hover:brightness-110'}`}
                >
                  {isExpanding ? t('assets.approving') : t('assets.approve')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <AcquireModal 
        isOpen={isAcquireModalOpen}
        onClose={() => setIsAcquireModalOpen(false)}
        onSubmit={handleAcquireSubmit}
        form={assetForm}
        setForm={setAssetForm}
        t={t}
      />

      <ExpandModal 
        isOpen={isExpandModalOpen}
        onClose={() => setIsExpandModalOpen(false)}
        onSubmit={handleExpandSubmit}
        form={expandForm}
        setForm={setExpandForm}
        t={t}
      />
    </div>
  );
};

const AcquireModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  form: any;
  setForm: (form: any) => void;
  t: any;
}> = ({ isOpen, onClose, onSubmit, form, setForm, t }) => (
  <AnimatePresence>
    {isOpen && (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-background-deep/80 backdrop-blur-md"
        />
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-xl glass-panel rounded-3xl border-primary/20 p-8 shadow-2xl bg-background-dark overflow-hidden"
        >
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                <Plus className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-black text-white uppercase tracking-tight">Acquire New Asset</h2>
            </div>
            <button onClick={onClose} className="p-2 rounded-lg hover:bg-slate-800 text-slate-400">
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">Asset Type</label>
              <div className="relative">
                <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/60" />
                <select 
                  value={form.type}
                  onChange={(e) => setForm({...form, type: e.target.value})}
                  className="w-full bg-slate-900 border border-primary/20 rounded-xl py-4 pl-10 pr-4 text-white focus:ring-2 focus:ring-primary/30 outline-none appearance-none text-sm"
                >
                  <option>Industrial</option>
                  <option>Military</option>
                  <option>Technological</option>
                  <option>Resource Extraction</option>
                </select>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">Asset Name</label>
              <input 
                type="text" 
                value={form.name}
                onChange={(e) => setForm({...form, name: e.target.value})}
                placeholder="e.g. Sector 7 Fusion Core" 
                className="w-full bg-slate-900 border border-primary/20 rounded-xl py-4 px-4 text-white placeholder:text-slate-600 focus:ring-2 focus:ring-primary/30 outline-none text-sm" 
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">Target Location</label>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/60" />
                <select 
                  value={form.location}
                  onChange={(e) => setForm({...form, location: e.target.value})}
                  className="w-full bg-slate-900 border border-primary/20 rounded-xl py-4 pl-10 pr-4 text-white focus:ring-2 focus:ring-primary/30 outline-none appearance-none text-sm"
                >
                  <option>Sector 4</option>
                  <option>HQ North</option>
                  <option>Border Alpha</option>
                  <option>Neutral Zone</option>
                </select>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">Budget Allocation ($B)</label>
              <div className="relative">
                <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/60" />
                <input 
                  type="number" 
                  value={form.budget}
                  onChange={(e) => setForm({...form, budget: e.target.value})}
                  placeholder="e.g. 1.2" 
                  className="w-full bg-slate-900 border border-primary/20 rounded-xl py-4 pl-10 pr-4 text-white placeholder:text-slate-600 focus:ring-2 focus:ring-primary/30 outline-none text-sm" 
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2 mb-8">
            <label className="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">Strategic Justification</label>
            <textarea 
              value={form.description}
              onChange={(e) => setForm({...form, description: e.target.value})}
              placeholder="Describe the strategic importance of this acquisition..." 
              className="w-full bg-slate-900 border border-primary/20 rounded-xl py-4 px-4 text-white placeholder:text-slate-600 focus:ring-2 focus:ring-primary/30 outline-none text-sm h-32 resize-none" 
            />
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={onClose}
              className="flex-1 py-4 rounded-2xl border border-slate-700 text-slate-400 font-bold uppercase tracking-widest hover:bg-slate-800 transition-all"
            >
              Cancel
            </button>
            <button 
              onClick={onSubmit}
              disabled={!form.name || !form.budget}
              className="flex-[2] py-4 bg-primary text-background-dark font-black uppercase tracking-widest rounded-2xl hover:brightness-110 transition-all shadow-xl shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Confirm Acquisition
            </button>
          </div>
        </motion.div>
      </div>
    )}
  </AnimatePresence>
);

const ExpandModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  form: any;
  setForm: (form: any) => void;
  t: any;
}> = ({ isOpen, onClose, onSubmit, form, setForm, t }) => (
  <AnimatePresence>
    {isOpen && (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-background-deep/80 backdrop-blur-md"
        />
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-xl glass-panel rounded-3xl border-primary/20 p-8 shadow-2xl bg-background-dark overflow-hidden"
        >
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-black text-white uppercase tracking-tight">Approve Expansion</h2>
            </div>
            <button onClick={onClose} className="p-2 rounded-lg hover:bg-slate-800 text-slate-400">
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">Target Asset</label>
              <div className="relative">
                <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/60" />
                <select 
                  value={form.targetAsset}
                  onChange={(e) => setForm({...form, targetAsset: e.target.value})}
                  className="w-full bg-slate-900 border border-primary/20 rounded-xl py-4 pl-10 pr-4 text-white focus:ring-2 focus:ring-primary/30 outline-none appearance-none text-sm"
                >
                  <option>1st Expeditionary Fleet</option>
                  <option>Iron Guard Division</option>
                  <option>Quantum Computing Hub</option>
                  <option>Fusion Power Plant</option>
                </select>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">Expansion Type</label>
              <div className="relative">
                <Plus className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/60" />
                <select 
                  value={form.expansionType}
                  onChange={(e) => setForm({...form, expansionType: e.target.value})}
                  className="w-full bg-slate-900 border border-primary/20 rounded-xl py-4 pl-10 pr-4 text-white focus:ring-2 focus:ring-primary/30 outline-none appearance-none text-sm"
                >
                  <option>Capacity Increase</option>
                  <option>Technological Upgrade</option>
                  <option>Personnel Recruitment</option>
                  <option>Logistical Optimization</option>
                </select>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">Budget Allocation ($B)</label>
              <div className="relative">
                <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/60" />
                <input 
                  type="number" 
                  value={form.budget}
                  onChange={(e) => setForm({...form, budget: e.target.value})}
                  placeholder="e.g. 0.5" 
                  className="w-full bg-slate-900 border border-primary/20 rounded-xl py-4 pl-10 pr-4 text-white placeholder:text-slate-600 focus:ring-2 focus:ring-primary/30 outline-none text-sm" 
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">Timeline</label>
              <div className="relative">
                <Package className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/60" />
                <select 
                  value={form.timeline}
                  onChange={(e) => setForm({...form, timeline: e.target.value})}
                  className="w-full bg-slate-900 border border-primary/20 rounded-xl py-4 pl-10 pr-4 text-white focus:ring-2 focus:ring-primary/30 outline-none appearance-none text-sm"
                >
                  <option>1 Month</option>
                  <option>3 Months</option>
                  <option>6 Months</option>
                  <option>1 Year</option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2 mb-8">
            <label className="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">Strategic Justification</label>
            <textarea 
              value={form.justification}
              onChange={(e) => setForm({...form, justification: e.target.value})}
              placeholder="Explain why this expansion is necessary for national security..." 
              className="w-full bg-slate-900 border border-primary/20 rounded-xl py-4 px-4 text-white placeholder:text-slate-600 focus:ring-2 focus:ring-primary/30 outline-none text-sm h-32 resize-none" 
            />
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={onClose}
              className="flex-1 py-4 rounded-2xl border border-slate-700 text-slate-400 font-bold uppercase tracking-widest hover:bg-slate-800 transition-all"
            >
              Cancel
            </button>
            <button 
              onClick={onSubmit}
              disabled={!form.budget}
              className="flex-[2] py-4 bg-primary text-background-dark font-black uppercase tracking-widest rounded-2xl hover:brightness-110 transition-all shadow-xl shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Confirm Expansion
            </button>
          </div>
        </motion.div>
      </div>
    )}
  </AnimatePresence>
);
