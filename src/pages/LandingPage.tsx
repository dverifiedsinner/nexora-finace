import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  TrendingUp, 
  BookOpen, 
  CheckCircle, 
  ArrowRight,
  Shield,
  Zap,
  Star
} from 'lucide-react';

interface LandingPageProps {
  user: any;
}

export default function LandingPage({ user }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-[#01040D] text-slate-300 font-sans selection:bg-gold selection:text-navy overflow-hidden">
      {/* Immersive Background Elements */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-[800px] h-[800px] bg-gold/5 blur-[150px] rounded-full animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-blue-600/5 blur-[120px] rounded-full" />
      </div>

      {/* Navigation */}
      <nav className="relative z-50 flex items-center justify-between px-6 lg:px-12 py-8 max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gold rounded-xl flex items-center justify-center shadow-lg gold-glow">
            <span className="text-navy font-black text-xl italic tracking-tighter">N</span>
          </div>
          <span className="font-display font-black text-2xl tracking-tighter uppercase text-white italic">SkillVest</span>
        </div>
        <div className="flex gap-4">
          {user ? (
            <Link 
              to="/dashboard" 
              className="px-8 py-3 bg-gold text-navy rounded-2xl font-display font-black uppercase text-[10px] tracking-widest hover:scale-105 transition-all flex items-center gap-3 gold-glow"
            >
              Access Terminal
              <ArrowRight size={16} />
            </Link>
          ) : (
            <>
              <Link 
                to="/auth" 
                className="px-6 py-3 bg-white/5 border border-white/10 text-white rounded-2xl font-display font-black uppercase text-[10px] tracking-widest hover:border-gold/30 hover:text-gold transition-all"
              >
                Uplink
              </Link>
              <Link 
                to="/auth?signup=true" 
                className="px-8 py-3 bg-gold text-navy rounded-2xl font-display font-black uppercase text-[10px] tracking-widest hover:scale-105 transition-all gold-glow"
              >
                Initiate
              </Link>
            </>
          )}
        </div>
      </nav>

      <main className="relative z-10">
        {/* Hero Section */}
        <div className="relative pt-20 pb-32 px-6 overflow-hidden">
          <div className="max-w-7xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="bg-gold/10 text-gold border border-gold/20 px-6 py-2 rounded-full text-[10px] sm:text-xs font-display font-black tracking-[0.5em] mb-10 uppercase inline-block animate-pulse">
                Next-Gen Yield Protocol
              </div>
              <h1 className="text-5xl sm:text-9xl font-display font-black text-white uppercase italic tracking-tightest leading-[0.85] mb-10">
                Monetize <br className="hidden sm:block" />
                Your <span className="text-gold">Focus.</span>
              </h1>
              <p className="max-w-3xl mx-auto text-lg sm:text-2xl text-slate-400 mb-16 font-display font-bold uppercase tracking-[0.2em] leading-relaxed italic px-4 sm:px-0">
                Deploy your cognitive assets into the Nexus and harvest real-world liquidity in <span className="text-gold">30-second cycles.</span>
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full max-w-2xl mx-auto">
                <Link 
                  to="/auth?signup=true" 
                  className="w-full sm:w-auto px-12 py-7 bg-gold text-navy rounded-[32px] font-display font-black uppercase text-sm tracking-[0.4em] shadow-xl gold-glow hover:scale-105 transition-all"
                >
                  Initiate Connection
                </Link>
                <button className="w-full sm:w-auto px-12 py-7 bg-navy-light text-white border border-white/10 rounded-[32px] font-display font-black uppercase text-sm tracking-[0.4em] hover:bg-white/5 transition-all">
                  Audit Protocol
                </button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Features Split */}
        <section className="py-40 bg-[#020610] border-y border-white/5 relative">
          <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-[#01040D] to-transparent" />
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="grid lg:grid-cols-2 gap-24 items-center">
              <div>
                <h2 className="text-4xl sm:text-6xl font-display font-black text-white uppercase italic tracking-tighter leading-none mb-8">
                  The <span className="text-gold">Ecosystem</span> <br />
                  of Velocity.
                </h2>
                <div className="space-y-10 mt-16">
                  {[
                    { icon: Zap, title: "Yield Economy", desc: "Complete daily verified tasks and harvest rewards instantly into your secure capital block." },
                    { icon: BookOpen, title: "Neural Learning", desc: "Monetized EdTech modules. Complete course levels and get rewarded for institutional mastery." },
                    { icon: Shield, title: "Bank Inlets", desc: "Seamless settlement to any bank node or instant purchase of digital utility tokens." }
                  ].map((feat, i) => (
                    <div key={i} className="flex gap-8 group">
                      <div className="w-16 h-16 bg-navy rounded-2xl flex-shrink-0 flex items-center justify-center border border-white/10 group-hover:border-gold/40 transition-all gold-glow-sm">
                        <feat.icon className="text-gold" size={24} />
                      </div>
                      <div>
                        <h3 className="text-xl font-display font-black text-white uppercase italic tracking-tight mb-2 group-hover:text-gold transition-colors">{feat.title}</h3>
                        <p className="text-slate-500 font-bold text-xs uppercase tracking-widest leading-relaxed">{feat.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="relative">
                <div className="bg-navy rounded-[64px] p-12 aspect-square flex flex-col justify-end overflow-hidden group border border-white/10 shadow-2xl relative">
                  <div className="absolute top-0 right-0 p-12">
                     <div className="bg-gold rounded-full w-32 h-32 flex items-center justify-center text-navy font-display font-black text-3xl rotate-12 group-hover:rotate-0 transition-transform duration-500 gold-glow">
                        100%
                     </div>
                  </div>
                  <div className="relative z-10">
                    <div className="flex items-center gap-1.5 mb-6">
                      {[1,2,3,4,5].map(i => <Star key={i} size={22} fill="#FFB800" className="text-gold" />)}
                    </div>
                    <p className="text-3xl sm:text-4xl text-white font-display font-black tracking-tight leading-tight mb-6 uppercase italic">
                      "Highest performing protocol in the region. Unmatched liquidity."
                    </p>
                    <p className="text-gold font-display font-black uppercase tracking-[0.4em] text-[10px]">— VECTOR_LOG_X7</p>
                  </div>
                  <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gold/5 blur-[120px] rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Gamification Teaser */}
        <section className="py-40 px-6 relative overflow-hidden bg-[#01040D]">
          {/* Background Animated Orb */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/5 blur-[150px] rounded-full animate-orb" />
          
          <div className="max-w-5xl mx-auto text-center relative z-10">
            <div className="w-24 h-24 bg-navy-light rounded-3xl flex items-center justify-center mx-auto mb-10 border border-white/10 gold-glow">
              <TrendingUp className="text-gold" size={48} />
            </div>
            <h2 className="text-4xl lg:text-8xl font-display font-black text-white italic tracking-tightest mb-10 uppercase leading-none">
              High-Yield <span className="text-gold">Matrix.</span>
            </h2>
            <p className="text-lg sm:text-2xl text-slate-400 mb-16 font-display font-bold uppercase tracking-[0.3em] italic leading-relaxed max-w-3xl mx-auto">
              From the Jackpot Wheel to Neural Predictions, we keep the experience rewarding as you grow your asset pool.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
               {['JACKPOT WHEEL', 'PREDICTIONS', 'NETWORK REP', 'UTILITY NODE'].map(item => (
                 <div key={item} className="px-8 py-6 bg-navy border border-white/10 rounded-3xl font-display font-black text-[10px] uppercase tracking-widest text-slate-500 hover:text-gold hover:border-gold/30 transition-all cursor-default hover:gold-glow-sm">
                    {item}
                 </div>
               ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-white/5 py-16 px-6 bg-navy/50 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gold rounded-xl flex items-center justify-center gold-glow">
                <span className="text-navy font-black text-xl italic tracking-tighter">N</span>
              </div>
              <span className="font-display font-black text-2xl tracking-tighter uppercase text-white italic">SkillVest</span>
            </div>
            <p className="text-slate-500 font-display font-bold uppercase text-[10px] tracking-[0.3em]">© 2024 Protocol BY NEZORA. All rights reserved.</p>
            <div className="flex gap-10 text-[10px] font-display font-black uppercase tracking-widest">
              <a href="#" className="text-slate-500 hover:text-gold transition-colors">Privacy</a>
              <a href="#" className="text-slate-500 hover:text-gold transition-colors">Terms</a>
              <a href="#" className="text-slate-500 hover:text-gold transition-colors">Support</a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
