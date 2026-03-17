import React, { useState, useEffect } from 'react';
import { LandingPage } from './components/LandingPage';
import { LoginPage } from './components/LoginPage';
import { Dashboard } from './components/Dashboard';
import { DiplomacyChamber } from './components/DiplomacyChamber';
import { Forum } from './components/Forum';
import { PolicyProposal } from './components/PolicyProposal';
import { Analytics } from './components/Analytics';
import { MapSelection } from './components/MapSelection';
import { CommandCenter } from './components/CommandCenter';
import { NetworkView } from './components/NetworkView';
import { Intel } from './components/Intel';
import { Assets } from './components/Assets';
import { Diplomacy } from './components/Diplomacy';
import { Settings } from './components/Settings';
import { ScenarioMarket } from './components/ScenarioMarket';
import { VerifyEmail } from './components/VerifyEmail';
import { ResetPassword } from './components/ResetPassword';
import { PaymentPage } from './components/PaymentPage';
import { AdminDashboard } from './components/AdminDashboard';
import { 
  LayoutDashboard, Globe, MessageSquare, 
  FileText, BarChart3, Map as MapIcon, 
  Share2, Shield, LogOut, Menu, X,
  Eye, Package, Handshake
} from 'lucide-react';

import { LanguageProvider, useLanguage } from './contexts/LanguageContext';

type View = 
  | 'landing' 
  | 'login' 
  | 'signup'
  | 'verify-pending'
  | 'forgot-password'
  | 'reset-password'
  | 'map-selection'
  | 'dashboard' 
  | 'diplomacy-chamber' 
  | 'forum' 
  | 'policy-proposal' 
  | 'analytics' 
  | 'command-center' 
  | 'network-view'
  | 'intel'
  | 'assets'
  | 'diplomacy'
  | 'settings'
  | 'scenario-market'
  | 'payment'
  | 'admin';

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

function AppContent() {
  const { t } = useLanguage();
  const [currentView, setCurrentView] = useState<View>('landing');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isPremium, setIsPremium] = useState(false);
  const [isGuest, setIsGuest] = useState(false);
  const [user, setUser] = useState<{ id: number; username: string; email: string; isAdmin?: boolean; isPremium?: boolean } | null>(null);
  const [purchasedScenarios, setPurchasedScenarios] = useState<string[]>([]);
  const [pendingEmail, setPendingEmail] = useState<string>('');
  const [itemToPurchase, setItemToPurchase] = useState<{ id: string; title: string; price: string; type: 'scenario' | 'premium' } | null>(null);
  const [activeScenario, setActiveScenario] = useState<string>('current-time');
  const [selectedCountry, setSelectedCountry] = useState<any>(null);
  const [countryData, setCountryData] = useState<any>(null);
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [highContrast, setHighContrast] = useState(false);

  useEffect(() => {
    const fetchCountryData = async () => {
      if (selectedCountry) {
        setIsDataLoading(true);
        try {
          const { getAuthenticCountryData } = await import('./services/databaseService');
          const data = await getAuthenticCountryData(selectedCountry.name);
          setCountryData(data);
        } catch (err) {
          console.error('Failed to fetch country data', err);
        } finally {
          setIsDataLoading(false);
        }
      }
    };
    fetchCountryData();
  }, [selectedCountry]);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('/api/auth/me');
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
          setIsPremium(data.user.isPremium);
          
          // Fetch purchases
          const pRes = await fetch('/api/users/purchases');
          if (pRes.ok) {
            const pData = await pRes.json();
            setPurchasedScenarios(pData.purchasedScenarios);
          }

          setCurrentView('dashboard');
        }
      } catch (err) {
        console.error('Auth check failed', err);
      }
    };
    checkAuth();
  }, []);

  const handleStart = () => setCurrentView('login');
  const handleLogin = (userData: any, guest: boolean = false) => {
    setIsGuest(guest);
    setUser(userData);
    setCurrentView('map-selection');
  };
  const handleScenarioSelect = (scenarioId: string, country: any) => {
    setActiveScenario(scenarioId);
    setSelectedCountry(country);
    setCurrentView('dashboard');
  };
  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      setUser(null);
      setIsGuest(false);
      setCurrentView('landing');
    } catch (err) {
      console.error('Logout failed', err);
    }
  };

  const togglePremium = () => {
    setItemToPurchase({
      id: 'premium-lifetime',
      title: 'Premium Commander Status',
      price: '$29.99',
      type: 'premium'
    });
    setCurrentView('payment');
  };

  const initiatePurchase = (scenario: any) => {
    setItemToPurchase({
      id: scenario.id,
      title: scenario.title,
      price: scenario.price,
      type: 'scenario'
    });
    setCurrentView('payment');
  };

  const handlePurchaseSuccess = (id: string, type: 'scenario' | 'premium') => {
    if (type === 'premium') {
      setIsPremium(true);
      if (user) setUser({ ...user, isPremium: true });
    } else {
      if (!purchasedScenarios.includes(id)) {
        setPurchasedScenarios([...purchasedScenarios, id]);
      }
    }
    setItemToPurchase(null);
  };

  const navItems = [
    { id: 'dashboard', label: t('nav.dashboard'), icon: <LayoutDashboard className="w-5 h-5" /> },
    { id: 'command-center', label: t('nav.command'), icon: <Globe className="w-5 h-5" /> },
    { id: 'intel', label: t('nav.intel'), icon: <Eye className="w-5 h-5" /> },
    { id: 'assets', label: t('nav.assets'), icon: <Package className="w-5 h-5" /> },
    { id: 'diplomacy', label: t('nav.diplomacy'), icon: <Handshake className="w-5 h-5" /> },
    { id: 'diplomacy-chamber', label: t('nav.chamber'), icon: <Shield className="w-5 h-5" /> },
    { id: 'network-view', label: t('nav.network'), icon: <Share2 className="w-5 h-5" /> },
    { id: 'forum', label: t('nav.forum'), icon: <MessageSquare className="w-5 h-5" /> },
    { id: 'policy-proposal', label: t('nav.policy'), icon: <FileText className="w-5 h-5" /> },
    { id: 'analytics', label: t('nav.analytics'), icon: <BarChart3 className="w-5 h-5" /> },
    { id: 'map-selection', label: t('nav.map'), icon: <MapIcon className="w-5 h-5" /> },
  ];

  const showSidebar = !['landing', 'login', 'signup', 'verify-pending', 'forgot-password', 'reset-password', 'map-selection'].includes(currentView);

  return (
    <div className="min-h-screen bg-background-dark text-slate-100 flex">
      {/* Sidebar Navigation */}
      {showSidebar && (
        <>
          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="lg:hidden fixed bottom-6 right-6 z-[100] size-14 rounded-full bg-primary text-background-dark shadow-2xl flex items-center justify-center"
          >
            {isSidebarOpen ? <X /> : <Menu />}
          </button>

          <aside className={`
            fixed inset-y-0 left-0 z-[90] w-64 bg-background-deep border-r border-primary/10 flex flex-col transition-transform duration-300
            ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          `}>
            <div className="p-6 flex items-center gap-3 text-primary border-b border-primary/10">
              <Globe className="w-8 h-8" />
              <div className="flex flex-col">
                <span className="text-slate-100 font-bold text-xl tracking-tight">{t('app.title')}</span>
                <p className="text-primary text-[10px] font-black uppercase tracking-[0.2em] leading-none">Plan.Negotiate.Evolve.</p>
              </div>
            </div>
            
            <nav className="flex-1 py-6 px-4 space-y-2 overflow-y-auto">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setCurrentView(item.id as View);
                    setIsSidebarOpen(false);
                  }}
                  className={`
                    w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all
                    ${currentView === item.id 
                      ? 'bg-primary text-background-dark shadow-lg shadow-primary/20' 
                      : 'text-slate-400 hover:text-primary hover:bg-primary/5'}
                  `}
                >
                  {item.icon}
                  {item.label}
                </button>
              ))}
            </nav>

            <div className="p-4 border-t border-primary/10">
              <button 
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-red-400 hover:bg-red-400/10 transition-all"
              >
                <LogOut className="w-5 h-5" />
                {t('nav.logout')}
              </button>
            </div>
          </aside>
        </>
      )}

      {/* Main Content Area */}
      <div className={`flex-1 flex flex-col ${showSidebar ? 'lg:ml-64' : ''}`}>
        {currentView === 'landing' && (
          <LandingPage 
            onStart={handleStart} 
            onLogin={() => setCurrentView('login')} 
            onGuestEntry={() => handleLogin(null, true)}
          />
        )}
        {currentView === 'login' && (
          <LoginPage 
            onLogin={handleLogin} 
            onViewChange={setCurrentView} 
            setPendingEmail={setPendingEmail}
          />
        )}
        {currentView === 'signup' && (
          <LoginPage 
            mode="signup"
            onLogin={handleLogin} 
            onViewChange={setCurrentView} 
            setPendingEmail={setPendingEmail}
          />
        )}
        {currentView === 'forgot-password' && (
          <LoginPage 
            mode="forgot"
            onLogin={handleLogin} 
            onViewChange={setCurrentView} 
            setPendingEmail={setPendingEmail}
          />
        )}
        {currentView === 'verify-pending' && (
          <VerifyEmail 
            email={pendingEmail} 
            onViewChange={setCurrentView} 
          />
        )}
        {currentView === 'reset-password' && (
          <ResetPassword 
            onViewChange={setCurrentView} 
          />
        )}
        {currentView === 'map-selection' && (
          <MapSelection 
            onSelect={handleScenarioSelect} 
            onViewChange={setCurrentView}
            purchasedScenarios={purchasedScenarios}
            isGuest={isGuest}
          />
        )}
        {currentView === 'dashboard' && (
          <Dashboard 
            onViewChange={setCurrentView} 
            isGuest={isGuest} 
            user={user} 
            onLogout={handleLogout}
            activeScenario={activeScenario}
            selectedCountry={selectedCountry}
            countryData={countryData}
            isDataLoading={isDataLoading}
            highContrast={highContrast}
          />
        )}
        {currentView === 'diplomacy-chamber' && <DiplomacyChamber onViewChange={setCurrentView} isGuest={isGuest} user={user} onLogout={handleLogout} />}
        {currentView === 'forum' && <Forum onViewChange={setCurrentView} isGuest={isGuest} user={user} onLogout={handleLogout} />}
        {currentView === 'policy-proposal' && <PolicyProposal onViewChange={setCurrentView} isGuest={isGuest} user={user} onLogout={handleLogout} />}
        {currentView === 'analytics' && <Analytics onViewChange={setCurrentView} isPremium={isPremium} isGuest={isGuest} user={user} onLogout={handleLogout} highContrast={highContrast} />}
        {currentView === 'command-center' && <CommandCenter onViewChange={setCurrentView} isGuest={isGuest} user={user} onLogout={handleLogout} />}
        {currentView === 'network-view' && <NetworkView onViewChange={setCurrentView} isGuest={isGuest} user={user} onLogout={handleLogout} />}
        {currentView === 'intel' && <Intel onViewChange={setCurrentView} isGuest={isGuest} user={user} onLogout={handleLogout} countryData={countryData} isDataLoading={isDataLoading} highContrast={highContrast} />}
        {currentView === 'assets' && <Assets onViewChange={setCurrentView} isGuest={isGuest} user={user} onLogout={handleLogout} countryData={countryData} isDataLoading={isDataLoading} />}
        {currentView === 'diplomacy' && <Diplomacy onViewChange={setCurrentView} isPremium={isPremium} isGuest={isGuest} user={user} onLogout={handleLogout} />}
        {currentView === 'settings' && (
          <Settings 
            onViewChange={setCurrentView} 
            isPremium={isPremium} 
            onTogglePremium={togglePremium} 
            isGuest={isGuest}
            purchasedScenarios={purchasedScenarios}
            user={user}
            onLogout={handleLogout}
            highContrast={highContrast}
            setHighContrast={setHighContrast}
          />
        )}
        {currentView === 'scenario-market' && (
          <ScenarioMarket 
            onViewChange={setCurrentView} 
            purchasedScenarios={purchasedScenarios} 
            onPurchase={(id) => {
              // This is now handled by initiatePurchase but we keep the prop for compatibility
              // or we can just pass initiatePurchase directly
            }}
            onInitiatePurchase={initiatePurchase}
            isGuest={isGuest}
            user={user}
            onLogout={handleLogout}
          />
        )}
        {currentView === 'payment' && (
          <PaymentPage 
            onViewChange={setCurrentView}
            user={user}
            onLogout={handleLogout}
            itemToPurchase={itemToPurchase}
            onPurchaseSuccess={handlePurchaseSuccess}
          />
        )}
        {currentView === 'admin' && (
          <AdminDashboard 
            onViewChange={setCurrentView}
            user={user}
            onLogout={handleLogout}
          />
        )}
      </div>
    </div>
  );
}
