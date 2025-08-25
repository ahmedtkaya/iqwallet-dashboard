import api from '../api/axios';

export async function postEmployee(values) {
  const fd = new FormData();
  fd.append('Name', values.name ?? '');
  fd.append('Surname', values.surname ?? '');
  fd.append('IdentityNumber', values.identityNumber ?? '');
  fd.append('Email', values.email ?? '');
  fd.append('Phone', (values.phone || '').replace(/\D/g, ''));
  fd.append('Mission', values.mission ?? '');
  fd.append('Password', '0');
  fd.append('CertificateNumber', values.certificateNumber ?? '');
  fd.append(
    'CertificateDate',
    values.certificateDate ? new Date(values.certificateDate).toISOString() : ''
  );

  const { data } = await api.post('/employee/create', fd);
  return data;
}
