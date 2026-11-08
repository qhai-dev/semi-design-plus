"use client";

import * as React from "react";
import { cn } from "../../lib/cn";
import useEmblaCarousel, { type UseEmblaCarouselType } from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * shadcn Carousel API (embla context) with the Semi Design carousel spec
 * (carousel/carousel.scss + variables.scss):
 * - 6px radius on the sliding viewport ($radius-carousel uses --semi-border-radius-medium)
 * - dots: 12px circles ($width-carousel_indicator_dot_medium) with 12px gaps,
 *   active dot solid primary, inactive fill-2 (bg-muted-active)
 * - arrows: 32px round buttons over the slides at 20px inset
 *   ($spacing-carousel_arrow-left), deep background with white icon (bg-tooltip)
 * - dots sit 32px above the bottom edge ($spacing-carousel_indicator-padding)
 */

type CarouselApi = UseEmblaCarouselType[1];
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>;
type CarouselOptions = UseCarouselParameters[0];
type CarouselPlugin = UseCarouselParameters[1];

type CarouselProps = {
  opts?: CarouselOptions;
  plugins?: CarouselPlugin;
  orientation?: "horizontal" | "vertical";
  setApi?: (api: CarouselApi) => void;
};

type CarouselContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0];
  api: ReturnType<typeof useEmblaCarousel>[1];
  scrollPrev: () => void;
  scrollNext: () => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
} & CarouselProps;

const CarouselContext = React.createContext<CarouselContextProps | null>(null);

function useCarousel() {
  const context = React.useContext(CarouselContext);

  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />");
  }

  return context;
}

function Carousel({
  orientation = "horizontal",
  opts,
  setApi,
  plugins,
  className,
  children,
  ...props
}: React.ComponentProps<"div"> & CarouselProps) {
  const [carouselRef, api] = useEmblaCarousel(
    {
      ...opts,
      axis: orientation === "horizontal" ? "x" : "y",
    },
    plugins,
  );
  const [canScrollPrev, setCanScrollPrev] = React.useState(false);
  const [canScrollNext, setCanScrollNext] = React.useState(false);

  const onSelect = React.useCallback((api: CarouselApi) => {
    if (!api) return;
    setCanScrollPrev(api.canScrollPrev());
    setCanScrollNext(api.canScrollNext());
  }, []);

  const scrollPrev = React.useCallback(() => {
    api?.scrollPrev();
  }, [api]);

  const scrollNext = React.useCallback(() => {
    api?.scrollNext();
  }, [api]);

  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        scrollPrev();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        scrollNext();
      }
    },
    [scrollPrev, scrollNext],
  );

  React.useEffect(() => {
    if (!api || !setApi) return;
    setApi(api);
  }, [api, setApi]);

  React.useEffect(() => {
    if (!api) return;
    onSelect(api);
    api.on("reInit", onSelect);
    api.on("select", onSelect);

    return () => {
      api?.off("select", onSelect);
    };
  }, [api, onSelect]);

  return (
    <CarouselContext.Provider
      value={{
        carouselRef,
        api: api,
        opts,
        orientation: orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),
        scrollPrev,
        scrollNext,
        canScrollPrev,
        canScrollNext,
      }}
    >
      <div
        onKeyDownCapture={handleKeyDown}
        className={cn("relative", className)}
        role="region"
        aria-roledescription="carousel"
        data-slot="carousel"
        {...props}
      >
        {children}
      </div>
    </CarouselContext.Provider>
  );
}

function CarouselContent({ className, ...props }: React.ComponentProps<"div">) {
  const { carouselRef, orientation } = useCarousel();

  return (
    <div ref={carouselRef} className="overflow-hidden rounded-xl" data-slot="carousel-content">
      <div
        className={cn("flex", orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col", className)}
        {...props}
      />
    </div>
  );
}

function CarouselItem({ className, ...props }: React.ComponentProps<"div">) {
  const { orientation } = useCarousel();

  return (
    <div
      role="group"
      aria-roledescription="slide"
      data-slot="carousel-item"
      className={cn(
        "min-w-0 shrink-0 grow-0 basis-full",
        orientation === "horizontal" ? "pl-4" : "pt-4",
        className,
      )}
      {...props}
    />
  );
}

const arrowClassNames =
  "absolute z-10 my-auto flex size-8 cursor-pointer touch-manipulation items-center justify-center rounded-full bg-tooltip text-tooltip-foreground transition-colors duration-100 hover:bg-tooltip/80 active:bg-tooltip disabled:cursor-not-allowed disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0";

function CarouselPrevious({ className, ...props }: React.ComponentProps<"button">) {
  const { orientation, scrollPrev, canScrollPrev } = useCarousel();

  return (
    <button
      type="button"
      data-slot="carousel-previous"
      aria-label="Previous slide"
      disabled={!canScrollPrev ? true : undefined}
      onClick={scrollPrev}
      className={cn(
        arrowClassNames,
        orientation === "horizontal"
          ? "inset-y-0 left-5"
          : "-top-5 left-1/2 -translate-x-1/2 rotate-90",
        className,
      )}
      {...props}
    >
      <ChevronLeft aria-hidden />
    </button>
  );
}

function CarouselNext({ className, ...props }: React.ComponentProps<"button">) {
  const { orientation, scrollNext, canScrollNext } = useCarousel();

  return (
    <button
      type="button"
      data-slot="carousel-next"
      aria-label="Next slide"
      disabled={!canScrollNext ? true : undefined}
      onClick={scrollNext}
      className={cn(
        arrowClassNames,
        orientation === "horizontal"
          ? "inset-y-0 right-5"
          : "-bottom-5 left-1/2 -translate-x-1/2 rotate-90",
        className,
      )}
      {...props}
    >
      <ChevronRight aria-hidden />
    </button>
  );
}

function CarouselDots({ className, ...props }: React.ComponentProps<"div">) {
  const { api, orientation } = useCarousel();
  const dotsRef = React.useRef<HTMLDivElement>(null);
  const [dotCount, setDotCount] = React.useState(0);
  const [selectedSnap, setSelectedSnap] = React.useState(0);

  React.useEffect(() => {
    const count =
      api?.scrollSnapList().length ||
      dotsRef.current
        ?.closest("[data-slot='carousel']")
        ?.querySelectorAll("[data-slot='carousel-item']").length ||
      0;
    setDotCount(count);
    setSelectedSnap(api?.selectedScrollSnap() ?? 0);

    const onSelect = () => {
      setSelectedSnap(api?.selectedScrollSnap() ?? 0);
    };
    api?.on("select", onSelect);
    return () => {
      api?.off("select", onSelect);
    };
  }, [api]);

  return (
    <div
      ref={dotsRef}
      data-slot="carousel-dots"
      className={cn(
        "absolute z-10 flex items-center justify-center gap-3",
        orientation === "vertical"
          ? "top-1/2 right-4 -translate-y-1/2 flex-col"
          : "inset-x-0 bottom-8",
        className,
      )}
      {...props}
    >
      {Array.from({ length: dotCount }).map((_, index) => (
        <button
          key={index}
          type="button"
          aria-label={`Go to slide ${index + 1}`}
          aria-current={index === selectedSnap ? "true" : undefined}
          data-active={index === selectedSnap ? "" : undefined}
          onClick={() => api?.scrollTo(index)}
          className={cn(
            "size-3 cursor-pointer rounded-full bg-muted-active transition-colors duration-100 hover:bg-muted-hover data-active:bg-primary data-active:hover:bg-primary data-active:active:bg-primary",
          )}
        />
      ))}
    </div>
  );
}

export {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  CarouselDots,
  useCarousel,
};
