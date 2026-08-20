import { motion } from "framer-motion";
import type { PropsWithChildren } from "react";
import { motion as motionTokens } from "../../design-system/motion";

interface RevealProps {
  className?: string;
  delay?: number;
  y?: number;
}

/**
 * Scroll-triggered fade/rise-in used for every section. Runs once per
 * element and uses the slower easeOutExpo timing from motion tokens so
 * content settles in gently rather than snapping into place.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  y = motionTokens.reveal.distance,
}: PropsWithChildren<RevealProps>) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{
        duration: motionTokens.reveal.duration,
        ease: motionTokens.reveal.ease,
        delay,
      }}
    >
      {children}
    </motion.div>
  );
}
