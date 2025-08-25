import api from '../api/axios';

export async function deleteEmployee(id) {
  if (!id) throw new Error('id gerekli');
  const res = await api.delete(`/employee/delete/${id}`);
  return res.data ?? true;
}
