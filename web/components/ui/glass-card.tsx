import { type ComponentPropsWithoutRef, type ReactNode } from 'react';
import { cn } from '@/lib/cn';

type GlassCardProps = ComponentPropsWithoutRef<'div'> & {
  children: ReactNode;
  glow?: boolean;
  hover?: boolean;
  accentBar?: boolean;
};

export function GlassCard({
  children,
  className,
  glow = false,
  hover = true,
  accentBar = false,
  ...props
}: GlassCardProps) {
  return (
    <div
      className={cn(
        'premium-surface glass-card rounded-2xl border border-border',
        hover && 'glass-card-hover',
        glow && 'glass-card-glow',
        accentBar && 'relative overflow-hidden',
        className,
      )}
      {...props}
    >
      {accentBar && (
        <span
          className="absolute inset-y-0 left-0 w-0.5 origin-top scale-y-0 bg-accent transition-transform duration-300 ease-[var(--ease-soft)] group-hover:scale-y-100"
          aria-hidden
        />
      )}
      {children}
    </div>
  );
}
