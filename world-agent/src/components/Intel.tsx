import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { StrategicHeader } from './StrategicHeader';
import { 
  Globe, Shield, Eye, Radio, 
  Target, Zap, AlertCircle, Search,
  Terminal, Lock, Cpu, Database,
  ChevronRight, Activity, User, Download,
  FileText, X, Check, Loader2, MapPin
} from 'lucide-react';
import { cn } from '../lib/utils';
import { useLanguage } from '../contexts/LanguageContext';

export const Intel: React.FC<{ 
  onViewChange: (view: any) => void; 
  isGuest?: boolean;
  user?: any;
  onLogout?: () => void;
  countryData?: any;
  isDataLoading?: boolean;
  highContrast?: boolean;
}> = ({ onViewChange, isGuest, user, onLogout, countryData, isDataLoading, highContrast = false }) => {
  const { t } = useLanguage();
  const [isRecruiting, setIsRecruiting] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [exportStep, setExportStep] = useState<'idle' | 'loading' | 'success'>('idle');
  const [isRecruitModalOpen, setIsRecruitModalOpen] = useState(false);
  const [isScanModalOpen, setIsScanModalOpen] = useState(false);
  const [isLockModalOpen, setIsLockModalOpen] = useState(false);
  const [isInterceptModalOpen, setIsInterceptModalOpen] = useState(false);
  const [selectedSignal, setSelectedSignal] = useState<any>(null);
  const [isActionProcessing, setIsActionProcessing] = useState(false);
  const [actionInputValue, setActionInputValue] = useState('');
  const [signalActionStatus, setSignalActionStatus] = useState<{ [key: string]: 'idle' | 'loading' | 'success' }>({
    trace: 'idle',
    jam: 'idle',
    archive: 'idle'
  });

  // Use country data if available, otherwise use defaults
  const threatLevels = countryData?.intel?.threats || [
    { type: t('intel.cyber'), level: 64 },
    { type: t('intel.espionage'), level: 82 },
    { type: t('intel.stability'), level: 91 }
  ];

  const intelAssets = countryData?.intel?.assets?.length > 0
    ? countryData.intel.assets.map((a: any) => ({
        ...a,
        icon: a.type === 'Agent' ? <User className="w-4 h-4" /> : 
              a.type === 'Node' ? <Cpu className="w-4 h-4" /> : <Lock className="w-4 h-4" />
      }))
    : [
        { name: 'Agent Vesper', location: 'London', status: 'Active', icon: <User className="w-4 h-4" /> },
        { name: 'Node 09', location: 'Tokyo', status: 'Idle', icon: <Cpu className="w-4 h-4" /> },
        { name: 'Ghost Protocol', location: 'Berlin', status: 'Compromised', icon: <Lock className="w-4 h-4" /> }
      ];
  const [recruitForm, setRecruitForm] = useState({
    name: '',
    location: 'London',
    specialization: 'Cyber Espionage',
    priority: 'High',
    background: ''
  });

  const handleRecruitSubmit = () => {
    if (!recruitForm.name) return;
    setIsRecruiting(true);
    setIsRecruitModalOpen(false);
    setTimeout(() => {
      setIsRecruiting(false);
      alert(`Asset Recruitment Initiated: ${recruitForm.name} in ${recruitForm.location}. Specialization: ${recruitForm.specialization}.`);
    }, 2000);
  };

  const handleExport = () => {
    setExportStep('loading');
    setTimeout(() => {
      setExportStep('success');
      setTimeout(() => {
        setIsExporting(false);
        setExportStep('idle');
      }, 2000);
    }, 3000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background-deep">
      <StrategicHeader 
        currentView="intel" 
        onViewChange={onViewChange} 
        user={user}
        onLogout={onLogout}
      />

      <main className="flex-1 px-6 lg:px-40 py-10 max-w-7xl mx-auto w-full">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6">
            <div className="flex flex-col gap-2">
              <h1 className="text-4xl font-black leading-tight tracking-tight text-white flex items-center gap-4">
                <Eye className="w-10 h-10 text-primary" />
                {t('intel.title')}
              </h1>
              <p className="text-slate-400 text-lg">{t('intel.desc')}</p>
            </div>
            <button 
              onClick={() => !isGuest && setIsExporting(true)}
              disabled={isGuest}
              className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-black uppercase tracking-[0.2em] transition-all shadow-2xl ${isGuest ? 'bg-slate-800/50 text-slate-600 border border-slate-800 cursor-not-allowed' : 'bg-primary text-background-dark hover:brightness-110 shadow-primary/30'}`}
            >
              <Download className="w-6 h-6" />
              {t('intel.export')}
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Satellite Surveillance */}
            <div className="lg:col-span-2 space-y-8">
              <div className="glass-panel rounded-2xl p-6 border-primary/10 overflow-hidden relative">
                <div className="absolute top-4 right-6 flex items-center gap-2">
                  <div className="size-2 rounded-full bg-red-500 animate-pulse" />
                  <span className="text-[10px] font-bold text-red-500 uppercase tracking-widest">{t('intel.liveFeed')}: SAT-09</span>
                </div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-6 flex items-center gap-2">
                  <Globe className="w-4 h-4 text-primary" />
                  {t('intel.satelliteView')} (Sector 7)
                </h3>
                <div className="aspect-video rounded-xl bg-slate-800 border border-primary/20 overflow-hidden relative group">
                  <img 
                    src="https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&q=80&w=1200" 
                    className="w-full h-full object-cover opacity-50 grayscale group-hover:grayscale-0 transition-all duration-700" 
                    alt="Satellite View"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 pointer-events-none border-[20px] border-background-dark/20" />
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="size-40 border-2 border-primary/30 rounded-full flex items-center justify-center">
                      <div className="size-20 border border-primary/50 rounded-full" />
                      <div className="absolute w-full h-[1px] bg-primary/20" />
                      <div className="absolute h-full w-[1px] bg-primary/20" />
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-4 glass-panel px-3 py-1.5 rounded-lg border-primary/20 text-[10px] font-mono text-primary">
                    LAT: 34.0522 N | LONG: 118.2437 W
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 mt-6">
                  <button 
                    disabled={isGuest}
                    onClick={() => !isGuest && setIsScanModalOpen(true)}
                    className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-all ${isGuest ? 'bg-slate-800/50 border-slate-800 cursor-not-allowed' : 'bg-primary/5 border-primary/10 hover:bg-primary/10'}`}
                  >
                    <Search className={`w-5 h-5 ${isGuest ? 'text-slate-600' : 'text-primary'}`} />
                    <span className={`text-[10px] font-bold uppercase ${isGuest ? 'text-slate-600' : 'text-slate-300'}`}>{t('intel.scan')}</span>
                  </button>
                  <button 
                    disabled={isGuest}
                    onClick={() => !isGuest && setIsLockModalOpen(true)}
                    className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-all ${isGuest ? 'bg-slate-800/50 border-slate-800 cursor-not-allowed' : 'bg-primary/5 border-primary/10 hover:bg-primary/10'}`}
                  >
                    <Target className={`w-5 h-5 ${isGuest ? 'text-slate-600' : 'text-primary'}`} />
                    <span className={`text-[10px] font-bold uppercase ${isGuest ? 'text-slate-600' : 'text-slate-300'}`}>{t('intel.lock')}</span>
                  </button>
                  <button 
                    disabled={isGuest}
                    onClick={() => !isGuest && setIsInterceptModalOpen(true)}
                    className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-all ${isGuest ? 'bg-slate-800/50 border-slate-800 cursor-not-allowed' : 'bg-primary/5 border-primary/10 hover:bg-primary/10'}`}
                  >
                    <Radio className={`w-5 h-5 ${isGuest ? 'text-slate-600' : 'text-primary'}`} />
                    <span className={`text-[10px] font-bold uppercase ${isGuest ? 'text-slate-600' : 'text-slate-300'}`}>{t('intel.intercept')}</span>
                  </button>
                </div>
              </div>

              {isGuest && (
                <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 text-amber-500 shrink-0" />
                  <p className="text-xs text-amber-200/80 font-medium">
                    <span className="font-bold text-amber-500 uppercase mr-2">{t('intel.guest.title')}:</span>
                    {t('intel.guest.desc')}
                  </p>
                </div>
              )}

              {/* Signal Intelligence Feed */}
              <div className="glass-panel rounded-2xl p-6 border-primary/10">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-6 flex items-center gap-2">
                  <Radio className="w-4 h-4 text-primary" />
                  {t('intel.sigint')}
                </h3>
                <div className="space-y-4">
                  {[
                    { origin: 'Moscow', type: 'Encrypted', strength: 'High', status: 'Decrypting', color: 'text-amber-500' },
                    { origin: 'Beijing', type: 'Burst', strength: 'Medium', status: 'Intercepted', color: 'text-emerald-500' },
                    { origin: 'Unknown', type: 'Quantum', strength: 'Critical', status: 'Failed', color: 'text-red-500' }
                  ].map((sig, i) => (
                    <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-slate-800/40 border border-slate-700 group hover:border-primary/30 transition-all cursor-pointer" onClick={() => setSelectedSignal(sig)}>
                      <div className="flex items-center gap-4">
                        <div className={`size-10 rounded-lg bg-slate-900 flex items-center justify-center ${sig.color}`}>
                          <Terminal className="w-5 h-5" />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-slate-200">{t('intel.origin')}: {sig.origin}</span>
                          <span className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">{sig.type} {t('intel.transmission')}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="flex flex-col items-end">
                          <span className="text-[10px] text-slate-500 uppercase font-bold">{t('intel.strength')}</span>
                          <span className="text-xs font-bold text-slate-300">{sig.strength}</span>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border ${sig.color === 'text-emerald-500' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500' : sig.color === 'text-amber-500' ? 'bg-amber-500/10 border-amber-500/20 text-amber-500' : 'bg-red-500/10 border-red-500/20 text-red-500'}`}>
                          {sig.status}
                        </div>
                        <ChevronRight className="w-5 h-5 text-slate-600 group-hover:text-primary transition-colors" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Sidebar: Threat Assessment */}
            <div className="space-y-8">
              <div className="glass-panel rounded-2xl p-6 border-primary/10">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-6 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-500" />
                  {t('intel.threat')}
                </h3>
                <div className="space-y-6">
                  {threatLevels.map((threat: any, i: number) => (
                    <div key={i} className="flex flex-col gap-2">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-bold text-slate-400 uppercase">{threat.type}</span>
                        <span className={`text-xs font-bold ${threat.level > 80 ? 'text-red-500' : threat.level > 50 ? 'text-amber-500' : 'text-emerald-500'}`}>{threat.level}%</span>
                      </div>
                      <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                        <div className={`h-full ${threat.level > 80 ? 'bg-red-500' : threat.level > 50 ? 'bg-amber-500' : 'bg-emerald-500'}`} style={{ width: `${threat.level}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass-panel rounded-2xl p-6 border-primary/10">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-6 flex items-center gap-2">
                  <Database className="w-4 h-4 text-primary" />
                  {t('intel.assets')}
                </h3>
                <div className="space-y-4">
                  {intelAssets.map((asset: any, i: number) => (
                    <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/40 border border-slate-700">
                      <div className="size-8 rounded-lg bg-slate-900 flex items-center justify-center text-primary">
                        {asset.icon || <User className="w-4 h-4" />}
                      </div>
                      <div className="flex flex-col flex-1">
                        <span className="text-xs font-bold text-slate-200">{asset.name}</span>
                        <span className="text-[10px] text-slate-500 uppercase">{asset.location}</span>
                      </div>
                      <div className={`text-[8px] font-bold uppercase px-1.5 py-0.5 rounded ${asset.status === 'Active' ? 'bg-emerald-500/10 text-emerald-500' : asset.status === 'Idle' ? 'bg-slate-500/10 text-slate-500' : 'bg-red-500/10 text-red-500'}`}>
                        {asset.status}
                      </div>
                    </div>
                  ))}
                </div>
                <button 
                  disabled={isGuest || isRecruiting}
                  onClick={() => !isGuest && setIsRecruitModalOpen(true)}
                  className={`w-full mt-6 py-3 rounded-xl border text-[10px] font-bold uppercase tracking-widest transition-all ${isGuest ? 'bg-slate-800/50 border-slate-800 text-slate-600 cursor-not-allowed' : 'bg-primary/10 text-primary border-primary/20 hover:bg-primary/20'}`}
                >
                  {isRecruiting ? t('intel.recruiting') : t('intel.recruit')}
                </button>
              </div>

              <div className="glass-panel rounded-2xl p-6 border-primary/10 bg-primary/5">
                <div className="flex items-center gap-2 mb-4">
                  <Activity className="w-4 h-4 text-primary" />
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider">{t('intel.pulse')}</h3>
                </div>
                <div className="h-20 flex items-end gap-1">
                  {[40, 70, 45, 90, 65, 80, 50, 95, 60, 75].map((h, i) => (
                    <motion.div 
                      key={i}
                      initial={{ height: 0 }}
                      animate={{ height: `${h}%` }}
                      transition={{ delay: i * 0.05, duration: 0.5 }}
                      className="flex-1 bg-primary/30 rounded-t-sm"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <ExportModal 
        isOpen={isExporting}
        onClose={() => setIsExporting(false)}
        onExport={handleExport}
        step={exportStep}
        t={t}
      />

      <RecruitModal 
        isOpen={isRecruitModalOpen}
        onClose={() => setIsRecruitModalOpen(false)}
        onSubmit={handleRecruitSubmit}
        form={recruitForm}
        setForm={setRecruitForm}
        t={t}
      />

      <ActionModal 
        isOpen={isScanModalOpen}
        onClose={() => !isActionProcessing && setIsScanModalOpen(false)}
        title="Satellite Scan"
        icon={<Search className="w-6 h-6" />}
        description="Initiating wide-spectrum satellite sweep. Please specify the exact area name to scan."
        actionLabel="Start Scan"
        inputPlaceholder="Enter area name (e.g. Sector 7-G)"
        inputValue={actionInputValue}
        onInputChange={setActionInputValue}
        isProcessing={isActionProcessing}
        highContrast={highContrast}
        onAction={() => {
          if (!actionInputValue) return;
          setIsActionProcessing(true);
          setTimeout(() => {
            setIsActionProcessing(false);
            setIsScanModalOpen(false);
            alert(`Satellite scan complete for ${actionInputValue}. Data updated in Pulse feed.`);
            setActionInputValue('');
          }, 2500);
        }}
      />

      <ActionModal 
        isOpen={isLockModalOpen}
        onClose={() => !isActionProcessing && setIsLockModalOpen(false)}
        title="Strategic Lock"
        icon={<Target className="w-6 h-6" />}
        description="Acquiring strategic lock on high-value targets. Please specify the target name."
        actionLabel="Acquire Lock"
        inputPlaceholder="Enter target name (e.g. Alpha-1)"
        inputValue={actionInputValue}
        onInputChange={setActionInputValue}
        isProcessing={isActionProcessing}
        highContrast={highContrast}
        onAction={() => {
          if (!actionInputValue) return;
          setIsActionProcessing(true);
          setTimeout(() => {
            setIsActionProcessing(false);
            setIsLockModalOpen(false);
            alert(`Strategic lock confirmed for ${actionInputValue}. Tracking active.`);
            setActionInputValue('');
          }, 2500);
        }}
      />

      <ActionModal 
        isOpen={isInterceptModalOpen}
        onClose={() => !isActionProcessing && setIsInterceptModalOpen(false)}
        title="Signal Intercept"
        icon={<Radio className="w-6 h-6" />}
        description="Tuning signal arrays to encrypted frequencies. Please specify the signal ID to intercept."
        actionLabel="Begin Intercept"
        inputPlaceholder="Enter signal ID (e.g. SIG-X9)"
        inputValue={actionInputValue}
        onInputChange={setActionInputValue}
        isProcessing={isActionProcessing}
        highContrast={highContrast}
        onAction={() => {
          if (!actionInputValue) return;
          setIsActionProcessing(true);
          setTimeout(() => {
            setIsActionProcessing(false);
            setIsInterceptModalOpen(false);
            alert(`Signal intercept successful for ${actionInputValue}. Packets routed.`);
            setActionInputValue('');
          }, 2500);
        }}
      />

      <SignalDetailModal 
        signal={selectedSignal}
        onClose={() => setSelectedSignal(null)}
        t={t}
        actionStatus={signalActionStatus}
        onTrace={() => {
          setSignalActionStatus(prev => ({ ...prev, trace: 'loading' }));
          setTimeout(() => {
            setSignalActionStatus(prev => ({ ...prev, trace: 'success' }));
            setTimeout(() => setSignalActionStatus(prev => ({ ...prev, trace: 'idle' })), 2000);
          }, 2000);
        }}
        onJam={() => {
          setSignalActionStatus(prev => ({ ...prev, jam: 'loading' }));
          setTimeout(() => {
            setSignalActionStatus(prev => ({ ...prev, jam: 'success' }));
            setTimeout(() => setSignalActionStatus(prev => ({ ...prev, jam: 'idle' })), 2000);
          }, 2000);
        }}
        onArchive={() => {
          setSignalActionStatus(prev => ({ ...prev, archive: 'loading' }));
          setTimeout(() => {
            setSignalActionStatus(prev => ({ ...prev, archive: 'success' }));
            setTimeout(() => setSignalActionStatus(prev => ({ ...prev, archive: 'idle' })), 2000);
          }, 2000);
        }}
      />
    </div>
  );
};

const ExportModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onExport: () => void;
  step: 'idle' | 'loading' | 'success';
  t: any;
}> = ({ isOpen, onClose, onExport, step, t }) => (
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
          className="relative w-full max-w-lg glass-panel rounded-3xl border-primary/20 p-8 shadow-2xl bg-background-dark overflow-hidden"
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-black text-white uppercase tracking-tight">{t('intel.export.title')}</h2>
            <button onClick={onClose} className="p-2 rounded-lg hover:bg-slate-800 text-slate-400">
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-primary/5 border border-primary/10 flex items-center gap-4">
              <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                <FileText className="w-6 h-6" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-white">STRATEGIC_INTEL_REPORT_2026.pdf</span>
                <span className="text-[10px] text-slate-500 uppercase font-bold">Size: 4.2 MB • Format: PDF</span>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-[10px] font-bold text-primary uppercase tracking-widest">{t('intel.export.options')}</h3>
              {[
                { label: t('intel.export.option.satellite'), checked: true },
                { label: t('intel.export.option.sigint'), checked: true },
                { label: t('intel.export.option.threats'), checked: true },
                { label: t('intel.export.option.assets'), checked: false }
              ].map((opt, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-slate-800/40 border border-slate-700">
                  <span className="text-xs text-slate-300">{opt.label}</span>
                  <div className={`size-5 rounded border flex items-center justify-center transition-colors ${opt.checked ? 'bg-primary border-primary text-background-dark' : 'border-slate-600'}`}>
                    {opt.checked && <Check className="w-3 h-3" />}
                  </div>
                </div>
              ))}
            </div>

            <button 
              onClick={onExport}
              disabled={step !== 'idle'}
              className="w-full py-5 bg-primary text-background-dark font-black uppercase tracking-widest rounded-2xl hover:brightness-110 transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {step === 'loading' ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  {t('intel.export.processing')}
                </>
              ) : step === 'success' ? (
                <>
                  <Check className="w-5 h-5" />
                  {t('intel.export.complete')}
                </>
              ) : (
                <>
                  <Download className="w-5 h-5" />
                  {t('intel.export.start')}
                </>
              )}
            </button>
          </div>
        </motion.div>
      </div>
    )}
  </AnimatePresence>
);

const RecruitModal: React.FC<{
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
                <User className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-black text-white uppercase tracking-tight">Recruit New Asset</h2>
            </div>
            <button onClick={onClose} className="p-2 rounded-lg hover:bg-slate-800 text-slate-400">
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">Asset Codename</label>
              <input 
                type="text" 
                value={form.name}
                onChange={(e) => setForm({...form, name: e.target.value})}
                placeholder="e.g. Agent Nightfall" 
                className="w-full bg-slate-900 border border-primary/20 rounded-xl py-4 px-4 text-white placeholder:text-slate-600 focus:ring-2 focus:ring-primary/30 outline-none text-sm" 
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">Deployment Location</label>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/60" />
                <select 
                  value={form.location}
                  onChange={(e) => setForm({...form, location: e.target.value})}
                  className="w-full bg-slate-900 border border-primary/20 rounded-xl py-4 pl-10 pr-4 text-white focus:ring-2 focus:ring-primary/30 outline-none appearance-none text-sm"
                >
                  <option>London</option>
                  <option>Tokyo</option>
                  <option>Berlin</option>
                  <option>Washington D.C.</option>
                  <option>Beijing</option>
                </select>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">Specialization</label>
              <div className="relative">
                <Cpu className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/60" />
                <select 
                  value={form.specialization}
                  onChange={(e) => setForm({...form, specialization: e.target.value})}
                  className="w-full bg-slate-900 border border-primary/20 rounded-xl py-4 pl-10 pr-4 text-white focus:ring-2 focus:ring-primary/30 outline-none appearance-none text-sm"
                >
                  <option>Cyber Espionage</option>
                  <option>Field Intelligence</option>
                  <option>Signal Analysis</option>
                  <option>Counter-Intelligence</option>
                </select>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">Priority Level</label>
              <div className="relative">
                <AlertCircle className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/60" />
                <select 
                  value={form.priority}
                  onChange={(e) => setForm({...form, priority: e.target.value})}
                  className="w-full bg-slate-900 border border-primary/20 rounded-xl py-4 pl-10 pr-4 text-white focus:ring-2 focus:ring-primary/30 outline-none appearance-none text-sm"
                >
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                  <option>Critical</option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2 mb-8">
            <label className="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">Background Check / Notes</label>
            <textarea 
              value={form.background}
              onChange={(e) => setForm({...form, background: e.target.value})}
              placeholder="Provide background details or specific mission objectives..." 
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
              disabled={!form.name}
              className="flex-[2] py-4 bg-primary text-background-dark font-black uppercase tracking-widest rounded-2xl hover:brightness-110 transition-all shadow-xl shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Confirm Recruitment
            </button>
          </div>
        </motion.div>
      </div>
    )}
  </AnimatePresence>
);

const ActionModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  title: string;
  icon: React.ReactNode;
  description: string;
  actionLabel: string;
  onAction: () => void;
  isProcessing?: boolean;
  inputPlaceholder?: string;
  inputValue?: string;
  onInputChange?: (val: string) => void;
  highContrast?: boolean;
}> = ({ isOpen, onClose, title, icon, description, actionLabel, onAction, isProcessing, inputPlaceholder, inputValue, onInputChange, highContrast }) => (
  <AnimatePresence>
    {isOpen && (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className={cn(
            "absolute inset-0 backdrop-blur-md",
            highContrast ? "bg-black/95" : "bg-background-deep/80"
          )}
        />
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className={cn(
            "relative w-full max-w-md rounded-3xl p-8 shadow-2xl overflow-hidden border-2",
            highContrast 
              ? "bg-black border-white text-white" 
              : "glass-panel border-primary/20 bg-background-dark"
          )}
        >
          <div className="flex flex-col items-center text-center gap-6">
            <div className={cn(
              "size-16 rounded-2xl flex items-center justify-center",
              highContrast ? "bg-white text-black" : "bg-primary/10 text-primary"
            )}>
              {isProcessing ? <Loader2 className="w-8 h-8 animate-spin" /> : icon}
            </div>
            <div className="space-y-2">
              <h2 className={cn(
                "text-2xl font-black uppercase tracking-tight",
                highContrast ? "text-white" : "text-white"
              )}>{title}</h2>
              <p className={cn(
                "text-sm leading-relaxed",
                highContrast ? "text-white/90" : "text-slate-400"
              )}>{description}</p>
            </div>

            {inputPlaceholder && (
              <div className="w-full flex flex-col gap-2">
                <input 
                  type="text"
                  value={inputValue}
                  onChange={(e) => onInputChange?.(e.target.value)}
                  placeholder={inputPlaceholder}
                  className={cn(
                    "w-full px-4 py-3 rounded-xl outline-none transition-all border-2",
                    highContrast 
                      ? "bg-black border-white text-white placeholder:text-white/50 focus:bg-white focus:text-black" 
                      : "bg-slate-900 border-primary/20 text-white placeholder:text-slate-600 focus:ring-2 focus:ring-primary/30"
                  )}
                />
              </div>
            )}

            <div className="flex w-full gap-4">
              <button 
                onClick={onClose}
                disabled={isProcessing}
                className={cn(
                  "flex-1 py-4 rounded-xl font-bold uppercase tracking-widest transition-all text-xs border-2 disabled:opacity-50",
                  highContrast 
                    ? "bg-black border-white text-white hover:bg-white hover:text-black" 
                    : "border-slate-700 text-slate-400 hover:bg-slate-800"
                )}
              >
                Cancel
              </button>
              <button 
                onClick={onAction}
                disabled={isProcessing || (inputPlaceholder && !inputValue)}
                className={cn(
                  "flex-[2] py-4 font-black uppercase tracking-widest rounded-xl transition-all shadow-xl text-xs flex items-center justify-center gap-2 disabled:opacity-50 border-2",
                  highContrast 
                    ? "bg-white text-black border-white hover:bg-black hover:text-white" 
                    : "bg-primary text-background-dark border-primary shadow-primary/20 hover:brightness-110"
                )}
              >
                {isProcessing && <Loader2 className="w-4 h-4 animate-spin" />}
                {isProcessing ? 'Processing...' : actionLabel}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    )}
  </AnimatePresence>
);

const SignalDetailModal: React.FC<{
  signal: any;
  onClose: () => void;
  t: any;
  actionStatus: { [key: string]: 'idle' | 'loading' | 'success' };
  onTrace: () => void;
  onJam: () => void;
  onArchive: () => void;
}> = ({ signal, onClose, t, actionStatus, onTrace, onJam, onArchive }) => (
  <AnimatePresence>
    {signal && (
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
                <Terminal className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-black text-white uppercase tracking-tight">Signal Intelligence Details</h2>
            </div>
            <button onClick={onClose} className="p-2 rounded-lg hover:bg-slate-800 text-slate-400">
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700">
                <span className="text-[10px] font-bold text-slate-500 uppercase block mb-1">Origin</span>
                <span className="text-sm font-bold text-white">{signal.origin}</span>
              </div>
              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700">
                <span className="text-[10px] font-bold text-slate-500 uppercase block mb-1">Transmission Type</span>
                <span className="text-sm font-bold text-white">{signal.type}</span>
              </div>
              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700">
                <span className="text-[10px] font-bold text-slate-500 uppercase block mb-1">Signal Strength</span>
                <span className="text-sm font-bold text-white">{signal.strength}</span>
              </div>
              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700">
                <span className="text-[10px] font-bold text-slate-500 uppercase block mb-1">Current Status</span>
                <span className={`text-sm font-bold ${signal.color}`}>{signal.status}</span>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-primary/5 border border-primary/10">
              <h3 className="text-xs font-bold text-primary uppercase tracking-widest mb-4">Intercepted Payload Fragment</h3>
              <div className="bg-background-dark p-4 rounded-lg border border-primary/20 font-mono text-xs text-primary/80 leading-relaxed overflow-x-auto">
                <p>0x48 0x65 0x6C 0x6C 0x6F 0x20 0x57 0x6F 0x72 0x6C 0x64</p>
                <p className="mt-2 text-slate-400">DECRYPTED_TEXT: "Operation Aurora is green. Proceed to Phase 2. Target coordinates: 34.0522 N, 118.2437 W."</p>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Recommended Actions</h3>
              <div className="flex gap-3">
                <button 
                  onClick={onTrace}
                  disabled={actionStatus.trace !== 'idle'}
                  className="flex-1 py-3 bg-primary/10 border border-primary/20 text-primary rounded-xl text-[10px] font-bold uppercase hover:bg-primary/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {actionStatus.trace === 'loading' && <Loader2 className="w-3 h-3 animate-spin" />}
                  {actionStatus.trace === 'success' && <Check className="w-3 h-3" />}
                  {actionStatus.trace === 'loading' ? 'Tracing...' : actionStatus.trace === 'success' ? 'Traced' : 'Trace Origin'}
                </button>
                <button 
                  onClick={onJam}
                  disabled={actionStatus.jam !== 'idle'}
                  className="flex-1 py-3 bg-primary/10 border border-primary/20 text-primary rounded-xl text-[10px] font-bold uppercase hover:bg-primary/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {actionStatus.jam === 'loading' && <Loader2 className="w-3 h-3 animate-spin" />}
                  {actionStatus.jam === 'success' && <Check className="w-3 h-3" />}
                  {actionStatus.jam === 'loading' ? 'Jamming...' : actionStatus.jam === 'success' ? 'Jammed' : 'Jam Frequency'}
                </button>
                <button 
                  onClick={onArchive}
                  disabled={actionStatus.archive !== 'idle'}
                  className="flex-1 py-3 bg-primary/10 border border-primary/20 text-primary rounded-xl text-[10px] font-bold uppercase hover:bg-primary/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {actionStatus.archive === 'loading' && <Loader2 className="w-3 h-3 animate-spin" />}
                  {actionStatus.archive === 'success' && <Check className="w-3 h-3" />}
                  {actionStatus.archive === 'loading' ? 'Archiving...' : actionStatus.archive === 'success' ? 'Archived' : 'Archive Intel'}
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    )}
  </AnimatePresence>
);
