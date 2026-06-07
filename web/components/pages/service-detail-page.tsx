import { AnimatedCtaBand } from '@/components/ui/animated-cta-band';
import { AnimatedPageHero } from '@/components/ui/animated-page-hero';
import { AnimatedSectionHeading } from '@/components/ui/animated-section-heading';
import { GlassCard } from '@/components/ui/glass-card';
import { MetalButton } from '@/components/ui/metal-button';
import { RevealSection } from '@/components/ui/reveal-section';
import { resolveIcon } from '@/lib/icon-map';
import type { Dictionary } from '@/lib/locales';

type FaqItem = { q: string; a: string; link?: { slug: string; label: string } };

type ServiceDetailPageProps = {
  dict: Dictionary;
  hero: { label: string; title: string; description: string };
  sections: React.ReactNode;
  faq?: { title: string; items: FaqItem[] };
  cta: { headline: string; text: string; button: string; secondary: string };
  secondaryHref: string;
};

export function ServiceDetailPage({
  dict,
  hero,
  sections,
  faq,
  cta,
  secondaryHref,
}: ServiceDetailPageProps) {
  return (
    <div>
      <AnimatedPageHero label={hero.label} title={hero.title} description={hero.description}>
        <MetalButton href={dict.slugs.contact}>{dict.footer.ctaBand.cta}</MetalButton>
      </AnimatedPageHero>

      <div className="mx-auto max-w-6xl space-y-16 px-6 py-16">{sections}</div>

      {faq && (
        <section className="mx-auto max-w-6xl px-6 pb-16">
          <AnimatedSectionHeading title={faq.title} />
          <div className="mt-8 space-y-4">
            {faq.items.map((item) => (
              <GlassCard key={item.q} className="p-5">
                <h3 className="font-display text-lg font-semibold text-text">{item.q}</h3>
                <p className="mt-2 text-sm leading-relaxed text-text-muted">{item.a}</p>
              </GlassCard>
            ))}
          </div>
        </section>
      )}

      <AnimatedCtaBand
        headline={cta.headline}
        subtext={cta.text}
        primaryLabel={cta.button}
        primaryHref={dict.slugs.contact}
        secondaryLabel={cta.secondary}
        secondaryHref={secondaryHref}
      />
    </div>
  );
}

type CapabilityGridProps = {
  items: Array<{
    icon: string;
    title: string;
    text: string;
    features?: string[];
  }>;
};

export function CapabilityGrid({ items }: CapabilityGridProps) {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {items.map((item) => {
        const Icon = resolveIcon(item.icon);
        return (
          <RevealSection key={item.title}>
            <GlassCard className="h-full p-6" hover>
              <div className="icon-frame-glow mb-4 h-11 w-11">
                <Icon className="h-5 w-5 text-accent" />
              </div>
              <h3 className="font-display text-xl font-semibold text-text">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-text-muted">{item.text}</p>
              {item.features && (
                <ul className="mt-4 space-y-2">
                  {item.features.map((feature) => (
                    <li key={feature} className="text-sm text-text-muted">
                      · {feature}
                    </li>
                  ))}
                </ul>
              )}
            </GlassCard>
          </RevealSection>
        );
      })}
    </div>
  );
}
