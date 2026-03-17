import React from 'react';
import { motion } from 'motion/react';
import { StrategicHeader } from './StrategicHeader';
import { 
  Zap, Clock, Globe, Shield, 
  ArrowRight, ShoppingCart, Check,
  History, Rocket, AlertTriangle,
  Lock
} from 'lucide-react';
import { cn } from '../lib/utils';
import { GenImage } from './GenImage';

interface Scenario {
  id: string;
  title: string;
  type: 'historical' | 'future' | 'alternate';
  description: string;
  price: string;
  difficulty: 'Beginner' | 'Advanced' | 'Expert';
  image: string;
  prompt: string;
  icon: React.ReactNode;
}

const scenarios: Scenario[] = [
  {
    id: 'current-time',
    title: 'Current Time: Global Conquest',
    type: 'alternate',
    description: 'The standard modern geopolitical landscape. Navigate the complexities of the 21st century.',
    price: 'FREE',
    difficulty: 'Beginner',
    image: '',
    prompt: 'Futuristic world map with glowing data nodes and geopolitical boundaries, dark slate aesthetic',
    icon: <Globe className="w-5 h-5" />
  },
  {
    id: 'cold-war-62',
    title: 'Cuban Missile Crisis 1962',
    type: 'historical',
    description: 'The world stands on the brink of nuclear war. Navigate the intense diplomacy between the US and USSR.',
    price: '$4.99',
    difficulty: 'Expert',
    image: '',
    prompt: 'Vintage 1960s war room, large world map, military officers, intense atmosphere, cinematic lighting',
    icon: <History className="w-5 h-5" />
  },
  {
    id: 'climate-2050',
    title: 'Climate Collapse 2050',
    type: 'future',
    description: 'Rising sea levels and resource scarcity have redrawn the map. Lead your nation through the Great Migration.',
    price: '$5.99',
    difficulty: 'Advanced',
    image: '',
    prompt: 'Futuristic flooded city, skyscrapers rising from water, dramatic orange sunset, climate change apocalypse',
    icon: <AlertTriangle className="w-5 h-5" />
  },
  {
    id: 'mars-2100',
    title: 'Mars Colonization 2100',
    type: 'future',
    description: 'The first independent Martian republic has been declared. Manage the complex relations between Earth and the Red Planet.',
    price: '$7.99',
    difficulty: 'Expert',
    image: '',
    prompt: 'Futuristic Mars colony with glass domes, red landscape, Earth visible in sky, high tech architecture',
    icon: <Rocket className="w-5 h-5" />
  },
  {
    id: 'ww2-alternate',
    title: 'Alternate WWII: Pacific Front',
    type: 'alternate',
    description: 'What if the Midway battle had a different outcome? Explore a world where the Pacific theater took a darker turn.',
    price: '$4.99',
    difficulty: 'Advanced',
    image: '',
    prompt: 'Alternate history WWII naval battle, futuristic aircraft carriers, dramatic smoke and fire, cinematic war scene',
    icon: <History className="w-5 h-5" />
  }
];

interface ScenarioMarketProps {
  onViewChange: (view: any) => void;
  purchasedScenarios: string[];
  onPurchase: (id: string) => void;
  onInitiatePurchase?: (scenario: any) => void;
  isGuest?: boolean;
  user?: any;
  onLogout?: () => void;
}

export const ScenarioMarket: React.FC<ScenarioMarketProps> = ({ 
  onViewChange, 
  purchasedScenarios, 
  onPurchase,
  onInitiatePurchase,
  isGuest = false,
  user,
  onLogout
}) => {
  return (
    <div className="min-h-screen flex flex-col bg-background-deep">
      <StrategicHeader 
        currentView="scenario-market" 
        onViewChange={onViewChange} 
        user={user}
        onLogout={onLogout}
      />

      <main className="flex-1 px-6 lg:px-40 py-10 max-w-7xl mx-auto w-full">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6">
            <div className="flex flex-col gap-2">
              <h1 className="text-4xl font-black leading-tight tracking-tight text-white flex items-center gap-4">
                <Zap className="w-10 h-10 text-primary" />
                Scenario Market
              </h1>
              <p className="text-slate-400 text-lg max-w-2xl">
                Expand your strategic horizon with specialized geopolitical packs. Historical turning points and future projections.
              </p>
            </div>
            <button 
              onClick={() => onViewChange('map-selection')}
              className="flex items-center gap-2 px-8 py-4 rounded-2xl bg-slate-800 border-2 border-slate-700 text-slate-300 font-black text-sm uppercase tracking-[0.2em] hover:bg-slate-700 transition-all group"
            >
              Continue to Free Scenario
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {isGuest && (
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center gap-4">
              <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />
              <p className="text-sm text-amber-200 font-medium">
                Guest Access: You can browse scenarios, but purchases require a permanent Command Profile. 
                <button onClick={() => onViewChange('login')} className="ml-2 text-primary hover:underline">Register Now</button>
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {scenarios.map((scenario) => {
              const isPurchased = purchasedScenarios.includes(scenario.id);
              
              return (
                <motion.div 
                  key={scenario.id}
                  whileHover={{ y: -5 }}
                  className="glass-panel rounded-2xl border-primary/10 overflow-hidden flex flex-col"
                >
                  <div className="h-48 w-full relative">
                    <GenImage 
                      prompt={scenario.prompt} 
                      alt={scenario.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background-deep via-transparent to-transparent" />
                    <div className="absolute top-4 left-4 flex gap-2">
                      <span className={cn(
                        "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border",
                        scenario.type === 'historical' ? "bg-blue-500/20 border-blue-500/30 text-blue-400" :
                        scenario.type === 'future' ? "bg-purple-500/20 border-purple-500/30 text-purple-400" :
                        "bg-amber-500/20 border-amber-500/30 text-amber-400"
                      )}>
                        {scenario.type}
                      </span>
                      <span className="px-3 py-1 rounded-full bg-slate-900/80 border border-white/10 text-[10px] font-black uppercase tracking-widest text-slate-300">
                        {scenario.difficulty}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 flex flex-col gap-4 flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-bold text-white">{scenario.title}</h3>
                      <div className="text-primary">{scenario.icon}</div>
                    </div>
                    <p className="text-sm text-slate-400 leading-relaxed flex-1">
                      {scenario.description}
                    </p>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-primary/5">
                      <div className="flex flex-col">
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Price</span>
                        <span className="text-lg font-black text-white">{isPurchased ? 'OWNED' : scenario.price}</span>
                      </div>
                      
                      {isPurchased || scenario.price === 'FREE' ? (
                        <button 
                          onClick={() => onViewChange('map-selection')}
                          className="flex items-center gap-2 bg-emerald-500/10 text-emerald-500 px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-widest border border-emerald-500/20 hover:bg-emerald-500/20 transition-all"
                        >
                          <Check className="w-4 h-4" />
                          {scenario.price === 'FREE' ? 'Select Free' : 'Initialize'}
                        </button>
                      ) : (
                        <button 
                          onClick={() => {
                            if (!isGuest && onInitiatePurchase) {
                              onInitiatePurchase(scenario);
                            }
                          }}
                          disabled={isGuest}
                          className={cn(
                            "flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-widest transition-all shadow-lg",
                            isGuest 
                              ? "bg-slate-800 text-slate-500 cursor-not-allowed" 
                              : "bg-primary text-background-dark hover:scale-105 shadow-primary/20"
                          )}
                        >
                          {isGuest ? <Lock className="w-4 h-4" /> : <ShoppingCart className="w-4 h-4" />}
                          {isGuest ? 'Login to Buy' : 'Purchase Pack'}
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="glass-panel p-8 rounded-2xl border-primary/10 bg-primary/5 flex flex-col md:flex-row items-center gap-8">
            <div className="size-20 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20 shrink-0">
              <Globe className="w-10 h-10 text-primary" />
            </div>
            <div className="flex flex-col gap-2 text-center md:text-left">
              <h3 className="text-xl font-bold text-white">Custom Scenario Editor</h3>
              <p className="text-sm text-slate-400">
                Want to create your own geopolitical challenges? Our Scenario Editor is currently in development for Level 50+ Commanders.
              </p>
            </div>
            <button className="md:ml-auto px-8 py-4 rounded-xl bg-slate-800 border border-slate-700 text-slate-300 font-bold text-sm hover:bg-slate-700 transition-all">
              Join Waitlist
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};
