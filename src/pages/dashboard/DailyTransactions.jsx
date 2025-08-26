import React from 'react';

export function DailyTransactions({
  items = [
    { type: 'from', name: 'Anna Jones', when: 'Today, 14:34', delta: +2.45 },
    { type: 'to', name: 'Carlos Brown III', when: 'Today, 15:23', delta: -4.75 },
    { type: 'from', name: 'Joel Cannan', when: 'Today, 17:54', delta: +2.45 },
  ],
}) {
  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5 h-1/2 w-full">
      <p className="text-base font-semibold text-gray-900">Your Transfers</p>

      <ul className="mt-3 space-y-3">
        {items.map((it, i) => {
          const positive = it.delta >= 0;
          return (
            <li
              key={i}
              className="flex items-center justify-between  border-b border-gray-300 pb-2"
            >
              <div className="flex min-w-0 items-center gap-3">
                <span className="relative h-8 w-1.5 rounded-full">
                  <span className="absolute inset-x-0  h-full w-1.5 rounded-full bg-[#6b8f7a] top-0" />
                </span>

                <div className="truncate">
                  <p className="truncate text-sm text-gray-900">
                    {it.type === 'to' ? 'To ' : 'From '}
                    <span className="font-medium">{it.name}</span>
                  </p>
                  <span className="text-xs text-gray-500">{it.when}</span>
                </div>
              </div>

              <span
                className={
                  'shrink-0 inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-semibold ring-1 ' +
                  (positive
                    ? 'bg-emerald-50 text-emerald-700 ring-emerald-200'
                    : 'bg-rose-50 text-rose-700 ring-rose-200')
                }
              >
                {positive ? '+' : ''}
                {Math.abs(it.delta).toFixed(2)}%
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
