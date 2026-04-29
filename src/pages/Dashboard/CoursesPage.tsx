import { useState } from 'react';
import { 
  Play, 
  Star, 
  Clock, 
  Award,
  BookOpen,
  ArrowRight,
  Gem,
  Lock,
  X,
  CheckCircle2,
  Trophy
} from 'lucide-react';
import { cn, formatCurrency } from '../../lib/utils';
import { toast } from 'react-hot-toast';
import { motion, AnimatePresence } from 'motion/react';

interface Question {
  id: string;
  text: string;
  options: string[];
  correct: number;
}

interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  duration: string;
  price: number;
  maxEarning: number;
  level: string;
  enrolled: number;
  rating: number;
  image: string;
  quiz?: Question[];
}

const COURSES: Course[] = [
  {
    id: '1',
    title: 'Advanced Social Media Arbitrage',
    description: 'Learn how to monetize social traffic using automated task systems and digital assets.',
    instructor: 'A. Salam',
    duration: '4.5 Hours',
    price: 3500,
    maxEarning: 15000,
    level: 'Intermediate',
    enrolled: 1240,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80',
    quiz: [
      { id: 'q1', text: 'Which platform is best for arbitrage traffic?', options: ['Facebook', 'LinkedIn', 'Slack', 'Excel'], correct: 0 },
      { id: 'q2', text: 'Primary goal of digital asset monetization?', options: ['Buying cars', 'Revenue generation', 'Deleting files', 'None'], correct: 1 },
      { id: 'q3', text: 'What is CPM in digital advertising?', options: ['Cost Per Million', 'Cost Per Mile', 'Cost Per Mille', 'Cost Per Message'], correct: 2 },
      { id: 'q4', text: 'The concept of Arbitrage relies on what?', options: ['Price Difference', 'Good Luck', 'Hard Work', 'Government Aid'], correct: 0 },
      { id: 'q5', text: 'High-quality traffic usually leads to?', options: ['Lower ROI', 'Higher Conversions', 'System Failure', 'Server Crashes'], correct: 1 },
      { id: 'q6', text: 'What is a Landing Page?', options: ['Airport Runway', 'First page a visitor sees', 'Final checkout page', 'Error 404'], correct: 1 },
      { id: 'q7', text: 'CTR stands for?', options: ['Click Total Rate', 'Click Through Rate', 'Call To Review', 'None'], correct: 1 },
      { id: 'q8', text: 'Which is a common arbitrage niche?', options: ['Gaming', 'Weather', 'Sleep', 'Walking'], correct: 0 },
      { id: 'q9', text: 'ROI calculation is?', options: ['Sales + Cost', '(Net Profit / Cost) * 100', 'Revenue - Tax', 'Cost / 2'], correct: 1 },
      { id: 'q10', text: 'Scaling an arbitrage campaign means?', options: ['Decreasing budget', 'Increasing budget', 'Changing name', 'Deleting campaign'], correct: 1 },
    ]
  },
  {
    id: '2',
    title: 'Crypto Airdrop Mastery 2024',
    description: 'The complete guide to hunting high-value airdrops with zero financial risk.',
    instructor: 'D. Chhy',
    duration: '6 Hours',
    price: 5000,
    maxEarning: 25000,
    level: 'Beginner',
    enrolled: 3200,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1621761191319-c6fb62004009?auto=format&fit=crop&q=80',
    quiz: [
      { id: 'q1', text: 'What is a wallet address?', options: ['Home address', 'Digital identifier', 'A storage box', 'Email'], correct: 1 },
      { id: 'q2', text: 'What is Web3?', options: ['Internet of things', 'Decentralized web', 'Legacy internet', 'Private network'], correct: 1 },
      { id: 'q3', text: 'A seed phrase usually has how many words?', options: ['1 word', '12 or 24 words', '100 words', 'No words'], correct: 1 },
      { id: 'q4', text: 'What is Gas in crypto?', options: ['Fuel for cars', 'Transaction fee', 'Breathable air', 'Type of token'], correct: 1 },
      { id: 'q5', text: 'DeFi stands for?', options: ['Design Finance', 'Decentralized Finance', 'Deep Fiber', 'Digital File'], correct: 1 },
      { id: 'q6', text: 'An NFT is?', options: ['Normal File Transfer', 'Non-Fungible Token', 'New Financial Tool', 'None'], correct: 1 },
      { id: 'q7', text: 'What is Mainnet?', options: ['Alpha testing', 'Working live blockchain', 'Private test network', 'Browser extension'], correct: 1 },
      { id: 'q8', text: 'Liquidity mining refers to?', options: ['Mining gold', 'Providing tokens to pools', 'Cleaning servers', 'Selling data'], correct: 1 },
      { id: 'q9', text: 'HODL means?', options: ['Sell fast', 'Hold on for dear life', 'Help other digital lovers', 'Hide original data logs'], correct: 1 },
      { id: 'q10', text: 'A "Rug Pull" is?', options: ['Cleaning the floor', 'Developer exit scam', 'Buying a new rug', 'Price increase'], correct: 1 },
    ]
  }
];

export default function CoursesPage({ user }: { user: any }) {
  const [purchasing, setPurchasing] = useState<string | null>(null);
  const [activeQuiz, setActiveQuiz] = useState<Course | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [liveEarning, setLiveEarning] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const handlePurchase = (courseId: string) => {
    setPurchasing(courseId);
    setTimeout(() => {
      setPurchasing(null);
      const course = COURSES.find(c => c.id === courseId);
      if (course) {
        setActiveQuiz(course);
        setCurrentQuestionIndex(0);
        setLiveEarning(0);
        setShowResult(false);
      }
      toast.success('Skill Invest secured! Activation quiz unlocked.');
    }, 2000);
  };

  const handleAnswer = (optionIndex: number) => {
    if (!activeQuiz) return;
    
    const currentQuestion = activeCourseQuiz[currentQuestionIndex];
    const earningPerQuestion = activeQuiz.maxEarning / (activeQuiz.quiz?.length || 10);
    
    if (optionIndex === currentQuestion.correct) {
      setLiveEarning(prev => prev + earningPerQuestion);
      toast.success('Protocol Match: Reward Mapped!', { duration: 1000 });
    } else {
      setLiveEarning(prev => Math.max(0, prev - earningPerQuestion * 0.5));
      toast.error('Protocol Error: Correction Cycle Initialized', { duration: 1000 });
    }

    if (currentQuestionIndex < (activeQuiz.quiz?.length || 10) - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setShowResult(true);
    }
  };

  const activeCourseQuiz = activeQuiz?.quiz || [];

  return (
    <div className="space-y-12 pb-32">
      {/* Immersive Hero Section */}
      <div className="relative h-[400px] sm:h-[500px] w-full bg-[#01040a] rounded-[40px] sm:rounded-[64px] overflow-hidden shadow-2xl border border-white/5 mx-auto">
        <div className="absolute inset-0">
          <motion.div
            animate={{ 
              background: [
                'radial-gradient(circle at 20% 20%, rgba(255,184,0,0.15) 0%, transparent 50%)',
                'radial-gradient(circle at 80% 80%, rgba(255,184,0,0.15) 0%, transparent 50%)',
                'radial-gradient(circle at 20% 20%, rgba(255,184,0,0.15) 0%, transparent 50%)'
              ] 
            }}
            transition={{ duration: 10, repeat: Infinity }}
            className="absolute inset-0"
          />
          <img 
            src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80" 
            className="w-full h-full object-cover opacity-20 mix-blend-overlay"
            alt="Academy Background"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#01040a] via-transparent to-transparent" />
        </div>
        
        <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4 sm:px-16">
           <motion.div 
             initial={{ y: 20, opacity: 0 }}
             animate={{ y: 0, opacity: 1 }}
             className="bg-gold/10 text-gold border border-gold/20 px-4 py-1.5 sm:px-6 sm:py-2 rounded-full text-[8px] sm:text-[10px] font-display font-black tracking-[0.4em] sm:tracking-[0.5em] uppercase mb-6 sm:mb-8"
           >
              Nexus Market Intelligence
           </motion.div>
           <h1 className="text-4xl sm:text-9xl font-display font-black text-white uppercase italic tracking-tighter leading-[0.85] sm:leading-[0.8] mb-6 sm:mb-8">
              Skill <span className="text-gold">Yield</span><br className="hidden sm:block" /> Matrix
           </h1>
           <p className="text-slate-500 font-display font-bold uppercase text-[10px] sm:text-xs tracking-[0.4em] sm:tracking-[0.6em] mb-10 sm:mb-12 max-w-2xl leading-relaxed">
              Synthesize institutional knowledge into liquid portfolio assets.
           </p>
           <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
              <button className="gold-gradient text-navy px-10 sm:px-12 py-4 sm:py-6 rounded-2xl sm:rounded-3xl font-display font-black uppercase text-[10px] sm:text-xs tracking-[0.2em] sm:tracking-[0.3em] hover:scale-105 active:scale-95 transition-all shadow-xl gold-glow">
                 Deploy Capital
              </button>
              <div className="flex items-center gap-3 sm:gap-4 bg-white/5 border border-white/10 px-6 py-3 sm:px-8 sm:py-5 rounded-2xl sm:rounded-3xl backdrop-blur-xl">
                 <div className="flex -space-x-3 sm:-space-x-4">
                    {[1,2,3,4].map(i => (
                      <div key={i} className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 sm:border-4 border-navy bg-slate-800 overflow-hidden">
                        <img src={`https://i.pravatar.cc/100?u=${i + 10}`} alt="User" />
                      </div>
                    ))}
                 </div>
                 <span className="text-[8px] sm:text-[10px] font-display font-black text-gold uppercase tracking-widest whitespace-nowrap">12K+ ACTIVE NODES</span>
              </div>
           </div>
        </div>
      </div>

      <div className="flex items-center justify-between px-4">
        <h2 className="text-4xl font-display font-black text-white uppercase italic tracking-tighter">Liquid <span className="text-gold">Assets</span></h2>
        <div className="bg-gold/10 text-gold px-6 py-3 rounded-2xl border border-gold/20 font-display font-black text-[10px] uppercase tracking-widest animate-pulse">
           Live Yield Rates Enabled
        </div>
      </div>
      
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-10 px-2 sm:px-0">
        {COURSES.map((course) => (
          <div key={course.id} className="bg-navy rounded-[64px] border border-white/5 overflow-hidden hover:border-gold/30 transition-all duration-700 flex flex-col md:flex-row shadow-2xl group relative perspective-1000">
            <div className="md:w-2/5 relative h-80 md:h-auto overflow-hidden">
              <img 
                src={course.image} 
                alt={course.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 grayscale group-hover:grayscale-0" 
              />
              <div className="absolute inset-0 bg-navy/40 group-hover:bg-transparent transition-colors" />
              <div className="absolute top-8 left-8 z-20">
                 <div className="gold-gradient text-navy px-6 py-2 rounded-2xl text-[10px] font-display font-black tracking-widest uppercase italic shadow-2xl">
                    5X EARN
                 </div>
              </div>
            </div>
            
            <div className="flex-1 p-12 flex flex-col">
              <div className="flex items-center justify-between mb-8">
                <div className="flex gap-1">
                  {[1,2,3,4,5].map(i => <Star key={i} size={18} fill={i <= 4 ? "#FFB800" : "none"} className={i <= 4 ? "text-gold" : "text-white/10"} />)}
                </div>
                <div className="text-[10px] font-display font-black text-slate-500 flex items-center gap-3 uppercase tracking-widest bg-white/5 px-4 py-2 rounded-xl border border-white/5">
                   <Clock size={16} /> {course.duration}
                </div>
              </div>

              <h3 className="text-4xl font-display font-black text-white mb-4 leading-tight uppercase italic tracking-tighter group-hover:text-gold transition-colors">
                {course.title}
              </h3>
              <p className="text-slate-500 font-bold text-xs uppercase tracking-wider mb-10 line-clamp-2 leading-relaxed opacity-80">
                {course.description}
              </p>

              <div className="bg-[#0d152a] rounded-[40px] p-8 flex items-center justify-between mb-10 border border-white/5 shadow-inner">
                 <div>
                    <p className="text-[10px] font-display font-bold text-slate-500 uppercase tracking-[0.4em] mb-2">MAX YIELD</p>
                    <p className="text-3xl font-display font-black text-gold italic">{formatCurrency(course.maxEarning)}</p>
                 </div>
                 <div className="text-right">
                    <p className="text-[10px] font-display font-bold text-slate-500 uppercase tracking-[0.4em] mb-2">ENTRY STAKE</p>
                    <p className="text-3xl font-display font-black text-white italic">{formatCurrency(course.price)}</p>
                 </div>
              </div>

              <button 
                onClick={() => handlePurchase(course.id)}
                disabled={purchasing === course.id}
                className="mt-auto w-full bg-navy text-white border-2 border-white/10 group-hover:border-gold group-hover:gold-glow group-hover:bg-gold group-hover:text-navy py-6 rounded-[32px] font-display font-black uppercase text-xs tracking-[0.5em] transition-all flex items-center justify-center gap-4 active:scale-95"
              >
                {purchasing === course.id ? (
                  'SYNCING WITH NODE...'
                ) : (
                  <>
                    Deploy Portfolio
                    <ArrowRight size={22} className="group-hover:translate-x-2 transition-transform" />
                  </>
                )}
              </button>
            </div>
            
            <div className="absolute -right-12 -top-12 w-48 h-48 bg-gold/5 rounded-full blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        ))}
      </div>

      <AnimatePresence>
        {activeQuiz && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-[#01040a]/98 backdrop-blur-2xl"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 100 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 100 }}
              className="relative bg-navy w-full max-w-4xl rounded-[40px] sm:rounded-[64px] border border-white/10 shadow-[0_0_150px_rgba(255,184,0,0.15)] overflow-hidden flex flex-col h-[95vh] sm:h-[90vh]"
            >
               {/* 3D Header with Earning Tracker */}
               <div className="p-6 sm:p-12 border-b border-white/5 flex flex-col sm:flex-row sm:items-center justify-between bg-[#0d152a] gap-6 sm:gap-8">
                 <div>
                   <div className="flex items-center gap-3 mb-2 sm:mb-3">
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-emerald-500 rounded-full animate-pulse" />
                      <p className="text-gold font-display font-black text-[8px] sm:text-[10px] uppercase tracking-[0.4em] sm:tracking-[0.5em]">LIVE EARNING MATRIX</p>
                   </div>
                   <h2 className="text-3xl sm:text-7xl font-display font-black text-white italic tracking-tighter leading-none drop-shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                     {formatCurrency(liveEarning)}
                   </h2>
                 </div>
                 
                 <div className="text-left sm:text-right flex flex-col sm:items-end">
                    <p className="text-slate-500 font-display font-bold text-[8px] sm:text-[10px] uppercase tracking-[0.3em] mb-2 px-1">PROTOCOL CYCLE</p>
                    <div className="flex items-center gap-1.5 sm:gap-2">
                       {activeCourseQuiz.map((_, i) => (
                         <div key={i} className={cn(
                           "w-2 h-2 sm:w-3 sm:h-3 rounded-full border border-white/10",
                           i === currentQuestionIndex ? "bg-gold scale-125 sm:scale-150 gold-glow" : 
                           i < currentQuestionIndex ? "bg-emerald-500" : "bg-white/5"
                         )} />
                       ))}
                    </div>
                 </div>
               </div>

               <div className="flex-1 p-6 sm:p-12 overflow-y-auto custom-scrollbar flex flex-col justify-center items-center text-center">
                  {!showResult ? (
                    <AnimatePresence mode="wait">
                      <motion.div 
                        key={currentQuestionIndex}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="w-full max-w-2xl space-y-8 sm:space-y-12"
                      >
                        <h4 className="text-xl sm:text-5xl font-display font-black text-white italic tracking-tighter uppercase leading-[1] sm:leading-[0.9]">
                          {activeCourseQuiz[currentQuestionIndex].text}
                        </h4>
                        
                        <div className="grid grid-cols-1 gap-4 sm:gap-6 w-full">
                          {activeCourseQuiz[currentQuestionIndex].options.map((opt, oIndex) => (
                            <button
                              key={opt}
                              onClick={() => handleAnswer(oIndex)}
                              className="group relative text-center p-5 sm:p-8 rounded-[24px] sm:rounded-[40px] border-2 border-white/5 bg-[#0d152a] transition-all hover:border-gold hover:gold-glow overflow-hidden"
                            >
                              <span className="relative z-10 text-xs sm:text-lg font-display font-black uppercase italic tracking-widest sm:tracking-wider text-slate-300 group-hover:text-gold transition-colors">{opt}</span>
                              <div className="absolute inset-0 bg-gold opacity-0 group-active:opacity-10 transition-opacity" />
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  ) : (
                    <motion.div 
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="text-center space-y-8 sm:space-y-10"
                    >
                       <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gold/10 rounded-full flex items-center justify-center mx-auto border border-gold/20 gold-glow">
                          <Trophy size={48} className="sm:size-16 text-gold animate-bounce" />
                       </div>
                       <div>
                         <h3 className="text-3xl sm:text-7xl font-display font-black text-white italic tracking-tighter uppercase mb-4 leading-tight">Protocol Fully <br /> <span className="text-gold">Deployed</span></h3>
                         <p className="text-slate-500 font-display font-bold uppercase text-[8px] sm:text-xs tracking-[0.4em] sm:tracking-[0.5em]">Total Yield Credits Finalized</p>
                       </div>
                       <div className="text-4xl sm:text-8xl font-display font-black text-gold italic drop-shadow-3xl">
                          {formatCurrency(liveEarning)}
                       </div>
                       <button 
                         onClick={() => setActiveQuiz(null)}
                         className="gold-gradient text-navy px-12 sm:px-16 py-4 sm:py-6 rounded-[24px] sm:rounded-3xl font-display font-black uppercase text-[10px] sm:text-sm tracking-[0.3em] sm:tracking-[0.4em] shadow-2xl gold-glow active:scale-95 transition-all"
                       >
                          Return to Terminal
                       </button>
                    </motion.div>
                  )}
               </div>

               <div className="p-4 sm:p-8 border-t border-white/5 flex items-center justify-between text-slate-600 font-display font-bold text-[8px] sm:text-[10px] uppercase tracking-[0.4em] sm:tracking-[0.5em]">
                  <div className="flex items-center gap-2 sm:gap-3">
                     <Gem size={12} className="sm:size-3.5 text-gold" /> Nexus Node
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3">
                     <Lock size={12} className="sm:size-3.5" /> Asset Protection
                  </div>
               </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

