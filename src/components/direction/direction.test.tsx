import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { DirectionProvider, useDirection } from "./index";

function Probe() {
  const direction = useDirection();
  return <span data-testid="dir">{direction}</span>;
}

describe("Direction", () => {
  it("provides ltr/rtl direction context", () => {
    render(
      <>
        <DirectionProvider direction="ltr">
          <Probe />
        </DirectionProvider>
        <DirectionProvider direction="rtl">
          <Probe />
        </DirectionProvider>
      </>,
    );
    expect(screen.getAllByTestId("dir")[0]).toHaveTextContent("ltr");
    expect(screen.getAllByTestId("dir")[1]).toHaveTextContent("rtl");
  });

  it("renders children", () => {
    render(
      <DirectionProvider direction="ltr">
        <div>dir content</div>
      </DirectionProvider>,
    );
    expect(screen.getByText("dir content")).toBeInTheDocument();
  });
});
