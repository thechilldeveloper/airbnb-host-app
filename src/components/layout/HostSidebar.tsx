"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  ClipboardCheck,
  ShoppingBag,
  MessageCircle,
  UtensilsCrossed,
  MapPin,
  LogOut,
} from "lucide-react";
import { signOut } from "@/lib/auth";
import toast from "react-hot-toast";

const navItems = [
  { href: "/host/dashboard", label: "Overview", icon: LayoutDashboard, exact: true },
  { href: "/host/dashboard/checkins", label: "Check-ins", icon: ClipboardCheck },
  { href: "/host/dashboard/orders", label: "Food Orders", icon: ShoppingBag },
  { href: "/host/dashboard/messages", label: "Messages", icon: MessageCircle },
  { href: "/host/dashboard/menu", label: "Menu", icon: UtensilsCrossed },
  { href: "/host/dashboard/nearby", label: "Nearby Places", icon: MapPin },
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
      className="w-60 shrink-0 flex flex-col min-h-screen"
      style={{ background: "linear-gradient(180deg, #0C4A6E 0%, #0E7490 100%)" }}
    >
      {/* Brand */}
      <div className="px-6 py-5 border-b border-white/10">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🌴</span>
          <div>
            <span className="text-base font-extrabold text-white leading-tight block">
              Goa Stay
            </span>
            <span className="text-[10px] text-white/50 font-medium tracking-wide uppercase">
              Host Dashboard
            </span>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 flex flex-col gap-1">
        {navItems.map(({ href, label, icon: Icon, exact }) => {
          const active = exact ? pathname === href : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                active
                  ? "bg-white/15 text-white shadow-sm"
                  : "text-white/65 hover:bg-white/10 hover:text-white"
              }`}
            >
              <Icon size={18} strokeWidth={active ? 2.5 : 1.8} />
              {label}
              {active && <span className="ml-auto w-1.5 h-1.5 bg-[#22D3EE] rounded-full" />}
            </Link>
          );
        })}
      </nav>

      {/* Sign out */}
      <div className="px-3 py-4 border-t border-white/10">
        <button
          onClick={handleSignOut}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-white/60 hover:bg-white/10 hover:text-white w-full transition-all duration-200"
        >
          <LogOut size={18} />
          Sign out
        </button>
      </div>
    </aside>
  );
}
