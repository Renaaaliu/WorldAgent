import React from 'react';
import { motion } from 'motion/react';
import { 
  Globe, Search, Bell, Settings, 
  Shield, Zap, TrendingUp, Users,
  Map as MapIcon, Layers, Radio, Crosshair,
  ChevronRight, AlertTriangle, Info
} from 'lucide-react';

export const CommandCenter: React.FC<{ isGuest?: boolean; onViewChange?: (view: any) => void }> = ({ isGuest, onViewChange }) => {
  return (
    <div className="min-h-screen flex flex-col bg-background-deep overflow-hidden">
      <header className="flex items-center justify-between border-b border-primary/20 px-6 lg:px-20 py-4 bg-background-dark/80 backdrop-blur-md sticky top-0 z-50 gap-8">
        <div className="flex items-center gap-8 shrink-0">
          <div className="flex items-center gap-3 text-primary">
            <Globe className="w-8 h-8" />
            <h2 className="text-slate-100 text-xl font-bold leading-tight tracking-tight">World Agent</h2>
          </div>
          <nav className="hidden xl:flex items-center gap-8">
            <button className="text-primary text-sm font-semibold border-b-2 border-primary pb-1 whitespace-nowrap">Command Center</button>
            <button onClick={() => onViewChange?.('intel')} className="text-slate-400 hover:text-primary transition-colors text-sm font-medium whitespace-nowrap">Intelligence</button>
            <button onClick={() => onViewChange?.('assets')} className="text-slate-400 hover:text-primary transition-colors text-sm font-medium whitespace-nowrap">Assets</button>
            <button onClick={() => onViewChange?.('diplomacy')} className="text-slate-400 hover:text-primary transition-colors text-sm font-medium whitespace-nowrap">Diplomacy</button>
          </nav>
        </div>
        <div className="flex items-center gap-6 justify-end">
          <div className="hidden lg:flex items-center rounded-lg h-10 bg-primary/10 border border-primary/20 px-3 min-w-[200px]">
            <Search className="w-4 h-4 text-primary/60 mr-2" />
            <input className="bg-transparent border-none focus:ring-0 text-white text-sm placeholder:text-primary/40 w-full outline-none" placeholder="Search coordinates..." />
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
        {/* Main 3D Map Viewport */}
        <div className="flex-1 relative bg-slate-900 overflow-hidden">
          <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#20d3ee 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
          
          {/* Mock 3D Map Perspective */}
          <div className="absolute inset-0 flex items-center justify-center perspective-[1000px]">
            <motion.div 
              initial={{ rotateX: 45, scale: 1.2, opacity: 0 }}
              animate={{ rotateX: 45, scale: 1, opacity: 1 }}
              transition={{ duration: 1.5 }}
              className="relative w-[120%] h-[120%] bg-slate-800/20 rounded-[100px] border border-primary/20 overflow-hidden shadow-[0_0_100px_rgba(32,211,238,0.1)]"
            >
              <img 
                src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1600" 
                className="w-full h-full object-cover opacity-60 grayscale blur-[2px]" 
                alt="World Map 3D"
                referrerPolicy="no-referrer"
              />
              
              {/* Tactical Markers */}
              {[
                { top: '30%', left: '25%', type: 'conflict', label: 'Sector 4' },
                { top: '45%', left: '60%', type: 'resource', label: 'Mine Alpha' },
                { top: '20%', left: '75%', type: 'base', label: 'HQ North' }
              ].map((marker, i) => (
                <div key={i} className="absolute" style={{ top: marker.top, left: marker.left }}>
                  <div className="relative flex flex-col items-center">
                    <div className={`size-4 rounded-full border-2 border-white shadow-lg ${marker.type === 'conflict' ? 'bg-red-500' : marker.type === 'resource' ? 'bg-amber-500' : 'bg-primary'}`}>
                      <div className="absolute inset-0 rounded-full animate-ping bg-white/50" />
                    </div>
                    <div className="mt-2 bg-slate-900/80 backdrop-blur px-2 py-1 rounded border border-white/10 text-[8px] font-bold text-white uppercase tracking-widest whitespace-nowrap">
                      {marker.label}
                    </div>
                  </div>
                </div>
              ))}

              {/* Grid Overlay */}
              <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'linear-gradient(to right, rgba(32,211,238,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(32,211,238,0.05) 1px, transparent 1px)', backgroundSize: '100px 100px' }} />
            </motion.div>
          </div>

          {/* Map Overlay UI */}
          <div className="absolute top-8 left-8 flex flex-col gap-4">
            <div className="glass-panel p-4 rounded-xl border-primary/20 flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-lg bg-primary/20 flex items-center justify-center text-primary border border-primary/30">
                  <Shield className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-slate-100 uppercase tracking-widest">Territory Status</span>
                  <span className="text-sm font-bold text-emerald-500">OPTIMAL</span>
                </div>
              </div>
              <div className="h-[1px] bg-primary/10" />
              <div className="space-y-3">
                <div className="flex justify-between items-center gap-8">
                  <span className="text-[10px] text-slate-500 font-bold uppercase">Stability</span>
                  <span className="text-xs font-bold text-slate-200">94.2%</span>
                </div>
                <div className="flex justify-between items-center gap-8">
                  <span className="text-[10px] text-slate-500 font-bold uppercase">Readiness</span>
                  <span className="text-xs font-bold text-slate-200">HIGH</span>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute bottom-8 left-8 flex gap-4">
            <div className="glass-panel p-2 rounded-xl border-primary/20 flex gap-2">
              <button className="p-3 bg-primary text-background-dark rounded-lg shadow-lg shadow-primary/20"><MapIcon className="w-5 h-5" /></button>
              <button className="p-3 bg-slate-800 text-slate-400 hover:text-primary rounded-lg transition-colors"><Layers className="w-5 h-5" /></button>
              <button className="p-3 bg-slate-800 text-slate-400 hover:text-primary rounded-lg transition-colors"><Radio className="w-5 h-5" /></button>
              <button className="p-3 bg-slate-800 text-slate-400 hover:text-primary rounded-lg transition-colors"><Crosshair className="w-5 h-5" /></button>
            </div>
          </div>

          <div className="absolute bottom-8 right-8">
            <div className="glass-panel p-4 rounded-xl border-primary/20 flex flex-col gap-3">
              <div className="flex items-center gap-2 text-red-500 font-bold text-[10px] uppercase tracking-widest animate-pulse">
                <AlertTriangle className="w-4 h-4" />
                Conflict Detected
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xs font-bold text-slate-100">Sector 4 Intrusion</span>
                <span className="text-[10px] text-slate-500">Unidentified private security fleet.</span>
              </div>
              <button 
                disabled={isGuest}
                className={`mt-2 w-full border py-2 rounded-lg text-[10px] font-bold uppercase transition-all ${isGuest ? 'bg-slate-800 text-slate-700 border-slate-800 cursor-not-allowed' : 'bg-red-500/20 text-red-500 border-red-500/40 hover:bg-red-500/30'}`}
              >
                Deploy Response
              </button>
            </div>
          </div>
        </div>

        {/* Right Sidebar: Strategic Intel */}
        <aside className="w-80 bg-background-dark border-l border-primary/10 p-6 flex flex-col gap-6 overflow-y-auto">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Strategic Intel</h3>
            <Settings className="w-4 h-4 text-slate-500 cursor-pointer hover:text-primary transition-colors" />
          </div>

          <div className="space-y-4">
            {[
              { label: 'Global Market', value: '+1.2%', trend: 'up', icon: <TrendingUp className="text-emerald-500" /> },
              { label: 'Diplomatic Pulse', value: '72/100', trend: 'neutral', icon: <Users className="text-primary" /> },
              { label: 'Energy Demand', value: 'High', trend: 'up', icon: <Zap className="text-amber-500" /> }
            ].map((stat, i) => (
              <div key={i} className="glass-panel p-4 rounded-xl border-primary/5 flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{stat.label}</span>
                  {stat.icon}
                </div>
                <span className="text-lg font-bold text-white">{stat.value}</span>
              </div>
            ))}
          </div>

          <div className="h-[1px] bg-primary/10" />

          <div className="flex flex-col gap-4">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Active Missions</h4>
            <div className="space-y-3">
              {[
                { title: 'Arctic Treaty', progress: 65, status: 'Negotiating' },
                { title: 'Sector 4 Defense', progress: 20, status: 'Alert' },
                { title: 'Trade Route Alpha', progress: 90, status: 'Securing' }
              ].map((mission, i) => (
                <div key={i} className="flex flex-col gap-2 p-3 rounded-xl bg-slate-800/40 border border-slate-700">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-slate-200">{mission.title}</span>
                    <span className={`text-[8px] font-bold uppercase px-1.5 py-0.5 rounded ${mission.status === 'Alert' ? 'bg-red-500/20 text-red-500' : 'bg-primary/20 text-primary'}`}>
                      {mission.status}
                    </span>
                  </div>
                  <div className="w-full bg-slate-900 h-1 rounded-full overflow-hidden">
                    <div className="bg-primary h-full transition-all" style={{ width: `${mission.progress}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-auto glass-panel p-4 rounded-xl border-primary/10 flex items-center gap-3">
            <div className="size-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-primary">
              <Info className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-slate-500 uppercase font-bold">System Status</span>
              <span className="text-xs font-bold text-slate-200">All Nodes Operational</span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-600 ml-auto" />
          </div>
        </aside>
      </main>
    </div>
  );
};
