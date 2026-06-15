"use client";
import { useState } from "react";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { PROPERTY_ID } from "@/lib/constants";
import { Textarea } from "@/components/ui/Textarea";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import toast from "react-hot-toast";

export function ManualOrderForm() {
  const [note, setNote] = useState("");
  const [guestName, setGuestName] = useState("");
  const [guestPhone, setGuestPhone] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!note.trim() || !guestName.trim()) return;
    setLoading(true);
    try {
      await addDoc(collection(db, "orders"), {
        guestName,
        guestPhone,
        items: [],
        manualNote: note,
        total: 0,
        status: "new",
        createdAt: Timestamp.now(),
        propertyId: PROPERTY_ID,
        isManual: true,
      });
      toast.success("Order sent to host!");
      setNote("");
      setGuestName("");
      setGuestPhone("");
    } catch {
      toast.error("Failed to send. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-5 shadow-sm flex flex-col gap-4">
      <div>
        <h3 className="font-semibold text-gray-900">Custom request</h3>
        <p className="text-xs text-gray-500 mt-0.5">
          Can&apos;t find what you want? Describe your order below
        </p>
      </div>
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
      <Textarea
        label="Describe your order"
        placeholder="e.g. 2 cheese pizzas and a bottle of water..."
        rows={4}
        value={note}
        onChange={(e) => setNote(e.target.value)}
        required
      />
      <Button type="submit" loading={loading} fullWidth>
        Send to host
      </Button>
    </form>
  );
}
