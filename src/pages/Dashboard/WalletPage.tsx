import { useState } from 'react';
import { 
  Plus, 
  ArrowUpRight, 
  ArrowDownLeft, 
  CreditCard, 
  Banknote, 
  Smartphone,
  ChevronRight,
  ChevronLeft,
  ShieldCheck,
  History,
  TrendingUp,
  TrendingDown,
  Globe
} from 'lucide-react';
import { cn, formatCurrency } from '../../lib/utils';
import { motion } from 'motion/react';
import { toast } from 'react-hot-toast';
import { supabase } from '../../lib/supabase';

interface WalletPageProps {
  user: any;
  refreshProfile: () => Promise<void>;
}

export default function WalletPage({ user, refreshProfile }: WalletPageProps) {
  const [activeTab, setActiveTab] = useState('Top-up');
  const [billType, setBillType] = useState<'airtime' | 'data' | null>(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [network, setNetwork] = useState('');
  const [fundingAmount, setFundingAmount] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAction = async () => {
    if (!fundingAmount || isNaN(Number(fundingAmount))) {
      toast.error('Please enter a valid amount');
      return;
    }

    setLoading(true);
    const amount = Number(fundingAmount);
    
    try {
      const currentWallet = { ...user.wallet };
      let newWallet = { ...currentWallet };

      if (activeTab === 'Top-up') {
        newWallet.main += amount;
      } else if (activeTab === 'Withdraw' || activeTab === 'Bill Payment') {
        if (currentWallet.main < amount) {
          throw new Error('Insufficient funds in main wallet');
        }
        newWallet.main -= amount;
      }

      // Update in Supabase
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ wallet: newWallet })
        .eq('id', user.id);

      if (updateError) throw updateError;

      // Log transaction if table exists (optional, but good practice)
      await supabase.from('transactions').insert({
        user_id: user.id,
        amount: amount,
        type: activeTab === 'Top-up' ? 'credit' : 'debit',
        description: `${activeTab} - ${billType || 'Wallet Adjustment'}`,
        wallet: 'main',
        timestamp: new Date().toISOString()
      });

      await refreshProfile();
      toast.success(`${activeTab} request executed successfully!`);
      setFundingAmount('');
      setPhoneNumber('');
    } catch (error: any) {
      toast.error(error.message || 'Transaction Failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 sm:space-y-10 max-w-5xl mx-auto pb-20 px-4 sm:px-0">
      {/* Wallet Overview Card */}
      <div className="bg-navy rounded-[40px] sm:rounded-[48px] p-8 sm:p-14 text-white shadow-2xl border border-white/5 relative overflow-hidden">
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8 sm:gap-12">
          <div>
            <div className="bg-gold/10 text-gold border border-gold/20 px-4 py-1.5 sm:px-5 sm:py-2 rounded-full text-[8px] sm:text-[10px] font-display font-black tracking-[0.3em] sm:tracking-[0.4em] mb-6 sm:mb-8 inline-block shadow-lg">
               Unified Capital Block
            </div>
            <h1 className="text-4xl sm:text-7xl font-display font-black tracking-tighter mb-4 sm:mb-6 italic leading-none drop-shadow-xl">
              {formatCurrency(user.wallet.main + user.wallet.bonus)}
            </h1>
            <div className="flex gap-4 sm:gap-6 text-[10px] sm:text-xs font-display font-bold text-slate-400 uppercase tracking-[0.2em] sm:tracking-[0.3em]">
               <div className="flex items-center gap-2">
                 <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-emerald-500 rounded-full animate-pulse" />
                 <span>Main: <span className="text-white">{formatCurrency(user.wallet.main)}</span></span>
               </div>
               <span className="text-white/10 hidden sm:block">|</span>
               <div className="flex items-center gap-2">
                 <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gold rounded-full" />
                 <span>Bonus: <span className="text-gold">{formatCurrency(user.wallet.bonus)}</span></span>
               </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-5">
            <button 
              onClick={() => setActiveTab('Top-up')}
              className="gold-gradient text-navy px-8 sm:px-12 py-4 sm:py-6 rounded-2xl sm:rounded-3xl font-display font-black uppercase text-[10px] sm:text-xs tracking-[0.2em] sm:tracking-[0.3em] transition-all flex items-center justify-center gap-3 sm:gap-4 shadow-xl gold-glow active:scale-95"
            >
              <Plus size={20} className="sm:size-6" />
              Fund Wallet
            </button>
            <button 
              onClick={() => setActiveTab('Withdraw')}
              className="bg-navy-light text-white border border-white/10 px-8 sm:px-12 py-4 sm:py-6 rounded-2xl sm:rounded-3xl font-display font-black uppercase text-[10px] sm:text-xs tracking-[0.2em] sm:tracking-[0.3em] transition-all flex items-center justify-center gap-3 sm:gap-4 active:scale-95 hover:border-gold/30 hover:text-gold"
            >
              <ArrowUpRight size={20} className="sm:size-6" />
              Withdraw
            </button>
          </div>
        </div>
        <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-gold/5 rounded-full blur-[100px]" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-12">
        {/* Main Action Area */}
        <div className="lg:col-span-2 space-y-8 sm:space-y-10">
          <div className="bg-navy rounded-[40px] sm:rounded-[56px] border border-white/5 p-6 sm:p-14 shadow-2xl">
            <div className="flex overflow-x-auto pb-4 gap-2 sm:gap-3 scrollbar-hide snap-x bg-navy-light/50 p-1.5 sm:p-2 rounded-[24px] sm:rounded-[32px] border border-white/5 mb-8 sm:mb-12">
              {['Top-up', 'Withdraw', 'Bill Payment'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={cn(
                    "px-6 py-3 sm:px-10 sm:py-4 rounded-xl sm:rounded-[24px] font-display font-bold text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.3em] transition-all whitespace-nowrap snap-center flex-1",
                    activeTab === tab 
                      ? "bg-gold text-navy gold-glow shadow-xl" 
                      : "text-slate-500 hover:text-white"
                  )}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="space-y-6 sm:space-y-8">
              <div>
                <label className="block text-[8px] sm:text-[10px] font-display font-black text-slate-500 uppercase tracking-[0.3em] sm:tracking-[0.5em] mb-4 sm:mb-6 px-1">
                  {activeTab === 'Bill Payment' ? 'Select Utility Protocol' : 'Enter Amount (NGN)'}
                </label>
                {activeTab === 'Bill Payment' ? (
                  <div className="space-y-6 sm:space-y-8">
                    {!billType ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                        <button 
                          onClick={() => setBillType('airtime')}
                          className="flex items-center justify-between p-6 sm:p-8 border-2 border-white/5 rounded-[32px] sm:rounded-[40px] group hover:border-gold/30 transition-all bg-navy-light/40 relative overflow-hidden"
                        >
                           <div className="flex items-center gap-4 sm:gap-5 relative z-10">
                              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-navy rounded-2xl sm:rounded-3xl shadow-2xl flex items-center justify-center border border-white/5 group-hover:gold-glow transition-all">
                                 <Smartphone size={24} className="text-gold sm:size-7" />
                              </div>
                              <div className="text-left">
                                 <p className="font-display font-black text-white leading-none mb-1 sm:mb-2 uppercase text-[10px] sm:text-xs tracking-widest italic group-hover:text-gold transition-colors">Airtime</p>
                                 <p className="text-slate-500 text-[8px] sm:text-[10px] font-display font-bold uppercase tracking-[0.3em]">Instant Load</p>
                              </div>
                           </div>
                           <ChevronRight size={18} className="sm:size-5 text-slate-600 group-hover:text-gold transition-colors relative z-10" />
                           <div className="absolute -right-8 -bottom-8 w-24 h-24 bg-gold/5 rounded-full blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity" />
                        </button>
                        <button 
                          onClick={() => setBillType('data')}
                          className="flex items-center justify-between p-6 sm:p-8 border-2 border-white/5 rounded-[32px] sm:rounded-[40px] group hover:border-gold/30 transition-all bg-navy-light/40 relative overflow-hidden"
                        >
                           <div className="flex items-center gap-4 sm:gap-5 relative z-10">
                              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-navy rounded-2xl sm:rounded-3xl shadow-2xl flex items-center justify-center border border-white/5 group-hover:gold-glow transition-all">
                                 <Globe size={24} className="text-gold sm:size-7" />
                              </div>
                              <div className="text-left">
                                 <p className="font-display font-black text-white leading-none mb-1 sm:mb-2 uppercase text-[10px] sm:text-xs tracking-widest italic group-hover:text-gold transition-colors">Data</p>
                                 <p className="text-slate-500 text-[8px] sm:text-[10px] font-display font-bold uppercase tracking-[0.3em]">H-Speed Feed</p>
                              </div>
                           </div>
                           <ChevronRight size={18} className="sm:size-5 text-slate-600 group-hover:text-gold transition-colors relative z-10" />
                           <div className="absolute -right-8 -bottom-8 w-24 h-24 bg-gold/5 rounded-full blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity" />
                        </button>
                      </div>
                    ) : (
                      <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-8"
                      >
                        <button 
                          onClick={() => setBillType(null)}
                          className="text-[10px] font-display font-black text-gold uppercase tracking-[0.5em] flex items-center gap-3 mb-6 bg-gold/5 px-6 py-3 rounded-full border border-gold/10 w-fit hover:bg-gold/10 transition-all"
                        >
                          <ChevronLeft size={16} /> Back to Hub
                        </button>
                        
                        <div className="space-y-6">
                          <label className="block text-[10px] font-display font-bold text-slate-500 uppercase tracking-[0.4em] px-1">Carrier Network</label>
                          <div className="grid grid-cols-4 gap-3">
                             {['MTN', 'Airtel', 'Glo', '9mobile'].map(n => (
                               <button 
                                 key={n}
                                 onClick={() => setNetwork(n)}
                                 className={cn(
                                   "py-4 rounded-[20px] border-2 font-display font-black text-xs uppercase tracking-widest transition-all",
                                   network === n ? "bg-gold border-gold text-navy gold-glow" : "bg-navy-light border-white/5 text-slate-500 hover:border-gold/30 hover:text-white"
                                 )}
                               >
                                 {n}
                               </button>
                             ))}
                          </div>
                        </div>

                        <div className="space-y-6">
                          <label className="block text-[10px] font-display font-bold text-slate-500 uppercase tracking-[0.4em] px-1">MSISDN / Phone Number</label>
                          <input 
                            type="tel" 
                            placeholder="080 0000 0000"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            className="w-full bg-navy-light border border-white/5 rounded-3xl py-5 px-8 text-lg font-display font-black text-white focus:outline-none focus:border-gold transition-all"
                          />
                        </div>

                        <div className="space-y-6">
                          <label className="block text-[10px] font-display font-bold text-slate-500 uppercase tracking-[0.4em] px-1">Transaction Value</label>
                          <input 
                            type="number" 
                            placeholder="0.00"
                            value={fundingAmount}
                            onChange={(e) => setFundingAmount(e.target.value)}
                            className="w-full bg-navy-light border border-white/5 rounded-3xl py-5 px-8 text-lg font-display font-black text-white focus:outline-none focus:border-gold transition-all"
                          />
                        </div>
                      </motion.div>
                    )}
                  </div>
                ) : (
                  <div className="relative group">
                    <div className="absolute left-8 top-1/2 -translate-y-1/2 font-display font-black text-4xl text-slate-700 group-focus-within:text-gold transition-colors italic">₦</div>
                    <input 
                      type="number" 
                      placeholder="0.00"
                      value={fundingAmount}
                      onChange={(e) => setFundingAmount(e.target.value)}
                      className="w-full bg-navy-light border-2 border-white/5 rounded-[40px] py-10 pl-20 pr-10 text-5xl font-display font-black text-white focus:outline-none focus:border-gold transition-all italic tracking-tighter"
                    />
                    <div className="absolute right-10 top-1/2 -translate-y-1/2 opacity-20 pointer-events-none uppercase font-display font-black tracking-[0.5em]">Capital</div>
                  </div>
                )}
              </div>

              {activeTab !== 'Bill Payment' && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                   {[1000, 5000, 10000, 20000].map(amt => (
                     <button 
                       key={amt}
                       onClick={() => setFundingAmount(amt.toString())}
                       className="py-4 border-2 border-white/5 rounded-2xl text-slate-500 font-display font-bold text-[10px] uppercase tracking-[0.2em] hover:border-gold hover:text-white transition-all text-center bg-navy-light"
                     >
                       {formatCurrency(amt)}
                     </button>
                   ))}
                </div>
              )}

              <div className="pt-8">
                <button 
                  onClick={handleAction}
                  disabled={loading || (!fundingAmount && activeTab !== 'Bill Payment')}
                  className="w-full py-6 gold-gradient text-navy rounded-[32px] font-display font-black uppercase text-sm tracking-[0.4em] hover:scale-[1.02] active:scale-95 transition-all shadow-2xl gold-glow disabled:opacity-30 disabled:cursor-not-allowed italic"
                >
                  {loading ? 'Processing Node Trans...' : `Execute ${activeTab}`}
                </button>
              </div>

              <div className="flex items-center justify-center gap-4 text-gold font-display font-bold text-[10px] uppercase tracking-[0.4em] opacity-60 bg-gold/5 py-4 rounded-3xl border border-gold/10">
                 <ShieldCheck size={18} />
                 Nexus Security Protocol Active
              </div>
            </div>
          </div>
        </div>

        {/* Payment Methods / Info */}
        <div className="space-y-10">
           <div className="bg-navy rounded-[48px] border border-white/5 p-10 shadow-2xl relative overflow-hidden">
              <h3 className="text-2xl font-display font-black text-white uppercase italic tracking-tighter mb-10 flex items-center gap-4">
                 <History size={28} className="text-gold" />
                 Ledger
              </h3>
              <div className="space-y-8 relative z-10">
                 {[1, 2, 3].map(i => (
                    <div key={i} className="flex items-center justify-between group">
                       <div className="flex items-center gap-4">
                          <div className={cn(
                            "w-14 h-14 rounded-2xl flex items-center justify-center border border-white/5",
                            i === 2 ? "bg-red-500/10 text-red-500" : "bg-emerald-500/10 text-emerald-500"
                          )}>
                             {i === 2 ? <TrendingDown size={24} /> : <TrendingUp size={24} />}
                          </div>
                          <div>
                             <p className="text-xs font-display font-black text-white leading-none mb-1 uppercase tracking-tight italic">
                                {i === 2 ? 'Withdrawal' : 'Top-up'}
                             </p>
                             <p className="text-[10px] font-display font-bold text-slate-500 uppercase tracking-[0.2em]">MAR 24, 2024</p>
                          </div>
                       </div>
                       <p className={cn(
                         "font-display font-black text-sm uppercase italic tracking-tighter",
                         i === 2 ? "text-red-500" : "text-emerald-500"
                       )}>
                          {i === 2 ? '- ' : '+ '}{formatCurrency(i * 2000)}
                       </p>
                    </div>
                 ))}
              </div>
              <button className="w-full mt-10 py-4 text-gold font-display font-bold text-[10px] uppercase tracking-[0.4em] hover:text-white transition-all bg-gold/5 rounded-2xl border border-gold/10">
                 Access Full Logs
              </button>
              <div className="absolute -left-10 -bottom-10 w-48 h-48 bg-gold/5 rounded-full blur-[60px]" />
           </div>

           <div className="bg-navy rounded-[48px] p-10 border border-white/5 shadow-2xl">
              <h3 className="text-xs font-display font-bold text-gold uppercase tracking-[0.4em] mb-8">Node Inlets</h3>
              <div className="flex flex-wrap gap-4">
                 <div className="bg-navy-light p-4 rounded-2xl border border-white/5 shadow-xl"><CreditCard size={28} className="text-white/60" /></div>
                 <div className="bg-navy-light p-4 rounded-2xl border border-white/5 shadow-xl"><Banknote size={28} className="text-white/60" /></div>
                 <div className="bg-navy-light p-4 rounded-2xl border border-white/5 shadow-xl"><Smartphone size={28} className="text-white/60" /></div>
              </div>
              <p className="mt-10 text-[10px] font-display font-bold text-slate-500 uppercase leading-relaxed tracking-[0.2em] italic">
                Transactions settle through encrypted relay nodes. Node latency: <span className="text-gold">0.4ms</span>
              </p>
           </div>
        </div>
      </div>
    </div>
  );
}
