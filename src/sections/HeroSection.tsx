import { motion } from "framer-motion";
import { Button } from "../components/ui/Button";
import { HeroGrid } from "../components/graphics/HeroGrid";
import { motion as motionTokens } from "../design-system/motion";
import monkey from "../assets/images/hero-monkey.webp";
import noiseBlock from "../assets/images/hero-noise-block.png";

/**
 * node 3144:9634 "hero".
 *
 * The artwork band is laid out in the design's own 1728x527 box (the strip
 * from y=554 to the hero's bottom edge), so every piece is positioned as a
 * percentage of that box and the whole composition scales down intact on
 * narrower screens.
 */

/**
 * Figma "image 3115" — same source both sides, the right one mirrored, at
 * 80% opacity under a red soft-light wash.
 *
 * The asset ships pre-cropped to this slot's aspect at 2x. Note the Figma
 * canvas shows this fill as chunky blocks; that is its low-res preview
 * proxy, not the design — the real fill is the smooth gradient used here.
 */
function NoiseBlock({ style, mirrored = false }: { style: React.CSSProperties; mirrored?: boolean }) {
  return (
    <div className="absolute" style={style}>
      <div className={`relative size-full isolate overflow-hidden ${mirrored ? "-scale-x-100" : ""}`}>
        <img src={noiseBlock} alt="" className="absolute inset-0 size-full object-cover opacity-80" />
        <div className="absolute inset-0 bg-[rgba(255,0,0,0.81)] mix-blend-soft-light" />
      </div>
    </div>
  );
}

export function HeroSection() {
  return (
    <section id="top" className="relative overflow-hidden pt-[136px] lg:pt-[210px]">
      {/* The bar floats over the section, so the grid starts at the section top. */}
      <HeroGrid className="hidden md:block" />

      <div className="relative mx-auto flex max-w-[1120px] flex-col items-center gap-7 px-6 text-center sm:gap-9">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: motionTokens.reveal.duration, ease: motionTokens.reveal.ease }}
          className="font-display text-display text-balance text-black"
        >
          Stop Wasting time dealing with cold leads
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: motionTokens.reveal.duration, ease: motionTokens.reveal.ease, delay: 0.12 }}
          className="max-w-[720px] font-sans text-lead font-medium text-muted"
        >
          You shouldn&rsquo;t need to manually email, DM, call, and follow up with every lead just
          to find the ones interested. RedApe does the chasing for you and surfaces the leads
          worth your time.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: motionTokens.reveal.duration, ease: motionTokens.reveal.ease, delay: 0.22 }}
        >
          <Button withArrow>Start Free trail now</Button>
        </motion.div>
      </div>

      {/*
        Artwork band. Below md it bleeds past both edges so the composition
        keeps a usable size instead of shrinking to a thumbnail — the section
        clips the overhang. From md up it matches the design exactly.
      */}
      <motion.div
        initial={{ opacity: 0, y: 48 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 1.3, ease: motionTokens.reveal.ease, delay: 0.15 }}
        className="relative -ml-[45%] mt-10 aspect-[1728/527] w-[190%] md:ml-auto md:mr-auto md:w-full md:max-w-[1728px] lg:-mt-[34px]"
      >
        <NoiseBlock style={{ left: "22.44%", top: "0%", width: "9.094%", height: "34.46%" }} />
        <NoiseBlock
          mirrored
          style={{ right: "22.51%", top: "0%", width: "9.094%", height: "34.46%" }}
        />
        <img
          src={monkey}
          alt="An exhausted ape juggling a phone and a laptop while chasing cold leads"
          className="absolute object-cover"
          style={{ left: "26.30%", top: "14.42%", width: "47.40%", height: "85.58%" }}
        />
      </motion.div>
    </section>
  );
}
