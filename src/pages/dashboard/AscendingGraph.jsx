import { useMemo, useState, useEffect } from "react";
import Chart from "react-apexcharts";
import { ChevronDown } from "lucide-react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../api/firebase"; // kendi firebase config dosyanı import et

export const AscendingGraph = () => {
  const [open, setOpen] = useState(false);
  const [range, setRange] = useState("7d");
  const [openDecreasing, setOpenDecreasing] = useState(false);
  const [rangeDecreasing, setRangeDecreasing] = useState("7d");
  const [totalBalance, setTotalBalance] = useState([]);
  const [balances, setBalances] = useState([]);

  // Firestore'dan balance değerlerini çekiyoruz
  useEffect(() => {
    const fetchBalances = async () => {
      try {
        const snapshot = await getDocs(collection(db, "wallets"));
        let sum = 0;
        const values = [];

        snapshot.forEach((doc) => {
          const data = doc.data();
          if (data.balance !== undefined) {
            const value = Number(data.balance);
            values.push(value);
            sum += value;
          }
        });

        setBalances(values);
        setTotalBalance(sum);
      } catch (err) {
        console.error("Balance fetch error:", err);
      }
    };

    fetchBalances();
  }, []);

  const options = useMemo(
    () => ({
      chart: {
        type: "area",
        toolbar: { show: false },
        sparkline: { enabled: true },
        animations: { easing: "easeinout", speed: 500 },
        dropShadow: {
          enabled: true,
          top: 2,
          left: 0,
          blur: 3,
          color: "#688675",
          opacity: 0.25,
        },
      },
      stroke: { curve: "smooth", width: 2.25, lineCap: "round" },
      colors: ["#688675"],
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 0,
          opacityFrom: 0.18,
          opacityTo: 0,
          stops: [0, 100],
        },
      },
      dataLabels: { enabled: false },
      markers: { size: 0 },
      grid: { show: false },
      xaxis: {
        labels: { show: false },
        axisBorder: { show: false },
        axisTicks: { show: false },
      },
      yaxis: { labels: { show: false } },
      tooltip: { theme: "light", x: { show: false } },
    }),
    []
  );

  const optionsDown = useMemo(
    () => ({
      chart: {
        type: "area",
        toolbar: { show: false },
        sparkline: { enabled: true },
        animations: { easing: "easeinout", speed: 500 },
        dropShadow: {
          enabled: true,
          top: 2,
          left: 0,
          blur: 3,
          color: "#ef4444",
          opacity: 0.25,
        },
      },
      stroke: { curve: "smooth", width: 2.25, lineCap: "round" },
      colors: ["#ef4444"],
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 0,
          opacityFrom: 0.16,
          opacityTo: 0,
          stops: [0, 100],
        },
      },
      dataLabels: { enabled: false },
      markers: { size: 0 },
      grid: { show: false },
      xaxis: {
        labels: { show: false },
        axisBorder: { show: false },
        axisTicks: { show: false },
      },
      yaxis: { labels: { show: false } },
      tooltip: { theme: "light", x: { show: false } },
    }),
    []
  );

  return (
    <>
      {/* Balance CARD */}
      <div className="w-full rounded-2xl bg-neutral-100 p-5 shadow-sm ring-1 ring-black/5 h-1/2">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h3 className="text-lg font-semibold text-gray-900">Balance</h3>
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700 ring-1 ring-emerald-200">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              On track
            </span>
          </div>
          {/* dropdown */}
          <div className="relative z-30">
            <button
              onClick={() => setOpen((v) => !v)}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-gray-900 z-50"
            >
              {range === "1d"
                ? "Daily"
                : range === "7d"
                ? "Weekly"
                : range === "30d"
                ? "Monthly"
                : "Quarterly"}
              <ChevronDown className="h-3 w-3" />
            </button>
          </div>
        </div>

        {/* mini kutular */}
        <div className="relative z-10 -mb-2 grid grid-cols-2 gap-3">
          <div className="rounded-xl bg-white/80 p-3 shadow-sm ring-1 ring-black/5">
            <p className="text-xs text-gray-500">Saves</p>
            <div className="mt-1 flex items-center justify-between">
              <span className="text-xl font-semibold text-gray-900">
                43.50%
              </span>
              <span className="inline-flex items-center rounded-md bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-600 ring-1 ring-emerald-200">
                +2.45%
              </span>
            </div>
          </div>

          <div className="rounded-xl bg-white/80 p-3 shadow-sm ring-1 ring-black/5">
            <p className="text-xs text-gray-500">Balance</p>
            <div className="mt-1 flex items-center justify-between">
              <span className="text-xl font-semibold text-gray-900">
                ${totalBalance.toLocaleString()}
              </span>
              <span className="inline-flex items-center rounded-md bg-rose-50 px-2 py-0.5 text-[11px] font-semibold text-rose-600 ring-1 ring-rose-200">
                -4.75%
              </span>
            </div>
          </div>
        </div>

        <div className="relative mt-4 overflow-hidden rounded-xl bg-gradient-to-b from-gray-50 to-white">
          <Chart
            type="area"
            height={225}
            options={options}
            series={[{ data: balances.length ? balances : [0] }]}
          />
        </div>
      </div>

      {/* Expenses CARD */}
      <div className="mt-6 w-full rounded-2xl bg-neutral-100 p-5 shadow-sm ring-1 ring-black/5 h-1/2">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h3 className="text-lg font-semibold text-gray-900">Expenses</h3>
            <span className="inline-flex items-center gap-1 rounded-full bg-rose-50 px-2.5 py-1 text-xs font-medium text-rose-700 ring-1 ring-rose-200">
              <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />
              Going down
            </span>
          </div>
          <div className="relative z-30">
            <button
              onClick={() => setOpenDecreasing((v) => !v)}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-gray-900 z-50"
            >
              {rangeDecreasing === "1d"
                ? "Daily"
                : rangeDecreasing === "7d"
                ? "Weekly"
                : rangeDecreasing === "30d"
                ? "Monthly"
                : "Quarterly"}
              <ChevronDown className="h-3 w-3" />
            </button>
          </div>
        </div>

        <div className="relative z-10 -mb-2 grid grid-cols-2 gap-3">
          <div className="rounded-xl bg-white/80 p-3 shadow-sm ring-1 ring-black/5">
            <p className="text-xs text-gray-500">Saves</p>
            <div className="mt-1 flex items-center justify-between">
              <span className="text-xl font-semibold text-gray-900">
                43.50%
              </span>
              <span className="inline-flex items-center rounded-md bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-600 ring-1 ring-emerald-200">
                +2.45%
              </span>
            </div>
          </div>

          <div className="rounded-xl bg-white/80 p-3 shadow-sm ring-1 ring-black/5">
            <p className="text-xs text-gray-500">Balance</p>
            <div className="mt-1 flex items-center justify-between">
              <span className="text-xl font-semibold text-gray-900">
                ${totalBalance.toLocaleString()}
              </span>
              <span className="inline-flex items-center rounded-md bg-rose-50 px-2 py-0.5 text-[11px] font-semibold text-rose-600 ring-1 ring-rose-200">
                -4.75%
              </span>
            </div>
          </div>
        </div>

        <div className="relative mt-4 overflow-hidden rounded-xl bg-gradient-to-b from-gray-50 to-white">
          <Chart
            type="area"
            height={225}
            options={optionsDown}
            series={[
              { data: balances.length ? balances.slice().reverse() : [0] },
            ]}
          />
        </div>
      </div>
    </>
  );
};
