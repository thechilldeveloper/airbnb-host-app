"use client";
import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import { CartItem } from "@/types";
import { Button } from "@/components/ui/Button";

interface Props {
  items: CartItem[];
  total: number;
  onUpdateQuantity: (id: string, qty: number) => void;
  onRemove: (id: string) => void;
  onCheckout: () => void;
  onClose: () => void;
}

export function Cart({
  items,
  total,
  onUpdateQuantity,
  onRemove,
  onCheckout,
  onClose,
}: Props) {
  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div className="flex-1 bg-black/40" onClick={onClose} />
      {/* Drawer */}
      <div className="w-full max-w-sm bg-white flex flex-col h-full shadow-2xl">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <ShoppingBag size={20} className="text-[#FF385C]" />
            <h2 className="font-semibold text-gray-900">Your order</h2>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-3 text-gray-400">
            <ShoppingBag size={40} strokeWidth={1.5} />
            <p className="text-sm">Your cart is empty</p>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-4">
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-3">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {item.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onUpdateQuantity(item.id!, item.quantity - 1)}
                      className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                    >
                      <Minus size={12} />
                    </button>
                    <span className="w-5 text-center text-sm font-medium">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => onUpdateQuantity(item.id!, item.quantity + 1)}
                      className="w-7 h-7 rounded-full bg-[#FF385C] text-white flex items-center justify-center hover:bg-[#e0314f]"
                    >
                      <Plus size={12} />
                    </button>
                    <button
                      onClick={() => onRemove(item.id!)}
                      className="ml-1 text-gray-300 hover:text-red-400"
                    >
                      <X size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="px-5 py-4 border-t border-gray-100">
              <div className="flex justify-between mb-4">
                <span className="font-semibold text-gray-700">Total</span>
                <span className="font-bold text-gray-900">${total.toFixed(2)}</span>
              </div>
              <Button fullWidth onClick={onCheckout}>
                Place order
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
