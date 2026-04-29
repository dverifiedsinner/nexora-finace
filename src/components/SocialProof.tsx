import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { User, TrendingUp, Wallet, CheckCircle2, Trophy, RotateCcw } from 'lucide-react';
import { cn, formatCurrency } from '../lib/utils';

type NotificationType = 'registration' | 'withdrawal' | 'earning' | 'spin_win' | 'predict_win';

interface Notification {
  id: number;
  user: string;
  type: NotificationType;
  amount?: number;
  time: string;
}

const USERS = ['Ade', 'Chioma', 'Musa', 'Emeka', 'Fatima', 'Bisi', 'Uche', 'Sani', 'Ibrahim', 'Gloria', 'Amara', 'Tunde'];
const ACTIONS: NotificationType[] = ['registration', 'withdrawal', 'earning', 'spin_win', 'predict_win'];

export default function SocialProof() {
  const [notification, setNotification] = useState<Notification | null>(null);

  const getBadge = (type: string) => {
    switch(type) {
      case 'registration': return { text: 'NEW', color: 'bg-blue-500' };
      case 'earning': return { text: 'PAID', color: 'bg-emerald-500' };
      case 'spin_win': return { text: 'JACKPOT', color: 'bg-amber-500' };
      case 'predict_win': return { text: '5X WIN', color: 'bg-gold text-navy' };
      case 'withdrawal': return { text: 'SETTLED', color: 'bg-slate-500' };
      default: return { text: 'LIVE', color: 'bg-gold text-navy' };
    }
  };

  useEffect(() => {
    const showNotification = () => {
      const user = USERS[Math.floor(Math.random() * USERS.length)];
      const type = ACTIONS[Math.floor(Math.random() * ACTIONS.length)];
      
      let amount: number | undefined;
      if (type === 'registration') {
        amount = undefined;
      } else if (type === 'spin_win') {
        amount = [5000, 10000, 20000, 50000][Math.floor(Math.random() * 4)];
      } else if (type === 'predict_win') {
        amount = Math.floor(Math.random() * 100000) + 5000;
      } else {
        amount = Math.floor(Math.random() * 50000) + 2500;
      }
      
      const newNotif: Notification = {
        id: Date.now(),
        user,
        type,
        amount,
        time: 'Just now'
      };

      setNotification(newNotif);

      // Hide after 3.5 seconds
      setTimeout(() => {
        setNotification(null);
      }, 3500);
    };

    // Initial sequence
    const initialDelay = setTimeout(showNotification, 2000);

    // Show more frequently every 5-7 seconds
    const interval = setInterval(showNotification, Math.floor(Math.random() * 2000) + 5000);

    return () => {
      clearTimeout(initialDelay);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="fixed bottom-24 sm:bottom-12 left-4 sm:left-12 z-[100] max-w-[280px] sm:max-w-sm pointer-events-none">
      <AnimatePresence>
        {notification && (
          <motion.div
            key={notification.id}
            initial={{ x: -100, opacity: 0, scale: 0.8 }}
            animate={{ x: 0, opacity: 1, scale: 1 }}
            exit={{ x: -100, opacity: 0, scale: 0.8 }}
            className="bg-navy/80 backdrop-blur-2xl border-2 border-white/10 p-5 rounded-[32px] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.8)] flex items-center gap-5 pointer-events-auto gold-glow relative group overflow-hidden"
          >
            {/* Shimmer overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

            <div className={cn(
              "w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 border border-white/5 relative z-10",
              notification.type === 'registration' ? "bg-gold text-navy" :
              notification.type === 'earning' ? "bg-emerald-500 text-navy" :
              notification.type === 'spin_win' ? "bg-amber-500 text-navy" :
              notification.type === 'predict_win' ? "bg-gold text-navy" : "bg-gold text-navy"
            )}>
              {notification.type === 'registration' && <User size={28} className="font-bold" />}
              {notification.type === 'earning' && <TrendingUp size={28} />}
              {notification.type === 'spin_win' && <RotateCcw size={28} className="animate-spin-slow" />}
              {notification.type === 'predict_win' && <Trophy size={28} />}
              {notification.type === 'withdrawal' && <Wallet size={28} />}
            </div>
            
            <div className="flex-1 min-w-0 relative z-10">
               <div className="flex items-center justify-between mb-1">
                 <div className="flex items-center gap-2">
                   <p className="text-sm font-display font-black text-white truncate uppercase italic tracking-wider">{notification.user}***</p>
                   <div className={cn("px-2 py-0.5 rounded text-[8px] font-display font-black text-white", getBadge(notification.type).color)}>
                       {getBadge(notification.type).text}
                    </div>
                 </div>
                 <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse border border-white/20" />
               </div>
               <p className="text-[10px] text-slate-400 font-bold leading-tight uppercase tracking-widest mt-1">
                 {notification.type === 'registration' && 'DEPLOYED SKILLVEST'}
                 {notification.type === 'earning' && `HARVESTED ${formatCurrency(notification.amount || 0)}`}
                 {notification.type === 'spin_win' && `HIT JACKPOT: ${formatCurrency(notification.amount || 0)}!`}
                 {notification.type === 'predict_win' && `5X MULTIPLIER: ${formatCurrency(notification.amount || 0)}`}
                 {notification.type === 'withdrawal' && `SETTLED ${formatCurrency(notification.amount || 0)} TO BANK`}
               </p>
               <p className="text-[8px] text-gold font-display font-black uppercase tracking-[0.3em] mt-2 opacity-80">Network Verified Trans.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
