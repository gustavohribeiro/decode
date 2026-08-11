"use client";

import { useState } from "react";
import { Intro } from "./Intro";
import { Navbar } from "./Navbar";
import { Hero } from "./Hero";
import { FeatureCards } from "./FeatureCards";
import { ImmersionQuote } from "./ImmersionQuote";
import { SpecsShowcase } from "./SpecsShowcase";
import { Pricing } from "./Pricing";
import { CtaBanner } from "./CtaBanner";
import { Testimonials } from "./Testimonials";
import { FAQ } from "./FAQ";
import { UseCases } from "./UseCases";
import { OrderFooter } from "./OrderFooter";
import { StudioBadge } from "./StudioBadge";

export function HomePage() {
  const [introOpen, setIntroOpen] = useState(true);

  return (
    <>
      <Intro open={introOpen} onEnter={() => setIntroOpen(false)} />
      <Navbar visible={!introOpen} />
      <main
        className={`bg-black transition-opacity duration-700 ${
          introOpen ? "opacity-0" : "opacity-100"
        }`}
      >
        <Hero />
        <FeatureCards />
        <ImmersionQuote />
        <SpecsShowcase />
        <Pricing />
        <CtaBanner />
        <Testimonials />
        <FAQ />
        <UseCases />
        <OrderFooter />
      </main>
      {!introOpen && <StudioBadge />}
    </>
  );
}
