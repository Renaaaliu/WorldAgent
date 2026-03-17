import React from 'react';
import { motion } from 'motion/react';
import { StrategicHeader } from './StrategicHeader';
import { cn } from '../lib/utils';
import { useLanguage } from '../contexts/LanguageContext';
import { generateScenarioEvents, StrategicEvent } from '../services/scenarioService';
import { 
  Globe, Search, Bell, User, Filter, 
  TrendingDown, AlertTriangle, CloudLightning, 
  ShieldCheck, ArrowRight, Landmark, Gavel, MoreHorizontal,
  Truck, AlertCircle, Anchor, CheckCircle2, RefreshCw,
  Layers, Radio, Target, X, Plus
} from 'lucide-react';
import { GenImage } from './GenImage';

export const Dashboard: React.FC<{ 
  onViewChange: (view: any) => void; 
  isGuest?: boolean; 
  user?: any;
  onLogout?: () => void;
  activeScenario?: string;
  selectedCountry?: any;
  countryData?: any;
  isDataLoading?: boolean;
}> = ({ onViewChange, isGuest, user, onLogout, activeScenario, selectedCountry, countryData, isDataLoading }) => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = React.useState<'trending' | 'latest' | 'top'>('latest');
  const [activeFilter, setActiveFilter] = React.useState('All Events');
  const [initiatedActions, setInitiatedActions] = React.useState<string[]>([]);
  const [processingAction, setProcessingAction] = React.useState<string | null>(null);
  const [resolvedEventIds, setResolvedEventIds] = React.useState<number[]>([]);
  const [showConflictAlert, setShowConflictAlert] = React.useState(false);
  const [activeTacticalMode, setActiveTacticalMode] = React.useState<'map' | 'layers' | 'signal' | 'target'>('map');
  const [events, setEvents] = React.useState<StrategicEvent[]>([]);
  const [isLoadingEvents, setIsLoadingEvents] = React.useState(true);
  const [criticalEvent, setCriticalEvent] = React.useState<StrategicEvent | null>(null);
  const [selectedReportEvent, setSelectedReportEvent] = React.useState<StrategicEvent | null>(null);

  // Load dynamic events based on scenario and country
  React.useEffect(() => {
    const loadEvents = async () => {
      setIsLoadingEvents(true);
      const scenarioEvents = await generateScenarioEvents(activeScenario || 'current-time', selectedCountry);
      if (scenarioEvents.length > 0) {
        setEvents(scenarioEvents);
        const critical = scenarioEvents.find(e => e.priority === 'Critical');
        if (critical) setCriticalEvent(critical);
      }
      setIsLoadingEvents(false);
    };
    loadEvents();
  }, [activeScenario, selectedCountry]);

  // Trigger a random conflict alert after 8 seconds for demo
  React.useEffect(() => {
    if (criticalEvent) {
      const timer = setTimeout(() => {
        setShowConflictAlert(true);
      }, 8000);
      return () => clearTimeout(timer);
    }
  }, [criticalEvent]);

  const handleAction = (action: string, eventId: number) => {
    if (isGuest) return;
    setProcessingAction(action);
    
    // Simulate strategic processing
    setTimeout(() => {
      setInitiatedActions(prev => [...prev, action]);
      setProcessingAction(null);
      
      // Resolve the event
      setResolvedEventIds(prev => [...prev, eventId]);
      
      alert(t('dashboard.orderConfirmed').replace('{action}', action));
    }, 1500);
  };

  const handleTacticalAction = async (type: 'scan' | 'lock' | 'intercept') => {
    if (isGuest) return;
    setProcessingAction(type);
    
    try {
      // We could use Gemini here for a "real" tactical report
      const messages = {
        scan: `Initiating wide-spectrum sweep of ${selectedCountry?.region || 'the sector'}...`,
        lock: `Acquiring strategic lock on high-value assets in ${selectedCountry?.name || 'the area'}...`,
        intercept: `Tuning signal arrays to encrypted frequencies near ${selectedCountry?.name || 'the border'}...`
      };
      
      console.log(messages[type]);
      
      // Simulate AI processing for a moment
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const results = {
        scan: `Scan Complete. Detected 3 unidentified signatures in Sector 4. No immediate threat confirmed.`,
        lock: `Target Locked. Strategic assets are standing by for deployment orders.`,
        intercept: `Intercept Successful. Decrypting signal... Fragment recovered: "Operation Aurora is green. Proceed to Phase 2."`
      };
      
      alert(results[type]);
    } finally {
      setProcessingAction(null);
    }
  };

  const filteredEvents = events.map(e => ({
    ...e,
    resolved: e.resolved || resolvedEventIds.includes(e.id)
  })).filter(e => {
    const matchesFilter = activeFilter === 'All Events' || e.type === activeFilter;
    return matchesFilter;
  }).sort((a, b) => {
    if (activeTab === 'latest') {
      return b.timestamp - a.timestamp;
    }
    if (activeTab === 'trending') {
      // Trending: Priority and Risk
      const priorityMap = { 'Critical': 4, 'Natural Disaster': 3, 'High': 2, 'Medium': 1, 'Low': 0, 'Resolved': -1 };
      return (priorityMap[b.priority] || 0) - (priorityMap[a.priority] || 0);
    }
    if (activeTab === 'top') {
      // Top: Risk level
      const riskMap = { 'Extreme': 3, 'High': 2, 'Medium': 1, 'Low': 0 };
      return (riskMap[b.risk] || 0) - (riskMap[a.risk] || 0);
    }
    return 0;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <StrategicHeader 
        currentView="dashboard" 
        onViewChange={onViewChange} 
        user={user}
        onLogout={onLogout}
      />

      <main className="flex-1 px-6 lg:px-40 py-10 max-w-7xl mx-auto w-full">
        <div className="flex flex-col gap-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex flex-col gap-2 w-full md:w-auto">
              <h1 className="text-4xl font-black leading-tight tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-primary">
                {t('dashboard.title')}
              </h1>
              <p className="text-slate-400 text-lg max-w-2xl">
                {t('dashboard.desc')} <span className="text-primary font-bold">{selectedCountry?.name || 'Global Operations'}</span>.
              </p>
            </div>
          </div>

          {isGuest && (
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-amber-500 shrink-0" />
              <p className="text-xs text-amber-200/80 font-medium">
                <span className="font-bold text-amber-500 uppercase mr-2">{t('dashboard.guest.title')}:</span>
                {t('dashboard.guest.desc')}
              </p>
            </div>
          )}

          {isDataLoading && (
            <div className="p-6 rounded-2xl bg-primary/5 border border-primary/20 flex flex-col items-center justify-center gap-4 animate-pulse">
              <RefreshCw className="w-8 h-8 text-primary animate-spin" />
              <p className="text-xs font-bold text-primary uppercase tracking-widest">Connecting to Global Database for {selectedCountry?.name}...</p>
            </div>
          )}

          <div className="grid grid-cols-1 gap-6">
            {isLoadingEvents ? (
              <div className="py-20 flex flex-col items-center justify-center gap-4">
                <RefreshCw className="w-10 h-10 text-primary animate-spin" />
                <p className="text-primary font-bold animate-pulse uppercase tracking-[0.3em] text-xs">{t('dashboard.generating')}</p>
              </div>
            ) : filteredEvents.length > 0 ? (
              filteredEvents.map((event, index) => (
                <motion.div 
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`glass-panel p-6 rounded-xl border-primary/10 relative overflow-hidden ${
                    event.resolved ? 'opacity-75 grayscale-[0.2]' : ''
                  }`}
                >
                  {event.priority === 'Critical' && (
                    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
                  )}
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="w-full md:w-72 h-48 md:h-auto rounded-lg overflow-hidden shrink-0 border border-primary/20 bg-slate-800">
                       <GenImage prompt={event.prompt || event.title} className="w-full h-full object-cover opacity-60" alt={event.type} />
                    </div>
                    <div className="flex flex-col flex-1 gap-4">
                      <div className="flex justify-between items-start">
                        <div className="flex flex-col gap-1">
                          <div className={`flex items-center gap-2 font-bold text-xs tracking-widest uppercase ${
                            event.priority === 'Critical' ? 'text-red-500' : 
                            event.priority === 'Natural Disaster' ? 'text-amber-500' : 'text-slate-500'
                          }`}>
                            {event.priority === 'Critical' && <AlertTriangle className="w-4 h-4" />}
                            {event.priority === 'Natural Disaster' && <CloudLightning className="w-4 h-4" />}
                            {event.priority === 'Resolved' && <ShieldCheck className="w-4 h-4" />}
                            {event.priority}
                          </div>
                          <h3 className="text-2xl font-bold text-white">{event.title}</h3>
                        </div>
                        <div className="text-slate-400 text-sm font-medium">Updated {event.time}</div>
                      </div>
                      <p className="text-slate-300 leading-relaxed">
                        {event.description}
                      </p>
                      <div className="flex flex-wrap gap-4 items-center">
                        <div className="flex items-center gap-2 bg-primary/10 px-3 py-1.5 rounded-lg border border-primary/20">
                          <Globe className="w-4 h-4 text-primary" />
                          <span className="text-xs font-semibold text-primary uppercase">Affected: {event.affected}</span>
                        </div>
                        {event.risk && (
                          <div className="flex items-center gap-2 bg-slate-500/10 px-3 py-1.5 rounded-lg border border-slate-500/20">
                            <TrendingDown className="w-4 h-4 text-slate-400" />
                            <span className="text-xs font-semibold text-slate-400 uppercase">Risk Level: {event.risk}</span>
                          </div>
                        )}
                      </div>
                      
                      {event.resolved ? (
                        <div className="mt-4 pt-6 border-t border-primary/5">
                          <button 
                            onClick={() => setSelectedReportEvent(event)}
                            className="text-primary text-sm font-bold flex items-center gap-1 hover:underline"
                          >
                            {t('dashboard.viewReport')} <ArrowRight className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <div className="mt-4 pt-6 border-t border-primary/10 flex flex-wrap gap-3">
                          {event.actions?.map((action, i) => {
                            const isInitiated = initiatedActions.includes(action);
                            const isProcessing = processingAction === action;
                            
                            return (
                              <button 
                                key={i}
                                onClick={() => handleAction(action, event.id)}
                                disabled={isGuest || isInitiated || !!processingAction}
                                className={cn(
                                  "flex-1 sm:flex-initial flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold transition-all",
                                  isGuest 
                                    ? "bg-slate-800 text-slate-600 border-slate-700 cursor-not-allowed"
                                    : isInitiated
                                      ? "bg-emerald-500/20 text-emerald-500 border border-emerald-500/30 cursor-default"
                                      : isProcessing
                                        ? "bg-primary/20 text-primary border border-primary/30 animate-pulse"
                                        : i === 0 
                                          ? 'bg-primary text-background-dark hover:brightness-110' 
                                          : 'bg-white/10 text-white border border-white/10 hover:bg-white/20'
                                )}
                              >
                                {isProcessing ? (
                                  <RefreshCw className="w-5 h-5 animate-spin" />
                                ) : isInitiated ? (
                                  <CheckCircle2 className="w-5 h-5" />
                                ) : (
                                  <>
                                    {action === 'Inject Emergency Liquidity' && <Landmark className="w-5 h-5" />}
                                    {action === 'Declare Bank Holiday' && <Gavel className="w-5 h-5" />}
                                    {action === 'Pre-position Relief Kits' && <Truck className="w-5 h-5" />}
                                    {action === 'Reroute Trade Fleets' && <Anchor className="w-5 h-5" />}
                                  </>
                                )}
                                {isProcessing ? t('dashboard.transmitting') : isInitiated ? t('dashboard.transmitted') : action}
                              </button>
                            );
                          })}
                          <button 
                            disabled={isGuest}
                            onClick={() => alert('Additional strategic options are currently being calculated by the AI engine.')}
                            className={cn(
                              "flex items-center justify-center size-12 rounded-xl transition-all",
                              isGuest
                                ? "bg-slate-800 text-slate-700 border border-slate-700 cursor-not-allowed"
                                : "bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20"
                            )}
                          >
                            <MoreHorizontal className="w-5 h-5" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="py-20 text-center border-2 border-dashed border-slate-800 rounded-2xl">
                <p className="text-slate-500 italic">{t('dashboard.noEvents')}</p>
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className="border-t border-primary/10 py-12 px-6 lg:px-20 bg-background-dark/50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3 opacity-60 grayscale">
            <Globe className="w-6 h-6" />
            <span className="font-bold tracking-tight">World Agent HQ</span>
          </div>
          <div className="flex gap-8 text-sm text-slate-400">
            <a className="hover:text-primary transition-colors" href="#">{t('dashboard.footer.privacy')}</a>
            <a className="hover:text-primary transition-colors" href="#">{t('dashboard.footer.terms')}</a>
            <a className="hover:text-primary transition-colors" href="#">{t('dashboard.footer.support')}</a>
          </div>
          <div className="text-xs text-slate-600">
            {t('dashboard.footer.version')}
          </div>
        </div>
      </footer>

      {/* Conflict Alert Modal (Image 2) */}
      {showConflictAlert && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-background-dark/80 backdrop-blur-sm">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full max-w-md bg-slate-900 border border-red-500/30 rounded-3xl p-8 shadow-2xl shadow-red-500/10 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent" />
            
            <button 
              onClick={() => setShowConflictAlert(false)}
              className="absolute top-4 right-4 p-2 text-slate-500 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 text-red-500 mb-6">
              <AlertTriangle className="w-5 h-5" />
              <span className="text-xs font-black tracking-[0.2em] uppercase">{t('dashboard.conflict.title')}</span>
            </div>

            <h2 className="text-2xl font-bold text-white mb-2">{criticalEvent?.title || 'Sector 4 Intrusion'}</h2>
            <p className="text-slate-400 mb-8">{criticalEvent?.description || 'Unidentified private security fleet detected entering restricted sovereign waters.'}</p>

            <button 
              onClick={() => {
                setShowConflictAlert(false);
                if (criticalEvent) handleAction(criticalEvent.actions[0], criticalEvent.id);
                else alert('Response teams deployed. Strategic assets are moving to intercept.');
              }}
              className="w-full py-4 bg-red-500/10 border border-red-500/30 text-red-500 font-black tracking-widest uppercase rounded-2xl hover:bg-red-500 hover:text-white transition-all shadow-lg shadow-red-500/5"
            >
              {t('dashboard.conflict.deploy')}
            </button>
          </motion.div>
        </div>
      )}

      {/* Resolution Report Modal */}
      {selectedReportEvent && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-background-dark/90 backdrop-blur-md">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            className="w-full max-w-2xl bg-slate-900 border border-primary/30 rounded-3xl p-8 shadow-2xl relative overflow-hidden max-h-[90vh] overflow-y-auto"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
            
            <button 
              onClick={() => setSelectedReportEvent(null)}
              className="absolute top-4 right-4 p-2 text-slate-500 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="flex items-center gap-3 text-primary mb-6">
              <ShieldCheck className="w-6 h-6" />
              <span className="text-xs font-black tracking-[0.2em] uppercase">{t('dashboard.report.title')}</span>
            </div>

            <h2 className="text-3xl font-bold text-white mb-4">{selectedReportEvent.title}</h2>
            
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="p-4 rounded-xl bg-primary/5 border border-primary/10">
                <span className="text-[10px] font-bold text-slate-500 uppercase block mb-1">{t('dashboard.report.status')}</span>
                <span className="text-sm font-bold text-emerald-500">{t('dashboard.report.resolved')}</span>
              </div>
              <div className="p-4 rounded-xl bg-primary/5 border border-primary/10">
                <span className="text-[10px] font-bold text-slate-500 uppercase block mb-1">{t('dashboard.report.time')}</span>
                <span className="text-sm font-bold text-white">{selectedReportEvent.time}</span>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="text-xs font-bold text-primary uppercase tracking-widest mb-3">{t('dashboard.report.summary')}</h4>
                <p className="text-slate-300 leading-relaxed italic">
                  "The strategic response protocols were initiated following the detection of {selectedReportEvent.description.toLowerCase()} Our assets successfully mitigated the primary risks through coordinated intervention."
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold text-primary uppercase tracking-widest mb-3">{t('dashboard.report.actions')}</h4>
                <ul className="space-y-2">
                  {selectedReportEvent.actions.map((action, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-slate-400">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      {action} - {t('dashboard.report.executed')}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-6 rounded-2xl bg-emerald-500/5 border border-emerald-500/20">
                <h4 className="text-xs font-bold text-emerald-500 uppercase tracking-widest mb-2">{t('dashboard.report.outcome')}</h4>
                <p className="text-sm text-slate-300">
                  The situation has been stabilized. Regional tension levels have decreased by 14%. Long-term monitoring of {selectedReportEvent.affected} remains active to prevent re-escalation.
                </p>
              </div>
            </div>

            <button 
              onClick={() => setSelectedReportEvent(null)}
              className="w-full mt-8 py-4 bg-primary text-background-dark font-black tracking-widest uppercase rounded-2xl hover:brightness-110 transition-all"
            >
              {t('dashboard.report.close')}
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
};
