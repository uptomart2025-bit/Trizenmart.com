const baseUrl = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');
const apiPath = (path) => `${baseUrl}${path.startsWith('/api') ? path : `/api${path}`}`;

async function request(path, options = {}) {
  const response = await fetch(apiPath(path), {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {})
    },
    ...options
  });

  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(payload.message || response.statusText || 'Request failed');
  }

  return payload;
}

export function login(credentials) {
  return request('/auth/login', { method: 'POST', body: JSON.stringify(credentials) });
}

export function register(payload) {
  return request('/auth/register', { method: 'POST', body: JSON.stringify(payload) });
}

export function logout() {
  return request('/auth/logout', { method: 'POST' });
}

export function fetchProfile() {
  return request('/auth/profile');
}

export function updateProfile(payload) {
  return request('/auth/profile', { method: 'PUT', body: JSON.stringify(payload) });
}
