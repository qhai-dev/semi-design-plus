import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Progress, ProgressIndicator, ProgressTrack } from "./index";

describe("Progress", () => {
  it("renders a 4px track with Semi success fill", () => {
    render(<Progress value={60} aria-label="progress" />);
    const track = document.querySelector("[data-slot='progress-track']");
    expect(track).toHaveClass("h-1", "rounded-sm", "bg-muted");
    const indicator = document.querySelector("[data-slot='progress-indicator']");
    expect(indicator).toHaveClass("bg-success");
  });

  it("exposes meter semantics via Base UI", () => {
    render(<Progress value={40} aria-label="upload" />);
    expect(screen.getByRole("progressbar", { name: "upload" })).toBeInTheDocument();
  });

  it("renders label and value parts", () => {
    render(
      <Progress value={75} aria-label="labeled">
        <ProgressTrack>
          <ProgressIndicator />
        </ProgressTrack>
      </Progress>,
    );
    expect(document.querySelector("[data-slot='progress-track']")).toBeInTheDocument();
  });
});
