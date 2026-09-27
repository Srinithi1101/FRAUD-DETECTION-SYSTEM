const BASE_URL = 'http://localhost:8080/api';

export const checkTransactionApi = async (transactionData) => {
  const response = await fetch(`${BASE_URL}/transactions/check`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(transactionData),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to check transaction');
  }
  return response.json();
};

export const saveTransactionApi = async (transactionData) => {
  const response = await fetch(`${BASE_URL}/transactions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(transactionData),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to save transaction');
  }
  return response.json();
};

export const fetchAllTransactionsApi = async () => {
  const response = await fetch(`${BASE_URL}/transactions`);
  if (!response.ok) throw new Error('Failed to fetch transactions');
  return response.json();
};

export const fetchFraudTransactionsApi = async () => {
  const response = await fetch(`${BASE_URL}/transactions/fraud`);
  if (!response.ok) throw new Error('Failed to fetch fraud transactions');
  return response.json();
};

export const fetchSafeTransactionsApi = async () => {
  const response = await fetch(`${BASE_URL}/transactions/safe`);
  if (!response.ok) throw new Error('Failed to fetch safe transactions');
  return response.json();
};

export const fetchDashboardStatsApi = async () => {
  const response = await fetch(`${BASE_URL}/dashboard/stats`);
  if (!response.ok) throw new Error('Failed to fetch dashboard statistics');
  return response.json();
};

export const fetchAlertsApi = async () => {
  const response = await fetch(`${BASE_URL}/alerts`);
  if (!response.ok) throw new Error('Failed to fetch fraud alerts');
  return response.json();
};

export const loginApi = async (credentials) => {
  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Invalid username or password');
  }
  return response.json();
};
