"use client";

import { motion } from "framer-motion";
import { featureCards } from "@/lib/content";

function Icon({ type }: { type: "detail" | "connect" | "move" }) {
  if (type === "detail") {
    return (
      <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
        <rect x="4" y="4" width="26" height="26" rx="6" stroke="currentColor" strokeWidth="1.4" />
        <circle cx="17" cy="17" r="6" stroke="currentColor" strokeWidth="1.4" />
        <path d="M21.5 21.5L26 26" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    );
  }
  if (type === "connect") {
    return (
      <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
        <circle cx="11" cy="13" r="4" stroke="currentColor" strokeWidth="1.4" />
        <circle cx="23" cy="13" r="4" stroke="currentColor" strokeWidth="1.4" />
        <path
          d="M7 25c1.2-3 3.2-4.5 4-4.5s2.8 1.5 4 4.5M19 25c1.2-3 3.2-4.5 4-4.5s2.8 1.5 4 4.5"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
        <path d="M15 13h4" stroke="currentColor" strokeWidth="1.4" strokeDasharray="2 2" />
      </svg>
    );
  }
  return (
    <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
      <rect x="8" y="6" width="18" height="22" rx="4" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="17" cy="24" r="1.4" fill="currentColor" />
      <path d="M13 12h8M13 16h5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

export function FeatureCards() {
  return (
    <section className="relative bg-black px-5 py-24 md:px-8">
      <div className="mx-auto grid max-w-site gap-5 md:grid-cols-3">
        {featureCards.map((card, i) => (
          <motion.article
            key={card.title}
            className="glass-card rounded-3xl p-7"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{
              duration: 0.7,
              delay: i * 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <div className="mb-8 text-white/85">
              <Icon type={card.icon} />
            </div>
            <h3 className="font-display text-2xl tracking-[-0.03em]">
              {card.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-white/60">
              {card.body}
            </p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
