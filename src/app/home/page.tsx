import Link from "next/link";
import { GuestNav } from "@/components/layout/GuestNav";
import { Wifi, Clock, Phone, MapPin, ClipboardCheck, UtensilsCrossed, MessageCircle } from "lucide-react";
import { HOST_WHATSAPP } from "@/lib/constants";

/* ═══════════════════════════════════════
   SVG BEACH ASSET COMPONENTS
═══════════════════════════════════════ */

/** Animated sun with computed rays */
function SunSVG() {
  const rays = Array.from({ length: 16 }, (_, i) => {
    const angle = (i * 22.5 - 90) * (Math.PI / 180);
    return {
      x1: 80 + 38 * Math.cos(angle),
      y1: 80 + 38 * Math.sin(angle),
      x2: 80 + 74 * Math.cos(angle),
      y2: 80 + 74 * Math.sin(angle),
    };
  });
  return (
    <svg
      viewBox="0 0 160 160"
      width="120"
      height="120"
      className="sun-glow"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="sunCore" cx="38%" cy="38%">
          <stop offset="0%" stopColor="#FFFDE7" />
          <stop offset="45%" stopColor="#FFD740" />
          <stop offset="100%" stopColor="#FF6F00" />
        </radialGradient>
        <radialGradient id="outerGlow" cx="50%" cy="50%">
          <stop offset="0%" stopColor="rgba(255,220,60,0.35)" />
          <stop offset="70%" stopColor="rgba(255,180,0,0.12)" />
          <stop offset="100%" stopColor="rgba(255,180,0,0)" />
        </radialGradient>
      </defs>
      {/* Outer atmospheric halo */}
      <circle cx="80" cy="80" r="78" fill="url(#outerGlow)" />
      {/* Rays */}
      {rays.map((r, i) => (
        <line
          key={i}
          x1={r.x1} y1={r.y1}
          x2={r.x2} y2={r.y2}
          stroke="rgba(255,230,80,0.75)"
          strokeWidth="2.5"
          strokeLinecap="round"
          className="ray-pulse"
          style={{ animationDelay: `${i * 0.15}s` }}
        />
      ))}
      {/* Core circle */}
      <circle cx="80" cy="80" r="32" fill="url(#sunCore)" />
      {/* Specular highlight */}
      <ellipse cx="68" cy="68" rx="10" ry="7" fill="rgba(255,255,230,0.55)" />
    </svg>
  );
}

/** Layered animated ocean wave */
function OceanWave({
  color,
  opacity,
  animClass,
  yPath,
}: {
  color: string;
  opacity: number;
  animClass: string;
  yPath: number;
}) {
  const h = 90;
  const path = `M0,${yPath} C160,${yPath - 28} 320,${yPath + 28} 480,${yPath} C640,${yPath - 28} 800,${yPath + 28} 960,${yPath} C1120,${yPath - 28} 1280,${yPath + 28} 1440,${yPath} L1440,${h} L0,${h} Z`;
  return (
    <div className="absolute left-0 right-0 overflow-hidden" style={{ height: h }}>
      <div className={`h-full flex ${animClass}`} style={{ width: "200%", flexShrink: 0 }}>
        {[0, 1].map((i) => (
          <svg
            key={i}
            viewBox={`0 0 1440 ${h}`}
            preserveAspectRatio="none"
            style={{ width: "50%", height: "100%", display: "block", flexShrink: 0 }}
          >
            <path d={path} fill={color} fillOpacity={opacity} />
          </svg>
        ))}
      </div>
    </div>
  );
}

/** Detailed palm tree SVG */
function PalmTree({ flip = false }: { flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 120 280"
      xmlns="http://www.w3.org/2000/svg"
      style={{ transform: flip ? "scaleX(-1)" : undefined, overflow: "visible" }}
    >
      {/* Trunk */}
      <path
        d="M60,280 C57,255 54,230 56,208 C58,182 52,162 55,140 C58,118 52,97 55,76 C58,58 54,42 57,26"
        stroke="#7A5228"
        strokeWidth="13"
        strokeLinecap="round"
        fill="none"
      />
      {/* Trunk ring texture */}
      {[258, 234, 210, 186, 162, 138, 114, 90, 68, 50].map((y, i) => (
        <path
          key={i}
          d={`M${52 + i % 2},${y} Q${59},${y - 4} ${55},${y - 1}`}
          stroke="#5A3B18"
          strokeWidth="1.8"
          fill="none"
        />
      ))}
      {/* Palm leaves — radiating from crown */}
      <path d="M57,26 C28,24 4,36 2,14 C18,30 40,34 57,26" fill="#167A24" />
      <path d="M57,26 C28,14 12,0 24,-12 C30,6 46,22 57,26" fill="#1E9430" />
      <path d="M57,26 C44,4 44,-14 54,-16 C52,4 53,20 57,26" fill="#28A835" />
      <path d="M57,26 C70,4 72,-14 62,-16 C60,4 61,20 57,26" fill="#1E9430" />
      <path d="M57,26 C82,14 96,0 84,-12 C78,6 62,22 57,26" fill="#167A24" />
      <path d="M57,26 C86,24 110,36 112,14 C96,30 74,34 57,26" fill="#167A24" />
      {/* Leaf vein lines */}
      <path d="M57,26 C38,24 20,32 10,22" stroke="#0F5A18" strokeWidth="0.8" fill="none" />
      <path d="M57,26 C80,14 96,4 92,-8" stroke="#0F5A18" strokeWidth="0.8" fill="none" />
      {/* Coconuts */}
      <circle cx="50" cy="33" r="8" fill="#9A7828" />
      <circle cx="63" cy="30" r="8" fill="#876620" />
      <circle cx="57" cy="40" r="7" fill="#9A7828" />
      {/* Coconut shine */}
      <circle cx="48" cy="30" r="3" fill="rgba(255,220,140,0.4)" />
      <circle cx="62" cy="27" r="3" fill="rgba(255,220,140,0.4)" />
    </svg>
  );
}

/** Seagull bird SVG — classic M-shape */
function Seagull({ birdClass, top, scale = 1 }: { birdClass: string; top: string; scale?: number }) {
  return (
    <div
      className={`absolute pointer-events-none ${birdClass}`}
      style={{ top, left: 0, transform: `scale(${scale})`, transformOrigin: "left center" }}
    >
      <svg viewBox="0 0 56 28" width="56" height="28" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M0,14 Q14,3 28,14 Q42,3 56,14"
          stroke="rgba(255,255,255,0.92)"
          strokeWidth="2.2"
          fill="none"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

/** Starfish SVG */
function StarfishSVG({ size = 30, style }: { size?: number; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 50 50" width={size} height={size} style={style} xmlns="http://www.w3.org/2000/svg">
      <path
        d="M25,5 L28,19 L42,14 L32,25 L42,36 L28,31 L25,45 L22,31 L8,36 L18,25 L8,14 L22,19 Z"
        fill="#FF6040"
        opacity="0.9"
      />
      <path
        d="M25,10 L27,20 L37,17 L30,25 L37,33 L27,30 L25,40 L23,30 L13,33 L20,25 L13,17 L23,20 Z"
        fill="#FF8260"
        opacity="0.5"
      />
      {/* Texture dots */}
      {[[25, 20], [20, 25], [30, 25], [25, 30], [22, 22], [28, 22], [22, 28], [28, 28]].map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="1.5" fill="rgba(180,60,20,0.4)" />
      ))}
    </svg>
  );
}

/** Spiral shell SVG */
function ShellSVG({ size = 30, style }: { size?: number; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 50 44" width={size} height={size} style={style} xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="25" cy="28" rx="21" ry="14" fill="#E8C49C" />
      <ellipse cx="25" cy="28" rx="21" ry="14" fill="url(#shellGrad)" />
      <defs>
        <linearGradient id="shellGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#F0D0A8" />
          <stop offset="100%" stopColor="#C4926A" />
        </linearGradient>
      </defs>
      <path d="M25,14 C15,17 6,22 6,28 C6,34 15,39 25,42" stroke="#C4926A" strokeWidth="1.2" fill="none" />
      <path d="M25,14 C35,17 44,22 44,28 C44,34 35,39 25,42" stroke="#C4926A" strokeWidth="1.2" fill="none" />
      <path d="M9,20 Q25,17 41,20" stroke="#C4926A" strokeWidth="0.8" fill="none" />
      <path d="M6,28 Q25,25 44,28" stroke="#C4926A" strokeWidth="0.8" fill="none" />
      <path d="M9,36 Q25,33 41,36" stroke="#C4926A" strokeWidth="0.8" fill="none" />
    </svg>
  );
}

/** Small crab SVG */
function CrabSVG({ style }: { style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 50 36" width="32" height="24" style={style} xmlns="http://www.w3.org/2000/svg">
      {/* Body */}
      <ellipse cx="25" cy="20" rx="10" ry="8" fill="#E05A2B" />
      {/* Claws */}
      <path d="M15,18 C8,14 4,10 6,6 C8,10 12,14 15,18" fill="#C04A20" />
      <path d="M35,18 C42,14 46,10 44,6 C42,10 38,14 35,18" fill="#C04A20" />
      {/* Left legs */}
      <path d="M15,20 L6,16" stroke="#C04A20" strokeWidth="2" strokeLinecap="round" />
      <path d="M15,22 L5,21" stroke="#C04A20" strokeWidth="2" strokeLinecap="round" />
      <path d="M15,24 L7,28" stroke="#C04A20" strokeWidth="2" strokeLinecap="round" />
      {/* Right legs */}
      <path d="M35,20 L44,16" stroke="#C04A20" strokeWidth="2" strokeLinecap="round" />
      <path d="M35,22 L45,21" stroke="#C04A20" strokeWidth="2" strokeLinecap="round" />
      <path d="M35,24 L43,28" stroke="#C04A20" strokeWidth="2" strokeLinecap="round" />
      {/* Eyes */}
      <circle cx="20" cy="15" r="2.5" fill="white" />
      <circle cx="30" cy="15" r="2.5" fill="white" />
      <circle cx="20" cy="15" r="1.2" fill="#1A1A1A" />
      <circle cx="30" cy="15" r="1.2" fill="#1A1A1A" />
    </svg>
  );
}

/* ═══════════════════════════════════════
   FEATURE CARDS DATA
═══════════════════════════════════════ */
const features = [
  {
    icon: ClipboardCheck,
    title: "Easy check-in",
    desc: "Complete in minutes — no paperwork.",
    href: "/checkin",
    bg: "bg-emerald-50",
    text: "text-emerald-600",
    emoji: "📋",
  },
  {
    icon: UtensilsCrossed,
    title: "Food & drinks",
    desc: "Order from our curated Goa menu.",
    href: "/food",
    bg: "bg-orange-50",
    text: "text-orange-500",
    emoji: "🍹",
  },
  {
    icon: MessageCircle,
    title: "Message host",
    desc: "Got a question? We reply fast.",
    href: "/messages",
    bg: "bg-sky-50",
    text: "text-sky-600",
    emoji: "💬",
  },
  {
    icon: MapPin,
    title: "Nearby places",
    desc: "Beaches & attractions nearby.",
    href: "/nearby",
    bg: "bg-violet-50",
    text: "text-violet-600",
    emoji: "🗺️",
  },
];

/* ═══════════════════════════════════════
   MAIN PAGE
═══════════════════════════════════════ */
export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#F0FDFF] pb-28 overflow-x-hidden">

      {/* ════════════════════════════════
          BEACH HERO SCENE
      ════════════════════════════════ */}
      <div
        className="relative overflow-hidden"
        style={{ height: "clamp(500px, 100svh, 720px)" }}
      >

        {/* ── Sky gradient ── */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, #090F1E 0%, #0D1F3C 10%, #10316B 22%, #1456A0 38%, #2076C4 54%, #4CA8DB 70%, #87CEEB 82%, #C3E8F5 92%, #DFF2FB 100%)",
          }}
        />

        {/* ── Stars (top 30%) ── */}
        {[
          [8,5],[22,9],[38,3],[55,7],[70,4],[85,8],[92,3],[14,14],[46,12],[62,16],
          [78,11],[30,18],[96,14],[5,20],[48,20],[67,2],[83,17],[19,6],[74,19],[42,15],
        ].map(([left, top], i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: `${1 + (i % 3)}px`,
              height: `${1 + (i % 3)}px`,
              left: `${left}%`,
              top: `${top}%`,
              animation: `twinkle ${1.5 + (i % 7) * 0.4}s ease-in-out ${i * 0.25}s infinite`,
            }}
          />
        ))}

        {/* ── Animated Sun ── */}
        <div
          className="absolute"
          style={{ top: "6%", left: "50%", transform: "translateX(-50%)" }}
        >
          <SunSVG />
        </div>

        {/* ── Seagulls ── */}
        <Seagull birdClass="bird-1" top="24%" scale={1.1} />
        <Seagull birdClass="bird-2" top="18%" scale={0.75} />
        <Seagull birdClass="bird-3" top="30%" scale={1.3} />
        <Seagull birdClass="bird-4" top="21%" scale={0.6} />

        {/* ── Hero Text (centered over scene) ── */}
        <div
          className="absolute left-0 right-0 flex flex-col items-center text-center text-white px-6"
          style={{ top: "30%", transform: "translateY(-10%)" }}
        >
          <p
            className="text-[10px] font-black tracking-[0.35em] uppercase mb-4"
            style={{ color: "rgba(180,220,255,0.75)" }}
          >
            ✦ &nbsp;Goa, India&nbsp; ✦
          </p>
          <h1
            className="font-black leading-none tracking-tight"
            style={{ fontSize: "clamp(2.4rem, 9vw, 3.8rem)" }}
          >
            Welcome to
            <br />
            <span className="gradient-text">Paradise</span>
          </h1>
          <p
            className="mt-4 mb-8 leading-relaxed"
            style={{
              fontSize: "clamp(0.8rem, 3vw, 0.9rem)",
              color: "rgba(210,240,255,0.8)",
              maxWidth: 280,
            }}
          >
            Sun, sand &amp; seamless stays — your complete Goa guest experience
          </p>
          <Link
            href="/checkin"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "rgba(255,255,255,0.92)",
              backdropFilter: "blur(10px)",
              color: "#0891B2",
              fontWeight: 800,
              fontSize: "0.9rem",
              borderRadius: "18px",
              padding: "14px 32px",
              boxShadow: "0 8px 32px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.25)",
              transition: "all 0.2s",
            }}
          >
            🏄 Begin Check-in
          </Link>
        </div>

        {/* ── Ocean body ── */}
        <div
          className="absolute left-0 right-0"
          style={{
            bottom: "23%",
            top: "56%",
            background:
              "linear-gradient(180deg, #1060B0 0%, #0D47A1 25%, #0277BD 60%, #01579B 100%)",
          }}
        >
          {/* Horizontal shimmer lines (sunlight on water) */}
          {[12, 28, 44, 62, 78].map((t, i) => (
            <div
              key={i}
              className="absolute left-0 right-0"
              style={{
                top: `${t}%`,
                height: "1px",
                background: "rgba(180,230,255,0.18)",
                animation: `foam-pulse ${2 + i * 0.4}s ease-in-out ${i * 0.6}s infinite`,
              }}
            />
          ))}
        </div>

        {/* ── Wave layer 1 (back / deepest, slowest) ── */}
        <div className="absolute left-0 right-0 overflow-hidden" style={{ bottom: "35%", height: 90 }}>
          <OceanWave color="#1565C0" opacity={0.55} yPath={50} animClass="wave-slow" />
        </div>

        {/* ── Wave layer 2 (mid) ── */}
        <div className="absolute left-0 right-0 overflow-hidden" style={{ bottom: "28%", height: 90 }}>
          <OceanWave color="#0891B2" opacity={0.65} yPath={45} animClass="wave-mid" />
        </div>

        {/* ── Wave layer 3 (front / lightest, fastest) ── */}
        <div className="absolute left-0 right-0 overflow-hidden" style={{ bottom: "22%", height: 90 }}>
          <OceanWave color="#38BDF8" opacity={0.45} yPath={42} animClass="wave-fast" />
        </div>

        {/* ── Sand ── */}
        <div
          className="absolute left-0 right-0 bottom-0"
          style={{
            height: "23%",
            background:
              "linear-gradient(180deg, #B8804A 0%, #CFA060 15%, #DEBC78 35%, #EDD090 55%, #F4E0A8 75%, #FAF0C8 100%)",
            zIndex: 4,
          }}
        >
          {/* Wet sand strip at top */}
          <div
            className="absolute top-0 left-0 right-0"
            style={{
              height: "22%",
              background:
                "linear-gradient(180deg, rgba(100,170,210,0.38) 0%, rgba(140,190,220,0.15) 60%, transparent 100%)",
            }}
          />
          {/* Foam blobs at shoreline */}
          {[2, 18, 35, 52, 68, 82, 95].map((left, i) => (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                top: "-6px",
                left: `${left}%`,
                width: `${20 + (i % 4) * 18}px`,
                height: "10px",
                background: "rgba(255,255,255,0.75)",
                filter: "blur(3px)",
                animation: `foam-pulse ${1.4 + i * 0.3}s ease-in-out ${i * 0.18}s infinite`,
              }}
            />
          ))}
          {/* Sand ripple lines */}
          {[18, 34, 50, 66, 82].map((top, i) => (
            <div
              key={i}
              className="absolute left-0 right-0"
              style={{
                top: `${top}%`,
                height: "1px",
                background: "rgba(160,110,40,0.18)",
              }}
            />
          ))}
        </div>

        {/* ── Palm tree LEFT (main) ── */}
        <div
          className="absolute sway"
          style={{ bottom: "21%", left: "-8px", width: 110, height: 260, zIndex: 5 }}
        >
          <PalmTree />
        </div>

        {/* ── Palm tree RIGHT (partially off-screen, smaller) ── */}
        <div
          className="absolute sway-slow"
          style={{
            bottom: "21%",
            right: "-22px",
            width: 90,
            height: 210,
            zIndex: 5,
            opacity: 0.85,
          }}
        >
          <PalmTree flip />
        </div>

        {/* ── Beach decorations on sand ── */}
        {/* Starfish */}
        <div className="absolute float-3" style={{ bottom: "5%", left: "28%", zIndex: 6 }}>
          <StarfishSVG size={28} />
        </div>
        <div className="absolute float-1" style={{ bottom: "9%", right: "28%", zIndex: 6 }}>
          <StarfishSVG size={22} />
        </div>
        {/* Shells */}
        <div className="absolute float-2" style={{ bottom: "6%", left: "48%", zIndex: 6 }}>
          <ShellSVG size={28} />
        </div>
        <div className="absolute float-3" style={{ bottom: "8%", right: "42%", zIndex: 6 }}>
          <ShellSVG size={22} />
        </div>
        {/* Crab */}
        <div className="absolute float-1" style={{ bottom: "4%", left: "62%", zIndex: 6 }}>
          <CrabSVG />
        </div>

        {/* ── Water bubbles ── */}
        {[8, 20, 33, 47, 60, 74, 88].map((left, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${3 + (i % 4) * 2}px`,
              height: `${3 + (i % 4) * 2}px`,
              left: `${left}%`,
              bottom: `${26 + (i % 4) * 3}%`,
              background: "rgba(255,255,255,0.45)",
              border: "1px solid rgba(255,255,255,0.6)",
              animation: `bubble-rise ${1.8 + i * 0.45}s ease-out ${i * 0.6}s infinite`,
              zIndex: 3,
            }}
          />
        ))}
      </div>

      {/* ════════════════════════════════
          SCROLLABLE CONTENT
      ════════════════════════════════ */}
      <div className="max-w-lg mx-auto px-4 py-5 flex flex-col gap-4">

        {/* Property Info */}
        <div className="beach-card p-5 flex flex-col gap-3 slide-up" style={{ animationDelay: "0.05s" }}>
          <div className="flex items-center justify-between mb-1">
            <div>
              <h2 className="font-extrabold text-[#0C4A6E] text-base">Property Info</h2>
              <p className="text-xs text-gray-400 mt-0.5">Your Goa stay details</p>
            </div>
            <span className="text-2xl">🏡</span>
          </div>

          <div className="grid grid-cols-1 gap-2.5">
            {[
              { icon: Wifi, text: "Wi-Fi password available from your host" },
              { icon: Clock, text: "Check-in: 3:00 PM  ·  Check-out: 11:00 AM" },
              { icon: MapPin, text: "Calangute Beach Area, North Goa" },
              { icon: Phone, text: `Host WhatsApp: ${HOST_WHATSAPP}` },
            ].map(({ icon: Icon, text }, i) => (
              <div key={i} className="flex items-center gap-3 text-sm text-gray-600">
                <div className="w-8 h-8 rounded-xl bg-[#E0F2FE] flex items-center justify-center shrink-0">
                  <Icon size={14} className="text-[#0891B2]" />
                </div>
                <span className="leading-snug">{text}</span>
              </div>
            ))}
          </div>

          {/* House rules pill */}
          <div
            className="rounded-xl px-3 py-2.5 mt-1 flex items-start gap-2 text-xs text-amber-800"
            style={{ background: "linear-gradient(135deg, #FEF9C3, #FDE68A)" }}
          >
            <span className="text-base shrink-0">📋</span>
            <span className="leading-snug">
              No smoking indoors · Quiet hours after 10 PM · Pets not allowed · Max 6 guests
            </span>
          </div>
        </div>

        {/* Feature grid */}
        <div className="grid grid-cols-2 gap-3">
          {features.map(({ icon: Icon, title, desc, href, bg, text, emoji }, i) => (
            <Link
              key={href}
              href={href}
              className="beach-card p-4 flex flex-col gap-3 slide-up"
              style={{ animationDelay: `${0.1 + i * 0.07}s` }}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${bg}`}>
                <Icon size={20} className={text} />
              </div>
              <div>
                <p className="font-bold text-sm text-[#0C4A6E] flex items-center gap-1.5">
                  {title} <span>{emoji}</span>
                </p>
                <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{desc}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* Goa vibe strip */}
        <div
          className="rounded-2xl px-5 py-4 text-center slide-up"
          style={{
            background: "linear-gradient(135deg, #0C4A6E 0%, #0891B2 50%, #22D3EE 100%)",
            animationDelay: "0.4s",
          }}
        >
          <p className="text-sm font-extrabold text-white tracking-wide">
            🌊 &nbsp;Enjoy your Goa stay!&nbsp; 🌴
          </p>
          <p className="text-xs text-white/70 mt-1">
            Need anything? Message your host 24/7
          </p>
        </div>
      </div>

      <GuestNav />
    </div>
  );
}
