import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../api/firebase"; // Firebase config'in

import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import EuroIcon from "@mui/icons-material/Euro";
import CurrencyLiraIcon from "@mui/icons-material/CurrencyLira";
import DiamondIcon from "@mui/icons-material/Diamond";
import CurrencyBitcoinIcon from "@mui/icons-material/CurrencyBitcoin";

const ICONS = {
  BTC: <CurrencyBitcoinIcon className="text-white text-[18px] drop-shadow" />,
  USD: <AttachMoneyIcon className="text-white text-[18px] drop-shadow" />,
  EUR: <EuroIcon className="text-white text-[18px] drop-shadow" />,
  TRY: <CurrencyLiraIcon className="text-white text-[18px] drop-shadow" />,
  ETH: <DiamondIcon className="text-white text-[18px] drop-shadow" />,
};

const COLORS = {
  BTC: "#f7931a",
  USD: "#16a34a",
  EUR: "#1d4ed8",
  TRY: "#ef4444",
  ETH: "#627EEA",
};
export const TopCard = ({ onSaved }) => {
  const [currencies, setCurrencies] = useState([]);

  useEffect(() => {
    const fetchCurrencies = async () => {
      const querySnapshot = await getDocs(collection(db, "currencies"));
      const data = querySnapshot.docs.map((doc) => doc.data());
      setCurrencies(data);
    };

    fetchCurrencies();
  }, []);

  return (
    <div className="w-full flex justify-between mb-8 h-[10%]">
      {currencies.map((currency) => (
        <div
          key={currency.code}
          className="top-card flex items-center justify-between rounded-xl bg-neutral-100 px-3 w-1/5 py-6 mr-2"
        >
          <div className="leading-tight">
            <p className="text-xs text-neutral-500">{currency.code}</p>
            <span className="text-base font-bold">
              {currency.code === "BTC" || currency.code === "ETH"
                ? `${currency.code === "BTC" ? "$" : "Ξ"}${currency.value}`
                : `${
                    currency.code === "USD"
                      ? "$"
                      : currency.code === "EUR"
                      ? "€"
                      : "₺"
                  }${currency.value}`}
            </span>
          </div>
          <div
            className="grid place-items-center w-9 h-9 rounded-full ring-1 ring-black/10 shadow-sm"
            style={{ backgroundColor: COLORS[currency.code] }}
          >
            {ICONS[currency.code]}
          </div>
        </div>
      ))}
    </div>
  );
};
