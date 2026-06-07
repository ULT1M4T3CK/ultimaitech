'use client';

import { useEffect, useState } from 'react';
import { MetalButton } from '@/components/ui/metal-button';
import { useOptionalImmersive } from '@/components/immersive/immersive-provider';

type StickyMobileCtaProps = {
  label: string;
  href: string;
  heroSelector?: string;
};

export function StickyMobileCta({
  label,
  href,
  heroSelector = '[data-narrative-section="hero"], [data-hub-hero]',
}: StickyMobileCtaProps) {
  const immersive = useOptionalImmersive();
  const narrativeMode = immersive?.narrativeMode ?? false;
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.querySelector(heroSelector);
    if (!hero) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0.1 },
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, [heroSelector, narrativeMode]);

  if (!visible) return null;

  return (
    <div className="sticky-mobile-cta">
      <MetalButton href={href} className="w-full">
        {label}
      </MetalButton>
    </div>
  );
}
