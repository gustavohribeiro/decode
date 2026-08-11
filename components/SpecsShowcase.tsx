"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { fitCallouts, soundBullets, visionBullets } from "@/lib/content";

export function SpecsShowcase() {
  return (
    <section id="details" className="bg-black">
      <div className="mx-auto grid max-w-[1400px] items-center gap-10 px-5 py-24 md:grid-cols-2 md:px-8">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-display text-4xl tracking-[-0.04em] md:text-5xl">
            8K OLED Vision System
          </h2>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-white/60">
            Powered by advanced 8K OLED optics, SONIQ delivers exceptional
            clarity, rich colors, and true depth - creating a visual experience
            that feels remarkably close to natural sight.
          </p>
          <ul className="mt-8 space-y-3 text-sm text-white/80">
            {visionBullets.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-2 h-1 w-1 rounded-full bg-accent" />
                {item}
              </li>
            ))}
          </ul>
        </motion.div>
        <motion.div
          className="relative aspect-[4/3] overflow-hidden rounded-[28px]"
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9 }}
        >
          <Image
            src="/assets/feat-frame2.jpg"
            alt="8K OLED visual clarity"
            fill
            className="object-cover"
            sizes="(max-width:768px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-accent/10" />
        </motion.div>
      </div>

      <div className="mx-auto grid max-w-[1400px] items-center gap-10 px-5 py-24 md:grid-cols-2 md:px-8">
        <motion.div
          className="relative order-2 aspect-square overflow-hidden rounded-[28px] md:order-1"
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9 }}
        >
          <Image
            src="/assets/feat-frame3.jpg"
            alt="Atmos spatial audio driver"
            fill
            className="object-cover"
            sizes="(max-width:768px) 100vw, 50vw"
          />
        </motion.div>
        <motion.div
          className="order-1 md:order-2"
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-display text-4xl tracking-[-0.04em] md:text-5xl">
            9.1 Atmos Ultimate Sound
          </h2>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-white/60">
            Experience sound that moves around you naturally. SONIQ’s spatial
            audio technology creates precise depth, direction, and distance.
          </p>
          <ul className="mt-8 space-y-3 text-sm text-white/80">
            {soundBullets.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-2 h-1 w-1 rounded-full bg-accent" />
                {item}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      <div className="relative mx-auto max-w-[1200px] px-5 py-28 md:px-8">
        <div className="relative mx-auto min-h-[520px] max-w-4xl md:min-h-[640px]">
          <div className="relative mx-auto aspect-[16/11] max-w-2xl md:absolute md:inset-x-0 md:top-1/2 md:mx-auto md:-translate-y-1/2">
            <Image
              src="/assets/feat-frame1.jpg"
              alt="SONIQ headset"
              fill
              className="object-contain"
              sizes="(max-width:768px) 100vw, 700px"
            />
          </div>

          <motion.div
            className="mt-8 max-w-xs md:absolute md:right-0 md:top-8 md:mt-0 md:text-right"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h3 className="font-display text-xl tracking-[-0.03em]">
              {fitCallouts[0].title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-white/60">
              {fitCallouts[0].body}
            </p>
          </motion.div>

          <motion.div
            className="mt-6 max-w-xs md:absolute md:bottom-10 md:left-0 md:mt-0"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08, duration: 0.7 }}
          >
            <h3 className="font-display text-xl tracking-[-0.03em]">
              {fitCallouts[1].title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-white/60">
              {fitCallouts[1].body}
            </p>
          </motion.div>

          <motion.div
            className="mt-6 max-w-xs md:absolute md:bottom-10 md:right-0 md:mt-0 md:text-right"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.16, duration: 0.7 }}
          >
            <h3 className="font-display text-xl tracking-[-0.03em]">
              {fitCallouts[2].title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-white/60">
              {fitCallouts[2].body}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
