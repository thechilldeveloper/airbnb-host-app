"use client";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

interface Props {
  guestName: string;
  checkinId: string;
}

export function StepConfirmation({ guestName, checkinId }: Props) {
  return (
    <div className="flex flex-col items-center gap-6 py-8 text-center">
      {/* Beach celebration */}
      <div className="relative">
        <div
          className="w-24 h-24 rounded-full flex items-center justify-center text-5xl shadow-xl"
          style={{ background: "linear-gradient(135deg, #0891B2, #0C4A6E)" }}
        >
          🌴
        </div>
        <span className="absolute -top-1 -right-1 text-2xl float-1">✨</span>
        <span className="absolute -bottom-1 -left-1 text-xl float-2">🌊</span>
      </div>

      <div>
        <h2 className="text-2xl font-extrabold text-[#0C4A6E]">
          Welcome, {guestName}!
        </h2>
        <p className="text-gray-500 mt-2 text-sm leading-relaxed">
          Your check-in is complete. Enjoy your Goa stay! 🏖️<br />
          The host has been notified.
        </p>
      </div>

      <div
        className="rounded-2xl px-6 py-4 w-full text-left border border-[#E0F2FE]"
        style={{ background: "linear-gradient(135deg, #F0FDFF 0%, #E0F2FE 100%)" }}
      >
        <p className="text-[11px] text-[#0891B2] font-bold uppercase tracking-widest mb-1">
          Booking reference
        </p>
        <p className="font-mono text-sm font-semibold text-[#0C4A6E] break-all">
          {checkinId}
        </p>
      </div>

      <div className="flex flex-col gap-3 w-full">
        <Link href="/food" className="w-full">
          <Button fullWidth variant="primary">
            🍹 Order food &amp; drinks
          </Button>
        </Link>
        <Link href="/nearby" className="w-full">
          <Button fullWidth variant="secondary">
            🗺️ Explore nearby places
          </Button>
        </Link>
      </div>
    </div>
  );
}
