import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Info } from "lucide-react";
import { Alert, AlertAction, AlertDescription, AlertTitle } from "./index";

describe("Alert", () => {
  it("renders with Semi banner styles (info default)", () => {
    render(
      <Alert>
        <AlertTitle>Heads up</AlertTitle>
        <AlertDescription>Something happened.</AlertDescription>
      </Alert>,
    );
    const alert = screen.getByRole("alert");
    expect(alert).toHaveAttribute("data-slot", "alert");
    expect(alert).toHaveClass("bg-info-light", "text-info", "rounded-sm");
    expect(screen.getByText("Heads up")).toHaveClass("font-semibold");
  });

  it("renders all four semantic types", () => {
    render(
      <>
        <Alert variant="success">S</Alert>
        <Alert variant="warning">W</Alert>
        <Alert variant="destructive">D</Alert>
      </>,
    );
    expect(screen.getByText("S")).toHaveClass("bg-success-light", "text-success");
    expect(screen.getByText("W")).toHaveClass("bg-warning-light", "text-warning");
    expect(screen.getByText("D")).toHaveClass("bg-destructive-light", "text-destructive");
  });

  it("applies the icon grid layout when an icon is provided", () => {
    render(
      <Alert>
        <Info aria-hidden />
        <AlertTitle>With icon</AlertTitle>
      </Alert>,
    );
    const alert = screen.getByRole("alert");
    expect(alert).toHaveClass("has-[>svg]:grid-cols-[auto_1fr]");
  });

  it("positions an optional action area", () => {
    render(
      <Alert>
        <AlertTitle>Action</AlertTitle>
        <AlertAction>
          <button type="button">Retry</button>
        </AlertAction>
      </Alert>,
    );
    expect(screen.getByText("Retry").closest("[data-slot='alert-action']")).toHaveClass(
      "absolute",
      "top-2",
      "right-2",
    );
  });

  it("lets consumer className override built-ins", () => {
    render(<Alert className="rounded-xl">Override</Alert>);
    const alert = screen.getByText("Override");
    expect(alert).toHaveClass("rounded-xl");
    expect(alert).not.toHaveClass("rounded-sm");
  });
});
