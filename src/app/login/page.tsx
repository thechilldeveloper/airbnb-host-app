"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "@/lib/auth";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import toast from "react-hot-toast";

type Role = "guest" | "host";

export default function LoginPage() {
  const [role, setRole] = useState<Role | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (!role) return;
    setLoading(true);
    try {
      if (role === "guest") {
        if (!name.trim()) {
          toast.error("Please enter your name");
          setLoading(false);
          return;
        }
        localStorage.setItem("guestName", name.trim());
        toast.success(`Welcome, ${name.trim()}! 🌴`);
        router.push("/");
      } else {
        await signIn(email, password);
        router.push("/host/dashboard");
      }
    } catch {
      toast.error(
        role === "host" ? "Invalid email or password" : "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#F0FDFF] flex flex-col">
      {/* Ocean hero */}
      <div className="relative bg-gradient-to-br from-[#0C4A6E] via-[#0891B2] to-[#22D3EE] px-6 pt-14 pb-16 text-white overflow-hidden">
        <div className="absolute -top-16 -right-16 w-56 h-56 bg-white/5 rounded-full pointer-events-none" />
        <span className="absolute top-8 right-8 text-4xl float-1 select-none pointer-events-none opacity-80">🌴</span>
        <span className="absolute top-20 right-20 text-2xl float-2 select-none pointer-events-none opacity-60">☀️</span>
        <p className="relative text-[11px] font-bold tracking-widest uppercase opacity-70 mb-2">
          🌊 Goa Stay
        </p>
        <h1 className="relative text-3xl font-extrabold">Welcome back!</h1>
        <p className="relative text-sm opacity-75 mt-1">Sign in to continue your paradise experience</p>
        <div className="absolute bottom-0 left-0 right-0 leading-none pointer-events-none">
          <svg viewBox="0 0 1200 48" preserveAspectRatio="none" className="w-full block h-12">
            <path d="M0,24 C300,48 600,0 900,24 C1050,36 1150,12 1200,24 L1200,48 L0,48 Z" fill="#F0FDFF" />
          </svg>
        </div>
      </div>

      <div className="flex-1 max-w-sm mx-auto w-full px-4 -mt-2 py-6 flex flex-col gap-6">
        {/* Role selector */}
        <div className="slide-up">
          <p className="text-sm font-bold text-[#0C4A6E] mb-3">I am a…</p>
          <div className="grid grid-cols-2 gap-3">
            {(
              [
                { value: "guest", label: "Guest", emoji: "🏖️", desc: "I'm staying here" },
                { value: "host", label: "Host", emoji: "🏠", desc: "I manage this property" },
              ] as const
            ).map(({ value, label, emoji, desc }) => (
              <button
                key={value}
                onClick={() => setRole(value)}
                className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all duration-200 active:scale-95 ${
                  role === value
                    ? "border-[#0891B2] bg-[#E0F2FE] shadow-md"
                    : "border-gray-200 bg-white hover:border-[#0891B2]/40"
                }`}
              >
                <span className="text-3xl">{emoji}</span>
                <span className="font-bold text-sm text-[#0C4A6E]">{label}</span>
                <span className="text-xs text-gray-500 text-center">{desc}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Form */}
        {role && (
          <form onSubmit={handleLogin} className="flex flex-col gap-4 slide-up">
            <div
              className="rounded-2xl p-5 flex flex-col gap-4 border border-[#E0F2FE]"
              style={{ background: "white" }}
            >
              {role === "guest" ? (
                <Input
                  label="Your name"
                  placeholder="e.g. Rahul Sharma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              ) : (
                <>
                  <Input
                    label="Email"
                    type="email"
                    placeholder="host@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <Input
                    label="Password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </>
              )}
            </div>
            <Button type="submit" loading={loading} fullWidth>
              {role === "guest" ? "Enter as Guest 🏄" : "Sign in as Host 🏠"}
            </Button>
          </form>
        )}

        <p className="text-center text-sm text-gray-500">
          New here?{" "}
          <Link href="/signup" className="text-[#0891B2] font-bold hover:underline">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}
