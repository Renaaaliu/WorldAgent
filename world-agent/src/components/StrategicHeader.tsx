import React, { useState, useRef, useEffect } from 'react';
import { Globe, Search, Bell, User, Settings, LogOut, Shield, Zap } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { GenImage } from './GenImage';
import { useLanguage } from '../contexts/LanguageContext';

interface StrategicHeaderProps {
  currentView: string;
  onViewChange: (view: any) => void;
  user?: { username: string; isAdmin?: boolean } | null;
  onLogout?: () => void;
}

export const StrategicHeader: React.FC<StrategicHeaderProps> = ({ currentView, onViewChange, user, onLogout }) => {
  const { t } = useLanguage();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setShowProfile(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navItems = [
    { id: 'dashboard', label: t('nav.feed') },
    { id: 'intel', label: t('nav.intel') },
    { id: 'assets', label: t('nav.assets') },
    { id: 'diplomacy', label: t('nav.diplomacy') },
  ];

  const notifications = [
    { id: 1, title: t('header.notifications.report'), desc: t('header.notifications.report.desc'), time: t('header.notifications.time.2m'), icon: <Zap className="w-4 h-4 text-amber-500" /> },
    { id: 2, title: t('header.notifications.alert'), desc: t('header.notifications.alert.desc'), time: t('header.notifications.time.15m'), icon: <Globe className="w-4 h-4 text-primary" /> },
    { id: 3, title: t('header.notifications.breach'), desc: t('header.notifications.breach.desc'), time: t('header.notifications.time.1h'), icon: <Shield className="w-4 h-4 text-red-500" /> },
  ];

  return (
    <header className="flex items-center justify-between border-b border-primary/20 px-6 lg:px-20 py-4 bg-background-dark/80 backdrop-blur-md sticky top-0 z-50 gap-8">
      <div className="flex items-center gap-8 shrink-0">
        <div className="flex items-center gap-3 text-primary">
          <Globe className="w-8 h-8" />
          <div className="flex flex-col">
            <h2 className="text-slate-100 text-xl font-bold leading-tight tracking-tight">{t('app.title')}</h2>
            <p className="text-primary text-[10px] font-black uppercase tracking-[0.3em] leading-none">Plan.Negotiate.Evolve.</p>
          </div>
        </div>
        <nav className="hidden xl:flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={cn(
                "text-sm font-semibold transition-all pb-1 border-b-2 whitespace-nowrap",
                currentView === item.id 
                  ? "text-primary border-primary" 
                  : "text-slate-400 border-transparent hover:text-primary"
              )}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>
      <div className="flex items-center gap-6 justify-end">
        <div className="hidden lg:flex items-center rounded-lg h-10 bg-primary/10 border border-primary/20 px-3 min-w-[200px]">
          <Search className="w-4 h-4 text-primary/60 mr-2" />
          <input className="bg-transparent border-none focus:ring-0 text-white text-sm placeholder:text-primary/40 w-full outline-none" placeholder={t('header.search')} />
        </div>
        
        <div className="flex gap-3 relative">
          {/* Notifications */}
          <div className="relative" ref={notificationRef}>
            <button 
              onClick={() => {
                setShowNotifications(!showNotifications);
                setShowProfile(false);
              }}
              className={cn(
                "flex items-center justify-center rounded-xl size-11 border transition-all",
                showNotifications 
                  ? "bg-primary text-background-dark border-primary shadow-lg shadow-primary/20" 
                  : "bg-slate-800/40 text-primary border-slate-700 hover:border-primary/30"
              )}
            >
              <Bell className="w-5 h-5" />
              <div className="absolute top-2.5 right-2.5 size-2 bg-red-500 rounded-full border border-background-dark" />
            </button>

            <AnimatePresence>
              {showNotifications && (
                <motion.div 
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 mt-3 w-80 bg-background-deep border border-primary/20 rounded-2xl shadow-2xl overflow-hidden z-[100]"
                >
                  <div className="p-4 border-b border-primary/10 bg-primary/5 flex justify-between items-center">
                    <h3 className="font-bold text-white text-sm">{t('header.notifications')}</h3>
                    <span className="text-[10px] text-primary font-bold uppercase tracking-widest">{t('header.notifications.new').replace('{count}', '3')}</span>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.map((n) => (
                      <button key={n.id} className="w-full p-4 flex gap-3 hover:bg-white/5 transition-colors text-left border-b border-primary/5 last:border-0">
                        <div className="size-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                          {n.icon}
                        </div>
                        <div className="flex flex-col gap-0.5">
                          <span className="text-sm font-bold text-slate-100">{n.title}</span>
                          <span className="text-xs text-slate-400 line-clamp-1">{n.desc}</span>
                          <span className="text-[10px] text-slate-500 mt-1">{n.time}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                  <button className="w-full p-3 text-xs font-bold text-primary hover:bg-primary/5 transition-colors border-t border-primary/10">
                    {t('header.viewAll')}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Profile/User */}
          <div className="relative" ref={profileRef}>
            <button 
              onClick={() => {
                setShowProfile(!showProfile);
                setShowNotifications(false);
              }}
              className={cn(
                "flex items-center justify-center rounded-xl size-11 border transition-all",
                showProfile 
                  ? "bg-primary text-background-dark border-primary shadow-lg shadow-primary/20" 
                  : "bg-slate-800/40 text-primary border-slate-700 hover:border-primary/30"
              )}
            >
              <User className="w-5 h-5" />
            </button>

            <AnimatePresence>
              {showProfile && (
                <motion.div 
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 mt-3 w-64 bg-background-deep border border-primary/20 rounded-2xl shadow-2xl overflow-hidden z-[100]"
                >
                  <div className="p-4 border-b border-primary/10 bg-primary/5 flex items-center gap-3">
                    <div className="size-10 rounded-full border-2 border-primary/30 overflow-hidden">
                      <GenImage prompt="Professional male military commander portrait, futuristic uniform, cinematic lighting" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-white">{user?.username || 'Commander Liu'}</span>
                      <span className="text-[10px] text-slate-500 uppercase font-bold">{user ? t('header.verified') : t('header.guest')}</span>
                    </div>
                  </div>
                  <div className="p-2">
                    <button 
                      onClick={() => {
                        onViewChange('settings');
                        setShowProfile(false);
                      }}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold text-slate-300 hover:text-primary hover:bg-primary/5 transition-all"
                    >
                      <Settings className="w-4 h-4" />
                      {t('header.settings')}
                    </button>
                    <button 
                      onClick={() => {
                        onViewChange('settings');
                        setShowProfile(false);
                      }}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold text-slate-300 hover:text-primary hover:bg-primary/5 transition-all"
                    >
                      <Shield className="w-4 h-4" />
                      {t('header.security')}
                    </button>
                    {user?.isAdmin && (
                      <button 
                        onClick={() => {
                          onViewChange('admin');
                          setShowProfile(false);
                        }}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold text-primary hover:bg-primary/10 transition-all"
                      >
                        <Shield className="w-4 h-4" />
                        {t('header.admin')}
                      </button>
                    )}
                    <div className="h-[1px] bg-primary/10 my-2 mx-2" />
                    <button 
                      onClick={() => {
                        if (onLogout) onLogout();
                        else onViewChange('landing');
                        setShowProfile(false);
                      }}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold text-red-400 hover:bg-red-400/10 transition-all"
                    >
                      <LogOut className="w-4 h-4" />
                      {t('header.logout')}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="size-11 rounded-full border-2 border-primary/50 shadow-lg shadow-primary/20 overflow-hidden">
          <GenImage prompt="Professional male military commander portrait, futuristic uniform, cinematic lighting" className="w-full h-full object-cover" />
        </div>
      </div>
    </header>
  );
};
