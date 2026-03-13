import { useEffect, useMemo, useRef } from "react";
import gsap from "gsap";

export const SpiderWeb = ({ className = "" }) => {
  const webRef = useRef<HTMLDivElement | null>(null);
  const dewRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (!webRef.current) return;

    gsap.to(webRef.current, {
      rotation: 1.5,
      x: 2,
      y: 1,
      duration: 4.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      transformOrigin: "top left",
    });

    dewRefs.current.forEach((el, i) => {
      if (!el) return;
      gsap.to(el, {
        opacity: gsap.utils.random(0.25, 0.9),
        scale: gsap.utils.random(0.9, 1.25),
        duration: gsap.utils.random(1.8, 3),
        delay: i * 0.15,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    });
  }, []);

  const radialLines = Array.from({ length: 8 }, (_, i) => i * 22.5);
  const dewDots = [
    { left: "24%", top: "18%" },
    { left: "39%", top: "31%" },
    { left: "18%", top: "46%" },
    { left: "50%", top: "57%" },
    { left: "29%", top: "69%" },
  ];

  return (
    <div className={`pointer-events-none absolute ${className}`}>
      <div
        ref={webRef}
        className="relative h-36 w-36 opacity-40 md:h-48 md:w-48"
      >
        {radialLines.map((deg) => (
          <div
            key={deg}
            className="absolute left-0 top-0 h-full w-full"
            style={{ transform: `rotate(${deg}deg)` }}
          >
            <div className="absolute left-0 top-0 h-full w-px origin-top bg-gradient-to-b from-white/30 via-white/15 to-transparent" />
          </div>
        ))}

        <div className="absolute inset-[10%] rounded-full border border-white/20" />
        <div className="absolute inset-[22%] rounded-full border border-white/15" />
        <div className="absolute inset-[34%] rounded-full border border-white/10" />
        <div className="absolute inset-[46%] rounded-full border border-white/10" />

        {dewDots.map((dot, i) => (
          <div
            key={i}
            ref={(el) => {
              if (el) dewRefs.current[i] = el;
            }}
            className="absolute h-1.5 w-1.5 rounded-full bg-white/70 blur-[0.4px]"
            style={{ left: dot.left, top: dot.top, opacity: 0.2 }}
          />
        ))}
      </div>
    </div>
  );
};

export const CandleGlow = ({ className = "" }) => {
  const outerGlowRef = useRef<HTMLDivElement | null>(null);
  const coreGlowRef = useRef<HTMLDivElement | null>(null);
  const flameRef = useRef<HTMLDivElement | null>(null);
  const innerFlameRef = useRef<HTMLDivElement | null>(null);
  const smokeRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!outerGlowRef.current || !coreGlowRef.current || !flameRef.current) return;

    gsap.to(outerGlowRef.current, {
      scale: 1.08,
      opacity: 0.45,
      duration: 1.8,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    gsap.to(coreGlowRef.current, {
      scale: 1.12,
      opacity: 0.6,
      duration: 1.2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    gsap.to(flameRef.current, {
      scaleY: 1.15,
      scaleX: 0.92,
      rotation: 4,
      x: 1.5,
      y: -1.5,
      duration: 0.22,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      transformOrigin: "center bottom",
    });

    if (innerFlameRef.current) {
      gsap.to(innerFlameRef.current, {
        scale: 1.08,
        opacity: 1,
        duration: 0.18,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }

    if (smokeRef.current) {
      gsap.fromTo(
        smokeRef.current,
        { y: 0, x: 0, opacity: 0.08, scale: 0.8 },
        {
          y: -18,
          x: 4,
          opacity: 0,
          scale: 1.3,
          duration: 2.6,
          repeat: -1,
          ease: "power1.out",
        }
      );
    }
  }, []);

  return (
    <div className={`pointer-events-none absolute ${className}`}>
      <div
        ref={outerGlowRef}
        className="absolute left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-700/20 blur-3xl"
      />
      <div
        ref={coreGlowRef}
        className="absolute left-1/2 top-1/2 h-14 w-14 -translate-x-1/2 -translate-y-[58%] rounded-full bg-orange-400/25 blur-2xl"
      />
      <div
        ref={flameRef}
        className="absolute left-1/2 top-1/2 h-8 w-5 -translate-x-1/2 -translate-y-1/2 rounded-[999px_999px_999px_999px/1300px_1300px_700px_700px] bg-gradient-to-t from-red-600 via-orange-400 to-yellow-200 shadow-[0_0_18px_rgba(255,180,80,0.45)]"
      >
        <div
          ref={innerFlameRef}
          className="absolute left-1/2 top-[18%] h-3.5 w-2.5 -translate-x-1/2 rounded-full bg-yellow-100/90 blur-[0.4px]"
        />
      </div>
      <div
        ref={smokeRef}
        className="absolute left-1/2 top-[35%] h-10 w-6 -translate-x-1/2 rounded-full bg-white/10 blur-xl"
      />
    </div>
  );
};

export const FloatingMist = () => {
  const mistRefs = useRef<HTMLDivElement[]>([]);

  const layers = useMemo(
    () => [
      {
        left: "-8%",
        top: "8%",
        width: "42rem",
        height: "12rem",
        duration: 24,
        delay: 0,
        opacity: 0.12,
      },
      {
        left: "20%",
        top: "18%",
        width: "34rem",
        height: "10rem",
        duration: 20,
        delay: 1,
        opacity: 0.08,
      },
      {
        left: "56%",
        top: "14%",
        width: "36rem",
        height: "11rem",
        duration: 28,
        delay: 2,
        opacity: 0.1,
      },
      {
        left: "-4%",
        top: "58%",
        width: "38rem",
        height: "12rem",
        duration: 26,
        delay: 1.4,
        opacity: 0.1,
      },
      {
        left: "48%",
        top: "68%",
        width: "44rem",
        height: "13rem",
        duration: 30,
        delay: 0.8,
        opacity: 0.12,
      },
    ],
    []
  );

  useEffect(() => {
    mistRefs.current.forEach((el, i) => {
      const layer = layers[i];
      if (!el || !layer) return;

      gsap.to(el, {
        x: gsap.utils.random(-30, 45),
        y: gsap.utils.random(-10, 8),
        scaleX: gsap.utils.random(0.96, 1.08),
        scaleY: gsap.utils.random(0.94, 1.05),
        opacity: gsap.utils.random(layer.opacity * 0.7, layer.opacity * 1.15),
        duration: layer.duration,
        delay: layer.delay,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    });
  }, [layers]);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {layers.map((layer, i) => (
        <div
          key={i}
          ref={(el) => {
            if (el) mistRefs.current[i] = el;
          }}
          className="absolute rounded-full blur-3xl"
          style={{
            left: layer.left,
            top: layer.top,
            width: layer.width,
            height: layer.height,
            opacity: layer.opacity,
            background:
              "radial-gradient(ellipse at center, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0.07) 35%, rgba(255,255,255,0.02) 70%, transparent 100%)",
          }}
        />
      ))}

      <div className="absolute bottom-[-8%] left-[-10%] h-[22rem] w-[140%] bg-gradient-to-t from-white/10 via-white/5 to-transparent blur-3xl opacity-30" />
    </div>
  );
};
