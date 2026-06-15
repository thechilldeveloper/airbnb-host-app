import Link from "next/link";

function SunSVG() {
  const rays = Array.from({ length: 16 }, (_, i) => {
    const angle = (i * 22.5 - 90) * (Math.PI / 180);
    return {
      x1: 80 + 38 * Math.cos(angle), y1: 80 + 38 * Math.sin(angle),
      x2: 80 + 74 * Math.cos(angle), y2: 80 + 74 * Math.sin(angle),
    };
  });
  return (
    <svg viewBox="0 0 160 160" width="110" height="110" className="sun-glow" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="sunCore" cx="38%" cy="38%">
          <stop offset="0%" stopColor="#FFFDE7" />
          <stop offset="45%" stopColor="#FFD740" />
          <stop offset="100%" stopColor="#FF6F00" />
        </radialGradient>
        <radialGradient id="outerGlow" cx="50%" cy="50%">
          <stop offset="0%" stopColor="rgba(255,220,60,0.3)" />
          <stop offset="100%" stopColor="rgba(255,180,0,0)" />
        </radialGradient>
      </defs>
      <circle cx="80" cy="80" r="78" fill="url(#outerGlow)" />
      {rays.map((r, i) => (
        <line key={i} x1={r.x1} y1={r.y1} x2={r.x2} y2={r.y2}
          stroke="rgba(255,230,80,0.75)" strokeWidth="2.5" strokeLinecap="round"
          className="ray-pulse" style={{ animationDelay: `${i * 0.15}s` }} />
      ))}
      <circle cx="80" cy="80" r="32" fill="url(#sunCore)" />
      <ellipse cx="68" cy="68" rx="10" ry="7" fill="rgba(255,255,230,0.55)" />
    </svg>
  );
}

function OceanWave({ color, opacity, animClass, yPath }: {
  color: string; opacity: number; animClass: string; yPath: number;
}) {
  const h = 90;
  const path = `M0,${yPath} C160,${yPath - 28} 320,${yPath + 28} 480,${yPath} C640,${yPath - 28} 800,${yPath + 28} 960,${yPath} C1120,${yPath - 28} 1280,${yPath + 28} 1440,${yPath} L1440,${h} L0,${h} Z`;
  return (
    <div className="absolute left-0 right-0 overflow-hidden" style={{ height: h }}>
      <div className={`h-full flex ${animClass}`} style={{ width: "200%", flexShrink: 0 }}>
        {[0, 1].map((i) => (
          <svg key={i} viewBox={`0 0 1440 ${h}`} preserveAspectRatio="none"
            style={{ width: "50%", height: "100%", display: "block", flexShrink: 0 }}>
            <path d={path} fill={color} fillOpacity={opacity} />
          </svg>
        ))}
      </div>
    </div>
  );
}

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #090F1E 0%, #0D1F3C 15%, #10316B 28%, #1456A0 45%, #2076C4 60%, #4CA8DB 76%, #87CEEB 87%, #C3E8F5 94%, #DFF2FB 100%)",
      }}>

      {/* Stars */}
      {[
        [8,5],[22,9],[38,3],[55,7],[70,4],[85,8],[92,3],[14,14],
        [46,12],[62,16],[78,11],[30,18],[96,14],[5,20],[48,20],[67,2],[83,17],
      ].map(([left, top], i) => (
        <div key={i} className="absolute rounded-full bg-white" style={{
          width: `${1 + (i % 3)}px`, height: `${1 + (i % 3)}px`,
          left: `${left}%`, top: `${top}%`,
          animation: `twinkle ${1.5 + (i % 7) * 0.4}s ease-in-out ${i * 0.25}s infinite`,
        }} />
      ))}

      {/* Seagulls */}
      {[
        { cls: "bird-1", top: "22%", scale: 1.0 },
        { cls: "bird-2", top: "17%", scale: 0.7 },
        { cls: "bird-3", top: "27%", scale: 1.2 },
      ].map(({ cls, top, scale }) => (
        <div key={cls} className={`absolute pointer-events-none ${cls}`}
          style={{ top, left: 0, transform: `scale(${scale})`, transformOrigin: "left center" }}>
          <svg viewBox="0 0 56 28" width="56" height="28">
            <path d="M0,14 Q14,3 28,14 Q42,3 56,14"
              stroke="rgba(255,255,255,0.85)" strokeWidth="2.2" fill="none" strokeLinecap="round" />
          </svg>
        </div>
      ))}

      {/* Sun */}
      <div className="absolute" style={{ top: "5%", left: "50%", transform: "translateX(-50%)" }}>
        <SunSVG />
      </div>

      {/* Main content — vertically centered in upper 2/3 */}
      <div className="relative flex-1 flex flex-col items-center justify-center text-center px-6"
        style={{ paddingBottom: "28%" }}>

        <p className="text-[10px] font-black tracking-[0.35em] uppercase mb-5"
          style={{ color: "rgba(180,220,255,0.7)" }}>
          ✦ &nbsp;Goa, India&nbsp; ✦
        </p>

        <h1 className="font-black text-white leading-none tracking-tight mb-4"
          style={{ fontSize: "clamp(2.6rem, 10vw, 4rem)" }}>
          Welcome to<br />
          <span className="gradient-text">Paradise</span>
        </h1>

        <p className="text-sm mb-10 leading-relaxed max-w-[260px]"
          style={{ color: "rgba(200,235,255,0.72)" }}>
          Sun, sand &amp; seamless stays —<br />your complete Goa guest experience
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col gap-3 w-full max-w-[260px]">
          <Link href="/login"
            className="w-full py-4 rounded-2xl font-extrabold text-[#0891B2] text-base transition-all active:scale-95"
            style={{
              background: "rgba(255,255,255,0.95)",
              backdropFilter: "blur(12px)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.2)",
            }}>
            Sign In 🏄
          </Link>

          <Link href="/signup"
            className="w-full py-4 rounded-2xl font-extrabold text-white text-base transition-all active:scale-95"
            style={{
              background: "rgba(255,255,255,0.12)",
              backdropFilter: "blur(12px)",
              border: "1.5px solid rgba(255,255,255,0.3)",
              boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
            }}>
            Create Account 🌴
          </Link>
        </div>
      </div>

      {/* Ocean + sand at bottom */}
      <div className="absolute left-0 right-0 bottom-0" style={{ height: "30%" }}>
        {/* Water body */}
        <div className="absolute inset-0"
          style={{ background: "linear-gradient(180deg, #1060B0 0%, #0277BD 60%, #01579B 100%)" }} />

        {/* Waves */}
        <div className="absolute left-0 right-0 overflow-hidden" style={{ top: 0, height: 90 }}>
          <OceanWave color="#1565C0" opacity={0.6} yPath={50} animClass="wave-slow" />
        </div>
        <div className="absolute left-0 right-0 overflow-hidden" style={{ top: 14, height: 90 }}>
          <OceanWave color="#0891B2" opacity={0.65} yPath={45} animClass="wave-mid" />
        </div>
        <div className="absolute left-0 right-0 overflow-hidden" style={{ top: 26, height: 90 }}>
          <OceanWave color="#38BDF8" opacity={0.45} yPath={42} animClass="wave-fast" />
        </div>

        {/* Sand */}
        <div className="absolute bottom-0 left-0 right-0" style={{
          height: "42%",
          background: "linear-gradient(180deg, #B8804A 0%, #CFA060 15%, #DEBC78 35%, #EDD090 55%, #F4E0A8 75%, #FAF0C8 100%)",
        }}>
          {/* Wet sand */}
          <div className="absolute top-0 left-0 right-0" style={{
            height: "20%",
            background: "linear-gradient(180deg, rgba(100,170,210,0.35) 0%, transparent 100%)",
          }} />
          {/* Foam */}
          {[2, 18, 35, 52, 68, 82, 95].map((left, i) => (
            <div key={i} className="absolute rounded-full" style={{
              top: "-5px", left: `${left}%`,
              width: `${18 + (i % 4) * 16}px`, height: "8px",
              background: "rgba(255,255,255,0.72)", filter: "blur(3px)",
              animation: `foam-pulse ${1.4 + i * 0.3}s ease-in-out ${i * 0.18}s infinite`,
            }} />
          ))}
        </div>
      </div>
    </div>
  );
}
