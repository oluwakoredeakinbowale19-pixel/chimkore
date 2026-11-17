import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function ProductCarousel({ images, name }: { images: string[]; name: string }) {
  const [emblaRef, api] = useEmblaCarousel({ loop: images.length > 1 });
  const [selected, setSelected] = useState(0);

  const onSelect = useCallback(() => {
    if (api) setSelected(api.selectedScrollSnap());
  }, [api]);

  useEffect(() => {
    if (!api) return;
    onSelect();
    api.on("select", onSelect).on("reInit", onSelect);
    return () => {
      api.off("select", onSelect).off("reInit", onSelect);
    };
  }, [api, onSelect]);

  const multiple = images.length > 1;

  return (
    <div
      className="relative aspect-square overflow-hidden bg-sand"
      role="region"
      aria-roledescription="carousel"
      aria-label={`${name} photos`}
    >
      <div ref={emblaRef} className="h-full overflow-hidden">
        <div className="flex h-full touch-pan-y">
          {images.map((src, i) => (
            <div
              key={src}
              className="relative h-full min-w-0 shrink-0 grow-0 basis-full"
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${images.length}`}
            >
              <img
                src={src}
                alt={i === 0 ? name : `${name} — photo ${i + 1}`}
                loading="lazy"
                draggable={false}
                className="h-full w-full select-none object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>

      {multiple && (
        <>
          <button
            type="button"
            onClick={() => api?.scrollPrev()}
            aria-label="Previous photo"
            className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-card/85 text-primary shadow-soft backdrop-blur-sm transition-all duration-300 hover:bg-card focus-visible:opacity-100 md:opacity-0 md:group-hover:opacity-100"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => api?.scrollNext()}
            aria-label="Next photo"
            className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-card/85 text-primary shadow-soft backdrop-blur-sm transition-all duration-300 hover:bg-card focus-visible:opacity-100 md:opacity-0 md:group-hover:opacity-100"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
          <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-primary/55 px-2.5 py-1.5 backdrop-blur-sm">
            {images.map((src, i) => (
              <button
                key={src}
                type="button"
                onClick={() => api?.scrollTo(i)}
                aria-label={`Show photo ${i + 1}`}
                aria-current={i === selected}
                className={cn(
                  "h-1.5 rounded-full bg-on-brand transition-all duration-300",
                  i === selected ? "w-4" : "w-1.5 opacity-50 hover:opacity-80",
                )}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
