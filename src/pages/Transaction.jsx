import React, { useEffect, useMemo, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../api/firebase';

const PAGE_SIZE = 10;

export function Transaction() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  // ---- Filters ----
  const [q, setQ] = useState(''); // name search
  const [type, setType] = useState('all'); // all | from | to
  const [minAmt, setMinAmt] = useState('');
  const [maxAmt, setMaxAmt] = useState('');
  const [fromDate, setFromDate] = useState(''); // yyyy-mm-dd
  const [toDate, setToDate] = useState(''); // yyyy-mm-dd

  // Pagination
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setErr(null);

        // 1) users koleksiyonunu çek
        const usersSnap = await getDocs(collection(db, 'users'));
        const usersMap = {};
        usersSnap.forEach((u) => {
          const userData = u.data();
          usersMap[u.id] = userData.fullName || u.id;
        });

        // 2) transactions koleksiyonunu çek
        const transSnap = await getDocs(collection(db, 'transactions'));
        const transactions = transSnap.docs.map((docSnap) => {
          const d = docSnap.data();
          const ts = d.createdAt?.toDate?.() instanceof Date ? d.createdAt.toDate() : null;

          return {
            id: docSnap.id,
            type: Number(d.amount) >= 0 ? 'from' : 'to',
            name: usersMap[d.userId] || d.userId,
            when: ts ? ts.toLocaleString() : 'No date',
            ts, // Date obj for filtering/sorting
            amount: Number(d.amount) || 0,
          };
        });

        setRows(transactions);
      } catch (e) {
        console.error('Fetch error:', e);
        setErr('Veriler alınırken bir sorun oluştu.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // ---- Derived: filtering ----
  const filtered = useMemo(() => {
    const qNorm = q.trim().toLowerCase();

    const fDate = fromDate ? new Date(fromDate + 'T00:00:00') : null;
    const tDate = toDate ? new Date(toDate + 'T23:59:59') : null;

    const min = minAmt !== '' ? Number(minAmt) : null;
    const max = maxAmt !== '' ? Number(maxAmt) : null;

    return rows.filter((r) => {
      if (qNorm && !r.name?.toLowerCase().includes(qNorm)) return false;
      if (type !== 'all' && r.type !== type) return false;

      if (fDate && r.ts && r.ts < fDate) return false;
      if (tDate && r.ts && r.ts > tDate) return false;

      // min/max kontrolü mutlak değer üzerinden yapılır
      const abs = Math.abs(r.amount);
      if (min !== null && abs < min) return false;
      if (max !== null && abs > max) return false;

      return true;
    });
  }, [rows, q, type, fromDate, toDate, minAmt, maxAmt]);

  // ---- Derived: pagination ----
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageSafe = Math.min(page, totalPages);
  const paged = useMemo(() => {
    const start = (pageSafe - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, pageSafe]);

  // ---- Derived: summary ----
  const summary = useMemo(() => {
    let incoming = 0; // amount >= 0
    let outgoing = 0; // amount < 0
    for (const r of filtered) {
      if (r.amount >= 0) incoming += r.amount;
      else outgoing += r.amount;
    }
    const net = incoming + outgoing;
    return {
      incoming,
      outgoing, // negative (ör: -120.50)
      net,
    };
  }, [filtered]);

  // reset sayfa numarası filtre değişince
  useEffect(() => {
    setPage(1);
  }, [q, type, minAmt, maxAmt, fromDate, toDate]);

  return (
    <div className="pl-10 w-full">
      <div className="w-full rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5 min-h-[79vh]">
        <div className="flex items-end justify-between gap-4 flex-wrap">
          <div>
            <h3 className="text-base font-semibold text-gray-900">Daily Transactions</h3>
            <p className="text-xs text-gray-500">
              Kullanıcı adlarına göre eşleştirilmiş günlük transferler
            </p>
          </div>

          {/* Summary badges */}
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-200">
              Incoming: {summary.incoming.toFixed(2)}
            </span>
            <span className="inline-flex items-center rounded-full bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-700 ring-1 ring-rose-200">
              Outgoing: {summary.outgoing.toFixed(2)}
            </span>
            <span className="inline-flex items-center rounded-full bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-700 ring-1 ring-slate-200">
              Net: {summary.net.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Filters */}
        <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-6">
          <div className="md:col-span-2">
            <label className="block text-xs font-medium text-gray-700 mb-1">Search (Name)</label>
            <input
              type="text"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Örn: Ahmet Yılmaz"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-neutral-900"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Type</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-neutral-900"
            >
              <option value="all">All</option>
              <option value="from">From (incoming)</option>
              <option value="to">To (outgoing)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Min Amount (|x|)</label>
            <input
              type="number"
              inputMode="decimal"
              value={minAmt}
              onChange={(e) => setMinAmt(e.target.value)}
              placeholder="0"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-neutral-900"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Max Amount (|x|)</label>
            <input
              type="number"
              inputMode="decimal"
              value={maxAmt}
              onChange={(e) => setMaxAmt(e.target.value)}
              placeholder="1000"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-neutral-900"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">From (Date)</label>
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-neutral-900"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">To (Date)</label>
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-neutral-900"
            />
          </div>
        </div>

        {/* Table */}
        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-left text-gray-600">
                <th className="px-4 py-2 font-medium">Type</th>
                <th className="px-4 py-2 font-medium">Name</th>
                <th className="px-4 py-2 font-medium">When</th>
                <th className="px-4 py-2 font-medium text-right">Amount</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {loading && (
                <tr>
                  <td colSpan={4} className="px-4 py-6 text-center text-gray-500">
                    Loading…
                  </td>
                </tr>
              )}

              {err && !loading && (
                <tr>
                  <td colSpan={4} className="px-4 py-6 text-center text-rose-600">
                    {err}
                  </td>
                </tr>
              )}

              {!loading && !err && paged.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-4 py-6 text-center text-gray-500 italic">
                    Kayıt bulunamadı.
                  </td>
                </tr>
              )}

              {paged.map((r) => {
                const positive = r.amount >= 0;
                return (
                  <tr key={r.id} className="hover:bg-gray-50">
                    <td className="px-4 py-2">
                      <span
                        className={
                          'inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-semibold ring-1 ' +
                          (positive
                            ? 'bg-emerald-50 text-emerald-700 ring-emerald-200'
                            : 'bg-rose-50 text-rose-700 ring-rose-200')
                        }
                      >
                        {r.type === 'from' ? 'From' : 'To'}
                      </span>
                    </td>
                    <td className="px-4 py-2 text-gray-900">{r.name}</td>
                    <td className="px-4 py-2 text-gray-500">{r.when}</td>
                    <td className="px-4 py-2 text-right">
                      <span
                        className={
                          'font-semibold ' + (positive ? 'text-emerald-700' : 'text-rose-700')
                        }
                      >
                        {positive ? '+' : '-'}
                        {Math.abs(r.amount).toFixed(2)}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="mt-3 flex items-center justify-between">
          <p className="text-xs text-gray-500">
            Showing {(pageSafe - 1) * PAGE_SIZE + 1}–
            {Math.min(pageSafe * PAGE_SIZE, filtered.length)} of {filtered.length}
          </p>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={pageSafe === 1}
              className="rounded-lg border px-3 py-1 text-sm disabled:opacity-50"
            >
              Prev
            </button>
            <span className="text-sm text-gray-600">
              {pageSafe} / {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={pageSafe === totalPages}
              className="rounded-lg border px-3 py-1 text-sm disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
