"use client";
import { PlaceCategory } from "@/types";
import { PLACE_CATEGORIES } from "@/lib/constants";

interface Props {
  active: PlaceCategory | "all";
  onChange: (cat: PlaceCategory | "all") => void;
}

export function CategoryFilter({ active, onChange }: Props) {
  const all = [{ value: "all", label: "All", icon: "🗺️" }, ...PLACE_CATEGORIES] as const;
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
      {all.map(({ value, label, icon }) => (
        <button
          key={value}
          onClick={() => onChange(value as PlaceCategory | "all")}
          className={`shrink-0 flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200 ${
            active === value
              ? "bg-gradient-to-r from-[#0891B2] to-[#0E7490] text-white shadow-md shadow-[#0891B2]/30 scale-[1.04]"
              : "bg-white border border-[#E0F2FE] text-gray-500 hover:border-[#0891B2]/50 hover:text-[#0891B2]"
          }`}
        >
          <span>{icon}</span>
          {label}
        </button>
      ))}
    </div>
  );
}
