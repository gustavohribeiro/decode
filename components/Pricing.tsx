"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { plans } from "@/lib/content";

export function Pricing() {
  const [billing, setBilling] = useState<"annually" | "monthly">("monthly");

  return (
    <section id="pricing" className="bg-black px-5 py-28 md:px-8">
      <div className="mx-auto max-w-site">
        <motion.div
          className="mx-auto max-w-2xl text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-display text-4xl tracking-[-0.04em] md:text-5xl">
            Our Pricing.
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-white/60">
            Simple, flexible pricing that adapts to your lifestyle. Choose your
            plan and unlock full access to the SONIQ experience with one-time
            hardware and subscription options.
          </p>
          <div className="mx-auto mt-8 inline-flex items-center rounded-full border border-white/15 p-1 text-sm">
            {(["annually", "monthly"] as const).map((key) => (
              <button
                key={key}
                type="button"
                onClick={() => setBilling(key)}
                className={`rounded-full px-5 py-2 capitalize transition ${
                  billing === key
                    ? "bg-white text-black"
                    : "text-white/70 hover:text-white"
                }`}
              >
                {key}
              </button>
            ))}
          </div>
        </motion.div>

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {plans.map((plan, i) => (
            <motion.article
              key={plan.id}
              className="relative overflow-hidden rounded-[28px] border border-white/12 bg-[#0a0a0a] p-8"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.75 }}
            >
              <p className="pointer-events-none absolute right-6 top-4 font-display text-7xl text-white/[0.04]">
                {plan.name}
              </p>
              <h3 className="font-display text-3xl tracking-[-0.03em]">
                {plan.name}
              </h3>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-white/55">
                {plan.description}
              </p>
              <ul className="mt-8 space-y-3 text-sm text-white/80">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex gap-3">
                    <span className="mt-0.5 text-accent">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-10 flex items-end justify-between gap-4">
                <p className="font-display text-5xl tracking-[-0.04em]">
                  {plan.monthly}€
                  <span className="ml-2 text-base text-white/45">/month</span>
                </p>
                <a
                  href="#order"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-black transition hover:bg-white/90"
                >
                  → Request Access
                </a>
              </div>
              {billing === "annually" && (
                <p className="mt-3 text-xs text-white/40">
                  Billed annually · same monthly rate as demo
                </p>
              )}
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
