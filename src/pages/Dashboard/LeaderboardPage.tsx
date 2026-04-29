import React from 'react';
import { motion } from 'motion/react';
import { 
  Trophy, 
  TrendingUp, 
  Users, 
  Medal, 
  Zap, 
  Target,
  ArrowUp,
  Star
} from 'lucide-react';
import { cn, formatCurrency } from '../../lib/utils';

const LEADERBOARD_DATA = [
  { rank: 1, name: 'Nexus_Alpha', earnings: 1250000, operations: 450, growth: '+25%', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alpha' },
  { rank: 2, name: 'Void_Runner', earnings: 980000, operations: 312, growth: '+12%', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Void' },
  { rank: 3, name: 'Zion_Collector', earnings: 850000, operations: 289, growth: '+18%', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Zion' },
  { rank: 4, name: 'Neon_Pulse', earnings: 720000, operations: 210, growth: '+5%', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Neon' },
  { rank: 5, name: 'Cyber_Oracle', earnings: 680000, operations: 195, growth: '+31%', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Cyber' },
  { rank: 6, name: 'Delta_Node', earnings: 540000, operations: 156, growth: '+8%', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Delta' },
  { rank: 7, name: 'Star_Walker', earnings: 490000, operations: 142, growth: '+15%', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Star' },
];

export default function LeaderboardPage() {
  return (
    <div className="space-y-12 pb-32">
      {/* Dynamic Header */}
      <div className="bg-navy rounded-[40px] sm:rounded-[56px] p-8 sm:p-14 text-white relative overflow-hidden shadow-2xl border border-white/5">
         <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
            <div>
               <div className="bg-gold/10 text-gold border border-gold/20 px-4 py-2 rounded-full text-[8px] sm:text-[10px] font-display font-black tracking-[0.4em] mb-6 inline-block">
                  PERFORMANCE INDEX: ALPHA-9
               </div>
               <h1 className="text-4xl sm:text-7xl font-display font-black uppercase italic tracking-tighter leading-none mb-6">
                 Top <span className="text-gold">Earners</span>
               </h1>
               <p className="text-slate-400 font-bold uppercase text-[10px] sm:text-xs tracking-[0.4em] max-w-lg">
                 The elite 1% of the Nexus protocol network.
               </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
               <div className="bg-navy-light/40 border border-white/5 p-6 rounded-3xl text-center">
                  <p className="text-slate-500 font-bold uppercase text-[8px] tracking-widest mb-2">Total Yield</p>
                  <p className="text-2xl font-display font-black text-white italic tracking-tighter">₦12.5M</p>
               </div>
               <div className="bg-navy-light/40 border border-white/5 p-6 rounded-3xl text-center">
                  <p className="text-slate-500 font-bold uppercase text-[8px] tracking-widest mb-2">Active Agents</p>
                  <p className="text-2xl font-display font-black text-gold italic tracking-tighter">4,500+</p>
               </div>
               <div className="bg-gold p-6 rounded-3xl text-center shadow-xl gold-glow hidden sm:block">
                  <p className="text-navy/60 font-bold uppercase text-[8px] tracking-widest mb-2">Network Rank</p>
                  <p className="text-2xl font-display font-black text-navy italic tracking-tighter">Tier 1</p>
               </div>
            </div>
         </div>
         <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gold/5 rounded-full blur-[100px] -mr-32 -mt-32" />
      </div>

      {/* Top 3 Podium */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4 sm:px-0">
        {[LEADERBOARD_DATA[1], LEADERBOARD_DATA[0], LEADERBOARD_DATA[2]].map((player, idx) => (
          <motion.div 
            key={player.name}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1 }}
            className={cn(
               "relative p-1 rounded-[48px] overflow-hidden group transition-all duration-500",
               idx === 1 ? "md:-translate-y-8 gold-gradient shadow-[0_0_100px_rgba(255,184,0,0.2)]" : "bg-white/5 border border-white/10"
            )}
          >
             <div className="bg-navy w-full h-full rounded-[44px] p-10 flex flex-col items-center text-center">
                <div className="relative mb-8">
                   <div className={cn(
                     "w-24 h-24 sm:w-32 sm:h-32 rounded-full p-1 bg-navy transition-transform duration-500 group-hover:scale-110",
                     idx === 1 ? "border-4 border-gold shadow-lg" : "border-2 border-white/10"
                   )}>
                      <img src={player.avatar} alt={player.name} className="w-full h-full rounded-full" />
                   </div>
                   <div className={cn(
                      "absolute -bottom-2 -right-2 w-10 h-10 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center border-2 border-navy font-display font-black text-lg sm:text-xl italic translate-y-2",
                      idx === 1 ? "bg-gold text-navy" : "bg-navy-light text-slate-400"
                   )}>
                      {idx === 0 ? 2 : idx === 1 ? 1 : 3}
                   </div>
                </div>

                <h3 className="text-xl sm:text-2xl font-display font-black text-white uppercase italic tracking-tighter mb-2">{player.name}</h3>
                <p className="text-gold font-display font-black text-2xl sm:text-3xl italic tracking-tighter mb-6">{formatCurrency(player.earnings)}</p>
                
                <div className="flex gap-4 w-full">
                   <div className="flex-1 p-3 bg-navy-light/50 rounded-2xl border border-white/5">
                      <p className="text-[8px] font-bold text-slate-500 uppercase tracking-widest mb-1">Ops</p>
                      <p className="text-xs font-display font-black text-white italic">{player.operations}</p>
                   </div>
                   <div className="flex-1 p-3 bg-navy-light/50 rounded-2xl border border-white/5">
                      <p className="text-[8px] font-bold text-slate-500 uppercase tracking-widest mb-1">Growth</p>
                      <p className="text-xs font-display font-black text-emerald-500 italic">{player.growth}</p>
                   </div>
                </div>
             </div>
             {idx === 1 && <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-navy px-4 py-1.2 rounded-full border border-gold/30 text-gold font-display font-black text-[8px] tracking-[0.4em] uppercase shadow-lg">Matrix Leader</div>}
          </motion.div>
        ))}
      </div>

      {/* Full List */}
      <div className="bg-navy rounded-[48px] sm:rounded-[64px] border border-white/5 shadow-2xl overflow-hidden">
        <div className="p-8 sm:p-14 border-b border-white/5 bg-navy-light/20">
           <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-navy rounded-2xl flex items-center justify-center border border-white/10">
                 <Target size={24} className="text-slate-500" />
              </div>
              <div>
                 <h2 className="text-2xl font-display font-black text-white italic uppercase tracking-tighter leading-none">Operational <span className="text-gold">Archive</span></h2>
                 <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.4em] mt-2">Historical rank records based on verified yield metrics.</p>
              </div>
           </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/5">
                <th className="px-8 py-8 font-display font-black text-[10px] uppercase tracking-[0.4em] text-slate-500">Rank</th>
                <th className="px-8 py-8 font-display font-black text-[10px] uppercase tracking-[0.4em] text-slate-500">Agent Alias</th>
                <th className="px-8 py-8 font-display font-black text-[10px] uppercase tracking-[0.4em] text-slate-500">Net Yield</th>
                <th className="px-8 py-8 font-display font-black text-[10px] uppercase tracking-[0.4em] text-slate-500">Operations</th>
                <th className="px-8 py-8 font-display font-black text-[10px] uppercase tracking-[0.4em] text-slate-500">Status</th>
              </tr>
            </thead>
            <tbody>
              {LEADERBOARD_DATA.slice(3).map((player) => (
                <tr key={player.rank} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors group">
                  <td className="px-8 py-8">
                     <span className="font-display font-black text-2xl text-slate-600 italic group-hover:text-gold transition-colors">#{player.rank}</span>
                  </td>
                  <td className="px-8 py-8">
                     <div className="flex items-center gap-4">
                        <img src={player.avatar} alt="" className="w-12 h-12 rounded-full border border-white/10 p-0.5" />
                        <span className="font-display font-black text-white uppercase italic tracking-tighter text-lg">{player.name}</span>
                     </div>
                  </td>
                  <td className="px-8 py-8">
                     <span className="font-display font-black text-gold italic tracking-tighter text-xl">{formatCurrency(player.earnings)}</span>
                  </td>
                  <td className="px-8 py-8">
                     <span className="font-display font-black text-white italic text-lg">{player.operations}</span>
                  </td>
                  <td className="px-8 py-8">
                     <div className="flex items-center gap-2 text-emerald-500 font-display font-bold text-[10px] uppercase tracking-widest">
                        <Zap size={14} className="animate-pulse" />
                        {player.growth}
                     </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
