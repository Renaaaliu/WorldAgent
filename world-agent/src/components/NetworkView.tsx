import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Globe, Search, Bell, Share2, 
  Handshake, Shield, TrendingUp, AlertTriangle,
  ChevronRight, ArrowRight, Filter, Info, X,
  Calendar, MapPin, Users, Send
} from 'lucide-react';

export const NetworkView: React.FC<{ isGuest?: boolean; onViewChange?: (view: any) => void }> = ({ isGuest, onViewChange }) => {
  const [isSummitModalOpen, setIsSummitModalOpen] = useState(false);
  const [summitData, setSummitData] = useState({ title: '', location: 'New Geneva', date: '', participants: [] });

  const handleInitiateSummit = () => {
    if (!summitData.title || isGuest) return;
    alert(`Diplomatic Summit Initiated: ${summitData.title} scheduled at ${summitData.location}. Invitations sent to all primary delegates.`);
    setIsSummitModalOpen(false);
  };
  return (
    <div className="min-h-screen flex flex-col bg-background-deep overflow-hidden">
      <header className="flex items-center justify-between border-b border-primary/20 px-6 lg:px-20 py-4 bg-background-dark/80 backdrop-blur-md sticky top-0 z-50 gap-8">
        <div className="flex items-center gap-8 shrink-0">
          <div className="flex items-center gap-3 text-primary">
            <Globe className="w-8 h-8" />
            <h2 className="text-slate-100 text-xl font-bold leading-tight tracking-tight">World Agent</h2>
          </div>
          <nav className="hidden xl:flex items-center gap-8">
            <button onClick={() => onViewChange?.('dashboard')} className="text-slate-400 hover:text-primary transition-colors text-sm font-medium whitespace-nowrap">Dashboard</button>
            <button onClick={() => onViewChange?.('intel')} className="text-slate-400 hover:text-primary transition-colors text-sm font-medium whitespace-nowrap">Intelligence</button>
            <button className="text-primary text-sm font-semibold border-b-2 border-primary pb-1 whitespace-nowrap">Diplomacy Network</button>
            <button onClick={() => onViewChange?.('diplomacy')} className="text-slate-400 hover:text-primary transition-colors text-sm font-medium whitespace-nowrap">Archives</button>
          </nav>
        </div>
        <div className="flex items-center gap-6 justify-end">
          <div className="hidden lg:flex items-center rounded-lg h-10 bg-primary/10 border border-primary/20 px-3 min-w-[200px]">
            <Search className="w-4 h-4 text-primary/60 mr-2" />
            <input className="bg-transparent border-none focus:ring-0 text-white text-sm placeholder:text-primary/40 outline-none w-full" placeholder="Search nations..." />
          </div>
          <div className="flex gap-3">
            <button className="flex items-center justify-center rounded-lg size-10 bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-all">
              <Bell className="w-5 h-5" />
            </button>
            <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border-2 border-primary/30" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100")' }} />
          </div>
        </div>
      </header>

      <main className="flex-1 flex relative">
        {/* Network Graph Viewport */}
        <div className="flex-1 relative bg-slate-900 overflow-hidden">
          <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#20d3ee 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
          
          {/* Mock Network Graph */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-full h-full">
              {/* Central Node */}
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
              >
                <div className="size-24 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center shadow-[0_0_40px_rgba(32,211,238,0.3)]">
                  <div className="flex flex-col items-center">
                    <span className="text-xs font-black text-white uppercase tracking-widest">US</span>
                    <span className="text-[8px] text-primary font-bold">CORE</span>
                  </div>
                </div>
              </motion.div>

              {/* Satellite Nodes */}
              {[
                { name: 'EU', angle: 0, distance: 200, relation: 'Alliance', color: 'bg-emerald-500' },
                { name: 'CN', angle: 72, distance: 220, relation: 'Economic', color: 'bg-amber-500' },
                { name: 'IN', angle: 144, distance: 180, relation: 'Economic', color: 'bg-amber-500' },
                { name: 'BR', angle: 216, distance: 190, relation: 'Alliance', color: 'bg-emerald-500' },
                { name: 'RU', angle: 288, distance: 230, relation: 'Hostile', color: 'bg-red-500' }
              ].map((node, i) => {
                const x = Math.cos((node.angle * Math.PI) / 180) * node.distance;
                const y = Math.sin((node.angle * Math.PI) / 180) * node.distance;
                
                return (
                  <React.Fragment key={i}>
                    {/* Connection Line */}
                    <div 
                      className={`absolute top-1/2 left-1/2 h-[1px] origin-left z-10 ${node.relation === 'Alliance' ? 'bg-emerald-500/30' : node.relation === 'Hostile' ? 'bg-red-500/30' : 'bg-amber-500/30'}`}
                      style={{ 
                        width: `${node.distance}px`, 
                        transform: `rotate(${node.angle}deg)` 
                      }}
                    />
                    {/* Node */}
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 + (i * 0.1) }}
                      className="absolute z-20"
                      style={{ 
                        top: `calc(50% + ${y}px)`, 
                        left: `calc(50% + ${x}px)`,
                        transform: 'translate(-50%, -50%)'
                      }}
                    >
                      <div className={`size-16 rounded-full bg-slate-800 border-2 flex items-center justify-center shadow-xl ${node.relation === 'Alliance' ? 'border-emerald-500' : node.relation === 'Hostile' ? 'border-red-500' : 'border-amber-500'}`}>
                        <div className="flex flex-col items-center">
                          <span className="text-xs font-bold text-white">{node.name}</span>
                          <span className={`text-[6px] font-bold uppercase ${node.relation === 'Alliance' ? 'text-emerald-500' : node.relation === 'Hostile' ? 'text-red-500' : 'text-amber-500'}`}>
                            {node.relation}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  </React.Fragment>
                );
              })}
            </div>
          </div>

          <div className="absolute top-8 left-8 flex flex-col gap-4">
            <div className="glass-panel p-4 rounded-xl border-primary/20 flex flex-col gap-3">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Legend</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="size-2 rounded-full bg-emerald-500" />
                  <span className="text-[10px] text-slate-300 font-medium">Alliance (Strong)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="size-2 rounded-full bg-amber-500" />
                  <span className="text-[10px] text-slate-300 font-medium">Economic Partner</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="size-2 rounded-full bg-red-500" />
                  <span className="text-[10px] text-slate-300 font-medium">Hostile / Rival</span>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute bottom-8 left-8">
            <div className="glass-panel p-2.5 rounded-2xl border border-primary/20 flex gap-2.5 bg-background-dark/40 backdrop-blur-xl">
              <button className="p-4 bg-primary text-background-dark rounded-xl shadow-[0_0_20px_rgba(32,211,238,0.3)] hover:brightness-110 transition-all"><Share2 className="w-6 h-6" /></button>
              <button className="p-4 bg-slate-800/60 text-slate-400 hover:text-primary rounded-xl border border-slate-700/50 hover:border-primary/30 transition-all"><Filter className="w-6 h-6" /></button>
              <button className="p-4 bg-slate-800/60 text-slate-400 hover:text-primary rounded-xl border border-slate-700/50 hover:border-primary/30 transition-all"><Info className="w-6 h-6" /></button>
            </div>
          </div>
        </div>

        {/* Right Sidebar: Diplomatic Feed */}
        <aside className="w-96 bg-background-dark border-l border-primary/10 p-6 flex flex-col gap-6 overflow-y-auto">
          <div className="flex flex-col gap-1">
            <h3 className="text-lg font-bold text-white">Diplomatic Feed</h3>
            <p className="text-slate-500 text-xs">Real-time relationship shifts and treaty updates.</p>
          </div>

          <div className="space-y-6">
            {[
              { type: 'alliance', title: 'New Strategic Partnership', detail: 'US and Brazil sign maritime security pact.', time: '2h ago' },
              { type: 'warning', title: 'Economic Sanctions', detail: 'EU imposes new tariffs on Russian tech imports.', time: '5h ago' },
              { type: 'info', title: 'Treaty Negotiation', detail: 'China proposes new trade corridor in Central Asia.', time: '12h ago' },
              { type: 'alliance', title: 'Joint Military Exercise', detail: 'India and US conduct naval drills in Sector 7.', time: '1d ago' }
            ].map((event, i) => (
              <div key={i} className="flex gap-4 items-start group cursor-pointer">
                <div className={`size-10 rounded-lg shrink-0 flex items-center justify-center border transition-colors ${event.type === 'alliance' ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-500' : event.type === 'warning' ? 'bg-red-500/10 border-red-500/30 text-red-500' : 'bg-primary/10 border-primary/30 text-primary'}`}>
                  {event.type === 'alliance' ? <Handshake className="w-5 h-5" /> : event.type === 'warning' ? <AlertTriangle className="w-5 h-5" /> : <TrendingUp className="w-5 h-5" />}
                </div>
                <div className="flex flex-col flex-1 gap-1">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-bold text-slate-200 group-hover:text-primary transition-colors">{event.title}</span>
                    <span className="text-[10px] text-slate-500 font-medium">{event.time}</span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">{event.detail}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-auto space-y-4">
            <div className="glass-panel p-4 rounded-xl border-primary/10 bg-primary/5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] text-slate-500 uppercase font-bold">Global Tension Index</span>
                <span className="text-xs font-bold text-amber-500">MODERATE</span>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div className="bg-amber-500 h-full w-1/2 shadow-[0_0_10px_rgba(245,158,11,0.5)]" />
              </div>
            </div>
            <div className="relative">
              <button 
                onClick={() => !isGuest && setIsSummitModalOpen(true)}
                disabled={isGuest}
                className={`w-full font-black py-4 pl-8 pr-20 rounded-2xl shadow-2xl transition-all flex items-center justify-center gap-3 text-base uppercase tracking-[0.2em] border-2 ${isGuest ? 'bg-slate-700 text-slate-500 border-slate-600 cursor-not-allowed' : 'bg-primary text-background-dark border-primary/50 hover:scale-[1.02] hover:brightness-110'}`}
              >
                {isGuest ? 'Summit Locked' : 'Initiate Summit'}
                <ArrowRight className="w-5 h-5" />
              </button>
              <div className="absolute right-2 top-1/2 -translate-y-1/2 size-12 rounded-full bg-primary/20 backdrop-blur-md border border-primary/30 flex items-center justify-center text-background-dark shadow-xl">
                <div className="flex flex-col gap-1">
                  <div className="w-5 h-0.5 bg-background-dark rounded-full" />
                  <div className="w-5 h-0.5 bg-background-dark rounded-full" />
                  <div className="w-5 h-0.5 bg-background-dark rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </aside>
      </main>

      {/* Initiate Summit Modal */}
      <AnimatePresence>
        {isSummitModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSummitModalOpen(false)}
              className="absolute inset-0 bg-background-deep/80 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg glass-panel rounded-3xl border-primary/20 p-8 shadow-2xl bg-background-dark"
            >
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-black text-white uppercase tracking-tight">Initiate Global Summit</h2>
                <button onClick={() => setIsSummitModalOpen(false)} className="p-2 rounded-lg hover:bg-slate-800 text-slate-400">
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="space-y-6">
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">Summit Title</label>
                  <input 
                    type="text" 
                    value={summitData.title}
                    onChange={(e) => setSummitData({...summitData, title: e.target.value})}
                    placeholder="e.g. Arctic Resource Allocation 2026" 
                    className="w-full bg-slate-900 border border-primary/20 rounded-xl py-4 px-4 text-white placeholder:text-slate-600 focus:ring-2 focus:ring-primary/30 outline-none" 
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">Location</label>
                    <div className="relative">
                      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/60" />
                      <select 
                        value={summitData.location}
                        onChange={(e) => setSummitData({...summitData, location: e.target.value})}
                        className="w-full bg-slate-900 border border-primary/20 rounded-xl py-4 pl-10 pr-4 text-white focus:ring-2 focus:ring-primary/30 outline-none appearance-none text-sm"
                      >
                        <option>New Geneva</option>
                        <option>Brasilia</option>
                        <option>Singapore</option>
                        <option>Reykjavik</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">Date</label>
                    <div className="relative">
                      <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/60" />
                      <input 
                        type="date" 
                        value={summitData.date}
                        onChange={(e) => setSummitData({...summitData, date: e.target.value})}
                        className="w-full bg-slate-900 border border-primary/20 rounded-xl py-4 pl-10 pr-4 text-white focus:ring-2 focus:ring-primary/30 outline-none text-sm" 
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">Invite Delegates</label>
                  <div className="flex flex-wrap gap-2">
                    {['EU', 'China', 'India', 'Brazil', 'Russia', 'Japan'].map((delegate) => (
                      <button 
                        key={delegate}
                        onClick={() => {
                          const participants = summitData.participants.includes(delegate as never)
                            ? summitData.participants.filter(p => p !== delegate)
                            : [...summitData.participants, delegate];
                          setSummitData({...summitData, participants: participants as never[]});
                        }}
                        className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest border transition-all ${summitData.participants.includes(delegate as never) ? 'bg-primary text-background-dark border-primary' : 'bg-slate-800 text-slate-400 border-slate-700 hover:border-primary/30'}`}
                      >
                        {delegate}
                      </button>
                    ))}
                  </div>
                </div>

                <button 
                  onClick={handleInitiateSummit}
                  disabled={!summitData.title || !summitData.date}
                  className="w-full py-5 bg-primary text-background-dark font-black uppercase tracking-widest rounded-2xl hover:brightness-110 transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed mt-4"
                >
                  <Send className="w-5 h-5" />
                  Broadcast Invitations
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
