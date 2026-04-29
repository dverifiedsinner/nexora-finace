/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useState, useEffect } from 'react';
import LandingPage from './pages/LandingPage';
import DashboardPage from './pages/Dashboard/DashboardPage';
import TasksPage from './pages/Dashboard/TasksPage';
import CoursesPage from './pages/Dashboard/CoursesPage';
import WalletPage from './pages/Dashboard/WalletPage';
import GamificationPage from './pages/Dashboard/GamificationPage';
import AdminPage from './pages/Admin/AdminPage';
import AuthPage from './pages/AuthPage';
import DashboardLayout from './components/layout/DashboardLayout';
import ProfilePage from './pages/Dashboard/ProfilePage';
import ContestsPage from './pages/Dashboard/ContestsPage';
import LeaderboardPage from './pages/Dashboard/LeaderboardPage';
import { supabase } from './lib/supabase';

export default function App() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check initial session
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        await loadProfile(session.user.id);
      }
      setLoading(false);
    };

    checkSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session) {
        await loadProfile(session.user.id);
      } else {
        setUser(null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const loadProfile = async (userId: string) => {
    try {
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error loading profile:', error);
        // Fallback for demo if profiles table missing
        setUser({ id: userId, email: 'loading@error.com', displayName: 'Nexus User', role: 'user', wallet: { main: 0, bonus: 500, referral: 0, investment: 0 } });
      } else {
        setUser(profile);
      }
    } catch (err) {
      console.error('Unexpected error loading profile:', err);
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  const refreshProfile = async () => {
    if (user?.id) {
      await loadProfile(user.id);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-navy flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-gold border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<LandingPage user={user} />} />
        <Route path="/auth" element={<AuthPage onLogin={() => {}} />} />
        
        {/* Protected Routes */}
        <Route 
          path="/dashboard" 
          element={user ? <DashboardLayout user={user} onLogout={logout} /> : <Navigate to="/auth" />}
        >
          <Route index element={<DashboardPage user={user} refreshProfile={refreshProfile} />} />
          <Route path="tasks" element={<TasksPage user={user} refreshProfile={refreshProfile} />} />
          <Route path="courses" element={<CoursesPage user={user} refreshProfile={refreshProfile} />} />
          <Route path="wallet" element={<WalletPage user={user} refreshProfile={refreshProfile} />} />
          <Route path="games" element={<GamificationPage user={user} refreshProfile={refreshProfile} />} />
          <Route path="contests" element={<ContestsPage user={user} refreshProfile={refreshProfile} />} />
          <Route path="leaderboard" element={<LeaderboardPage />} />
          <Route path="profile" element={<ProfilePage user={user} onUpdateUser={refreshProfile} />} />
          <Route path="admin" element={user?.role === 'admin' ? <AdminPage /> : <Navigate to="/dashboard" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
