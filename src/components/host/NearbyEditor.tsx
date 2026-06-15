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
  where,
  orderBy,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { NearbyPlace, PlaceCategory } from "@/types";
import { PROPERTY_ID, PLACE_CATEGORIES } from "@/lib/constants";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { Spinner } from "@/components/ui/Spinner";
import { Pencil, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

const EMPTY: Omit<NearbyPlace, "id"> = {
  name: "",
  category: "restaurant",
  description: "",
  distance: "",
  address: "",
  phone: "",
  openingHours: "",
  sortOrder: 0,
  propertyId: PROPERTY_ID,
};

export function NearbyEditor() {
  const [places, setPlaces] = useState<NearbyPlace[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<NearbyPlace | null>(null);
  const [form, setForm] = useState<Omit<NearbyPlace, "id">>(EMPTY);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    setLoading(true);
    const snap = await getDocs(
      query(
        collection(db, "nearby"),
        where("propertyId", "==", PROPERTY_ID),
        orderBy("sortOrder", "asc")
      )
    );
    setPlaces(snap.docs.map((d) => ({ id: d.id, ...d.data() } as NearbyPlace)));
    setLoading(false);
  }

  function startEdit(place: NearbyPlace) {
    setEditing(place);
    setForm({
      name: place.name,
      category: place.category,
      description: place.description,
      distance: place.distance,
      address: place.address ?? "",
      phone: place.phone ?? "",
      openingHours: place.openingHours ?? "",
      sortOrder: place.sortOrder,
      propertyId: PROPERTY_ID,
    });
  }

  async function handleSave() {
    if (!form.name.trim()) return;
    setSaving(true);
    try {
      if (editing?.id) {
        await updateDoc(doc(db, "nearby", editing.id), { ...form });
        toast.success("Place updated");
      } else {
        await addDoc(collection(db, "nearby"), { ...form });
        toast.success("Place added");
      }
      setEditing(null);
      setForm({ ...EMPTY, sortOrder: places.length });
      await load();
    } catch {
      toast.error("Failed to save");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this place?")) return;
    await deleteDoc(doc(db, "nearby", id));
    toast.success("Place deleted");
    await load();
  }

  const setField = <K extends keyof typeof form>(k: K, v: (typeof form)[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  return (
    <div className="flex flex-col gap-6">
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h3 className="font-semibold text-gray-900 mb-4">
          {editing ? "Edit place" : "Add new place"}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Name"
            value={form.name}
            onChange={(e) => setField("name", e.target.value)}
          />
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Category</label>
            <select
              value={form.category}
              onChange={(e) => setField("category", e.target.value as PlaceCategory)}
              className="rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-[#FF385C]"
            >
              {PLACE_CATEGORIES.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.icon} {c.label}
                </option>
              ))}
            </select>
          </div>
          <Input
            label="Distance (e.g. 200m)"
            value={form.distance}
            onChange={(e) => setField("distance", e.target.value)}
          />
          <Input
            label="Phone (optional)"
            value={form.phone}
            onChange={(e) => setField("phone", e.target.value)}
          />
          <Input
            label="Opening hours (optional)"
            placeholder="Mon–Sat 9am–10pm"
            value={form.openingHours}
            onChange={(e) => setField("openingHours", e.target.value)}
          />
          <Input
            label="Sort order"
            type="number"
            min={0}
            value={form.sortOrder}
            onChange={(e) => setField("sortOrder", parseInt(e.target.value) || 0)}
          />
          <div className="sm:col-span-2">
            <Textarea
              label="Description"
              rows={2}
              placeholder="Short description for guests"
              value={form.description}
              onChange={(e) => setField("description", e.target.value)}
            />
          </div>
        </div>
        <div className="flex gap-3 mt-4">
          {editing && (
            <Button
              variant="secondary"
              onClick={() => {
                setEditing(null);
                setForm({ ...EMPTY, sortOrder: places.length });
              }}
            >
              Cancel
            </Button>
          )}
          <Button loading={saving} onClick={handleSave}>
            {editing ? "Save changes" : "Add place"}
          </Button>
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-gray-900 mb-3">
          Places ({places.length})
        </h3>
        {loading ? (
          <Spinner />
        ) : (
          <div className="flex flex-col gap-3">
            {places.map((place) => (
              <div
                key={place.id}
                className="bg-white rounded-2xl p-4 shadow-sm flex items-center gap-3"
              >
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm text-gray-900">
                    {place.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {place.category} · {place.distance}
                  </p>
                </div>
                <button
                  onClick={() => startEdit(place)}
                  className="text-gray-400 hover:text-gray-700"
                >
                  <Pencil size={16} />
                </button>
                <button
                  onClick={() => handleDelete(place.id!)}
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
