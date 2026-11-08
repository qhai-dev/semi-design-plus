import { render } from "@testing-library/react";
import { describe, it } from "vitest";
import { Toaster } from "./index";

describe("Sonner", () => {
  it("renders", () => {
    render(<Toaster />);
  });
});
