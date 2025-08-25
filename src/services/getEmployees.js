import api from '../api/axios';
export async function getEmployees(params = {}) {
  const { data } = await api.get('/employee', { params });
  return data;
}
