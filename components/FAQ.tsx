"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { faqs } from "@/lib/content";

export function FAQ() {
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" className="bg-black px-5 py-28 md:px-8">
      <div className="mx-auto grid max-w-[1200px] gap-12 md:grid-cols-[0.9fr_1.1fr]">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-display text-4xl tracking-[-0.04em] md:text-5xl">
            Frequently Asked Questions.
          </h2>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/60">
            Everything you need to know about using SONIQ, your subscription,
            and device setup - all in one place.
          </p>
        </motion.div>

        <div className="divide-y divide-white/10 border-y border-white/10">
          {faqs.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q}>
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-4 py-5 text-left"
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                >
                  <span className="text-[15px] font-medium tracking-[-0.01em]">
                    {item.q}
                  </span>
                  <span className="text-white/50">{isOpen ? "▴" : "▾"}</span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="pb-5 pr-8 text-sm leading-relaxed text-white/60">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
