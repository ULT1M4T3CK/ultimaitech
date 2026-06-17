"use client";
import { motion } from "motion/react";
import { type ReactNode } from "react";
import { revealTransition, staggerContainer, staggerItem } from "@/lib/motion";
import { cn } from "@/lib/cn";
import { useReducedMotion } from "@/components/ui/use-reduced-motion";
type AnimatedSectionHeadingProps = {
  label?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  className?: string;
  align?: "left" | "center";
};
export function AnimatedSectionHeading({
  label,
  title,
  subtitle,
  className,
  align = "left",
}: AnimatedSectionHeadingProps) {
  const reducedMotion = useReducedMotion();
  return (
    <motion.div
      className={cn(
        "space-y-4",
        align === "center" && "mx-auto max-w-3xl text-center",
        className,
      )}
      variants={staggerContainer(reducedMotion, 0.08)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
    >
      {label && (
        <motion.p
          variants={staggerItem(reducedMotion)}
          className={cn(
            "editorial-eyebrow w-fit",
            align === "center" && "mx-auto",
          )}
        >
          {label}
        </motion.p>
      )}
      <motion.h2
        variants={staggerItem(reducedMotion)}
        className="type-section-title text-3xl text-text md:text-4xl lg:text-[2.75rem]"
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          variants={staggerItem(reducedMotion)}
          className="max-w-2xl text-base leading-relaxed text-text-muted md:text-lg"
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
}
