"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useReducedMotion } from "@/components/ui/use-reduced-motion";
import { cn } from "@/lib/cn";

export type UseCaseDeckItem = {
  slug: string;
  label: string;
  title: string;
  subtitle: string;
  image: string;
  imageAlt: string;
  href: string;
  ctaLabel: string;
};

type UseCaseDeckProps = {
  cases: UseCaseDeckItem[];
};

export function UseCaseDeck({ cases }: UseCaseDeckProps) {
  const reducedMotion = useReducedMotion();
  const [fanned, setFanned] = useState(false);
  const [activeSlug, setActiveSlug] = useState(cases[0]?.slug ?? "");

  useEffect(() => {
    const initial = cases[0]?.slug;
    if (!initial) return;
    document.querySelectorAll("[data-case-panel]").forEach((panel) => {
      panel.classList.toggle(
        "case-panel-highlight",
        panel.getAttribute("data-case-panel") === initial,
      );
    });
  }, [cases]);

  const selectCase = useCallback(
    (slug: string) => {
      setActiveSlug(slug);
      document.querySelectorAll("[data-case-panel]").forEach((panel) => {
        panel.classList.toggle(
          "case-panel-highlight",
          panel.getAttribute("data-case-panel") === slug,
        );
      });
      const panel = document.querySelector(`[data-case-panel="${slug}"]`);
      if (panel) {
        panel.scrollIntoView({
          behavior: reducedMotion ? "auto" : "smooth",
          block: "start",
        });
      }
    },
    [reducedMotion],
  );

  return (
    <div
      className={cn(
        "layered-stack layered-stack--stacked mx-auto w-full max-w-4xl",
        fanned && "layered-stack--fanned",
      )}
      onMouseEnter={() => !reducedMotion && setFanned(true)}
      onMouseLeave={() => setFanned(false)}
      onFocusCapture={() => !reducedMotion && setFanned(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node)) {
          setFanned(false);
        }
      }}
    >
      {cases.map((project) => (
        <button
          key={project.slug}
          type="button"
          data-case={project.slug}
          className={cn(
            "layered-stack-card cursor-pointer text-left",
            activeSlug === project.slug && "layered-stack-card--active",
          )}
          onClick={() => selectCase(project.slug)}
        >
          <Image
            src={project.image}
            alt={project.imageAlt}
            width={640}
            height={480}
            className="h-auto w-full"
            sizes="(max-width: 768px) 100vw, 320px"
          />
          <div className="stack-card-overlay">
            <span className="stack-card-label">{project.label}</span>
            <h3 className="stack-card-title">{project.title}</h3>
            <p className="stack-card-subtitle">{project.subtitle}</p>
            <Link
              href={project.href}
              className="inline-flex items-center gap-1 text-sm font-semibold text-accent hover:text-accent-hover"
              onClick={(event) => event.stopPropagation()}
            >
              {project.ctaLabel}
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </button>
      ))}
    </div>
  );
}
