import { render } from "@testing-library/react";
import { describe, it } from "vitest";
import { Slider } from "./index";

describe("Slider", () => {
  it("renders", () => {
    render(<Slider defaultValue={[30]} aria-label="slider" />);
  });
});
