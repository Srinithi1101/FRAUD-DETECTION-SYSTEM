import React, { useEffect, useState } from 'react';
import { fetchDashboardStatsApi } from '../services/api';
import StatCard from '../components/StatCard';
import { Activity, ShieldCheck, AlertCircle, ShieldAlert, Percent, Gauge } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';

export default function DashboardPage() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      setLoading(true);
      const data = await fetchDashboardStatsApi();
      setStats(data);
    } catch (err) {
      setError(err.message || 'Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div style={{ padding: '40px', color: '#94a3b8' }}>Loading Dashboard Statistics...</div>;
  }

  if (error) {
    return <div style={{ padding: '40px', color: '#ef4444' }}>Error: {error}</div>;
  }

  const pieData = [
    { name: 'Safe', value: stats.safeTransactions, color: '#10b981' },
    { name: 'Suspicious', value: stats.suspiciousTransactions, color: '#f59e0b' },
    { name: 'Fraud', value: stats.fraudTransactions, color: '#ef4444' },
  ];

  const locationData = stats.fraudByLocation
    ? Object.keys(stats.fraudByLocation).map((loc) => ({
        location: loc,
        frauds: stats.fraudByLocation[loc],
      }))
    : [];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      <div>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#f8fafc' }}>Fraud Detection Overview</h2>
        <p style={{ fontSize: '0.88rem', color: '#94a3b8' }}>Real-time telemetry and risk assessment analytics</p>
      </div>

      {/* 6 Key Stat Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
        <StatCard
          title="Total Transactions"
          value={stats.totalTransactions}
          subtitle="Processed to date"
          icon={Activity}
          color="#3b82f6"
        />
        <StatCard
          title="Safe Transactions"
          value={stats.safeTransactions}
          subtitle="Risk Score 0-30"
          icon={ShieldCheck}
          color="#10b981"
          badge="SAFE"
        />
        <StatCard
          title="Suspicious Transactions"
          value={stats.suspiciousTransactions}
          subtitle="Risk Score 31-70"
          icon={AlertCircle}
          color="#f59e0b"
          badge="SUSPICIOUS"
        />
        <StatCard
          title="Fraud Transactions"
          value={stats.fraudTransactions}
          subtitle="Risk Score 71-100"
          icon={ShieldAlert}
          color="#ef4444"
          badge="FRAUD"
        />
        <StatCard
          title="Average Risk Score"
          value={`${stats.averageRiskScore} / 100`}
          subtitle="Across all traffic"
          icon={Gauge}
          color="#06b6d4"
        />
        <StatCard
          title="Fraud Rate"
          value={`${stats.fraudPercentage}%`}
          subtitle="Ratio of total volume"
          icon={Percent}
          color="#8b5cf6"
        />
      </div>

      {/* Live Charts Section */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        <div className="glass-panel" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#f8fafc', marginBottom: '20px' }}>
            Status Distribution (Safe vs Suspicious vs Fraud)
          </h3>
          <div style={{ width: '100%', height: '280px' }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={65}
                  outerRadius={95}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#fff' }} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#f8fafc', marginBottom: '20px' }}>
            Fraud Transactions by Location
          </h3>
          <div style={{ width: '100%', height: '280px' }}>
            {locationData.length > 0 ? (
              <ResponsiveContainer>
                <BarChart data={locationData}>
                  <XAxis dataKey="location" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#fff' }} />
                  <Bar dataKey="frauds" fill="#ef4444" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#64748b' }}>
                No location fraud data available yet
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
