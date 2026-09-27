import React from 'react';
import { LayoutDashboard, ScanLine, History, AlertTriangle, Cpu } from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab }) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'check', label: 'Check Transaction', icon: ScanLine },
    { id: 'history', label: 'Transaction History', icon: History },
    { id: 'alerts', label: 'Fraud Alerts', icon: AlertTriangle },
  ];

  return (
    <aside style={{
      width: '260px',
      backgroundColor: '#1e293b',
      borderRight: '1px solid #334155',
      display: 'flex',
      flexDirection: 'column',
      padding: '24px 16px',
      gap: '8px'
    }}>
      <p style={{
        fontSize: '0.75rem',
        textTransform: 'uppercase',
        letterSpacing: '0.08em',
        color: '#64748b',
        marginBottom: '12px',
        paddingLeft: '12px',
        fontWeight: 700
      }}>
        Main Menu
      </p>

      {menuItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;
        return (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px 16px',
              borderRadius: '10px',
              border: 'none',
              backgroundColor: isActive ? 'rgba(6, 182, 212, 0.15)' : 'transparent',
              color: isActive ? '#06b6d4' : '#94a3b8',
              fontWeight: isActive ? 600 : 400,
              fontSize: '0.95rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              textAlign: 'left',
              width: '100%',
              borderLeft: isActive ? '3px solid #06b6d4' : '3px solid transparent'
            }}
          >
            <Icon size={20} color={isActive ? '#06b6d4' : '#94a3b8'} />
            {item.label}
          </button>
        );
      })}

      <div style={{ marginTop: 'auto', padding: '16px', backgroundColor: '#0f172a', borderRadius: '10px', border: '1px solid #334155' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <Cpu size={18} color="#10b981" />
          <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#f8fafc' }}>Rule Engine Active</span>
        </div>
        <p style={{ fontSize: '0.75rem', color: '#64748b' }}>
          7 Real-Time Fraud Rules Monitoring
        </p>
      </div>
    </aside>
  );
}
