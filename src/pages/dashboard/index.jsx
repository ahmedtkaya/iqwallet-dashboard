// src/pages/dashboard/index.jsx
import { useState } from 'react';
import DashboardList from './DashboardList';
import { TopCard } from './TopCard';

export function Dashboard() {
  const [refreshAt, setRefreshAt] = useState(0);

  return (
    <div className="pl-10 w-full">
      <TopCard onSaved={() => setRefreshAt(Date.now())} />
      <DashboardList refreshAt={refreshAt} />
    </div>
  );
}
