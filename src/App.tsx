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

export default function App() {
  const [user, setUser] = useState<any>(null); // To be replaced with Auth state

  // Mock persistence for demo
  useEffect(() => {
    const savedUser = localStorage.getItem('nezora_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = (userData: any) => {
    setUser(userData);
    localStorage.setItem('nezora_user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('nezora_user');
  };

  const updateUser = (updatedUser: any) => {
    setUser(updatedUser);
    localStorage.setItem('nezora_user', JSON.stringify(updatedUser));
  };

  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<LandingPage user={user} />} />
        <Route path="/auth" element={<AuthPage onLogin={login} />} />
        
        {/* Protected Routes */}
        <Route 
          path="/dashboard" 
          element={user ? <DashboardLayout user={user} onLogout={logout} /> : <Navigate to="/auth" />}
        >
          <Route index element={<DashboardPage user={user} />} />
          <Route path="tasks" element={<TasksPage user={user} />} />
          <Route path="courses" element={<CoursesPage user={user} />} />
          <Route path="wallet" element={<WalletPage user={user} />} />
          <Route path="games" element={<GamificationPage user={user} />} />
          <Route path="contests" element={<ContestsPage user={user} />} />
          <Route path="leaderboard" element={<LeaderboardPage />} />
          <Route path="profile" element={<ProfilePage user={user} onUpdateUser={updateUser} />} />
          <Route path="admin" element={user?.role === 'admin' ? <AdminPage /> : <Navigate to="/dashboard" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
