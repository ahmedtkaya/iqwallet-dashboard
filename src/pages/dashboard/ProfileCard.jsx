import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../api/firebase"; // kendi firebase config dosyana göre import et

export const ProfileCard = ({
  name = "Carlic Bolomboy",
  email = "carlic@gmai.com",
  avatarSrc = "",
}) => {
  const [users, setUsers] = useState(0);
  const [wallets, setWallets] = useState(0);
  const [transactions, setTransactions] = useState(0);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const usersSnap = await getDocs(collection(db, "users"));
        setUsers(usersSnap.size);

        const walletsSnap = await getDocs(collection(db, "wallets"));
        setWallets(walletsSnap.size);

        const transactionsSnap = await getDocs(collection(db, "transactions"));
        setTransactions(transactionsSnap.size);
      } catch (err) {
        console.error("Firestore fetch error:", err);
      }
    };

    fetchCounts();
  }, []);

  return (
    <div className="rounded-2xl bg-white px-4 py-6 shadow-sm ring-1 ring-black/5 h-full mb-6 w-1/2">
      <div className="flex flex-col items-center text-center">
        {avatarSrc ? (
          <img
            src={avatarSrc}
            alt={name}
            className="h-16 w-16 rounded-full ring-1 ring-black/10 object-cover"
          />
        ) : (
          <div className="h-16 w-16 rounded-full grid place-items-center ring-1 ring-black/10 bg-neutral-100 text-3xl">
            🤩
          </div>
        )}

        <h3 className="mt-3 text-lg font-semibold text-gray-900">{name}</h3>
        <p className="text-sm text-gray-500">{email}</p>
      </div>

      <div className="mt-4 border-t border-gray-200 pt-4">
        <div className="grid grid-cols-3 text-center gap-2">
          <div>
            <p className="text-xs text-gray-400">Users</p>
            <p className="text-xl font-semibold text-gray-900">{users}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400">Wallets</p>
            <p className="text-xl font-semibold text-gray-900">{wallets}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400">Transactions</p>
            <p className="text-xl font-semibold text-gray-900">
              {transactions}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
