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
        router.push("/home");
      } else {
        await signIn(email, password);
        toast.success("Welcome back! 🏠");
        router.push("/host/dashboard/checkins");
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
      {/* Hero */}
      <div className="relative bg-gradient-to-br from-[#0C4A6E] via-[#0891B2] to-[#22D3EE] px-6 pt-14 pb-20 text-white overflow-hidden">
        <div className="absolute -top-20 -right-20 w-72 h-72 bg-white/5 rounded-full pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-white/5 rounded-full pointer-events-none" />
        <span className="absolute top-8 right-8 text-4xl float-1 select-none pointer-events-none opacity-80">🌴</span>
        <span className="absolute top-20 right-20 text-2xl float-2 select-none pointer-events-none opacity-50">🌊</span>
        <span className="absolute bottom-16 left-6 text-3xl float-3 select-none pointer-events-none opacity-40">🐚</span>
        <div className="relative">
          <p className="text-[11px] font-bold tracking-widest uppercase opacity-60 mb-3">
            🌊 Goa Stay
          </p>
          <h1 className="text-4xl font-extrabold leading-tight">
            Welcome<br />back!
          </h1>
          <p className="text-sm opacity-70 mt-2">Sign in to continue your paradise experience</p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 leading-none pointer-events-none">
          <svg viewBox="0 0 1200 56" preserveAspectRatio="none" className="w-full block h-14">
            <path d="M0,28 C200,56 400,0 600,28 C800,56 1000,0 1200,28 L1200,56 L0,56 Z" fill="#F0FDFF" />
          </svg>
        </div>
      </div>

      <div className="flex-1 max-w-sm mx-auto w-full px-4 py-8 flex flex-col gap-6">
        {/* Role selector */}
        <div className="slide-up">
          <p className="text-xs font-bold text-[#0C4A6E] uppercase tracking-wider mb-4">
            Who are you?
          </p>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setRole("guest")}
              className={`relative flex flex-col items-center gap-3 p-5 rounded-2xl border-2 transition-all duration-200 active:scale-95 text-left overflow-hidden ${
                role === "guest"
                  ? "border-[#0891B2] shadow-lg shadow-[#0891B2]/20"
                  : "border-gray-200 bg-white hover:border-[#0891B2]/40"
              }`}
              style={role === "guest" ? { background: "linear-gradient(135deg, #E0F2FE, #F0FDFF)" } : { background: "white" }}
            >
              {role === "guest" && (
                <div className="absolute top-2 right-2 w-2 h-2 bg-[#0891B2] rounded-full" />
              )}
              <span className="text-4xl">🏖️</span>
              <div className="text-center">
                <p className="font-extrabold text-sm text-[#0C4A6E]">Guest</p>
                <p className="text-[11px] text-gray-400 mt-0.5 leading-tight">I&apos;m visiting Goa</p>
              </div>
            </button>

            <button
              onClick={() => setRole("host")}
              className={`relative flex flex-col items-center gap-3 p-5 rounded-2xl border-2 transition-all duration-200 active:scale-95 text-left overflow-hidden ${
                role === "host"
                  ? "border-[#0C4A6E] shadow-lg shadow-[#0C4A6E]/20"
                  : "border-gray-200 bg-white hover:border-[#0C4A6E]/40"
              }`}
              style={role === "host" ? { background: "linear-gradient(135deg, #0C4A6E, #0891B2)" } : { background: "white" }}
            >
              {role === "host" && (
                <div className="absolute top-2 right-2 w-2 h-2 bg-white rounded-full" />
              )}
              <span className="text-4xl">🏠</span>
              <div className="text-center">
                <p className={`font-extrabold text-sm ${role === "host" ? "text-white" : "text-[#0C4A6E]"}`}>
                  Host
                </p>
                <p className={`text-[11px] mt-0.5 leading-tight ${role === "host" ? "text-white/60" : "text-gray-400"}`}>
                  I manage this property
                </p>
              </div>
            </button>
          </div>
        </div>

        {/* Form */}
        {role && (
          <form onSubmit={handleLogin} className="flex flex-col gap-4 slide-up">
            {role === "guest" ? (
              <div className="rounded-2xl p-5 flex flex-col gap-4 border border-[#E0F2FE] bg-white shadow-sm">
                <div className="flex items-center gap-3 pb-3 border-b border-[#F0FDFF]">
                  <div className="w-10 h-10 rounded-xl bg-[#E0F2FE] flex items-center justify-center">
                    <span className="text-xl">🏖️</span>
                  </div>
                  <div>
                    <p className="font-bold text-sm text-[#0C4A6E]">Guest Sign In</p>
                    <p className="text-xs text-gray-400">No account needed!</p>
                  </div>
                </div>
                <Input
                  label="Your name"
                  placeholder="e.g. Rahul Sharma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            ) : (
              <div className="rounded-2xl p-5 flex flex-col gap-4 border border-[#0C4A6E]/20 bg-white shadow-sm">
                <div className="flex items-center gap-3 pb-3 border-b border-gray-100">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: "linear-gradient(135deg, #0C4A6E, #0891B2)" }}>
                    <span className="text-xl">🏠</span>
                  </div>
                  <div>
                    <p className="font-bold text-sm text-[#0C4A6E]">Host Sign In</p>
                    <p className="text-xs text-gray-400">Access your dashboard</p>
                  </div>
                </div>
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
              </div>
            )}

            <Button
              type="submit"
              loading={loading}
              fullWidth
              style={role === "host" ? {
                background: "linear-gradient(135deg, #0C4A6E, #0891B2)",
                color: "white",
                border: "none",
              } : undefined}
            >
              {role === "guest" ? "Enter as Guest 🏄" : "Sign in as Host 🔑"}
            </Button>
          </form>
        )}

        {!role && (
          <div className="text-center py-6 text-gray-400 text-sm">
            <span className="text-2xl block mb-2">👆</span>
            Select your role to continue
          </div>
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
