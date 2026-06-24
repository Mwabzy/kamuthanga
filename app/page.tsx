import { properties } from "@/data/properties";
import { site } from "@/lib/site";
import PropertyCard from "@/components/PropertyCard";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import Reveal from "@/components/Reveal";

export default function HubPage() {
  // Live first, coming-soon last — but otherwise honour data-file order.
  const ordered = [...properties].sort((a, b) => {
    if (a.status === b.status) return 0;
    return a.status === "live" ? -1 : 1;
  });

  return (
    <>
      <SiteHeader />

      <main>
        {/* Brand intro */}
        <section className="container-x pt-16 sm:pt-24">
          <Reveal>
            <p className="eyebrow">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-sage" />
              Weekend escapes near Nairobi
            </p>
            <h1 className="mt-4 max-w-3xl text-balance text-4xl leading-[1.1] sm:text-6xl">
              Handpicked places to slow down, just outside the city.
            </h1>
            <p className="mt-5 max-w-2xl text-pretty text-lg text-muted">
              {site.name} curates a small collection of countryside escapes for
              day visits, overnight stays, and private events. Find a place,
              then plan your visit with us over WhatsApp.
            </p>
          </Reveal>
        </section>

        {/* Property grid */}
        <section className="container-x mt-12 sm:mt-16">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {ordered.map((property, i) => (
              <Reveal key={property.slug} delay={i * 90}>
                <PropertyCard property={property} />
              </Reveal>
            ))}
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
