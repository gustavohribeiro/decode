"use client";

import Image from "next/image";
import { testimonials } from "@/lib/content";

function Row({ reverse = false }: { reverse?: boolean }) {
  const items = [...testimonials, ...testimonials];
  return (
    <div className={`flex w-max gap-4 ${reverse ? "animate-marquee" : "animate-marquee"}`}>
      {items.map((item, i) => (
        <article
          key={`${item.name}-${i}`}
          className="glass-card w-[320px] shrink-0 rounded-3xl p-5 md:w-[380px]"
        >
          <p className="text-sm leading-relaxed text-white/80">“{item.quote}”</p>
          <div className="mt-5 flex items-center gap-3">
            <Image
              src={item.avatar}
              alt={item.name}
              width={40}
              height={40}
              className="h-10 w-10 rounded-full object-cover"
            />
            <p className="text-sm font-medium">{item.name}</p>
          </div>
        </article>
      ))}
    </div>
  );
}

export function Testimonials() {
  return (
    <section className="bg-black py-20">
      <div className="fade-edge-x overflow-hidden">
        <div style={{ animationDuration: "48s" }}>
          <Row />
        </div>
      </div>
    </section>
  );
}
