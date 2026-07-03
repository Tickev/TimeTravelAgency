"use client";

import { motion } from "framer-motion";

interface AnimatedTextProps {
  text: string;
  className?: string;
  /** Animation mode: 'words' splits by word, 'chars' splits by character */
  mode?: "words" | "chars";
  delay?: number;
}

/**
 * Text component that staggers animation word-by-word or character-by-character.
 * Used for hero titles and dramatic text reveals.
 */
export default function AnimatedText({
  text,
  className = "",
  mode = "words",
  delay = 0,
}: AnimatedTextProps) {
  const units = mode === "words" ? text.split(" ") : text.split("");

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: mode === "words" ? 0.08 : 0.03,
        delayChildren: delay,
      },
    },
  };

  const child = {
    hidden: { opacity: 0, y: 30, filter: "blur(4px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.5,
        ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number],
      },
    },
  };

  return (
    <motion.span
      variants={container}
      initial="hidden"
      animate="visible"
      className={`inline-flex flex-wrap ${className}`}
      aria-label={text}
    >
      {units.map((unit, i) => (
        <motion.span key={i} variants={child} className="inline-block">
          {unit}
          {mode === "words" && i < units.length - 1 ? "\u00A0" : ""}
        </motion.span>
      ))}
    </motion.span>
  );
}
