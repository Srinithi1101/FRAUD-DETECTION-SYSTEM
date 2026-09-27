import React, { useEffect, useState } from 'react';
import { fetchAlertsApi } from '../services/api';
import { ShieldAlert, Bell, CheckCircle2, MapPin, DollarSign, AlertTriangle } from 'lucide-react';

export default function AlertsPage() {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notifPermission, setNotifPermission] = useState(
    'Notification' in window ? Notification.permission : 'unsupported'
  );

  useEffect(() => {
    loadAlerts();
  }, []);

  const loadAlerts = async () => {
    try {
      setLoading(true);
      const data = await fetchAlertsApi();
      setAlerts(data);
    } catch (err) {
      console.error('Failed to load alerts:', err);
    } finally {
      setLoading(false);
    }
  };

  const enableBrowserNotifications = () => {
    if ('Notification' in window) {
      Notification.requestPermission().then((perm) => {
        setNotifPermission(perm);
      });
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#f8fafc' }}>Fraud Alerts Feed</h2>
          <p style={{ fontSize: '0.88rem', color: '#94a3b8' }}>High-severity fraud detections requiring analyst review</p>
        </div>

        {notifPermission !== 'granted' && (
          <button onClick={enableBrowserNotifications} className="btn-primary" style={{ backgroundColor: '#0f172a', border: '1px solid #06b6d4', color: '#06b6d4' }}>
            <Bell size={16} /> Enable Browser Alerts
          </button>
        )}
      </div>

      {loading ? (
        <div style={{ padding: '40px', color: '#94a3b8', textAlign: 'center' }}>Loading Fraud Alerts...</div>
      ) : alerts.length === 0 ? (
        <div className="glass-panel" style={{ padding: '40px', textAlgin: 'center', textAlign: 'center', color: '#64748b' }}>
          <CheckCircle2 size={48} color="#10b981" style={{ marginBottom: '16px' }} />
          <h3 style={{ color: '#f8fafc', fontSize: '1.1rem' }}>No Active Fraud Alerts</h3>
          <p style={{ fontSize: '0.85rem' }}>All transactions monitored are operating within safe parameters.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className="glass-panel"
              style={{
                padding: '20px 24px',
                borderLeft: '4px solid #ef4444',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '20px'
              }}
            >
              <div style={{
                padding: '12px',
                borderRadius: '12px',
                backgroundColor: 'rgba(239, 68, 68, 0.2)',
                color: '#ef4444'
              }}>
                <ShieldAlert size={28} />
              </div>

              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#ef4444' }}>
                    ⚠ FRAUD TRANSACTION DETECTED (Tx #{alert.transactionId})
                  </h4>
                  <span style={{ fontSize: '0.8rem', color: '#64748b' }}>
                    {alert.alertTime ? new Date(alert.alertTime).toLocaleString() : 'Just now'}
                  </span>
                </div>

                <div style={{ display: 'flex', gap: '24px', marginBottom: '12px', fontSize: '0.9rem', color: '#cbd5e1' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <DollarSign size={16} color="#06b6d4" /> Amount: <strong>₹{alert.amount}</strong>
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <MapPin size={16} color="#06b6d4" /> Location: <strong>{alert.location}</strong>
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <AlertTriangle size={16} color="#ef4444" /> Risk Score: <strong style={{ color: '#ef4444' }}>{alert.riskScore} / 100</strong>
                  </span>
                </div>

                <div style={{ backgroundColor: '#0f172a', padding: '10px 14px', borderRadius: '8px', fontSize: '0.85rem', color: '#94a3b8' }}>
                  <strong>Triggered Reasons:</strong> {alert.reason}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
