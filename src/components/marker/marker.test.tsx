import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Info } from "lucide-react";
import { Marker, MarkerContent, MarkerIcon, markerVariants } from "./index";

describe("Marker", () => {
  it("renders the marker/icon/content structure with data-slots", () => {
    render(
      <Marker>
        <MarkerIcon>
          <Info aria-hidden />
        </MarkerIcon>
        <MarkerContent>Between messages</MarkerContent>
      </Marker>,
    );
    const content = screen.getByText("Between messages");
    expect(content).toHaveAttribute("data-slot", "marker-content");
    expect(content.parentElement).toHaveAttribute("data-slot", "marker");
    expect(content.parentElement!.querySelector("[data-slot='marker-icon']")).toBeInTheDocument();
  });

  it("styles the base marker with the Semi muted meta look", () => {
    render(<Marker>Meta line</Marker>);
    expect(screen.getByText("Meta line")).toHaveClass("text-xs", "text-muted-foreground");
  });

  it("renders separator rules and bordered variants with Semi tokens", () => {
    render(
      <>
        <Marker variant="separator" data-testid="sep">
          Section
        </Marker>
        <Marker variant="border" data-testid="bordered">
          Bordered
        </Marker>
      </>,
    );
    expect(screen.getByTestId("sep")).toHaveClass("before:bg-border", "after:bg-border");
    expect(screen.getByTestId("bordered")).toHaveClass("border-b", "border-border", "pb-2");
  });

  it("exposes variant through markerVariants", () => {
    expect(markerVariants({ variant: "separator" })).toContain("before:bg-border");
    expect(markerVariants({ variant: "border" })).toContain("border-b");
  });

  it("lets consumer className override built-ins", () => {
    render(<Marker className="text-text-2">Override</Marker>);
    expect(screen.getByText("Override")).toHaveClass("text-text-2");
  });
});
