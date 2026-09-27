import React, { useEffect, useState } from 'react';
import { fetchAllTransactionsApi } from '../services/api';
import { Search, Filter, ArrowUpDown, Eye, ShieldCheck, AlertTriangle, ShieldAlert } from 'lucide-react';

export default function TransactionHistoryPage() {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [sortOrder, setSortOrder] = useState('DESC');
  const [selectedTx, setSelectedTx] = useState(null);

  useEffect(() => {
    loadTransactions();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [searchQuery, statusFilter, sortOrder, transactions]);

  const loadTransactions = async () => {
    try {
      setLoading(true);
      const data = await fetchAllTransactionsApi();
      setTransactions(data);
    } catch (err) {
      console.error('Failed to load transaction history:', err);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let result = [...transactions];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (tx) =>
          tx.id.toString().includes(q) ||
          tx.location.toLowerCase().includes(q) ||
          tx.deviceId.toLowerCase().includes(q) ||
          tx.transactionType.toLowerCase().includes(q) ||
          tx.amount.toString().includes(q)
      );
    }

    if (statusFilter !== 'ALL') {
      result = result.filter((tx) => tx.status === statusFilter);
    }

    result.sort((a, b) => {
      return sortOrder === 'DESC' ? b.riskScore - a.riskScore : a.riskScore - b.riskScore;
    });

    setFilteredTransactions(result);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#f8fafc' }}>Transaction Audit History</h2>
        <p style={{ fontSize: '0.88rem', color: '#94a3b8' }}>Comprehensive log of evaluated transactions</p>
      </div>

      {/* Filter and Search Bar */}
      <div className="glass-panel" style={{ padding: '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1, minWidth: '240px', backgroundColor: '#0f172a', borderRadius: '8px', padding: '8px 14px', border: '1px solid #334155' }}>
          <Search size={18} color="#94a3b8" />
          <input
            type="text"
            placeholder="Search by ID, location, device, type..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ background: 'none', border: 'none', color: '#f8fafc', outline: 'none', width: '100%', fontSize: '0.9rem' }}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Filter size={16} color="#94a3b8" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="form-input"
              style={{ width: '140px', padding: '8px 12px' }}
            >
              <option value="ALL">All Status</option>
              <option value="SAFE">SAFE</option>
              <option value="SUSPICIOUS">SUSPICIOUS</option>
              <option value="FRAUD">FRAUD</option>
            </select>
          </div>

          <button
            onClick={() => setSortOrder(sortOrder === 'DESC' ? 'ASC' : 'DESC')}
            className="form-input"
            style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', width: 'auto', padding: '8px 14px' }}
          >
            <ArrowUpDown size={16} color="#06b6d4" />
            Risk: {sortOrder === 'DESC' ? 'Highest First' : 'Lowest First'}
          </button>
        </div>
      </div>

      {/* Data Table */}
      <div className="glass-panel" style={{ overflowX: 'auto' }}>
        {loading ? (
          <div style={{ padding: '40px', color: '#94a3b8', textAlign: 'center' }}>Loading transactions...</div>
        ) : filteredTransactions.length === 0 ? (
          <div style={{ padding: '40px', color: '#64748b', textAlign: 'center' }}>No matching transactions found.</div>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Amount (₹)</th>
                <th>Location</th>
                <th>Type</th>
                <th>Device ID</th>
                <th>Risk Score</th>
                <th>Status</th>
                <th>Date & Time</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((tx) => (
                <tr key={tx.id}>
                  <td style={{ fontWeight: 600, color: '#06b6d4' }}>#{tx.id}</td>
                  <td style={{ fontWeight: 600 }}>₹{tx.amount?.toLocaleString()}</td>
                  <td>{tx.location}</td>
                  <td><span style={{ fontSize: '0.8rem', padding: '2px 8px', borderRadius: '4px', backgroundColor: '#0f172a', border: '1px solid #334155' }}>{tx.transactionType}</span></td>
                  <td style={{ fontFamily: 'monospace', color: '#cbd5e1' }}>{tx.deviceId}</td>
                  <td>
                    <span style={{
                      fontWeight: 700,
                      color: tx.riskScore <= 30 ? '#10b981' : tx.riskScore <= 70 ? '#f59e0b' : '#ef4444'
                    }}>
                      {tx.riskScore}
                    </span>
                  </td>
                  <td>
                    {tx.status === 'SAFE' && <span className="badge-safe">SAFE</span>}
                    {tx.status === 'SUSPICIOUS' && <span className="badge-suspicious">SUSPICIOUS</span>}
                    {tx.status === 'FRAUD' && <span className="badge-fraud">FRAUD</span>}
                  </td>
                  <td style={{ color: '#94a3b8', fontSize: '0.82rem' }}>
                    {tx.transactionTime ? new Date(tx.transactionTime).toLocaleString() : 'N/A'}
                  </td>
                  <td>
                    <button
                      onClick={() => setSelectedTx(tx)}
                      style={{
                        padding: '6px 12px',
                        backgroundColor: '#0f172a',
                        border: '1px solid #334155',
                        color: '#06b6d4',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        fontSize: '0.8rem'
                      }}
                    >
                      <Eye size={14} /> Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Details Modal */}
      {selectedTx && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.75)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div className="glass-panel" style={{ width: '500px', maxWidth: '90%', padding: '28px', border: '1px solid #334155' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#f8fafc', marginBottom: '16px' }}>
              Transaction #{selectedTx.id} Details
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '20px', fontSize: '0.9rem' }}>
              <div><span style={{ color: '#94a3b8' }}>Amount:</span> <strong>₹{selectedTx.amount}</strong></div>
              <div><span style={{ color: '#94a3b8' }}>Location:</span> <strong>{selectedTx.location}</strong></div>
              <div><span style={{ color: '#94a3b8' }}>Device:</span> <strong>{selectedTx.deviceId}</strong></div>
              <div><span style={{ color: '#94a3b8' }}>Type:</span> <strong>{selectedTx.transactionType}</strong></div>
              <div><span style={{ color: '#94a3b8' }}>Risk Score:</span> <strong style={{ color: selectedTx.riskScore > 70 ? '#ef4444' : '#10b981' }}>{selectedTx.riskScore} / 100</strong></div>
              <div><span style={{ color: '#94a3b8' }}>Status:</span> <strong>{selectedTx.status}</strong></div>
            </div>

            <h4 style={{ fontSize: '0.9rem', fontWeight: 600, color: '#f8fafc', marginBottom: '8px' }}>Fraud Reasons:</h4>
            <div style={{ backgroundColor: '#0f172a', padding: '12px', borderRadius: '8px', fontSize: '0.85rem', color: '#e2e8f0', marginBottom: '20px' }}>
              {selectedTx.fraudReason ? selectedTx.fraudReason.split('; ').map((r, i) => (
                <div key={i} style={{ marginBottom: '4px' }}>• {r}</div>
              )) : 'Normal baseline'}
            </div>

            <button onClick={() => setSelectedTx(null)} className="btn-primary" style={{ width: '100%' }}>
              Close Modal
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
