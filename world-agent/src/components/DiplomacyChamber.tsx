import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Globe, Search, Bell, Settings, MessageSquare, 
  Send, History, Shield, CheckCircle, Clock,
  ChevronRight, HelpCircle, X
} from 'lucide-react';
import { cn } from '../lib/utils';
import { useLanguage } from '../contexts/LanguageContext';

export const DiplomacyChamber: React.FC<{ isGuest?: boolean; onViewChange?: (view: any) => void }> = ({ isGuest, onViewChange }) => {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'France (Delegation)', time: '14:20', text: 'We cannot support Section 4 without guaranteed mineral rights protections for secondary partners.', isMe: false },
    { id: 2, sender: 'You (United States)', time: '14:22', text: 'The US delegation is willing to amend Paragraph B to include multilateral oversight.', isMe: true }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isAddingClause, setIsAddingClause] = useState(false);
  const [newClause, setNewClause] = useState('');
  const [vote, setVote] = useState<string | null>(null);
  const [clauses, setClauses] = useState([
    { id: 1, title: 'ARTICLE I', content: 'High Contracting Parties shall recognize the current maritime boundaries as established in the 2042 Accord, subject to the following revisions...' },
    { id: 2, title: 'ARTICLE II', content: 'Any extraction of Rare Earth Elements (REE) within the Neutral Zone shall be shared proportionally (40/30/30) among the primary signatories.', note: 'Proposed revision by France pending.' },
    { id: 3, title: 'ARTICLE III', content: 'Dispute resolution shall be handled by the Independent Intelligence Tribunal (IIT) located in New Geneva.' }
  ]);

  const handleAddClause = () => {
    if (!newClause.trim() || isGuest) return;
    const clause = {
      id: clauses.length + 1,
      title: `ARTICLE ${clauses.length + 1}`,
      content: newClause
    };
    setClauses([...clauses, clause]);
    setNewClause('');
    setIsAddingClause(false);
  };

  const handleSendMessage = () => {
    if (!inputValue.trim() || isGuest) return;
    const newMessage = {
      id: Date.now(),
      sender: 'You (United States)',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: inputValue,
      isMe: true
    };
    setMessages([...messages, newMessage]);
    setInputValue('');
  };

  const handleVote = (type: string) => {
    if (isGuest) return;
    setVote(type);
  };

  return (
    <div className="min-h-screen flex flex-col overflow-hidden text-slate-100">
      <header className="flex items-center justify-between border-b border-primary/20 px-6 py-3 bg-background-dark/80 backdrop-blur-md sticky top-0 z-50 gap-8">
        <div className="flex items-center gap-4 shrink-0">
          <div className="text-primary">
            <Globe className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-slate-100 text-lg font-bold leading-tight tracking-tight">World Agent</h2>
            <p className="text-primary text-xs font-medium uppercase tracking-widest">Diplomatic Intelligence</p>
          </div>
        </div>
        <div className="flex items-center gap-8 justify-end">
          <nav className="hidden xl:flex items-center gap-6">
            <button onClick={() => onViewChange?.('dashboard')} className="text-slate-400 hover:text-primary text-sm font-medium transition-colors whitespace-nowrap">Strategic Map</button>
            <button className="text-slate-100 border-b-2 border-primary pb-1 text-sm font-medium whitespace-nowrap">Chamber</button>
            <button onClick={() => onViewChange?.('intel')} className="text-slate-400 hover:text-primary text-sm font-medium transition-colors whitespace-nowrap">Intelligence</button>
            <button onClick={() => onViewChange?.('diplomacy')} className="text-slate-400 hover:text-primary text-sm font-medium transition-colors whitespace-nowrap">Archives</button>
          </nav>
          <div className="flex gap-3">
            <button className="flex items-center justify-center rounded-lg h-10 w-10 bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-all">
              <Bell className="w-5 h-5" />
            </button>
            <button className="flex items-center justify-center rounded-lg h-10 w-10 bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-all">
              <Settings className="w-5 h-5" />
            </button>
            <div className="h-10 w-10 rounded-full border-2 border-primary/50 overflow-hidden bg-slate-800" />
          </div>
        </div>
      </header>

      <main className="flex flex-1 overflow-hidden p-4 gap-4 bg-background-deep">
        <aside className="w-72 flex flex-col gap-4">
          <div className="glass-panel rounded-xl p-4 flex flex-col gap-4 overflow-y-auto flex-1">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold uppercase tracking-wider text-primary/80">Delegates</h3>
              <span className="bg-primary/20 text-primary text-[10px] px-2 py-0.5 rounded-full font-bold">12 ONLINE</span>
            </div>
            <div className="space-y-2">
              {[
                { name: 'United States', role: 'COUNCIL HEAD', active: true, img: '🇺🇸' },
                { name: 'China', role: 'DELEGATE', active: false, img: '🇨🇳' },
                { name: 'European Union', role: 'OBSERVER', active: false, img: '🇪🇺' },
                { name: 'Brazil', role: 'DELEGATE', active: false, img: '🇧🇷' }
              ].map((delegate, i) => (
                <div key={i} className={`flex items-center gap-3 p-3 rounded-lg border transition-all ${delegate.active ? 'bg-primary/20 border-primary/30 shadow-[0_0_15px_rgba(32,211,238,0.2)]' : 'bg-slate-800/40 border-slate-700 hover:border-primary/30'}`}>
                  <div className="h-10 w-10 rounded-lg bg-slate-900 flex items-center justify-center border border-slate-700 text-xl">
                    {delegate.img}
                  </div>
                  <div className="flex flex-col">
                    <span className={`text-sm font-bold ${delegate.active ? 'text-slate-100' : 'text-slate-300'}`}>{delegate.name}</span>
                    <span className="text-[10px] text-slate-500 uppercase">{delegate.role}</span>
                  </div>
                  {delegate.active && (
                    <div className="ml-auto flex gap-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="glass-panel rounded-xl p-4">
            <h4 className="text-xs font-bold text-primary/80 mb-2 uppercase tracking-tighter">Session Status</h4>
            <div className="flex items-center gap-2 mb-3">
              <Clock className="w-4 h-4 text-primary" />
              <span className="text-xs text-slate-300 font-mono">01:24:55 REMAINING</span>
            </div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
              <div className="bg-primary h-full w-2/3 shadow-[0_0_8px_rgba(32,211,238,0.5)]" />
            </div>
          </div>
        </aside>

        <section className="flex-1 flex flex-col gap-4 overflow-hidden">
          <div className="flex flex-wrap items-center justify-between glass-panel rounded-xl px-6 py-4 gap-6">
            <div className="flex flex-col min-w-[300px]">
              <h1 className="text-3xl font-black text-slate-100 uppercase leading-none tracking-tight">UN Security Council:</h1>
              <h1 className="text-3xl font-black text-slate-100 uppercase leading-tight tracking-tight">Resolution 402</h1>
              <p className="text-primary text-lg font-bold mt-1">Subject: Maritime Territorial Integrity in Sector 7-G</p>
            </div>
            <div className="flex flex-wrap gap-3 items-start pt-2">
              <span className="px-5 py-2 rounded-full bg-primary/10 text-primary text-xs font-black border border-primary/30 uppercase tracking-widest shadow-[0_0_15px_rgba(32,211,238,0.1)] whitespace-nowrap">In Session</span>
              <span className="px-5 py-2 rounded-full bg-slate-800/80 text-slate-400 text-xs font-black border border-slate-700/50 uppercase tracking-widest whitespace-nowrap">Secretariat</span>
            </div>
          </div>

          <div className="flex-1 glass-panel rounded-xl p-4 flex flex-col gap-4 overflow-hidden">
            <div className="flex items-center border-b border-primary/10 pb-2">
              <MessageSquare className="w-4 h-4 text-primary mr-2" />
              <h3 className="text-sm font-bold text-slate-300 uppercase">Live Negotiation Feed</h3>
            </div>
            <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
              <AnimatePresence initial={false}>
                {messages.map((msg) => (
                  <motion.div 
                    key={msg.id}
                    initial={{ opacity: 0, x: msg.isMe ? 20 : -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`flex gap-3 ${msg.isMe ? 'flex-row-reverse text-right' : ''}`}
                  >
                    <div className={`h-8 w-8 rounded-full shrink-0 border ${msg.isMe ? 'bg-primary/20 border-primary/50' : 'bg-slate-800 border-primary/30'}`} />
                    <div className={`flex flex-col gap-1 max-w-[80%] ${msg.isMe ? 'items-end' : ''}`}>
                      <span className={`text-[11px] font-bold ${msg.isMe ? 'text-primary' : 'text-slate-400'}`}>
                        {msg.sender} <span className="text-slate-600 mx-2">{msg.time}</span>
                      </span>
                      <div className={`p-3 rounded-xl border ${msg.isMe ? 'bg-primary/10 border-primary/20 rounded-tr-none' : 'bg-slate-800/60 border-slate-700 rounded-tl-none'}`}>
                        <p className="text-sm text-slate-100">{msg.text}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            <form 
              onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }}
              className="flex gap-2 mt-auto p-2 bg-background-dark rounded-lg border border-primary/20 relative"
            >
              <input 
                disabled={isGuest}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className={`flex-1 bg-transparent border-none text-slate-100 text-sm focus:ring-0 placeholder-slate-600 outline-none ${isGuest ? 'cursor-not-allowed opacity-50' : ''}`} 
                placeholder={isGuest ? "Registration required to send messages..." : "Type your diplomatic message..."} 
                type="text" 
              />
              <button 
                type="submit"
                disabled={isGuest || !inputValue.trim()}
                className={`p-2 rounded-lg text-background-dark transition-colors flex items-center justify-center ${isGuest || !inputValue.trim() ? 'bg-slate-700 cursor-not-allowed' : 'bg-primary hover:bg-primary/90'}`}
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </section>

        <aside className="w-96 flex flex-col gap-4 overflow-hidden">
          <div className="flex-1 glass-panel rounded-xl flex flex-col overflow-hidden">
            <div className="bg-primary/10 p-4 border-b border-primary/20 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <History className="w-4 h-4 text-primary" />
                <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wide">Treaty Editor</h3>
              </div>
              <span className="text-[10px] font-mono text-primary/60">DRAFT V2.4</span>
            </div>
            <div className="flex-1 overflow-y-auto p-6 font-serif bg-white/[0.02]">
              <h2 className="text-center text-slate-400 font-bold mb-6 text-xs uppercase tracking-[0.2em]">TREATY OF SECTOR 7-G</h2>
              <div className="space-y-4 text-sm leading-relaxed text-slate-300">
                {clauses.map((clause) => (
                  <div key={clause.id} className={cn("p-3 rounded border", clause.note ? "bg-primary/5 border-primary/10" : "border-primary/30 pl-3 border-l-2 border-t-0 border-r-0 border-b-0")}>
                    <span className="text-primary font-bold">{clause.title}:</span> {clause.content}
                    {clause.note && <span className="block mt-2 text-[10px] text-primary/40 italic">Note: {clause.note}</span>}
                  </div>
                ))}

                {isAddingClause ? (
                  <div className="flex flex-col gap-3 p-4 rounded-xl bg-slate-900 border border-primary/30">
                    <textarea 
                      value={newClause}
                      onChange={(e) => setNewClause(e.target.value)}
                      placeholder="Enter new clause text..."
                      className="bg-transparent border-none text-slate-200 text-sm focus:ring-0 placeholder-slate-600 outline-none resize-none h-24"
                    />
                    <div className="flex gap-2 justify-end">
                      <button onClick={() => setIsAddingClause(false)} className="px-4 py-2 rounded-lg text-slate-400 text-xs font-bold uppercase">Cancel</button>
                      <button onClick={handleAddClause} className="px-4 py-2 rounded-lg bg-primary text-background-dark text-xs font-black uppercase">Add Clause</button>
                    </div>
                  </div>
                ) : (
                  <div 
                    onClick={() => !isGuest && setIsAddingClause(true)}
                    className={`h-24 border-2 border-dashed rounded-lg flex items-center justify-center italic text-xs transition-all ${isGuest ? 'border-slate-800 text-slate-700 cursor-not-allowed' : 'border-slate-700 text-slate-600 hover:border-primary/30 cursor-pointer'}`}
                  >
                    {isGuest ? 'Register to propose clauses' : 'Add new clause...'}
                  </div>
                )}
              </div>
            </div>
          </div>
        </aside>
      </main>

      <footer className="h-20 bg-background-dark/90 backdrop-blur-xl border-t border-primary/20 px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex flex-col">
            <span className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Consensus Level</span>
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                <div className="h-5 w-5 rounded-full bg-green-500 border border-background-dark" />
                <div className="h-5 w-5 rounded-full bg-green-500 border border-background-dark" />
                <div className="h-5 w-5 rounded-full bg-yellow-500 border border-background-dark" />
                <div className="h-5 w-5 rounded-full bg-red-500 border border-background-dark" />
              </div>
              <span className="text-sm font-bold text-slate-300 ml-2">55%</span>
            </div>
          </div>
        </div>
        <div className="flex gap-6">
          <button 
            onClick={() => handleVote('abstain')}
            disabled={isGuest}
            className={`px-12 h-14 rounded-xl font-black text-sm uppercase transition-all tracking-[0.2em] border-2 ${isGuest ? 'bg-slate-800/50 text-slate-600 border-slate-800 cursor-not-allowed' : vote === 'abstain' ? 'bg-slate-700 text-white border-primary' : 'bg-slate-900/40 hover:bg-slate-800 text-slate-400 border-slate-700/50 hover:border-slate-500'}`}
          >
            Abstain
          </button>
          <button 
            onClick={() => handleVote('no')}
            disabled={isGuest}
            className={`px-12 h-14 rounded-xl font-black text-sm uppercase transition-all tracking-[0.2em] border-2 ${isGuest ? 'bg-red-500/5 text-red-900 border-red-900/20 cursor-not-allowed' : vote === 'no' ? 'bg-red-600 text-white border-red-400 shadow-[0_0_20px_rgba(239,68,68,0.4)]' : 'bg-red-500/5 hover:bg-red-500/10 text-red-500 border-red-500/40 hover:border-red-500/60'}`}
          >
            Vote No
          </button>
          <button 
            onClick={() => handleVote('yes')}
            disabled={isGuest}
            className={`px-14 h-14 rounded-xl font-black text-sm uppercase transition-all tracking-[0.2em] shadow-2xl ${isGuest ? 'bg-slate-700 text-slate-500 cursor-not-allowed' : vote === 'yes' ? 'bg-primary text-background-dark shadow-[0_0_30px_rgba(32,211,238,0.5)]' : 'bg-primary/80 hover:brightness-110 text-background-dark shadow-primary/30'}`}
          >
            Vote Yes
          </button>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex flex-col items-end">
            <span className="text-[10px] text-slate-500 uppercase font-bold">Chamber Encryption</span>
            <span className="text-xs font-mono text-green-500">QUANTUM_LOCKED</span>
          </div>
          <button className="p-2 text-slate-500 hover:text-primary">
            <HelpCircle className="w-5 h-5" />
          </button>
        </div>
      </footer>
    </div>
  );
};
