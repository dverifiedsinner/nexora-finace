import { Outlet, Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  BookOpen, 
  CheckCircle2, 
  Wallet, 
  Gamepad2, 
  LogOut,
  Menu,
  X,
  User as UserIcon,
  Bell,
  UserCircle,
  Trophy,
  BarChart3
} from 'lucide-react';
import { useState } from 'react';
import { cn } from '../../lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import SocialProof from '../SocialProof';

interface DashboardLayoutProps {
  user: any;
  onLogout: () => void;
}

export default function DashboardLayout({ user, onLogout }: DashboardLayoutProps) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Overview', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Tasks', href: '/dashboard/tasks', icon: CheckCircle2 },
    { name: 'Skill Invest', href: '/dashboard/courses', icon: BookOpen },
    { name: 'Wallet', href: '/dashboard/wallet', icon: Wallet },
    { name: 'Games', href: '/dashboard/games', icon: Gamepad2 },
    { name: 'Contests', href: '/dashboard/contests', icon: Trophy },
    { name: 'Leaderboard', href: '/dashboard/leaderboard', icon: BarChart3 },
    { name: 'Profile', href: '/dashboard/profile', icon: UserCircle },
  ];

  if (user?.role === 'admin') {
    navItems.push({ name: 'Admin', href: '/dashboard/admin', icon: UserIcon });
  }

  return (
    <div className="min-h-screen bg-[#01040D] text-slate-300 font-sans">
      <SocialProof />
      {/* Mobile Header */}
      <header className="lg:hidden h-16 sm:h-20 bg-navy border-b border-white/5 flex items-center justify-between px-4 sm:px-6 sticky top-0 z-50">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gold rounded-xl flex items-center justify-center gold-glow">
            <span className="text-navy font-black text-lg sm:text-xl italic tracking-tighter">N</span>
          </div>
          <span className="font-display font-black text-xl sm:text-2xl tracking-tighter text-white uppercase italic">SkillVest</span>
        </div>
        <button 
          onClick={() => setSidebarOpen(!isSidebarOpen)}
          className="p-2 sm:p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-all border border-white/5"
        >
          {isSidebarOpen ? <X size={20} className="sm:size-6 text-gold" /> : <Menu size={20} className="sm:size-6 text-gold" />}
        </button>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 sm:w-72 bg-navy border-r border-white/5 transform lg:translate-x-0 transition-transform duration-300 ease-in-out lg:static shadow-[10px_0_30px_rgba(0,0,0,0.5)]",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}>
          <div className="h-full flex flex-col p-6 sm:p-8">
            <div className="hidden lg:flex items-center gap-4 mb-16">
              <div className="w-12 h-12 bg-gold rounded-2xl flex items-center justify-center gold-glow">
                <span className="text-navy font-black text-2xl italic">N</span>
              </div>
              <span className="font-display font-black text-3xl tracking-tighter text-white uppercase italic">SkillVest</span>
            </div>

            <nav className="flex-1 space-y-2 sm:space-y-3">
              {navItems.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={cn(
                      "flex items-center gap-3 sm:gap-4 px-4 py-3 sm:px-5 sm:py-4 rounded-xl sm:rounded-2xl font-display font-bold uppercase tracking-wider transition-all duration-300 relative group",
                      isActive 
                        ? "bg-gold text-navy gold-glow translate-x-1 sm:translate-x-2" 
                        : "text-slate-500 hover:text-gold hover:bg-white/5"
                    )}
                  >
                    <div className={cn(
                      "w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:-translate-y-1 group-hover:scale-110",
                      isActive ? "bg-navy shadow-[0_5px_15px_rgba(0,0,0,0.3)]" : "bg-white/5"
                    )}>
                      <item.icon size={18} className={cn("transition-colors", isActive ? "text-gold" : "text-gold/40")} />
                    </div>
                    <span className="text-xs sm:text-sm font-display font-black tracking-tight">{item.name}</span>
                    {isActive && (
                      <motion.div 
                        layoutId="activeTab"
                        className="absolute left-0 w-1 h-6 sm:w-1.5 sm:h-8 bg-white rounded-full -ml-6 sm:-ml-8"
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            <div className="mt-auto border-t border-white/5 pt-6 sm:pt-8">
              <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8 px-1 sm:px-2">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-navy-light rounded-xl sm:rounded-2xl border border-white/5 flex items-center justify-center group overflow-hidden relative">
                  <UserIcon size={20} className="sm:size-6 text-gold transition-transform group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gold/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs sm:text-sm font-display font-bold text-white truncate uppercase tracking-tight">{user?.displayName}</p>
                  <p className="text-[8px] sm:text-[10px] text-slate-500 truncate font-bold uppercase tracking-widest">{user?.referralCode}</p>
                </div>
              </div>
              <button
                onClick={onLogout}
                className="w-full flex items-center gap-3 sm:gap-4 px-4 py-3 sm:px-5 sm:py-4 text-red-500/80 font-display font-bold uppercase tracking-widest hover:text-red-500 hover:bg-red-500/5 rounded-xl sm:rounded-2xl transition-all border border-transparent hover:border-red-500/20"
              >
                <LogOut size={18} />
                <span className="text-[10px] sm:text-xs">Sign Out</span>
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-12 max-w-7xl mx-auto w-full">
          {/* Top Bar for Desktop */}
          <div className="hidden lg:flex items-center justify-between mb-12">
            <div>
              <h1 className="text-4xl font-display font-black text-white italic tracking-tighter">
                {navItems.find(i => i.href === location.pathname)?.name || 'Dashboard'}
              </h1>
              <p className="text-gold font-bold uppercase text-[10px] tracking-[0.3em] mt-1 drop-shadow-[0_0_10px_rgba(255,184,0,0.5)]">
                Welcome back, {user?.displayName.split(' ')[0]} / <span className="text-white opacity-40">Verified Investor</span>
              </p>
            </div>
            <div className="flex items-center gap-6">
              <button className="p-3 bg-navy border border-white/10 rounded-2xl hover:border-gold/30 group transition-all relative">
                <Bell size={24} className="text-slate-400 group-hover:text-gold" />
                <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-red-600 rounded-full border-2 border-navy"></span>
              </button>
              <div className="h-10 w-px bg-white/5"></div>
              <div className="bg-navy border border-gold/20 text-gold px-6 py-3 rounded-2xl font-display font-bold text-xs tracking-widest shadow-xl">
                 ID: {user?.referralCode}
              </div>
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
