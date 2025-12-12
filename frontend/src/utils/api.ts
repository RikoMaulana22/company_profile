const API_BASE_URL = 'http://localhost:5000/api'; // Sesuaikan dengan port backend Anda

export const fetchWithAuth = async (endpoint: string, options: RequestInit = {}) => {
  const token = localStorage.getItem('adminToken');
  
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }),
    ...options.headers,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (response.status === 401) {
    // Token expired/invalid
    localStorage.removeItem('adminToken');
    window.location.href = '/admin/login';
    throw new Error('Unauthorized');
  }

  return response;
};
