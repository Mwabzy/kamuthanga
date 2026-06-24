import Image from "next/image";
import type { Media } from "@/data/types";

type HeroProps = {
  media: Media;
  name: string;
  tagline: string;
  location: string;
};

/**
 * Full-bleed hero. Image or inline video, with a bottom gradient scrim so the
 * property name + tagline stay readable on mobile over any photo.
 */
export default function Hero({ media, name, tagline, location }: HeroProps) {
  return (
    <section className="relative h-[78vh] min-h-[520px] w-full overflow-hidden">
      {media.type === "video" ? (
        <video
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={media.poster}
        >
          <source src={media.src} type="video/mp4" />
        </video>
      ) : (
        <Image
          src={media.src}
          alt={media.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      )}

      {/* Readability scrim */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/20 to-ink/10"
      />

      <div className="container-x absolute inset-x-0 bottom-0 pb-12 sm:pb-16">
        <div className="max-w-2xl">
          <p className="eyebrow text-taupe">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-sage" />
            {location}
          </p>
          <h1 className="mt-3 text-balance text-4xl text-offwhite sm:text-6xl">
            {name}
          </h1>
          <p className="mt-3 max-w-xl text-pretty text-lg text-offwhite/85 sm:text-xl">
            {tagline}
          </p>
        </div>
      </div>
    </section>
  );
}
