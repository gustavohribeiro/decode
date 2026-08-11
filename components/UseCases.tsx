"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useCases } from "@/lib/content";

export function UseCases() {
  return (
    <section className="bg-black px-5 py-24 md:px-8">
      <div className="mx-auto max-w-site">
        <motion.h2
          className="max-w-2xl font-display text-4xl tracking-[-0.04em] md:text-5xl"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Made for Every Moment.
        </motion.h2>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {useCases.map((item, i) => (
            <motion.article
              key={item.title}
              className="overflow-hidden rounded-[28px] border border-white/10 bg-[#0a0a0a]"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.75 }}
            >
              <div className="relative aspect-[4/3]">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                  sizes="(max-width:768px) 100vw, 33vw"
                />
              </div>
              <div className="p-6">
                <h3 className="font-display text-2xl tracking-[-0.03em]">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-white/60">
                  {item.body}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
