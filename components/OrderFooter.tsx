"use client";

import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import { Logo } from "./Logo";

export function OrderFooter() {
  const [qty, setQty] = useState(1);
  const [done, setDone] = useState(false);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setDone(true);
  };

  return (
    <footer id="order" className="border-t border-white/10 bg-black">
      <div className="mx-auto grid max-w-site gap-10 px-5 py-20 md:grid-cols-2 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-sm uppercase tracking-[0.18em] text-white/40">
            SONIQ Pro
          </p>
          <h2 className="mt-3 font-display text-4xl tracking-[-0.04em]">
            Put on SONIQ and leave the ordinary behind.
          </h2>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-white/60">
            Explore immersive worlds, connect in new ways, and experience
            moments that feel surprisingly real.
          </p>
        </motion.div>

        <motion.form
          onSubmit={onSubmit}
          className="rounded-[28px] border border-white/12 bg-[#0a0a0a] p-6"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {done ? (
            <p className="text-sm leading-relaxed text-white/75">
              Thank you for your interest in SONIQ! This product is part of a
              fictional concept and this website was created for demonstration
              and presentation purposes only. No real orders are being
              processed.
            </p>
          ) : (
            <>
              <label className="block text-sm text-white/60">
                Quantity
                <input
                  type="number"
                  min={1}
                  max={10}
                  value={qty}
                  onChange={(e) => setQty(Number(e.target.value) || 1)}
                  className="mt-2 w-full rounded-xl border border-white/15 bg-black px-4 py-3 text-white outline-none focus:border-accent"
                />
              </label>
              <button
                type="submit"
                className="mt-5 w-full rounded-full bg-white py-3 text-sm font-medium text-black transition hover:bg-white/90"
              >
                Order Now
              </button>
            </>
          )}
        </motion.form>
      </div>

      <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 px-5 py-6 text-xs text-white/45 md:flex-row md:px-8">
        <Logo className="opacity-80" />
        <p>© Interactive Studio by INSYNC. All rights reserved.</p>
        <a href="#home" className="hover:text-white">
          Home
        </a>
      </div>
    </footer>
  );
}
