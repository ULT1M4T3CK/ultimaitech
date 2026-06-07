import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ExternalLink } from 'lucide-react';
import { AnimatedPageHero } from '@/components/ui/animated-page-hero';
import { AnimatedSectionHeading } from '@/components/ui/animated-section-heading';
import { GlassCard } from '@/components/ui/glass-card';
import { MetalButton } from '@/components/ui/metal-button';
import { RevealSection } from '@/components/ui/reveal-section';
import { resolveIcon } from '@/lib/icon-map';
import { getDictionary, type Locale } from '@/lib/locales';

type PageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  const locales = ['nl', 'de', 'en'] as const;
  return locales.flatMap((locale) =>
    getDictionary(locale).projects.cases.map((project) => ({ locale, slug: project.slug })),
  );
}

export default async function ProjectCasePage({ params }: PageProps) {
  const { locale, slug } = await params;
  const dict = getDictionary(locale as Locale);
  const project = dict.projects.cases.find((item) => item.slug === slug);

  if (!project) notFound();

  const ui = dict.projects.caseStudyUi;

  return (
    <article>
      <AnimatedPageHero label={project.label} title={project.title} description={project.subtitle}>
        <div className="flex flex-wrap gap-3">
          <MetalButton href={dict.slugs.contact}>{project.ctaAsk}</MetalButton>
          {project.externalUrl && (
            <MetalButton href={project.externalUrl} variant="secondary">
              <ExternalLink className="h-4 w-4" />
              {project.ctaVisit}
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

        <RevealSection>
          <p className="max-w-3xl text-base leading-relaxed text-text-muted">{project.description}</p>
        </RevealSection>

        <RevealSection>
          <AnimatedSectionHeading title={ui.challengeTitle} subtitle={project.challenge.intro} />
          <ul className="mt-6 space-y-3">
            {project.challenge.points.map((point) => (
              <li key={point} className="glass-spec-panel rounded-xl p-4 text-sm text-text-muted">
                {point}
              </li>
            ))}
          </ul>
        </RevealSection>

        <RevealSection>
          <AnimatedSectionHeading title={ui.solutionTitle} subtitle={project.solution.intro} />
          <ul className="mt-6 space-y-3">
            {project.solution.points.map((point) => (
              <li key={point} className="glass-spec-panel glass-spec-panel-accent rounded-xl p-4 text-sm text-text-muted">
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
                  <div className="icon-frame-glow h-10 w-10 shrink-0">
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

        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border pt-8">
          <Link href={dict.slugs.projects} className="text-sm font-semibold text-accent hover:text-accent-hover">
            ← {ui.backToProjects}
          </Link>
          <MetalButton href={dict.slugs.contact}>{project.ctaAsk}</MetalButton>
        </div>
      </div>
    </article>
  );
}
