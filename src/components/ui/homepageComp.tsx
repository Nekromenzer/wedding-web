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

export function SpiderWeb({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute ${className}`}>
      <div className="relative h-28 w-28 opacity-35 md:h-36 md:w-36">
        <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-white/30" />
        <div className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-white/25" />
        <div className="absolute inset-4 rounded-full border border-white/20" />
        <div className="absolute inset-8 rounded-full border border-white/15" />
        <div className="absolute inset-12 rounded-full border border-white/10" />
        <div className="absolute left-1/2 top-1/2 h-full w-px -translate-x-1/2 -translate-y-1/2 rotate-45 bg-white/15" />
        <div className="absolute left-1/2 top-1/2 h-full w-px -translate-x-1/2 -translate-y-1/2 -rotate-45 bg-white/15" />
      </div>
    </div>
  );
}

export function CandleGlow({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute ${className}`}>
      <motion.div
        animate={{ opacity: [0.35, 0.7, 0.45, 0.8, 0.35], scale: [1, 1.06, 0.98, 1.04, 1] }}
        transition={{ repeat: Infinity, duration: 3.2, ease: "easeInOut" }}
        className="h-24 w-24 rounded-full bg-red-700/20 blur-2xl"
      />
      <motion.div
        animate={{ opacity: [0.55, 0.9, 0.6, 1, 0.55], y: [0, -2, 0, -1, 0] }}
        transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
        className="absolute left-1/2 top-1/2 h-5 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-t from-orange-500 via-red-500 to-yellow-200"
      />
    </div>
  );
}

export function FloatingMist() {
  const blobs = useMemo(
    () => [
      { left: "4%", top: "10%", delay: 0, duration: 12, size: "w-44 h-44" },
      { left: "74%", top: "12%", delay: 1.2, duration: 14, size: "w-56 h-56" },
      { left: "14%", top: "62%", delay: 0.8, duration: 13, size: "w-52 h-52" },
      { left: "80%", top: "70%", delay: 1.8, duration: 15, size: "w-40 h-40" },
      { left: "42%", top: "34%", delay: 1.4, duration: 16, size: "w-60 h-60" },
    ],
    []
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {blobs.map((blob, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full ${blob.size} bg-white/5 blur-3xl`}
          style={{ left: blob.left, top: blob.top }}
          animate={{ y: [0, -20, 10, 0], x: [0, 12, -8, 0], opacity: [0.12, 0.26, 0.18, 0.12] }}
          transition={{ repeat: Infinity, duration: blob.duration, delay: blob.delay, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

export function FloatingBats() {
  const bats = [
    { top: "9%", duration: 15, delay: 0, size: "text-3xl" },
    { top: "22%", duration: 18, delay: 3, size: "text-4xl" },
    { top: "67%", duration: 16, delay: 6, size: "text-3xl" },
  ];

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-50">
      {bats.map((bat, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ top: bat.top }}
          initial={{ x: "-15vw", opacity: 0 }}
          animate={{ x: ["-15vw", "45vw", "110vw"], opacity: [0, 0.4, 0.2, 0] }}
          transition={{ repeat: Infinity, duration: bat.duration, delay: bat.delay, ease: "linear" }}
        >
          <motion.div animate={{ y: [0, -10, 0, 6, 0] }} transition={{ repeat: Infinity, duration: 2.4, ease: "easeInOut" }} className={`${bat.size} md:text-5xl`}>
            🦇
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

