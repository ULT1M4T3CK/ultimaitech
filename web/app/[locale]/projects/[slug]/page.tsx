import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ExternalLink } from "lucide-react";
import { AnimatedPageHero } from "@/components/ui/animated-page-hero";
import { AnimatedSectionHeading } from "@/components/ui/animated-section-heading";
import { GlassCard } from "@/components/ui/glass-card";
import { MetalButton } from "@/components/ui/metal-button";
import { RevealSection } from "@/components/ui/reveal-section";
import { resolveIcon } from "@/lib/icon-map";
import { getDictionary, type Locale } from "@/lib/locales";
type PageProps = { params: Promise<{ locale: string; slug: string }> };
export function generateStaticParams() {
  const locales = ["nl", "de", "en"] as const;
  return locales.flatMap((locale) =>
    getDictionary(locale).projects.cases.map((project) => ({
      locale,
      slug: project.slug,
    })),
  );
}
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const dict = getDictionary(locale as Locale);
  const project = dict.projects.cases.find((item) => item.slug === slug);
  if (!project) return { title: "Project | ultimAItech" };
  return {
    title: project.seoTitle ?? project.title,
    description: project.seoDescription ?? project.subtitle,
  };
}
export default async function ProjectCasePage({ params }: PageProps) {
  const { locale, slug } = await params;
  const dict = getDictionary(locale as Locale);
  const project = dict.projects.cases.find((item) => item.slug === slug);
  if (!project) notFound();
  const ui = dict.projects.caseStudyUi;
  return (
    <article>
      <AnimatedPageHero
        label={project.label}
        title={project.title}
        description={project.subtitle}
      >
        <div className="flex flex-wrap gap-3">
          <MetalButton href={dict.slugs.contact}>{project.ctaAsk}</MetalButton>
          {project.externalUrl && (
            <MetalButton href={project.externalUrl} variant="secondary">
              <ExternalLink className="h-4 w-4" />
              {project.ctaVisit ?? dict.projects.caseStudyUi.ctaLive}
            </MetalButton>
          )}
        </div>
      </AnimatedPageHero>
      <div className="mx-auto max-w-6xl space-y-16 px-6 py-16">
        <div className="hero-image-frame">
          <div className="relative aspect-[16/9] bg-surface">
            <Image
              src={project.image}
              alt={project.imageAlt}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1200px) 100vw, 1200px"
            />
          </div>
        </div>
        <RevealSection className="section-offset-grid">
          <div>
            <AnimatedSectionHeading
              title={project.title}
              subtitle={project.description}
            />
            {project.situation && (
              <p className="prose-readable mt-5 text-base">
                {project.situation}
              </p>
            )}
          </div>
          <GlassCard className="p-6" glow>
            <p className="editorial-eyebrow">{project.label}</p>
            <h2 className="mt-3 font-display text-2xl font-semibold text-text">
              {ui.deliverablesTitle}
            </h2>
            <ul className="mt-5 space-y-3">
              {project.highlights.map((highlight) => (
                <li
                  key={highlight}
                  className="text-sm leading-relaxed text-text-muted"
                >
                  {highlight}
                </li>
              ))}
            </ul>
          </GlassCard>
        </RevealSection>
        <RevealSection>
          <AnimatedSectionHeading
            title={ui.challengeTitle}
            subtitle={project.challenge.intro}
          />
          <ul className="mt-6 space-y-3">
            {project.challenge.points.map((point) => (
              <li
                key={point}
                className="studio-surface rounded-xl p-4 text-sm text-text-muted"
              >
                {point}
              </li>
            ))}
          </ul>
        </RevealSection>
        <RevealSection>
          <AnimatedSectionHeading
            title={ui.solutionTitle}
            subtitle={project.solution.intro}
          />
          <ul className="mt-6 space-y-3">
            {project.solution.points.map((point) => (
              <li
                key={point}
                className="studio-surface border-l-2 border-l-accent rounded-xl p-4 text-sm text-text-muted"
              >
                {point}
              </li>
            ))}
          </ul>
        </RevealSection>
        <RevealSection>
          <AnimatedSectionHeading title={ui.deliverablesTitle} />
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {project.deliverables.map((item) => {
              const Icon = resolveIcon(item.icon);
              return (
                <GlassCard key={item.title} className="flex gap-4 p-5">
                  <div className="icon-frame h-10 w-10 shrink-0">
                    <Icon className="h-5 w-5 text-accent" />
                  </div>
                  <p className="text-sm font-medium text-text">{item.title}</p>
                </GlassCard>
              );
            })}
          </div>
        </RevealSection>
        {project.detailBlocks.map((block) => (
          <RevealSection key={block.title}>
            <AnimatedSectionHeading title={block.title} subtitle={block.body} />
          </RevealSection>
        ))}
        <RevealSection className="grid gap-4 md:grid-cols-3">
          {project.facts.map((fact) => (
            <GlassCard key={fact.title} className="p-5" hover={false}>
              <h2 className="font-display text-lg font-semibold text-text">
                {fact.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-text-muted">
                {fact.text}
              </p>
            </GlassCard>
          ))}
        </RevealSection>
        <RevealSection className="page-band -mx-6 px-6 py-14 md:-mx-10 md:px-10">
          <div className="relative z-10 grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
            <AnimatedSectionHeading
              label={dict.services.approach.label}
              title={dict.services.intro.title}
              subtitle={dict.services.intro.text}
            />
            <div className="space-y-6">
              <div className="editorial-panel p-6">
                <h2 className="font-display text-2xl font-semibold text-text">
                  {dict.services.approach.title}
                </h2>
                <ul className="mt-5 insight-list">
                  {dict.services.approach.points.map((point) => (
                    <li key={point} className="text-sm leading-relaxed">
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
              <GlassCard className="p-6" hover={false}>
                <h2 className="font-display text-xl font-semibold text-text">
                  {dict.about.region.title}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-text-muted">
                  {dict.about.region.text}
                </p>
              </GlassCard>
            </div>
          </div>
        </RevealSection>
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border pt-8">
          <Link
            href={dict.slugs.projects}
            className="text-sm font-semibold text-accent hover:text-accent-hover"
          >
            ← {ui.backToProjects}
          </Link>
          <MetalButton href={dict.slugs.contact}>{project.ctaAsk}</MetalButton>
        </div>
      </div>
    </article>
  );
}
