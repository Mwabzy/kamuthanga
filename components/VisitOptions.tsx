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
    kind: "activity",
    title: "Activities",
    blurb: "Hands-on experiences that make the trip memorable.",
  },
  {
    kind: "event",
    title: "Events",
    blurb: "Birthdays, showers, retreats and intimate celebrations.",
  },
];

/**
 * Bento column-spans (on a 6-col lg grid) chosen so each group's cards tile
 * cleanly with a little size variety, instead of a uniform grid that leaves an
 * awkward gap (e.g. four cards across three columns). Mobile stays single
 * column and tablet a balanced two-up; the mosaic only kicks in at `lg`.
 */
function bentoSpan(count: number, index: number): string {
  if (count === 4) {
    // wide · narrow / narrow · wide
    return ["lg:col-span-4", "lg:col-span-2", "lg:col-span-2", "lg:col-span-4"][
      index
    ];
  }
  if (count === 5) {
    // one feature, then an even row of four
    return [
      "lg:col-span-4",
      "lg:col-span-2",
      "lg:col-span-2",
      "lg:col-span-2",
      "lg:col-span-2",
    ][index];
  }
  // even counts → halves, odd counts → thirds (both tile a 6-col row)
  return count % 2 === 0 ? "lg:col-span-3" : "lg:col-span-2";
}

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
        // A single card stays a normal third-width tile; multiple cards form a
        // bento mosaic on the 6-column lg grid.
        const bento = options.length >= 2;
        const gridClass = bento
          ? "mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-6"
          : "mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3";
        return (
          <div key={group.kind}>
            <Reveal>
              <h3 className="text-2xl sm:text-3xl">{group.title}</h3>
              <p className="mt-1 max-w-xl text-muted">{group.blurb}</p>
            </Reveal>
            <div className={gridClass}>
              {options.map((option, i) => (
                <Reveal
                  key={option.id}
                  delay={i * 80}
                  className={bento ? bentoSpan(options.length, i) : undefined}
                >
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
