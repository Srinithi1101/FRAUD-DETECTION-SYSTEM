import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import DashboardPage from './pages/DashboardPage';
import TransactionCheckPage from './pages/TransactionCheckPage';
import TransactionHistoryPage from './pages/TransactionHistoryPage';
import AlertsPage from './pages/AlertsPage';
import LoginPage from './pages/LoginPage';

export default function App() {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('fraud_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [activeTab, setActiveTab] = useState('dashboard');

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    localStorage.setItem('fraud_user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('fraud_user');
  };

  if (!user) {
    return <LoginPage onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#0f172a' }}>
      <Navbar user={user} onLogout={handleLogout} />

      <div style={{ display: 'flex', flex: 1 }}>
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

        <main style={{ flex: 1, padding: '32px', overflowY: 'auto', backgroundColor: '#0f172a' }}>
          {activeTab === 'dashboard' && <DashboardPage />}
          {activeTab === 'check' && <TransactionCheckPage />}
          {activeTab === 'history' && <TransactionHistoryPage />}
          {activeTab === 'alerts' && <AlertsPage />}
        </main>
      </div>
    </div>
  );
}
