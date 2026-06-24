import type { Property, VisitKind } from "@/data/types";
import Reveal from "./Reveal";
import EventActivityCard from "./EventActivityCard";

/** Section metadata so each "way to visit" reads clearly and in a stable order. */
const GROUPS: { kind: VisitKind; title: string; blurb: string }[] = [
  {
    kind: "day",
    title: "Day visits",
    blurb: "Park, eat, and chill for the day — no overnight stay needed.",
  },
  {
    kind: "event",
    title: "Events",
    blurb: "Birthdays, showers, retreats and intimate celebrations.",
  },
  {
    kind: "activity",
    title: "Activities",
    blurb: "Hands-on experiences that make the trip memorable.",
  },
];

/**
 * "Ways to visit" — renders the non-overnight options grouped into
 * Day / Events / Activities. Overnight Stays are rendered separately on the
 * page with `UnitCard`s, completing the Stay / Day / Events / Activities split.
 */
export default function VisitOptions({ property }: { property: Property }) {
  const present = GROUPS.filter((g) =>
    property.visitOptions.some((v) => v.kind === g.kind),
  );

  if (present.length === 0) return null;

  return (
    <div className="space-y-14">
      {present.map((group) => {
        const options = property.visitOptions.filter(
          (v) => v.kind === group.kind,
        );
        return (
          <div key={group.kind}>
            <Reveal>
              <h3 className="text-2xl sm:text-3xl">{group.title}</h3>
              <p className="mt-1 max-w-xl text-muted">{group.blurb}</p>
            </Reveal>
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {options.map((option, i) => (
                <Reveal key={option.id} delay={i * 80}>
                  <EventActivityCard property={property} option={option} />
                </Reveal>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
