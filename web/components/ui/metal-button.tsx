import Link from "next/link";
import { type ComponentPropsWithoutRef, type ReactNode } from "react";
import { cn } from "@/lib/cn";
type MetalButtonVariant = "primary" | "secondary" | "ghost";
type MetalButtonCommonProps = {
  children: ReactNode;
  variant?: MetalButtonVariant;
  className?: string;
};
type MetalButtonLinkProps = MetalButtonCommonProps &
  Omit<ComponentPropsWithoutRef<typeof Link>, "className" | "children">;
type MetalButtonButtonProps = MetalButtonCommonProps &
  Omit<ComponentPropsWithoutRef<"button">, "className" | "children">;
export type MetalButtonProps =
  | (MetalButtonLinkProps & { href: string })
  | (MetalButtonButtonProps & { href?: undefined });
const variantClasses: Record<MetalButtonVariant, string> = {
  primary: "bg-accent text-white border-accent hover:bg-accent-hover",
  secondary:
    "bg-transparent text-text border-border-strong hover:border-accent/40 hover:text-text",
  ghost:
    "bg-transparent text-text-muted border-border hover:text-text hover:border-border-strong",
};
function buttonClasses(variant: MetalButtonVariant, className?: string) {
  return cn(
    "btn-motion inline-flex items-center justify-center gap-2 rounded-lg border px-5 py-2.5",
    "text-sm font-semibold tracking-wide transition-colors",
    variantClasses[variant],
    className,
  );
}
export function MetalButton(props: MetalButtonProps) {
  const { children, variant = "primary", className } = props;
  if ("href" in props && props.href) {
    const { href, ...linkProps } = props;
    return (
      <Link
        href={href}
        className={buttonClasses(variant, className)}
        {...linkProps}
      >
        {children}
      </Link>
    );
  }
  const { type = "button", ...buttonProps } = props as MetalButtonButtonProps;
  return (
    <button
      type={type}
      className={buttonClasses(variant, className)}
      {...buttonProps}
    >
      {children}
    </button>
  );
}
