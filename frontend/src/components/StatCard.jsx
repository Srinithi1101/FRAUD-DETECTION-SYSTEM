import React from 'react';

export default function StatCard({ title, value, subtitle, icon: Icon, color = '#3b82f6', badge }) {
  return (
    <div className="glass-card" style={{ position: 'relative', overflow: 'hidden' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
        <div>
          <p style={{ fontSize: '0.85rem', color: '#94a3b8', fontWeight: 500, marginBottom: '4px' }}>{title}</p>
          <h3 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#f8fafc', letterSpacing: '-0.02em' }}>{value}</h3>
        </div>
        <div style={{
          padding: '10px',
          borderRadius: '12px',
          backgroundColor: `${color}20`,
          border: `1px solid ${color}40`
        }}>
          <Icon size={24} color={color} />
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <p style={{ fontSize: '0.78rem', color: '#64748b' }}>{subtitle}</p>
        {badge && (
          <span style={{
            fontSize: '0.75rem',
            padding: '2px 8px',
            borderRadius: '12px',
            backgroundColor: `${color}15`,
            color: color,
            fontWeight: 600
          }}>
            {badge}
          </span>
        )}
      </div>
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '3px',
        backgroundColor: color
      }} />
    </div>
  );
}
