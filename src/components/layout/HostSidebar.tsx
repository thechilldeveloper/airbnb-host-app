"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  ClipboardCheck,
  ShoppingBag,
  MessageCircle,
  MapPin,
  LogOut,
} from "lucide-react";
import { signOut } from "@/lib/auth";
import toast from "react-hot-toast";

const navItems = [
  { href: "/host/dashboard/checkins",  label: "Check-ins",    icon: ClipboardCheck, emoji: "🏨" },
  { href: "/host/dashboard/orders",    label: "Food Orders",  icon: ShoppingBag,    emoji: "🍹" },
  { href: "/host/dashboard/messages",  label: "Messages",     icon: MessageCircle,  emoji: "💬" },
  { href: "/host/dashboard/nearby",    label: "Nearby",       icon: MapPin,         emoji: "🗺️" },
];

export function HostSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleSignOut() {
    await signOut();
    toast.success("Signed out");
    router.push("/login");
  }

  return (
    <aside
      className="w-56 shrink-0 flex flex-col min-h-screen"
      style={{ background: "linear-gradient(180deg, #0C4A6E 0%, #0E7490 60%, #0891B2 100%)" }}
    >
      {/* Brand */}
      <div className="px-5 py-5 border-b border-white/10">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-white/15 flex items-center justify-center">
            <span className="text-xl">🌴</span>
          </div>
          <div>
            <span className="text-sm font-extrabold text-white leading-tight block">
              Goa Stay
            </span>
            <span className="text-[10px] text-white/50 font-medium tracking-wide uppercase">
              Host Dashboard
            </span>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-5 flex flex-col gap-1">
        {navItems.map(({ href, label, icon: Icon, emoji }) => {
          const active = pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                active
                  ? "bg-white/20 text-white shadow-sm"
                  : "text-white/60 hover:bg-white/10 hover:text-white"
              }`}
            >
              <Icon size={17} strokeWidth={active ? 2.5 : 1.8} />
              <span>{label}</span>
              {active && (
                <span className="ml-auto text-base leading-none">{emoji}</span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-3 pb-5 pt-3 border-t border-white/10 flex flex-col gap-2">
        <Link
          href="/"
          className="flex items-center gap-3 px-3 py-2 rounded-xl text-[11px] font-medium text-white/40 hover:text-white/70 hover:bg-white/5 transition-all"
        >
          <span className="text-sm">🏖️</span>
          View guest site
        </Link>
        <button
          onClick={handleSignOut}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-white/60 hover:bg-white/10 hover:text-white w-full transition-all duration-200"
        >
          <LogOut size={17} />
          Sign out
        </button>
      </div>
    </aside>
  );
}
