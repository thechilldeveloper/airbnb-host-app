"use client";
import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { MenuItem, MenuCategory } from "@/types";
import { MENU_CATEGORIES } from "@/lib/constants";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { Spinner } from "@/components/ui/Spinner";
import { Pencil, Trash2, Plus } from "lucide-react";
import toast from "react-hot-toast";

const EMPTY: Omit<MenuItem, "id"> = {
  name: "",
  description: "",
  price: 0,
  category: "mains",
  available: true,
  sortOrder: 0,
};

export function MenuEditor() {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<MenuItem | null>(null);
  const [form, setForm] = useState<Omit<MenuItem, "id">>(EMPTY);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    setLoading(true);
    const snap = await getDocs(
      query(collection(db, "menu"), orderBy("sortOrder", "asc"))
    );
    setItems(snap.docs.map((d) => ({ id: d.id, ...d.data() } as MenuItem)));
    setLoading(false);
  }

  function startEdit(item: MenuItem) {
    setEditing(item);
    setForm({
      name: item.name,
      description: item.description,
      price: item.price,
      category: item.category,
      available: item.available,
      sortOrder: item.sortOrder,
    });
  }

  function startNew() {
    setEditing(null);
    setForm({ ...EMPTY, sortOrder: items.length });
  }

  async function handleSave() {
    if (!form.name.trim()) return;
    setSaving(true);
    try {
      if (editing?.id) {
        await updateDoc(doc(db, "menu", editing.id), { ...form });
        toast.success("Item updated");
      } else {
        await addDoc(collection(db, "menu"), { ...form });
        toast.success("Item added");
      }
      setEditing(null);
      setForm(EMPTY);
      await load();
    } catch {
      toast.error("Failed to save");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this item?")) return;
    await deleteDoc(doc(db, "menu", id));
    toast.success("Item deleted");
    await load();
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Form */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h3 className="font-semibold text-gray-900 mb-4">
          {editing ? "Edit item" : "Add new item"}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Name"
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          />
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Category</label>
            <select
              value={form.category}
              onChange={(e) =>
                setForm((f) => ({
                  ...f,
                  category: e.target.value as MenuCategory,
                }))
              }
              className="rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-[#FF385C]"
            >
              {MENU_CATEGORIES.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>
          <Input
            label="Price ($)"
            type="number"
            min={0}
            step={0.01}
            value={form.price}
            onChange={(e) =>
              setForm((f) => ({ ...f, price: parseFloat(e.target.value) || 0 }))
            }
          />
          <Input
            label="Sort order"
            type="number"
            min={0}
            value={form.sortOrder}
            onChange={(e) =>
              setForm((f) => ({
                ...f,
                sortOrder: parseInt(e.target.value) || 0,
              }))
            }
          />
          <div className="sm:col-span-2">
            <Textarea
              label="Description"
              rows={2}
              value={form.description}
              onChange={(e) =>
                setForm((f) => ({ ...f, description: e.target.value }))
              }
            />
          </div>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={form.available}
              onChange={(e) =>
                setForm((f) => ({ ...f, available: e.target.checked }))
              }
              className="accent-[#FF385C] w-4 h-4"
            />
            <span className="text-sm text-gray-700">Available</span>
          </label>
        </div>
        <div className="flex gap-3 mt-4">
          {editing && (
            <Button
              variant="secondary"
              onClick={() => {
                setEditing(null);
                setForm(EMPTY);
              }}
            >
              Cancel
            </Button>
          )}
          <Button loading={saving} onClick={handleSave}>
            {editing ? "Save changes" : "Add item"}
          </Button>
        </div>
      </div>

      {/* List */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-gray-900">
            Menu items ({items.length})
          </h3>
          <button
            onClick={startNew}
            className="flex items-center gap-1.5 text-sm text-[#FF385C] font-medium"
          >
            <Plus size={16} />
            Add
          </button>
        </div>
        {loading ? (
          <Spinner />
        ) : (
          <div className="flex flex-col gap-3">
            {items.map((item) => (
              <div
                key={item.id}
                className={`bg-white rounded-2xl p-4 shadow-sm flex items-center gap-3 ${
                  !item.available ? "opacity-60" : ""
                }`}
              >
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm text-gray-900">
                    {item.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {item.category} · ${item.price.toFixed(2)}{" "}
                    {!item.available && "· unavailable"}
                  </p>
                </div>
                <button
                  onClick={() => startEdit(item)}
                  className="text-gray-400 hover:text-gray-700"
                >
                  <Pencil size={16} />
                </button>
                <button
                  onClick={() => handleDelete(item.id!)}
                  className="text-gray-400 hover:text-red-500"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
