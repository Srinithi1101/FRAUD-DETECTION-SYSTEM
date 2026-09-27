import React, { useState } from 'react';
import { checkTransactionApi, saveTransactionApi } from '../services/api';
import { ShieldCheck, AlertTriangle, ShieldAlert, CheckCircle, Info } from 'lucide-react';

export default function TransactionCheckPage() {
  const [formData, setFormData] = useState({
    amount: '',
    location: '',
    deviceId: '',
    transactionType: 'UPI',
    previousTransactionCount: 0,
    failedAttempts: 0,
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [saveSuccessMsg, setSaveSuccessMsg] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheck = async (e) => {
    e.preventDefault();
    setError('');
    setResult(null);
    setSaveSuccessMsg('');

    if (!formData.amount || formData.amount <= 0) {
      setError('Amount must be greater than 0');
      return;
    }
    if (!formData.location.trim()) {
      setError('Location is required');
      return;
    }
    if (!formData.deviceId.trim()) {
      setError('Device ID is required');
      return;
    }

    try {
      setLoading(true);
      const payload = {
        amount: parseFloat(formData.amount),
        location: formData.location.trim(),
        deviceId: formData.deviceId.trim(),
        transactionType: formData.transactionType,
        previousTransactionCount: parseInt(formData.previousTransactionCount) || 0,
        failedAttempts: parseInt(formData.failedAttempts) || 0,
      };

      const res = await checkTransactionApi(payload);
      setResult(res);

      // Trigger browser notification if FRAUD
      if (res.status === 'FRAUD' && 'Notification' in window) {
        if (Notification.permission === 'granted') {
          new Notification('⚠ FRAUD TRANSACTION DETECTED', {
            body: `Risk Score: ${res.riskScore} | Amount: ₹${payload.amount} | Location: ${payload.location}`,
          });
        } else if (Notification.permission !== 'denied') {
          Notification.requestPermission();
        }
      }
    } catch (err) {
      setError(err.message || 'Failed to check transaction');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveToDatabase = async () => {
    if (!result) return;
    try {
      setLoading(true);
      const payload = {
        amount: parseFloat(formData.amount),
        location: formData.location.trim(),
        deviceId: formData.deviceId.trim(),
        transactionType: formData.transactionType,
        previousTransactionCount: parseInt(formData.previousTransactionCount) || 0,
        failedAttempts: parseInt(formData.failedAttempts) || 0,
      };
      await saveTransactionApi(payload);
      setSaveSuccessMsg('Transaction analyzed and recorded into database successfully!');
    } catch (err) {
      setError(err.message || 'Failed to save transaction');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
      {/* Transaction Entry Form */}
      <div className="glass-panel" style={{ padding: '28px' }}>
        <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#f8fafc', marginBottom: '8px' }}>
          Real-Time Transaction Scanner
        </h2>
        <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '24px' }}>
          Input financial transaction parameters to evaluate fraud risk instantly.
        </p>

        {error && (
          <div style={{
            padding: '12px 16px',
            backgroundColor: 'rgba(239, 68, 68, 0.15)',
            border: '1px solid rgba(239, 68, 68, 0.4)',
            color: '#f87171',
            borderRadius: '8px',
            marginBottom: '20px',
            fontSize: '0.9rem'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleCheck} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#cbd5e1', marginBottom: '6px' }}>
              Transaction Amount (₹)
            </label>
            <input
              type="number"
              name="amount"
              placeholder="e.g. 75000"
              value={formData.amount}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#cbd5e1', marginBottom: '6px' }}>
                Location
              </label>
              <input
                type="text"
                name="location"
                placeholder="e.g. Chennai"
                value={formData.location}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#cbd5e1', marginBottom: '6px' }}>
                Device ID
              </label>
              <input
                type="text"
                name="deviceId"
                placeholder="e.g. DEV101"
                value={formData.deviceId}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#cbd5e1', marginBottom: '6px' }}>
              Transaction Type
            </label>
            <select
              name="transactionType"
              value={formData.transactionType}
              onChange={handleChange}
              className="form-input"
            >
              <option value="UPI">UPI Payment</option>
              <option value="CARD">Credit/Debit Card</option>
              <option value="NET_BANKING">Net Banking</option>
              <option value="WIRE_TRANSFER">Wire Transfer</option>
            </select>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#cbd5e1', marginBottom: '6px' }}>
                Previous Transactions Count
              </label>
              <input
                type="number"
                name="previousTransactionCount"
                value={formData.previousTransactionCount}
                onChange={handleChange}
                className="form-input"
                min="0"
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#cbd5e1', marginBottom: '6px' }}>
                Failed Auth Attempts
              </label>
              <input
                type="number"
                name="failedAttempts"
                value={formData.failedAttempts}
                onChange={handleChange}
                className="form-input"
                min="0"
              />
            </div>
          </div>

          <button type="submit" disabled={loading} className="btn-primary" style={{ marginTop: '10px' }}>
            {loading ? 'Evaluating Rules...' : 'CHECK TRANSACTION'}
          </button>
        </form>
      </div>

      {/* Analysis Result Output Display */}
      <div>
        {result ? (
          <div className="glass-panel" style={{ padding: '28px', border: result.status === 'FRAUD' ? '1px solid #ef4444' : '1px solid #334155' }}>
            {/* FRAUD Banner Alert */}
            {result.status === 'FRAUD' && (
              <div style={{
                padding: '16px',
                backgroundColor: 'rgba(239, 68, 68, 0.2)',
                border: '1px solid #ef4444',
                borderRadius: '10px',
                color: '#f87171',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '24px'
              }}>
                <ShieldAlert size={28} color="#ef4444" />
                <div>
                  <h4 style={{ fontWeight: 700, fontSize: '1.05rem', color: '#f87171' }}>⚠ FRAUD TRANSACTION DETECTED</h4>
                  <p style={{ fontSize: '0.82rem', color: '#fca5a5' }}>
                    Immediate security action recommended. System flagged critical risk indicators.
                  </p>
                </div>
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <div>
                <p style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Evaluation Result</p>
                <div style={{ marginTop: '8px' }}>
                  {result.status === 'SAFE' && (
                    <span className="badge-safe">
                      <ShieldCheck size={16} /> SAFE TRANSACTION
                    </span>
                  )}
                  {result.status === 'SUSPICIOUS' && (
                    <span className="badge-suspicious">
                      <AlertTriangle size={16} /> SUSPICIOUS TRANSACTION
                    </span>
                  )}
                  {result.status === 'FRAUD' && (
                    <span className="badge-fraud">
                      <ShieldAlert size={16} /> FRAUD TRANSACTION
                    </span>
                  )}
                </div>
              </div>

              {/* Risk Score Meter */}
              <div style={{ textAlign: 'right' }}>
                <p style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Calculated Risk Score</p>
                <div style={{
                  fontSize: '2.2rem',
                  fontWeight: 800,
                  color: result.status === 'SAFE' ? '#10b981' : result.status === 'SUSPICIOUS' ? '#f59e0b' : '#ef4444'
                }}>
                  {result.riskScore} <span style={{ fontSize: '1rem', color: '#64748b' }}>/ 100</span>
                </div>
              </div>
            </div>

            {/* Reasons Breakdown */}
            <div style={{ marginBottom: '28px' }}>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 600, color: '#f8fafc', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Info size={16} color="#06b6d4" /> Evaluation Reasons:
              </h4>
              <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
                {result.reasons.map((reason, idx) => (
                  <li key={idx} style={{
                    padding: '10px 14px',
                    backgroundColor: '#0f172a',
                    borderLeft: `3px solid ${result.status === 'SAFE' ? '#10b981' : result.status === 'SUSPICIOUS' ? '#f59e0b' : '#ef4444'}`,
                    marginBottom: '8px',
                    borderRadius: '0 8px 8px 0',
                    fontSize: '0.88rem',
                    color: '#e2e8f0'
                  }}>
                    • {reason}
                  </li>
                ))}
              </ul>
            </div>

            {saveSuccessMsg ? (
              <div style={{ padding: '12px', backgroundColor: 'rgba(16, 185, 129, 0.2)', color: '#34d399', borderRadius: '8px', textAlign: 'center', fontSize: '0.88rem' }}>
                <CheckCircle size={16} style={{ display: 'inline', marginRight: '6px' }} />
                {saveSuccessMsg}
              </div>
            ) : (
              <button onClick={handleSaveToDatabase} disabled={loading} className="btn-primary" style={{ width: '100%' }}>
                Save Transaction to Database
              </button>
            )}
          </div>
        ) : (
          <div className="glass-panel" style={{ padding: '40px', textAlign: 'center', color: '#64748b', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <ShieldCheck size={48} color="#334155" style={{ marginBottom: '16px' }} />
            <h3 style={{ color: '#94a3b8', fontSize: '1.1rem', marginBottom: '8px' }}>Ready to Scan</h3>
            <p style={{ fontSize: '0.85rem', maxWidth: '300px' }}>Fill in the transaction details on the left and click "CHECK TRANSACTION" to run rule evaluation.</p>
          </div>
        )}
      </div>
    </div>
  );
}
