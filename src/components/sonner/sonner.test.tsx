import { render } from "@testing-library/react";
import { describe, it } from "@rstest/core";
import { Toaster } from "./index";

describe("Sonner", () => {
  it("renders", () => {
    render(<Toaster />);
  });
});
