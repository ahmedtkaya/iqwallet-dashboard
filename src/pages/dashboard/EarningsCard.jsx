export const EarningsCard = ({ amount = 6078.76, percent = 80 }) => {
  const p = Math.max(0, Math.min(100, Math.round(percent)));

  // gauge çizimi
  const W = 220,
    H = 120,
    cx = 110,
    cy = 110,
    r = 80;
  const arc = `M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`;

  return (
    <div className="rounded-2xl bg-white px-4 py-6 shadow-sm ring-1 ring-black/5 h-full mb-6 w-1/2 mr-2">
      <p className="text-sm font-semibold text-gray-900">Earnings</p>
      <p className="mt-0.5 text-[11px] text-gray-500">Total Expense</p>

      <p className="mt-1 text-3xl font-extrabold text-[#5f7c6d]">
        {amount.toLocaleString('en-US', {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: 2,
        })}
      </p>

      <p className="mt-1 text-sm text-gray-600">
        Profit is <span className="font-semibold">34%</span> More than last Month
      </p>

      <div className="mt-6">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
          <path d={arc} fill="none" stroke="#E6EFE9" strokeWidth="18" strokeLinecap="round" />
          <path
            d={arc}
            fill="none"
            stroke="#6b8f7a"
            strokeWidth="18"
            strokeLinecap="round"
            pathLength="100"
            strokeDasharray="100"
            strokeDashoffset={100 - p}
          />
          <text
            x={cx}
            y={cy - 12}
            textAnchor="middle"
            className="fill-black font-bold"
            fontSize="22"
          >
            {p}%
          </text>
        </svg>
      </div>
    </div>
  );
};
