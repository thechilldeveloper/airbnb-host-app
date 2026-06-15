export const dynamic = "force-dynamic";
import { DashboardStats } from "@/components/host/DashboardStats";

export default function DashboardPage() {
  return (
    <div className="px-6 py-8 max-w-3xl">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-extrabold text-[#0C4A6E]">Overview 🌴</h1>
        <p className="text-sm text-gray-500 mt-1">
          Welcome back! Here&apos;s what&apos;s happening at your Goa property.
        </p>
      </div>
      <DashboardStats />
    </div>
  );
}
