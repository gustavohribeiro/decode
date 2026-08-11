"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function ImmersionQuote() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const blur = useTransform(scrollYProgress, [0.35, 0.7], [0, 8]);
  const opacity = useTransform(scrollYProgress, [0.35, 0.75], [1, 0.35]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[70vh] items-center justify-center bg-black px-6 py-28"
    >
      <motion.h2
        className="max-w-4xl text-center font-display text-[clamp(1.8rem,4.4vw,3.6rem)] font-medium leading-[1.15] tracking-[-0.035em]"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        True immersion happens when the line between the physical and the
        digital quietly fades{" "}
        <motion.span style={{ filter: blur, opacity }} className="inline-block">
          away
        </motion.span>
        .
      </motion.h2>
    </section>
  );
}
