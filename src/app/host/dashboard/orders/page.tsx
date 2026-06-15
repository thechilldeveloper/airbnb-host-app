"use client";
export const dynamic = "force-dynamic";
import { useOrders } from "@/hooks/useOrders";
import { OrderCard } from "@/components/host/OrderCard";
import { Spinner } from "@/components/ui/Spinner";

export default function OrdersPage() {
  const { orders, loading } = useOrders();

  return (
    <div className="px-6 py-8 max-w-3xl">
      <h1 className="text-2xl font-extrabold text-[#0C4A6E] mb-6">
        🍹 Food Orders ({orders.length})
      </h1>
      {loading ? (
        <Spinner />
      ) : orders.length === 0 ? (
        <div className="text-center py-16 text-gray-400">No orders yet</div>
      ) : (
        <div className="flex flex-col gap-4">
          {orders.map((o) => (
            <OrderCard key={o.id} order={o} />
          ))}
        </div>
      )}
    </div>
  );
}
