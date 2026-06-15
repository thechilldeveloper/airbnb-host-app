"use client";
import { Order, OrderStatus } from "@/types";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Badge } from "@/components/ui/Badge";
import { ORDER_STATUS_LABELS } from "@/lib/constants";
import { format } from "date-fns";
import { Timestamp } from "firebase/firestore";
import toast from "react-hot-toast";

const STATUS_FLOW: OrderStatus[] = [
  "new",
  "preparing",
  "ready",
  "delivered",
  "cancelled",
];

const STATUS_COLORS: Record<
  OrderStatus,
  "red" | "yellow" | "blue" | "green" | "gray"
> = {
  new: "red",
  preparing: "yellow",
  ready: "blue",
  delivered: "green",
  cancelled: "gray",
};

function fmtDate(ts: unknown) {
  try {
    const d =
      ts instanceof Timestamp
        ? ts.toDate()
        : ts instanceof Date
        ? ts
        : new Date(ts as string);
    return format(d, "dd MMM HH:mm");
  } catch {
    return "–";
  }
}

interface Props {
  order: Order;
}

export function OrderCard({ order }: Props) {
  async function updateStatus(status: OrderStatus) {
    try {
      await updateDoc(doc(db, "orders", order.id!), { status });
      toast.success(`Order marked as ${ORDER_STATUS_LABELS[status]}`);
    } catch {
      toast.error("Failed to update status");
    }
  }

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div>
          <p className="font-semibold text-gray-900">{order.guestName}</p>
          {order.guestPhone && (
            <a
              href={`tel:${order.guestPhone}`}
              className="text-xs text-[#FF385C]"
            >
              {order.guestPhone}
            </a>
          )}
          <p className="text-xs text-gray-400 mt-0.5">{fmtDate(order.createdAt)}</p>
        </div>
        <Badge
          label={ORDER_STATUS_LABELS[order.status]}
          color={STATUS_COLORS[order.status]}
        />
      </div>

      {order.isManual ? (
        <div className="bg-gray-50 rounded-xl px-4 py-3 text-sm text-gray-700">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1">
            Custom request
          </span>
          {order.manualNote}
        </div>
      ) : (
        <div className="text-sm text-gray-700">
          {order.items.map((item, i) => (
            <div key={i} className="flex justify-between py-1 border-b border-gray-100 last:border-0">
              <span>
                {item.quantity}× {item.name}
              </span>
              <span className="text-gray-500">
                ${(item.price * item.quantity).toFixed(2)}
              </span>
            </div>
          ))}
          <div className="flex justify-between pt-2 font-semibold">
            <span>Total</span>
            <span>${order.total.toFixed(2)}</span>
          </div>
        </div>
      )}

      {order.status !== "delivered" && order.status !== "cancelled" && (
        <div className="mt-4 flex flex-wrap gap-2">
          {STATUS_FLOW.filter(
            (s) => s !== order.status && s !== "new"
          ).map((s) => (
            <button
              key={s}
              onClick={() => updateStatus(s)}
              className="text-xs px-3 py-1.5 rounded-full border border-gray-200 text-gray-600 hover:bg-gray-100 transition-colors"
            >
              Mark as {ORDER_STATUS_LABELS[s]}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
