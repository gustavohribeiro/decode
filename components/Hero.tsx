"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from "framer-motion";
import { CartButton } from "./CartButton";
import { HERO_VIDEO } from "@/lib/content";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const textOpacity = useTransform(scrollYProgress, [0, 0.18], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.2], [0, -40]);
  const scale = useTransform(scrollYProgress, [0, 0.55], [1, 1.12]);
  const radius = useTransform(scrollYProgress, [0.2, 0.55], [28, 0]);
  const width = useTransform(scrollYProgress, [0.15, 0.55], ["72%", "100%"]);
  const mediaOpacity = useTransform(scrollYProgress, [0, 0.08], [0.4, 1]);
  const borderRadius = useMotionTemplate`${radius}px`;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const unsub = scrollYProgress.on("change", (v) => {
      if (!video.duration || Number.isNaN(video.duration)) return;
      // Scrub through first portion of the clip as user scrolls the hero pin
      const t = Math.min(Math.max(v, 0), 1) * Math.min(video.duration, 6);
      if (Math.abs(video.currentTime - t) > 0.04) {
        video.currentTime = t;
      }
    });

    const tryPlay = async () => {
      try {
        video.pause();
      } catch {
        /* ignore */
      }
    };
    void tryPlay();
    return () => unsub();
  }, [scrollYProgress]);

  return (
    <section id="home" ref={ref} className="relative h-[240vh] bg-black">
      <div className="sticky top-0 flex h-screen flex-col items-center justify-start overflow-hidden pt-28">
        <motion.div
          style={{ opacity: textOpacity, y: textY }}
          className="relative z-10 mx-auto max-w-3xl px-6 text-center"
        >
          <motion.h1
            className="font-display text-[clamp(2.6rem,6vw,5.2rem)] font-medium leading-[1.05] tracking-[-0.04em]"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            A new way to experience{" "}
            <span className="text-white/45">reality.</span>
          </motion.h1>
          <motion.p
            className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-white/65"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.8 }}
          >
            Built to disappear the moment you put it on, SONIQ lets you move,
            see, and feel digital worlds in a way that feels effortless and
            intuitive.
          </motion.p>
          <motion.div
            className="mt-8 flex justify-center"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.28, duration: 0.75 }}
          >
            <CartButton />
          </motion.div>
        </motion.div>

        <motion.div
          className="relative mt-8 flex w-full flex-1 items-end justify-center"
          style={{ opacity: mediaOpacity }}
        >
          <motion.div
            className="relative h-[58vh] max-h-[640px] overflow-hidden bg-black"
            style={{ width, scale, borderRadius }}
          >
            <video
              ref={videoRef}
              className="h-full w-full object-cover"
              src={HERO_VIDEO}
              muted
              playsInline
              preload="auto"
              poster="/assets/hero-poster.jpg"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/20" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
