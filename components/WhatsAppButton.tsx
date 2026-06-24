import WhatsAppIcon from "./WhatsAppIcon";

type Variant = "primary" | "outline";
type Size = "md" | "lg";

type WhatsAppButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  /** Accessible label when the visible text isn't descriptive enough. */
  ariaLabel?: string;
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium " +
  "transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 " +
  "focus-visible:ring-forest/40 focus-visible:ring-offset-2 focus-visible:ring-offset-cream";

const variants: Record<Variant, string> = {
  primary:
    "bg-forest text-offwhite shadow-soft hover:bg-forest/90 hover:shadow-lift active:scale-[0.98]",
  outline:
    "border border-forest/30 bg-offwhite/70 text-forest hover:border-forest/60 hover:bg-offwhite active:scale-[0.98]",
};

const sizes: Record<Size, string> = {
  md: "px-5 py-2.5 text-sm",
  lg: "px-6 py-3.5 text-base",
};

/**
 * The primary conversion control. A plain anchor to a `wa.me` deep link so it
 * works everywhere (and as a server component). The prefilled message is built
 * by the helpers in lib/whatsapp.ts.
 */
export default function WhatsAppButton({
  href,
  children,
  variant = "primary",
  size = "md",
  className = "",
  ariaLabel,
}: WhatsAppButtonProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      <WhatsAppIcon className={size === "lg" ? "h-5 w-5" : "h-4 w-4"} />
      <span>{children}</span>
    </a>
  );
}
