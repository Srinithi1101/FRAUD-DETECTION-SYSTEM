import React from 'react';
import { ShieldAlert, Bell, User, LogOut } from 'lucide-react';

export default function Navbar({ user, onLogout }) {
  return (
    <header style={{
      height: '70px',
      backgroundColor: 'rgba(30, 41, 59, 0.95)',
      borderBottom: '1px solid #334155',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 28px',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{
          width: '40px',
          height: '40px',
          borderRadius: '10px',
          background: 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 12px rgba(6, 182, 212, 0.3)'
        }}>
          <ShieldAlert size={24} color="#ffffff" />
        </div>
        <div>
          <h1 style={{ fontSize: '1.25rem', fontWeight: 700, letterSpacing: '-0.02em', color: '#f8fafc' }}>
            AegisFraud <span style={{ fontSize: '0.8rem', color: '#06b6d4', fontWeight: 600 }}>v1.0</span>
          </h1>
          <p style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Real-Time Financial Fraud Detection Engine</p>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <div style={{
          position: 'relative',
          padding: '8px',
          borderRadius: '50%',
          backgroundColor: '#0f172a',
          cursor: 'pointer'
        }}>
          <Bell size={20} color="#94a3b8" />
          <span style={{
            position: 'absolute',
            top: '4px',
            right: '4px',
            width: '8px',
            height: '8px',
            backgroundColor: '#ef4444',
            borderRadius: '50%'
          }} />
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '6px 14px',
          backgroundColor: '#0f172a',
          borderRadius: '24px',
          border: '1px solid #334155'
        }}>
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            backgroundColor: '#3b82f6',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 700,
            fontSize: '0.85rem'
          }}>
            {user ? user.username.charAt(0).toUpperCase() : 'A'}
          </div>
          <div style={{ textAlign: 'left' }}>
            <p style={{ fontSize: '0.85rem', fontWeight: 600, color: '#f8fafc' }}>{user ? user.username : 'Analyst Admin'}</p>
            <p style={{ fontSize: '0.7rem', color: '#06b6d4', fontWeight: 500 }}>{user ? user.role : 'ROLE_ADMIN'}</p>
          </div>
          {onLogout && (
            <button onClick={onLogout} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ef4444', marginLeft: '8px' }}>
              <LogOut size={16} />
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
