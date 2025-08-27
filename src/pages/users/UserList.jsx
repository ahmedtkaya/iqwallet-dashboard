import { useEffect, useMemo, useState } from 'react';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../../api/firebase';

const PAGE_SIZE = 1;

export const UserList = ({ filters = { q: '', active: 'all', verified: 'all' }, onCount }) => {
  const { q, active, verified } = filters;

  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  useEffect(() => {
    setLoading(true);
    setErr(null);

    const colRef = collection(db, 'users');
    const clauses = [];
    if (active !== 'all') clauses.push(where('isActive', '==', active === 'true'));
    if (verified !== 'all') clauses.push(where('isVerified', '==', verified === 'true'));

    const ref = clauses.length ? query(colRef, ...clauses) : query(colRef);

    const unsub = onSnapshot(
      ref,
      (snap) => {
        const data = snap.docs.map((d) => {
          const x = d.data();
          return {
            id: d.id,
            fullName: x.fullName ?? '',
            phoneNumber: x.phoneNumber ?? '',
            email: x.email ?? '',
            isActive: !!x.isActive,
            isVerified: !!x.isVerified,
          };
        });
        setRows(data);
        setLoading(false);
      },
      (e) => {
        console.error('[users] snapshot error:', e);
        setErr(e?.message || 'error');
        setLoading(false);
      }
    );

    return () => unsub();
  }, [active, verified]);

  // Search: client-side (ad/eposta/telefon)
  const filtered = useMemo(() => {
    const term = (q || '').trim().toLowerCase();
    if (!term) return rows;

    const digits = term.replace(/\D+/g, '');
    const toDigits = (s = '') => s.replace(/\D+/g, '');

    return rows.filter(
      (r) =>
        r.fullName.toLowerCase().includes(term) ||
        r.email.toLowerCase().includes(term) ||
        (digits && toDigits(r.phoneNumber).includes(digits))
    );
  }, [rows, q]);

  useEffect(() => {
    onCount?.(filtered.length);
  }, [filtered.length, onCount]);

  // Pagination (client-side)
  const [page, setPage] = useState(0);
  useEffect(() => setPage(0), [q, active, verified]); // filtre/arama değişince başa dön

  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const canPrev = page > 0;
  const canNext = page + 1 < totalPages;

  // taşma kontrolü
  useEffect(() => {
    if (page > totalPages - 1) setPage(0);
  }, [totalPages, page]);

  const start = page * PAGE_SIZE;
  const visibleRows = filtered.slice(start, start + PAGE_SIZE);

  if (err)
    return (
      <div className="rounded-xl border border-rose-200 bg-rose-50 p-4 text-rose-700">
        Hata: {String(err)}
      </div>
    );
  if (loading)
    return (
      <div className="rounded-xl border border-gray-200 p-4 text-sm text-gray-600">Yükleniyor…</div>
    );
  if (!filtered.length)
    return (
      <div className="rounded-xl border border-gray-200 p-10 text-center text-sm text-gray-600">
        Kayıt yok.
      </div>
    );

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 h-full">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-600">
              Full name
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-600">
              Phone
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-600">
              Email
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-600">
              Active
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-600">
              Verified
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200">
          {visibleRows.map((r) => (
            <tr key={r.id} className="transition-colors hover:bg-neutral-50">
              <td className="px-4 py-3 text-sm text-gray-900">{r.fullName}</td>
              <td className="px-4 py-3 text-sm text-gray-600">{r.phoneNumber}</td>
              <td className="px-4 py-3 text-sm text-gray-600">{r.email}</td>

              {/* Active */}
              <td className="px-4 py-3">
                <span
                  className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ring-1 ${
                    r.isActive
                      ? 'bg-emerald-50 text-emerald-700 ring-emerald-200'
                      : 'bg-rose-50 text-rose-700 ring-rose-200'
                  }`}
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      r.isActive ? 'bg-emerald-500' : 'bg-rose-500'
                    }`}
                  />
                  {r.isActive ? 'Active' : 'Inactive'}
                </span>
              </td>

              {/* Verified */}
              <td className="px-4 py-3">
                <span
                  className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ring-1 ${
                    r.isVerified
                      ? 'bg-emerald-50 text-emerald-700 ring-emerald-200'
                      : 'bg-rose-50 text-rose-700 ring-rose-200'
                  }`}
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      r.isVerified ? 'bg-emerald-500' : 'bg-rose-500'
                    }`}
                  />
                  {r.isVerified ? 'Verified' : 'Unverified'}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div
        className={`flex items-center justify-between gap-3 px-4 py-2 bg-white ${
          totalPages === 1 ? 'opacity-60' : ''
        }`}
      >
        <div className="text-xs text-gray-500">
          Sayfa <span className="font-medium">{page + 1}</span> / {totalPages}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={!canPrev}
            className="rounded-lg border border-gray-200 px-3 py-1.5 text-sm text-gray-700 disabled:opacity-50 hover:bg-gray-50"
          >
            ‹ Önceki
          </button>
          <button
            onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
            disabled={!canNext}
            className="rounded-lg border border-gray-200 px-3 py-1.5 text-sm text-gray-700 disabled:opacity-50 hover:bg-gray-50"
          >
            Sonraki ›
          </button>
        </div>
      </div>
    </div>
  );
};
