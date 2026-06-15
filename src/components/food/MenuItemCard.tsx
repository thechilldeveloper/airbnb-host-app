"use client";
import { useState } from "react";
import { Plus, Check } from "lucide-react";
import { MenuItem } from "@/types";

interface Props {
  item: MenuItem;
  onAdd: (item: MenuItem) => void;
}

export function MenuItemCard({ item, onAdd }: Props) {
  const [added, setAdded] = useState(false);

  function handleAdd() {
    onAdd(item);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  }

  return (
    <div className="beach-card p-4 flex items-center gap-4">
      <div className="flex-1 min-w-0">
        <p className="font-bold text-[#0C4A6E] text-sm">{item.name}</p>
        {item.description && (
          <p className="text-xs text-gray-500 mt-0.5 line-clamp-2 leading-relaxed">
            {item.description}
          </p>
        )}
        <p className="text-[#0891B2] font-extrabold text-sm mt-2">
          ₹{item.price.toFixed(2)}
        </p>
      </div>
      <button
        onClick={handleAdd}
        className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 active:scale-90 ${
          added
            ? "bg-emerald-500 text-white scale-110 shadow-lg shadow-emerald-200"
            : "bg-gradient-to-br from-[#0891B2] to-[#0E7490] text-white shadow-md shadow-[#0891B2]/30 hover:shadow-lg hover:shadow-[#0891B2]/40"
        }`}
      >
        {added ? <Check size={18} strokeWidth={2.5} /> : <Plus size={18} strokeWidth={2.5} />}
      </button>
    </div>
  );
}
