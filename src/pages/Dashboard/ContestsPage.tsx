import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Trophy, 
  Ticket, 
  Users, 
  Timer, 
  Sparkles, 
  Gift, 
  ChevronRight,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { cn, formatCurrency } from '../../lib/utils';
import { toast } from 'react-hot-toast';

const RAFFLES = [
  {
    id: 'raffle-1',
    title: 'Nexus Prime Draw',
    prize: '₦50,000 Cash',
    entryFee: 500,
    participants: 124,
    endsIn: '02:45:12',
    image: 'https://images.unsplash.com/photo-1621504450181-55abc870e7d6?q=80&w=600&auto=format&fit=crop',
    gradient: 'from-gold/20'
  },
  {
    id: 'raffle-2',
    title: 'Executive Tech Bundle',
    prize: 'iPhone 15 Pro Max',
    entryFee: 2000,
    participants: 89,
    endsIn: '05:12:30',
    image: 'https://images.unsplash.com/photo-1616348436168-de43ad0db179?q=80&w=600&auto=format&fit=crop',
    gradient: 'from-blue-500/20'
  }
];

const CONTESTS = [
  {
    id: 'contest-1',
    title: 'Highest Earner Weekly',
    reward: '₦100,000 Pool',
    status: 'Live',
    metric: 'Earnings',
    players: 450,
    endsIn: '2 Days'
  },
  {
    id: 'contest-2',
    title: 'Referral Alpha Protocol',
    reward: '₦250,000 Multiplier',
    status: 'Starting Soon',
    metric: 'Ref Count',
    players: 0,
    endsIn: '4 Days'
  }
];

export default function ContestsPage({ user }: { user: any }) {
  const [activeType, setActiveType] = useState<'raffle' | 'contest'>('raffle');

  const handleEnterRaffle = (raffle: any) => {
    const totalBalance = user.wallet.main + user.wallet.bonus;
    if (totalBalance < raffle.entryFee) {
      toast.error('Insufficient capital for entry ticket');
      return;
    }
    toast.success(`Protocol Initiated: Entered ${raffle.title}`);
  };

  return (
    <div className="space-y-12 pb-32">
      {/* Dynamic Header */}
      <div className="bg-navy rounded-[40px] sm:rounded-[56px] p-8 sm:p-16 text-white relative overflow-hidden shadow-2xl border border-white/5">
         <div className="relative z-10">
            <div className="bg-gold/10 text-gold border border-gold/20 px-4 py-2 rounded-full text-[8px] sm:text-[10px] font-display font-black tracking-[0.4em] mb-8 inline-block animate-pulse">
               GLOBAL REWARD MATRIX ACTIVE
            </div>
            <h1 className="text-4xl sm:text-8xl font-display font-black uppercase italic tracking-tighter leading-none mb-6">
              Mega <span className="text-gold">Draws</span>
            </h1>
            <p className="text-slate-400 font-bold uppercase text-[10px] sm:text-xs tracking-[0.4em] max-w-xl leading-relaxed">
              Participate in high-yield raffles and skill-based contests to multiply your capital block.
            </p>
         </div>

         {/* Abstract background elements */}
         <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[120px] -mr-48 -mt-48" />
         <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-500/5 rounded-full blur-[100px] -ml-20 -mb-20" />
      </div>

      {/* Navigation Tabs */}
      <div className="flex gap-4 p-2 bg-navy rounded-[32px] border border-white/5 w-fit mx-auto sm:mx-0">
        <button 
          onClick={() => setActiveType('raffle')}
          className={cn(
            "px-8 py-4 rounded-[24px] font-display font-black uppercase text-[10px] tracking-widest transition-all",
            activeType === 'raffle' ? "bg-gold text-navy gold-glow shadow-xl" : "text-slate-500 hover:text-white"
          )}
        >
          Active Raffles
        </button>
        <button 
          onClick={() => setActiveType('contest')}
          className={cn(
            "px-8 py-4 rounded-[24px] font-display font-black uppercase text-[10px] tracking-widest transition-all",
            activeType === 'contest' ? "bg-gold text-navy gold-glow shadow-xl" : "text-slate-500 hover:text-white"
          )}
        >
          Special Contests
        </button>
      </div>

      {/* Content Feed */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {activeType === 'raffle' ? (
          RAFFLES.map((raffle) => (
            <motion.div 
              key={raffle.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-navy rounded-[48px] border border-white/5 overflow-hidden group hover:border-gold/30 transition-all shadow-2xl"
            >
              <div className="relative h-64 overflow-hidden">
                 <img src={raffle.image} alt={raffle.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                 <div className={cn("absolute inset-0 bg-gradient-to-t from-navy via-transparent to-transparent opacity-80", raffle.gradient)} />
                 <div className="absolute top-6 right-6 bg-navy/80 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/10 flex items-center gap-3">
                    <Timer size={16} className="text-gold" />
                    <span className="text-white font-display font-bold text-xs tabular-nums">{raffle.endsIn}</span>
                 </div>
                 <div className="absolute bottom-6 left-8">
                    <h3 className="text-2xl font-display font-black text-white italic tracking-tighter uppercase leading-none mb-2">{raffle.title}</h3>
                    <div className="flex gap-4">
                       <div className="flex items-center gap-2 text-slate-400 text-[10px] uppercase font-bold tracking-widest">
                          <Users size={12} />
                          {raffle.participants} Entities
                       </div>
                    </div>
                 </div>
              </div>
              
              <div className="p-8 sm:p-12 space-y-8">
                 <div className="grid grid-cols-2 gap-6">
                    <div className="p-6 bg-navy-light/40 rounded-3xl border border-white/5">
                       <p className="text-slate-500 text-[8px] font-bold uppercase tracking-widest mb-1">Grand Reward</p>
                       <p className="text-xl font-display font-black text-gold italic tracking-tighter whitespace-nowrap">{raffle.prize}</p>
                    </div>
                    <div className="p-6 bg-navy-light/40 rounded-3xl border border-white/5">
                       <p className="text-slate-500 text-[8px] font-bold uppercase tracking-widest mb-1">Entry Token</p>
                       <p className="text-xl font-display font-black text-white italic tracking-tighter">{formatCurrency(raffle.entryFee)}</p>
                    </div>
                 </div>

                 <button 
                   onClick={() => handleEnterRaffle(raffle)}
                   className="w-full gold-gradient text-navy py-6 rounded-3xl font-display font-black uppercase text-xs tracking-[0.4em] shadow-xl gold-glow active:scale-95 transition-all flex items-center justify-center gap-4"
                 >
                    <Ticket size={20} />
                    Secure Entry Matrix
                 </button>
              </div>
            </motion.div>
          ))
        ) : (
          CONTESTS.map((contest) => (
            <motion.div 
              key={contest.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-navy-light/30 rounded-[48px] border border-white/5 p-8 sm:p-12 relative overflow-hidden backdrop-blur-sm group hover:border-gold/20 transition-all shadow-xl"
            >
              <div className="relative z-10">
                 <div className="flex justify-between items-start mb-10">
                    <div className="w-16 h-16 bg-navy rounded-2xl flex items-center justify-center gold-glow border border-gold/30">
                       <Trophy size={28} className="text-gold" />
                    </div>
                    <div className={cn(
                      "px-4 py-2 rounded-full font-display font-black text-[8px] tracking-[0.3em] uppercase",
                      contest.status === 'Live' ? "bg-emerald-500 text-navy animate-pulse" : "bg-slate-700 text-slate-400"
                    )}>
                      {contest.status}
                    </div>
                 </div>

                 <h3 className="text-3xl font-display font-black text-white italic tracking-tighter uppercase leading-none mb-4">{contest.title}</h3>
                 <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-10">Reward Pool: <span className="text-gold">{contest.reward}</span></p>

                 <div className="space-y-4 mb-10">
                    <div className="flex justify-between text-[10px] font-bold uppercase tracking-[0.2em]">
                       <span className="text-slate-500">Metric: {contest.metric}</span>
                       <span className="text-white">{contest.players} Active Agents</span>
                    </div>
                    <div className="h-2 w-full bg-navy rounded-full overflow-hidden border border-white/5">
                       <div className="h-full bg-gold gold-glow-sm w-[65%]" />
                    </div>
                 </div>

                 <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                       <Timer size={14} className="text-gold" />
                       <span className="text-white font-display font-bold text-xs uppercase italic">{contest.endsIn} Remaining</span>
                    </div>
                    <button className="text-gold font-display font-black text-[10px] uppercase tracking-widest flex items-center gap-2 group/btn">
                       Enter Arena <ChevronRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                 </div>
              </div>
              <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 rounded-full blur-[80px] -mr-32 -mt-32 opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          ))
        )}
      </div>

      {/* Security Banner */}
      <div className="bg-gold p-8 sm:p-12 rounded-[48px] shadow-2xl gold-glow flex flex-col sm:flex-row items-center gap-8 justify-between">
         <div className="flex items-center gap-8">
            <div className="w-20 h-20 bg-navy rounded-3xl flex items-center justify-center shadow-2xl">
               <ShieldCheck size={40} className="text-gold" />
            </div>
            <div>
               <h4 className="text-navy text-2xl sm:text-3xl font-display font-black italic tracking-tighter uppercase leading-none mb-2">Fair Play Matrix</h4>
               <p className="text-navy/70 font-bold uppercase text-[8px] sm:text-[10px] tracking-widest">Autonomous verification active. Every draw is provably fair.</p>
            </div>
         </div>
         <button className="bg-navy text-gold px-10 py-5 rounded-2xl font-display font-black uppercase text-[10px] tracking-widest active:scale-95 transition-all">
            See Protocols
         </button>
      </div>
    </div>
  );
}
