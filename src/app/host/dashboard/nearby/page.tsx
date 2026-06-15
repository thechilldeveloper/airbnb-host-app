export const dynamic = "force-dynamic";
import { NearbyEditor } from "@/components/host/NearbyEditor";

export default function NearbyPage() {
  return (
    <div className="px-6 py-8 max-w-3xl">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Nearby Places</h1>
      <NearbyEditor />
    </div>
  );
}
