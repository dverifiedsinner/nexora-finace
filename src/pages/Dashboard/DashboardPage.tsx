import { 
  Wallet, 
  Gift, 
  Users, 
  Briefcase, 
  TrendingUp, 
  Activity, 
  Zap, 
  Clock,
  ChevronRight,
  ChevronLeft,
  Star,
  ArrowUpRight,
  ArrowDownLeft,
  Smartphone,
  Globe,
  CreditCard,
  Plus
} from 'lucide-react';
import { cn, formatCurrency } from '../../lib/utils';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';

const mockData = [
  { name: 'Mon', amount: 4000 },
  { name: 'Tue', amount: 3000 },
  { name: 'Wed', amount: 5000 },
  { name: 'Thu', amount: 2780 },
  { name: 'Fri', amount: 1890 },
  { name: 'Sat', amount: 2390 },
  { name: 'Sun', amount: 3490 },
];

const FEATURED_COURSES = [
  {
    id: '1',
    title: 'Advanced Social Media Arbitrage',
    reward: 15000,
    students: 1240,
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80'
  },
  {
    id: '2',
    title: 'Crypto Airdrop Mastery 2024',
    reward: 25000,
    students: 3200,
    image: 'https://images.unsplash.com/photo-1621761191319-c6fb62004009?auto=format&fit=crop&q=80'
  }
];

interface DashboardPageProps {
  user: any;
}

export default function DashboardPage({ user }: DashboardPageProps) {
  const [featuredIndex, setFeaturedIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setFeaturedIndex((prev) => (prev + 1) % FEATURED_COURSES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const wallets = [
    { title: 'Main Wallet', amount: user.wallet.main, icon: Wallet, color: 'bg-gold', text: 'text-navy', shadow: 'shadow-gold/20' },
    { title: 'Bonus Wallet', amount: user.wallet.bonus, icon: Gift, color: 'bg-gold', text: 'text-navy', shadow: 'shadow-gold/20' },
    { title: 'Referral Wallet', amount: user.wallet.referral, icon: Users, color: 'bg-gold', text: 'text-navy', shadow: 'shadow-gold/20' },
    { title: 'Investment Wallet', amount: user.wallet.investment, icon: Briefcase, color: 'bg-gold', text: 'text-navy', shadow: 'shadow-gold/20' },
  ];

  return (
    <div className="space-y-10 sm:space-y-12 pb-32 px-4 sm:px-0">
      {/* Cinematic Hero Banner */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative min-h-[400px] sm:min-h-[600px] rounded-[40px] sm:rounded-[64px] overflow-hidden flex flex-col justify-center items-center text-center px-6 shadow-[0_0_100px_rgba(255,184,0,0.15)] border border-white/5 bg-[#020610]"
      >
        {/* Animated Orbs */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-gold/10 rounded-full blur-[80px] sm:blur-[120px] animate-orb" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 sm:w-80 sm:h-80 bg-blue-600/10 rounded-full blur-[80px] sm:blur-[100px] animate-orb" style={{ animationDelay: '2s' }} />
        
        {/* Floating Coin */}
        <motion.div
          animate={{ y: [0, -20, 0], rotateY: [0, 180, 360] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="relative z-20 mb-6 sm:mb-8"
        >
          <div className="w-24 h-24 sm:w-48 sm:h-48 bg-gold rounded-full flex items-center justify-center shadow-[0_0_60px_rgba(255,184,0,0.4)] gold-glow border-2 sm:border-4 border-gold-light">
             <Star size={40} className="sm:size-16 text-navy" fill="currentColor" />
          </div>
        </motion.div>

        <div className="relative z-20 max-w-4xl px-2">
          <h1 className="text-4xl sm:text-9xl font-display font-black text-white uppercase italic tracking-tighter leading-[0.9] sm:leading-[0.8] mb-6 sm:mb-8 drop-shadow-2xl">
            Nexus <span className="text-gold">Earn</span> <br /> Protocol
          </h1>
          <p className="text-slate-400 font-display font-bold text-[8px] sm:text-sm uppercase tracking-[0.4em] sm:tracking-[0.6em] mb-8 sm:mb-12">System Latency: 0.2ms / Cycle Yield: 5X Rate</p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
            <button className="gold-gradient text-navy px-8 sm:px-12 py-4 sm:py-6 rounded-2xl sm:rounded-3xl font-display font-black uppercase text-[10px] sm:text-sm tracking-[0.2em] sm:tracking-[0.3em] hover:scale-105 active:scale-95 transition-all shadow-[0_20px_50px_rgba(255,184,0,0.3)] gold-glow flex items-center justify-center gap-3">
               Deploy Capital <TrendingUp size={16} className="sm:size-5" />
            </button>
            <button className="bg-white/5 backdrop-blur-xl border border-white/10 text-white px-8 sm:px-12 py-4 sm:py-6 rounded-2xl sm:rounded-3xl font-display font-black uppercase text-[10px] sm:text-sm tracking-[0.2em] sm:tracking-[0.3em] hover:bg-white/10 transition-all flex items-center justify-center gap-3">
               Audit Assets <Activity size={16} className="sm:size-5" />
            </button>
          </div>
        </div>

        {/* Scrolling Ticker */}
        <div className="absolute bottom-0 left-0 w-full bg-navy/80 backdrop-blur-md border-t border-white/5 py-3 sm:py-4 overflow-hidden">
           <div className="flex animate-ticker whitespace-nowrap gap-8 sm:gap-12">
              {[...Array(10)].map((_, i) => (
                <div key={i} className="flex items-center gap-2 sm:gap-3">
                   <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-emerald-500 rounded-full animate-pulse" />
                   <span className="text-[8px] sm:text-[10px] font-display font-black text-white uppercase tracking-widest whitespace-nowrap">User_{1000 + i}*** EARNED {formatCurrency(5000 + i * 250)}</span>
                   <span className="text-gold font-display font-black text-[8px] sm:text-[10px]">5X YIELD</span>
                </div>
              ))}
           </div>
        </div>
      </motion.div>

      {/* 3D Quick Action Icons */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8">
         {[
           { icon: "📱", label: 'Airtime', to: '/dashboard/wallet', color: 'from-orange-500/20 to-transparent' },
           { icon: "🌐", label: 'Data', to: '/dashboard/wallet', color: 'from-blue-500/20 to-transparent' },
           { icon: "💳", label: 'Bills', to: '/dashboard/wallet', color: 'from-emerald-500/20 to-transparent' },
           { icon: "🚀", label: 'Send', to: '/dashboard/wallet', color: 'from-gold/20 to-transparent' },
         ].map((action, idx) => (
           <Link key={action.label} to={action.to} className="group">
              <motion.div 
                animate={{ y: [0, idx % 2 === 0 ? -5 : 5, 0] }}
                transition={{ duration: 4, repeat: Infinity, delay: idx * 0.5 }}
                className={cn(
                  "bg-navy p-6 sm:p-10 rounded-[32px] sm:rounded-[48px] border border-white/5 shadow-2xl flex flex-col items-center gap-4 sm:gap-6 group-hover:border-gold/30 transition-all perspective-1000 relative overflow-hidden",
                  "hover:shadow-[0_40px_80px_-20px_rgba(255,184,0,0.1)]"
                )}
              >
                <div className="text-4xl sm:text-6xl transition-transform group-hover:scale-125 group-hover:rotate-12 duration-500">{action.icon}</div>
                <span className="text-[10px] sm:text-xs font-display font-black text-slate-500 uppercase tracking-[0.3em] sm:tracking-[0.4em] group-hover:text-gold transition-colors">{action.label}</span>
                <div className={cn("absolute inset-0 bg-gradient-to-t opacity-0 group-hover:opacity-100 transition-opacity", action.color)} />
              </motion.div>
           </Link>
         ))}
      </div>

      {/* Wallet Cards - 3D Floating & Shimmer */}
      <div className="flex overflow-x-auto pb-6 gap-6 sm:gap-8 scrollbar-hide snap-x -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 lg:grid-cols-4">
        {wallets.map((wallet, idx) => (
          <motion.div 
            key={wallet.title}
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity, delay: idx * 0.3 }}
            className="group min-w-[260px] sm:min-w-0 snap-center bg-[#0d152a] p-8 sm:p-10 rounded-[40px] sm:rounded-[56px] border border-white/5 shadow-2xl transition-all relative overflow-hidden preserve-3d shimmer-effect"
          >
            {/* 3D Parallax Orbs */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-gold/5 rounded-full blur-2xl animate-pulse" />
            
            <div className="flex items-center justify-between mb-8 sm:mb-10 relative z-10">
              <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-navy gold-glow border border-white/10">
                <wallet.icon size={24} className="text-gold sm:size-8" />
              </div>
              <div className="bg-gold/10 text-gold px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl text-[8px] sm:text-[10px] font-display font-black uppercase tracking-widest border border-gold/20 flex items-center gap-2">
                 <Zap size={12} className="sm:size-3.5 animate-pulse" /> +24% APY
              </div>
            </div>
            
            <div className="relative z-10">
              <p className="text-slate-500 font-display font-bold text-[8px] sm:text-[10px] uppercase tracking-[0.3em] sm:tracking-[0.4em] mb-2 sm:mb-3">{wallet.title}</p>
              <h3 className="text-2xl sm:text-4xl font-display font-black text-white italic tracking-tighter drop-shadow-lg">{formatCurrency(wallet.amount)}</h3>
            </div>
            
            {/* 3D Action Overlay */}
            <div className="absolute inset-0 bg-gold/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
               <button className="bg-gold text-navy px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-display font-black text-[8px] sm:text-[10px] uppercase tracking-widest shadow-2xl gold-glow -translate-y-4 group-hover:translate-y-0 transition-transform">
                  Deploy Asset
               </button>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-10">
        {/* Earnings Chart */}
        <div className="lg:col-span-2 bg-navy p-6 sm:p-10 rounded-[40px] sm:rounded-[64px] border border-white/5 shadow-2xl relative overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8 sm:mb-12 relative z-10">
            <div>
              <h3 className="text-xl sm:text-3xl font-display font-black text-white italic tracking-tighter uppercase leading-none">Yield <span className="text-gold">Analytics</span></h3>
              <p className="text-[8px] sm:text-[10px] text-slate-500 font-bold uppercase tracking-[0.3em] sm:tracking-[0.4em] mt-2 sm:mt-3">Synthesizing Network Data...</p>
            </div>
            <div className="flex gap-2 sm:gap-4">
              <div className="bg-navy-light px-4 py-2 sm:px-6 sm:py-4 rounded-xl sm:rounded-3xl border border-white/5 flex items-center gap-2 sm:gap-3">
                 <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-emerald-500 rounded-full animate-pulse" />
                 <span className="text-[8px] sm:text-[10px] font-display font-black text-white uppercase tracking-widest">LIVE MINTING</span>
              </div>
              <select className="bg-navy-light border border-white/10 rounded-xl sm:rounded-3xl px-4 py-2 sm:px-8 sm:py-4 text-[8px] sm:text-[10px] font-display font-black text-gold uppercase tracking-[0.2em] focus:outline-none focus:border-gold transition-all cursor-pointer gold-glow">
                <option>Cycle 7D</option>
                <option>Cycle 30D</option>
              </select>
            </div>
          </div>
          
          <div className="h-[250px] sm:h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockData}>
                <defs>
                  <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FFB800" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#FFB800" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#64748b', fontSize: 10, fontWeight: 900 }}
                  dy={15}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#64748b', fontSize: 10, fontWeight: 900 }}
                  tickFormatter={(val) => `₦${val/1000}k`}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0A0F1E', borderRadius: '24px', border: '1px solid rgba(255,184,0,0.2)', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)' }}
                  itemStyle={{ color: '#FFB800', fontWeight: 900, textTransform: 'uppercase', fontSize: '12px' }}
                  labelStyle={{ fontWeight: 900, color: '#ffffff', marginBottom: '8px', fontSize: '14px' }}
                />
                <Area 
                   type="monotone" 
                   dataKey="amount" 
                   stroke="#FFB800" 
                   strokeWidth={6}
                   fillOpacity={1} 
                   fill="url(#colorAmount)"
                   animationDuration={2000}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-navy p-10 rounded-[48px] border border-white/5 shadow-2xl relative overflow-hidden">
          <h3 className="text-2xl font-display font-black text-white italic tracking-tighter mb-10">Live Feed</h3>
          
          <div className="space-y-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center gap-5 group cursor-pointer">
                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center shrink-0 transition-all group-hover:border-gold/30 group-hover:bg-gold/10">
                  {i % 2 === 0 ? <ArrowUpRight size={24} className="text-gold" /> : <Zap size={24} className="text-gold" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-display font-bold text-white truncate uppercase tracking-tight group-hover:text-gold transition-colors">
                    {i % 2 === 0 ? 'Protocol Payout' : 'Nexus Bonus'}
                  </p>
                  <div className="flex items-center gap-2 text-[10px] text-slate-500 font-black uppercase tracking-widest mt-1">
                    <Clock size={12} />
                    {i}h ago
                  </div>
                </div>
                <div className="font-display font-black text-lg text-emerald-400 italic">
                  +{formatCurrency(i * 250)}
                </div>
              </div>
            ))}
          </div>

          <button className="w-full mt-12 py-5 bg-navy-light border border-white/5 rounded-2xl text-slate-400 font-display font-bold text-xs uppercase tracking-[0.3em] hover:text-gold hover:border-gold/20 transition-all active:scale-95">
            Audit Full Ledger
          </button>
        </div>
      </div>

      {/* Referral & Promo Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="bg-gold p-10 rounded-[48px] text-navy flex items-center justify-between relative overflow-hidden shadow-2xl gold-glow"
        >
          <div className="relative z-10">
            <h3 className="text-3xl font-display font-black uppercase italic leading-none mb-3">Viral Protocol</h3>
            <p className="text-navy font-bold text-sm max-w-[240px] opacity-80">Earn ₦2,000 for every active affiliate deployed into the network.</p>
            <div className="mt-8 flex items-center gap-3">
              <div className="bg-navy/10 border border-navy/10 px-6 py-3 rounded-2xl font-display font-black tracking-widest text-lg">{user.referralCode}</div>
              <button className="bg-navy text-white px-6 py-3 rounded-2xl font-display font-bold uppercase text-xs tracking-widest hover:bg-navy/90 active:scale-95 shadow-xl">Copy</button>
            </div>
          </div>
          <Users size={120} className="text-navy/10 absolute -right-6 -bottom-6 rotate-12" />
        </motion.div>

        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="bg-navy-light p-10 rounded-[48px] text-white flex items-center justify-between relative overflow-hidden shadow-2xl border border-white/5"
        >
          <div className="relative z-10">
            <h3 className="text-3xl font-display font-black uppercase italic leading-none mb-3">Nexus Vault</h3>
            <p className="text-slate-400 font-bold text-sm max-w-[240px]">High-yield skill instruments are now live. Secure your slot.</p>
            <button className="mt-8 gold-gradient text-navy px-10 py-3 rounded-2xl font-display font-black uppercase text-xs tracking-widest hover:scale-105 transition-all shadow-xl active:scale-95">
              Access Academy
            </button>
          </div>
          <Activity size={120} className="text-white/5 absolute -right-6 -bottom-6 -rotate-12" />
        </motion.div>
      </div>
    </div>
  );
}
