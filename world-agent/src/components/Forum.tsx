import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Globe, Search, Bell, MessageSquare, 
  TrendingUp, ThumbsUp, Share2, Filter,
  User, Award, Plus, ChevronRight, AlertCircle,
  X, Send, ArrowUp
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { cn } from '../lib/utils';

export const Forum: React.FC<{ isGuest?: boolean; onViewChange?: (view: any) => void; user?: any }> = ({ isGuest, onViewChange, user }) => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'trending' | 'latest' | 'top'>('trending');
  const [isCreating, setIsCreating] = useState(false);
  const [selectedPost, setSelectedPost] = useState<any>(null);
  const [replyText, setReplyText] = useState('');
  const [newPost, setNewPost] = useState({ title: '', content: '', tag: 'STRATEGY' });
  const [posts, setPosts] = useState([
    { 
      id: 1,
      tag: 'STRATEGY', 
      title: 'The impact of the 2024 Arctic Treaty on Northern trade routes', 
      author: 'Agent_Zero', 
      time: '2h ago', 
      replyCount: 142, 
      likes: 1200,
      liked: false,
      content: 'With the recent thawing of the Northwest Passage, the geopolitical landscape of the Arctic is shifting rapidly. How should the Nordic Council respond to increased private security presence in the region?',
      replies: [
        { id: 101, author: 'Strategist_X', content: 'We need to establish a multilateral oversight committee immediately.', time: '1h ago' },
        { id: 102, author: 'GlobalWatcher', content: 'The trade implications are massive. We should focus on infrastructure first.', time: '30m ago' }
      ]
    },
    { 
      id: 2,
      tag: 'ECONOMICS', 
      title: 'Predictive modeling for the upcoming Neo-Yen devaluation', 
      author: 'FinanceCommander', 
      time: '5h ago', 
      replyCount: 89, 
      likes: 642,
      liked: false,
      content: 'Our latest simulations suggest a 15% drop in the Neo-Yen value by Q3. This could trigger a massive shift in Southeast Asian manufacturing hubs.',
      replies: []
    },
    { 
      id: 3,
      tag: 'SECURITY', 
      title: 'Cyber-defense protocols for Sovereign Cloud infrastructure', 
      author: 'NetShield_Alpha', 
      time: '12h ago', 
      replyCount: 256, 
      likes: 3400,
      liked: false,
      content: 'Recent intrusions have highlighted vulnerabilities in our decentralized storage nodes. I propose a new multi-signature verification protocol for all inter-continental data transfers.',
      replies: []
    }
  ]);

  const handleLike = (id: number) => {
    if (isGuest) return;
    const updatedPosts = posts.map(post => 
      post.id === id 
        ? { ...post, likes: post.liked ? post.likes - 1 : post.likes + 1, liked: !post.liked } 
        : post
    );
    setPosts(updatedPosts);
    if (selectedPost && selectedPost.id === id) {
      setSelectedPost(updatedPosts.find(p => p.id === id));
    }
  };

  const handleAddReply = () => {
    if (!replyText.trim() || !selectedPost || isGuest) return;
    
    const newReply = {
      id: Date.now(),
      author: user?.username || 'Agent_User',
      content: replyText,
      time: 'Just now'
    };

    const updatedPosts = posts.map(post => {
      if (post.id === selectedPost.id) {
        return {
          ...post,
          replies: [...(post.replies || []), newReply],
          replyCount: (post.replyCount || 0) + 1
        };
      }
      return post;
    });

    setPosts(updatedPosts);
    setSelectedPost(updatedPosts.find(p => p.id === selectedPost.id));
    setReplyText('');
  };

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPost.title || !newPost.content) return;
    
    const post = {
      id: posts.length + 1,
      tag: newPost.tag,
      title: newPost.title,
      author: user?.username || 'Agent_User',
      time: 'Just now',
      replyCount: 0,
      likes: 0,
      liked: false,
      content: newPost.content,
      replies: []
    };
    
    setPosts([post, ...posts]);
    setIsCreating(false);
    setNewPost({ title: '', content: '', tag: 'STRATEGY' });
  };

  const filteredPosts = [...posts].sort((a, b) => {
    if (activeTab === 'latest') return 0;
    if (activeTab === 'top') return b.likes - a.likes;
    if (activeTab === 'trending') return b.replyCount - a.replyCount;
    return 0;
  });

  return (
    <div className="min-h-screen flex flex-col text-slate-100 bg-background-deep">
      <header className="flex items-center justify-between border-b border-primary/20 px-6 lg:px-20 py-4 bg-background-dark/80 backdrop-blur-md sticky top-0 z-50 gap-8">
        <div className="flex items-center gap-8 shrink-0">
          <div className="flex items-center gap-3 text-primary">
            <Globe className="w-8 h-8" />
            <h2 className="text-slate-100 text-xl font-bold leading-tight tracking-tight">World Agent</h2>
          </div>
          <nav className="hidden xl:flex items-center gap-8">
            <button onClick={() => onViewChange?.('dashboard')} className="text-slate-400 hover:text-primary transition-colors text-sm font-medium whitespace-nowrap">{t('nav.feed')}</button>
            <button className="text-primary text-sm font-semibold border-b-2 border-primary pb-1 whitespace-nowrap">{t('nav.forum')}</button>
            <button onClick={() => onViewChange?.('intel')} className="text-slate-400 hover:text-primary transition-colors text-sm font-medium whitespace-nowrap">{t('nav.intel')}</button>
            <button onClick={() => onViewChange?.('diplomacy')} className="text-slate-400 hover:text-primary transition-colors text-sm font-medium whitespace-nowrap">{t('nav.diplomacy')}</button>
          </nav>
        </div>
        <div className="flex items-center gap-6 justify-end">
          <div className="hidden lg:flex items-center rounded-lg h-10 bg-primary/10 border border-primary/20 px-3 min-w-[200px]">
            <Search className="w-4 h-4 text-primary/60 mr-2" />
            <input className="bg-transparent border-none focus:ring-0 text-white text-sm placeholder:text-primary/40 outline-none w-full" placeholder={t('forum.searchPlaceholder')} />
          </div>
          <div className="flex gap-3">
            <button className="flex items-center justify-center rounded-lg size-10 bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-all">
              <Bell className="w-5 h-5" />
            </button>
            <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border-2 border-primary/30" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100")' }} />
          </div>
        </div>
      </header>

      <main className="flex-1 px-6 lg:px-40 py-10 max-w-7xl mx-auto w-full flex flex-col md:flex-row gap-8">
        <div className="flex-1 flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-black leading-tight tracking-tight text-white">{t('forum.title')}</h1>
            <p className="text-slate-400 text-lg">{t('forum.desc')}</p>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex gap-2 bg-slate-900/40 p-1.5 rounded-2xl border border-slate-700/50 w-full sm:w-auto">
              <button 
                onClick={() => setActiveTab('trending')}
                className={cn("flex-1 sm:flex-none px-8 py-3 rounded-xl font-black text-sm uppercase tracking-widest transition-all", 
                  activeTab === 'trending' ? "bg-primary text-background-dark shadow-[0_0_15px_rgba(32,211,238,0.2)]" : "text-slate-400 hover:text-slate-200")}
              >{t('forum.trending')}</button>
              <button 
                onClick={() => setActiveTab('latest')}
                className={cn("flex-1 sm:flex-none px-8 py-3 rounded-xl font-black text-sm uppercase tracking-widest transition-all", 
                  activeTab === 'latest' ? "bg-primary text-background-dark shadow-[0_0_15px_rgba(32,211,238,0.2)]" : "text-slate-400 hover:text-slate-200")}
              >{t('forum.latest')}</button>
              <button 
                onClick={() => setActiveTab('top')}
                className={cn("flex-1 sm:flex-none px-8 py-3 rounded-xl font-black text-sm uppercase tracking-widest transition-all", 
                  activeTab === 'top' ? "bg-primary text-background-dark shadow-[0_0_15px_rgba(32,211,238,0.2)]" : "text-slate-400 hover:text-slate-200")}
              >{t('forum.top')}</button>
            </div>
            <button 
              onClick={() => !isGuest && setIsCreating(true)}
              disabled={isGuest}
              className={`w-full sm:w-auto flex items-center justify-center gap-3 px-10 py-4 rounded-2xl font-black uppercase tracking-widest transition-all shadow-2xl ${isGuest ? 'bg-slate-700 text-slate-500 cursor-not-allowed' : 'bg-primary text-background-dark hover:brightness-110 shadow-primary/30'}`}
            >
              <Plus className="w-6 h-6" />
              {t('forum.new')}
            </button>
          </div>

          {isGuest && (
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-amber-500 shrink-0" />
              <p className="text-xs text-amber-200/80 font-medium">
                <span className="font-bold text-amber-500 uppercase mr-2">{t('forum.guest.title')}:</span>
                {t('forum.guest.desc')}
              </p>
            </div>
          )}

          <div className="space-y-6">
            {isCreating && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-panel p-8 rounded-2xl border-primary/30 bg-primary/5 shadow-2xl"
              >
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-white uppercase tracking-widest">{t('forum.new.title')}</h3>
                  <button onClick={() => setIsCreating(false)} className="text-slate-500 hover:text-white transition-colors">
                    <X className="w-6 h-6" />
                  </button>
                </div>
                <form onSubmit={handleCreatePost} className="flex flex-col gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">{t('forum.new.category')}</label>
                    <select 
                      value={newPost.tag}
                      onChange={(e) => setNewPost({ ...newPost, tag: e.target.value })}
                      className="bg-slate-900 border border-primary/20 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-primary/50 outline-none"
                    >
                      <option value="STRATEGY">{t('forum.new.category.strategy')}</option>
                      <option value="ECONOMICS">{t('forum.new.category.economics')}</option>
                      <option value="SECURITY">{t('forum.new.category.security')}</option>
                      <option value="DIPLOMACY">{t('forum.new.category.diplomacy')}</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">{t('forum.new.titleLabel')}</label>
                    <input 
                      type="text" 
                      placeholder={t('forum.new.titlePlaceholder')}
                      value={newPost.title}
                      onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                      className="bg-slate-900 border border-primary/20 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-primary/50 outline-none"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">{t('forum.new.contentLabel')}</label>
                    <textarea 
                      rows={5}
                      placeholder={t('forum.new.contentPlaceholder')}
                      value={newPost.content}
                      onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                      className="bg-slate-900 border border-primary/20 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-primary/50 outline-none resize-none"
                    />
                  </div>
                  <button 
                    type="submit"
                    className="w-full py-4 bg-primary text-background-dark font-black uppercase tracking-widest rounded-xl hover:brightness-110 transition-all flex items-center justify-center gap-2"
                  >
                    <Send className="w-5 h-5" />
                    {t('forum.new.broadcast')}
                  </button>
                </form>
              </motion.div>
            )}

            {filteredPosts.map((post, i) => (
              <motion.div 
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => setSelectedPost(post)}
                className="glass-panel p-6 rounded-xl border-primary/10 hover:border-primary/30 transition-all group cursor-pointer"
              >
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <span className="px-2.5 py-0.5 rounded-md bg-primary/10 text-primary text-[10px] font-bold tracking-widest border border-primary/20">{post.tag}</span>
                    <span className="text-slate-500 text-xs">•</span>
                    <span className="text-slate-400 text-xs font-medium">{t('forum.post.postedBy')} <span className="text-slate-200">{post.author}</span> • {post.time}</span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">{post.title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed line-clamp-2">{post.content}</p>
                  </div>
                    <div className="flex items-center justify-between mt-2 pt-4 border-t border-primary/5">
                    <div className="flex items-center gap-6">
                      <button 
                        onClick={(e) => { e.stopPropagation(); setSelectedPost(post); }}
                        className={`flex items-center gap-2 transition-colors text-slate-400 hover:text-primary`}
                      >
                        <MessageSquare className="w-4 h-4" />
                        <span className="text-xs font-bold">{post.replyCount} {t('forum.post.replies')}</span>
                      </button>
                      <button 
                        onClick={(e) => { e.stopPropagation(); handleLike(post.id); }}
                        disabled={isGuest}
                        className={`flex items-center gap-2 transition-colors ${isGuest ? 'text-slate-600 cursor-not-allowed' : post.liked ? 'text-primary' : 'text-slate-400 hover:text-primary'}`}
                      >
                        <ThumbsUp className={`w-4 h-4 ${post.liked ? 'fill-primary' : ''}`} />
                        <span className="text-xs font-bold">{post.likes >= 1000 ? `${(post.likes / 1000).toFixed(1)}k` : post.likes}</span>
                      </button>
                      <button 
                        onClick={(e) => { e.stopPropagation(); !isGuest && alert('Link copied to clipboard!'); }}
                        disabled={isGuest}
                        className={`flex items-center gap-2 transition-colors ${isGuest ? 'text-slate-600 cursor-not-allowed' : 'text-slate-400 hover:text-primary'}`}
                      >
                        <Share2 className="w-4 h-4" />
                        <span className="text-xs font-bold">{t('forum.post.share')}</span>
                      </button>
                    </div>
                    <ChevronRight className="w-5 h-5 text-slate-600 group-hover:text-primary transition-colors" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <aside className="w-full md:w-80 flex flex-col gap-8">
          <div className="glass-panel rounded-xl p-6 border-primary/10">
            <div className="flex items-center gap-2 mb-6">
              <TrendingUp className="w-5 h-5 text-primary" />
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">{t('forum.trendingTopics')}</h3>
            </div>
            <div className="space-y-4">
              {[
                { tag: '#ArcticTreaty', count: '12.4k' },
                { tag: '#NeoYen', count: '8.2k' },
                { tag: '#SovereignCloud', count: '5.1k' },
                { tag: '#MarsColonyRights', count: '3.9k' },
                { tag: '#WaterScarcity', count: '2.8k' }
              ].map((topic, i) => (
                <div key={i} className="flex items-center justify-between group cursor-pointer">
                  <span className="text-sm text-slate-300 group-hover:text-primary transition-colors">{topic.tag}</span>
                  <span className="text-[10px] font-bold text-slate-500 bg-slate-800 px-2 py-0.5 rounded-full">{topic.count}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-panel rounded-xl p-6 border-primary/10">
            <div className="flex items-center gap-2 mb-6">
              <Award className="w-5 h-5 text-amber-500" />
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">{t('forum.topContributors')}</h3>
            </div>
            <div className="space-y-4">
              {[
                { name: 'Agent_Zero', rank: 'Grand Strategist', points: '12,402' },
                { name: 'FinanceCommander', rank: 'Economic Advisor', points: '9,842' },
                { name: 'NetShield_Alpha', rank: 'Security Expert', points: '8,120' }
              ].map((user, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="size-10 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 font-bold">
                    {user.name[0]}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-slate-200">{user.name}</span>
                    <span className="text-[10px] text-slate-500 uppercase">{user.rank}</span>
                  </div>
                  <div className="ml-auto text-xs font-mono text-primary">{user.points}</div>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </main>

      {/* Post Details Modal */}
      <AnimatePresence>
        {selectedPost && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPost(null)}
              className="absolute inset-0 bg-background-deep/80 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-4xl max-h-[90vh] glass-panel rounded-3xl border-primary/20 overflow-hidden flex flex-col shadow-2xl bg-background-dark"
            >
              <div className="flex items-center justify-between p-6 border-b border-primary/10">
                <h2 className="text-xl font-black text-white uppercase tracking-tight">{t('forum.modal.title')}</h2>
                <button 
                  onClick={() => setSelectedPost(null)}
                  className="p-2 rounded-lg hover:bg-slate-800 text-slate-400 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                <div className="flex gap-6 mb-8">
                  <div className="flex flex-col items-center gap-2 shrink-0">
                    <button 
                      onClick={() => handleLike(selectedPost.id)}
                      className={`p-3 rounded-xl transition-colors border ${selectedPost.liked ? 'bg-primary text-background-dark border-primary' : 'bg-primary/10 text-primary border-primary/20 hover:bg-primary/20'}`}
                    >
                      <ArrowUp className="w-6 h-6" />
                    </button>
                    <span className="text-lg font-black text-white">{selectedPost.likes}</span>
                  </div>
                  <div className="flex-1 space-y-6">
                    <div className="flex items-center gap-3">
                      <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-black border border-primary/30 uppercase tracking-widest">
                        {selectedPost.tag}
                      </span>
                      <span className="text-xs text-slate-500 font-bold uppercase tracking-widest">
                        {t('forum.post.postedBy')} {selectedPost.author} • {selectedPost.time}
                      </span>
                    </div>
                    <h1 className="text-3xl font-black text-white leading-tight">{selectedPost.title}</h1>
                    <div className="prose prose-invert max-w-none">
                      <p className="text-slate-300 text-lg leading-relaxed whitespace-pre-wrap">
                        {selectedPost.content}
                      </p>
                    </div>
                    <div className="flex items-center gap-8 pt-4 border-t border-primary/5">
                      <div className="flex items-center gap-2 text-sm font-bold text-slate-400">
                        <MessageSquare className="w-5 h-5 text-primary" />
                        {selectedPost.replyCount} {t('forum.modal.replies')}
                      </div>
                      <button 
                        onClick={() => alert('Link copied to clipboard!')}
                        className="flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-primary transition-colors"
                      >
                        <Share2 className="w-5 h-5" />
                        {t('forum.post.share')}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Replies Section */}
                <div className="space-y-8 mt-12">
                  <h3 className="text-lg font-black text-white uppercase tracking-tight flex items-center gap-3">
                    <MessageSquare className="w-5 h-5 text-primary" />
                    {t('forum.modal.replies')}
                  </h3>
                  
                  <div className="space-y-6">
                    {selectedPost.replies && selectedPost.replies.length > 0 ? (
                      selectedPost.replies.map((reply: any) => (
                        <div key={reply.id} className="flex gap-4 p-4 rounded-2xl bg-slate-800/30 border border-slate-700/50">
                          <div className="size-10 rounded-xl bg-slate-900 flex items-center justify-center text-primary font-bold border border-slate-700">
                            {reply.author.charAt(0)}
                          </div>
                          <div className="flex-1 space-y-1">
                            <div className="flex justify-between items-center">
                              <span className="text-sm font-bold text-slate-200">{reply.author}</span>
                              <span className="text-[10px] text-slate-500 font-bold uppercase">{reply.time}</span>
                            </div>
                            <p className="text-sm text-slate-400 leading-relaxed">{reply.content}</p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-12 glass-panel rounded-2xl border-dashed border-slate-700">
                        <p className="text-slate-500 text-sm italic">{t('forum.modal.noReplies')}</p>
                      </div>
                    )}
                  </div>

                  {/* Add Reply */}
                  {!isGuest && (
                    <div className="pt-8">
                      <div className="flex gap-4 p-4 rounded-2xl bg-slate-900/50 border border-primary/20">
                        <textarea 
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                          placeholder={t('forum.modal.addReply')}
                          className="flex-1 bg-transparent border-none text-slate-200 text-sm focus:ring-0 placeholder-slate-600 outline-none resize-none h-20"
                        />
                        <button 
                          onClick={handleAddReply}
                          disabled={!replyText.trim()}
                          className="self-end px-6 py-2 rounded-xl bg-primary text-background-dark font-black text-xs uppercase tracking-widest hover:brightness-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {t('forum.modal.reply')}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
