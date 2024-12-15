"use client";
import React from "react";
import { motion, stagger, useAnimate } from "framer-motion";
import { cn } from "@/lib/cs";

const TextGenerateEffect = React.memo(() => {
  const [scope, animate] = useAnimate();

  // Trigger animation on mount
  React.useEffect(() => {
    animate(
      ".animated-word",
      { opacity: 1 },
      { duration: 0.5, delay: stagger(0.1) }
    );
  }, [animate]);

  return (
    <div
      className={cn(
        "font-bold text-center text-[40px] md:text-5xl lg:text-6xl"
      )}
      aria-live="polite"
    >
      <div className="my-4">
        <div className="dark:text-white text-black leading-snug tracking-wide">
          <motion.div ref={scope}>
            <motion.span className="animated-word opacity-0">
              Transforming
            </motion.span>{" "}
            <motion.span className="animated-word opacity-0">
              Ambitions
            </motion.span>{" "}
            <motion.span className="animated-word opacity-0">into</motion.span>{" "}
            <motion.span className="animated-word opacity-0">
              Engaging
            </motion.span>{" "}
            <motion.span className="animated-word opacity-0 text-purple">
              Digital
            </motion.span>{" "}
            <motion.span className="animated-word opacity-0 text-purple">
              Realities
            </motion.span>
          </motion.div>
        </div>
      </div>
    </div>
  );
});

// Add display name
TextGenerateEffect.displayName = "TextGenerateEffect";

export default TextGenerateEffect;
