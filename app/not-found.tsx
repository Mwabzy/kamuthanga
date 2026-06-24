import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main className="container-x flex min-h-[60vh] flex-col items-center justify-center text-center">
        <p className="eyebrow">Not found</p>
        <h1 className="mt-3 text-4xl sm:text-5xl">This escape isn&apos;t here</h1>
        <p className="mt-4 max-w-md text-muted">
          The page you&apos;re looking for may have moved, or the property
          isn&apos;t open yet. Explore the collection instead.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex rounded-full bg-forest px-6 py-3 text-sm font-medium text-offwhite shadow-soft transition-colors hover:bg-forest/90"
        >
          Back to all escapes
        </Link>
      </main>
      <SiteFooter />
    </>
  );
}
