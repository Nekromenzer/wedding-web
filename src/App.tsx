import React, { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import {
  CalendarDays, Clock3, MapPin, Heart, Sparkles, MoonStar, ScrollText,
  Music4, Camera, Gift, ChevronDown, Mail, Phone, Users, ExternalLink,
  Castle, Scroll, ImagePlus, Menu, X, QrCode, Send, Loader2,
  CheckCircle2, Copy,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import draculeMusic from "@/assets/audio/dracule-music.mp3";

/* ─── Event Config ──────────────────────────────────────────────────── */
const eventDetails = {
  groom: "Maneesha",
  bride: "Ruchini",
  groomParents: "Beloved son of Anura & Nimmi",
  brideParents: "Beloved daughter of Sumith & Subani",
  date: "26th of May, Tuesday 2026",
  time: "11.00 AM – 5.00 PM",
  venue: "Tea Tree Hotel, Bandarawela",
  quote: "Through the shadows of time and the silence of centuries, love always finds its way home.",
};

const appConfig = {
  googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Tea+Tree+Hotel+Bandarawela",
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
  ],
};

const storyMoments = [
  { title: "A Love Written in the Dark", text: "Like an old legend whispered through candlelight, our story began quietly and grew into a love too deep for time to erase." },
  { title: "A Bond Beyond Centuries", text: "In the spirit of eternal romance, we celebrate a connection that feels destined, dramatic, and beautifully unforgettable." },
  { title: "The Night of Forever", text: "Now we invite our dearest family and friends to witness the chapter where two souls promise one eternity." },
];

const dressCode = [
  "Black, crimson, burgundy, charcoal, deep plum",
  "Elegant gothic glamour and classic formal wear",
  "Velvet, lace, satin, or timeless evening silhouettes",
];

const navigation = [
  { label: "Home", href: "#home" },
  { label: "Story", href: "#story" },
  { label: "Details", href: "#details" },
  { label: "Gallery", href: "#gallery" },
  { label: "QR", href: "#qr" },
  { label: "RSVP", href: "#rsvp" },
];

/* ─── Blood Drip Effect ─────────────────────────────────────────────── */
const BloodDrips = () => {
  const drips = useMemo(() =>
    Array.from({ length: 12 }, (_, i) => ({
      left: `${4 + i * 8.5}%`,
      // eslint-disable-next-line react-hooks/purity
      height: 20 + Math.random() * 60,
      // eslint-disable-next-line react-hooks/purity
      delay: i * 0.3 + Math.random() * 2,
      // eslint-disable-next-line react-hooks/purity
      width: 2 + Math.random() * 4,
    })), []);

  return (
    <div className="pointer-events-none absolute top-0 left-0 right-0 z-10 overflow-hidden" style={{ height: 100 }}>
      {drips.map((d, i) => (
        <motion.div
          key={i}
          className="absolute top-0 rounded-b-full"
          style={{
            left: d.left,
            width: d.width,
            background: "linear-gradient(180deg, #7f0000, #c00000, #8b0000)",
          }}
          initial={{ scaleY: 0, originY: 0 }}
          animate={{
            scaleY: [0, 1, 1, 0.95, 1],
            height: [0, d.height, d.height + 8, d.height],
          }}
          transition={{
            duration: 3,
            delay: d.delay,
            repeat: Infinity,
            // eslint-disable-next-line react-hooks/purity
            repeatDelay: 8 + Math.random() * 10,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        />
      ))}
    </div>
  );
};

/* ─── Lightning Flash ───────────────────────────────────────────────── */
const LightningFlash = () => {
  const [flash, setFlash] = useState(false);

  useEffect(() => {
    const trigger = () => {
      setFlash(true);
      setTimeout(() => setFlash(false), 120);
      setTimeout(() => {
        setFlash(true);
        setTimeout(() => setFlash(false), 80);
      }, 200);
    };
    const interval = setInterval(trigger, 8000 + Math.random() * 12000);
    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {flash && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.15, 0, 0.1, 0] }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="pointer-events-none fixed inset-0 z-[5] bg-[#d4e8ff]"
        />
      )}
    </AnimatePresence>
  );
};

/* ─── Fog Layer ─────────────────────────────────────────────────────── */
const DeepFog = () => {
  const layers = useMemo(() => [
    { delay: 0, duration: 28, opacity: [0.04, 0.12, 0.06], scale: [1, 1.08, 1], top: "60%" },
    { delay: 3, duration: 34, opacity: [0.03, 0.09, 0.04], scale: [1.05, 1, 1.06], top: "70%" },
    { delay: 6, duration: 22, opacity: [0.05, 0.14, 0.07], scale: [1, 1.1, 0.98], top: "80%" },
    { delay: 1, duration: 30, opacity: [0.03, 0.08, 0.04], scale: [1.02, 0.97, 1.04], top: "50%" },
  ], []);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {layers.map((l, i) => (
        <motion.div
          key={i}
          className="absolute left-[-20%] w-[140%] h-32"
          style={{ top: l.top }}
          animate={{ opacity: l.opacity, scaleX: l.scale, x: ["-5%", "5%", "-3%", "5%", "-5%"] }}
          transition={{ repeat: Infinity, duration: l.duration, delay: l.delay, ease: "easeInOut" }}
        >
          <div
            className="w-full h-full"
            style={{
              background: "radial-gradient(ellipse at center, rgba(180,180,200,0.18) 0%, rgba(80,80,100,0.08) 50%, transparent 75%)",
              filter: "blur(24px)",
            }}
          />
        </motion.div>
      ))}
    </div>
  );
};

/* ─── Animated Bat SVG ──────────────────────────────────────────────── */
const BatSVG = ({ size = 32 }: { size?: number }) => (
  <svg width={size} height={size * 0.6} viewBox="0 0 64 38" fill="currentColor">
    <path d="M32 18 C28 10 18 4 6 6 C10 10 12 14 12 18 C8 16 2 18 0 22 C6 20 10 22 12 24 C10 28 10 32 12 36 C14 30 18 26 22 24 C24 28 26 32 28 36 C29 30 30 26 32 24 C34 26 35 30 36 36 C38 32 38 28 36 24 C40 26 44 30 46 36 C48 32 48 28 46 24 C48 22 52 20 58 22 C56 18 50 16 46 18 C46 14 48 10 52 6 C40 4 30 10 32 18Z"/>
  </svg>
);

/* ─── Dramatic Bats ─────────────────────────────────────────────────── */
const DramaticBats = () => {
  const bats = useMemo(() => Array.from({ length: 9 }, (_, i) => ({
    top: `${5 + i * 10}%`,
    // eslint-disable-next-line react-hooks/purity
    scale: 0.5 + Math.random() * 1.2,
    duration: 18 + i * 3,
    delay: i * 2.8,
    direction: i % 2 === 0 ? 1 : -1,
    // eslint-disable-next-line react-hooks/purity
    yPath: [0, -25 + Math.random() * 50, -10 + Math.random() * 30, 5, 0],
  })), []);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {bats.map((bat, i) => (
        <motion.div
          key={i}
          className="absolute text-zinc-200/20"
          style={{ top: bat.top, scale: bat.scale }}
          initial={{ x: bat.direction > 0 ? "-15vw" : "115vw", opacity: 0 }}
          animate={{
            x: bat.direction > 0 ? ["-15vw", "25vw", "60vw", "115vw"] : ["115vw", "70vw", "35vw", "-15vw"],
            y: bat.yPath,
            opacity: [0, 0.55, 0.4, 0.5, 0],
            rotate: bat.direction > 0 ? [0, 5, -8, 4, 0] : [0, -5, 8, -4, 0],
          }}
          transition={{ repeat: Infinity, duration: bat.duration, delay: bat.delay, ease: "linear" }}
        >
          <motion.div
            animate={{ scaleY: [1, 0.7, 1.15, 0.75, 1], rotate: [0, 12, -12, 8, 0] }}
            transition={{ repeat: Infinity, duration: 0.45, ease: "easeInOut" }}
          >
            <BatSVG size={36} />
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
};

/* ─── Floating Embers/Ash ───────────────────────────────────────────── */
const AshParticles = () => {
  const particles = useMemo(() =>
    Array.from({ length: 22 }, (_, i) => ({
      // eslint-disable-next-line react-hooks/purity
      left: `${Math.random() * 100}%`,
      // eslint-disable-next-line react-hooks/purity
      size: 1.5 + Math.random() * 3,
      delay: i * 0.5,
      // eslint-disable-next-line react-hooks/purity
      duration: 12 + Math.random() * 16,
      // eslint-disable-next-line react-hooks/purity
      xDrift: (Math.random() - 0.5) * 120,
      color: i % 3 === 0 ? "#c00000" : i % 3 === 1 ? "#ff4400" : "#880000",
    })), []);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute bottom-0 rounded-full"
          style={{ left: p.left, width: p.size, height: p.size, background: p.color, boxShadow: `0 0 ${p.size * 3}px ${p.color}` }}
          animate={{
            y: ["100vh", "-10vh"],
            x: [0, p.xDrift * 0.3, p.xDrift * 0.7, p.xDrift],
            opacity: [0, 0.9, 0.6, 0.3, 0],
            scale: [1, 1.2, 0.8, 0.4],
          }}
          transition={{ repeat: Infinity, duration: p.duration, delay: p.delay, ease: "linear" }}
        />
      ))}
    </div>
  );
};

/* ─── Candle with Realistic Flame ───────────────────────────────────── */
// const Candle = ({ className = "" }) => (
//   <div className={`pointer-events-none absolute ${className}`}>
//     <div className="relative flex flex-col items-center">
//       {/* flame glow halo */}
//       <motion.div
//         animate={{ scale: [1, 1.4, 0.9, 1.3, 1], opacity: [0.2, 0.5, 0.25, 0.45, 0.2] }}
//         transition={{ repeat: Infinity, duration: 2.8, ease: "easeInOut" }}
//         className="absolute -top-4 rounded-full"
//         style={{ width: 48, height: 48, background: "radial-gradient(circle, rgba(255,120,0,0.4) 0%, transparent 70%)", filter: "blur(8px)" }}
//       />
//       {/* inner flame */}
//       <motion.div
//         animate={{ scaleY: [1, 1.18, 0.88, 1.12, 1], scaleX: [1, 0.88, 1.05, 0.92, 1], y: [0, -2, 1, -1, 0] }}
//         transition={{ repeat: Infinity, duration: 0.9, ease: "easeInOut" }}
//         style={{
//           width: 10, height: 22,
//           background: "linear-gradient(180deg, #fff8c0 0%, #ffcc00 20%, #ff8800 50%, #cc2200 80%, transparent 100%)",
//           borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
//           filter: "blur(0.5px)",
//           boxShadow: "0 0 12px rgba(255,120,0,0.8), 0 0 24px rgba(200,50,0,0.4)",
//         }}
//       />
//       {/* wick */}
//       <div style={{ width: 2, height: 6, background: "#333", borderRadius: 1 }} />
//       {/* candle body */}
//       <motion.div
//         animate={{ opacity: [0.85, 1, 0.88, 0.95, 0.85] }}
//         transition={{ repeat: Infinity, duration: 2.8 }}
//         style={{
//           width: 16, height: 64,
//           background: "linear-gradient(180deg, #f0e8d8 0%, #d4c4a8 50%, #b8a888 100%)",
//           borderRadius: "2px 2px 4px 4px",
//           boxShadow: "inset -2px 0 4px rgba(0,0,0,0.3), 2px 0 4px rgba(255,200,100,0.15)",
//         }}
//       />
//       {/* wax drip */}
//       <div style={{ width: 18, height: 8, background: "#c8b894", borderRadius: "0 0 8px 8px", marginTop: -2 }} />
//     </div>
//   </div>
// );

/* ─── Roaming Spider ────────────────────────────────────────────────── */
// Each leg: { ox, oy } = attachment point on thorax (relative to centre 40,40)
// Two segments: upper (femur) goes outward at `baseAngle`, then lower (tibia) bends at knee
// 4-phase walk cycle alternates leg groups A (legs 0,2,4,6) and B (1,3,5,7)
// Legs on the LEFT side (index 0-3) point left, RIGHT side (4-7) point right.

const LEG_DEFS = [
  // Left side — 4 legs, root points staggered along thorax
  { side: -1, rootX: -7, rootY: -8,  baseAngle: 210, seg1: 18, seg2: 16 }, // L1 front
  { side: -1, rootX: -8, rootY: -2,  baseAngle: 195, seg1: 20, seg2: 18 }, // L2
  { side: -1, rootX: -8, rootY:  4,  baseAngle: 175, seg1: 20, seg2: 18 }, // L3
  { side: -1, rootX: -6, rootY: 10,  baseAngle: 160, seg1: 17, seg2: 15 }, // L4 back
  // Right side — mirror
  { side:  1, rootX:  7, rootY: -8,  baseAngle: -30, seg1: 18, seg2: 16 }, // R1 front
  { side:  1, rootX:  8, rootY: -2,  baseAngle: -15, seg1: 20, seg2: 18 }, // R2
  { side:  1, rootX:  8, rootY:  4,  baseAngle:   5, seg1: 20, seg2: 18 }, // R3
  { side:  1, rootX:  6, rootY: 10,  baseAngle:  20, seg1: 17, seg2: 15 }, // R4 back
];

// Walk cycle: phase 0 = group A raised (0,2,4,6), phase 1 = group B raised (1,3,5,7)
// "raised" leg swings forward slightly; "planted" leg stays wide
const WALK_OFFSETS = [
  // [groupA_angle_offset, groupB_angle_offset]  per phase
  [12, 0],   // phase 0: A swings forward
  [0, 12],   // phase 1: B swings forward
  [-6, 0],   // phase 2: A plants back
  [0, -6],   // phase 3: B plants back
];

function buildLegPath(def: typeof LEG_DEFS[0], angleOffset: number, cx: number, cy: number) {
  const toRad = (d: number) => (d * Math.PI) / 180;
  // root attachment
  const rx = cx + def.rootX;
  const ry = cy + def.rootY;
  // knee: femur segment going outward
  const kneeAngle = toRad(def.baseAngle + angleOffset);
  const kx = rx + Math.cos(kneeAngle) * def.seg1;
  const ky = ry + Math.sin(kneeAngle) * def.seg1;
  // tip: tibia bends downward relative to knee direction
  // bend angle: legs curve outward then tip downward (realistic spider posture)
  const tibiaAngle = toRad(def.baseAngle + angleOffset + def.side * 35);
  const tx = kx + Math.cos(tibiaAngle) * def.seg2;
  const ty = ky + Math.sin(tibiaAngle) * def.seg2;
  return { rx, ry, kx, ky, tx, ty };
}

const RoamingSpider = () => {
  const [pos, setPos] = useState({ x: 60, y: 15 });
  const [phase, setPhase] = useState(0);
  const [angle, setAngle] = useState(0);
  const animRef = useRef<number>();
  const posRef = useRef({ x: 60, y: 15 });
  const targetRef = useRef({ x: 60, y: 15 });
  const phaseRef = useRef(0);
  const frameRef = useRef(0);

  useEffect(() => {
    const pick = () => {
      targetRef.current = { x: 5 + Math.random() * 88, y: 5 + Math.random() * 82 };
    };
    pick();
    const id = setInterval(pick, 2800);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const loop = () => {
      const cur = posRef.current;
      const tgt = targetRef.current;
      const dx = tgt.x - cur.x;
      const dy = tgt.y - cur.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist > 0.2) {
        const speed = Math.min(0.5, dist * 0.035);
        cur.x += (dx / dist) * speed;
        cur.y += (dy / dist) * speed;
        posRef.current = { ...cur };
        setPos({ ...cur });
        setAngle(Math.atan2(dy, dx) * (180 / Math.PI));
        // advance walk phase every 6 frames
        frameRef.current++;
        if (frameRef.current % 6 === 0) {
          phaseRef.current = (phaseRef.current + 1) % 4;
          setPhase(phaseRef.current);
        }
      }
      animRef.current = requestAnimationFrame(loop);
    };
    animRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animRef.current!);
  }, []);

  // Canvas dimensions — spider drawn in a 80×80 box, centre at 40,40
  const cx = 40; const cy = 40;
  const [wo, ho] = [WALK_OFFSETS[phase][0], WALK_OFFSETS[phase][1]];

  const legs = LEG_DEFS.map((def, i) => {
    const groupA = i % 2 === 0;
    const offset = groupA ? wo : ho;
    return buildLegPath(def, offset, cx, cy);
  });

  return (
    <div className="pointer-events-none absolute inset-0 z-[15]" style={{ overflow: "hidden" }}>

      {/* Spider */}
      <div
        className="absolute"
        style={{
          left: `${pos.x}%`,
          top: `${pos.y}%`,
          transform: `translate(-50%, -50%) rotate(${angle + 90}deg)`,
          filter: "drop-shadow(0 0 8px rgba(200,0,0,0.5))",
        }}
      >
        <svg width={80} height={80} viewBox="0 0 80 80" style={{ overflow: "visible" }}>
          {/* ── Legs (drawn behind body) ── */}
          {legs.map((l, i) => (
            <g key={i}>
              {/* Femur (root → knee) */}
              <line
                x1={l.rx} y1={l.ry} x2={l.kx} y2={l.ky}
                stroke="rgba(160,155,130,0.9)" strokeWidth="2" strokeLinecap="round"
              />
              {/* Tibia (knee → tip) */}
              <line
                x1={l.kx} y1={l.ky} x2={l.tx} y2={l.ty}
                stroke="rgba(130,125,100,0.8)" strokeWidth="1.5" strokeLinecap="round"
              />
              {/* Knee joint dot */}
              <circle cx={l.kx} cy={l.ky} r={1.4} fill="rgba(140,130,100,0.9)" />
              {/* Tarsus tip */}
              <circle cx={l.tx} cy={l.ty} r={1} fill="rgba(110,105,80,0.8)" />
            </g>
          ))}

          {/* ── Pedipalps (small front feelers) ── */}
          <line x1={cx-4} y1={cy-14} x2={cx-9} y2={cy-24} stroke="rgba(150,145,120,0.7)" strokeWidth="1.2" strokeLinecap="round"/>
          <line x1={cx+4} y1={cy-14} x2={cx+9} y2={cy-24} stroke="rgba(150,145,120,0.7)" strokeWidth="1.2" strokeLinecap="round"/>
          <circle cx={cx-9} cy={cy-24} r={1.5} fill="rgba(130,120,95,0.8)"/>
          <circle cx={cx+9} cy={cy-24} r={1.5} fill="rgba(130,120,95,0.8)"/>

          {/* ── Abdomen (large, round, rear) ── */}
          <ellipse cx={cx} cy={cy+14} rx={11} ry={14}
            fill="#0d0d0d" stroke="rgba(160,0,0,0.5)" strokeWidth="0.8"/>
          {/* Hourglass / warning pattern */}
          <ellipse cx={cx} cy={cy+12} rx={6} ry={8} fill="#1c0000" opacity={0.9}/>
          <path d={`M${cx-3},${cy+9} L${cx},${cy+6} L${cx+3},${cy+9} L${cx},${cy+12}Z`} fill="rgba(200,0,0,0.45)"/>
          <path d={`M${cx-3},${cy+19} L${cx},${cy+22} L${cx+3},${cy+19} L${cx},${cy+16}Z`} fill="rgba(200,0,0,0.35)"/>
          {/* Abdomen sheen */}
          <ellipse cx={cx-3} cy={cy+9} rx={3} ry={2} fill="rgba(255,255,255,0.06)" transform={`rotate(-20,${cx-3},${cy+9})`}/>

          {/* ── Cephalothorax (thorax, smaller front part) ── */}
          <ellipse cx={cx} cy={cy-3} rx={9} ry={11}
            fill="#111" stroke="rgba(100,0,0,0.4)" strokeWidth="0.8"/>
          {/* Fovea (centre groove) */}
          <line x1={cx} y1={cy-11} x2={cx} y2={cy+3} stroke="rgba(80,0,0,0.5)" strokeWidth="0.8"/>

          {/* ── Eyes — 8 eyes in two rows ── */}
          {/* Front row (4 eyes) */}
          <circle cx={cx-5} cy={cy-13} r={2}   fill="#dd0000"/>
          <circle cx={cx-2} cy={cy-14} r={2.5} fill="#ff1a1a"/>
          <circle cx={cx+2} cy={cy-14} r={2.5} fill="#ff1a1a"/>
          <circle cx={cx+5} cy={cy-13} r={2}   fill="#dd0000"/>
          {/* Back row (4 eyes, smaller) */}
          <circle cx={cx-6} cy={cy-10} r={1.4} fill="#990000"/>
          <circle cx={cx-2} cy={cy-11} r={1.6} fill="#bb0000"/>
          <circle cx={cx+2} cy={cy-11} r={1.6} fill="#bb0000"/>
          <circle cx={cx+6} cy={cy-10} r={1.4} fill="#990000"/>
          {/* Eye glow */}
          <circle cx={cx-2} cy={cy-14} r={4} fill="rgba(255,30,30,0.2)"/>
          <circle cx={cx+2} cy={cy-14} r={4} fill="rgba(255,30,30,0.2)"/>

          {/* ── Chelicerae / Fangs ── */}
          <line x1={cx-3} y1={cy-17} x2={cx-5} y2={cy-22} stroke="#b0a080" strokeWidth="1.8" strokeLinecap="round"/>
          <line x1={cx+3} y1={cy-17} x2={cx+5} y2={cy-22} stroke="#b0a080" strokeWidth="1.8" strokeLinecap="round"/>
          {/* Fang tips */}
          <circle cx={cx-5} cy={cy-22} r={1.5} fill="#d0c090"/>
          <circle cx={cx+5} cy={cy-22} r={1.5} fill="#d0c090"/>

          {/* Pedicel (waist between thorax and abdomen) */}
          <ellipse cx={cx} cy={cy+5} rx={3} ry={2.5} fill="#151515"/>
        </svg>
      </div>
    </div>
  );
};

/* ─── Gothic Candelabra ─────────────────────────────────────────────── */
const GothicCandelabra = ({ className = "", flip = false }: { className?: string; flip?: boolean }) => (
  <div className={`pointer-events-none absolute ${className}`} style={{ transform: flip ? "scaleX(-1)" : undefined, opacity: 0.55 }}>
    <svg width="120" height="220" viewBox="0 0 120 220" fill="none">
      {/* ── Arm candles ── */}
      {/* Left arm */}
      <path d="M60 80 Q30 75 18 65" stroke="#4a2800" strokeWidth="4" fill="none" strokeLinecap="round"/>
      <rect x="14" y="42" width="9" height="28" rx="2" fill="#c8b080"/>
      <rect x="11" y="38" width="15" height="6" rx="1" fill="#b09060"/>
      {/* Left flame */}
      <motion.ellipse cx="18.5" cy="36" rx="3.5" ry="7"
        fill="url(#flameL)" style={{ transformOrigin: "18.5px 40px" }}/>
      <motion.ellipse cx="18.5" cy="36" rx="5" ry="9"
        fill="rgba(255,140,0,0.15)" style={{ transformOrigin: "18.5px 40px" }}/>
      {/* Right arm */}
      <path d="M60 80 Q90 75 102 65" stroke="#4a2800" strokeWidth="4" fill="none" strokeLinecap="round"/>
      <rect x="97" y="42" width="9" height="28" rx="2" fill="#c8b080"/>
      <rect x="94" y="38" width="15" height="6" rx="1" fill="#b09060"/>
      {/* Right flame */}
      <motion.ellipse cx="101.5" cy="36" rx="3.5" ry="7" fill="url(#flameR)" style={{ transformOrigin: "101.5px 40px" }}/>
      <motion.ellipse cx="101.5" cy="36" rx="5" ry="9" fill="rgba(255,140,0,0.15)" style={{ transformOrigin: "101.5px 40px" }}/>

      {/* ── Centre main candle ── */}
      <rect x="53" y="28" width="14" height="58" rx="2" fill="#d4bc88"/>
      <rect x="50" y="23" width="20" height="8" rx="2" fill="#c0a870"/>
      {/* Centre flame */}
      <ellipse cx="60" cy="20" rx="4.5" ry="9" fill="url(#flameC)"/>
      <ellipse cx="60" cy="20" rx="7" ry="12" fill="rgba(255,120,0,0.12)"/>

      {/* ── Centre shaft ── */}
      <rect x="57" y="86" width="6" height="90" rx="1" fill="#3a2010"/>
      {/* Decorative knobs on shaft */}
      <ellipse cx="60" cy="100" rx="8" ry="5" fill="#2e1a0a"/>
      <ellipse cx="60" cy="130" rx="7" ry="4" fill="#2e1a0a"/>
      <ellipse cx="60" cy="158" rx="6" ry="4" fill="#2e1a0a"/>
      {/* Gothic cross cutout on shaft */}
      <rect x="58" y="108" width="4" height="14" rx="1" fill="#1a0a00" opacity="0.6"/>
      <rect x="55" y="113" width="10" height="4" rx="1" fill="#1a0a00" opacity="0.6"/>

      {/* ── Base ── */}
      <ellipse cx="60" cy="180" rx="28" ry="8" fill="#2a1508"/>
      <ellipse cx="60" cy="178" rx="22" ry="6" fill="#3a2010"/>
      <ellipse cx="60" cy="195" rx="36" ry="10" fill="#1e0e05"/>
      <ellipse cx="60" cy="193" rx="30" ry="8" fill="#2a1508"/>
      {/* Base ornament */}
      <path d="M32 178 Q60 165 88 178" stroke="#4a2800" strokeWidth="2" fill="none"/>

      {/* Wax drips */}
      <path d="M55 78 Q53 90 55 96" stroke="#d4bc88" strokeWidth="3" fill="none" strokeLinecap="round"/>
      <path d="M65 78 Q67 88 64 93" stroke="#d4bc88" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      <path d="M15 62 Q13 70 15 75" stroke="#c8b080" strokeWidth="2" fill="none" strokeLinecap="round"/>
      <path d="M98 62 Q100 68 97 73" stroke="#c8b080" strokeWidth="2" fill="none" strokeLinecap="round"/>

      <defs>
        <radialGradient id="flameC" cx="50%" cy="80%" r="50%">
          <stop offset="0%" stopColor="#fff8c0"/>
          <stop offset="40%" stopColor="#ffaa00"/>
          <stop offset="100%" stopColor="rgba(200,50,0,0)"/>
        </radialGradient>
        <radialGradient id="flameL" cx="50%" cy="80%" r="50%">
          <stop offset="0%" stopColor="#fff0a0"/>
          <stop offset="40%" stopColor="#ff9900"/>
          <stop offset="100%" stopColor="rgba(180,40,0,0)"/>
        </radialGradient>
        <radialGradient id="flameR" cx="50%" cy="80%" r="50%">
          <stop offset="0%" stopColor="#fff0a0"/>
          <stop offset="40%" stopColor="#ff9900"/>
          <stop offset="100%" stopColor="rgba(180,40,0,0)"/>
        </radialGradient>
      </defs>
    </svg>
  </div>
);

/* ─── Flying Ravens ──────────────────────────────────────────────────── */
const RavenSVG = ({ size = 40 }: { size?: number }) => (
  <svg width={size} height={size * 0.65} viewBox="0 0 80 52" fill="#0a0a0a">
    {/* Body */}
    <ellipse cx="40" cy="30" rx="12" ry="8" fill="#111"/>
    {/* Head */}
    <ellipse cx="56" cy="22" rx="7" ry="6" fill="#111"/>
    {/* Beak */}
    <path d="M62 21 L70 23 L62 25 Z" fill="#1a1a1a"/>
    {/* Eye */}
    <circle cx="58" cy="21" r="1.5" fill="#8b0000"/>
    <circle cx="58.5" cy="20.5" r="0.6" fill="#ff2200"/>
    {/* Tail */}
    <path d="M28 30 Q18 35 12 40 Q20 34 28 36 Z" fill="#0d0d0d"/>
    {/* Left wing */}
    <path d="M40 25 Q25 10 8 8 Q20 16 28 28 Z" fill="#111"/>
    <path d="M40 25 Q22 5 4 2 Q16 14 26 26 Z" fill="#0d0d0d"/>
    {/* Right wing */}
    <path d="M40 25 Q55 10 72 8 Q60 16 52 28 Z" fill="#111"/>
    <path d="M40 25 Q58 5 76 2 Q64 14 54 26 Z" fill="#0d0d0d"/>
    {/* Feet */}
    <line x1="38" y1="36" x2="34" y2="44" stroke="#1a1a1a" strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="34" y1="44" x2="29" y2="46" stroke="#1a1a1a" strokeWidth="1" strokeLinecap="round"/>
    <line x1="34" y1="44" x2="32" y2="48" stroke="#1a1a1a" strokeWidth="1" strokeLinecap="round"/>
    <line x1="43" y1="36" x2="47" y2="44" stroke="#1a1a1a" strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="47" y1="44" x2="52" y2="46" stroke="#1a1a1a" strokeWidth="1" strokeLinecap="round"/>
    <line x1="47" y1="44" x2="49" y2="48" stroke="#1a1a1a" strokeWidth="1" strokeLinecap="round"/>
  </svg>
);

const FlyingRavens = () => {
  const ravens = useMemo(() => Array.from({ length: 6 }, (_, i) => ({
    top: `${8 + i * 13}%`,
    scale: 0.6 + (i % 3) * 0.3,
    duration: 22 + i * 4,
    delay: i * 3.5,
    dir: i % 2 === 0 ? 1 : -1,
    yWave: [0, -18, 8, -12, 5, 0],
    wingFreq: 0.35 + i * 0.04,
  })), []);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {ravens.map((r, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ top: r.top, scale: r.scale }}
          initial={{ x: r.dir > 0 ? "-12vw" : "112vw", opacity: 0 }}
          animate={{
            x: r.dir > 0 ? ["-12vw", "30vw", "65vw", "112vw"] : ["112vw", "68vw", "32vw", "-12vw"],
            y: r.yWave,
            opacity: [0, 0.7, 0.55, 0.65, 0.4, 0],
            scaleX: r.dir > 0 ? 1 : -1,
          }}
          transition={{ repeat: Infinity, duration: r.duration, delay: r.delay, ease: "linear" }}
        >
          {/* Wing flap */}
          <motion.div
            animate={{ scaleY: [1, 0.55, 1.1, 0.6, 1] }}
            transition={{ repeat: Infinity, duration: r.wingFreq, ease: "easeInOut" }}
            style={{ transformOrigin: "center 60%" }}
          >
            <RavenSVG size={44} />
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
};

/* ─── Cursed Grimoire Pages ──────────────────────────────────────────── */
const GrimoirePages = () => {
  const pages = useMemo(() => Array.from({ length: 5 }, (_, i) => ({
    startX: `${10 + i * 18}%`,
    startY: `${-5 - i * 3}%`,
    duration: 14 + i * 3,
    delay: i * 2.8,
    rotStart: -15 + i * 8,
    xDrift: (i % 2 === 0 ? 1 : -1) * (20 + i * 10),
  })), []);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden z-[3]">
      {pages.map((p, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ left: p.startX, top: p.startY }}
          animate={{
            y: ["-8vh", "108vh"],
            x: [0, p.xDrift * 0.4, p.xDrift * 0.8, p.xDrift],
            rotate: [p.rotStart, p.rotStart + 80, p.rotStart + 200, p.rotStart + 310],
            opacity: [0, 0.55, 0.45, 0.3, 0],
          }}
          transition={{ repeat: Infinity, duration: p.duration, delay: p.delay, ease: "linear" }}
        >
          <svg width="36" height="46" viewBox="0 0 36 46" fill="none">
            {/* Aged parchment page */}
            <path d="M4 2 Q2 1 1 4 L1 42 Q1 45 4 45 L32 45 Q35 44 35 41 L35 8 Q35 5 32 4 Z"
              fill="#1a1008" stroke="rgba(120,80,20,0.4)" strokeWidth="0.5"/>
            {/* Page curl top-right */}
            <path d="M26 2 Q32 2 35 8 Q30 6 26 8 Z" fill="#0f0a04" stroke="rgba(100,60,10,0.3)" strokeWidth="0.4"/>
            {/* Aged staining */}
            <ellipse cx="18" cy="24" rx="10" ry="14" fill="rgba(80,40,0,0.15)"/>
            {/* Mystical text lines */}
            <line x1="6" y1="14" x2="28" y2="14" stroke="rgba(120,60,0,0.5)" strokeWidth="0.8"/>
            <line x1="6" y1="18" x2="25" y2="18" stroke="rgba(120,60,0,0.4)" strokeWidth="0.8"/>
            <line x1="6" y1="22" x2="27" y2="22" stroke="rgba(120,60,0,0.4)" strokeWidth="0.8"/>
            <line x1="6" y1="26" x2="22" y2="26" stroke="rgba(120,60,0,0.35)" strokeWidth="0.8"/>
            <line x1="6" y1="30" x2="26" y2="30" stroke="rgba(120,60,0,0.35)" strokeWidth="0.8"/>
            <line x1="6" y1="34" x2="20" y2="34" stroke="rgba(120,60,0,0.3)" strokeWidth="0.8"/>
            {/* Blood drop stain */}
            <circle cx="24" cy="28" r="2" fill="rgba(140,0,0,0.4)"/>
            <path d="M24 30 Q23 33 24 35" stroke="rgba(140,0,0,0.3)" strokeWidth="1" fill="none" strokeLinecap="round"/>
            {/* Runic symbol */}
            <path d="M13 8 L13 12 M11 9 L15 9 M11 11 L15 11"
              stroke="rgba(160,80,0,0.6)" strokeWidth="0.8" fill="none" strokeLinecap="round"/>
            <path d="M18 8 L20 12 M16 10 L22 10"
              stroke="rgba(160,80,0,0.6)" strokeWidth="0.8" fill="none" strokeLinecap="round"/>
          </svg>
        </motion.div>
      ))}
    </div>
  );
};

/* ─── Ornate Divider ────────────────────────────────────────────────── */
const OrnateDivider = () => (
  <div className="flex items-center gap-4 my-8 opacity-60">
    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-red-800 to-red-600" />
    <svg width="32" height="32" viewBox="0 0 32 32" fill="#8b0000">
      <path d="M16 2 L18 10 L26 10 L20 15 L22 23 L16 18 L10 23 L12 15 L6 10 L14 10 Z" opacity="0.8"/>
      <circle cx="16" cy="16" r="3" fill="#c00000"/>
    </svg>
    <div className="h-px flex-1 bg-gradient-to-l from-transparent via-red-800 to-red-600" />
  </div>
);

/* ─── Gothic Castle Silhouette ──────────────────────────────────────── */
const CastleSilhouette = () => (
  <div className="pointer-events-none absolute inset-x-0 bottom-0 overflow-hidden" style={{ height: 320 }}>
    <svg viewBox="0 0 1400 320" preserveAspectRatio="xMidYMax slice" className="w-full h-full" style={{ opacity: 0.55 }}>
      <defs>
        <linearGradient id="castleGrad" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#1a0a0a"/>
          <stop offset="100%" stopColor="#050505"/>
        </linearGradient>
      </defs>
      {/* Ground */}
      <rect x="0" y="260" width="1400" height="60" fill="url(#castleGrad)"/>
      {/* Hills */}
      <ellipse cx="200" cy="280" rx="250" ry="60" fill="#0a0505"/>
      <ellipse cx="1200" cy="275" rx="280" ry="55" fill="#0a0505"/>
      {/* Left tower */}
      <rect x="80" y="120" width="60" height="160" fill="#0d0606"/>
      <rect x="70" y="100" width="18" height="25" fill="#0d0606"/>
      <rect x="96" y="100" width="18" height="25" fill="#0d0606"/>
      <rect x="122" y="100" width="18" height="25" fill="#0d0606"/>
      <rect x="98" y="155" width="22" height="30" fill="#220000" opacity="0.8"/>
      {/* Main tower center */}
      <rect x="570" y="40" width="90" height="240" fill="#0d0606"/>
      <rect x="555" y="15" width="22" height="30" fill="#0d0606"/>
      <rect x="584" y="10" width="22" height="35" fill="#0d0606"/>
      <rect x="614" y="15" width="22" height="30" fill="#0d0606"/>
      <rect x="643" y="15" width="22" height="30" fill="#0d0606"/>
      {/* Center window glow */}
      <motion.rect x="600" y="100" width="30" height="45" rx="15" ry="5" fill="#3a0000" opacity="0.9"/>
      {/* Right tower */}
      <rect x="1250" y="140" width="55" height="140" fill="#0d0606"/>
      <rect x="1240" y="120" width="16" height="24" fill="#0d0606"/>
      <rect x="1264" y="120" width="16" height="24" fill="#0d0606"/>
      <rect x="1288" y="120" width="16" height="24" fill="#0d0606"/>
      {/* Walls */}
      <path d="M140 200 L300 185 L400 200 L500 180 L570 190 L570 280 L140 280 Z" fill="#0a0505"/>
      <path d="M660 190 L800 175 L950 185 L1100 178 L1250 188 L1250 280 L660 280 Z" fill="#0a0505"/>
      {/* Gate arch */}
      <path d="M620 280 L620 230 Q630 210 650 210 Q670 210 680 230 L680 280 Z" fill="#050202"/>
      {/* Dead trees */}
      <line x1="350" y1="260" x2="350" y2="160" stroke="#0a0505" strokeWidth="6"/>
      <line x1="350" y1="200" x2="310" y2="170" stroke="#0a0505" strokeWidth="3"/>
      <line x1="350" y1="190" x2="385" y2="165" stroke="#0a0505" strokeWidth="3"/>
      <line x1="350" y1="175" x2="330" y2="155" stroke="#0a0505" strokeWidth="2"/>
      <line x1="1050" y1="260" x2="1050" y2="155" stroke="#0a0505" strokeWidth="5"/>
      <line x1="1050" y1="195" x2="1020" y2="168" stroke="#0a0505" strokeWidth="3"/>
      <line x1="1050" y1="185" x2="1080" y2="162" stroke="#0a0505" strokeWidth="3"/>
    </svg>
  </div>
);

/* ─── Section Heading ───────────────────────────────────────────────── */
const SectionHeading = ({ eyebrow, title, text }: { eyebrow: string; title: string; text?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.4 }}
    transition={{ duration: 0.8 }}
    className="mx-auto mb-12 max-w-3xl text-center"
  >
    <p className="mb-3 text-xs uppercase tracking-[0.5em] text-red-400/80">{eyebrow}</p>
    <h2 className="text-4xl font-semibold tracking-[0.08em] text-zinc-100 md:text-5xl" style={{ fontFamily: "'Cinzel Decorative', 'Cinzel', serif" }}>
      {title}
    </h2>
    {text && <p className="mt-4 text-base leading-8 text-zinc-400 md:text-lg" style={{ fontFamily: "'IM Fell English', 'Cormorant Garamond', serif" }}>{text}</p>}
    <OrnateDivider />
  </motion.div>
);

/* ─── Glowing Detail Card ───────────────────────────────────────────── */
const DetailCard = ({ icon: Icon, label, value }: { icon: any; label: string; value: string }) => (
  <motion.div whileHover={{ y: -4, scale: 1.02 }} transition={{ type: "spring", stiffness: 300 }}>
    <div className="rounded-2xl border border-red-950/80 bg-black/50 p-5 shadow-[0_0_25px_rgba(120,0,0,0.15)] backdrop-blur-sm hover:shadow-[0_0_40px_rgba(180,0,0,0.2)] transition-shadow">
      <div className="mb-2 flex items-center gap-3 text-red-400">
        <Icon className="h-4 w-4" />
        <span className="text-[10px] uppercase tracking-[0.4em] text-zinc-500">{label}</span>
      </div>
      <p className="text-base text-zinc-100 md:text-lg" style={{ fontFamily: "'IM Fell English', serif" }}>{value}</p>
    </div>
  </motion.div>
);

/* ─── Countdown Unit ────────────────────────────────────────────────── */
const CountdownUnit = ({ label, value }: { label: string; value: number }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="relative overflow-hidden rounded-2xl border border-red-900/60 bg-gradient-to-b from-red-950/30 to-black/60 px-4 py-5 text-center shadow-inner"
  >
    <motion.div
      key={value}
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 500 }}
      className="text-4xl font-bold text-red-200 md:text-5xl tabular-nums"
      style={{ fontFamily: "'Cinzel', serif", textShadow: "0 0 20px rgba(220,0,0,0.5)" }}
    >
      {String(value).padStart(2, "0")}
    </motion.div>
    <div className="mt-1.5 text-[10px] uppercase tracking-[0.4em] text-zinc-600">{label}</div>
    {/* Red pulse dot */}
    <motion.div
      animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
      transition={{ repeat: Infinity, duration: 1.5 }}
      className="absolute bottom-1.5 left-1/2 -translate-x-1/2 h-1 w-1 rounded-full bg-red-700"
    />
  </motion.div>
);

/* ─── Story Card ────────────────────────────────────────────────────── */
const StoryCard = ({ title, text, index }: { title: string; text: string; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 50, rotateX: 8 }}
    whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration: 0.7, delay: index * 0.15 }}
    whileHover={{ y: -8, boxShadow: "0 20px 60px rgba(150,0,0,0.25)" }}
    className="h-full rounded-[2rem] border border-red-950/70 bg-gradient-to-b from-[#120606] to-[#080404] p-7 backdrop-blur-sm"
    style={{ transformStyle: "preserve-3d" }}
  >
    <motion.div
      animate={{ rotate: [0, 360] }}
      transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
      className="mb-5 flex h-12 w-12 items-center justify-center rounded-full border border-red-900/70 bg-red-950/30"
    >
      <ScrollText className="h-5 w-5 text-red-400" />
    </motion.div>
    <h3 className="text-xl font-semibold text-zinc-100" style={{ fontFamily: "'Cinzel', serif" }}>{title}</h3>
    <p className="mt-3 leading-7 text-zinc-400 text-sm" style={{ fontFamily: "'IM Fell English', 'Cormorant Garamond', serif" }}>{text}</p>
  </motion.div>
);

/* ─── Gallery Card ──────────────────────────────────────────────────── */
const GalleryCard = ({ photo, index }: { photo: any; index: number }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9, y: 30 }}
    whileInView={{ opacity: 1, scale: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.6, delay: index * 0.1 }}
    whileHover={{ y: -10, rotate: index % 2 === 0 ? 1 : -1 }}
    className="group"
  >
    <div className="relative overflow-hidden rounded-[2rem] border border-red-950/80 bg-[#0d0404] p-3 shadow-[0_0_30px_rgba(100,0,0,0.2)] transition-shadow group-hover:shadow-[0_0_60px_rgba(180,0,0,0.35)]">
      <div className="relative aspect-[3/4] overflow-hidden rounded-[1.5rem] bg-[#0a0202]">
        <img src={photo.src} alt={photo.alt} className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
          onError={(e) => { e.currentTarget.style.display = "none"; (e.currentTarget.nextSibling as HTMLElement).style.display = "flex"; }}
        />
        <div className="hidden h-full w-full items-center justify-center bg-[#0a0202] text-center">
          <div>
            <Camera className="mx-auto h-8 w-8 text-red-400" />
            <p className="mt-3 px-6 text-xs text-zinc-500">Add photo at {photo.src}</p>
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
        {/* Hover vignette */}
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          className="absolute inset-0 bg-red-950/30"
        />
        <div className="absolute bottom-5 left-5 right-5">
          <p className="text-[10px] uppercase tracking-[0.4em] text-red-400/80">Scene</p>
          <h3 className="mt-1.5 text-xl font-semibold text-zinc-100" style={{ fontFamily: "'Cinzel', serif" }}>{photo.title}</h3>
        </div>
      </div>
    </div>
  </motion.div>
);

/* ─── Parallax Section Wrapper ──────────────────────────────────────── */
const ParallaxSection = ({ children, id, className = "" }: { children: React.ReactNode; id: string; className?: string }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

  return (
    <section id={id} ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div style={{ y }} className="relative">
        {children}
      </motion.div>
    </section>
  );
};

/* ─── Opening Gate ──────────────────────────────────────────────────── */
const OpeningGate = ({ onEnter }: { onEnter: () => void }) => {
  const [hovering, setHovering] = useState(false);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 1, delay: 0.5 } }}
        className="fixed inset-0 z-[80] overflow-hidden"
        style={{ background: "#040202" }}
      >
        {/* Gate panels */}
        <motion.div
          initial={{ x: 0 }}
          exit={{ x: "-100%", transition: { duration: 1.4, ease: [0.76, 0, 0.24, 1] } }}
          className="absolute inset-y-0 left-0 w-1/2 border-r border-red-900/30"
          style={{ background: "linear-gradient(160deg, #1a0505, #0a0202, #050101)" }}
        >
          <GothicCandelabra className="left-4 bottom-16 hidden md:block" />
          {/* Vertical ornamental border */}
          <div className="absolute right-0 inset-y-0 w-px bg-gradient-to-b from-transparent via-red-900/60 to-transparent" />
        </motion.div>
        <motion.div
          initial={{ x: 0 }}
          exit={{ x: "100%", transition: { duration: 1.4, ease: [0.76, 0, 0.24, 1] } }}
          className="absolute inset-y-0 right-0 w-1/2 border-l border-red-900/30"
          style={{ background: "linear-gradient(200deg, #1a0505, #0a0202, #050101)" }}
        >
          <GothicCandelabra className="right-4 bottom-16 hidden md:block" flip />
          <div className="absolute left-0 inset-y-0 w-px bg-gradient-to-b from-transparent via-red-900/60 to-transparent" />
        </motion.div>

        {/* Blood drip at top */}
        <BloodDrips />

        {/* Gothic atmosphere */}
        <GrimoirePages />
        <FlyingRavens />

        {/* Roaming spider */}
        <RoamingSpider />

        {/* Center content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 1.05, transition: { duration: 0.4 } }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="relative z-10 flex min-h-screen items-center justify-center px-6 text-center"
        >
          <div className="max-w-2xl">
            {/* Bat icon */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 3 }}
              className="mx-auto mb-6 text-red-800/60"
            >
              <BatSVG size={64} />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, letterSpacing: "0.1em" }}
              animate={{ opacity: 1, letterSpacing: "0.45em" }}
              transition={{ delay: 0.6, duration: 1 }}
              className="mb-4 text-xs uppercase text-red-400/80"
            >
              An Invitation from the Shadows
            </motion.p>

            <motion.h1
              className="mb-2 text-6xl font-bold text-red-800 md:text-8xl"
              style={{
                fontFamily: "'UnifrakturMaguntia', 'Cinzel Decorative', serif",
                textShadow: "0 0 40px rgba(180,0,0,0.4), 0 0 80px rgba(100,0,0,0.2)",
                letterSpacing: "0.04em",
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 1.2 }}
            >
              Maneesha
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
              className="text-red-600/80 text-xl"
              style={{ fontFamily: "'IM Fell English', serif", fontStyle: "italic" }}
            >
              &amp;
            </motion.p>
            <motion.h1
              className="text-5xl font-bold text-red-800 md:text-7xl"
              style={{
                fontFamily: "'UnifrakturMaguntia', 'Cinzel Decorative', serif",
                textShadow: "0 0 40px rgba(180,0,0,0.4), 0 0 80px rgba(100,0,0,0.2)",
                letterSpacing: "0.04em",
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3, duration: 1 }}
            >
              Ruchini
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6 }}
              className="mx-auto mt-6 max-w-xl text-base leading-7 text-zinc-400"
              style={{ fontFamily: "'IM Fell English', serif" }}
            >
              The castle doors await. Enter a night of candlelight, crimson romance, and vows meant for eternity.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2 }}
            >
              <motion.button
                onClick={onEnter}
                onHoverStart={() => setHovering(true)}
                onHoverEnd={() => setHovering(false)}
                whileTap={{ scale: 0.96 }}
                className="relative mt-10 overflow-hidden rounded-full border border-red-800/70 px-10 py-4 text-sm uppercase tracking-[0.35em] text-red-100 transition-colors"
                style={{ background: "linear-gradient(135deg, #5a0000, #3a0000)" }}
              >
                <motion.div
                  animate={{ x: hovering ? "0%" : "-100%" }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(135deg, #8a0000, #5a0000)" }}
                />
                <span className="relative z-10">Enter the Castle</span>
              </motion.button>
            </motion.div>
          </div>
        </motion.div>

        {/* Bottom mist */}
        <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
          style={{ background: "linear-gradient(0deg, rgba(20,5,5,0.8) 0%, transparent 100%)" }} />
      </motion.div>
    </AnimatePresence>
  );
};

/* ─── Main Component ────────────────────────────────────────────────── */
export default function GothicWeddingInvitation() {
  const weddingDate = new Date("2026-05-26T11:00:00");
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [musicOn, setMusicOn] = useState(false);
  const [audioError, setAudioError] = useState("");
  const [accepted, setAccepted] = useState(true);
  const [guestCount, setGuestCount] = useState("2");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showOpening, setShowOpening] = useState(true);
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Mouse parallax for hero
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const heroX = useSpring(useTransform(mouseX, [0, window.innerWidth], [-15, 15]), { stiffness: 80, damping: 30 });
  const heroY = useSpring(useTransform(mouseY, [0, window.innerHeight], [-10, 10]), { stiffness: 80, damping: 30 });

  useEffect(() => {
    const onMouse = (e: MouseEvent) => { mouseX.set(e.clientX); mouseY.set(e.clientY); };
    window.addEventListener("mousemove", onMouse);
    return () => window.removeEventListener("mousemove", onMouse);
  }, []);

  useEffect(() => {
    const tick = () => {
      const diff = weddingDate.getTime() - Date.now();
      if (diff <= 0) { setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 }); return; }
      setTimeLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff / 3600000) % 24),
        minutes: Math.floor((diff / 60000) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    fn();
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const startMusic = async () => {
    const audio = audioRef.current;
    if (!audio) return false;
    try { audio.volume = 0.45; audio.muted = false; await audio.play(); setMusicOn(true); setAudioError(""); return true; }
    catch { setMusicOn(false); setAudioError("Music could not start."); return false; }
  };

  const stopMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause(); audio.currentTime = 0; setMusicOn(false); setAudioError("");
  };

  const handleEnter = async () => { setShowOpening(false); await startMusic(); };
  const handleFieldChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setFormData(prev => ({ ...prev, [field]: e.target.value }));

  const copyInviteLink = async () => {
    try { await navigator.clipboard.writeText(appConfig.inviteUrl); setCopied(true); setTimeout(() => setCopied(false), 1800); } catch {}
  };

  const payload = { ...formData, attending: accepted, guestCount, submittedAt: new Date().toISOString() };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setSubmitting(true); setSubmitStatus("");
    try {
      if (appConfig.rsvp.webhookUrl) {
        await fetch(appConfig.rsvp.webhookUrl, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
        setSubmitStatus("Saved");
      } else {
        const sub = encodeURIComponent(`RSVP - ${formData.name || "Guest"}`);
        const bod = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nAttending: ${accepted ? "Yes" : "No"}\nGuests: ${guestCount}\nMessage: ${formData.message}`);
        window.location.href = `mailto:${appConfig.rsvp.emailTo}?subject=${sub}&body=${bod}`;
        setSubmitStatus("Email opened");
      }
      setFormSubmitted(true);
    } catch { setSubmitStatus("Submission failed"); }
    finally { setSubmitting(false); }
  };

  return (
    <div
      className="min-h-screen overflow-x-hidden text-zinc-100 selection:bg-red-900/60"
      style={{ background: "#060202", fontFamily: "'IM Fell English', 'Cormorant Garamond', Georgia, serif", cursor: "default" }}
    >
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=MedievalSharp&family=UnifrakturMaguntia&family=Cinzel+Decorative:wght@400;700&family=Cinzel:wght@400;600;700&family=IM+Fell+English:ital@0;1&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=Sorts+Mill+Goudy:ital@0;1&display=swap');
        ::selection { background: rgba(120,0,0,0.5); }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #060202; }
        ::-webkit-scrollbar-thumb { background: #4a0000; border-radius: 3px; }
        .font-medieval { font-family: 'UnifrakturMaguntia', 'MedievalSharp', 'Cinzel Decorative', serif !important; }
        .font-cinzel { font-family: 'Cinzel Decorative', 'Cinzel', serif !important; }
        .font-cinzel-reg { font-family: 'Cinzel', serif !important; }
        .font-imfell { font-family: 'IM Fell English', 'Sorts Mill Goudy', 'Cormorant Garamond', serif !important; }
        .font-cormorant { font-family: 'Cormorant Garamond', 'Sorts Mill Goudy', Georgia, serif !important; }
      `}</style>

      {showOpening && <OpeningGate onEnter={handleEnter} />}
      <LightningFlash />

      <audio ref={audioRef} loop preload="auto" autoPlay playsInline
        onError={() => { setMusicOn(false); setAudioError("Audio file failed to load."); }}
      >
        <source src={draculeMusic} type="audio/mpeg" />
      </audio>

      {/* ── NAV ── */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className={`fixed inset-x-4 top-4 z-50 mx-auto max-w-6xl grid grid-cols-[1fr_auto] md:grid-cols-[1fr_auto_1fr] items-center rounded-full border px-4 py-3 backdrop-blur-xl transition-all duration-500 md:inset-x-6 md:top-6 md:px-6 ${
          scrolled ? "border-red-900/80 bg-black/85 shadow-[0_0_40px_rgba(120,0,0,0.25)]" : "border-red-950/40 bg-black/40"
        }`}
      >
        <div className="flex items-center gap-3">
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-red-900/70 bg-red-950/30 text-red-400"
          >
            <Castle className="h-4 w-4" />
          </motion.div>
          <div>
            <p className="text-[9px] uppercase tracking-[0.4em] text-zinc-600">Eternal Invitation</p>
            <p className="text-sm text-zinc-200" style={{ fontFamily: "'Cinzel', serif", letterSpacing: "0.05em" }}>Maneesha & Ruchini</p>
          </div>
        </div>

        <nav className="hidden md:flex items-center justify-center gap-6">
          {navigation.map((item) => (
            <a key={item.href} href={item.href} className="text-sm text-zinc-400 transition-colors hover:text-red-300" style={{ fontFamily: "'Cinzel', serif", fontSize: 12 }}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center justify-end gap-2">
          <Button onClick={musicOn ? stopMusic : startMusic} variant="outline"
            className="rounded-full border-red-900/70 bg-black/50 px-4 text-zinc-200 hover:bg-red-950/30 hover:border-red-700"
          >
            <motion.div animate={musicOn ? { rotate: [0, 360] } : {}} transition={{ repeat: Infinity, duration: 3, ease: "linear" }}>
              <Music4 className="mr-2 h-4 w-4" />
            </motion.div>
            <span className="hidden sm:inline text-xs tracking-widest">{musicOn ? "PLAYING" : "SILENCE"}</span>
          </Button>
          <Button onClick={() => setMenuOpen(p => !p)} variant="outline"
            className="rounded-full border-red-900/70 bg-black/50 px-3 text-zinc-200 hover:bg-red-950/30 md:hidden"
          >
            {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </Button>
        </div>
      </motion.header>

      {audioError && (
        <div className="fixed left-4 right-4 top-24 z-40 mx-auto max-w-md rounded-2xl border border-red-900/60 bg-black/90 px-4 py-3 text-center text-sm text-red-300 backdrop-blur-xl">
          {audioError}
        </div>
      )}

      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ opacity: 0, y: -12, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -12, scale: 0.97 }}
            className="fixed left-4 right-4 top-20 z-40 rounded-[2rem] border border-red-900/60 bg-black/95 p-5 shadow-[0_0_50px_rgba(120,0,0,0.3)] backdrop-blur-xl md:hidden"
          >
            {navigation.map((item) => (
              <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)}
                className="block rounded-xl border border-red-950/40 bg-red-950/10 px-4 py-3 mb-2 text-zinc-300 transition hover:bg-red-950/25 hover:border-red-800/50"
                style={{ fontFamily: "'Cinzel', serif", fontSize: 13, letterSpacing: "0.1em" }}
              >
                {item.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ───────────────────────── HERO ───────────────────────────────── */}
      <div className="relative" style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(100,0,0,0.25) 0%, transparent 55%), #060202" }}>
        <BloodDrips />
        <DeepFog />
        <DramaticBats />
        <AshParticles />
        <CastleSilhouette />
        <FlyingRavens />
        <GrimoirePages />
        <GothicCandelabra className="left-0 top-24 hidden xl:block" />
        <GothicCandelabra className="right-0 top-24 hidden xl:block" flip />

        {/* Subtle grid texture */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)", backgroundSize: "50px 50px" }}
        />

        <section id="home" className="relative flex min-h-screen items-center px-6 py-28 md:px-10 lg:px-16">
          <div className="mx-auto w-full max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="relative overflow-hidden rounded-[2.5rem] border border-red-950/60 bg-black/50 px-6 py-12 shadow-[0_0_100px_rgba(100,0,0,0.2),inset_0_0_60px_rgba(80,0,0,0.1)] backdrop-blur-sm md:px-10 md:py-16 lg:px-14"
            >
              {/* Corner ornaments */}
              {[["left-4 top-4", ""], ["right-4 top-4", "rotate-90"], ["bottom-4 left-4", "-rotate-90"], ["bottom-4 right-4", "rotate-180"]].map(([pos, rot], i) => (
                <div key={i} className={`absolute h-20 w-20 ${pos}`}>
                  <div className={`absolute inset-0 rounded-tl-[2.5rem] border-l border-t border-red-900/50 ${rot}`} />
                  <motion.div animate={{ opacity: [0.4, 1, 0.4], scale: [0.9, 1.1, 0.9] }} transition={{ repeat: Infinity, duration: 2 + i * 0.5 }}
                    className={`absolute left-4 top-4 h-2 w-2 rounded-full bg-red-700`}
                    style={{ boxShadow: "0 0 12px rgba(200,0,0,0.8)" }}
                  />
                </div>
              ))}

              <motion.div style={{ x: heroX, y: heroY }} className="mx-auto max-w-6xl">
                {/* Eyebrow */}
                <div className="mb-10 flex flex-col items-center text-center">
                  <motion.div
                    animate={{ y: [0, -6, 0] }}
                    transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
                    className="mb-5 flex items-center gap-2 rounded-full border border-red-900/60 bg-red-950/20 px-5 py-2"
                  >
                    <motion.div animate={{ rotate: [0, 15, -15, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
                      <MoonStar className="h-4 w-4 text-red-400" />
                    </motion.div>
                    <span className="text-xs uppercase tracking-[0.4em] text-red-300/80">Gothic Wedding Invitation</span>
                  </motion.div>

                  <motion.blockquote
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 1.5 }}
                    className="max-w-2xl text-xl italic text-zinc-400 leading-9"
                    style={{ fontFamily: "'IM Fell English', 'Cormorant Garamond', serif", fontStyle: "italic" }}
                  >
                    <span className="text-5xl text-red-700/80 leading-none font-bold mr-1">"</span>
                    {eventDetails.quote}
                    <span className="text-5xl text-red-700/80 leading-none font-bold ml-1">"</span>
                  </motion.blockquote>
                </div>

                <div className="grid items-center gap-12 lg:grid-cols-[1.2fr_0.8fr]">
                  <div>
                    <motion.p initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}
                      className="mb-2 text-base italic text-zinc-500"
                      style={{ fontFamily: "'IM Fell English', serif", fontStyle: "italic" }}
                    >
                      {eventDetails.groomParents}
                    </motion.p>

                    <motion.h1
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                      className="text-7xl font-black leading-none text-red-800 md:text-9xl"
                      style={{
                        fontFamily: "'UnifrakturMaguntia', 'Cinzel Decorative', serif",
                        textShadow: "0 0 60px rgba(180,0,0,0.35), 0 2px 0 rgba(80,0,0,0.5)",
                        letterSpacing: "0.03em",
                      }}
                    >
                      <motion.span whileHover={{ textShadow: "0 0 30px rgba(255,50,50,0.6)" }}>
                        {eventDetails.groom}
                      </motion.span>
                    </motion.h1>

                    <motion.div
                      initial={{ scaleX: 0, opacity: 0 }}
                      animate={{ scaleX: 1, opacity: 1 }}
                      transition={{ delay: 0.8, duration: 0.8 }}
                      className="my-6 flex items-center gap-4"
                    >
                      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-red-800 to-transparent" />
                      <motion.div
                        animate={{ rotate: [0, 360] }}
                        transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
                        className="flex h-14 w-14 items-center justify-center rounded-full border border-red-800/70 bg-red-950/30"
                        style={{ boxShadow: "0 0 25px rgba(180,0,0,0.3)" }}
                      >
                        <Heart className="h-6 w-6 text-red-500" fill="#7f0000" />
                      </motion.div>
                      <div className="h-px flex-1 bg-gradient-to-l from-transparent via-red-800 to-transparent" />
                    </motion.div>

                    <motion.p initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.9 }}
                      className="mb-2 text-base italic text-zinc-500"
                      style={{ fontFamily: "'IM Fell English', serif", fontStyle: "italic" }}
                    >
                      {eventDetails.brideParents}
                    </motion.p>

                    <motion.h2
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1 }}
                      className="text-6xl font-black leading-none text-red-800 md:text-8xl"
                      style={{
                        fontFamily: "'UnifrakturMaguntia', 'Cinzel Decorative', serif",
                        textShadow: "0 0 60px rgba(180,0,0,0.35), 0 2px 0 rgba(80,0,0,0.5)",
                        letterSpacing: "0.03em",
                      }}
                    >
                      <motion.span whileHover={{ textShadow: "0 0 30px rgba(255,50,50,0.6)" }}>
                        {eventDetails.bride}
                      </motion.span>
                    </motion.h2>

                    <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1 }}
                      className="mt-8 max-w-xl text-lg leading-8 text-zinc-400"
                    style={{ fontFamily: "'IM Fell English', 'Cormorant Garamond', serif" }}
                    >
                      We invite you to enter a night of dark romance, timeless devotion, and haunting elegance as we begin our eternal story together.
                    </motion.p>

                    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2 }}
                      className="mt-6 flex flex-wrap gap-2"
                    >
                      {["BLACK & CRIMSON", "DRACULA INSPIRED", "ELEGANCE OF DARKNESS"].map((badge, i) => (
                        <motion.span
                          key={badge}
                          whileHover={{ scale: 1.05, borderColor: "rgba(180,0,0,0.6)" }}
                          className="rounded-full border border-red-900/50 bg-red-950/15 px-4 py-1.5 text-[11px] tracking-[0.3em] text-red-300/80"
                        >
                          {badge}
                        </motion.span>
                      ))}
                    </motion.div>

                    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.3 }}
                      className="mt-10 flex flex-wrap gap-4"
                    >
                      <motion.a href="#rsvp" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                        className="rounded-full px-8 py-3 text-sm uppercase tracking-[0.3em] text-white transition-all"
                        style={{ background: "linear-gradient(135deg, #8b0000, #5a0000)", boxShadow: "0 0 25px rgba(140,0,0,0.4)" }}
                      >
                        RSVP Your Presence
                      </motion.a>
                      <motion.a href="#story" whileHover={{ scale: 1.04, borderColor: "rgba(180,0,0,0.6)" }} whileTap={{ scale: 0.97 }}
                        className="rounded-full border border-red-900/60 bg-black/30 px-8 py-3 text-sm uppercase tracking-[0.3em] text-zinc-300 transition-all hover:bg-red-950/20"
                      >
                        Our Story
                      </motion.a>
                    </motion.div>
                  </div>

                  {/* Countdown panel */}
                  <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7, duration: 0.8 }}
                    className="relative"
                  >
                    <div className="absolute inset-0 rounded-[2rem] blur-3xl opacity-30" style={{ background: "radial-gradient(circle, rgba(120,0,0,0.4), transparent 70%)" }} />
                    <div className="relative overflow-hidden rounded-[2rem] border border-red-950/70 bg-gradient-to-b from-[#180606]/80 to-[#080202]/90 p-7 shadow-[0_0_50px_rgba(100,0,0,0.2)] backdrop-blur-sm">
                      <div className="mb-5 flex items-center justify-between">
                        <div>
                          <p className="text-[10px] uppercase tracking-[0.4em] text-zinc-600">The Night Awaits</p>
                          <h3 className="mt-1.5 text-xl font-semibold text-zinc-100" style={{ fontFamily: "'Cinzel', serif" }}>Count the Hours</h3>
                        </div>
                        <motion.div animate={{ rotate: [0, 360] }} transition={{ repeat: Infinity, duration: 15, ease: "linear" }}>
                          <Sparkles className="h-5 w-5 text-red-500" />
                        </motion.div>
                      </div>

                      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                        {["days", "hours", "minutes", "seconds"].map(k => (
                          <CountdownUnit key={k} label={k} value={timeLeft[k as keyof typeof timeLeft]} />
                        ))}
                      </div>

                      <div className="mt-5 space-y-3">
                        <DetailCard icon={CalendarDays} label="Date" value={eventDetails.date} />
                        <DetailCard icon={Clock3} label="Time" value={eventDetails.time} />
                        <DetailCard icon={MapPin} label="Venue" value={eventDetails.venue} />
                      </div>
                    </div>
                  </motion.div>
                </div>

                <motion.div
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }}
                  className="mt-14 flex justify-center"
                >
                  <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="flex flex-col items-center text-zinc-600">
                    <span className="mb-2 text-[10px] uppercase tracking-[0.45em]">Scroll Into The Night</span>
                    <ChevronDown className="h-5 w-5" />
                  </motion.div>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ── STORY ── */}
        <ParallaxSection id="story" className="px-6 py-24 md:px-10 lg:px-16">
          <div className="mx-auto max-w-7xl">
            <SectionHeading eyebrow="Our Story" title="A Romance Meant for Eternity"
              text="A Dracula-inspired celebration deserves a love story that feels cinematic, mysterious, and unforgettable."
            />
            <div className="grid gap-6 md:grid-cols-3">
              {storyMoments.map((item, index) => (
                <StoryCard key={item.title} index={index} title={item.title} text={item.text} />
              ))}
            </div>
          </div>
        </ParallaxSection>

        {/* ── DETAILS ── */}
        <ParallaxSection id="details" className="px-6 py-24 md:px-10 lg:px-16">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-2">
            {/* Dress code */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="rounded-[2rem] border border-red-950/70 bg-gradient-to-b from-[#140606]/80 to-black/80 p-8 md:p-10 backdrop-blur-sm"
            >
              <div className="mb-5 flex items-center gap-3 text-red-400">
                <Gift className="h-5 w-5" />
                <span className="text-[10px] uppercase tracking-[0.4em] text-zinc-500">Dress Code</span>
              </div>
              <h3 className="text-3xl font-semibold text-zinc-100" style={{ fontFamily: "'Cinzel Decorative', serif", fontSize: 24 }}>
                Elegance of the Darkness
              </h3>
              <div className="mt-6 space-y-3">
                {dressCode.map((item, i) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.12 }}
                    whileHover={{ x: 4, borderColor: "rgba(160,0,0,0.5)" }}
                    className="rounded-2xl border border-red-950/50 bg-red-950/10 px-5 py-4 text-zinc-300 text-sm transition-all"
                    style={{ fontFamily: "'IM Fell English', serif" }}
                  >
                    {item}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Venue */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="rounded-[2rem] border border-red-950/70 bg-gradient-to-b from-[#140606]/80 to-black/80 p-8 md:p-10 backdrop-blur-sm"
            >
              <div className="mb-5 flex items-center gap-3 text-red-400">
                <MapPin className="h-5 w-5" />
                <span className="text-[10px] uppercase tracking-[0.4em] text-zinc-500">Venue & Timing</span>
              </div>
              <h3 className="text-2xl font-semibold text-zinc-100" style={{ fontFamily: "'Cinzel Decorative', serif", fontSize: 22 }}>
                Where Romance Meets the Mist
              </h3>
              <p className="mt-4 leading-7 text-zinc-400 text-sm" style={{ fontFamily: "'IM Fell English', serif" }}>
                Join us at Tea Tree Hotel, Bandarawela, for an unforgettable day wrapped in dark luxury, moody florals, candlelit ambiance, and eternal vows.
              </p>
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-red-950/50 bg-black/30 p-5">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-zinc-600">Date</p>
                  <p className="mt-2 text-base text-zinc-100" style={{ fontFamily: "'IM Fell English', serif" }}>{eventDetails.date}</p>
                </div>
                <div className="rounded-2xl border border-red-950/50 bg-black/30 p-5">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-zinc-600">Time</p>
                  <p className="mt-2 text-base text-zinc-100" style={{ fontFamily: "'IM Fell English', serif" }}>{eventDetails.time}</p>
                </div>
              </div>
              <motion.div
                whileHover={{ borderColor: "rgba(160,0,0,0.5)", boxShadow: "0 0 40px rgba(120,0,0,0.2)" }}
                className="mt-6 rounded-[1.5rem] border border-red-900/30 bg-red-950/10 p-8 text-center transition-all"
              >
                <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 2.5 }}>
                  <MapPin className="mx-auto h-8 w-8 text-red-500" />
                </motion.div>
                <p className="mt-4 text-xl text-zinc-100" style={{ fontFamily: "'Cinzel', serif" }}>Tea Tree Hotel, Bandarawela</p>
                <p className="mt-2 text-zinc-500 text-sm" style={{ fontFamily: "'IM Fell English', serif" }}>Open the map and travel straight into our moonlit celebration.</p>
                <motion.a
                  href={appConfig.googleMapsUrl} target="_blank" rel="noreferrer"
                  whileHover={{ scale: 1.05 }}
                  className="mt-5 inline-flex items-center gap-2 rounded-full border border-red-900/60 bg-black/30 px-5 py-2.5 text-sm text-red-300 transition hover:bg-red-950/25"
                >
                  Open Google Maps <ExternalLink className="h-4 w-4" />
                </motion.a>
              </motion.div>
            </motion.div>
          </div>
        </ParallaxSection>

        {/* ── GALLERY ── */}
        <ParallaxSection id="gallery" className="px-6 py-24 md:px-10 lg:px-16">
          <div className="mx-auto max-w-7xl">
            <SectionHeading eyebrow="Couple Gallery" title="Scenes from a Dark Fairytale"
              text="Replace the placeholder paths with your real couple photos to make this fully personal."
            />
            <div className="mb-8 flex items-center justify-center gap-2 text-zinc-600">
              <ImagePlus className="h-4 w-4 text-red-700" />
              <p className="text-sm">Add images to /public/photos/ and update appConfig.couplePhotos</p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
              {appConfig.couplePhotos.map((photo, index) => (
                <GalleryCard key={photo.src} photo={photo} index={index} />
              ))}
            </div>
          </div>
        </ParallaxSection>

        {/* ── QR ── */}
        <ParallaxSection id="qr" className="px-6 py-24 md:px-10 lg:px-16">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-[2rem] border border-red-950/70 bg-gradient-to-b from-[#140606]/80 to-black/80 p-8 md:p-10 backdrop-blur-sm"
            >
              <div className="mb-5 flex items-center gap-3 text-red-400">
                <QrCode className="h-5 w-5" />
                <span className="text-[10px] uppercase tracking-[0.4em] text-zinc-500">Guest QR Invitation</span>
              </div>
              <h3 className="text-2xl font-semibold text-zinc-100" style={{ fontFamily: "'Cinzel', serif" }}>Share the Invitation Instantly</h3>
              <p className="mt-4 leading-7 text-zinc-400 text-sm">
                Guests can scan this code to open your wedding invitation. Print it on invite cards, welcome boards, or table stands.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button onClick={copyInviteLink} variant="outline" className="rounded-full border-red-900/70 bg-black/30 px-5 text-zinc-200 hover:bg-red-950/20">
                  <Copy className="mr-2 h-4 w-4" />
                  {copied ? "Copied!" : "Copy Link"}
                </Button>
                <a
                  href={appConfig.inviteUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full bg-red-900 px-5 text-white hover:bg-red-800 inline-flex items-center justify-center"
                >
                  Open Invite
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="rounded-[2rem] border border-red-950/70 bg-gradient-to-b from-[#140606]/80 to-black/90 p-8 md:p-10 backdrop-blur-sm flex flex-col items-center"
            >
              <motion.div
                whileHover={{ scale: 1.03, boxShadow: "0 0 50px rgba(180,0,0,0.25)" }}
                className="rounded-[2rem] border border-red-900/40 bg-white p-5 transition-all"
              >
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=260x260&data=${encodeURIComponent(appConfig.inviteUrl)}`}
                  alt="Wedding invitation QR code"
                  className="h-[200px] w-[200px] rounded-xl object-cover md:h-[240px] md:w-[240px]"
                />
              </motion.div>
              <p className="mt-5 max-w-sm text-center text-sm text-zinc-500">
                Update appConfig.inviteUrl to your real domain before sharing with guests.
              </p>
            </motion.div>
          </div>
        </ParallaxSection>

        {/* ── RSVP ── */}
        <ParallaxSection id="rsvp" className="px-6 pb-28 pt-24 md:px-10 lg:px-16">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.85fr_1.15fr]">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="rounded-[2rem] border border-red-950/70 bg-gradient-to-b from-[#140606]/80 to-black/80 p-8 md:p-10 backdrop-blur-sm"
            >
              <motion.div animate={{ rotate: [0, -5, 5, 0] }} transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                className="flex h-14 w-14 items-center justify-center rounded-full border border-red-900/70 bg-red-950/25 text-red-400"
              >
                <Scroll className="h-6 w-6" />
              </motion.div>
              <h2 className="mt-6 text-3xl font-semibold text-zinc-100" style={{ fontFamily: "'Cinzel Decorative', serif", fontSize: 26 }}>
                Will You Join Our Eternal Celebration?
              </h2>
              <p className="mt-4 text-base leading-7 text-zinc-400" style={{ fontFamily: "'IM Fell English', serif" }}>
                Let us know if you will stand with us as we begin our forever.
              </p>
              <div className="mt-8 space-y-3">
                {[
                  { icon: Mail, text: appConfig.rsvp.emailTo },
                  { icon: Phone, text: "+94 77 123 4567" },
                  { icon: Users, text: "Respond before 1st May 2026" },
                ].map(({ icon: Icon, text }) => (
                  <motion.div key={text} whileHover={{ x: 4 }}
                    className="flex items-center gap-3 rounded-2xl border border-red-950/50 bg-red-950/10 p-4 text-sm text-zinc-300 transition-all"
                  >
                    <Icon className="h-4 w-4 text-red-400" />
                    <span>{text}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="rounded-[2rem] border border-red-950/70 bg-gradient-to-b from-[#100404]/90 to-black/95 p-8 md:p-10 backdrop-blur-sm"
            >
              {formSubmitted ? (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center py-16 text-center">
                  <motion.div animate={{ scale: [1, 1.15, 1] }} transition={{ repeat: Infinity, duration: 2 }}>
                    <CheckCircle2 className="h-16 w-16 text-red-500" />
                  </motion.div>
                  <h3 className="mt-6 text-2xl text-zinc-100" style={{ fontFamily: "'Cinzel', serif" }}>RSVP Submitted</h3>
                  <p className="mt-3 text-zinc-500" style={{ fontFamily: "'IM Fell English', serif", fontStyle: "italic" }}>We await you in the shadows.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <Label htmlFor="name" className="mb-2 block text-sm text-zinc-400 tracking-wider">Guest Name</Label>
                    <Input id="name" value={formData.name} onChange={handleFieldChange("name")} placeholder="Enter your name"
                      className="rounded-xl border-red-950/60 bg-black/40 text-zinc-100 placeholder:text-zinc-700 focus:border-red-800 focus:ring-red-900/30"
                    />
                  </div>
                  <div className="grid gap-5 md:grid-cols-2">
                    <div>
                      <Label htmlFor="email" className="mb-2 block text-sm text-zinc-400 tracking-wider">Email</Label>
                      <Input id="email" type="email" value={formData.email} onChange={handleFieldChange("email")} placeholder="you@example.com"
                        className="rounded-xl border-red-950/60 bg-black/40 text-zinc-100 placeholder:text-zinc-700 focus:border-red-800"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone" className="mb-2 block text-sm text-zinc-400 tracking-wider">Phone</Label>
                      <Input id="phone" value={formData.phone} onChange={handleFieldChange("phone")} placeholder="Your number"
                        className="rounded-xl border-red-950/60 bg-black/40 text-zinc-100 placeholder:text-zinc-700 focus:border-red-800"
                      />
                    </div>
                  </div>
                  <div className="grid gap-5 md:grid-cols-2">
                    <div>
                      <Label htmlFor="guests" className="mb-2 block text-sm text-zinc-400 tracking-wider">Number of Guests</Label>
                      <Input id="guests" value={guestCount} onChange={(e) => setGuestCount(e.target.value)}
                        className="rounded-xl border-red-950/60 bg-black/40 text-zinc-100 focus:border-red-800"
                      />
                    </div>
                    <div className="flex items-end justify-between rounded-xl border border-red-950/50 bg-black/25 p-4">
                      <div>
                        <p className="text-sm text-zinc-300">Attending</p>
                        <p className="text-xs text-zinc-600">Toggle if you cannot attend</p>
                      </div>
                      <Switch checked={accepted} onCheckedChange={setAccepted} />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="message" className="mb-2 block text-sm text-zinc-400 tracking-wider">Message for the Couple</Label>
                    <Textarea id="message" value={formData.message} onChange={handleFieldChange("message")} placeholder="Leave a message for the couple..."
                      className="min-h-[120px] rounded-xl border-red-950/60 bg-black/40 text-zinc-100 placeholder:text-zinc-700 focus:border-red-800"
                    />
                  </div>
                  <motion.button
                    disabled={submitting}
                    type="submit"
                    whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(180,0,0,0.4)" }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center justify-center gap-2 rounded-full px-10 py-3.5 text-sm uppercase tracking-[0.3em] text-white transition-all disabled:opacity-60"
                    style={{ background: "linear-gradient(135deg, #8b0000, #5a0000)" }}
                  >
                    {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                    Send RSVP
                  </motion.button>
                  {submitStatus && !formSubmitted && (
                    <div className="rounded-xl border border-red-900/40 bg-red-950/20 px-5 py-3 text-sm text-red-300">{submitStatus}</div>
                  )}
                </form>
              )}
            </motion.div>
          </div>
        </ParallaxSection>

        {/* ── FOOTER ── */}
        <footer className="relative border-t border-red-950/40 px-6 py-12 text-center">
          <motion.p
            animate={{ opacity: [0.4, 0.8, 0.4] }}
            transition={{ repeat: Infinity, duration: 4 }}
            className="text-sm text-zinc-600"
            style={{ fontFamily: "'IM Fell English', serif", fontStyle: "italic" }}
          >
            "Until death do us part — and perhaps even beyond."
          </motion.p>
          <p className="mt-3 text-xs uppercase tracking-[0.4em] text-zinc-800">{eventDetails.groom} & {eventDetails.bride} · {eventDetails.date}</p>
        </footer>
      </div>
    </div>
  );
}