// src/pages/dashboard/index.jsx
import { AscendingGraph } from './AscendingGraph';
import { EarningsCard } from './EarningsCard';
import { TopCard } from './TopCard';

export function Dashboard() {
  return (
    <div className="pl-10 w-full min-h-[85vh] flex flex-col">
      <TopCard />
      <div className="flex">
        <div className="bottom-left w-[60%] flex flex-col h-full">
          <AscendingGraph />
        </div>
        <div className="w-[40%]">
          <EarningsCard></EarningsCard>
        </div>
      </div>
    </div>
  );
}
