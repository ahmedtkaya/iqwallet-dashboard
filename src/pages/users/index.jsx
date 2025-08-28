import { useState } from 'react';
import { Filter } from './Filter';
import { UserList } from './UserList';

export const Users = () => {
  const [filters, setFilters] = useState({ q: '', active: 'all', verified: 'all' });
  const [count, setCount] = useState(0); // filtrelenmiş kayıt sayısı

  const handleFilter = (change) => setFilters((prev) => ({ ...prev, ...change }));

  return (
    <div className="pl-10 w-full">
      <div className="min-h-[79vh] rounded-2xl bg-neutral-100 p-4 shadow-sm">
        <div className="mb-3 flex items-center justify-between">
          <Filter onFilter={handleFilter} />
          <span className="text-xs text-gray-500">{count} records</span>
        </div>

        <UserList filters={filters} onCount={setCount} />
      </div>
    </div>
  );
};
