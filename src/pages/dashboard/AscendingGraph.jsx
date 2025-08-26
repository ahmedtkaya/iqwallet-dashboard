import { useMemo, useState } from 'react';
import Chart from 'react-apexcharts';
import { ChevronDown } from 'lucide-react';

export const AscendingGraph = () => {
  const [open, setOpen] = useState(false);
  const [range, setRange] = useState('7d');
  const [openDecreasing, setOpenDecreasing] = useState(false);
  const [rangeDecreasing, setRangeDecreasing] = useState('7d');

  const seriesMap = {
    '1d': [12, 14, 10, 11, 15, 18, 20, 17],
    '7d': [10, 14, 9, 23, 17, 25, 20, 28, 24, 31],
    '30d': [6, 9, 12, 10, 15, 20, 22, 25, 28, 26, 30, 33, 29],
    '90d': [4, 6, 8, 12, 9, 16, 18, 22, 24, 28, 32, 35, 31, 38],
  };

  const options = useMemo(
    () => ({
      chart: {
        type: 'area',
        toolbar: { show: false },
        sparkline: { enabled: true },
        animations: { easing: 'easeinout', speed: 500 },
        dropShadow: {
          enabled: true,
          top: 2,
          left: 0,
          blur: 3,
          color: '#688675',
          opacity: 0.25,
        },
      },
      stroke: { curve: 'smooth', width: 2.25, lineCap: 'round' },
      colors: ['#688675'],
      fill: {
        type: 'gradient',
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
      xaxis: { labels: { show: false }, axisBorder: { show: false }, axisTicks: { show: false } },
      yaxis: { labels: { show: false } },
      tooltip: { theme: 'light', x: { show: false } },
    }),
    []
  );
  const optionsDown = useMemo(
    () => ({
      chart: {
        type: 'area',
        toolbar: { show: false },
        sparkline: { enabled: true },
        animations: { easing: 'easeinout', speed: 500 },
        dropShadow: { enabled: true, top: 2, left: 0, blur: 3, color: '#ef4444', opacity: 0.25 },
      },
      stroke: { curve: 'smooth', width: 2.25, lineCap: 'round' },
      colors: ['#ef4444'],
      fill: {
        type: 'gradient',
        gradient: { shadeIntensity: 0, opacityFrom: 0.16, opacityTo: 0, stops: [0, 100] },
      },
      dataLabels: { enabled: false },
      markers: { size: 0 },
      grid: { show: false },
      xaxis: { labels: { show: false }, axisBorder: { show: false }, axisTicks: { show: false } },
      yaxis: { labels: { show: false } },
      tooltip: { theme: 'light', x: { show: false } },
    }),
    []
  );
  return (
    <>
      <div className="w-full rounded-2xl bg-neutral-100 p-5 shadow-sm ring-1 ring-black/5 h-1/2">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h3 className="text-lg font-semibold text-gray-900">Balance</h3>
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700 ring-1 ring-emerald-200">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              On track
            </span>
          </div>

          <div className="relative z-30">
            <button
              onClick={() => setOpen((v) => !v)}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-gray-900 z-50"
            >
              {range === '1d'
                ? 'Daily'
                : range === '7d'
                ? 'Weekly'
                : range === '30d'
                ? 'Monthly'
                : 'Quarterly'}
              <ChevronDown className="h-3 w-3" />
            </button>
            {open && (
              <div className="absolute right-0 mt-2 w-40 rounded-lg bg-white p-1 shadow-sm ring-1 ring-black/5">
                {[
                  { k: '1d', label: 'Daily' },
                  { k: '7d', label: 'Weekly' },
                  { k: '30d', label: 'Monthly' },
                  { k: '90d', label: 'Quarterly' },
                ].map((opt) => (
                  <button
                    key={opt.k}
                    onClick={() => {
                      setRange(opt.k);
                      setOpen(false);
                    }}
                    className="w-full rounded-md px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="relative z-10 -mb-2 grid grid-cols-2 gap-3">
          <div className="rounded-xl bg-white/80 p-3 shadow-sm ring-1 ring-black/5 backdrop-blur supports-[backdrop-filter]:backdrop-blur-md">
            <p className="text-xs text-gray-500">Saves</p>
            <div className="mt-1 flex items-center justify-between">
              <span className="text-xl font-semibold text-gray-900">43.50%</span>
              <span className="inline-flex items-center rounded-md bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-600 ring-1 ring-emerald-200">
                +2.45%
              </span>
            </div>
          </div>

          <div className="rounded-xl bg-white/80 p-3 shadow-sm ring-1 ring-black/5 backdrop-blur supports-[backdrop-filter]:backdrop-blur-md">
            <p className="text-xs text-gray-500">Balance</p>
            <div className="mt-1 flex items-center justify-between">
              <span className="text-xl font-semibold text-gray-900">$52,422</span>
              <span className="inline-flex items-center rounded-md bg-rose-50 px-2 py-0.5 text-[11px] font-semibold text-rose-600 ring-1 ring-rose-200">
                -4.75%
              </span>
            </div>
          </div>
        </div>

        <div className="relative mt-4 overflow-hidden rounded-xl bg-gradient-to-b from-gray-50 to-white">
          <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-6 bg-gradient-to-b from-white to-transparent" />
          <Chart type="area" height={230} options={options} series={[{ data: seriesMap[range] }]} />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-10 bg-gradient-to-t from-white to-transparent" />
        </div>
      </div>
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
              {rangeDecreasing === '1d'
                ? 'Daily'
                : rangeDecreasing === '7d'
                ? 'Weekly'
                : rangeDecreasing === '30d'
                ? 'Monthly'
                : 'Quarterly'}
              <ChevronDown className="h-3 w-3" />
            </button>

            {openDecreasing && (
              <div className="absolute right-0 mt-2 w-40 rounded-lg bg-white p-1 shadow-sm ring-1 ring-black/5">
                {[
                  { k: '1d', label: 'Daily' },
                  { k: '7d', label: 'Weekly' },
                  { k: '30d', label: 'Monthly' },
                  { k: '90d', label: 'Quarterly' },
                ].map((opt) => (
                  <button
                    key={opt.k}
                    onClick={() => {
                      setRangeDecreasing(opt.k);
                      setOpenDecreasing(false);
                    }}
                    className="w-full rounded-md px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* mini kutular — aynı yapı */}
        <div className="relative z-10 -mb-2 grid grid-cols-2 gap-3">
          <div className="rounded-xl bg-white/80 p-3 shadow-sm ring-1 ring-black/5 backdrop-blur supports-[backdrop-filter]:backdrop-blur-md">
            <p className="text-xs text-gray-500">Saves</p>
            <div className="mt-1 flex items-center justify-between">
              <span className="text-xl font-semibold text-gray-900">43.50%</span>
              <span className="inline-flex items-center rounded-md bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-600 ring-1 ring-emerald-200">
                +2.45%
              </span>
            </div>
          </div>

          <div className="rounded-xl bg-white/80 p-3 shadow-sm ring-1 ring-black/5 backdrop-blur supports-[backdrop-filter]:backdrop-blur-md">
            <p className="text-xs text-gray-500">Balance</p>
            <div className="mt-1 flex items-center justify-between">
              <span className="text-xl font-semibold text-gray-900">$52,422</span>
              <span className="inline-flex items-center rounded-md bg-rose-50 px-2 py-0.5 text-[11px] font-semibold text-rose-600 ring-1 ring-rose-200">
                -4.75%
              </span>
            </div>
          </div>
        </div>

        <div className="relative mt-4 overflow-hidden rounded-xl bg-gradient-to-b from-gray-50 to-white">
          <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-6 bg-gradient-to-b from-white to-transparent" />
          <Chart
            type="area"
            height={230}
            options={optionsDown}
            // ⬇️ burası rangeDecreasing olmalı
            series={[{ data: seriesMap[rangeDecreasing].slice().reverse() }]}
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-10 bg-gradient-to-t from-white to-transparent" />
        </div>
      </div>
    </>
  );
};
