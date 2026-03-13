import React, { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  CalendarDays,
  Clock3,
  MapPin,
  Heart,
  Sparkles,
  MoonStar,
  ScrollText,
  Music4,
  Camera,
  Gift,
  ChevronDown,
  Mail,
  Phone,
  Users,
  ExternalLink,
  Castle,
  Scroll,
  ImagePlus,
  Menu,
  X,
  QrCode,
  Send,
  Loader2,
  CheckCircle2,
  Copy,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

type PhotoItem = {
  src: string;
  alt: string;
  title: string;
};

type FormDataType = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

const headingFont = "'UnifrakturCook', 'MedievalSharp', 'Cinzel Decorative', serif";

const eventDetails = {
  groom: "Maneesha",
  bride: "Ruchini",
  groomParents: "Beloved son of Anura & Nimmi",
  brideParents: "Beloved daughter of Sumith & Subani",
  date: "26th of May, Tuesday 2026",
  time: "11.00 AM – 5.00 PM",
  venue: "Tea Tree Hotel, Bandarawela",
  quote:
    "Through the shadows of time and the silence of centuries, love always finds its way home.",
};

const appConfig = {
  googleMapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Tea+Tree+Hotel+Bandarawela",
  inviteUrl: "https://maneesha-ruchini-wedding.example.com",
  rsvp: {
    emailTo: "rsvp@maneesha-ruchini.com",
    webhookUrl: "",
    googleScriptUrl: "",
    databaseApiUrl: "",
  },
  couplePhotos: [
    { src: "/photos/couple-1.jpg", alt: "Maneesha and Ruchini portrait", title: "Moonlit Portrait" },
    { src: "/photos/couple-2.jpg", alt: "Maneesha and Ruchini together", title: "Crimson Promise" },
    { src: "/photos/couple-3.jpg", alt: "Wedding pre-shoot photo", title: "Velvet Vows" },
    { src: "/photos/couple-4.jpg", alt: "Romantic couple session", title: "Eternal Embrace" },
  ] as PhotoItem[],
};

const navigation = [
  { label: "Home", href: "#home" },
  { label: "Story", href: "#story" },
  { label: "Details", href: "#details" },
  { label: "Gallery", href: "#gallery" },
  { label: "QR", href: "#qr" },
  { label: "RSVP", href: "#rsvp" },
];

const storyMoments = [
  {
    title: "A Love Written in the Dark",
    text:
      "Like an old legend whispered through candlelight, our story began quietly and grew into a love too deep for time to erase.",
  },
  {
    title: "A Bond Beyond Centuries",
    text:
      "In the spirit of eternal romance, we celebrate a connection that feels destined, dramatic, and beautifully unforgettable.",
  },
  {
    title: "The Night of Forever",
    text:
      "Now we invite our dearest family and friends to witness the chapter where two souls promise one eternity.",
  },
];

const dressCode = [
  "Black, crimson, burgundy, charcoal, deep plum",
  "Elegant gothic glamour and classic formal wear",
  "Velvet, lace, satin, or timeless evening silhouettes",
];

/* =========================
   SPIDER WEB
   More realistic:
   - thread sway
   - dew shimmer
   - denser radial strands
   ========================= */
export function SpiderWeb({ className = "" }: { className?: string }) {
  const radialLines = Array.from({ length: 8 }, (_, i) => i * 22.5);
  const rings = [18, 34, 50, 66, 82];

  return (
    <motion.div
      className={`pointer-events-none absolute ${className}`}
      animate={{ rotate: [0, 0.8, -0.6, 0] }}
      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      style={{ transformOrigin: "top left" }}
    >
      <div className="relative h-36 w-36 opacity-40 md:h-48 md:w-48">
        {/* anchor threads */}
        <div className="absolute left-0 top-0 h-px w-full origin-left rotate-[18deg] bg-white/15" />
        <div className="absolute left-0 top-0 h-px w-[78%] origin-left rotate-[44deg] bg-white/10" />
        <div className="absolute left-0 top-0 h-px w-[58%] origin-left rotate-[72deg] bg-white/10" />

        {/* radial lines */}
        {radialLines.map((deg) => (
          <div
            key={deg}
            className="absolute left-0 top-0 h-full w-full"
            style={{ transform: `rotate(${deg}deg)` }}
          >
            <div className="absolute left-0 top-0 h-full w-px origin-top bg-gradient-to-b from-white/30 via-white/18 to-transparent" />
          </div>
        ))}

        {/* curved rings */}
        {rings.map((size, i) => (
          <motion.div
            key={size}
            className="absolute rounded-full border border-white/15"
            style={{
              width: `${size}%`,
              height: `${size}%`,
              left: 0,
              top: 0,
              borderRightColor: "rgba(255,255,255,0.08)",
              borderBottomColor: "rgba(255,255,255,0.08)",
              transformOrigin: "top left",
            }}
            animate={{
              opacity: [0.12, 0.18, 0.12],
            }}
            transition={{
              duration: 3.5 + i,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* dew highlights */}
        {[
          { x: "24%", y: "18%" },
          { x: "38%", y: "29%" },
          { x: "14%", y: "40%" },
          { x: "48%", y: "54%" },
          { x: "28%", y: "66%" },
        ].map((drop, i) => (
          <motion.div
            key={i}
            className="absolute h-1.5 w-1.5 rounded-full bg-white/60 blur-[0.5px]"
            style={{ left: drop.x, top: drop.y }}
            animate={{
              opacity: [0.15, 0.75, 0.2],
              scale: [0.9, 1.15, 0.9],
            }}
            transition={{
              duration: 2.8 + i * 0.4,
              delay: i * 0.2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}

/* =========================
   CANDLE GLOW
   More realistic:
   - flame body + inner core
   - flicker with tilt
   - warm halo + smoke hint
   ========================= */
export function CandleGlow({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute ${className}`}>
      {/* outer warm glow */}
      <motion.div
        className="absolute left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-700/18 blur-3xl"
        animate={{
          opacity: [0.25, 0.42, 0.3, 0.48, 0.25],
          scale: [1, 1.08, 0.98, 1.06, 1],
        }}
        transition={{
          duration: 2.6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* core glow */}
      <motion.div
        className="absolute left-1/2 top-1/2 h-14 w-14 -translate-x-1/2 -translate-y-[55%] rounded-full bg-orange-400/22 blur-2xl"
        animate={{
          opacity: [0.25, 0.55, 0.35, 0.6, 0.25],
          scale: [0.95, 1.1, 1, 1.08, 0.95],
        }}
        transition={{
          duration: 1.8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* flame */}
      <motion.div
        className="absolute left-1/2 top-1/2 h-8 w-5 -translate-x-1/2 -translate-y-1/2 rounded-[999px_999px_999px_999px/1300px_1300px_700px_700px] bg-gradient-to-t from-red-600 via-orange-400 to-yellow-200 shadow-[0_0_20px_rgba(255,180,80,0.45)]"
        animate={{
          scaleY: [1, 1.15, 0.92, 1.1, 1],
          scaleX: [1, 0.92, 1.06, 0.96, 1],
          rotate: [-3, 2, -1, 3, -2],
          x: [0, -1.5, 1, -1, 0],
          y: [0, -1, 0.5, -0.5, 0],
        }}
        transition={{
          duration: 1.1,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{ transformOrigin: "center bottom" }}
      >
        <motion.div
          className="absolute left-1/2 top-[18%] h-3.5 w-2.5 -translate-x-1/2 rounded-full bg-yellow-100/90 blur-[0.5px]"
          animate={{
            opacity: [0.7, 1, 0.75, 1, 0.7],
            scale: [0.95, 1.08, 0.92, 1.04, 0.95],
          }}
          transition={{
            duration: 0.9,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>

      {/* subtle smoke */}
      <motion.div
        className="absolute left-1/2 top-[36%] h-10 w-6 -translate-x-1/2 rounded-full bg-white/10 blur-xl"
        animate={{
          y: [0, -8, -16],
          x: [0, 2, -2],
          opacity: [0.08, 0.12, 0],
          scale: [0.8, 1, 1.25],
        }}
        transition={{
          duration: 2.8,
          repeat: Infinity,
          ease: "easeOut",
        }}
      />
    </div>
  );
}

/* =========================
   FLOATING MIST
   More realistic:
   - layered fog sheets
   - stretched shapes
   - drifting sideways
   - softer opacity breathing
   ========================= */
export function FloatingMist() {
  const layers = useMemo(
    () => [
      {
        left: "-8%",
        top: "8%",
        width: "42rem",
        height: "12rem",
        delay: 0,
        duration: 28,
        opacity: 0.12,
      },
      {
        left: "18%",
        top: "22%",
        width: "36rem",
        height: "10rem",
        delay: 2,
        duration: 24,
        opacity: 0.09,
      },
      {
        left: "52%",
        top: "12%",
        width: "34rem",
        height: "11rem",
        delay: 1.2,
        duration: 30,
        opacity: 0.1,
      },
      {
        left: "-4%",
        top: "58%",
        width: "38rem",
        height: "12rem",
        delay: 3,
        duration: 26,
        opacity: 0.11,
      },
      {
        left: "46%",
        top: "68%",
        width: "44rem",
        height: "13rem",
        delay: 0.8,
        duration: 32,
        opacity: 0.12,
      },
    ],
    []
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {layers.map((layer, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white blur-3xl"
          style={{
            left: layer.left,
            top: layer.top,
            width: layer.width,
            height: layer.height,
            opacity: layer.opacity,
            filter: "blur(48px)",
            background:
              "radial-gradient(ellipse at center, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0.08) 35%, rgba(255,255,255,0.02) 70%, transparent 100%)",
          }}
          animate={{
            x: [0, 40, -20, 18, 0],
            y: [0, -8, 6, -4, 0],
            scaleX: [1, 1.08, 0.96, 1.04, 1],
            scaleY: [1, 0.96, 1.04, 0.98, 1],
            opacity: [
              layer.opacity * 0.7,
              layer.opacity,
              layer.opacity * 0.85,
              layer.opacity * 1.05,
              layer.opacity * 0.7,
            ],
          }}
          transition={{
            duration: layer.duration,
            delay: layer.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* lower creeping fog */}
      <motion.div
        className="absolute bottom-[-6%] left-[-10%] h-[22rem] w-[140%] blur-3xl"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.03) 30%, rgba(255,255,255,0.09) 65%, rgba(255,255,255,0.14) 100%)",
        }}
        animate={{
          x: [0, 20, -12, 0],
          opacity: [0.2, 0.28, 0.22, 0.2],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}

/* =========================
   FLOATING BATS
   More realistic:
   - different sizes/depth
   - wing flapping
   - non-linear paths
   - varied opacity and speed
   ========================= */
function Bat({ size = 32 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size * 0.55}
      viewBox="0 0 120 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="drop-shadow-[0_0_10px_rgba(0,0,0,0.4)]"
    >
      <path
        d="M60 28
           C56 22, 52 18, 48 16
           C44 22, 36 28, 28 26
           C22 24, 16 18, 10 14
           C12 22, 12 30, 6 38
           C16 36, 24 38, 32 42
           C40 36, 48 32, 56 30
           C57 34, 58 38, 60 42
           C62 38, 63 34, 64 30
           C72 32, 80 36, 88 42
           C96 38, 104 36, 114 38
           C108 30, 108 22, 110 14
           C104 18, 98 24, 92 26
           C84 28, 76 22, 72 16
           C68 18, 64 22, 60 28Z"
        fill="rgba(18,18,18,0.95)"
      />
    </svg>
  );
}

export function FloatingBats() {
  const bats = useMemo(
    () => [
      {
        top: "10%",
        size: 24,
        duration: 18,
        delay: 0,
        x: ["-10vw", "18vw", "42vw", "70vw", "110vw"],
        y: [0, -18, 10, -8, 12],
        opacity: [0, 0.5, 0.35, 0.45, 0],
      },
      {
        top: "20%",
        size: 38,
        duration: 24,
        delay: 5,
        x: ["110vw", "78vw", "52vw", "24vw", "-12vw"],
        y: [0, 16, -12, 10, -6],
        opacity: [0, 0.35, 0.55, 0.3, 0],
      },
      {
        top: "38%",
        size: 28,
        duration: 20,
        delay: 2,
        x: ["-8vw", "24vw", "50vw", "76vw", "108vw"],
        y: [0, -10, 12, -14, 6],
        opacity: [0, 0.28, 0.42, 0.3, 0],
      },
      {
        top: "62%",
        size: 20,
        duration: 16,
        delay: 8,
        x: ["108vw", "70vw", "40vw", "18vw", "-10vw"],
        y: [0, 8, -8, 12, -4],
        opacity: [0, 0.22, 0.34, 0.22, 0],
      },
    ],
    []
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-80">
      {bats.map((bat, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ top: bat.top }}
          animate={{
            x: bat.x,
            y: bat.y,
            opacity: bat.opacity,
          }}
          transition={{
            duration: bat.duration,
            delay: bat.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <motion.div
            animate={{
              scaleY: [1, 0.78, 1.08, 0.82, 1],
              scaleX: [1, 1.08, 0.96, 1.1, 1],
              rotate: [-4, 2, -3, 3, -2],
            }}
            transition={{
              duration: 0.42,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{ transformOrigin: "center center" }}
          >
            <Bat size={bat.size} />
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}

export function FallingEmbers() {
  const particles = useMemo(
    () => Array.from({ length: 14 }, (_, i) => ({ left: `${6 + i * 6.5}%`, delay: i * 0.7 })),
    []
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((particle, index) => (
        <motion.div
          key={index}
          className="absolute top-0 h-2 w-2 rounded-full bg-red-700/60 blur-[1px]"
          style={{ left: particle.left }}
          animate={{ y: ["-5vh", "110vh"], opacity: [0, 0.8, 0] }}
          transition={{ repeat: Infinity, duration: 8 + (index % 4), delay: particle.delay, ease: "linear" }}
        />
      ))}
    </div>
  );
}

export function OrnateCorner({ className = "" }: { className?: string }) {
  return (
    <div className={`absolute h-24 w-24 md:h-32 md:w-32 ${className}`}>
      <div className="absolute inset-0 rounded-tl-[3rem] border-l border-t border-red-900/60" />
      <div className="absolute left-2 top-2 h-14 w-14 rounded-tl-[2rem] border-l border-t border-white/20" />
      <div className="absolute left-5 top-5 h-2 w-2 rounded-full bg-red-700/70 shadow-[0_0_18px_rgba(180,20,20,0.6)]" />
    </div>
  );
}

export function SectionHeading({ eyebrow, title, text }: { eyebrow: string; title: string; text?: string }) {
  return (
    <div className="mx-auto mb-10 max-w-3xl text-center">
      <p className="mb-3 text-xs uppercase tracking-[0.45em] text-red-300/80">{eyebrow}</p>
      <h2 className="text-3xl font-semibold tracking-[0.08em] text-zinc-100 md:text-5xl" style={{ fontFamily: headingFont }}>
        {title}
      </h2>
      {text ? <p className="mt-4 text-base leading-7 text-zinc-400 md:text-lg">{text}</p> : null}
    </div>
  );
}

export function DetailCard({ icon: Icon, label, value }: { icon: React.ComponentType<{ className?: string }>; label: string; value: string }) {
  return (
    <motion.div whileHover={{ y: -4, scale: 1.01 }}>
      <Card className="rounded-3xl border border-red-950/70 bg-black/35 shadow-[0_0_35px_rgba(90,0,0,0.18)] backdrop-blur-sm">
        <CardContent className="p-5">
          <div className="mb-3 flex items-center gap-3 text-red-300">
            <Icon className="h-5 w-5" />
            <span className="text-xs uppercase tracking-[0.3em] text-zinc-400">{label}</span>
          </div>
          <p className="text-lg text-zinc-100 md:text-xl">{value}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export function CountdownUnit({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl border border-red-950/60 bg-black/40 px-5 py-4 text-center shadow-inner shadow-red-950/30">
      <div className="text-3xl font-semibold text-red-200 md:text-4xl">{String(value).padStart(2, "0")}</div>
      <div className="mt-1 text-xs uppercase tracking-[0.35em] text-zinc-500">{label}</div>
    </div>
  );
}

export function StoryCard({ title, text, index }: { title: string; text: string; index: number }) {
  return (
    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.6, delay: index * 0.12 }}>
      <Card className="h-full rounded-[2rem] border border-red-950/70 bg-black/35 backdrop-blur-sm">
        <CardContent className="p-6 md:p-7">
          <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full border border-red-900/80 bg-red-950/25 text-red-300">
            <ScrollText className="h-5 w-5" />
          </div>
          <h3 className="text-xl font-semibold text-zinc-100">{title}</h3>
          <p className="mt-3 leading-7 text-zinc-400">{text}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export function GalleryCard({ photo, index }: { photo: PhotoItem; index: number }) {
  return (
    <motion.div initial={{ opacity: 0, scale: 0.94 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.5, delay: index * 0.08 }} whileHover={{ y: -6 }} className="group">
      <div className="relative overflow-hidden rounded-[2rem] border border-red-950/70 bg-[linear-gradient(180deg,rgba(38,9,9,0.95),rgba(12,12,12,0.98))] p-3">
        <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] border border-red-900/40 bg-[radial-gradient(circle_at_top,rgba(130,20,20,0.25),transparent_35%),linear-gradient(180deg,rgba(20,10,10,0.95),rgba(5,5,5,0.98))]">
          <img src={photo.src} alt={photo.alt} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-90" />
          <div className="absolute bottom-6 left-6 right-6">
            <p className="text-sm uppercase tracking-[0.35em] text-red-300/75">Scene</p>
            <h3 className="mt-2 text-xl font-semibold text-zinc-100">{photo.title}</h3>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function BloodInkTitle({ children }: { children: React.ReactNode }) {
  return <motion.span whileHover={{ textShadow: "0 0 10px rgba(220,38,38,0.5), 0 0 24px rgba(127,29,29,0.45)" }}>{children}</motion.span>;
}

export function OpeningGate({ onEnter }: { onEnter: () => void }) {
  return (
    <AnimatePresence>
      <motion.div initial={{ opacity: 1 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.8 } }} className="fixed inset-0 z-[80] overflow-hidden bg-[#070707]">
        <motion.div initial={{ x: 0 }} exit={{ x: "-100%", transition: { duration: 1.1, ease: [0.76, 0, 0.24, 1] } }} className="absolute inset-y-0 left-0 w-1/2 border-r border-red-950/70 bg-[linear-gradient(180deg,#160909,#050505)]">
          <SpiderWeb className="left-0 top-0" />
        </motion.div>
        <motion.div initial={{ x: 0 }} exit={{ x: "100%", transition: { duration: 1.1, ease: [0.76, 0, 0.24, 1] } }} className="absolute inset-y-0 right-0 w-1/2 border-l border-red-950/70 bg-[linear-gradient(180deg,#160909,#050505)]">
          <SpiderWeb className="right-0 top-0 scale-x-[-1]" />
        </motion.div>
        <div className="relative z-10 flex min-h-screen items-center justify-center px-6 text-center">
          <motion.div initial={{ opacity: 0, scale: 0.94, y: 16 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 1.04, transition: { duration: 0.45 } }} transition={{ duration: 0.7 }} className="max-w-2xl">
            <p className="mb-4 text-xs uppercase tracking-[0.45em] text-red-300/80">An Invitation from the Shadows</p>
            <h1 className="text-5xl uppercase text-red-700 md:text-7xl" style={{ fontFamily: headingFont }}>Maneesha & Ruchini</h1>
            <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-zinc-300 md:text-lg">The castle doors await. Enter a night of candlelight, crimson romance, and vows meant for eternity.</p>
            <Button onClick={onEnter} className="mt-8 rounded-full bg-red-800 px-8 text-white hover:bg-red-700">Enter the Castle</Button>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export function SiteHeader({
  scrolled,
  menuOpen,
  setMenuOpen,
  musicOn,
  setMusicOn,
}: {
  scrolled: boolean;
  menuOpen: boolean;
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  musicOn: boolean;
  setMusicOn: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={`fixed left-1/2 top-4 z-50 flex w-[calc(100%-2rem)] max-w-6xl -translate-x-1/2 items-center justify-between rounded-full border px-4 py-3 backdrop-blur-xl transition-all md:top-6 md:w-[calc(100%-3rem)] md:px-6 ${scrolled ? "border-red-900/80 bg-black/75 shadow-[0_0_35px_rgba(90,0,0,0.25)]" : "border-white/10 bg-black/35"}`}
      >
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-red-900/80 bg-red-950/25 text-red-300">
            <Castle className="h-4 w-4" />
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-[0.35em] text-zinc-500">Eternal Invitation</p>
            <p className="text-sm text-zinc-100">Maneesha & Ruchini</p>
          </div>
        </div>

        <nav className="hidden items-center gap-6 md:flex">
          {navigation.map((item) => (
            <a key={item.href} href={item.href} className="text-sm text-zinc-300 transition hover:text-red-300">
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button onClick={() => setMusicOn((prev) => !prev)} variant="outline" className="rounded-full border-red-900/80 bg-black/55 px-4 text-zinc-100 backdrop-blur-md hover:bg-red-950/30">
            <Music4 className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">{musicOn ? "Music On" : "Music Off"}</span>
          </Button>
          <Button onClick={() => setMenuOpen((prev) => !prev)} variant="outline" className="rounded-full border-red-900/80 bg-black/55 px-3 text-zinc-100 backdrop-blur-md hover:bg-red-950/30 md:hidden">
            {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </Button>
        </div>
      </motion.header>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="fixed left-4 right-4 top-24 z-40 rounded-[2rem] border border-red-900/70 bg-black/90 p-5 shadow-[0_0_40px_rgba(90,0,0,0.25)] backdrop-blur-xl md:hidden">
            <div className="space-y-2">
              {navigation.map((item) => (
                <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)} className="block rounded-2xl border border-white/5 bg-white/[0.02] px-4 py-3 text-zinc-200 transition hover:border-red-900/60 hover:bg-red-950/20">
                  {item.label}
                </a>
              ))}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}

export function HeroSection({ timeLeft }: { timeLeft: TimeLeft }) {
  return (
    <section id="home" className="relative flex min-h-screen items-center px-6 py-24 md:px-10 lg:px-16">
      <div className="mx-auto w-full max-w-7xl">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }} className="relative overflow-hidden rounded-[2rem] border border-red-950/80 bg-black/45 px-6 py-10 shadow-[0_0_70px_rgba(80,0,0,0.22)] backdrop-blur-md md:px-10 md:py-14 lg:px-14">
          <OrnateCorner className="left-4 top-4" />
          <OrnateCorner className="right-4 top-4 rotate-90" />
          <OrnateCorner className="bottom-4 left-4 -rotate-90" />
          <OrnateCorner className="bottom-4 right-4 rotate-180" />

          <div className="mx-auto max-w-6xl">
            <div className="mb-10 flex flex-col items-center text-center">
              <motion.div animate={{ y: [0, -6, 0] }} transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }} className="mb-4 flex items-center gap-2 rounded-full border border-red-900/70 bg-red-950/20 px-4 py-2 text-sm tracking-[0.25em] text-red-200">
                <MoonStar className="h-4 w-4" />
                GOTHIC WEDDING INVITATION
              </motion.div>
              <p className="max-w-3xl font-serif text-lg italic text-zinc-300 md:text-2xl first-letter:mr-1 first-letter:text-5xl first-letter:font-bold first-letter:text-red-400">“{eventDetails.quote}”</p>
            </div>

            <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
              <div>
                <p className="mb-2 font-serif text-base italic text-zinc-400 md:text-lg">{eventDetails.groomParents}</p>
                <h1 className="text-6xl font-black uppercase leading-none tracking-[0.08em] text-red-700 md:text-8xl" style={{ fontFamily: headingFont }}>
                  <BloodInkTitle>{eventDetails.groom}</BloodInkTitle>
                </h1>

                <div className="my-5 flex items-center gap-4">
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-red-900 to-transparent" />
                  <div className="flex h-14 w-14 items-center justify-center rounded-full border border-red-900/80 bg-black/50 shadow-[0_0_22px_rgba(120,0,0,0.35)]">
                    <Heart className="h-6 w-6 text-red-500" />
                  </div>
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-red-900 to-transparent" />
                </div>

                <p className="mb-2 font-serif text-base italic text-zinc-400 md:text-lg">{eventDetails.brideParents}</p>
                <h2 className="text-5xl font-black uppercase leading-none tracking-[0.08em] text-red-700 md:text-7xl" style={{ fontFamily: headingFont }}>
                  <BloodInkTitle>{eventDetails.bride}</BloodInkTitle>
                </h2>

                <p className="mt-8 max-w-2xl text-lg leading-8 text-zinc-300 md:text-xl">We invite you to enter a night of dark romance, timeless devotion, and haunting elegance as we begin our eternal story together.</p>

                <div className="mt-8 flex flex-wrap gap-3">
                  {["BLACK & CRIMSON", "DRACULA INSPIRED", "ELEGANCE OF DARKNESS"].map((item) => (
                    <span key={item} className="rounded-full border border-red-900/70 bg-red-950/20 px-4 py-2 text-sm tracking-[0.25em] text-red-200">
                      {item}
                    </span>
                  ))}
                </div>

                <div className="mt-10 flex flex-wrap gap-4">
                  <Button asChild className="rounded-full bg-red-800 px-6 text-white hover:bg-red-700">
                    <a href="#rsvp">RSVP Your Presence</a>
                  </Button>
                  <Button asChild variant="outline" className="rounded-full border-red-900/80 bg-black/30 px-6 text-zinc-100 hover:bg-red-950/20">
                    <a href="#story">View Love Story</a>
                  </Button>
                </div>
              </div>

              <div className="relative">
                <div className="absolute inset-0 rounded-[2rem] bg-red-900/10 blur-2xl" />
                <div className="relative overflow-hidden rounded-[2rem] border border-red-950/70 bg-[linear-gradient(180deg,rgba(25,8,8,0.9),rgba(8,8,8,0.95))] p-6 md:p-7">
                  <div className="mb-6 flex items-center justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-[0.35em] text-zinc-500">The Night Awaits</p>
                      <h3 className="mt-2 text-2xl font-semibold text-zinc-100">Count the Hours</h3>
                    </div>
                    <Sparkles className="h-5 w-5 text-red-400" />
                  </div>

                  <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                    <CountdownUnit label="Days" value={timeLeft.days} />
                    <CountdownUnit label="Hours" value={timeLeft.hours} />
                    <CountdownUnit label="Minutes" value={timeLeft.minutes} />
                    <CountdownUnit label="Seconds" value={timeLeft.seconds} />
                  </div>

                  <div className="mt-6 grid gap-4">
                    <DetailCard icon={CalendarDays} label="Date" value={eventDetails.date} />
                    <DetailCard icon={Clock3} label="Time" value={eventDetails.time} />
                    <DetailCard icon={MapPin} label="Venue" value={eventDetails.venue} />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 flex justify-center">
              <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.8 }} className="flex flex-col items-center text-zinc-400">
                <span className="mb-2 text-xs uppercase tracking-[0.35em]">Scroll Into The Night</span>
                <ChevronDown className="h-5 w-5" />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export function StorySection() {
  return (
    <section id="story" className="relative px-6 py-20 md:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <SectionHeading eyebrow="Our Story" title="A Romance Meant for Eternity" text="A Dracula-inspired celebration deserves a love story that feels cinematic, mysterious, and unforgettable." />
        <div className="grid gap-6 md:grid-cols-3">
          {storyMoments.map((item, index) => (
            <StoryCard key={item.title} index={index} title={item.title} text={item.text} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function DetailsSection() {
  return (
    <section id="details" className="relative px-6 py-20 md:px-10 lg:px-16">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <Card className="rounded-[2rem] border border-red-950/70 bg-black/35 backdrop-blur-md">
          <CardContent className="p-8 md:p-10">
            <div className="mb-5 flex items-center gap-3 text-red-300">
              <Gift className="h-5 w-5" />
              <span className="text-xs uppercase tracking-[0.35em] text-zinc-400">Dress Code</span>
            </div>
            <h3 className="text-3xl font-semibold text-zinc-100" style={{ fontFamily: headingFont }}>Elegance of the Darkness</h3>
            <div className="mt-6 space-y-4">
              {dressCode.map((item) => (
                <div key={item} className="rounded-2xl border border-red-950/60 bg-red-950/10 px-5 py-4 text-zinc-300">{item}</div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-[2rem] border border-red-950/70 bg-[linear-gradient(180deg,rgba(20,8,8,0.95),rgba(6,6,6,1))] backdrop-blur-md">
          <CardContent className="p-8 md:p-10">
            <div className="mb-5 flex items-center gap-3 text-red-300">
              <MapPin className="h-5 w-5" />
              <span className="text-xs uppercase tracking-[0.35em] text-zinc-400">Venue & Timing</span>
            </div>
            <h3 className="text-3xl font-semibold text-zinc-100" style={{ fontFamily: headingFont }}>Where Romance Meets the Mist</h3>
            <p className="mt-4 leading-7 text-zinc-400">Join us at Tea Tree Hotel, Bandarawela, for an unforgettable day wrapped in dark luxury, moody florals, candlelit ambiance, and eternal vows.</p>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-red-950/60 bg-black/30 p-5">
                <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">Date</p>
                <p className="mt-2 text-lg text-zinc-100">{eventDetails.date}</p>
              </div>
              <div className="rounded-2xl border border-red-950/60 bg-black/30 p-5">
                <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">Time</p>
                <p className="mt-2 text-lg text-zinc-100">{eventDetails.time}</p>
              </div>
            </div>
            <div className="mt-6 rounded-[1.75rem] border border-red-900/40 bg-[radial-gradient(circle_at_top,rgba(110,20,20,0.22),transparent_35%),linear-gradient(180deg,rgba(10,10,10,0.95),rgba(16,8,8,0.95))] p-8 text-center">
              <MapPin className="mx-auto h-8 w-8 text-red-400" />
              <p className="mt-4 text-xl text-zinc-100">Tea Tree Hotel, Bandarawela</p>
              <p className="mt-2 text-zinc-400">Open the map and travel straight into our moonlit celebration.</p>
              <a href={appConfig.googleMapsUrl} target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-2 rounded-full border border-red-900/70 bg-black/30 px-5 py-2 text-sm text-red-200 transition hover:bg-red-950/25">
                Open Google Maps <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

export function GallerySection() {
  return (
    <section id="gallery" className="relative px-6 py-20 md:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <SectionHeading eyebrow="Couple Gallery" title="Scenes from a Dark Fairytale" text="Replace the image paths with your real photos to make the site fully personal." />
        <div className="mb-8 flex items-center justify-center gap-3 text-zinc-400">
          <ImagePlus className="h-4 w-4 text-red-300" />
          <p className="text-sm">Add your images into /public/photos and keep the same filenames or update appConfig.couplePhotos.</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {appConfig.couplePhotos.map((photo, index) => (
            <GalleryCard key={photo.src} photo={photo} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function QRSection({ copied, copyInviteLink }: { copied: boolean; copyInviteLink: () => Promise<void> }) {
  return (
    <section id="qr" className="relative px-6 py-20 md:px-10 lg:px-16">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <Card className="rounded-[2rem] border border-red-950/70 bg-black/35 backdrop-blur-md">
          <CardContent className="p-8 md:p-10">
            <div className="mb-5 flex items-center gap-3 text-red-300">
              <QrCode className="h-5 w-5" />
              <span className="text-xs uppercase tracking-[0.35em] text-zinc-400">Guest QR Invitation</span>
            </div>
            <h3 className="text-3xl font-semibold text-zinc-100" style={{ fontFamily: headingFont }}>Share the Invitation Instantly</h3>
            <p className="mt-4 leading-7 text-zinc-400">Guests can scan this code to open your wedding invitation on their phones.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button onClick={copyInviteLink} variant="outline" className="rounded-full border-red-900/80 bg-black/25 px-6 text-zinc-100 hover:bg-red-950/20">
                <Copy className="mr-2 h-4 w-4" />
                {copied ? "Copied" : "Copy Invite Link"}
              </Button>
              <Button asChild className="rounded-full bg-red-800 px-6 text-white hover:bg-red-700">
                <a href={appConfig.inviteUrl} target="_blank" rel="noreferrer">Open Invite Link</a>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-[2rem] border border-red-950/70 bg-[linear-gradient(180deg,rgba(20,8,8,0.92),rgba(6,6,6,1))] backdrop-blur-md">
          <CardContent className="flex flex-col items-center p-8 md:p-10">
            <div className="rounded-[2rem] border border-red-900/50 bg-white p-5 shadow-[0_0_40px_rgba(120,0,0,0.2)]">
              <img src={`https://api.qrserver.com/v1/create-qr-code/?size=260x260&data=${encodeURIComponent(appConfig.inviteUrl)}`} alt="Wedding invitation QR code" className="h-[220px] w-[220px] rounded-xl object-cover md:h-[260px] md:w-[260px]" />
            </div>
            <p className="mt-5 max-w-md text-center text-sm leading-6 text-zinc-400">Change appConfig.inviteUrl to your real wedding website domain before sharing with guests.</p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

export function RSVPSection({
  formData,
  guestCount,
  accepted,
  submitting,
  formSubmitted,
  submitStatus,
  setGuestCount,
  setAccepted,
  handleFieldChange,
  handleSubmit,
}: {
  formData: FormDataType;
  guestCount: string;
  accepted: boolean;
  submitting: boolean;
  formSubmitted: boolean;
  submitStatus: string;
  setGuestCount: React.Dispatch<React.SetStateAction<string>>;
  setAccepted: React.Dispatch<React.SetStateAction<boolean>>;
  handleFieldChange: (field: keyof FormDataType) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
}) {
  return (
    <section id="rsvp" className="relative px-6 pb-24 pt-20 md:px-10 lg:px-16">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <Card className="overflow-hidden rounded-[2rem] border border-red-950/70 bg-black/40 backdrop-blur-md">
          <CardContent className="p-8 md:p-10">
            <div className="flex h-14 w-14 items-center justify-center rounded-full border border-red-900/80 bg-red-950/20 text-red-300">
              <Scroll className="h-6 w-6" />
            </div>
            <h2 className="mt-6 text-3xl font-semibold text-zinc-100 md:text-5xl" style={{ fontFamily: headingFont }}>Will You Join Our Eternal Celebration?</h2>
            <p className="mt-5 max-w-xl text-base leading-7 text-zinc-400 md:text-lg">This form supports email fallback, Google Sheet via Apps Script, webhook, or a database API.</p>

            <div className="mt-8 space-y-4 text-zinc-300">
              <div className="flex items-center gap-3 rounded-2xl border border-red-950/60 bg-red-950/10 p-4">
                <Mail className="h-5 w-5 text-red-300" />
                <span>{appConfig.rsvp.emailTo}</span>
              </div>
              <div className="flex items-center gap-3 rounded-2xl border border-red-950/60 bg-red-950/10 p-4">
                <Phone className="h-5 w-5 text-red-300" />
                <span>+94 77 123 4567</span>
              </div>
              <div className="flex items-center gap-3 rounded-2xl border border-red-950/60 bg-red-950/10 p-4">
                <Users className="h-5 w-5 text-red-300" />
                <span>Kindly respond before 1st May 2026</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-[2rem] border border-red-950/70 bg-[linear-gradient(180deg,rgba(20,8,8,0.92),rgba(6,6,6,1))] backdrop-blur-md">
          <CardContent className="p-8 md:p-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="name" className="mb-2 block text-zinc-300">Guest Name</Label>
                <Input id="name" value={formData.name} onChange={handleFieldChange("name")} placeholder="Enter your name" className="border-red-950/70 bg-black/35 text-zinc-100" />
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <Label htmlFor="email" className="mb-2 block text-zinc-300">Email</Label>
                  <Input id="email" value={formData.email} onChange={handleFieldChange("email")} type="email" placeholder="you@example.com" className="border-red-950/70 bg-black/35 text-zinc-100" />
                </div>
                <div>
                  <Label htmlFor="phone" className="mb-2 block text-zinc-300">Phone</Label>
                  <Input id="phone" value={formData.phone} onChange={handleFieldChange("phone")} placeholder="Your contact number" className="border-red-950/70 bg-black/35 text-zinc-100" />
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <Label htmlFor="guests" className="mb-2 block text-zinc-300">Number of Guests</Label>
                  <Input id="guests" value={guestCount} onChange={(e) => setGuestCount(e.target.value)} className="border-red-950/70 bg-black/35 text-zinc-100" />
                </div>
                <div className="flex items-end justify-between rounded-2xl border border-red-950/60 bg-black/25 p-4">
                  <div>
                    <p className="text-sm text-zinc-300">Attending the wedding</p>
                    <p className="text-xs text-zinc-500">Switch if you cannot attend</p>
                  </div>
                  <Switch checked={accepted} onCheckedChange={setAccepted} />
                </div>
              </div>

              <div>
                <Label htmlFor="message" className="mb-2 block text-zinc-300">Message for the couple</Label>
                <Textarea id="message" value={formData.message} onChange={handleFieldChange("message")} placeholder="Leave a blessing, note, or message..." className="min-h-[120px] border-red-950/70 bg-black/35 text-zinc-100" />
              </div>

              <Button type="submit" disabled={submitting} className="rounded-full bg-red-800 px-8 text-white hover:bg-red-700">
                {submitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
                {submitting ? "Submitting..." : "Send RSVP"}
              </Button>

              {formSubmitted ? (
                <div className="rounded-2xl border border-red-900/60 bg-red-950/20 px-5 py-4 text-red-100">
                  <div className="flex items-center gap-2 font-medium">
                    <CheckCircle2 className="h-4 w-4" />
                    Your RSVP has been sealed in our dark fairytale.
                  </div>
                  {submitStatus ? <p className="mt-2 text-sm text-red-200/90">Status: {submitStatus}</p> : null}
                </div>
              ) : null}

              {!formSubmitted && submitStatus ? (
                <div className="rounded-2xl border border-amber-700/40 bg-amber-950/20 px-5 py-4 text-amber-100">{submitStatus}</div>
              ) : null}
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

