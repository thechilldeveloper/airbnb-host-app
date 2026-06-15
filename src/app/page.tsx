"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function RootPage() {
  const router = useRouter();
  const [dots, setDots] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => setDots((d) => (d % 3) + 1), 500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.replace("/host/dashboard/checkins");
      } else {
        const guestName = localStorage.getItem("guestName");
        if (guestName) {
          router.replace("/home");
        } else {
          router.replace("/login");
        }
      }
    });
    return unsub;
  }, [router]);

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center gap-6 overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #090F1E 0%, #0D1F3C 20%, #1456A0 50%, #4CA8DB 78%, #DFF2FB 100%)",
      }}
    >
      {/* Twinkling stars */}
      {[8,22,38,55,70,85,14,46,78,30,96,67,83,19,42].map((left, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            width: `${1 + (i % 3)}px`,
            height: `${1 + (i % 3)}px`,
            left: `${left}%`,
            top: `${3 + (i % 5) * 4}%`,
            animation: `twinkle ${1.5 + (i % 7) * 0.4}s ease-in-out ${i * 0.25}s infinite`,
          }}
        />
      ))}

      {/* Sun */}
      <div className="relative sun-glow">
        <svg viewBox="0 0 160 160" width="90" height="90" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="splashSun" cx="38%" cy="38%">
              <stop offset="0%" stopColor="#FFFDE7" />
              <stop offset="45%" stopColor="#FFD740" />
              <stop offset="100%" stopColor="#FF6F00" />
            </radialGradient>
          </defs>
          <circle cx="80" cy="80" r="32" fill="url(#splashSun)" />
          <ellipse cx="68" cy="68" rx="9" ry="6" fill="rgba(255,255,230,0.5)" />
        </svg>
      </div>

      {/* Brand */}
      <div className="text-center">
        <p
          className="text-[10px] font-black tracking-[0.35em] uppercase mb-3"
          style={{ color: "rgba(180,220,255,0.7)" }}
        >
          ✦ &nbsp;Goa, India&nbsp; ✦
        </p>
        <h1
          className="font-black text-white leading-none tracking-tight"
          style={{ fontSize: "clamp(2rem, 8vw, 3rem)" }}
        >
          Goa Stay
        </h1>
        <p className="text-sm mt-2" style={{ color: "rgba(200,235,255,0.65)" }}>
          Your paradise experience awaits
        </p>
      </div>

      {/* Loading indicator */}
      <div className="flex items-center gap-1.5 mt-2">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-2 h-2 rounded-full transition-all duration-300"
            style={{
              background: i < dots ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.25)",
              transform: i < dots ? "scale(1.2)" : "scale(1)",
            }}
          />
        ))}
      </div>

      {/* Animated wave at bottom */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden" style={{ height: 80 }}>
        <div className="h-full flex wave-slow" style={{ width: "200%", flexShrink: 0 }}>
          {[0, 1].map((i) => (
            <svg
              key={i}
              viewBox="0 0 1440 80"
              preserveAspectRatio="none"
              style={{ width: "50%", height: "100%", display: "block", flexShrink: 0 }}
            >
              <path
                d="M0,40 C160,20 320,60 480,40 C640,20 800,60 960,40 C1120,20 1280,60 1440,40 L1440,80 L0,80 Z"
                fill="#0891B2"
                fillOpacity={0.6}
              />
            </svg>
          ))}
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden" style={{ height: 50 }}>
        <div className="h-full flex wave-fast" style={{ width: "200%", flexShrink: 0 }}>
          {[0, 1].map((i) => (
            <svg
              key={i}
              viewBox="0 0 1440 50"
              preserveAspectRatio="none"
              style={{ width: "50%", height: "100%", display: "block", flexShrink: 0 }}
            >
              <path
                d="M0,25 C200,10 400,40 600,25 C800,10 1000,40 1200,25 C1320,18 1380,30 1440,25 L1440,50 L0,50 Z"
                fill="#38BDF8"
                fillOpacity={0.45}
              />
            </svg>
          ))}
        </div>
      </div>
    </div>
  );
}
