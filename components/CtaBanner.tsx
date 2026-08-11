"use client";

import { motion } from "framer-motion";
import { CartButton } from "./CartButton";

export function CtaBanner() {
  return (
    <section className="relative overflow-hidden bg-black px-5 py-28 md:px-8">
      <div
        className="absolute inset-0 opacity-50"
        style={{
          backgroundImage:
            "radial-gradient(circle at 30% 40%, rgba(94,151,255,0.22), transparent 45%), radial-gradient(circle at 70% 60%, rgba(237,122,47,0.12), transparent 40%)",
        }}
      />
      <motion.div
        className="relative mx-auto max-w-3xl text-center"
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.85 }}
      >
        <h2 className="font-display text-4xl tracking-[-0.04em] md:text-5xl">
          A new world is waiting for you.
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-white/60">
          Put on SONIQ and leave the ordinary behind. Explore immersive worlds,
          connect in new ways, and experience moments that feel surprisingly
          real.
        </p>
        <div className="mt-8 flex justify-center">
          <CartButton />
        </div>
      </motion.div>
    </section>
  );
}
