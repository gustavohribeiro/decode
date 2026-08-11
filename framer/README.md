# Framer — SONIQ scroll image sequence

The live Framer project (`Responsible Slider` / `kY6a7Lf21Py3mahNNaDw`) now includes a **ScrollImageSequence** code component that recreates the Interactive Studio `scroll-sequence-widget` used on [soniq.interactive-studio.io](https://soniq.interactive-studio.io).

## Source frames

Same asset pack as the original site:

- Base URL: `https://scroll-sequence-prod.s3.eu-central-1.amazonaws.com/12399f38-2c8e-412a-868a-8e5893122cd5/`
- Pattern: `frame00001.jpg` … `frame00283.jpg` (283 frames, 5-digit padding)

## Wiring

- Code file: `ScrollImageSequence.tsx` (`codeFile/ldBUyVp:default`)
- Placed in Home → Desktop → Hero → **Hero Scroll Sequence** (replaces the autoplay Video)
- Sticky viewport + ~320vh scrub distance

This folder mirrors the code component source for review; the Framer project is the source of truth.
