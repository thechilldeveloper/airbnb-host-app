"use client";
export const dynamic = "force-dynamic";
import { useCheckins } from "@/hooks/useCheckins";
import { CheckinRow } from "@/components/host/CheckinRow";
import { Spinner } from "@/components/ui/Spinner";

export default function CheckinsPage() {
  const { checkins, loading } = useCheckins();

  return (
    <div className="px-6 py-8 max-w-3xl">
      <h1 className="text-2xl font-extrabold text-[#0C4A6E] mb-6">
        🏨 Check-ins ({checkins.length})
      </h1>
      {loading ? (
        <Spinner />
      ) : checkins.length === 0 ? (
        <div className="text-center py-16 text-gray-400">No check-ins yet</div>
      ) : (
        <div className="flex flex-col gap-3">
          {checkins.map((c) => (
            <CheckinRow key={c.id} checkin={c} />
          ))}
        </div>
      )}
    </div>
  );
}
