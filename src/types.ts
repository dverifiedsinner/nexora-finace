export interface User {
  id: string;
  email: string;
  displayName: string;
  wallet: {
    main: number;
    bonus: number;
    referral: number;
    investment: number;
  };
  referralCode: string;
  referredBy?: string;
  isVerified: boolean;
  role: 'user' | 'admin';
  createdAt: number;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  type: 'daily' | 'one-time' | 'sponsored';
  reward: number;
  wallet: 'main' | 'bonus';
  status: 'active' | 'archived';
}

export interface Course {
  id: string;
  title: string;
  description: string;
  price: number;
  modules: Module[];
  totalReward: number;
}

export interface Module {
  id: string;
  title: string;
  content: string;
  quiz: Quiz;
}

export interface Quiz {
  questions: Question[];
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
}

export interface Transaction {
  id: string;
  userId: string;
  amount: number;
  type: 'credit' | 'debit';
  wallet: 'main' | 'bonus' | 'referral' | 'investment';
  description: string;
  timestamp: number;
}
