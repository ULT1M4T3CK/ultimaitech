import { ImmersiveScenePage } from '@/components/pages/immersive-scene-page';
import { AnimatedCtaBand } from '@/components/ui/animated-cta-band';
import { AnimatedSectionHeading } from '@/components/ui/animated-section-heading';
import { GlassCard } from '@/components/ui/glass-card';
import { RevealSection } from '@/components/ui/reveal-section';
import { getDictionary, type Locale } from '@/lib/locales';

type AboutPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params;
  const dict = getDictionary(locale as Locale);
  const { about, slugs } = dict;

  const overlay = (
    <>
      <p className="text-sm leading-relaxed text-text-muted">{about.story.text}</p>
      <ul className="space-y-2">
        {about.story.values.map((value) => (
          <li key={value} className="rounded-lg border border-border bg-surface/50 px-3 py-2 text-xs text-text-muted">
            {value}
          </li>
        ))}
      </ul>
      <div className="rounded-xl border border-border bg-surface/60 p-4 text-xs text-text-muted">
        <p className="font-semibold text-text">{about.business.name}</p>
        <p className="mt-1">{about.business.location}</p>
        <p className="mt-1">KVK {about.business.kvk}</p>
      </div>
    </>
  );

  return (
    <ImmersiveScenePage
      dict={dict}
      label={about.hero.label}
      title={about.hero.title}
      description={about.hero.description}
      overlayContent={overlay}
    >
      <RevealSection>
        <AnimatedSectionHeading title={about.story.title} subtitle={about.story.text} />
      </RevealSection>

      <div className="grid gap-4 md:grid-cols-2">
        {about.expertise.items.map((item) => (
          <GlassCard key={item.title} className="p-6" hover>
            <h3 className="font-display text-lg font-semibold text-text">{item.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-text-muted">{item.text}</p>
          </GlassCard>
        ))}
      </div>

      <RevealSection>
        <AnimatedSectionHeading
          label={about.howIWork.label}
          title={about.howIWork.title}
        />
        <ol className="mt-8 grid gap-4 md:grid-cols-2">
          {about.howIWork.steps.map((step) => (
            <li key={step.title} className="glass-spec-panel rounded-2xl p-5">
              <h3 className="font-display text-lg font-semibold text-text">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-text-muted">{step.text}</p>
            </li>
          ))}
        </ol>
      </RevealSection>

      <AnimatedCtaBand
        headline={about.cta.headline}
        subtext={about.cta.text}
        primaryLabel={about.cta.button}
        primaryHref={slugs.contact}
        secondaryLabel={about.cta.secondary}
        secondaryHref={slugs.projects}
      />
    </ImmersiveScenePage>
  );
}
