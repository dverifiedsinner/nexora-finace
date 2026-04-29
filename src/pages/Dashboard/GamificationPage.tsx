import { useState, useEffect } from 'react';
import { 
  RotateCw, 
  Trophy, 
  Gamepad2, 
  Dice5,
  TrendingUp,
  History,
  Zap,
  Target,
  Users,
  Timer,
  X,
  Play
} from 'lucide-react';
import { cn, formatCurrency } from '../../lib/utils';
import { toast } from 'react-hot-toast';
import { motion, AnimatePresence } from 'motion/react';
import { supabase } from '../../lib/supabase';

const VIRTUAL_GAMES = [
  { id: 'v1', league: 'SkillVest Premier', home: 'Lagos Lions', away: 'Abuja Aces', odds: { home: 2.1, draw: 3.2, away: 2.5 } },
  { id: 'v2', league: 'SkillVest Premier', home: 'Kano Kings', away: 'Enugu Eagles', odds: { home: 1.8, draw: 3.4, away: 2.9 } },
  { id: 'v3', league: 'SkillVest Premier', home: 'Ibadan Iron', away: 'Jos Jets', odds: { home: 2.4, draw: 3.1, away: 2.3 } },
  { id: 'v4', league: 'Champions Alpha', home: 'Portharcourt Pros', away: 'Benin Bulls', odds: { home: 1.5, draw: 4.2, away: 5.1 } },
  { id: 'v5', league: 'Champions Alpha', home: 'Owerri Owls', away: 'Kaduna Knights', odds: { home: 2.0, draw: 3.3, away: 2.7 } },
];

interface GamificationPageProps {
  user: any;
  refreshProfile: () => Promise<void>;
}

export default function GamificationPage({ user, refreshProfile }: GamificationPageProps) {
  const [isSpinning, setIsSpinning] = useState(false);
  const [spinResult, setSpinResult] = useState<string | null>(null);
  
  // Virtual Sports State
  const [betSlip, setBetSlip] = useState<{id: string, selection: string, odds: number, teams: string}[]>([]);
  const [stake, setStake] = useState<string>('100');
  const [isProcessing, setIsProcessing] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [result, setResult] = useState<{won: boolean, amount: number, details: string[]} | null>(null);

  const totalOdds = betSlip.reduce((acc, curr) => acc * curr.odds, 1);
  const potentialWin = parseFloat(stake || '0') * totalOdds;

  const toggleSelection = (game: any, selection: string, odds: number) => {
    const existing = betSlip.find(s => s.id === game.id);
    if (existing && existing.selection === selection) {
      setBetSlip(betSlip.filter(s => s.id !== game.id));
    } else {
      const newSelection = { 
        id: game.id, 
        selection, 
        odds, 
        teams: `${game.home} vs ${game.away}` 
      };
      setBetSlip([...betSlip.filter(s => s.id !== game.id), newSelection]);
    }
  };

  const handlePlaceBet = async () => {
    if (betSlip.length === 0) {
      toast.error('Select at least one game!');
      return;
    }
    const stakeNum = parseFloat(stake);
    if (isNaN(stakeNum) || stakeNum < 100) {
      toast.error('Minimum stake is ₦100');
      return;
    }
    const totalBalance = user.wallet.main + user.wallet.bonus;
    if (totalBalance < stakeNum) {
      toast.error('Insufficient capital block!');
      return;
    }

    setIsProcessing(true);
    
    try {
      // 1. Deduct stake
      const newWallet = { ...user.wallet };
      if (newWallet.main >= stakeNum) {
        newWallet.main -= stakeNum;
      } else {
        const remaining = stakeNum - newWallet.main;
        newWallet.main = 0;
        newWallet.bonus -= remaining;
      }

      const { error: walletError } = await supabase
        .from('profiles')
        .update({ wallet: newWallet })
        .eq('id', user.id);

      if (walletError) throw walletError;

      await refreshProfile();
      setResult(null);
      setCountdown(30);
    } catch (error: any) {
      toast.error(error.message || 'Transaction Error');
      setIsProcessing(false);
    }
  };

  useEffect(() => {
    let timer: any;
    if (countdown !== null && countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (countdown === 0) {
      handleBetResult();
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  const handleBetResult = async () => {
    const won = Math.random() > 0.7; // 30% win chance for demo
    const winAmount = won ? potentialWin : 0;
    
    const gameDetails = betSlip.map(s => {
      const game = VIRTUAL_GAMES.find(g => g.id === s.id);
      const actual = ['HOME', 'DRAW', 'AWAY'][Math.floor(Math.random() * 3)];
      return `${game?.home} vs ${game?.away}: ${actual} (${actual === s.selection ? '✅' : '❌'})`;
    });

    if (won) {
      try {
        const newWallet = { ...user.wallet };
        newWallet.main += winAmount;

        await supabase
          .from('profiles')
          .update({ wallet: newWallet })
          .eq('id', user.id);
        
        await refreshProfile();
        toast.success(`BOOM! You won ${formatCurrency(winAmount)}!`, { duration: 5000, icon: '🔥' });
      } catch (err) {
        console.error('Error crediting win:', err);
      }
    } else {
      toast.error('Ouch! Better luck in the next round.');
    }

    setResult({
      won,
      amount: winAmount,
      details: gameDetails
    });
    setIsProcessing(false);
    setCountdown(null);
    setBetSlip([]);
  };

  const handleSpin = async () => {
    if (user.wallet.bonus < 100) {
      toast.error('Insufficient bonus funds! Minimum ₦100 required per spin.');
      return;
    }
    
    setIsSpinning(true);
    setSpinResult(null);
    
    try {
      // 1. Deduct 100 from bonus
      const newWallet = { ...user.wallet };
      newWallet.bonus -= 100;

      await supabase
        .from('profiles')
        .update({ wallet: newWallet })
        .eq('id', user.id);

      // Simulating spin animation delay
      await new Promise(resolve => setTimeout(resolve, 3000));

      const results = ['₦500 Cash', '₦1000 Bonus', 'Free Course', 'Try Again', '₦250 Referral'];
      const win = results[Math.floor(Math.random() * results.length)];
      
      // Credit reward
      if (win.includes('Cash')) {
        newWallet.main += 500;
        await supabase.from('profiles').update({ wallet: newWallet }).eq('id', user.id);
      } else if (win.includes('Bonus')) {
        newWallet.bonus += 1000;
        await supabase.from('profiles').update({ wallet: newWallet }).eq('id', user.id);
      } else if (win.includes('Referral')) {
        newWallet.referral += 250;
        await supabase.from('profiles').update({ wallet: newWallet }).eq('id', user.id);
      }

      await refreshProfile();
      setSpinResult(win);
      if (win === 'Try Again') toast.error('Better luck next time!');
      else toast.success(`Congratulations! You won ${win}`, { icon: '🎉' });
    } catch (error: any) {
      toast.error('Spin Failed');
    } finally {
      setIsSpinning(false);
    }
  };

  return (
    <div className="space-y-12 pb-32 px-4 sm:px-0">
      {/* Header */}
      <div className="bg-navy rounded-[40px] sm:rounded-[48px] p-8 sm:p-14 text-white relative overflow-hidden shadow-2xl border border-white/5">
         <div className="relative z-10">
            <div className="flex flex-col sm:flex-row sm:items-end gap-3 sm:gap-4 mb-4">
              <h1 className="text-3xl sm:text-7xl font-display font-black uppercase italic tracking-tighter leading-none">
                Virtual <span className="text-gold">Sports</span>
              </h1>
              <div className="bg-gold text-navy font-display font-black text-[8px] sm:text-[10px] px-4 py-1.5 sm:px-4 sm:py-2 rounded-full gold-glow animate-pulse w-fit sm:translate-y-[-10px]">
                 5X REWARD PROTOCOL ACTIVE
              </div>
            </div>
            <p className="text-slate-400 font-bold uppercase text-[8px] sm:text-[10px] tracking-[0.3em] sm:tracking-[0.4em] max-w-lg">Instant 30-second cycles / Multipliers up to 100X</p>
         </div>
         <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-[120px] -mr-32 -mt-32" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Games List */}
        <div className="lg:col-span-8 space-y-8">
          <div className="flex items-center justify-between px-4">
            <h2 className="text-2xl font-display font-black uppercase italic tracking-widest text-white">Live Fixtures</h2>
            <div className="flex items-center gap-3 bg-gold/10 text-gold px-6 py-2 rounded-full text-[10px] font-display font-bold uppercase tracking-widest border border-gold/20 animate-pulse">
               <Zap size={16} /> Beta Feed
            </div>
          </div>

          <div className="space-y-6">
            {VIRTUAL_GAMES.map((game) => (
              <div key={game.id} className="bg-navy p-8 rounded-[48px] border border-white/5 shadow-2xl group transition-all hover:border-gold/20">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-[10px] font-display font-bold text-slate-500 uppercase tracking-[0.3em]">{game.league}</span>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                    <span className="text-[10px] font-display font-bold text-emerald-500 uppercase">Live</span>
                  </div>
                </div>
                <div className="grid grid-cols-3 items-center gap-6 text-center">
                  <div className="text-lg font-display font-black text-white uppercase tracking-tight italic">{game.home}</div>
                  <div className="text-xs font-display font-black text-gold italic uppercase bg-gold/5 py-2 rounded-xl border border-gold/5">vs</div>
                  <div className="text-lg font-display font-black text-white uppercase tracking-tight italic">{game.away}</div>
                </div>
                <div className="grid grid-cols-3 gap-3 mt-8">
                  {[
                    { key: 'home', label: '1', odds: game.odds.home, selection: 'HOME' },
                    { key: 'draw', label: 'X', odds: game.odds.draw, selection: 'DRAW' },
                    { key: 'away', label: '2', odds: game.odds.away, selection: 'AWAY' }
                  ].map(opt => (
                    <button 
                      key={opt.key}
                      onClick={() => toggleSelection(game, opt.selection, opt.odds)}
                      className={cn(
                        "flex flex-col items-center py-4 rounded-[24px] border-2 transition-all active:scale-95",
                        betSlip.find(s => s.id === game.id && s.selection === opt.selection)
                          ? "bg-gold border-gold text-navy shadow-[0_0_30px_rgba(255,184,0,0.3)] scale-105"
                          : "bg-navy-light border-transparent text-slate-400 hover:border-gold/40 hover:text-white"
                      )}
                    >
                      <span className="text-[10px] font-display font-black mb-1 opacity-60 uppercase">{opt.label}</span>
                      <span className="text-lg font-display font-black tracking-tighter italic">{opt.odds.toFixed(2)}</span>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bet Slip / Results Overlay */}
        <div className="lg:col-span-4">
          <div className="sticky top-24 space-y-8">
            <div className="bg-navy rounded-[48px] border border-white/5 p-10 shadow-2xl relative overflow-hidden">
              <div className="flex items-center justify-between mb-10">
                 <h3 className="text-2xl font-display font-black uppercase text-white italic">Bet Slip</h3>
                 <span className="bg-gold text-navy px-4 py-1.5 rounded-full text-[10px] font-display font-black uppercase tracking-widest">{betSlip.length} Picks</span>
              </div>

              {betSlip.length === 0 ? (
                <div className="py-20 text-center">
                   <Target size={64} className="mx-auto text-white/5 mb-6" />
                   <p className="text-slate-500 font-display font-bold text-xs uppercase tracking-[0.4em]">Empty Protocol</p>
                </div>
              ) : (
                <div className="space-y-5 mb-10 max-h-[300px] overflow-y-auto custom-scrollbar pr-2">
                   {betSlip.map(bet => (
                     <div key={bet.id} className="bg-navy-light p-5 rounded-[24px] flex justify-between items-center border border-white/10 group">
                        <div className="min-w-0">
                           <p className="text-[10px] font-display font-black text-white truncate uppercase tracking-tight">{bet.teams}</p>
                           <p className="text-[10px] font-display font-bold text-gold uppercase tracking-[0.2em] mt-1">{bet.selection} @ {bet.odds.toFixed(2)}</p>
                        </div>
                        <button onClick={() => setBetSlip(betSlip.filter(s => s.id !== bet.id))} className="text-slate-500 hover:text-red-500 transition-colors">
                           <X size={20} />
                        </button>
                     </div>
                   ))}
                </div>
              )}

              <div className="space-y-6 pt-10 border-t border-white/5">
                 <div className="flex justify-between items-center text-xs font-display font-bold uppercase tracking-[0.4em] text-slate-500">
                    <span>Total Multiplier</span>
                    <span className="text-gold font-black italic text-lg">{totalOdds.toFixed(2)}X</span>
                 </div>
                 
                 <div className="relative">
                    <input 
                      type="number" 
                      value={stake}
                      onChange={(e) => setStake(e.target.value)}
                      placeholder="Stake Amount"
                      className="w-full bg-navy-light border border-white/10 rounded-3xl py-5 flex-1 px-12 text-lg font-display font-black text-white focus:outline-none focus:border-gold transition-all"
                    />
                    <div className="absolute left-5 top-1/2 -translate-y-1/2 font-display font-black text-gold italic">₦</div>
                 </div>

                 <div className="bg-gold/5 p-6 rounded-[32px] border border-gold/10">
                    <p className="text-[10px] font-display font-bold text-gold/60 uppercase tracking-[0.5em] mb-2 text-center">Projected Returns</p>
                    <h4 className="text-3xl font-display font-black text-gold text-center italic tracking-tighter drop-shadow-[0_0_15px_rgba(255,184,0,0.4)]">{formatCurrency(potentialWin)}</h4>
                 </div>

                 <button 
                   onClick={handlePlaceBet}
                   disabled={isProcessing || betSlip.length === 0}
                   className="w-full py-6 gold-gradient text-navy rounded-3xl font-display font-black uppercase text-xs tracking-[0.3em] hover:scale-105 transition-all flex items-center justify-center gap-4 disabled:opacity-30 gold-glow"
                 >
                   {isProcessing ? 'Transacting...' : 'Confirm Wager'}
                   <Play size={20} />
                 </button>
              </div>
            </div>

            {/* Countdown Overlay */}
            <AnimatePresence>
               {countdown !== null && (
                 <motion.div 
                   initial={{ opacity: 0, scale: 0.9 }}
                   animate={{ opacity: 1, scale: 1 }}
                   exit={{ opacity: 0, scale: 0.9 }}
                   className="bg-navy text-white rounded-[48px] p-12 text-center border-4 border-gold shadow-[0_0_100px_rgba(255,184,0,0.2)] relative z-50 overflow-hidden"
                 >
                    <div className="relative z-10">
                       <h4 className="text-xs font-display font-bold uppercase tracking-[0.5em] mb-6 text-gold">Algorithm Match</h4>
                       <div className="text-8xl font-display font-black italic tracking-tighter mb-6 text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]">{countdown}s</div>
                       <p className="text-[10px] font-display font-bold text-slate-500 uppercase tracking-[0.3em]">Synthesizing Results...</p>
                    </div>
                    <div className="absolute top-0 left-0 w-full h-full bg-gold/5 animate-pulse" />
                 </motion.div>
               )}
            </AnimatePresence>

            {/* Result Display */}
            {result && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={cn(
                  "rounded-[48px] p-10 border-4 text-center shadow-2xl",
                  result.won ? "bg-emerald-500/10 border-emerald-500 text-emerald-400" : "bg-red-500/10 border-red-500 text-red-400"
                )}
              >
                 <Trophy size={64} className={cn("mx-auto mb-6", result.won ? "text-emerald-400" : "text-red-400")} />
                 <h4 className="text-4xl font-display font-black uppercase italic tracking-tighter mb-3">{result.won ? 'Winner!' : 'Loss'}</h4>
                 <p className="text-sm font-display font-bold opacity-70 mb-8 uppercase tracking-widest">{result.won ? `Credited ${formatCurrency(result.amount)}` : 'Initiate New Cycle'}</p>
                 <div className="space-y-2 text-[10px] font-display font-bold uppercase tracking-widest opacity-60">
                    {result.details.map((d, i) => <p key={i}>{d}</p>)}
                 </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Bonus Spin (Keep it as a secondary module) */}
      <div className="bg-navy rounded-[64px] p-16 border border-white/5 shadow-2xl text-center relative overflow-hidden">
         <div className="relative z-10">
            <h3 className="text-4xl font-display font-black uppercase italic tracking-tighter mb-16 leading-none">
              Nexus <span className="text-gold">Jackpot</span> Wheel
            </h3>
            <div className="flex flex-col items-center">
               <motion.div 
                  animate={isSpinning ? { rotate: 360 * 5 } : { rotate: 0 }}
                  transition={{ duration: 3, ease: "circIn" }}
                  className="w-72 h-72 sm:w-80 sm:h-80 rounded-full border-[12px] border-navy-light relative mb-16 overflow-hidden shadow-[0_0_100px_rgba(255,184,0,0.1)] gold-glow"
               >
                  <div className="absolute inset-0 bg-[conic-gradient(from_0deg,#FFB800_0_90deg,#0A0F1E_90deg_180deg,#FFB800_180deg_270deg,#0A0F1E_270deg_360deg)] opacity-80" />
                  <div className="absolute inset-0 flex items-center justify-center">
                     <div className="w-16 h-16 bg-white rounded-full shadow-2xl relative z-10 flex items-center justify-center">
                        <Zap size={24} className="text-navy" />
                     </div>
                  </div>
               </motion.div>
               <button 
                 onClick={handleSpin}
                 disabled={isSpinning}
                 className="gold-gradient text-navy px-16 py-6 rounded-3xl font-display font-black uppercase text-sm tracking-[0.4em] hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-gold/20 gold-glow disabled:opacity-30"
               >
                 {isProcessing ? 'Processing Transaction...' : 'Initiate Spin: ₦100'}
               </button>
               {spinResult && (
                 <motion.p 
                   initial={{ opacity: 0, y: 10 }}
                   animate={{ opacity: 1, y: 0 }}
                   className="mt-12 text-3xl font-display font-black text-gold uppercase italic tracking-widest"
                 >
                   Reward Block: {spinResult}
                 </motion.p>
               )}
            </div>
         </div>
         <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-gold/5 rounded-full blur-[100px]" />
      </div>
    </div>
  );
}
