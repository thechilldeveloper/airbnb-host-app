"use client";
import { MenuCategory } from "@/types";
import { MENU_CATEGORIES } from "@/lib/constants";

interface Props {
  active: MenuCategory | "all";
  onChange: (cat: MenuCategory | "all") => void;
}

export function CategoryTabs({ active, onChange }: Props) {
  const all = [{ value: "all", label: "All 🍽️" }, ...MENU_CATEGORIES] as const;
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
      {all.map(({ value, label }) => (
        <button
          key={value}
          onClick={() => onChange(value as MenuCategory | "all")}
          className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200 ${
            active === value
              ? "bg-gradient-to-r from-[#0891B2] to-[#0E7490] text-white shadow-md shadow-[#0891B2]/30 scale-[1.04]"
              : "bg-white border border-[#E0F2FE] text-gray-500 hover:border-[#0891B2]/50 hover:text-[#0891B2]"
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
