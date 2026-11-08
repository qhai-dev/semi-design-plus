import { fireEvent, render, screen } from "@testing-library/react";
import { rstest, describe, expect, it } from "@rstest/core";
import type { CarouselApi } from "./index";
import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./index";

function renderCarousel({
  slides = 3,
  dots = true,
  ...props
}: React.ComponentProps<typeof Carousel> & { slides?: number; dots?: boolean } = {}) {
  return render(
    <Carousel {...props}>
      <CarouselContent>
        {Array.from({ length: slides }).map((_, index) => (
          <CarouselItem key={index}>Slide {index + 1}</CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
      {dots && <CarouselDots />}
    </Carousel>,
  );
}

describe("Carousel", () => {
  it("renders the region with slide items", () => {
    renderCarousel();
    const region = screen.getByRole("region");
    expect(region).toHaveAttribute("data-slot", "carousel");
    expect(region).toHaveAttribute("aria-roledescription", "carousel");
    const items = screen.getAllByRole("group");
    expect(items).toHaveLength(3);
    expect(items[0]).toHaveAttribute("data-slot", "carousel-item");
    expect(items[0]).toHaveAttribute("aria-roledescription", "slide");
    expect(screen.getByText("Slide 2")).toBeInTheDocument();
  });

  it("renders prev/next arrows with aria-labels and the Semi tooltip styling", () => {
    renderCarousel();
    const previous = screen.getByRole("button", { name: "Previous slide" });
    const next = screen.getByRole("button", { name: "Next slide" });
    expect(previous).toHaveAttribute("data-slot", "carousel-previous");
    expect(next).toHaveAttribute("data-slot", "carousel-next");
    expect(previous).toHaveClass("size-8", "rounded-full", "bg-tooltip", "text-tooltip-foreground");
    expect(previous.querySelector("svg")).toHaveAttribute("aria-hidden", "true");
  });

  it("renders one dot per slide with the active dot in primary color", () => {
    renderCarousel();
    const dots = screen.getAllByRole("button", { name: /Go to slide/ });
    expect(dots).toHaveLength(3);
    expect(dots[0]).toHaveAttribute("data-active");
    expect(dots[0]).toHaveClass("data-active:bg-primary", "size-3", "rounded-full");
    expect(dots[1]).not.toHaveAttribute("data-active");
    expect(dots[1]).toHaveClass("bg-muted-active");
  });

  it("navigates with the arrow keys through the embla api", async () => {
    const apiRef: { current: CarouselApi | null } = { current: null };
    const setApi = (api: CarouselApi) => {
      apiRef.current = api;
    };
    renderCarousel({ dots: false, setApi });
    const api = apiRef.current!;
    const scrollNext = rstest.spyOn(api, "scrollNext");
    const scrollPrev = rstest.spyOn(api, "scrollPrev");
    fireEvent.keyDown(screen.getByRole("region"), { key: "ArrowRight" });
    fireEvent.keyDown(screen.getByRole("region"), { key: "ArrowLeft" });
    expect(scrollNext).toHaveBeenCalledOnce();
    expect(scrollPrev).toHaveBeenCalledOnce();
  });

  it("scrolls to a slide when a dot is clicked", () => {
    const apiRef: { current: CarouselApi | null } = { current: null };
    const setApi = (api: CarouselApi) => {
      apiRef.current = api;
    };
    renderCarousel({ setApi });
    const api = apiRef.current!;
    const scrollTo = rstest.spyOn(api, "scrollTo");
    fireEvent.click(screen.getByRole("button", { name: "Go to slide 2" }));
    expect(scrollTo).toHaveBeenCalledWith(1);
  });
});
