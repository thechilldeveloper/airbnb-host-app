import { MapPin, Compass, Bell } from "lucide-react";

export default function NearbyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#F0FDFF]">
      {/* Header */}
      <div
        className="px-6 py-5 shadow-sm"
        style={{ background: "linear-gradient(to right, #0C4A6E, #0891B2)" }}
      >
        <h1 className="text-xl font-extrabold text-white">Nearby Places 🏖️</h1>
        <p className="text-[11px] text-white/60 mt-0.5">
          Beaches, eats &amp; more — curated for your guests
        </p>
      </div>

      {/* Coming soon content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 text-center gap-6 py-12">
        <div className="relative">
          <div
            className="w-28 h-28 rounded-full flex items-center justify-center float-1 shadow-xl"
            style={{ background: "linear-gradient(135deg, #0891B2, #0C4A6E)" }}
          >
            <Compass size={52} className="text-white" />
          </div>
          <span className="absolute -top-2 -right-2 text-2xl float-2">🌴</span>
          <span className="absolute -bottom-2 -left-2 text-xl float-3">🌊</span>
        </div>

        <div>
          <h2 className="text-2xl font-extrabold text-[#0C4A6E]">Coming Soon!</h2>
          <p className="text-gray-500 text-sm mt-2 leading-relaxed max-w-xs">
            We&apos;re hand-picking the best beaches, restaurants, cafes, and attractions near your property in Goa.
          </p>
        </div>

        <div className="w-full max-w-sm flex flex-col gap-3">
          {[
            { emoji: "🏖️", label: "Hidden beaches", desc: "Secret spots only locals know" },
            { emoji: "🍽️", label: "Local eats", desc: "Authentic Goan seafood & more" },
            { emoji: "🚤", label: "Activities", desc: "Water sports, sunset cruises" },
          ].map(({ emoji, label, desc }) => (
            <div
              key={label}
              className="flex items-center gap-4 rounded-2xl px-4 py-3.5 border border-[#E0F2FE] text-left"
              style={{ background: "rgba(255,255,255,0.8)" }}
            >
              <span className="text-2xl">{emoji}</span>
              <div>
                <p className="font-bold text-sm text-[#0C4A6E]">{label}</p>
                <p className="text-xs text-gray-500">{desc}</p>
              </div>
              <div className="ml-auto">
                <span className="text-[10px] font-bold bg-[#E0F2FE] text-[#0891B2] px-2 py-1 rounded-full">
                  Soon
                </span>
              </div>
            </div>
          ))}
        </div>

        <div
          className="w-full max-w-sm rounded-2xl px-5 py-5 text-center border border-[#E0F2FE]"
          style={{ background: "linear-gradient(135deg, #F0FDFF, #E0F2FE)" }}
        >
          <Bell size={20} className="text-[#0891B2] mx-auto mb-2" />
          <p className="text-sm font-semibold text-[#0C4A6E]">Under Development</p>
          <p className="text-xs text-gray-500 mt-1">
            You&apos;ll be able to add and manage nearby places for your guests here.
          </p>
          <div className="flex items-center justify-center gap-2 mt-3">
            <MapPin size={12} className="text-[#0891B2]" />
            <span className="text-xs text-[#0891B2] font-medium">Goa, India</span>
          </div>
        </div>
      </div>
    </div>
  );
}
