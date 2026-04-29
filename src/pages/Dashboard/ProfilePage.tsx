import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  User, 
  Settings, 
  CreditCard, 
  Shield, 
  LogOut, 
  Camera,
  CheckCircle2,
  AlertCircle,
  Copy,
  ChevronRight,
  Landmark,
  Key
} from 'lucide-react';
import { cn, formatCurrency } from '../../lib/utils';
import { toast } from 'react-hot-toast';
import { supabase } from '../../lib/supabase';

interface ProfilePageProps {
  user: any;
  onUpdateUser?: () => Promise<void>;
}

export default function ProfilePage({ user, onUpdateUser }: ProfilePageProps) {
  const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'bank'>('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    displayName: user?.display_name || user?.displayName || '',
    email: user?.email || '',
    accountNumber: user?.bank_profile?.accountNumber || '',
    bankName: user?.bank_profile?.bankName || '',
    accountName: user?.bank_profile?.accountName || '',
  });

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const updates = {
        display_name: formData.displayName,
        bank_profile: {
          accountNumber: formData.accountNumber,
          bankName: formData.bankName,
          accountName: formData.accountName,
        }
      };

      const { error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id);

      if (error) throw error;
      
      if (onUpdateUser) {
        await onUpdateUser();
      }
      
      toast.success('Profile Matrix Synchronized');
      setIsEditing(false);
    } catch (error: any) {
      toast.error(error.message || 'Sync Failed');
    } finally {
      setLoading(false);
    }
  };

  const copyReferral = () => {
    navigator.clipboard.writeText(user?.referralCode || '');
    toast.success('Protocol ID Copied');
  };

  return (
    <div className="space-y-12 pb-32 max-w-5xl mx-auto px-4 sm:px-0">
      {/* Immersive Profile Hero */}
      <div className="relative bg-navy rounded-[40px] sm:rounded-[64px] border border-white/5 shadow-2xl overflow-hidden pt-20 pb-12 sm:pb-20">
        {/* Animated Background */}
        <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-gold/10 to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/5 blur-[120px] -z-0 rounded-full" />
        
        <div className="relative z-10 flex flex-col items-center text-center px-6">
          <div className="relative mb-8 group">
            <div className="w-32 h-32 sm:w-48 sm:h-48 rounded-full border-4 border-gold p-1 bg-navy shadow-[0_0_80px_rgba(255,184,0,0.2)] gold-glow transition-transform group-hover:scale-105 duration-500 overflow-hidden">
               <img 
                 src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.displayName}`} 
                 alt="Avatar" 
                 className="w-full h-full object-cover rounded-full"
               />
            </div>
            <button className="absolute bottom-2 right-2 p-4 bg-gold rounded-full text-navy shadow-2xl hover:scale-110 active:scale-95 transition-all">
               <Camera size={24} />
            </button>
          </div>

          <h1 className="text-4xl sm:text-7xl font-display font-black text-white uppercase italic tracking-tighter leading-none mb-4 drop-shadow-2xl">
            {user?.displayName}
          </h1>
          <p className="text-slate-500 font-display font-bold text-[10px] sm:text-xs uppercase tracking-[0.6em] mb-10">Access Tier: <span className="text-gold">Executive Protocol Member</span></p>

          <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 px-8 py-4 rounded-3xl flex items-center gap-4">
               <div>
                  <p className="text-slate-500 text-[8px] font-bold uppercase tracking-widest mb-1">Portfolio Capacity</p>
                  <p className="text-xl font-display font-black text-white italic tracking-tighter">{formatCurrency(user?.wallet?.main + user?.wallet?.bonus)}</p>
               </div>
               <div className="w-10 h-10 rounded-2xl bg-gold/10 flex items-center justify-center border border-gold/20">
                  <CreditCard size={20} className="text-gold" />
               </div>
            </div>
            <button 
              onClick={copyReferral}
              className="bg-navy-light border border-white/10 px-8 py-4 rounded-3xl flex items-center gap-4 group hover:border-gold/30 transition-all"
            >
               <div>
                  <p className="text-slate-500 text-[8px] font-bold uppercase tracking-widest mb-1 text-left">Protocol Code</p>
                  <p className="text-xl font-display font-black text-white italic tracking-tighter group-hover:text-gold transition-colors">{user?.referralCode}</p>
               </div>
               <Copy size={20} className="text-slate-500 group-hover:text-gold transition-colors" />
            </button>
          </div>
        </div>
      </div>

      {/* Tabs System */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
        {/* Navigation */}
        <div className="space-y-3">
          {[
            { id: 'profile', icon: User, label: 'Profile Base' },
            { id: 'bank', icon: Landmark, label: 'Withdrawal Node' },
            { id: 'security', icon: Shield, label: 'Security Layer' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={cn(
                "w-full flex items-center gap-4 px-6 py-5 rounded-3xl font-display font-black uppercase text-[10px] tracking-widest transition-all text-left",
                activeTab === tab.id 
                  ? "bg-gold text-navy gold-glow shadow-xl" 
                  : "bg-navy text-slate-500 border border-white/5 hover:border-gold/30 hover:text-gold"
              )}
            >
              <tab.icon size={18} />
              {tab.label}
              <ChevronRight size={14} className={cn("ml-auto transition-transform", activeTab === tab.id ? "rotate-90" : "")} />
            </button>
          ))}
          
          <button className="w-full flex items-center gap-4 px-6 py-5 rounded-3xl font-display font-black uppercase text-[10px] tracking-widest transition-all bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500 hover:text-white mt-8">
            <LogOut size={18} />
            Eject Protocol
          </button>
        </div>

        {/* Content Area */}
        <div className="lg:col-span-3">
          <AnimatePresence mode="wait">
            {activeTab === 'profile' && (
              <motion.div 
                key="profile"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-navy rounded-[40px] border border-white/5 shadow-2xl p-8 sm:p-12"
              >
                <div className="flex items-center justify-between mb-12">
                   <div>
                      <h3 className="text-3xl font-display font-black text-white italic tracking-tighter uppercase leading-none">Identity <span className="text-gold">Matrix</span></h3>
                      <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.4em] mt-3">Synthesizing personal data clusters...</p>
                   </div>
                   <button 
                     onClick={() => setIsEditing(!isEditing)}
                     className="bg-navy-light px-8 py-4 rounded-2xl border border-white/10 font-display font-black uppercase text-[10px] tracking-widest text-gold hover:gold-glow transition-all"
                   >
                     {isEditing ? 'Cancel Sync' : 'Update Data'}
                   </button>
                </div>

                <form onSubmit={handleUpdateProfile} className="space-y-8">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-[10px] font-display font-black text-slate-500 uppercase tracking-widest px-1">Display Alias</label>
                      <input 
                        type="text" 
                        disabled={!isEditing}
                        value={formData.displayName}
                        onChange={e => setFormData({ ...formData, displayName: e.target.value })}
                        className="w-full bg-navy-light border border-white/5 rounded-2xl py-4 px-6 font-display font-black text-white italic tracking-tighter focus:outline-none focus:border-gold transition-all disabled:opacity-50"
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-display font-black text-slate-500 uppercase tracking-widest px-1">Secure Email</label>
                      <input 
                        type="email" 
                        disabled
                        value={formData.email}
                        className="w-full bg-navy-light/50 border border-white/5 rounded-2xl py-4 px-6 font-display font-black text-slate-600 italic tracking-tighter focus:outline-none focus:border-gold transition-all cursor-not-allowed"
                      />
                    </div>
                  </div>

                  <div className="bg-gold/5 border border-gold/10 p-8 rounded-3xl flex items-center gap-6">
                     <div className="w-16 h-16 bg-navy rounded-2xl flex items-center justify-center border border-white/5 gold-glow shadow-xl">
                        <CheckCircle2 size={32} className="text-emerald-500" />
                     </div>
                     <div>
                        <p className="text-white font-display font-black text-lg italic tracking-tighter uppercase mb-1">Identity Verified</p>
                        <p className="text-slate-500 font-bold text-[10px] uppercase tracking-widest">Protocol validation successful via AI Oracle.</p>
                     </div>
                  </div>

                  {isEditing && (
                    <button 
                      type="submit"
                      disabled={loading}
                      className="w-full gold-gradient text-navy py-6 rounded-3xl font-display font-black uppercase text-xs tracking-[0.4em] shadow-xl gold-glow active:scale-[0.98] transition-all flex items-center justify-center gap-4"
                    >
                      {loading ? 'Synchronizing Pipeline...' : 'Commit Data Cluster'}
                    </button>
                  )}
                </form>
              </motion.div>
            )}

            {activeTab === 'bank' && (
              <motion.div 
                key="bank"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-navy rounded-[40px] border border-white/5 shadow-2xl p-8 sm:p-12"
              >
                <div className="flex items-center justify-between mb-12">
                   <div>
                      <h3 className="text-3xl font-display font-black text-white italic tracking-tighter uppercase leading-none">Withdrawal <span className="text-gold">Node</span></h3>
                      <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.4em] mt-3">Configuring liquidity exit pathways...</p>
                   </div>
                </div>

                <div className="bg-red-500/5 border border-red-500/10 p-8 rounded-3xl flex items-center gap-6 mb-12">
                   <div className="w-16 h-16 bg-navy rounded-2xl flex items-center justify-center border border-white/5 shadow-xl">
                      <AlertCircle size={32} className="text-red-500" />
                   </div>
                   <div>
                      <p className="text-white font-display font-black text-lg italic tracking-tighter uppercase mb-1">KYC Alert</p>
                      <p className="text-slate-500 font-bold text-[10px] uppercase tracking-widest">Withdrawals restricted to verified bank nodes only.</p>
                   </div>
                </div>

                <form onSubmit={handleUpdateProfile} className="space-y-8">
                   <div className="space-y-8">
                     <div className="space-y-3">
                        <label className="text-[10px] font-display font-black text-slate-500 uppercase tracking-widest px-1">Bank Institution</label>
                        <select 
                          value={formData.bankName}
                          onChange={e => setFormData({ ...formData, bankName: e.target.value })}
                          className="w-full bg-navy-light border border-white/5 rounded-2xl py-4 px-6 font-display font-black text-white italic tracking-tighter focus:outline-none focus:border-gold transition-all"
                        >
                          <option value="">Select Bank Node</option>
                          <option value="access">Access Bank</option>
                          <option value="gtb">GTBank</option>
                          <option value="zenith">Zenith Bank</option>
                          <option value="kuda">Kuda MFB</option>
                          <option value="opay">OPay</option>
                          <option value="palmpay">PalmPay</option>
                        </select>
                     </div>

                     <div className="space-y-3">
                        <label className="text-[10px] font-display font-black text-slate-500 uppercase tracking-widest px-1">Account Number (10 Digits)</label>
                        <input 
                          type="text" 
                          maxLength={10}
                          value={formData.accountNumber}
                          onChange={e => setFormData({ ...formData, accountNumber: e.target.value })}
                          placeholder="0000000000"
                          className="w-full bg-navy-light border border-white/5 rounded-2xl py-4 px-6 font-display font-black text-white italic tracking-tighter focus:outline-none focus:border-gold transition-all"
                        />
                     </div>

                     <div className="space-y-3">
                        <label className="text-[10px] font-display font-black text-slate-500 uppercase tracking-widest px-1">Account Name Matrix</label>
                        <input 
                          type="text" 
                          value={formData.accountName}
                          onChange={e => setFormData({ ...formData, accountName: e.target.value })}
                          placeholder="Syncing name..."
                          className="w-full bg-navy-light border border-white/5 rounded-2xl py-4 px-6 font-display font-black text-white italic tracking-tighter focus:outline-none focus:border-gold transition-all"
                        />
                     </div>
                   </div>

                   <button 
                     type="submit"
                     disabled={loading}
                     className="w-full gold-gradient text-navy py-6 rounded-3xl font-display font-black uppercase text-xs tracking-[0.4em] shadow-xl gold-glow active:scale-[0.98] transition-all flex items-center justify-center gap-4"
                   >
                     {loading ? 'Routing Liquidity Node...' : 'Verify & Lock Account'}
                   </button>
                </form>
              </motion.div>
            )}

            {activeTab === 'security' && (
              <motion.div 
                key="security"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-navy rounded-[40px] border border-white/5 shadow-2xl p-8 sm:p-12"
              >
                <div className="mb-12">
                   <h3 className="text-3xl font-display font-black text-white italic tracking-tighter uppercase leading-none">Security <span className="text-gold">Firewall</span></h3>
                   <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.4em] mt-3">Layer-7 protection active and scanning...</p>
                </div>

                <div className="space-y-6">
                  {[
                    { label: 'Two-Factor (2FA)', status: 'Offline', color: 'text-red-500', icon: Key },
                    { label: 'Biometric Login', status: 'Online', color: 'text-emerald-500', icon: User },
                    { label: 'Withdrawal Lock', status: 'Active', color: 'text-emerald-500', icon: Shield },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-8 bg-navy-light/40 border border-white/5 rounded-[32px] group hover:border-gold/30 transition-all">
                       <div className="flex items-center gap-6">
                          <div className="w-14 h-14 bg-navy rounded-2xl flex items-center justify-center border border-white/5 group-hover:gold-glow transition-all">
                             <item.icon className="text-slate-500 group-hover:text-gold transition-colors" size={24} />
                          </div>
                          <div>
                             <p className="text-white font-display font-black text-lg italic tracking-tighter uppercase leading-none mb-1">{item.label}</p>
                             <p className={cn("text-[8px] font-bold uppercase tracking-widest", item.color)}>{item.status}</p>
                          </div>
                       </div>
                       <button className="px-6 py-3 rounded-xl border border-white/10 text-[10px] font-display font-black uppercase tracking-widest text-slate-500 hover:text-gold hover:border-gold transition-all">
                          Configure
                       </button>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
