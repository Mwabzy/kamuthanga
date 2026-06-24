import WhatsAppButton from "./WhatsAppButton";

/**
 * Persistent primary "Plan a visit" CTA, pinned to the bottom on mobile and
 * shown as a normal button inline on larger screens isn't ideal — instead we
 * keep it pinned everywhere but compact, so the conversion path is always one
 * tap away. The contextual unit/option buttons live in the page body.
 */
export default function StickyEnquire({
  href,
  propertyName,
}: {
  href: string;
  propertyName: string;
}) {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40 pb-[env(safe-area-inset-bottom)]">
      <div className="container-x pb-4">
        <div className="pointer-events-auto flex items-center justify-between gap-3 rounded-full border border-taupe/40 bg-offwhite/90 p-2 pl-5 shadow-lift backdrop-blur-md">
          <p className="hidden truncate text-sm text-muted sm:block">
            Ready to visit{" "}
            <span className="font-medium text-ink">{propertyName}</span>?
          </p>
          <WhatsAppButton href={href} className="w-full sm:w-auto">
            Enquire / Plan a visit
          </WhatsAppButton>
        </div>
      </div>
    </div>
  );
}
