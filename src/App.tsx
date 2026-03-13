import React, { useEffect, useRef, useState } from "react";
import {
  SiteHeader,
  HeroSection,
  StorySection,
  DetailsSection,
  GallerySection,
  QRSection,
  RSVPSection,
  OpeningGate,
  FloatingMist,
  FloatingBats,
  FallingEmbers,
  SpiderWeb,
  CandleGlow,
} from "./components/ui/homepageComp";

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

type FormDataType = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

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
    {
      src: "/photos/couple-1.jpg",
      alt: "Maneesha and Ruchini portrait",
      title: "Moonlit Portrait",
    },
    {
      src: "/photos/couple-2.jpg",
      alt: "Maneesha and Ruchini together",
      title: "Crimson Promise",
    },
    {
      src: "/photos/couple-3.jpg",
      alt: "Wedding pre-shoot photo",
      title: "Velvet Vows",
    },
    {
      src: "/photos/couple-4.jpg",
      alt: "Romantic couple session",
      title: "Eternal Embrace",
    },
  ],
};

export default function GothicWeddingInvitation() {
  const weddingDate = new Date("2026-05-26T11:00:00");
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [musicOn, setMusicOn] = useState(false);
  const [accepted, setAccepted] = useState(true);
  const [guestCount, setGuestCount] = useState("2");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showOpening, setShowOpening] = useState(true);
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState<FormDataType>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const diff = weddingDate.getTime() - now.getTime();

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [weddingDate]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!audioRef.current) return;

    if (musicOn) {
      audioRef.current.play().catch(() => undefined);
    } else {
      audioRef.current.pause();
    }
  }, [musicOn]);

  const handleFieldChange =
    (field: keyof FormDataType) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const copyInviteLink = async () => {
    try {
      await navigator.clipboard.writeText(appConfig.inviteUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  const sendToWebhook = async (url: string, payload: Record<string, unknown>) => {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error("Request failed");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitStatus("");

    const payload = {
      ...formData,
      attending: accepted,
      guestCount,
      submittedAt: new Date().toISOString(),
      event: `${eventDetails.groom} & ${eventDetails.bride}`,
    };

    try {
      if (appConfig.rsvp.webhookUrl) {
        await sendToWebhook(appConfig.rsvp.webhookUrl, payload);
        setSubmitStatus("Saved through webhook");
      } else if (appConfig.rsvp.googleScriptUrl) {
        await sendToWebhook(appConfig.rsvp.googleScriptUrl, payload);
        setSubmitStatus("Saved to Google Sheet");
      } else if (appConfig.rsvp.databaseApiUrl) {
        await sendToWebhook(appConfig.rsvp.databaseApiUrl, payload);
        setSubmitStatus("Saved to database");
      } else {
        const subject = encodeURIComponent(
          `Wedding RSVP - ${formData.name || "Guest"}`
        );
        const body = encodeURIComponent(
          [
            `Name: ${formData.name}`,
            `Email: ${formData.email}`,
            `Phone: ${formData.phone}`,
            `Attending: ${accepted ? "Yes" : "No"}`,
            `Guest Count: ${guestCount}`,
            `Message: ${formData.message}`,
          ].join("\n")
        );

        window.location.href = `mailto:${appConfig.rsvp.emailTo}?subject=${subject}&body=${body}`;
        setSubmitStatus("Opened email fallback");
      }

      setFormSubmitted(true);
    } catch {
      setSubmitStatus("Submission endpoint failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[linear-gradient(180deg,#120909,#090909)] text-zinc-100 selection:bg-red-900/60">
      {showOpening ? <OpeningGate onEnter={() => setShowOpening(false)} /> : null}

      <audio ref={audioRef} loop preload="none">
        <source
          src="https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8d536216d.mp3?filename=dark-ambient-piano-110495.mp3"
          type="audio/mpeg"
        />
      </audio>

      <SiteHeader
        scrolled={scrolled}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        musicOn={musicOn}
        setMusicOn={setMusicOn}
      />

      <div className="relative bg-[radial-gradient(circle_at_top,_rgba(90,0,0,0.35),_transparent_28%),linear-gradient(180deg,#090909_0%,#140909_30%,#090909_60%,#120707_100%)]">
        <FloatingMist />
        <FloatingBats />
        <FallingEmbers />

        <div className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(rgba(255,255,255,0.14)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.14)_1px,transparent_1px)] [background-size:42px_42px]" />

        <SpiderWeb className="left-0 top-0" />
        <SpiderWeb className="right-0 top-0 scale-x-[-1]" />
        <CandleGlow className="left-8 top-28 hidden md:block" />
        <CandleGlow className="right-8 top-36 hidden md:block" />

        <HeroSection timeLeft={timeLeft} />
        <StorySection />
        <DetailsSection />
        <GallerySection />
        <QRSection
          copied={copied}
          copyInviteLink={copyInviteLink}
        />
        <RSVPSection
          formData={formData}
          guestCount={guestCount}
          accepted={accepted}
          submitting={submitting}
          formSubmitted={formSubmitted}
          submitStatus={submitStatus}
          setGuestCount={setGuestCount}
          setAccepted={setAccepted}
          handleFieldChange={handleFieldChange}
          handleSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}