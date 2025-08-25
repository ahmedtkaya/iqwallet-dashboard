import api from '../api/axios';

export async function loginEmployee({ email, password }) {
  const { data } = await api.post('/auth/admin/login', { email, password });
  return data;
}
