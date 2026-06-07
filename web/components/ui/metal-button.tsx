import Link from 'next/link';
import { type ComponentPropsWithoutRef, type ReactNode } from 'react';
import { cn } from '@/lib/cn';

type MetalButtonVariant = 'primary' | 'secondary' | 'ghost';

type MetalButtonCommonProps = {
  children: ReactNode;
  variant?: MetalButtonVariant;
  className?: string;
};

type MetalButtonLinkProps = MetalButtonCommonProps &
  Omit<ComponentPropsWithoutRef<typeof Link>, 'className' | 'children'>;

type MetalButtonButtonProps = MetalButtonCommonProps &
  Omit<ComponentPropsWithoutRef<'button'>, 'className' | 'children'>;

export type MetalButtonProps =
  | (MetalButtonLinkProps & { href: string })
  | (MetalButtonButtonProps & { href?: undefined });

const variantClasses: Record<MetalButtonVariant, string> = {
  primary:
    'bg-gradient-to-b from-accent/90 via-accent to-accent-deep text-charcoal shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_8px_24px_-8px_rgba(45,212,191,0.55)] border-accent/40 hover:from-accent hover:to-accent-deep',
  secondary:
    'bg-gradient-to-b from-surface-raised/90 to-surface text-text border-border-strong shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] hover:border-accent/40',
  ghost:
    'bg-transparent text-text-muted border-border hover:text-text hover:border-accent/30 hover:bg-accent-muted',
};

function buttonClasses(variant: MetalButtonVariant, className?: string) {
  return cn(
    'btn-motion inline-flex items-center justify-center gap-2 rounded-xl border px-5 py-2.5',
    'text-sm font-semibold tracking-wide transition-colors',
    variantClasses[variant],
    className,
  );
}

export function MetalButton(props: MetalButtonProps) {
  const { children, variant = 'primary', className } = props;

  if ('href' in props && props.href) {
    const { href, ...linkProps } = props;
    return (
      <Link href={href} className={buttonClasses(variant, className)} {...linkProps}>
        {children}
      </Link>
    );
  }

  const { type = 'button', ...buttonProps } = props as MetalButtonButtonProps;

  return (
    <button type={type} className={buttonClasses(variant, className)} {...buttonProps}>
      {children}
    </button>
  );
}
