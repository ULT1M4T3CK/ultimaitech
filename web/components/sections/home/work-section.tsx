import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { AnimatedSectionHeading } from '@/components/ui/animated-section-heading';
import { GlassCard } from '@/components/ui/glass-card';
import { RevealSection } from '@/components/ui/reveal-section';
import type { Dictionary } from '@/lib/locales';

type WorkSectionProps = {
  dict: Dictionary;
};

export function WorkSection({ dict }: WorkSectionProps) {
  const nexus = dict.home.nexus;
  const projects = dict.home.projects ?? [];
  const featured = projects.find((p) => p.featured) ?? projects[0];
  const secondary = projects.filter((p) => p.slug !== featured?.slug).slice(0, 2);

  if (!featured) return null;

  return (
    <RevealSection data-narrative-section="work" className="narrative-section section-glow">
      <div className="mx-auto w-full max-w-6xl space-y-10 px-6">
        <AnimatedSectionHeading
          label={nexus?.workLabel ?? 'Projecten'}
          title={nexus?.workTitle ?? 'Werk dat u zelf kunt beoordelen'}
          subtitle={nexus?.workIntro ?? dict.projects.intro.text}
        />

        <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <GlassCard className="group overflow-hidden" glow hover>
            <Link href={`${dict.slugs.projects}${featured.slug}/`} className="block">
              <div className="hero-image-frame m-4 mb-0">
                <div className="relative aspect-[16/10] bg-surface">
                  <Image
                    src={featured.image}
                    alt={featured.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 60vw"
                  />
                </div>
              </div>
              <div className="space-y-3 p-6 pt-5">
                <p className="text-xs font-semibold uppercase tracking-widest text-accent">
                  {featured.label ?? 'Uitgelicht'}
                </p>
                <h3 className="font-display text-2xl font-bold text-text">{featured.title}</h3>
                <p className="text-sm leading-relaxed text-text-muted">{featured.description}</p>
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
                  {dict.projects.caseStudyUi.ctaFullCase}
                  <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          </GlassCard>

          <div className="grid gap-4">
            {secondary.map((project) => (
              <GlassCard key={project.slug} className="overflow-hidden" hover>
                <Link href={`${dict.slugs.projects}${project.slug}/`} className="flex h-full flex-col">
                  <div className="relative aspect-[16/9] bg-surface">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 30vw"
                    />
                  </div>
                  <div className="space-y-2 p-4">
                    <h3 className="font-display text-lg font-semibold text-text">{project.title}</h3>
                    <p className="line-clamp-2 text-sm text-text-muted">{project.description}</p>
                  </div>
                </Link>
              </GlassCard>
            ))}
          </div>
        </div>
      </div>
    </RevealSection>
  );
}
