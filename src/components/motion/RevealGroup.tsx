import { motion } from "framer-motion";
import type { PropsWithChildren } from "react";
import { motion as motionTokens } from "../../design-system/motion";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: motionTokens.stagger },
  },
};

export const revealItem = {
  hidden: { opacity: 0, y: motionTokens.reveal.distance },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: motionTokens.reveal.duration,
      ease: motionTokens.reveal.ease,
    },
  },
};

/** Stagger-reveals a list of children (e.g. cards, chips) as a group. */
export function RevealGroup({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) {
  return (
    <motion.div
      className={className}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
    >
      {children}
    </motion.div>
  );
}
