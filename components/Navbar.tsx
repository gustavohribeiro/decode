"use client";

import { useEffect, useState } from "react";
import { navLinks } from "@/lib/content";
import { CartButton } from "./CartButton";
import { Logo } from "./Logo";

export function Navbar({ visible }: { visible: boolean }) {
  const [active, setActive] = useState("home");

  useEffect(() => {
    const ids = ["home", "details", "pricing", "faq"];
    const onScroll = () => {
      const y = window.scrollY + 140;
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.offsetTop;
        const bottom = top + el.offsetHeight;
        if (y >= top && y < bottom) setActive(id);
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition duration-500 ${
        visible
          ? "translate-y-0 opacity-100"
          : "-translate-y-4 pointer-events-none opacity-0"
      }`}
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-5 py-4 md:px-8">
        <Logo />
        <nav className="hidden items-center gap-7 md:flex">
          {navLinks.map((link) => {
            const id = link.href.slice(1);
            const isActive = active === id;
            return (
              <a
                key={link.href}
                href={link.href}
                className="relative text-[13px] tracking-wide text-white/80 transition hover:text-white"
              >
                {isActive && (
                  <span className="absolute -left-3 top-1/2 h-1 w-1 -translate-y-1/2 rounded-full bg-white" />
                )}
                {link.label}
              </a>
            );
          })}
          <CartButton />
        </nav>
        <div className="md:hidden">
          <CartButton className="px-4 py-2 text-xs" />
        </div>
      </div>
    </header>
  );
}
