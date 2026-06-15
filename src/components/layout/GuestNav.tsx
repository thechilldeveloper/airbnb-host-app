"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, ClipboardCheck, UtensilsCrossed, MessageCircle, MapPin } from "lucide-react";

const tabs = [
  { href: "/",         label: "Home",     icon: Home,            exact: true },
  { href: "/checkin",  label: "Check In", icon: ClipboardCheck,  exact: false },
  { href: "/food",     label: "Food",     icon: UtensilsCrossed, exact: false },
  { href: "/messages", label: "Messages", icon: MessageCircle,   exact: false },
  { href: "/nearby",   label: "Nearby",   icon: MapPin,          exact: false },
];

export function GuestNav() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 glass border-t border-[#E0F2FE]/60"
      style={{ background: "rgba(240,253,255,0.92)" }}
    >
      <div className="flex max-w-lg mx-auto">
        {tabs.map(({ href, label, icon: Icon, exact }) => {
          const active = exact ? pathname === href : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={`flex-1 flex flex-col items-center gap-0.5 py-2.5 text-[10px] font-semibold transition-all duration-200 ${
                active ? "text-[#0891B2]" : "text-gray-400 hover:text-gray-600"
              }`}
            >
              {/* Icon with active indicator */}
              <div className="relative">
                {active && (
                  <div
                    className="absolute inset-0 rounded-full scale-150 opacity-15"
                    style={{ background: "#0891B2" }}
                  />
                )}
                <div
                  className={`relative transition-all duration-200 ${active ? "scale-110" : "scale-100"}`}
                >
                  <Icon size={active ? 22 : 20} strokeWidth={active ? 2.5 : 1.8} />
                </div>
              </div>
              {/* Dot indicator */}
              {active && (
                <span
                  className="w-1 h-1 rounded-full"
                  style={{ background: "#0891B2" }}
                />
              )}
              <span className={active ? "text-[#0891B2] font-bold" : ""}>{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
