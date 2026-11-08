import type { Meta, StoryObj } from "@storybook/react-vite";
import { within, expect, userEvent } from "storybook/test";
import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./index";

const meta = {
  title: "Components/Carousel",
  component: Carousel,
  parameters: { layout: "centered" },
} satisfies Meta<typeof Carousel>;

export default meta;
type Story = StoryObj<typeof meta>;

function DemoSlides({ count = 3 }: { count?: number }) {
  return (
    <CarouselContent className="h-56">
      {Array.from({ length: count }).map((_, index) => (
        <CarouselItem key={index}>
          <div
            data-slot="carousel-demo-slide"
            className={`flex h-56 items-center justify-center rounded-xl text-lg font-semibold ${
              index % 3 === 0
                ? "bg-primary-light text-primary"
                : index % 3 === 1
                  ? "bg-muted text-foreground"
                  : "bg-primary text-primary-foreground"
            }`}
          >
            Slide {index + 1}
          </div>
        </CarouselItem>
      ))}
    </CarouselContent>
  );
}

export const Default: Story = {
  render: () => (
    <Carousel className="w-96">
      <DemoSlides />
      <CarouselPrevious />
      <CarouselNext />
      <CarouselDots />
    </Carousel>
  ),
};

export const ArrowsOnly: Story = {
  render: () => (
    <Carousel className="w-96">
      <DemoSlides />
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  ),
};

export const Vertical: Story = {
  render: () => (
    <Carousel orientation="vertical" opts={{ axis: "y" }} className="h-56 w-96">
      <DemoSlides />
      <CarouselPrevious />
      <CarouselNext />
      <CarouselDots />
    </Carousel>
  ),
};

export const FiveSlides: Story = {
  render: () => (
    <Carousel className="w-96">
      <DemoSlides count={5} />
      <CarouselPrevious />
      <CarouselNext />
      <CarouselDots />
    </Carousel>
  ),
};

export const InteractiveNavigation: Story = {
  render: () => (
    <Carousel className="w-96">
      <DemoSlides />
      <CarouselPrevious />
      <CarouselNext />
      <CarouselDots />
    </Carousel>
  ),
  play: async () => {
    const dots = within(document.body).getAllByRole("button", { name: /Go to slide/ });
    expect(dots.length).toBe(3);
    await userEvent.click(dots[1]);
  },
};
