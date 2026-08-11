"use client";

import { motion } from "framer-motion";
import { CartButton } from "./CartButton";

export function Intro({
  open,
  onEnter,
}: {
  open: boolean;
  onEnter: () => void;
}) {
  return (
    <motion.section
      aria-hidden={!open}
      className="fixed inset-0 z-50 overflow-hidden bg-black"
      initial={false}
      animate={
        open
          ? { opacity: 1, pointerEvents: "auto" }
          : { opacity: 0, pointerEvents: "none" }
      }
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgba(0,0,0,0.35), rgba(0,0,0,0.72)), url(/assets/landscape-still.jpg)",
        }}
      />
      <div className="relative flex h-full flex-col items-center justify-center px-6 text-center">
        <motion.h1
          className="font-display text-[14vw] font-medium leading-[0.9] tracking-[-0.04em] text-white sm:text-[8rem]"
          initial={{ opacity: 0, y: 30 }}
          animate={open ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          Enter
          <br />
          a World
          <br />
          <span className="text-white/70">Beyond.</span>
        </motion.h1>
        <motion.div
          className="mt-10"
          initial={{ opacity: 0, y: 16 }}
          animate={open ? { opacity: 1, y: 0 } : { opacity: 0 }}
          transition={{ delay: 0.25, duration: 0.8 }}
        >
          <button type="button" onClick={onEnter} className="outline-none">
            <CartButton className="pointer-events-none" />
          </button>
        </motion.div>
      </div>
      <p className="absolute bottom-6 left-0 right-0 text-center text-xs text-white/45">
        © Interactive Studio by INSYNC. All rights reserved.
      </p>
    </motion.section>
  );
}
