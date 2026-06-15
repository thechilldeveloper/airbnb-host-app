"use client";
export const dynamic = "force-dynamic";
import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  addDoc,
  Timestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { MenuItem, MenuCategory } from "@/types";
import { PROPERTY_ID } from "@/lib/constants";
import { useCart } from "@/hooks/useCart";
import { GuestNav } from "@/components/layout/GuestNav";
import { CategoryTabs } from "@/components/food/CategoryTabs";
import { MenuItemCard } from "@/components/food/MenuItemCard";
import { Cart } from "@/components/food/Cart";
import { ManualOrderForm } from "@/components/food/ManualOrderForm";
import { Modal } from "@/components/ui/Modal";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Spinner } from "@/components/ui/Spinner";
import { ShoppingBag } from "lucide-react";
import toast from "react-hot-toast";

export default function FoodPage() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<MenuCategory | "all">("all");
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutModal, setCheckoutModal] = useState(false);
  const [guestName, setGuestName] = useState(
    typeof window !== "undefined" ? localStorage.getItem("guestName") ?? "" : ""
  );
  const [guestPhone, setGuestPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const { items, addItem, removeItem, updateQuantity, clearCart, total, count } = useCart();

  useEffect(() => {
    getDocs(
      query(
        collection(db, "menu"),
        where("available", "==", true),
        orderBy("sortOrder", "asc")
      )
    )
      .then((snap) => {
        setMenuItems(snap.docs.map((d) => ({ id: d.id, ...d.data() } as MenuItem)));
      })
      .catch(() => toast.error("Failed to load menu"))
      .finally(() => setLoading(false));
  }, []);

  const filtered =
    activeCategory === "all"
      ? menuItems
      : menuItems.filter((i) => i.category === activeCategory);

  async function handlePlaceOrder() {
    if (!guestName.trim()) return;
    setSubmitting(true);
    try {
      localStorage.setItem("guestName", guestName);
      await addDoc(collection(db, "orders"), {
        guestName,
        guestPhone,
        items: items.map((i) => ({
          itemId: i.id,
          name: i.name,
          quantity: i.quantity,
          price: i.price,
        })),
        manualNote: "",
        total,
        status: "new",
        createdAt: Timestamp.now(),
        propertyId: PROPERTY_ID,
        isManual: false,
      });
      clearCart();
      setCheckoutModal(false);
      setCartOpen(false);
      toast.success("Order placed! The host will prepare it shortly.");
    } catch {
      toast.error("Failed to place order. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#F0FDFF] pb-28">
      {/* Sticky ocean header */}
      <div
        className="sticky top-0 z-30 px-4 py-4 shadow-sm"
        style={{ background: "linear-gradient(to right, #0C4A6E, #0891B2)" }}
      >
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-xl font-extrabold text-white">Food &amp; Drinks 🍹</h1>
            <p className="text-[11px] text-white/60 mt-0.5">Order fresh, delivered to your room</p>
          </div>
          <button
            onClick={() => setCartOpen(true)}
            className="relative flex items-center gap-1.5 bg-white text-[#0891B2] font-bold rounded-full px-4 py-2 text-sm shadow-md hover:shadow-lg active:scale-95 transition-all duration-200"
          >
            <ShoppingBag size={16} />
            Cart
            {count > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-[#0891B2] text-white rounded-full text-xs flex items-center justify-center font-bold shadow">
                {count}
              </span>
            )}
          </button>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 pt-4 flex flex-col gap-5">
        <CategoryTabs
          active={activeCategory}
          onChange={setActiveCategory}
        />

        {loading ? (
          <Spinner />
        ) : filtered.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            <p>No items in this category</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {filtered.map((item) => (
              <MenuItemCard
                key={item.id}
                item={item}
                onAdd={(i) => {
                  addItem(i);
                  toast.success(`${i.name} added to cart`);
                }}
              />
            ))}
          </div>
        )}

        <div className="mt-2">
          <ManualOrderForm />
        </div>
      </div>

      {cartOpen && (
        <Cart
          items={items}
          total={total}
          onUpdateQuantity={updateQuantity}
          onRemove={removeItem}
          onClose={() => setCartOpen(false)}
          onCheckout={() => {
            setCartOpen(false);
            setCheckoutModal(true);
          }}
        />
      )}

      <Modal
        open={checkoutModal}
        onClose={() => setCheckoutModal(false)}
        title="Your details"
      >
        <div className="flex flex-col gap-4">
          <Input
            label="Your name"
            placeholder="John Smith"
            value={guestName}
            onChange={(e) => setGuestName(e.target.value)}
            required
          />
          <Input
            label="Phone (optional)"
            type="tel"
            placeholder="+1 555 000 0000"
            value={guestPhone}
            onChange={(e) => setGuestPhone(e.target.value)}
          />
          <div className="border-t border-gray-100 pt-3 flex justify-between text-sm">
            <span className="text-gray-600">Order total</span>
            <span className="font-bold">${total.toFixed(2)}</span>
          </div>
          <Button
            fullWidth
            loading={submitting}
            disabled={!guestName.trim()}
            onClick={handlePlaceOrder}
          >
            Confirm order
          </Button>
        </div>
      </Modal>

      <GuestNav />
    </div>
  );
}
