import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import EuroIcon from '@mui/icons-material/Euro';
import CurrencyLiraIcon from '@mui/icons-material/CurrencyLira';
import DiamondIcon from '@mui/icons-material/Diamond';
import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin';

export const TopCard = ({ onSaved }) => {
  return (
    <div className="w-full flex justify-between mb-8">
      <div className="top-card flex items-center justify-between rounded-xl  bg-neutral-100 px-3 w-1/5 py-6 mr-4">
        <div className="leading-tight">
          <p className="text-xs text-neutral-500">BTC</p>
          <span className="text-base font-bold">$1200.5</span>
        </div>
        <div className="grid place-items-center w-9 h-9 rounded-full bg-[#f7931a] ring-1 ring-black/10 shadow-sm">
          <CurrencyBitcoinIcon className="text-white text-[18px] drop-shadow" />
        </div>
      </div>
      <div className="top-card flex items-center justify-between rounded-xl bg-neutral-100 px-3 w-1/5 py-6 mr-2">
        <div className="leading-tight">
          <p className="text-xs text-neutral-500">USD</p>
          <span className="text-base font-bold">$0.00</span>
        </div>
        <div className="grid place-items-center w-9 h-9 rounded-full bg-[#16a34a] ring-1 ring-black/10 shadow-sm">
          <AttachMoneyIcon className="text-white text-[18px] drop-shadow" />
        </div>
      </div>

      <div className="top-card flex items-center justify-between rounded-xl bg-neutral-100 px-3 w-1/5 py-6 mr-2">
        <div className="leading-tight">
          <p className="text-xs text-neutral-500">EUR</p>
          <span className="text-base font-bold">€0.00</span>
        </div>
        <div className="grid place-items-center w-9 h-9 rounded-full bg-[#1d4ed8] ring-1 ring-black/10 shadow-sm">
          <EuroIcon className="text-white text-[18px] drop-shadow" />
        </div>
      </div>

      <div className="top-card flex items-center justify-between rounded-xl bg-neutral-100 px-3 w-1/5 py-6 mr-2">
        <div className="leading-tight">
          <p className="text-xs text-neutral-500">TRY</p>
          <span className="text-base font-bold">₺0.00</span>
        </div>
        <div className="grid place-items-center w-9 h-9 rounded-full bg-[#ef4444] ring-1 ring-black/10 shadow-sm">
          <CurrencyLiraIcon className="text-white text-[18px] drop-shadow" />
        </div>
      </div>

      <div className="top-card flex items-center justify-between rounded-xl bg-neutral-100 px-3 w-1/5 py-6">
        <div className="leading-tight">
          <p className="text-xs text-neutral-500">ETH</p>
          <span className="text-base font-bold">Ξ0.00</span>
        </div>
        <div className="grid place-items-center w-9 h-9 rounded-full bg-[#627EEA] ring-1 ring-black/10 shadow-sm">
          <DiamondIcon className="text-white text-[18px] drop-shadow" />
        </div>
      </div>
    </div>
  );
};
