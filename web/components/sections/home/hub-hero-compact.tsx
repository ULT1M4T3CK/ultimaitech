import { MetalButton } from '@/components/ui/metal-button';
import type { Dictionary } from '@/lib/locales';

type HubHeroCompactProps = {
  dict: Dictionary;
};

export function HubHeroCompact({ dict }: HubHeroCompactProps) {
  const hero = dict.home.hero;

  return (
    <header data-hub-hero className="immersive-overlay-inner space-y-4">
      <p className="label-pill w-fit text-[0.625rem]">{dict.home.nexus?.heroLabel ?? 'ultimAItech'}</p>
      <h1 className="type-section-title text-2xl text-text">{hero.headline}</h1>
      <p className="text-sm leading-relaxed text-text-muted">{hero.subtext}</p>
      <div className="flex flex-wrap gap-2">
        <MetalButton href={dict.slugs.contact} className="!px-4 !py-2 text-xs">
          {hero.cta1}
        </MetalButton>
        <MetalButton href={dict.slugs.projects} variant="secondary" className="!px-4 !py-2 text-xs">
          {hero.cta2}
        </MetalButton>
      </div>
    </header>
  );
}
