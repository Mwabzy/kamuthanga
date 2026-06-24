import Link from "next/link";
import { site } from "@/lib/site";

/** Minimal brand header. Transparent over heroes via `overlay`, solid otherwise. */
export default function SiteHeader({ overlay = false }: { overlay?: boolean }) {
  return (
    <header
      className={
        overlay
          ? "absolute inset-x-0 top-0 z-30"
          : "border-b border-taupe/30 bg-cream/80 backdrop-blur"
      }
    >
      <div className="container-x flex h-16 items-center justify-between">
        <Link
          href="/"
          className={`font-serif text-xl font-semibold tracking-tight ${
            overlay ? "text-offwhite" : "text-forest"
          }`}
        >
          {site.name}
        </Link>
        <Link
          href="/"
          className={`text-sm font-medium transition-colors ${
            overlay
              ? "text-offwhite/80 hover:text-offwhite"
              : "text-muted hover:text-forest"
          }`}
        >
          All escapes
        </Link>
      </div>
    </header>
  );
}
