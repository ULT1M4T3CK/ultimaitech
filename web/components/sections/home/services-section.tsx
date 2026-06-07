import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { AnimatedSectionHeading } from '@/components/ui/animated-section-heading';
import { GlassCard } from '@/components/ui/glass-card';
import { RevealSection } from '@/components/ui/reveal-section';
import { resolveIcon } from '@/lib/icon-map';
import type { Dictionary } from '@/lib/locales';

type ServicesSectionProps = {
  dict: Dictionary;
};

export function ServicesSection({ dict }: ServicesSectionProps) {
  const nexus = dict.home.nexus;

  return (
    <RevealSection
      data-narrative-section="services"
      className="narrative-section"
    >
      <div className="mx-auto grid w-full max-w-6xl gap-12 px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:items-start">
        <div className="lg:sticky lg:top-28">
          <AnimatedSectionHeading
            label={nexus?.servicesLabel ?? 'Diensten'}
            title={nexus?.servicesTitle ?? 'Drie pijlers, één studio'}
            subtitle={nexus?.servicesIntro ?? dict.services.intro.text}
          />
        </div>

        <div className="space-y-4">
          {dict.home.services.map((service) => {
            const Icon = resolveIcon(service.icon);
            return (
              <GlassCard
                key={service.title}
                className="group p-6"
                accentBar
                hover
              >
                <div className="flex items-start gap-4">
                  <div className="icon-frame-glow h-11 w-11 shrink-0">
                    <Icon className="h-5 w-5 text-accent" />
                  </div>
                  <div className="min-w-0 flex-1 space-y-3">
                    <h3 className="font-display text-lg font-semibold text-text">{service.title}</h3>
                    <p className="text-sm leading-relaxed text-text-muted">{service.text}</p>
                    <Link
                      href={service.link}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent transition-colors hover:text-accent-hover"
                    >
                      {service.cta}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </GlassCard>
            );
          })}
        </div>
      </div>
    </RevealSection>
  );
}
