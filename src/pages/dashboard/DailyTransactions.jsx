import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../api/firebase";

export function DailyTransactions() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1) users koleksiyonunu çek
        const usersSnap = await getDocs(collection(db, "users"));
        const usersMap = {};
        usersSnap.forEach((u) => {
          const userData = u.data();
          usersMap[u.id] = userData.fullName || u.id; // 🔑 fullName kullan
        });

        // 2) transactions koleksiyonunu çek
        const transSnap = await getDocs(collection(db, "transactions"));
        const transactions = transSnap.docs.map((docSnap) => {
          const d = docSnap.data();
          return {
            id: docSnap.id,
            type: d.amount >= 0 ? "from" : "to",
            name: usersMap[d.userId] || d.userId, // eşleştirme
            when: d.createdAt?.toDate
              ? d.createdAt.toDate().toLocaleString()
              : "No date",
            delta: Number(d.amount) || 0,
          };
        });

        setItems(transactions);
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5 h-1/2 w-full">
      <p className="text-base font-semibold text-gray-900">Your Transfers</p>

      <ul className="mt-3 space-y-3">
        {items.map((it) => {
          const positive = it.delta >= 0;
          return (
            <li
              key={it.id}
              className="flex items-center justify-between border-b border-gray-300 pb-2"
            >
              <div className="flex min-w-0 items-center gap-3">
                <span className="relative h-8 w-1.5 rounded-full">
                  <span className="absolute inset-x-0 h-full w-1.5 rounded-full bg-[#6b8f7a] top-0" />
                </span>

                <div className="truncate">
                  <p className="truncate text-sm text-gray-900">
                    {it.type === "to" ? "To " : "From "}
                    <span className="font-medium">{it.name}</span>
                  </p>
                  <span className="text-xs text-gray-500">{it.when}</span>
                </div>
              </div>

              <span
                className={
                  "shrink-0 inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-semibold ring-1 " +
                  (positive
                    ? "bg-emerald-50 text-emerald-700 ring-emerald-200"
                    : "bg-rose-50 text-rose-700 ring-rose-200")
                }
              >
                {positive ? "+" : ""}
                {Math.abs(it.delta).toFixed(2)}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
