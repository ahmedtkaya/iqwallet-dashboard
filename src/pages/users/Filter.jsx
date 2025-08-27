import { useState } from 'react';

export const Filter = ({ onFilter }) => {
  const [q, setQ] = useState('');
  const [active, setActive] = useState('all');
  const [verified, setVerified] = useState('all');

  const setAndEmit = (key, val) => {
    if (key === 'q') setQ(val);
    if (key === 'active') setActive(val);
    if (key === 'verified') setVerified(val);
    onFilter?.({ [key]: val });
  };

  const Seg = ({ label, value, current, onClick }) => (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={current === value}
      className={
        'px-3 py-1.5 text-xs rounded-md border transition ' +
        (current === value
          ? 'bg-neutral-900 text-white border-neutral-900'
          : 'bg-white text-neutral-700 border-neutral-200 hover:bg-neutral-50')
      }
    >
      {label}
    </button>
  );

  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between ">
      <div className="relative w-full sm:w-72">
        <input
          value={q}
          onChange={(e) => setAndEmit('q', e.target.value)}
          placeholder="Search name / phone / email"
          className="w-full rounded-lg border border-neutral-200 pl-3 pr-10 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-400"
        />
        {q && (
          <button
            onClick={() => setAndEmit('q', '')}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
            aria-label="Clear search"
            title="Clear"
          >
            ×
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        <div className="flex items-center gap-1 rounded-lg bg-neutral-100 p-2 border border-gray-300">
          <Seg
            label="Tümü"
            value="all"
            current={active}
            onClick={() => setAndEmit('active', 'all')}
          />
          <Seg
            label="Etkin"
            value="true"
            current={active}
            onClick={() => setAndEmit('active', 'true')}
          />
          <Seg
            label="Etkin Değil"
            value="false"
            current={active}
            onClick={() => setAndEmit('active', 'false')}
          />
        </div>

        <div className="flex items-center gap-1 rounded-lg bg-neutral-100 p-2 border border-gray-300">
          <Seg
            label="Tümü"
            value="all"
            current={verified}
            onClick={() => setAndEmit('verified', 'all')}
          />
          <Seg
            label="Doğrulandı"
            value="true"
            current={verified}
            onClick={() => setAndEmit('verified', 'true')}
          />
          <Seg
            label="Doğrulanmamış"
            value="false"
            current={verified}
            onClick={() => setAndEmit('verified', 'false')}
          />
        </div>
      </div>
    </div>
  );
};
