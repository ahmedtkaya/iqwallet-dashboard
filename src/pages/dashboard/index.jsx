// src/pages/dashboard/index.jsx
import { AscendingGraph } from './AscendingGraph';
import { DailyTransactions } from './DailyTransactions';
import { EarningsCard } from './EarningsCard';
import { ProfileCard } from './ProfileCard';
import { TopCard } from './TopCard';

export function Dashboard() {
  return (
    <div className="pl-10 w-full min-h-[85vh] flex flex-col">
      <TopCard />
      <div className="flex h-[90%]">
        <div className="bottom-left w-[60%] flex flex-col mr-2">
          <AscendingGraph />
        </div>
        <div className="w-[40%] flex flex-col justify-between">
          <div className="flex h-1/2 mb-6">
            <EarningsCard />
            <ProfileCard />
          </div>
          <DailyTransactions />
        </div>
      </div>
    </div>
  );
}
