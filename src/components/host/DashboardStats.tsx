"use client";
import { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  getCountFromServer,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { PROPERTY_ID } from "@/lib/constants";
import { ClipboardCheck, ShoppingBag, MessageCircle } from "lucide-react";
import Link from "next/link";

interface StatCardProps {
  label: string;
  value: number | string;
  icon: React.ReactNode;
  iconBg: string;
  href: string;
  emoji: string;
}

function StatCard({ label, value, icon, iconBg, href, emoji }: StatCardProps) {
  return (
    <Link
      href={href}
      className="beach-card p-5 flex items-center gap-4 hover:scale-[1.02] transition-transform duration-200 cursor-pointer"
    >
      <div
        className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${iconBg}`}
      >
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-2xl font-extrabold text-[#0C4A6E]">{value}</p>
        <p className="text-xs text-gray-500 mt-0.5">{label}</p>
      </div>
      <span className="text-2xl opacity-60">{emoji}</span>
    </Link>
  );
}

export function DashboardStats() {
  const [checkins, setCheckins] = useState(0);
  const [orders, setOrders] = useState(0);
  const [conversations, setConversations] = useState(0);

  useEffect(() => {
    const pid = PROPERTY_ID;
    Promise.all([
      getCountFromServer(
        query(collection(db, "checkins"), where("propertyId", "==", pid))
      ),
      getCountFromServer(
        query(
          collection(db, "orders"),
          where("propertyId", "==", pid),
          where("status", "==", "new")
        )
      ),
      getCountFromServer(
        query(collection(db, "messages"), where("propertyId", "==", pid))
      ),
    ]).then(([c, o, m]) => {
      setCheckins(c.data().count);
      setOrders(o.data().count);
      setConversations(m.data().count);
    });
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <StatCard
        label="Total check-ins"
        value={checkins}
        icon={<ClipboardCheck size={22} className="text-emerald-600" />}
        iconBg="bg-emerald-50"
        href="/host/dashboard/checkins"
        emoji="🏨"
      />
      <StatCard
        label="New food orders"
        value={orders}
        icon={<ShoppingBag size={22} className="text-orange-500" />}
        iconBg="bg-orange-50"
        href="/host/dashboard/orders"
        emoji="🍹"
      />
      <StatCard
        label="Guest conversations"
        value={conversations}
        icon={<MessageCircle size={22} className="text-[#0891B2]" />}
        iconBg="bg-[#E0F2FE]"
        href="/host/dashboard/messages"
        emoji="💬"
      />
    </div>
  );
}
