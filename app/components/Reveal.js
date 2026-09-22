"use client";

import { motion, useReducedMotion } from "framer-motion";

/** Shared easing so every reveal in the app moves with the same character. */
export const EASE = [0.22, 1, 0.36, 1];

/**
 * Fade-and-rise on scroll. Wraps content in a motion element and fires once.
 */
export default function Reveal({
  children,
  delay = 0,
  y = 26,
  duration = 0.72,
  className = "",
  once = true,
  amount = 0.25,
}) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount }}
      transition={{ duration, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Parent for staggered children. Pair with `<StaggerItem>`.
 */
export function StaggerGroup({ children, className = "", delay = 0, stagger = 0.08, amount = 0.2 }) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className = "", y = 24 }) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y },
        visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
      }}
    >
      {children}
    </motion.div>
  );
}
