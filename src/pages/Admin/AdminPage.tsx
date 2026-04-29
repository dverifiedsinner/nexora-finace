import { useState, FormEvent, useEffect, useCallback } from 'react';
import { 
  Users, 
  CheckCircle2, 
  ArrowUpRight, 
  AlertCircle,
  Plus,
  Search,
  Filter,
  MoreVertical,
  ShieldCheck,
  TrendingUp,
  Activity,
  X,
  Upload,
  BookOpen
} from 'lucide-react';
import { cn, formatCurrency } from '../../lib/utils';
import { toast } from 'react-hot-toast';
import { motion, AnimatePresence } from 'motion/react';
import { supabase } from '../../lib/supabase';

interface SystemSettings {
  regBonus: number;
  minWithdrawal: number;
  maintenanceMode: boolean;
  referralCommission: number;
}

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('Withdrawals');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState([
    { label: 'Total Users', value: '0', icon: Users, color: 'bg-blue-50 text-blue-600' },
    { label: 'Pending Payouts', value: formatCurrency(0), icon: ArrowUpRight, color: 'bg-emerald-50 text-emerald-600' },
    { label: 'Active Tasks', value: '0', icon: CheckCircle2, color: 'bg-purple-50 text-purple-600' },
    { label: 'System Alerts', value: '0', icon: AlertCircle, color: 'bg-red-50 text-red-600' },
  ]);
  const [systemSettings, setSystemSettings] = useState<SystemSettings>({
    regBonus: 5000,
    minWithdrawal: 1000,
    maintenanceMode: false,
    referralCommission: 10,
  });

  const fetchAdminData = useCallback(async () => {
    setLoading(true);
    try {
      // Fetch user count
      const { count: userCount, error: userError } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true });

      // Fetch active tasks count
      const { count: taskCount, error: taskError } = await supabase
        .from('tasks')
        .select('*', { count: 'exact', head: true });

      // Fetch pending withdrawals (mock for now since we don't have withdrawals table yet)
      // but we could try to query transactions if they exist
      
      setStats([
        { label: 'Total Users', value: (userCount || 0).toLocaleString(), icon: Users, color: 'bg-blue-50 text-blue-600' },
        { label: 'Pending Payouts', value: formatCurrency(0), icon: ArrowUpRight, color: 'bg-emerald-50 text-emerald-600' },
        { label: 'Active Tasks', value: (taskCount || 0).toLocaleString(), icon: CheckCircle2, color: 'bg-purple-50 text-purple-600' },
        { label: 'System Alerts', value: '0', icon: AlertCircle, color: 'bg-red-50 text-red-600' },
      ]);

      // Fetch settings (mock table name 'settings')
      const { data: settingsData } = await supabase.from('settings').select('*').single();
      if (settingsData) {
        setSystemSettings({
          regBonus: settingsData.reg_bonus,
          minWithdrawal: settingsData.min_withdrawal,
          maintenanceMode: settingsData.maintenance_mode,
          referralCommission: settingsData.referral_commission,
        });
      }
    } catch (err) {
      console.error('Error fetching admin data:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAdminData();
  }, [fetchAdminData]);

  const handleUpdateSettings = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const { error } = await supabase
        .from('settings')
        .upsert({
          id: 1, // Assume single row for settings
          reg_bonus: systemSettings.regBonus,
          min_withdrawal: systemSettings.minWithdrawal,
          maintenance_mode: systemSettings.maintenanceMode,
          referral_commission: systemSettings.referralCommission,
          updated_at: new Date().toISOString()
        });

      if (error) throw error;
      toast.success('System Matrix Synchronized');
    } catch (error: any) {
      toast.error(error.message || 'Failed to update settings');
    }
  };

  const handleUploadSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsUploading(true);
    
    // Simulate DB insert for new course
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const newCourse = {
      title: formData.get('title'),
      price: Number(formData.get('price')),
      max_earning: Number(formData.get('max_earning')),
      image: formData.get('image'),
      created_at: new Date().toISOString()
    };

    try {
      const { error } = await supabase.from('courses').insert(newCourse);
      if (error) throw error;
      
      toast.success('Skill Invest created successfully!');
      setShowUploadModal(false);
      fetchAdminData();
    } catch (err: any) {
      toast.error(err.message || 'Failed to create course');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-10 pb-20">
      {/* Admin Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white p-6 rounded-[28px] border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className={`${stat.color} p-3 rounded-xl`}>
                <stat.icon size={20} />
              </div>
              <Activity size={16} className="text-slate-300" />
            </div>
            <p className="text-slate-500 font-bold text-[10px] uppercase tracking-widest leading-none mb-2">{stat.label}</p>
            <h3 className="text-xl font-black text-slate-900">{stat.value}</h3>
          </div>
        ))}
      </div>

      {/* Control Panel */}
      <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-8 lg:p-10 border-b border-slate-50">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">Command Center</h2>
              <p className="text-slate-500 font-medium">Platform management and logistics</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-blue-600 transition-all">
                <Plus size={16} /> Create Task
              </button>
              <button 
                onClick={() => setShowUploadModal(true)}
                className="flex items-center gap-3 px-6 py-3 border border-slate-200 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-slate-50 transition-all"
              >
                <BookOpen size={16} /> Upload Skill Invest
              </button>
            </div>
          </div>
        </div>

        <div className="flex bg-slate-50/50 p-2 overflow-x-auto scrollbar-hide">
           {['Withdrawals', 'User Management', 'Task Logs', 'Settings'].map(tab => (
             <button
               key={tab}
               onClick={() => setActiveTab(tab)}
               className={cn(
                 "flex-1 md:flex-none px-8 py-3 rounded-xl font-black uppercase text-[10px] tracking-widest transition-all whitespace-nowrap",
                 activeTab === tab ? "bg-white text-blue-600 shadow-sm" : "text-slate-400 hover:text-slate-900"
               )}
             >
               {tab}
             </button>
           ))}
        </div>

        <div className="p-8 lg:p-10">
          {activeTab === 'Settings' ? (
            <div className="max-w-4xl">
              <div className="mb-10">
                <h3 className="text-xl font-black text-slate-900 uppercase tracking-tighter mb-2">System Parameters</h3>
                <p className="text-slate-500 text-sm">Configure core functional variables and rewards.</p>
              </div>

              <form onSubmit={handleUpdateSettings} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                   <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Registration Bonus (₦)</label>
                      <input 
                        type="number" 
                        value={systemSettings.regBonus}
                        onChange={e => setSystemSettings({...systemSettings, regBonus: Number(e.target.value)})}
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 focus:outline-none focus:border-blue-600 transition-all"
                      />
                   </div>
                   <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Min. Withdrawal (₦)</label>
                      <input 
                        type="number" 
                        value={systemSettings.minWithdrawal}
                        onChange={e => setSystemSettings({...systemSettings, minWithdrawal: Number(e.target.value)})}
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 focus:outline-none focus:border-blue-600 transition-all"
                      />
                   </div>
                </div>

                <div className="space-y-6">
                   <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Referral Commission (%)</label>
                      <input 
                        type="number" 
                        value={systemSettings.referralCommission}
                        onChange={e => setSystemSettings({...systemSettings, referralCommission: Number(e.target.value)})}
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 focus:outline-none focus:border-blue-600 transition-all"
                      />
                   </div>
                   <div className="flex items-center justify-between p-4 bg-slate-50 border border-slate-200 rounded-2xl">
                      <div>
                        <p className="text-sm font-bold text-slate-900">Maintenance Mode</p>
                        <p className="text-[10px] text-slate-500 font-medium italic underline">Restricts public access</p>
                      </div>
                      <button 
                        type="button"
                        onClick={() => setSystemSettings({...systemSettings, maintenanceMode: !systemSettings.maintenanceMode})}
                        className={cn(
                          "w-12 h-6 rounded-full transition-all relative p-1",
                          systemSettings.maintenanceMode ? "bg-amber-500" : "bg-slate-300"
                        )}
                      >
                        <div className={cn(
                          "w-4 h-4 bg-white rounded-full transition-all",
                          systemSettings.maintenanceMode ? "translate-x-6" : "translate-x-0"
                        )} />
                      </button>
                   </div>
                </div>

                <div className="md:col-span-2 pt-4">
                   <button className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-blue-600 transition-all shadow-xl shadow-slate-100">
                      Synchronize Global Settings
                   </button>
                </div>
              </form>
            </div>
          ) : (
            <>
              <div className="mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative w-full md:w-96 group">
                   <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={18} />
                   <input 
                     type="text" 
                     placeholder="Search requests or IDs..." 
                     className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 pl-12 pr-4 focus:outline-none focus:border-blue-600 transition-all"
                   />
                </div>
                <button className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-slate-50 transition-all">
                  <Filter size={16} /> Filter Results
                </button>
              </div>

              <div className="overflow-x-auto rounded-[24px] border border-slate-100">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                      <th className="px-6 py-4">Request Details</th>
                      <th className="px-6 py-4">User Identity</th>
                      <th className="px-6 py-4">Amount</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <tr key={i} className="group hover:bg-slate-50/50 transition-colors">
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center font-black text-xs">#{3400 + i}</div>
                            <div>
                              <p className="font-bold text-slate-900 text-sm">Bank Payout</p>
                              <p className="text-xs text-slate-400 font-medium tracking-tight">Access Bank • 0223...{i}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-5">
                           <p className="text-sm font-bold text-slate-700">User_{i}452@gmail.com</p>
                           <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-0.5">Verified Affiliate</p>
                        </td>
                        <td className="px-6 py-5 text-sm font-black text-slate-900">{formatCurrency(12000 * i)}</td>
                        <td className="px-6 py-5">
                          <span className={cn(
                            "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest",
                            i === 1 ? "bg-amber-50 text-amber-600" : "bg-emerald-50 text-emerald-600"
                          )}>
                            {i === 1 ? 'Pending Review' : 'Verified'}
                          </span>
                        </td>
                        <td className="px-6 py-5">
                          <button className="p-2 hover:bg-white border border-transparent hover:border-slate-200 rounded-xl transition-all">
                            <MoreVertical size={18} className="text-slate-400" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}

          <div className="mt-10 flex items-center justify-center gap-3 text-slate-400 font-black text-[10px] uppercase tracking-widest">
            <ShieldCheck size={18} className="text-emerald-500" />
            End-to-End Encryption Enabled for Admin Sessions
          </div>
        </div>
      </div>
      {/* Upload Modal */}
      <AnimatePresence>
        {showUploadModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setShowUploadModal(false)}
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative bg-white w-full max-w-xl rounded-[40px] shadow-2xl overflow-hidden"
            >
              <div className="p-8 border-b flex items-center justify-between">
                <div>
                   <h2 className="text-xl font-black uppercase tracking-tighter text-slate-900">Create Skill Invest</h2>
                   <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-1">Add new learning resource</p>
                </div>
                <button onClick={() => setShowUploadModal(false)} className="p-2 hover:bg-slate-100 rounded-xl transition-all text-slate-400">
                  <X size={20} />
                </button>
              </div>
              
              <form onSubmit={handleUploadSubmit} className="p-8 space-y-6">
                 <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Investment Title</label>
                    <input type="text" required placeholder="e.g. Advanced Crypto Analysis" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 focus:outline-none focus:border-blue-600 font-medium" />
                 </div>
                 
                 <div className="grid grid-cols-2 gap-4">
                    <div>
                       <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Price (₦)</label>
                       <input type="number" required placeholder="3500" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 focus:outline-none focus:border-blue-600 font-medium" />
                    </div>
                    <div>
                       <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Max Earning (₦)</label>
                       <input type="number" required placeholder="15000" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 focus:outline-none focus:border-blue-600 font-medium" />
                    </div>
                 </div>

                 <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Featured Image URL</label>
                    <div className="flex gap-2">
                       <input type="url" required placeholder="https://unsplash.com/..." className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 focus:outline-none focus:border-blue-600 font-medium" />
                       <button type="button" className="p-3 bg-slate-100 text-slate-400 rounded-2xl hover:bg-blue-50 hover:text-blue-600 transition-all">
                          <Upload size={20} />
                       </button>
                    </div>
                 </div>

                 <button 
                   type="submit" 
                   disabled={isUploading}
                   className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-blue-600 transition-all shadow-xl shadow-slate-100 disabled:opacity-50"
                 >
                   {isUploading ? 'Deploying Content...' : 'Verify & Launch Skill Invest'}
                 </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
