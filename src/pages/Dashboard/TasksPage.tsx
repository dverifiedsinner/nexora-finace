import { useState } from 'react';
import { 
  CheckCircle2, 
  Zap, 
  Clock, 
  ExternalLink,
  Target,
  Trophy,
  Filter
} from 'lucide-react';
import { cn, formatCurrency } from '../../lib/utils';
import { toast } from 'react-hot-toast';

interface Task {
  id: string;
  title: string;
  reward: number;
  type: 'Daily' | 'Social' | 'Special';
  provider: string;
  timeLimit: string;
  category: string;
}

const TASKS: Task[] = [
  { id: '1', title: 'Follow NEZORA on Twitter', reward: 250, type: 'Social', provider: 'Official', timeLimit: '5 mins', category: 'Social Media' },
  { id: '2', title: 'Watch Sponsored Video', reward: 500, type: 'Daily', provider: 'Sponsor A', timeLimit: '2 mins', category: 'Ads' },
  { id: '3', title: 'Complete User Profile', reward: 1000, type: 'Special', provider: 'System', timeLimit: '10 mins', category: 'Profile' },
  { id: '4', title: 'Share Referral Link on LinkedIn', reward: 750, type: 'Social', provider: 'Official', timeLimit: '5 mins', category: 'Social Media' },
  { id: '5', title: 'Daily Market Survey', reward: 1200, type: 'Daily', provider: 'Partner B', timeLimit: '15 mins', category: 'Surveys' },
  { id: '6', title: 'Join Official Telegram', reward: 300, type: 'Social', provider: 'Official', timeLimit: '2 mins', category: 'Social Media' },
];

export default function TasksPage({ user }: { user: any }) {
  const [activeTab, setActiveTab] = useState('All');
  const [claimedTasks, setClaimedTasks] = useState<string[]>([]);
  const [claiming, setClaiming] = useState<string | null>(null);

  const filteredTasks = activeTab === 'All' 
    ? TASKS 
    : TASKS.filter(task => task.type === activeTab);

  const handleClaim = (taskId: string) => {
    setClaiming(taskId);
    setTimeout(() => {
      setClaimedTasks([...claimedTasks, taskId]);
      setClaiming(null);
      toast.success('Task claim initiated! Reward will be added to bonus wallet after verification.');
    }, 1500);
  };

  return (
    <div className="space-y-8 sm:space-y-10">
      {/* Stats Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
        <div className="bg-navy p-6 sm:p-8 rounded-[40px] sm:rounded-[48px] border border-white/5 shadow-2xl flex items-center gap-4 sm:gap-6">
           <div className="w-12 h-12 sm:w-16 sm:h-16 bg-navy-light gold-glow rounded-2xl sm:rounded-3xl flex items-center justify-center border border-gold/20">
              <Target size={24} className="sm:size-8 text-gold" />
           </div>
           <div>
              <p className="text-slate-500 font-display font-bold text-[8px] sm:text-[10px] uppercase tracking-[0.3em] sm:tracking-[0.4em] mb-1">Operations</p>
              <h4 className="text-xl sm:text-3xl font-display font-black text-white italic tracking-tighter">{claimedTasks.length} / {TASKS.length}</h4>
           </div>
        </div>
        <div className="bg-navy p-6 sm:p-8 rounded-[40px] sm:rounded-[48px] border border-white/5 shadow-2xl flex items-center gap-4 sm:gap-6">
           <div className="w-12 h-12 sm:w-16 sm:h-16 bg-navy-light gold-glow rounded-2xl sm:rounded-3xl flex items-center justify-center border border-gold/20">
              <Trophy size={24} className="sm:size-8 text-gold" />
           </div>
           <div>
              <p className="text-slate-500 font-display font-bold text-[8px] sm:text-[10px] uppercase tracking-[0.3em] sm:tracking-[0.4em] mb-1">Yield Value</p>
              <h4 className="text-xl sm:text-3xl font-display font-black text-white italic tracking-tighter">{formatCurrency(claimedTasks.length * 500)}</h4>
           </div>
        </div>
        <div className="bg-gold p-6 sm:p-8 rounded-[40px] sm:rounded-[48px] text-navy flex items-center gap-4 sm:gap-6 shadow-2xl gold-glow">
           <div className="w-12 h-12 sm:w-16 sm:h-16 bg-navy text-gold rounded-2xl sm:rounded-3xl flex items-center justify-center">
              <Zap size={24} className="sm:size-8" />
           </div>
           <div>
              <p className="text-navy/60 font-display font-bold text-[8px] sm:text-[10px] uppercase tracking-[0.3em] sm:tracking-[0.4em] mb-1">Nexus Multiplier</p>
              <h4 className="text-xl sm:text-3xl font-display font-black italic tracking-tighter">1.2x Active</h4>
           </div>
        </div>
      </div>

      {/* Main List */}
      <div className="bg-navy rounded-[40px] sm:rounded-[64px] border border-white/5 p-6 sm:p-14 min-h-[500px] sm:min-h-[600px] shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 sm:gap-8 mb-10 sm:mb-12">
          <div>
            <h2 className="text-2xl sm:text-4xl font-display font-black text-white uppercase italic tracking-tighter leading-none">Operational <span className="text-gold text-3xl sm:text-4xl">Feed</span></h2>
            <p className="text-slate-500 font-bold uppercase text-[8px] sm:text-[10px] tracking-[0.2em] sm:tracking-[0.3em] mt-2">Deploy your focus for instant rewards.</p>
          </div>
          
          <div className="flex overflow-x-auto pb-2 sm:pb-0 gap-2 sm:gap-3 scrollbar-hide snap-x bg-navy-light/50 p-1.5 sm:p-2 rounded-[24px] sm:rounded-[32px] border border-white/5">
            {['All', 'Daily', 'Social', 'Special'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "px-6 py-3 sm:px-8 sm:py-4 rounded-xl sm:rounded-[24px] font-display font-bold text-[10px] sm:text-xs uppercase tracking-[0.1em] sm:tracking-[0.2em] transition-all whitespace-nowrap snap-center",
                  activeTab === tab 
                    ? "bg-gold text-navy gold-glow shadow-xl" 
                    : "text-slate-500 hover:text-white"
                )}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredTasks.map((task) => {
            const isClaimed = claimedTasks.includes(task.id);
            const isProcessing = claiming === task.id;

            return (
              <div 
                key={task.id} 
                className={cn(
                  "group bg-navy-light border-2 border-white/5 hover:border-gold/30 rounded-[40px] p-8 transition-all duration-500 relative overflow-hidden",
                  isClaimed && "opacity-40 grayscale pointer-events-none"
                )}
              >
                <div className="flex items-start justify-between mb-8 relative z-10">
                  <div className="bg-navy p-5 rounded-3xl group-hover:gold-glow group-hover:border-gold/30 border border-white/10 transition-all">
                    <CheckCircle2 className={cn("transition-colors", isClaimed ? "text-gold" : "text-slate-600 group-hover:text-gold")} size={28} />
                  </div>
                  <div className="gold-gradient text-navy px-6 py-2 rounded-2xl font-display font-black text-xs uppercase tracking-widest shadow-xl gold-glow italic">
                    +{formatCurrency(task.reward)}
                  </div>
                </div>

                <h3 className="text-2xl font-display font-black text-white mb-2 italic tracking-tighter uppercase leading-none group-hover:text-gold transition-colors">{task.title}</h3>
                <div className="flex items-center gap-6 text-[10px] text-slate-500 font-display font-bold uppercase tracking-[0.3em] mb-10">
                  <span className="flex items-center gap-2"><Zap size={16} className="text-gold" /> {task.category}</span>
                  <span className="flex items-center gap-2"><Clock size={16} /> {task.timeLimit}</span>
                </div>

                <div className="flex items-center gap-4 relative z-10">
                  <button 
                    onClick={() => handleClaim(task.id)}
                    disabled={isProcessing || isClaimed}
                    className={cn(
                      "flex-1 py-5 px-6 rounded-[24px] font-display font-black uppercase text-xs tracking-widest transition-all shadow-xl active:scale-95",
                      isClaimed 
                        ? "bg-slate-800 text-slate-500" 
                        : "bg-navy text-white hover:bg-gold hover:text-navy group-hover:gold-glow"
                    )}
                  >
                    {isProcessing ? 'SYNCHRONIZING...' : isClaimed ? 'DEPLOYED' : 'INITIATE FOCUS'}
                  </button>
                  {!isClaimed && (
                    <button className="p-5 bg-navy border border-white/5 rounded-[24px] hover:border-gold/30 hover:text-gold transition-all text-slate-400 group-hover:gold-glow">
                      <ExternalLink size={24} />
                    </button>
                  )}
                </div>
                
                <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-gold/5 rounded-full blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
