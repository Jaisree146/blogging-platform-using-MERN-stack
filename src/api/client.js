export const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:5000';

export async function api(path, { method = 'GET', body, token, isForm } = {}) {
  const headers = {};
  if (!isForm) headers['Content-Type'] = 'application/json';
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers,
    credentials: 'include',
    body: isForm ? body : body ? JSON.stringify(body) : undefined,
  });

  const contentType = res.headers.get('content-type') || '';
  const data = contentType.includes('application/json') ? await res.json() : await res.text();
  if (!res.ok) throw new Error(data?.message || data || 'Request failed');
  return data;
}

export function uploadImage(file, token) {
  const form = new FormData();
  form.append('image', file);
  return api('/api/upload', { method: 'POST', token, isForm: true, body: form });
}

export function imageUrl(path) {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  return `${API_BASE}${path}`;
}
