import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { StrategicHeader } from './StrategicHeader';
import { 
  Globe, TrendingUp, Users, Zap, Shield, 
  ArrowUpRight, ArrowDownRight, Filter, Download,
  MoreHorizontal, Calendar, Lock, Play, BarChart3,
  LineChart as LineChartIcon, PieChart as PieChartIcon,
  Activity, AlertCircle
} from 'lucide-react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, BarChart, Bar,
  PieChart, Pie, Cell
} from 'recharts';
import { cn } from '../lib/utils';

const gdpData = [
  { month: 'Jan', value: 4200 },
  { month: 'Feb', value: 4500 },
  { month: 'Mar', value: 4300 },
  { month: 'Apr', value: 4800 },
  { month: 'May', value: 5200 },
  { month: 'Jun', value: 5100 },
  { month: 'Jul', value: 5600 },
];

const sectorData = [
  { name: 'Tech', value: 45 },
  { name: 'Energy', value: 25 },
  { name: 'Defense', value: 20 },
  { name: 'Agri', value: 10 },
];

const COLORS = ['#20d3ee', '#3b82f6', '#10b981', '#f59e0b'];

export const Analytics: React.FC<{ 
  isPremium?: boolean; 
  isGuest?: boolean; 
  onViewChange: (view: any) => void;
  user?: any;
  onLogout?: () => void;
  highContrast?: boolean;
}> = ({ isPremium = false, isGuest = false, onViewChange, user, onLogout, highContrast = false }) => {
  const [activeSimulation, setActiveSimulation] = useState<string | null>(null);
  const [timePeriod, setTimePeriod] = useState('Last 6 Months');
  const [isTimeMenuOpen, setIsTimeMenuOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [isActivityLogOpen, setIsActivityLogOpen] = useState(false);

  const handleExportIntelligence = () => {
    if (isGuest) return;
    setIsExporting(true);
    
    // Simulate report generation
    setTimeout(() => {
      const reportData = {
        title: "Strategic Intelligence Report",
        timestamp: new Date().toISOString(),
        metrics: {
          gdpGrowth: "+5.2%",
          population: "342M",
          techIndex: "84.2",
          stability: "92%"
        },
        sectorDistribution: sectorData,
        recentActivity: [
          { action: 'Policy Enacted', detail: 'Sustainable Energy Transition Act', time: '2h ago' },
          { action: 'Trade Agreement', detail: 'Nordic Council Mineral Exchange', time: '5h ago' }
        ]
      };

      const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `STRATEGIC_INTEL_${new Date().getTime()}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      setIsExporting(false);
      alert('Strategic Intelligence Report downloaded successfully.');
    }, 2000);
  };

  const advancedTools = [
    { id: 'gdp', name: 'GDP Growth Forecasting', icon: <LineChartIcon className="w-5 h-5" />, desc: 'AI-driven economic projections for the next 24 months.' },
    { id: 'pop', name: 'Population Projections', icon: <Users className="w-5 h-5" />, desc: 'Demographic shift analysis and labor force modeling.' },
    { id: 'econ', name: 'Economic Simulations', icon: <Activity className="w-5 h-5" />, desc: 'Stress-test national economy against global market shocks.' },
    { id: 'policy', name: 'Policy Impact Analysis', icon: <Shield className="w-5 h-5" />, desc: 'Evaluate legislative outcomes before implementation.' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background-deep">
      <StrategicHeader 
        currentView="analytics" 
        onViewChange={onViewChange} 
        user={user}
        onLogout={onLogout}
      />

      <main className="flex-1 px-6 lg:px-40 py-10 max-w-7xl mx-auto w-full">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6">
            <div className="flex flex-col gap-2">
              <h1 className="text-4xl font-black leading-tight tracking-tight text-white">Strategic Intelligence</h1>
              <p className="text-slate-400 text-lg">Comprehensive performance metrics and economic projection models.</p>
            </div>
            <div className="flex gap-3">
              <button 
                onClick={handleExportIntelligence}
                disabled={isGuest || isExporting}
                className={cn(
                  "flex items-center gap-3 px-8 py-4 rounded-2xl font-black transition-all border-2 uppercase tracking-widest text-sm",
                  isGuest || isExporting 
                    ? "bg-slate-800/50 border-slate-800 text-slate-600 cursor-not-allowed" 
                    : "bg-slate-900/40 border-slate-700/50 text-slate-300 hover:bg-slate-800 hover:border-slate-500 shadow-xl"
                )}
              >
                {isExporting ? <Activity className="w-6 h-6 animate-spin" /> : <Download className="w-6 h-6" />}
                {isExporting ? 'Exporting...' : 'Export Intelligence'}
              </button>
            </div>
          </div>

          {/* Key Metrics Grid */}
          {isGuest && (
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-amber-500 shrink-0" />
              <p className="text-xs text-amber-200/80 font-medium">
                <span className="font-bold text-amber-500 uppercase mr-2">Guest Access:</span>
                Advanced analytics and data export are restricted. Register to access full strategic intelligence.
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: 'GDP Growth', value: '+5.2%', trend: 'up', icon: <TrendingUp className="text-primary" /> },
              { label: 'Population', value: '342M', trend: 'up', icon: <Users className="text-blue-400" /> },
              { label: 'Tech Index', value: '84.2', trend: 'up', icon: <Zap className="text-amber-400" /> },
              { label: 'Stability', value: '92%', trend: 'down', icon: <Shield className="text-emerald-400" /> }
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass-panel p-6 rounded-2xl border-primary/5 flex flex-col gap-2 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  {React.cloneElement(stat.icon as React.ReactElement, { className: 'w-12 h-12' })}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 text-xs font-bold uppercase tracking-widest">{stat.label}</span>
                  {stat.trend === 'up' ? (
                    <div className="flex items-center gap-1 text-emerald-500 text-[10px] font-bold">
                      <ArrowUpRight className="w-3 h-3" />
                      12%
                    </div>
                  ) : (
                    <div className="flex items-center gap-1 text-red-500 text-[10px] font-bold">
                      <ArrowDownRight className="w-3 h-3" />
                      2%
                    </div>
                  )}
                </div>
                <span className="text-3xl font-bold text-white">{stat.value}</span>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* GDP Chart */}
            <div className="lg:col-span-2 glass-panel rounded-2xl p-8 border-primary/10 flex flex-col gap-8">
              <div className="flex items-center justify-between">
                <div className="flex flex-col gap-1">
                  <h3 className="text-lg font-bold text-white">Economic Output (GDP)</h3>
                  <p className="text-slate-500 text-xs">Monthly performance in billions (USD)</p>
                </div>
                <div className="flex gap-2 relative">
                  <button className="flex items-center gap-2 bg-slate-800 border border-slate-700 px-3 py-1.5 rounded-lg text-[10px] font-bold text-slate-400">
                    <Calendar className="w-3 h-3" />
                    {timePeriod}
                  </button>
                  <button 
                    onClick={() => setIsTimeMenuOpen(!isTimeMenuOpen)}
                    className="text-slate-500 hover:text-primary transition-colors"
                  >
                    <MoreHorizontal className="w-5 h-5" />
                  </button>
                  
                  <AnimatePresence>
                    {isTimeMenuOpen && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute right-0 top-full mt-2 w-48 glass-panel rounded-xl border-primary/20 bg-background-dark shadow-2xl z-20 overflow-hidden"
                      >
                        {['Last 3 Months', 'Last 6 Months', 'Last 12 Months', 'Year to Date', 'All Time'].map((period) => (
                          <button 
                            key={period}
                            onClick={() => {
                              setTimePeriod(period);
                              setIsTimeMenuOpen(false);
                            }}
                            className={`w-full text-left px-4 py-3 text-xs font-bold transition-colors hover:bg-primary/10 ${timePeriod === period ? 'text-primary' : 'text-slate-400'}`}
                          >
                            {period}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={gdpData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                    <XAxis dataKey="month" stroke="#64748b" fontSize={12} axisLine={false} tickLine={false} />
                    <YAxis stroke="#64748b" fontSize={12} axisLine={false} tickLine={false} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #20d3ee33', borderRadius: '12px' }}
                      itemStyle={{ color: '#20d3ee' }}
                    />
                    <Line type="monotone" dataKey="value" stroke="#20d3ee" strokeWidth={4} dot={{ r: 6, fill: '#20d3ee', strokeWidth: 2, stroke: '#0f172a' }} activeDot={{ r: 8, strokeWidth: 0 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Sector Distribution */}
            <div className="glass-panel rounded-2xl p-8 border-primary/10 flex flex-col gap-8">
              <div className="flex flex-col gap-1">
                <h3 className="text-lg font-bold text-white">Sector Distribution</h3>
                <p className="text-slate-500 text-xs">Contribution to national economy</p>
              </div>
              <div className="h-64 w-full relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={sectorData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {sectorData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-2xl font-bold text-white">100%</span>
                  <span className="text-[10px] text-slate-500 uppercase font-bold">Total</span>
                </div>
              </div>
              <div className="space-y-3">
                {sectorData.map((sector, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="size-2 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                      <span className="text-sm text-slate-300 font-medium">{sector.name}</span>
                    </div>
                    <span className="text-sm font-bold text-white">{sector.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Advanced Strategic Simulations - PREMIUM ONLY */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-1">
                <h2 className="text-2xl font-black text-white flex items-center gap-3">
                  Advanced Strategic Simulations
                  {!isPremium && <span className="bg-amber-500/10 text-amber-500 text-[10px] font-black px-2 py-0.5 rounded border border-amber-500/20 uppercase tracking-tighter">Premium Locked</span>}
                </h2>
                <p className="text-slate-400 text-sm">Predictive modeling and stress-testing for national governance.</p>
              </div>
              {(!isPremium || isGuest) && (
                <button 
                  onClick={() => onViewChange('settings')}
                  className="bg-primary text-background-dark px-4 py-2 rounded-lg text-xs font-black uppercase tracking-widest hover:brightness-110 transition-all shadow-lg shadow-primary/20"
                >
                  {isGuest ? 'Register to Unlock' : 'Upgrade to Unlock'}
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
              {(!isPremium || isGuest) && (
                <div className="absolute inset-0 z-10 bg-background-deep/40 backdrop-blur-[2px] rounded-2xl flex items-center justify-center border border-primary/10">
                  <div className="flex flex-col items-center gap-4 p-8 glass-panel rounded-2xl border-primary/20 shadow-2xl">
                    <div className="size-16 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
                      <Lock className="w-8 h-8 text-primary" />
                    </div>
                    <div className="flex flex-col items-center text-center gap-1">
                      <h4 className="text-lg font-bold text-white">{isGuest ? 'Guest Restriction' : 'Strategic Tools Locked'}</h4>
                      <p className="text-slate-400 text-xs max-w-[200px]">
                        {isGuest 
                          ? 'Register an account to access advanced forecasting and simulation models.' 
                          : 'Upgrade to Premium to access advanced forecasting and simulation models.'}
                      </p>
                    </div>
                    <button 
                      onClick={() => onViewChange('settings')}
                      className="mt-2 w-full py-3 rounded-xl bg-primary text-background-dark font-black text-xs uppercase tracking-widest shadow-lg shadow-primary/20"
                    >
                      {isGuest ? 'Register Now' : 'Unlock Now'}
                    </button>
                  </div>
                </div>
              )}

              {advancedTools.map((tool) => (
                <div key={tool.id} className="glass-panel p-6 rounded-2xl border-primary/10 flex flex-col gap-4 group">
                  <div className="flex items-center justify-between">
                    <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary border border-primary/10">
                      {tool.icon}
                    </div>
                    <button className="text-slate-600 group-hover:text-primary transition-colors">
                      <Play className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h4 className="text-sm font-bold text-slate-100">{tool.name}</h4>
                    <p className="text-[10px] text-slate-500 leading-relaxed">{tool.desc}</p>
                  </div>
                  <div className="mt-2 pt-4 border-t border-primary/5">
                    <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-slate-600">
                      <span>Status</span>
                      <span className="text-emerald-500">Ready</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Stability Gauge & Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="glass-panel rounded-2xl p-8 border-primary/10 flex flex-col gap-6">
              <h3 className="text-lg font-bold text-white">Stability Gauge</h3>
              <div className="flex-1 flex flex-col items-center justify-center py-10">
                <div className="relative size-48">
                  <svg className="size-full" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="45" fill="none" stroke="#1e293b" strokeWidth="8" strokeDasharray="283" strokeDashoffset="70" transform="rotate(135 50 50)" />
                    <circle cx="50" cy="50" r="45" fill="none" stroke="#20d3ee" strokeWidth="8" strokeDasharray="283" strokeDashoffset="120" transform="rotate(135 50 50)" className="drop-shadow-[0_0_8px_rgba(32,211,238,0.5)]" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-4xl font-black text-white">92</span>
                    <span className="text-xs text-slate-500 font-bold uppercase tracking-widest">Optimal</span>
                  </div>
                </div>
                <p className="text-slate-400 text-sm text-center mt-6 max-w-xs">
                  National stability is currently at an optimal level. High public support and economic growth are key drivers.
                </p>
              </div>
            </div>

            <div className="glass-panel rounded-2xl p-8 border-primary/10 flex flex-col gap-6">
              <h3 className="text-lg font-bold text-white">Recent Strategic Activity</h3>
              <div className="space-y-6">
                {[
                  { action: 'Policy Enacted', detail: 'Sustainable Energy Transition Act', time: '2h ago', status: 'success' },
                  { action: 'Trade Agreement', detail: 'Nordic Council Mineral Exchange', time: '5h ago', status: 'success' },
                  { action: 'Crisis Managed', detail: 'Cyber Intrusion Sector 4', time: '12h ago', status: 'warning' },
                  { action: 'Budget Allocated', detail: 'R&D Infrastructure Expansion', time: '1d ago', status: 'success' }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <div className={`size-2 rounded-full mt-2 ${item.status === 'success' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                    <div className="flex flex-col flex-1">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-bold text-slate-200">{item.action}</span>
                        <span className="text-[10px] text-slate-500 font-medium">{item.time}</span>
                      </div>
                      <span className="text-xs text-slate-400">{item.detail}</span>
                    </div>
                  </div>
                ))}
              </div>
              <button 
                onClick={() => !isGuest && setIsActivityLogOpen(true)}
                disabled={isGuest}
                className={`mt-4 text-xs font-bold uppercase tracking-widest text-center ${isGuest ? 'text-slate-600 cursor-not-allowed' : 'text-primary hover:underline'}`}
              >
                View Full Activity Log
              </button>
            </div>
          </div>
        </div>
      </main>

      <AnimatePresence>
        {isActivityLogOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsActivityLogOpen(false)}
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
                "relative w-full max-w-2xl rounded-3xl p-8 shadow-2xl overflow-hidden border-2",
                highContrast 
                  ? "bg-black border-white text-white" 
                  : "glass-panel border-primary/20 bg-background-dark"
              )}
            >
              <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-black uppercase tracking-tight">Strategic Activity Log</h2>
                  <button 
                    onClick={() => setIsActivityLogOpen(false)}
                    className={cn(
                      "p-2 rounded-lg transition-colors",
                      highContrast ? "hover:bg-white hover:text-black" : "hover:bg-white/10"
                    )}
                  >
                    <Lock className="w-5 h-5 rotate-45" />
                  </button>
                </div>

                <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                  {[
                    { action: 'Policy Enacted', detail: 'Sustainable Energy Transition Act', time: '2h ago', status: 'success', actor: 'Commander Liu' },
                    { action: 'Trade Agreement', detail: 'Nordic Council Mineral Exchange', time: '5h ago', status: 'success', actor: 'System' },
                    { action: 'Crisis Managed', detail: 'Cyber Intrusion Sector 4', time: '12h ago', status: 'warning', actor: 'Security AI' },
                    { action: 'Budget Allocated', detail: 'R&D Infrastructure Expansion', time: '1d ago', status: 'success', actor: 'Commander Liu' },
                    { action: 'Diplomatic Note', detail: 'Response to G7 Summit Invitation', time: '1d ago', status: 'success', actor: 'Foreign Affairs' },
                    { action: 'Asset Deployed', detail: 'Satellite Array Gamma-9', time: '2d ago', status: 'success', actor: 'Command Center' },
                    { action: 'Intelligence Archive', detail: 'Encrypted Signal SIG-X9', time: '2d ago', status: 'success', actor: 'Intel Module' },
                    { action: 'Market Shock', detail: 'Global Tech Stock Volatility', time: '3d ago', status: 'danger', actor: 'System' }
                  ].map((item, i) => (
                    <div key={i} className={cn(
                      "p-4 rounded-xl border-2 flex flex-col gap-2",
                      highContrast ? "border-white" : "bg-primary/5 border-primary/10"
                    )}>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <div className={cn(
                            "size-2 rounded-full",
                            item.status === 'success' ? 'bg-emerald-500' : item.status === 'warning' ? 'bg-amber-500' : 'bg-red-500'
                          )} />
                          <span className="text-sm font-bold uppercase tracking-widest">{item.action}</span>
                        </div>
                        <span className="text-[10px] font-medium opacity-60">{item.time}</span>
                      </div>
                      <p className="text-xs opacity-80">{item.detail}</p>
                      <div className="flex items-center justify-between mt-2 pt-2 border-t border-current border-opacity-10">
                        <span className="text-[10px] font-bold uppercase tracking-tighter opacity-50">Authorized by</span>
                        <span className="text-[10px] font-bold text-primary">{item.actor}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <button 
                  onClick={() => setIsActivityLogOpen(false)}
                  className={cn(
                    "w-full py-4 rounded-xl font-black uppercase tracking-widest transition-all text-xs border-2",
                    highContrast 
                      ? "bg-white text-black border-white hover:bg-black hover:text-white" 
                      : "bg-primary text-background-dark border-primary shadow-primary/20 hover:brightness-110"
                  )}
                >
                  Close Log
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
