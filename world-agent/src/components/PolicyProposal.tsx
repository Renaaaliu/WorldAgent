import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Globe, Gavel, FileText, TrendingUp, 
  Users, Shield, Zap, Info, ArrowRight,
  CheckCircle2, AlertCircle, X
} from 'lucide-react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, AreaChart, Area 
} from 'recharts';

const data = [
  { year: '2024', gdp: 2.4, stability: 85 },
  { year: '2025', gdp: 2.8, stability: 82 },
  { year: '2026', gdp: 3.5, stability: 88 },
  { year: '2027', gdp: 4.2, stability: 92 },
  { year: '2028', gdp: 4.8, stability: 90 },
  { year: '2029', gdp: 5.5, stability: 94 },
];

export const PolicyProposal: React.FC<{ isGuest?: boolean; onViewChange?: (view: any) => void }> = ({ isGuest, onViewChange }) => {
  const [activeTab, setActiveTab] = useState('draft');
  const [urgency, setUrgency] = useState('High');
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [showReport, setShowReport] = useState(false);

  return (
    <div className="min-h-screen flex flex-col text-slate-100 bg-background-deep">
      <header className="flex items-center justify-between border-b border-primary/20 px-6 lg:px-20 py-4 bg-background-dark/80 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-3 text-primary">
            <Globe className="w-8 h-8" />
            <h2 className="text-slate-100 text-xl font-bold leading-tight tracking-tight">World Agent</h2>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <button onClick={() => onViewChange?.('dashboard')} className="text-slate-400 hover:text-primary transition-colors text-sm font-medium">Dashboard</button>
            <button className="text-primary text-sm font-semibold border-b-2 border-primary pb-1">Policy Hub</button>
            <button onClick={() => onViewChange?.('analytics')} className="text-slate-400 hover:text-primary transition-colors text-sm font-medium">Analytics</button>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex flex-col items-end mr-4">
            <span className="text-[10px] text-slate-500 uppercase font-bold">Influence Level</span>
            <span className="text-sm font-bold text-primary">LEVEL 42</span>
          </div>
          <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border-2 border-primary/30" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100")' }} />
        </div>
      </header>

      <main className="flex-1 px-6 lg:px-40 py-10 max-w-7xl mx-auto w-full">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-black leading-tight tracking-tight text-white">Policy Proposal & Impact Preview</h1>
            <p className="text-slate-400 text-lg">Draft legislation and simulate real-time socio-economic consequences.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Form */}
            <div className="lg:col-span-2 space-y-8">
              <div className="glass-panel rounded-2xl p-8 border-primary/10">
                <div className="flex gap-4 mb-8 border-b border-primary/10 pb-4">
                  <button 
                    onClick={() => setActiveTab('draft')}
                    className={`pb-2 text-sm font-bold uppercase tracking-widest transition-all ${activeTab === 'draft' ? 'text-primary border-b-2 border-primary' : 'text-slate-500 hover:text-slate-300'}`}
                  >
                    Drafting
                  </button>
                  <button 
                    onClick={() => setActiveTab('clauses')}
                    className={`pb-2 text-sm font-bold uppercase tracking-widest transition-all ${activeTab === 'clauses' ? 'text-primary border-b-2 border-primary' : 'text-slate-500 hover:text-slate-300'}`}
                  >
                    Clauses
                  </button>
                  <button 
                    onClick={() => setActiveTab('signatories')}
                    className={`pb-2 text-sm font-bold uppercase tracking-widest transition-all ${activeTab === 'signatories' ? 'text-primary border-b-2 border-primary' : 'text-slate-500 hover:text-slate-300'}`}
                  >
                    Signatories
                  </button>
                </div>

                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                  {isGuest && (
                    <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center gap-3 mb-6">
                      <AlertCircle className="w-5 h-5 text-amber-500 shrink-0" />
                      <p className="text-xs text-amber-200/80 font-medium">
                        <span className="font-bold text-amber-500 uppercase mr-2">Guest Access:</span>
                        Drafting and simulation are restricted. Register to propose policies.
                      </p>
                    </div>
                  )}
                  <div className="flex flex-col gap-2">
                    <label className="text-slate-300 text-sm font-bold uppercase tracking-wider flex items-center gap-2">
                      <FileText className="w-4 h-4 text-primary" />
                      Proposal Title
                    </label>
                    <input 
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      disabled={isGuest}
                      className={`w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-primary outline-none transition-all ${isGuest ? 'cursor-not-allowed opacity-50' : ''}`}
                      placeholder={isGuest ? "Registration required..." : "e.g. Sustainable Energy Transition Act 2025"}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label className="text-slate-300 text-sm font-bold uppercase tracking-wider">Primary Sector</label>
                      <select 
                        disabled={isGuest}
                        className={`w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-primary outline-none transition-all appearance-none ${isGuest ? 'cursor-not-allowed opacity-50' : ''}`}
                      >
                        <option>Energy & Environment</option>
                        <option>Defense & Security</option>
                        <option>Trade & Economics</option>
                        <option>Technology & AI</option>
                      </select>
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-slate-300 text-sm font-black uppercase tracking-[0.1em]">Urgency Level</label>
                      <div className="flex gap-3">
                        {['Low', 'Medium', 'High', 'Critical'].map((level) => (
                          <button 
                            key={level} 
                            type="button" 
                            onClick={() => !isGuest && setUrgency(level)}
                            disabled={isGuest}
                            className={`flex-1 py-4 rounded-2xl border-2 text-[10px] font-black uppercase tracking-widest transition-all ${urgency === level ? (isGuest ? 'bg-slate-700 border-slate-600 text-slate-500' : 'bg-primary text-background-dark border-primary shadow-[0_0_15px_rgba(32,211,238,0.2)]') : 'bg-slate-900/40 border-slate-700/50 text-slate-500 hover:border-slate-500'} ${isGuest ? 'cursor-not-allowed' : ''}`}
                          >
                            {level}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-slate-300 text-sm font-bold uppercase tracking-wider">Executive Summary</label>
                    <textarea 
                      value={summary}
                      onChange={(e) => setSummary(e.target.value)}
                      disabled={isGuest}
                      className={`w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-primary outline-none transition-all min-h-[160px] ${isGuest ? 'cursor-not-allowed opacity-50' : ''}`}
                      placeholder={isGuest ? "Registration required to draft policies..." : "Outline the core objectives and expected outcomes of this policy..."}
                    />
                  </div>

                  <div className="flex items-center justify-between pt-6 border-t border-primary/10">
                    <div className="flex items-center gap-2 text-slate-500 text-xs">
                      <Info className="w-4 h-4" />
                      {isGuest ? 'Simulation locked' : 'Auto-saving draft...'}
                    </div>
                    <div className="flex gap-4">
                      <button 
                        type="button" 
                        onClick={() => !isGuest && alert('Draft saved successfully!')}
                        disabled={isGuest}
                        className={`px-10 py-4 rounded-2xl font-black text-xs uppercase border-2 transition-all tracking-widest ${isGuest ? 'bg-slate-800/50 text-slate-600 border-slate-800 cursor-not-allowed' : 'bg-slate-900/40 text-slate-300 border-slate-700 hover:bg-slate-800 hover:border-slate-500'}`}
                      >
                        Save Draft
                      </button>
                      <button 
                        type="button" 
                        onClick={() => !isGuest && alert('Simulation engine initializing...')}
                        disabled={isGuest}
                        className={`px-12 py-4 rounded-2xl font-black text-xs uppercase shadow-2xl transition-all tracking-widest ${isGuest ? 'bg-slate-700 text-slate-500 cursor-not-allowed' : 'bg-primary text-background-dark shadow-primary/30 hover:brightness-110 hover:scale-[1.02]'}`}
                      >
                        Run Simulation
                      </button>
                    </div>
                  </div>
                </form>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { icon: <Users className="text-blue-400" />, label: 'Public Support', value: '68%', trend: '+4.2%' },
                  { icon: <Shield className="text-emerald-400" />, label: 'National Security', value: 'High', trend: 'Stable' },
                  { icon: <Zap className="text-amber-400" />, label: 'Energy Efficiency', value: '+15%', trend: 'Projected' }
                ].map((stat, i) => (
                  <div key={i} className="glass-panel p-6 rounded-2xl border-primary/5 flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <div className="p-2 bg-slate-800 rounded-lg">{stat.icon}</div>
                      <span className="text-[10px] font-bold text-emerald-500">{stat.trend}</span>
                    </div>
                    <span className="text-slate-500 text-xs font-bold uppercase tracking-widest">{stat.label}</span>
                    <span className="text-2xl font-bold text-white">{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Impact Preview */}
            <div className="space-y-8">
              <div className="glass-panel rounded-2xl p-6 border-primary/10 flex flex-col gap-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-primary" />
                    GDP Growth Projection
                  </h3>
                  <div className="flex gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-700" />
                  </div>
                </div>
                
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                      <defs>
                        <linearGradient id="colorGdp" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#20d3ee" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#20d3ee" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                      <XAxis dataKey="year" stroke="#64748b" fontSize={10} axisLine={false} tickLine={false} />
                      <YAxis stroke="#64748b" fontSize={10} axisLine={false} tickLine={false} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #20d3ee33', borderRadius: '8px' }}
                        itemStyle={{ color: '#20d3ee' }}
                      />
                      <Area type="monotone" dataKey="gdp" stroke="#20d3ee" fillOpacity={1} fill="url(#colorGdp)" strokeWidth={3} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400 text-xs font-medium">Projected Stability Index</span>
                    <span className="text-primary font-bold text-sm">94.2</span>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-primary h-full w-[94%] shadow-[0_0_10px_rgba(32,211,238,0.5)]" />
                  </div>
                </div>
              </div>

              <div className="glass-panel rounded-2xl p-6 border-primary/10 space-y-6">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">Key Impact Analysis</h3>
                <div className="space-y-4">
                  {[
                    { type: 'positive', text: 'Accelerated transition to renewable infrastructure (+12%)' },
                    { type: 'positive', text: 'Increased diplomatic leverage with Nordic Council' },
                    { type: 'negative', text: 'Short-term inflation in manufacturing sector (2.4%)' },
                    { type: 'neutral', text: 'Moderate shift in urban population density' }
                  ].map((impact, i) => (
                    <div key={i} className="flex gap-3 items-start">
                      {impact.type === 'positive' && <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />}
                      {impact.type === 'negative' && <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />}
                      {impact.type === 'neutral' && <Info className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />}
                      <p className="text-xs text-slate-300 leading-relaxed">{impact.text}</p>
                    </div>
                  ))}
                </div>
                <button 
                  onClick={() => setShowReport(true)}
                  className="w-full flex items-center justify-center gap-2 bg-slate-800/50 text-slate-300 py-3 rounded-xl border border-slate-700 text-xs font-bold uppercase hover:bg-slate-700 transition-all"
                >
                  View Detailed Report
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Detailed Report Modal */}
      {showReport && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-background-dark/90 backdrop-blur-md">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            className="w-full max-w-3xl bg-slate-900 border border-primary/30 rounded-3xl p-8 shadow-2xl relative overflow-hidden max-h-[90vh] overflow-y-auto"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
            
            <button 
              onClick={() => setShowReport(false)}
              className="absolute top-4 right-4 p-2 text-slate-500 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="flex items-center gap-3 text-primary mb-6">
              <FileText className="w-6 h-6" />
              <span className="text-xs font-black tracking-[0.2em] uppercase">Detailed Impact Analysis Report</span>
            </div>

            <h2 className="text-3xl font-bold text-white mb-6">{title || 'Sustainable Energy Transition Act 2025'}</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="p-4 rounded-xl bg-primary/5 border border-primary/10">
                <span className="text-[10px] font-bold text-slate-500 uppercase block mb-1">Confidence Score</span>
                <span className="text-lg font-bold text-primary">92.4%</span>
              </div>
              <div className="p-4 rounded-xl bg-primary/5 border border-primary/10">
                <span className="text-[10px] font-bold text-slate-500 uppercase block mb-1">Risk Factor</span>
                <span className="text-lg font-bold text-amber-500">LOW</span>
              </div>
              <div className="p-4 rounded-xl bg-primary/5 border border-primary/10">
                <span className="text-[10px] font-bold text-slate-500 uppercase block mb-1">Time Horizon</span>
                <span className="text-lg font-bold text-white">5 Years</span>
              </div>
            </div>

            <div className="space-y-8">
              <section>
                <h4 className="text-xs font-bold text-primary uppercase tracking-widest mb-4">Macro-Economic Projections</h4>
                <div className="h-48 w-full mb-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                      <XAxis dataKey="year" stroke="#64748b" fontSize={10} />
                      <YAxis stroke="#64748b" fontSize={10} />
                      <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #20d3ee33' }} />
                      <Line type="monotone" dataKey="stability" stroke="#20d3ee" strokeWidth={2} dot={{ fill: '#20d3ee' }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <p className="text-sm text-slate-400 leading-relaxed">
                  The simulation indicates a strong positive correlation between the proposed energy subsidies and long-term industrial stability. Initial capital expenditure is offset by efficiency gains within 18 months.
                </p>
              </section>

              <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-xs font-bold text-emerald-500 uppercase tracking-widest mb-3">Primary Benefits</h4>
                  <ul className="space-y-2">
                    {['Energy independence +22%', 'Carbon footprint -45%', 'New tech sector jobs: 140k'].map((b, i) => (
                      <li key={i} className="flex items-center gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-red-400 uppercase tracking-widest mb-3">Potential Friction</h4>
                  <ul className="space-y-2">
                    {['Legacy sector resistance', 'Grid integration latency', 'Initial tax revenue dip'].map((f, i) => (
                      <li key={i} className="flex items-center gap-2 text-xs text-slate-300">
                        <AlertCircle className="w-3 h-3 text-red-400" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
            </div>

            <button 
              onClick={() => setShowReport(false)}
              className="w-full mt-10 py-4 bg-primary text-background-dark font-black tracking-widest uppercase rounded-2xl hover:brightness-110 transition-all"
            >
              Acknowledge Report
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
};
