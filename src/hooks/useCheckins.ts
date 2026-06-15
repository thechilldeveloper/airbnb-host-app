"use client";
import { useEffect, useState } from "react";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  where,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Checkin } from "@/types";
import { PROPERTY_ID } from "@/lib/constants";

export function useCheckins() {
  const [checkins, setCheckins] = useState<Checkin[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(
      collection(db, "checkins"),
      where("propertyId", "==", PROPERTY_ID),
      orderBy("createdAt", "desc")
    );
    const unsub = onSnapshot(q, (snap) => {
      setCheckins(snap.docs.map((d) => ({ id: d.id, ...d.data() } as Checkin)));
      setLoading(false);
    });
    return unsub;
  }, []);

  return { checkins, loading };
}
