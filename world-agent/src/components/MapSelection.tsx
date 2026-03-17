import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Globe, Search, Map as MapIcon, 
  ChevronRight, Info, Shield, Zap, TrendingUp,
  ArrowLeft, CheckCircle2
} from 'lucide-react';
import { cn } from '../lib/utils';
import { GenImage } from './GenImage';

const countries = [
  // North America
  { id: 'us', name: 'United States', region: 'North America', status: 'Stable', gdp: '$25.4T', pop: '331M', color: 'bg-blue-500', x: 20, y: 35 },
  { id: 'ca', name: 'Canada', region: 'North America', status: 'Stable', gdp: '$2.1T', pop: '38M', color: 'bg-red-600', x: 20, y: 20 },
  { id: 'mx', name: 'Mexico', region: 'North America', status: 'Stable', gdp: '$1.4T', pop: '128M', color: 'bg-green-600', x: 18, y: 45 },
  
  // South America
  { id: 'br', name: 'Brazil', region: 'South America', status: 'Stable', gdp: '$1.6T', pop: '214M', color: 'bg-green-500', x: 30, y: 70 },
  { id: 'ar', name: 'Argentina', region: 'South America', status: 'Stable', gdp: '$0.5T', pop: '45M', color: 'bg-blue-400', x: 28, y: 85 },
  { id: 'co', name: 'Colombia', region: 'South America', status: 'Stable', gdp: '$0.3T', pop: '51M', color: 'bg-yellow-500', x: 25, y: 60 },
  
  // Europe
  { id: 'de', name: 'Germany', region: 'Europe', status: 'Stable', gdp: '$4.2T', pop: '83M', color: 'bg-slate-900', x: 50, y: 30 },
  { id: 'fr', name: 'France', region: 'Europe', status: 'Stable', gdp: '$2.9T', pop: '67M', color: 'bg-blue-800', x: 48, y: 35 },
  { id: 'uk', name: 'United Kingdom', region: 'Europe', status: 'Stable', gdp: '$3.1T', pop: '67M', color: 'bg-indigo-900', x: 46, y: 28 },
  { id: 'it', name: 'Italy', region: 'Europe', status: 'Stable', gdp: '$2.1T', pop: '59M', color: 'bg-emerald-700', x: 51, y: 38 },
  { id: 'ru', name: 'Russia', region: 'Europe/Asia', status: 'Volatile', gdp: '$1.8T', pop: '144M', color: 'bg-red-800', x: 65, y: 25 },
  
  // Asia
  { id: 'cn', name: 'China', region: 'East Asia', status: 'Growing', gdp: '$18.3T', pop: '1.4B', color: 'bg-red-500', x: 75, y: 40 },
  { id: 'in', name: 'India', region: 'South Asia', status: 'Rapid Growth', gdp: '$3.4T', pop: '1.4B', color: 'bg-orange-500', x: 70, y: 55 },
  { id: 'jp', name: 'Japan', region: 'East Asia', status: 'Stable', gdp: '$4.9T', pop: '125M', color: 'bg-red-100', x: 85, y: 40 },
  { id: 'kr', name: 'South Korea', region: 'East Asia', status: 'Stable', gdp: '$1.8T', pop: '51M', color: 'bg-blue-700', x: 82, y: 42 },
  { id: 'id', name: 'Indonesia', region: 'Southeast Asia', status: 'Growing', gdp: '$1.3T', pop: '273M', color: 'bg-red-400', x: 80, y: 70 },
  { id: 'sa', name: 'Saudi Arabia', region: 'Middle East', status: 'Stable', gdp: '$1.1T', pop: '35M', color: 'bg-emerald-600', x: 58, y: 55 },
  { id: 'tr', name: 'Turkey', region: 'Middle East/Europe', status: 'Stable', gdp: '$0.9T', pop: '84M', color: 'bg-red-700', x: 56, y: 42 },
  
  // Africa
  { id: 'ng', name: 'Nigeria', region: 'Africa', status: 'Growing', gdp: '$0.5T', pop: '211M', color: 'bg-emerald-800', x: 50, y: 65 },
  { id: 'eg', name: 'Egypt', region: 'Africa', status: 'Stable', gdp: '$0.4T', pop: '109M', color: 'bg-amber-700', x: 55, y: 50 },
  { id: 'za', name: 'South Africa', region: 'Africa', status: 'Stable', gdp: '$0.4T', pop: '60M', color: 'bg-yellow-600', x: 55, y: 85 },
  
  // Oceania
  { id: 'au', name: 'Australia', region: 'Oceania', status: 'Stable', gdp: '$1.6T', pop: '26M', color: 'bg-blue-900', x: 85, y: 80 },
  { id: 'nz', name: 'New Zealand', region: 'Oceania', status: 'Stable', gdp: '$0.2T', pop: '5M', color: 'bg-slate-700', x: 90, y: 90 },
];

interface MapSelectionProps {
  onSelect: () => void;
  onViewChange: (view: any) => void;
  purchasedScenarios: string[];
  isGuest?: boolean;
}

const scenarioDetails: Record<string, { title: string; type: string; color: string }> = {
  'current-time': { title: 'Global Conquest', type: 'Modern', color: 'text-primary' },
  'cold-war-62': { title: 'Cuban Missile Crisis 1962', type: 'Historical', color: 'text-blue-400' },
  'climate-2050': { title: 'Climate Collapse 2050', type: 'Future', color: 'text-purple-400' },
  'mars-2100': { title: 'Mars Colonization 2100', type: 'Future', color: 'text-red-400' },
  'ww2-alternate': { title: 'Alternate WWII', type: 'Alternate', color: 'text-amber-400' },
};

export const MapSelection: React.FC<MapSelectionProps> = ({ onSelect, onViewChange, purchasedScenarios, isGuest }) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeScenario, setActiveScenario] = useState<string>('current-time');
  
  const filteredCountries = countries.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.region.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedCountry = countries.find(c => c.id === selectedId);

  return (
    <div className="min-h-screen flex flex-col bg-background-deep overflow-hidden">
      <header className="flex items-center justify-between border-b border-primary/20 px-6 lg:px-20 py-4 bg-background-dark/80 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => onViewChange('dashboard')}
            className="p-2 text-slate-400 hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-3 text-primary">
            <Globe className="w-8 h-8" />
            <h2 className="text-slate-100 text-xl font-bold leading-tight tracking-tight">World Agent</h2>
          </div>
        </div>
          <div className="flex items-center gap-6">
            <div className="flex flex-col items-end">
              <span className="text-[10px] text-slate-500 uppercase font-bold">Simulation Mode</span>
              <span className={cn(
                "text-sm font-bold",
                scenarioDetails[activeScenario]?.color
              )}>
                {scenarioDetails[activeScenario]?.title.toUpperCase()}
              </span>
            </div>
            <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border-2 border-primary/30 overflow-hidden">
              <GenImage prompt="Professional male military commander portrait, futuristic uniform, cinematic lighting" className="w-full h-full object-cover" />
            </div>
          </div>
      </header>

      <main className="flex-1 flex flex-col lg:flex-row relative">
        {/* Scenario Selector Overlay/Sidebar */}
        <div className="w-full lg:w-72 bg-background-deep border-r border-primary/10 p-6 flex flex-col gap-6 overflow-y-auto">
          <div className="flex flex-col gap-1">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Available Scenarios</h3>
            <p className="text-[10px] text-slate-600 leading-tight">Select the geopolitical timeline for this simulation.</p>
          </div>

          <div className="space-y-3">
            <button 
              onClick={() => setActiveScenario('current-time')}
              className={cn(
                "w-full p-4 rounded-xl border transition-all text-left flex flex-col gap-1",
                activeScenario === 'current-time' ? "bg-primary/10 border-primary/50 shadow-lg shadow-primary/10" : "bg-slate-800/40 border-slate-700 hover:border-primary/30"
              )}
            >
              <span className={cn("text-xs font-bold", activeScenario === 'current-time' ? "text-primary" : "text-slate-300")}>Global Conquest</span>
              <span className="text-[8px] text-slate-500 uppercase font-bold tracking-widest">Modern Era • Standard</span>
            </button>

            {purchasedScenarios.map((id) => (
              <button 
                key={id}
                onClick={() => setActiveScenario(id)}
                className={cn(
                  "w-full p-4 rounded-xl border transition-all text-left flex flex-col gap-1",
                  activeScenario === id ? "bg-primary/10 border-primary/50 shadow-lg shadow-primary/10" : "bg-slate-800/40 border-slate-700 hover:border-primary/30"
                )}
              >
                <span className={cn("text-xs font-bold", activeScenario === id ? "text-primary" : "text-slate-300")}>{scenarioDetails[id]?.title}</span>
                <span className="text-[8px] text-slate-500 uppercase font-bold tracking-widest">{scenarioDetails[id]?.type} • Purchased</span>
              </button>
            ))}

            <button 
              onClick={() => onViewChange('scenario-market')}
              className="w-full p-4 rounded-xl border border-dashed border-primary/20 bg-primary/5 hover:bg-primary/10 transition-all text-center flex flex-col items-center gap-2"
            >
              <Zap className="w-4 h-4 text-primary" />
              <span className="text-[10px] font-bold text-primary uppercase tracking-widest">Get More Scenarios</span>
            </button>
          </div>
        </div>
        {/* Map View */}
        <div className="flex-1 relative bg-slate-900 overflow-hidden">
          <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#20d3ee 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
          
          {/* Mock Map Visualization */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-[80%] aspect-[2/1] bg-slate-800/20 rounded-[40px] border border-primary/10 overflow-hidden">
               <GenImage 
                prompt="Futuristic world map with glowing data nodes and geopolitical boundaries, dark slate aesthetic" 
                className="w-full h-full object-cover opacity-40 grayscale" 
                alt="World Map"
              />
              {/* Interactive Markers */}
              {countries.map((c) => (
                <motion.button
                  key={c.id}
                  whileHover={isGuest ? {} : { scale: 1.2 }}
                  onClick={() => !isGuest && setSelectedId(c.id)}
                  className={`absolute size-4 rounded-full border-2 border-white/50 shadow-lg transition-all ${c.color} ${selectedId === c.id ? 'ring-4 ring-primary ring-offset-4 ring-offset-slate-900 scale-150 z-10' : 'opacity-60 hover:opacity-100'} ${isGuest ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                  style={{ 
                    top: `${c.y}%`, 
                    left: `${c.x}%` 
                  }}
                >
                  <div className={`absolute inset-0 rounded-full animate-ping bg-white/30 ${selectedId === c.id ? 'block' : 'hidden'}`} />
                </motion.button>
              ))}
            </div>
          </div>

          <div className="absolute bottom-8 left-8 flex flex-col gap-4">
            <div className="glass-panel p-4 rounded-xl border-primary/10 flex flex-col gap-2">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Map Controls</h3>
              <div className="flex gap-2">
                <button className="p-2 bg-slate-800 rounded-lg text-slate-400 hover:text-primary"><MapIcon className="w-5 h-5" /></button>
                <button className="p-2 bg-slate-800 rounded-lg text-slate-400 hover:text-primary"><Search className="w-5 h-5" /></button>
                <button className="p-2 bg-slate-800 rounded-lg text-slate-400 hover:text-primary"><Info className="w-5 h-5" /></button>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Selection Info */}
        <aside className="w-full lg:w-[420px] bg-background-dark border-l border-primary/10 p-8 flex flex-col gap-6 overflow-y-auto">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-black text-white">Select Territory</h1>
            <p className="text-slate-400 text-sm">Choose a nation to lead through the geopolitical landscape.</p>
          </div>

          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input 
              type="text"
              placeholder="Search countries or regions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-800/50 border border-slate-700 rounded-xl pl-11 pr-4 py-3 text-white focus:border-primary outline-none transition-all"
            />
          </div>

          <div className="flex-1 space-y-3 min-h-0 overflow-y-auto pr-2 custom-scrollbar">
            {filteredCountries.length > 0 ? (
              filteredCountries.map((country) => (
                <button 
                  key={country.id}
                  onClick={() => !isGuest && setSelectedId(country.id)}
                  className={`w-full flex items-center gap-4 p-3 rounded-xl border transition-all text-left ${selectedId === country.id ? 'bg-primary/10 border-primary/50 shadow-lg shadow-primary/10' : 'bg-slate-800/40 border-slate-700 hover:border-primary/30'} ${isGuest ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <div className={`size-10 rounded-lg shrink-0 flex items-center justify-center text-white font-bold text-sm ${country.color}`}>
                    {country.name[0]}
                  </div>
                  <div className="flex flex-col flex-1">
                    <span className="text-slate-100 font-bold text-sm">{country.name}</span>
                    <span className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">{country.region}</span>
                  </div>
                  {selectedId === country.id && <CheckCircle2 className="w-4 h-4 text-primary" />}
                </button>
              ))
            ) : (
              <div className="py-10 text-center text-slate-500 text-sm italic">
                No countries found matching your search.
              </div>
            )}
          </div>

          {selectedCountry ? (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6 pt-4 border-t border-primary/10"
            >
              <div className="glass-panel p-5 rounded-2xl border-primary/20 bg-primary/5">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`size-10 rounded-lg flex items-center justify-center text-white font-bold text-sm ${selectedCountry.color}`}>
                    {selectedCountry.name[0]}
                  </div>
                  <h3 className="text-lg font-bold text-white">{selectedCountry.name}</h3>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] text-slate-500 uppercase font-bold">GDP</span>
                    <span className="text-sm font-bold text-slate-200">{selectedCountry.gdp}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] text-slate-500 uppercase font-bold">Population</span>
                    <span className="text-sm font-bold text-slate-200">{selectedCountry.pop}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] text-slate-500 uppercase font-bold">Status</span>
                    <span className={`text-sm font-bold ${selectedCountry.status === 'Volatile' ? 'text-red-500' : 'text-emerald-500'}`}>{selectedCountry.status}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] text-slate-500 uppercase font-bold">Stability</span>
                    <span className="text-sm font-bold text-primary">94%</span>
                  </div>
                </div>
                
                <div className="mt-6 space-y-3">
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <Shield className="w-4 h-4 text-primary" />
                    Military Readiness: High
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <Zap className="w-4 h-4 text-amber-500" />
                    Tech Index: 82.4
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <TrendingUp className="w-4 h-4 text-emerald-500" />
                    Market Sentiment: Bullish
                  </div>
                </div>
              </div>

              <button 
                onClick={() => onSelect(activeScenario, selectedCountry)}
                className="w-full bg-primary text-background-dark font-bold py-4 rounded-2xl shadow-xl shadow-primary/20 hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
              >
                {isGuest ? 'Enter as Guest Mode' : 'Initialize Command'}
                <ChevronRight className="w-5 h-5" />
              </button>

              {isGuest && (
                <p className="text-[10px] text-amber-500 font-bold text-center uppercase tracking-widest">
                  Guest mode active: Progress will not be persisted
                </p>
              )}
            </motion.div>
          ) : (
            <div className="h-40 flex items-center justify-center border-2 border-dashed border-slate-800 rounded-2xl text-slate-600 text-sm italic">
              Select a territory to view details
            </div>
          )}
        </aside>
      </main>
    </div>
  );
};
