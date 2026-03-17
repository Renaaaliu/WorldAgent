import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { StrategicHeader } from './StrategicHeader';
import { 
  Users, Shield, BarChart3, TrendingUp, 
  Settings, Search, Filter, MoreVertical,
  CheckCircle2, XCircle, AlertCircle, 
  Crown, UserPlus, DollarSign, Activity,
  RefreshCw, Loader2, Zap, Globe
} from 'lucide-react';
import { cn } from '../lib/utils';

interface AdminDashboardProps {
  onViewChange: (view: any) => void;
  user: any;
  onLogout: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ 
  onViewChange, 
  user, 
  onLogout 
}) => {
  const [stats, setStats] = useState<any>(null);
  const [users, setUsers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'revenue'>('overview');

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [statsRes, usersRes] = await Promise.all([
        fetch('/api/admin/stats'),
        fetch('/api/admin/users')
      ]);

      if (statsRes.ok && usersRes.ok) {
        const statsData = await statsRes.json();
        const usersData = await usersRes.json();
        setStats(statsData);
        setUsers(usersData.users);
      }
    } catch (err) {
      console.error('Admin fetch error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const toggleAdmin = async (userId: number) => {
    try {
      const res = await fetch(`/api/admin/users/${userId}/toggle-admin`, { method: 'POST' });
      if (res.ok) {
        fetchData();
      }
    } catch (err) {
      console.error('Toggle admin error:', err);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-background-deep">
        <StrategicHeader currentView="admin" onViewChange={onViewChange} user={user} onLogout={onLogout} />
        <main className="flex-1 flex items-center justify-center">
          <Loader2 className="w-12 h-12 text-primary animate-spin" />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background-deep">
      <StrategicHeader currentView="admin" onViewChange={onViewChange} user={user} onLogout={onLogout} />

      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
          <div>
            <h1 className="text-4xl font-black text-white tracking-tight flex items-center gap-4">
              <Shield className="w-10 h-10 text-primary" />
              Strategic Command Center
            </h1>
            <p className="text-slate-400 mt-2">Administrator Oversight & System Control</p>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={fetchData}
              className="p-3 bg-white/5 border border-white/10 rounded-xl text-slate-400 hover:text-primary hover:bg-white/10 transition-all"
            >
              <RefreshCw className="w-5 h-5" />
            </button>
            <div className="px-4 py-2 bg-primary/10 border border-primary/20 rounded-xl flex items-center gap-2 text-primary text-sm font-bold">
              <Activity className="w-4 h-4 animate-pulse" />
              SYSTEM OPERATIONAL
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 border-b border-white/10 mb-8">
          {[
            { id: 'overview', label: 'Overview', icon: <BarChart3 className="w-4 h-4" /> },
            { id: 'users', label: 'User Management', icon: <Users className="w-4 h-4" /> },
            { id: 'revenue', label: 'Revenue & Purchases', icon: <DollarSign className="w-4 h-4" /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={cn(
                "flex items-center gap-2 px-6 py-4 text-sm font-bold transition-all relative",
                activeTab === tab.id ? "text-primary" : "text-slate-400 hover:text-white"
              )}
            >
              {tab.icon}
              {tab.label}
              {activeTab === tab.id && (
                <motion.div 
                  layoutId="admin-tab"
                  className="absolute bottom-0 left-0 right-0 h-1 bg-primary"
                />
              )}
            </button>
          ))}
        </div>

        {activeTab === 'overview' && stats && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-blue-500/20 text-blue-500 rounded-xl">
                    <Users className="w-6 h-6" />
                  </div>
                  <TrendingUp className="w-4 h-4 text-emerald-500" />
                </div>
                <h3 className="text-slate-400 text-sm font-bold uppercase tracking-wider">Total Commanders</h3>
                <div className="text-3xl font-black text-white mt-1">{stats.stats.totalUsers}</div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-primary/20 text-primary rounded-xl">
                    <Crown className="w-6 h-6" />
                  </div>
                  <TrendingUp className="w-4 h-4 text-emerald-500" />
                </div>
                <h3 className="text-slate-400 text-sm font-bold uppercase tracking-wider">Premium Assets</h3>
                <div className="text-3xl font-black text-white mt-1">{stats.stats.totalPremium}</div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-emerald-500/20 text-emerald-500 rounded-xl">
                    <DollarSign className="w-6 h-6" />
                  </div>
                  <TrendingUp className="w-4 h-4 text-emerald-500" />
                </div>
                <h3 className="text-slate-400 text-sm font-bold uppercase tracking-wider">Strategic Revenue</h3>
                <div className="text-3xl font-black text-white mt-1">${stats.stats.totalRevenue.toFixed(2)}</div>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-white mb-6">Recent Deployments</h3>
                <div className="space-y-4">
                  {stats.recentPurchases.map((p: any) => (
                    <div key={p.id} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                          {p.item_type === 'premium' ? <Zap className="w-5 h-5" /> : <Globe className="w-5 h-5" />}
                        </div>
                        <div>
                          <div className="font-bold text-white">{p.username}</div>
                          <div className="text-xs text-slate-500">{p.item_id} • {new Date(p.created_at).toLocaleDateString()}</div>
                        </div>
                      </div>
                      <div className="font-black text-primary">{p.amount}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-white mb-6">System Health</h3>
                <div className="space-y-6">
                  {[
                    { label: 'Database Integrity', status: 'Operational', color: 'text-emerald-500' },
                    { label: 'Authentication Server', status: 'Optimal', color: 'text-emerald-500' },
                    { label: 'Payment Gateway', status: 'Active', color: 'text-emerald-500' },
                    { label: 'AI Inference Engine', status: 'Standby', color: 'text-blue-500' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <span className="text-slate-400">{item.label}</span>
                      <span className={cn("font-bold", item.color)}>{item.status}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
            <div className="p-6 border-b border-white/10 flex flex-col md:flex-row justify-between gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input 
                  type="text"
                  placeholder="Search commanders..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-2 text-white outline-none focus:border-primary transition-all"
                />
              </div>
              <div className="flex gap-3">
                <button className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-slate-400 hover:text-white transition-all">
                  <Filter className="w-4 h-4" />
                  Filter
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-primary text-background-dark rounded-xl font-bold hover:scale-105 transition-all">
                  <UserPlus className="w-4 h-4" />
                  Add User
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-white/5 text-slate-400 text-xs font-bold uppercase tracking-wider">
                    <th className="px-6 py-4">Commander</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Rank</th>
                    <th className="px-6 py-4">Joined</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {users.map((u) => (
                    <tr key={u.id} className="hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                            {u.username[0].toUpperCase()}
                          </div>
                          <div>
                            <div className="font-bold text-white">{u.username}</div>
                            <div className="text-xs text-slate-500">{u.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {u.is_verified ? (
                          <div className="flex items-center gap-2 text-emerald-500 text-xs font-bold">
                            <CheckCircle2 className="w-3 h-3" />
                            VERIFIED
                          </div>
                        ) : (
                          <div className="flex items-center gap-2 text-amber-500 text-xs font-bold">
                            <AlertCircle className="w-3 h-3" />
                            PENDING
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          {u.is_admin ? (
                            <span className="px-2 py-1 bg-primary/20 text-primary text-[10px] font-black rounded uppercase">Admin</span>
                          ) : (
                            <span className="px-2 py-1 bg-slate-500/20 text-slate-400 text-[10px] font-black rounded uppercase">User</span>
                          )}
                          {u.is_premium && (
                            <span className="px-2 py-1 bg-amber-500/20 text-amber-500 text-[10px] font-black rounded uppercase">Premium</span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-slate-400 text-sm">
                        {new Date(u.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button 
                            onClick={() => toggleAdmin(u.id)}
                            className="p-2 text-slate-400 hover:text-primary transition-colors"
                            title="Toggle Admin"
                          >
                            <Shield className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-slate-400 hover:text-red-400 transition-colors">
                            <XCircle className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'revenue' && (
          <div className="space-y-8">
             <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center">
                <DollarSign className="w-16 h-16 text-primary mx-auto opacity-50 mb-4" />
                <h2 className="text-2xl font-bold text-white">Revenue Analytics Coming Soon</h2>
                <p className="text-slate-400 max-w-md mx-auto mt-2">
                  Advanced revenue forecasting and detailed purchase history visualization is currently under development.
                </p>
             </div>
          </div>
        )}
      </main>
    </div>
  );
};
