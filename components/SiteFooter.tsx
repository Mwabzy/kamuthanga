import { site } from "@/lib/site";

export default function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-taupe/30 bg-cream">
      <div className="container-x flex flex-col gap-2 py-10 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-serif text-lg text-forest">{site.name}</p>
        <p className="text-sm text-muted">{site.tagline}</p>
        <p className="text-xs text-muted">
          © {new Date().getFullYear()} {site.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
