"use client";
export const dynamic = "force-dynamic";
import { useOrders } from "@/hooks/useOrders";
import { Spinner } from "@/components/ui/Spinner";
import { Order, OrderStatus } from "@/types";
import { updateDoc, doc, Timestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { ORDER_STATUS_LABELS } from "@/lib/constants";
import { format } from "date-fns";
import toast from "react-hot-toast";
import { ShoppingBag, Clock, CheckCircle, XCircle, ChefHat, Bike } from "lucide-react";

const STATUS_FLOW: OrderStatus[] = ["preparing", "ready", "delivered", "cancelled"];

const STATUS_STYLE: Record<OrderStatus, { bg: string; text: string; dot: string; icon: React.ReactNode }> = {
  new:       { bg: "bg-red-50",    text: "text-red-600",    dot: "bg-red-500",    icon: <ShoppingBag size={11} /> },
  preparing: { bg: "bg-amber-50",  text: "text-amber-600",  dot: "bg-amber-500",  icon: <ChefHat size={11} /> },
  ready:     { bg: "bg-blue-50",   text: "text-[#0891B2]",  dot: "bg-[#0891B2]", icon: <Clock size={11} /> },
  delivered: { bg: "bg-green-50",  text: "text-green-600",  dot: "bg-green-500",  icon: <CheckCircle size={11} /> },
  cancelled: { bg: "bg-gray-50",   text: "text-gray-500",   dot: "bg-gray-400",   icon: <XCircle size={11} /> },
};

function fmtTime(ts: unknown) {
  try {
    const d = ts instanceof Timestamp ? ts.toDate() : new Date(ts as string);
    return format(d, "hh:mm a");
  } catch { return ""; }
}

function fmtDate(ts: unknown) {
  try {
    const d = ts instanceof Timestamp ? ts.toDate() : new Date(ts as string);
    const today = new Date();
    const diff = Math.floor((today.getTime() - d.getTime()) / 86400000);
    if (diff === 0) return "Today";
    if (diff === 1) return "Yesterday";
    return format(d, "dd MMM");
  } catch { return ""; }
}

function getInitials(name: string) {
  return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
}

function OrderMessage({ order }: { order: Order }) {
  const style = STATUS_STYLE[order.status];

  async function updateStatus(status: OrderStatus) {
    try {
      await updateDoc(doc(db, "orders", order.id!), { status });
      toast.success(`Marked as ${ORDER_STATUS_LABELS[status]}`);
    } catch {
      toast.error("Failed to update");
    }
  }

  const isDone = order.status === "delivered" || order.status === "cancelled";

  return (
    <div className="flex gap-3 items-start">
      {/* Avatar */}
      <div
        className="w-9 h-9 rounded-full shrink-0 flex items-center justify-center text-white text-xs font-bold shadow-sm"
        style={{ background: "linear-gradient(135deg, #0891B2, #0C4A6E)" }}
      >
        {getInitials(order.guestName)}
      </div>

      {/* Bubble */}
      <div className="flex-1 max-w-lg">
        {/* Name + time */}
        <div className="flex items-baseline gap-2 mb-1.5">
          <span className="text-sm font-bold text-[#0C4A6E]">{order.guestName}</span>
          {order.guestPhone && (
            <a href={`tel:${order.guestPhone}`} className="text-[10px] text-[#0891B2] hover:underline">
              {order.guestPhone}
            </a>
          )}
          <span className="text-[10px] text-gray-400 ml-auto">{fmtTime(order.createdAt)}</span>
        </div>

        {/* Message card */}
        <div className="bg-white rounded-2xl rounded-tl-sm border border-[#E0F2FE] shadow-sm overflow-hidden">
          {/* Order header */}
          <div className="px-4 py-3 border-b border-[#F0FDFF] flex items-center justify-between"
            style={{ background: "linear-gradient(to right, #F0FDFF, white)" }}>
            <div className="flex items-center gap-2">
              <span className="text-lg">🍽️</span>
              <span className="font-bold text-sm text-[#0C4A6E]">Food Order</span>
            </div>
            <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold ${style.bg} ${style.text}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`} />
              {ORDER_STATUS_LABELS[order.status]}
            </div>
          </div>

          {/* Order items */}
          <div className="px-4 py-3">
            {order.isManual ? (
              <div className="bg-[#F0FDFF] rounded-xl px-3 py-2.5 text-sm text-[#0C4A6E]">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Custom request</p>
                <p className="leading-relaxed">{order.manualNote}</p>
              </div>
            ) : (
              <div className="flex flex-col gap-1.5">
                {order.items.map((item, i) => (
                  <div key={i} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-[#E0F2FE] text-[#0891B2] text-[10px] font-bold flex items-center justify-center shrink-0">
                        {item.quantity}
                      </span>
                      <span className="text-gray-700">{item.name}</span>
                    </div>
                    <span className="text-gray-500 font-medium">₹{(item.price * item.quantity).toFixed(0)}</span>
                  </div>
                ))}
                <div className="mt-2 pt-2 border-t border-[#F0FDFF] flex justify-between text-sm font-bold text-[#0C4A6E]">
                  <span>Total</span>
                  <span>₹{order.total.toFixed(0)}</span>
                </div>
              </div>
            )}
          </div>

          {/* Action buttons */}
          {!isDone && (
            <div className="px-4 pb-3 flex flex-wrap gap-2">
              {STATUS_FLOW.filter((s) => s !== order.status && s !== "new").map((s) => {
                const isPositive = s !== "cancelled";
                return (
                  <button
                    key={s}
                    onClick={() => updateStatus(s)}
                    className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full font-semibold transition-all active:scale-95 ${
                      isPositive
                        ? "bg-[#0891B2] text-white hover:bg-[#0C4A6E]"
                        : "border border-gray-200 text-gray-500 hover:bg-gray-50"
                    }`}
                  >
                    {s === "preparing" && <ChefHat size={11} />}
                    {s === "ready" && <Clock size={11} />}
                    {s === "delivered" && <Bike size={11} />}
                    {s === "cancelled" && <XCircle size={11} />}
                    {ORDER_STATUS_LABELS[s]}
                  </button>
                );
              })}
            </div>
          )}

          {isDone && (
            <div className={`px-4 pb-3 flex items-center gap-1.5 text-xs font-medium ${style.text}`}>
              {style.icon}
              {order.status === "delivered" ? "Order delivered successfully" : "Order cancelled"}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function OrdersPage() {
  const { orders, loading } = useOrders();

  // Group orders by date
  const grouped: Record<string, Order[]> = {};
  for (const o of orders) {
    const label = fmtDate(o.createdAt);
    if (!grouped[label]) grouped[label] = [];
    grouped[label].push(o);
  }

  const newCount = orders.filter((o) => o.status === "new").length;

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {/* Header */}
      <div className="shrink-0 px-6 py-4 border-b border-[#E0F2FE] bg-white flex items-center justify-between">
        <div>
          <h1 className="text-xl font-extrabold text-[#0C4A6E] flex items-center gap-2">
            🍹 Food Orders
          </h1>
          <p className="text-xs text-gray-400 mt-0.5">
            {loading ? "Loading…" : `${orders.length} total order${orders.length !== 1 ? "s" : ""}`}
          </p>
        </div>
        {newCount > 0 && (
          <div className="flex items-center gap-2 bg-red-50 text-red-600 text-sm font-bold px-3 py-1.5 rounded-full border border-red-200">
            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            {newCount} new
          </div>
        )}
      </div>

      {/* Feed */}
      <div className="flex-1 overflow-y-auto px-6 py-6 flex flex-col gap-6">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <Spinner />
          </div>
        ) : orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
            <span className="text-5xl float-1">🍽️</span>
            <div>
              <p className="font-bold text-[#0C4A6E]">No food orders yet</p>
              <p className="text-sm text-gray-400 mt-1">Orders from guests will appear here</p>
            </div>
          </div>
        ) : (
          Object.entries(grouped).map(([date, dayOrders]) => (
            <div key={date} className="flex flex-col gap-4">
              {/* Date divider */}
              <div className="flex items-center gap-3">
                <div className="flex-1 h-px bg-[#E0F2FE]" />
                <span className="text-[11px] font-bold text-[#0891B2] bg-[#E0F2FE] px-3 py-1 rounded-full">
                  {date}
                </span>
                <div className="flex-1 h-px bg-[#E0F2FE]" />
              </div>
              {/* Orders for this day */}
              {dayOrders.map((order) => (
                <OrderMessage key={order.id} order={order} />
              ))}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
