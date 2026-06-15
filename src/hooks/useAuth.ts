"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { User } from "firebase/auth";
import { onAuthChange } from "@/lib/auth";

export function useAuth(redirectIfUnauthenticated = false) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsub = onAuthChange((u) => {
      setUser(u);
      setLoading(false);
      if (!u && redirectIfUnauthenticated) {
        router.push("/login");
      }
    });
    return unsub;
  }, [redirectIfUnauthenticated, router]);

  return { user, loading };
}
