import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  User, 
  Mail, 
  Lock, 
  ShieldCheck, 
  Zap, 
  Target, 
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { cn } from '../lib/utils';
import { toast } from 'react-hot-toast';
import { supabase } from '../lib/supabase';

interface AuthPageProps {
  onLogin: (user: any) => void;
}

export default function AuthPage({ onLogin }: AuthPageProps) {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(searchParams.get('signup') === 'true');
  const [loading, setLoading] = useState(false);
  const [showAuthForm, setShowAuthForm] = useState(false);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    displayName: '',
    role: 'user',
    referralCodeInput: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isSignUp) {
        const { data: authData, error: signUpError } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            data: {
              display_name: formData.displayName,
            },
          },
        });

        if (signUpError) throw signUpError;

        if (authData.user) {
          // Create profile record
          const { error: profileError } = await supabase
            .from('profiles')
            .insert({
              id: authData.user.id,
              display_name: formData.displayName,
              email: formData.email,
              wallet: {
                main: 0,
                bonus: 5000,
                referral: 0,
                investment: 0
              },
              referral_code: Math.random().toString(36).substr(2, 6).toUpperCase(),
              role: formData.email.includes('admin') ? 'admin' : 'user',
            });
          
          if (profileError) {
             console.error('Profile creation error:', profileError);
             // Even if profile fails, user is created. We'll handle retrieval in App.tsx
          }

          toast.success('Neural Network Connected: Welcome Bonus Loaded');
        }
      } else {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });

        if (signInError) throw signInError;
        toast.success('Nexus Authority Authenticated');
      }
      
      // onLogin will be handled by the onAuthStateChanged listener in App.tsx
      navigate('/dashboard');
    } catch (error: any) {
      toast.error(error.message || 'Authentication Error: Uplink Failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-navy selection:bg-gold selection:text-navy overflow-hidden relative">
      {/* Immersive Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-[800px] h-[800px] bg-gold/5 blur-[150px] rounded-full animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-blue-600/5 blur-[120px] rounded-full" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03] pointer-events-none" />
      </div>

      <div className="relative z-10 container mx-auto px-6 py-12 min-h-screen flex flex-col">
        {/* Navigation / Logo */}
        <div className="flex justify-between items-center mb-16 sm:mb-24">
           <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gold shadow-[0_0_30px_rgba(255,184,0,0.4)] rounded-2xl flex items-center justify-center">
                 <Zap className="text-navy" size={24} />
              </div>
              <span className="font-display font-black text-2xl text-white italic tracking-tighter uppercase">Nezora <span className="text-gold">Alpha</span></span>
           </div>
           {!showAuthForm && (
             <button 
               onClick={() => setShowAuthForm(true)}
               className="bg-navy-light text-white border border-white/10 px-8 py-3 rounded-2xl font-display font-black uppercase text-[10px] tracking-widest hover:border-gold/30 hover:text-gold transition-all"
             >
               Authorize Terminal
             </button>
           )}
        </div>

        <AnimatePresence mode="wait">
          {!showAuthForm ? (
            <motion.div 
              key="hero"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              className="flex-1 flex flex-col items-center justify-center text-center max-w-5xl mx-auto"
            >
              <div className="bg-gold/10 text-gold border border-gold/20 px-6 py-2 rounded-full text-[10px] sm:text-xs font-display font-black tracking-[0.5em] mb-10 uppercase animate-pulse">
                 Instant Yield Protocol 2.0
              </div>
              
              <h1 className="text-5xl sm:text-9xl font-display font-black text-white uppercase italic tracking-tightest leading-[0.85] mb-8">
                 Monetize <br className="hidden sm:block" />
                 Your <span className="text-gold">Focus.</span>
              </h1>
              
              <p className="text-slate-400 font-display font-bold text-lg sm:text-2xl uppercase tracking-[0.2em] mb-16 max-w-3xl leading-relaxed italic">
                 Deploy your cognitive assets into the Nexus and harvest real-world liquidity in <span className="text-white">30-second cycles.</span>
              </p>

              <div className="flex flex-col sm:flex-row gap-6 w-full max-w-2xl">
                 <button 
                   onClick={() => { setIsSignUp(true); setShowAuthForm(true); }}
                   className="flex-1 gold-gradient text-navy py-8 rounded-[40px] font-display font-black uppercase text-sm tracking-[0.4em] shadow-[0_0_80px_rgba(255,184,0,0.3)] active:scale-95 transition-all group"
                 >
                    Initiate Registration
                    <span className="block text-[8px] opacity-60 mt-1">Receive ₦5,000 Bonus</span>
                 </button>
                 <button 
                    onClick={() => { setIsSignUp(false); setShowAuthForm(true); }}
                    className="flex-1 bg-navy-light text-white border border-white/10 py-8 rounded-[40px] font-display font-black uppercase text-sm tracking-[0.4em] hover:bg-white/5 transition-all"
                 >
                    Uplink Existing Account
                 </button>
              </div>

              {/* Trust Bar */}
              <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-12 sm:gap-24 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                 {[
                   { icon: Target, label: 'Verified Yield' },
                   { icon: ShieldCheck, label: 'Neural Protection' },
                   { icon: Sparkles, label: 'AI Optimization' },
                 ].map((item, idx) => (
                   <div key={idx} className="flex items-center gap-4">
                      <item.icon className="text-gold" size={24} />
                      <span className="font-display font-black text-white uppercase tracking-widest text-[10px] italic">{item.label}</span>
                   </div>
                 ))}
              </div>
            </motion.div>
          ) : (
            <motion.div 
               key="auth"
               initial={{ opacity: 0, scale: 0.9 }}
               animate={{ opacity: 1, scale: 1 }}
               exit={{ opacity: 0, scale: 1.1 }}
               className="flex-1 flex flex-col items-center justify-center"
            >
              <div className="w-full max-w-xl bg-navy-light/40 backdrop-blur-2xl rounded-[48px] sm:rounded-[64px] border border-white/10 p-8 sm:p-16 shadow-[0_0_100px_rgba(0,0,0,0.5)] relative overflow-hidden">
                <button 
                  onClick={() => setShowAuthForm(false)}
                  className="absolute top-8 left-8 text-slate-500 hover:text-gold transition-colors flex items-center gap-2 font-display font-black uppercase text-[10px] tracking-widest"
                >
                  <ArrowLeft size={16} /> Exit Matrix
                </button>

                <div className="text-center mb-12 mt-4 sm:mt-0">
                   <h2 className="text-4xl sm:text-6xl font-display font-black text-white uppercase italic tracking-tighter leading-none mb-4">
                      {isSignUp ? 'New <span class="text-gold">Entity</span>' : 'Access <span class="text-gold">Uplink</span>'}
                   </h2>
                   <p className="text-slate-500 font-display font-bold text-[10px] uppercase tracking-[0.4em]">
                      {isSignUp ? 'Synchronizing neural pathways...' : 'Establishing secure handshake...'}
                   </p>
                </div>

                {/* Switcher */}
                <div className="bg-navy-light p-2 rounded-[28px] border border-white/5 flex mb-10">
                   <button 
                      onClick={() => setIsSignUp(false)}
                      className={cn(
                        "flex-1 py-4 rounded-[20px] font-display font-black uppercase text-[10px] tracking-widest transition-all",
                        !isSignUp ? "bg-gold text-navy shadow-xl" : "text-slate-500 hover:text-white"
                      )}
                   >
                      Login
                   </button>
                   <button 
                      onClick={() => setIsSignUp(true)}
                      className={cn(
                        "flex-1 py-4 rounded-[20px] font-display font-black uppercase text-[10px] tracking-widest transition-all",
                        isSignUp ? "bg-gold text-navy shadow-xl" : "text-slate-500 hover:text-white"
                      )}
                   >
                      Sign Up
                   </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                   {isSignUp && (
                      <div className="space-y-2">
                        <label className="text-[10px] font-display font-black text-slate-500 uppercase tracking-widest px-1">Identity Display Alias</label>
                        <div className="relative group">
                           <User className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-gold transition-colors" size={20} />
                           <input 
                              type="text" 
                              required
                              value={formData.displayName}
                              onChange={e => setFormData({...formData, displayName: e.target.value})}
                              className="w-full bg-navy border border-white/5 rounded-3xl py-5 pl-16 pr-8 font-display font-black text-white italic tracking-tighter focus:outline-none focus:border-gold transition-all"
                              placeholder="AGENT_NAME"
                           />
                        </div>
                      </div>
                   )}

                   <div className="space-y-2">
                      <label className="text-[10px] font-display font-black text-slate-500 uppercase tracking-widest px-1">Secure Neural Email</label>
                      <div className="relative group">
                         <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-gold transition-colors" size={20} />
                         <input 
                            type="email" 
                            required
                            value={formData.email}
                            onChange={e => setFormData({...formData, email: e.target.value})}
                            className="w-full bg-navy border border-white/5 rounded-3xl py-5 pl-16 pr-8 font-display font-black text-white italic tracking-tighter focus:outline-none focus:border-gold transition-all"
                            placeholder="RESONANCE@NEXUS.IO"
                         />
                      </div>
                   </div>

                   <div className="space-y-2">
                      <label className="text-[10px] font-display font-black text-slate-500 uppercase tracking-widest px-1">Access Pass-Cipher</label>
                      <div className="relative group">
                         <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-gold transition-colors" size={20} />
                         <input 
                            type="password" 
                            required
                            value={formData.password}
                            onChange={e => setFormData({...formData, password: e.target.value})}
                            className="w-full bg-navy border border-white/5 rounded-3xl py-5 pl-16 pr-8 font-display font-black text-white italic tracking-tighter focus:outline-none focus:border-gold transition-all"
                            placeholder="••••••••"
                         />
                      </div>
                   </div>

                   <button 
                      type="submit"
                      disabled={loading}
                      className="w-full gold-gradient text-navy py-6 rounded-3xl font-display font-black uppercase text-xs tracking-[0.4em] shadow-xl gold-glow active:scale-95 transition-all flex items-center justify-center gap-4"
                   >
                      {loading ? (
                        <div className="flex items-center gap-3">
                           <motion.div 
                              animate={{ rotate: 360 }}
                              transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                              className="w-5 h-5 border-2 border-navy/30 border-t-navy rounded-full"
                           />
                           Synching...
                        </div>
                      ) : (
                        <>
                           {isSignUp ? 'Initiate Node' : 'Authorize Uplink'}
                           <ChevronRight size={18} />
                        </>
                      )}
                   </button>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Dynamic Footer */}
        <div className="mt-auto pt-16 flex flex-col md:flex-row justify-between items-center gap-8 border-t border-white/5">
           <div className="flex gap-12">
              <div className="text-center">
                 <p className="text-white font-display font-black text-xl italic tracking-tighter leading-none mb-1">₦24.8M+</p>
                 <p className="text-slate-500 font-bold text-[8px] uppercase tracking-widest">Total Distributed</p>
              </div>
              <div className="text-center">
                 <p className="text-white font-display font-black text-xl italic tracking-tighter leading-none mb-1">12,450</p>
                 <p className="text-slate-500 font-bold text-[8px] uppercase tracking-widest">Active Agents</p>
              </div>
           </div>
           
           <div className="flex gap-6">
              {['Security', 'Protocols', 'Support'].map(item => (
                <button key={item} className="text-slate-500 hover:text-gold font-display font-black text-[8px] uppercase tracking-widest transition-colors underline-offset-4 hover:underline">
                   {item}
                </button>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
}
